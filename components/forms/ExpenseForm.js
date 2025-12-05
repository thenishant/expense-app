import React, {useContext, useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
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
import {AccountContext} from "../../store/AccountContext";
import {Type} from "../../util/category";

export default function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState("");
    const [modalData, setModalData] = useState([]);
    const [subcategoryData, setSubcategoryData] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState("");

    const [amount, setAmount] = useState(defaultValues?.amount?.toString() || "");
    const [date, setDate] = useState(defaultValues ? new Date(defaultValues.date) : getCurrentDate());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [type, setType] = useState(defaultValues?.type || "");
    const [category, setCategory] = useState(defaultValues?.category || "");
    const [subCategory, setSubCategory] = useState(defaultValues?.subCategory || "");
    const [paymentMode, setPaymentMode] = useState(defaultValues?.paymentMode || "");
    const [fromAccount, setFromAccount] = useState(defaultValues?.fromAccount || "");
    const [toAccount, setToAccount] = useState(defaultValues?.toAccount || "");

    const accountContext = useContext(AccountContext);

    const categories = convertToTable(getMainCategories(getCategoryData()));
    const accounts = convertToTable((accountContext.accounts.accounts ?? []).map(a => a.accountName));

    function getCategoryData() {
        if (type === Type.EXPENSE) return categoriesType;
        if (type === Type.INVESTMENT) return investmentCategoryType;
        return incomeCategoryType;
    }

    const openModal = (key, data) => {
        setSelectedInput(key);
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
        if (selectedInput === "fromAccount") setFromAccount(item);
        if (selectedInput === "toAccount") setToAccount(item);

        setModalVisible(false);
    };

    const onChangeDate = (_, selectedDate) => {
        if (Platform.OS === "android") setShowDatePicker(false);
        if (selectedDate) setDate(selectedDate);
    };

    const submitHandler = () => {
        const data = {
            amount: +amount, date, type, category, subCategory, paymentMode, fromAccount, toAccount,
        };

        if (type === Type.TRANSFER) {
            delete data.category;
            delete data.subCategory;
            delete data.paymentMode;
        } else if (type === Type.INCOME) {
            delete data.paymentMode;
        }

        if (isNaN(data.amount) || data.amount <= 0 || !type) return;
        if (type !== Type.TRANSFER && !category) return;
        if (!fromAccount) return;

        onSubmit(removeEmojisOnForm(data));
    };

    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}>

                {/* ---------------- Row 1: Amount | Date ---------------- */}
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.label}>Amount</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="decimal-pad"
                            value={amount}
                            onChangeText={setAmount}
                        />
                    </View>

                    <View style={styles.col}>
                        <Text style={styles.label}>Date</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text>{date.toDateString()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* iOS/Android Date Picker (outside the rows to avoid UI breaking) */}
                {showDatePicker && (<View style={styles.datePickerWrapper}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={onChangeDate}
                    />

                    {Platform.OS === "ios" && (<TouchableOpacity
                        style={styles.doneButton}
                        onPress={() => setShowDatePicker(false)}
                    >
                        <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>)}
                </View>)}

                {/* ---------------- Row 2: Type | Payment Mode ---------------- */}
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.label}>Type</Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={type}
                            onTouchStart={() => openModal("type", convertToTable(typesData))}
                        />
                    </View>

                    <View style={styles.col}>
                        <Text style={styles.label}>Payment Mode</Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={paymentMode}
                            onTouchStart={() => openModal("paymentMode", convertToTable(paymentModeData))}
                        />
                    </View>
                </View>

                {/* ---------------- Row 3: From | To Account ---------------- */}
                {type === Type.TRANSFER && (<View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.label}>From Account</Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={fromAccount}
                            onTouchStart={() => openModal("fromAccount", accounts)}
                        />
                    </View>

                    <View style={styles.col}>
                        <Text style={styles.label}>To Account</Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={toAccount}
                            onTouchStart={() => openModal("toAccount", accounts)}
                        />
                    </View>
                </View>)}

                {type !== Type.TRANSFER && (<View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.label}>From Account</Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={fromAccount}
                            onTouchStart={() => openModal("fromAccount", accounts)}
                        />
                    </View>

                    <View style={styles.col}/>
                </View>)}

                {/* ---------------- Row 4: Category | Subcategory ---------------- */}
                {type !== Type.TRANSFER && (<View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.label}>Category</Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={category}
                            onTouchStart={() => openModal("category", categories)}
                        />
                    </View>

                    <View style={styles.col}>
                        <Text style={styles.label}>Subcategory</Text>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={subCategory}
                            onTouchStart={() => {
                                if (subcategoryData.length > 0) setSubcategoryModalVisible(true);
                            }}
                        />
                    </View>
                </View>)}

                {/* ---------------- Buttons ---------------- */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "#dc3545", marginRight: 5}]}
                        onPress={onCancel}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "#28A745", marginLeft: 5}]}
                        onPress={submitHandler}
                    >
                        <Text style={styles.buttonText}>{submitButtonLabel}</Text>
                    </TouchableOpacity>
                </View>

                {/* ---------------- Modals ---------------- */}
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

            </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>);
}

const styles = StyleSheet.create({
    container: {padding: 20, flexGrow: 1, backgroundColor: "#fff"},

    row: {
        flexDirection: "row", justifyContent: "space-between", marginBottom: 15,
    },

    col: {
        flex: 1, marginHorizontal: 5,
    },

    label: {
        marginBottom: 5, fontWeight: "bold", fontSize: 16,
    },

    input: {
        borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 12, backgroundColor: "#fff",
    },

    datePickerWrapper: {
        backgroundColor: "#fff",
        marginTop: -10,
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },

    doneButton: {
        marginTop: 8,
        alignSelf: "flex-end",
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "#28A745",
        borderRadius: 5,
    },

    doneButtonText: {
        color: "white", fontWeight: "600",
    },

    buttonContainer: {
        flexDirection: "row", marginTop: 30,
    },

    button: {
        flex: 1, padding: 15, borderRadius: 5, alignItems: "center",
    },

    buttonText: {
        color: "#fff", fontWeight: "bold", fontSize: 16,
    },
});
