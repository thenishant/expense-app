import React, {useState} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
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
    typesData
} from "../../data/Data";
import {removeEmojisOnForm} from "../../util/Emoji";
import {Type} from "../../util/category";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState('');
    const [modalData, setModalData] = useState([]);
    const [subcategoryData, setSubcategoryData] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState('');

    const [inputs, setInputs] = useState({
        amount: defaultValues?.amount?.toString() || '',
        date: defaultValues ? new Date(defaultValues.date) : getCurrentDate(),
        type: defaultValues?.type || '',
        category: defaultValues?.category || '',
        subCategory: defaultValues?.subCategory || '',
        paymentMode: defaultValues?.paymentMode || ''
    });

    const changeHandler = (key, value) => {
        setInputs((prev) => ({
            ...prev, [key]: value, ...(key === 'type' && {
                paymentMode: '', category: '', subCategory: ''
            })
        }));
    };

    const openModal = (key, data) => {
        setSelectedInput(key);
        setModalData(data);
        setModalVisible(true);
    };

    const handleItemClick = (item) => {
        if (selectedInput === 'category') {
            changeHandler('category', item);
            setSelectedMainCategory(item);
            const subs = convertToTable(getSubCategories(inputs.type === Type.EXPENSE ? categoriesType : investmentCategoryType, item));
            setSubcategoryData(subs);
            setSubcategoryModalVisible(subs.length > 0);
        } else if (selectedInput === 'subCategory') {
            changeHandler('subCategory', item);
        } else {
            changeHandler(selectedInput, item);
        }
        setModalVisible(false);
    };

    const submitHandler = () => {
        const data = {
            amount: +inputs.amount,
            date: inputs.date,
            type: inputs.type,
            category: inputs.category,
            subCategory: inputs.subCategory,
            paymentMode: inputs.paymentMode
        };

        if (isNaN(data.amount) || data.amount <= 0 || !data.type || !data.category) return;
        onSubmit(removeEmojisOnForm(data));
    };

    const categories = convertToTable(getMainCategories(inputs.type === Type.EXPENSE ? categoriesType : inputs.type === Type.INVESTMENT ? investmentCategoryType : incomeCategoryType));

    const subcategories = convertToTable(getSubCategories(inputs.type === Type.EXPENSE ? categoriesType : investmentCategoryType, selectedMainCategory));

    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.form}>
                    <View style={styles.inputsRow}>
                        <Input
                            label="Amount"
                            textInputConfig={{
                                keyboardType: 'decimal-pad',
                                value: inputs.amount,
                                onChangeText: (v) => changeHandler('amount', v)
                            }}
                            style={styles.rowInput}
                        />
                        <CustomDatePicker
                            label="Date"
                            onChange={(v) => changeHandler('date', v)}
                            config={{value: inputs.date}}
                            style={styles.rowInput}
                        />
                    </View>

                    <View style={styles.inputsRow}>
                        <Input
                            label="Type"
                            textInputConfig={{
                                editable: false,
                                value: inputs.type,
                                onTouchStart: () => openModal('type', convertToTable(typesData))
                            }}
                            style={styles.rowInput}
                        />
                        <Input
                            label="Payment Mode"
                            textInputConfig={{
                                editable: false,
                                value: inputs.paymentMode,
                                onTouchStart: () => openModal('paymentMode', convertToTable(paymentModeData))
                            }}
                            style={styles.rowInput}
                        />
                    </View>

                    <View style={styles.inputsRow}>
                        <Input
                            label="Category"
                            textInputConfig={{
                                editable: false,
                                value: inputs.category,
                                onTouchStart: () => openModal('category', categories)
                            }}
                            style={styles.rowInput}
                        />
                        <Input
                            label="SubCategory"
                            textInputConfig={{
                                editable: false,
                                value: inputs.subCategory,
                                onTouchStart: () => subcategories.length > 0 && setSubcategoryModalVisible(true)
                            }}
                            style={styles.rowInput}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
                        <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
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
                            changeHandler('subCategory', item);
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
    inputsRow: {flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5},
    rowInput: {flex: 1, marginBottom: 5},
    buttons: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
    button: {minWidth: 120, marginHorizontal: 8}
});
