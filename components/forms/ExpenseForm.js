import React, {useContext, useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Button from "../UI/Button";
import CustomDatePicker from "../UI/DatePickerNative";
import Input from "../UI/Input";
import ModalComponent from "../UI/ModalComponent";
import {getCurrentDate} from "../../util/Date";
import {convertToTable} from "../../util/Table";
import {
    categoriesType,
    getMainCategories,
    getSubCategories,
    incomeCategoryType,
    investmentCategoryType,
    paymentModeData,
    typesData,
} from "../../data/Data";
import {removeEmojisOnForm} from "../../util/Emoji";
import {Type} from "../../util/category";
import {AccountContext} from "../../store/AccountContext";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState("");
    const [modalData, setModalData] = useState([]);
    const [subcategoryData, setSubcategoryData] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState("");

    const [amount, setAmount] = useState(defaultValues?.amount?.toString() || "");
    const [date, setDate] = useState(defaultValues ? new Date(defaultValues.date) : getCurrentDate());
    const [type, setType] = useState(defaultValues?.type || "");
    const [category, setCategory] = useState(defaultValues?.category || "");
    const [subCategory, setSubCategory] = useState(defaultValues?.subCategory || "");
    const [paymentMode, setPaymentMode] = useState(defaultValues?.paymentMode || "");
    const [account, setAccount] = useState(defaultValues?.account || "");
    const accountContext = useContext(AccountContext);

    const getCategoryData = () => {
        if (type === Type.EXPENSE) return categoriesType;
        if (type === Type.INVESTMENT) return investmentCategoryType;
        return incomeCategoryType;
    };

    const openModal = (inputKey, data) => {
        setSelectedInput(inputKey);
        setModalData(data);
        setModalVisible(true);
    };

    const handleItemClick = (item) => {
        if (selectedInput === "type") {
            setType(item);
            setCategory("");
            setSubCategory("");
            setPaymentMode("");
        }

        if (selectedInput === "category") {
            setCategory(item);
            setSelectedMainCategory(item);
            const subCats = convertToTable(getSubCategories(getCategoryData(), item));
            setSubcategoryData(subCats);
            setSubcategoryModalVisible(subCats.length > 0);
        }

        if (selectedInput === "subCategory") setSubCategory(item);
        if (selectedInput === "paymentMode") setPaymentMode(item);
        if (selectedInput === "Account") setAccount(item);

        setModalVisible(false);
    };

    const submitHandler = () => {
        const data = {
            amount: +amount, date, type, category, subCategory, paymentMode, account
        };

        if (isNaN(data.amount) || data.amount <= 0 || !type || !category) return;
        onSubmit(removeEmojisOnForm(data));
    };

    const categories = convertToTable(getMainCategories(getCategoryData()));

    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.form}>
                    <View style={styles.inputsRow}>
                        <Input
                            label="Amount"
                            textInputConfig={{
                                keyboardType: "decimal-pad", value: amount, onChangeText: setAmount,
                            }}
                            style={styles.rowInput}
                        />
                        <CustomDatePicker
                            label="Date"
                            onChange={setDate}
                            config={{value: date}}
                            style={styles.rowInput}
                        />
                    </View>

                    <View style={styles.inputsRow}>
                        <Input
                            label="Type"
                            textInputConfig={{
                                editable: false,
                                value: type,
                                onTouchStart: () => openModal("type", convertToTable(typesData)),
                            }}
                            style={styles.rowInput}
                        />
                        <Input
                            label="Payment Mode"
                            textInputConfig={{
                                editable: false,
                                value: paymentMode,
                                onTouchStart: () => openModal("paymentMode", convertToTable(paymentModeData)),
                            }}
                            style={styles.rowInput}
                        />
                    </View>
                    <Input
                        label="Account"
                        textInputConfig={{
                            editable: false,
                            value: account,
                            onTouchStart: () => openModal("Account", convertToTable(accountContext.accounts.map(a => a.accountName))),
                        }}
                        style={styles.rowInput}
                    />

                    <View style={styles.inputsRow}>
                        <Input
                            label="Category"
                            textInputConfig={{
                                editable: false, value: category, onTouchStart: () => openModal("category", categories),
                            }}
                            style={styles.rowInput}
                        />
                        <Input
                            label="SubCategory"
                            textInputConfig={{
                                editable: false, value: subCategory, onTouchStart: () => {
                                    if (subcategoryData.length > 0) setSubcategoryModalVisible(true);
                                },
                            }}
                            style={styles.rowInput}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <Button mode="flat" onPress={onCancel} style={styles.button}>
                            Cancel
                        </Button>
                        <Button onPress={submitHandler} style={styles.button}>
                            {submitButtonLabel}
                        </Button>
                    </View>

                    <ModalComponent
                        visible={modalVisible}
                        data={modalData}
                        onClose={() => setModalVisible(false)}
                        onItemClick={handleItemClick}
                        modalTitle="Select option"
                    />

                    <ModalComponent
                        visible={subcategoryModalVisible}
                        data={subcategoryData}
                        onClose={() => setSubcategoryModalVisible(false)}
                        onItemClick={(item) => {
                            setSubCategory(item);
                            setSubcategoryModalVisible(false);
                        }}
                        modalTitle={`Select Sub-category of ${selectedMainCategory}`}
                    />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>);
}

export default ExpenseForm;

const styles = StyleSheet.create({
    scrollContainer: {flexGrow: 1},
    form: {marginTop: 8},
    inputsRow: {flexDirection: "row", marginBottom: 5},
    rowInput: {flex: 1, marginBottom: 5},
    buttons: {flexDirection: "row", justifyContent: "center", alignItems: "center"},
    button: {minWidth: 120, marginHorizontal: 8},
});
