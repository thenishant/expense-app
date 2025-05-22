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
import {getCurrentDate} from "../../util/Date";
import {convertToTable} from "../../util/Table";
import Input from "../UI/Input";
import ModalComponent from "../UI/ModalComponent";
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
    const [modalData, setModalData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState('');
    const [subcategoryData, setSubcategoryData] = useState([]);
    const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);
    const [selectedMainCategory, setSelectedMainCategory] = useState('');

    const [inputs, setInputs] = useState({
        amount: {value: defaultValues?.amount?.toString() || '', isValid: true},
        date: {value: defaultValues ? new Date(defaultValues.date) : getCurrentDate(), isValid: true},
        type: {value: defaultValues?.type || '', isValid: true},
        category: {value: defaultValues?.category || '', isValid: true},
        subCategory: {value: defaultValues?.subCategory || '', isValid: true},
        paymentMode: {value: defaultValues?.paymentMode || '', isValid: true}
    });

    const getCategoriesForType = (type) => {
        switch (type) {
            case Type.EXPENSE:
                return getMainCategories(categoriesType);
            case Type.INVESTMENT:
                return getMainCategories(investmentCategoryType);
            case Type.INCOME:
                return incomeCategoryType;
            default:
                return [];
        }
    };

    function changeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInput) => ({
            ...currentInput, [inputIdentifier]: {
                value: enteredValue, isValid: true
            }, ...(inputIdentifier === 'type' ? {
                paymentMode: {value: '', isValid: true},
                category: {value: '', isValid: true},
                subCategory: {value: '', isValid: true}
            } : {})
        }));

        setModalVisible(false);
        setSubcategoryModalVisible(false);
    }

    function submitHandler() {
        Keyboard.dismiss();

        const expenseData = {
            amount: +inputs.amount.value,
            date: inputs.date.value,
            type: inputs.type.value,
            category: inputs.category.value,
            subCategory: inputs.subCategory.value,
            paymentMode: inputs.paymentMode.value
        };

        const isValid = Object.entries({
            amount: !isNaN(expenseData.amount) && expenseData.amount > 0,
            category: expenseData.category.trim().length > 0,
            type: inputs.type.value.trim().length > 0
        }).reduce((acc, [key, valid]) => ({
            ...acc, [key]: {...inputs[key], isValid: valid}
        }), {});

        if (!Object.values(isValid).every(field => field.isValid)) {
            setInputs((currentInput) => ({...currentInput, ...isValid}));
            return;
        }
        const dataWithoutEmojis = removeEmojisOnForm(expenseData);
        onSubmit(dataWithoutEmojis);
    }

    const categories = convertToTable(getCategoriesForType(inputs.type.value));
    const subcategories = convertToTable(getSubCategories(inputs.type.value === Type.EXPENSE ? categoriesType : inputs.type.value === Type.INVESTMENT ? investmentCategoryType : null, selectedMainCategory));

    const openModal = (inputIdentifier, data) => {
        setSelectedInput(inputIdentifier);
        setModalData(data);
        setModalVisible(true);
    };

    const handleItemClick = (selectedItem) => {
        const selectedValue = selectedItem.trim();

        const actions = {
            category: () => {
                changeHandler('category', selectedValue);
                setSelectedMainCategory(selectedValue);
                // Set subcategories data for the modal
                let subcats = [];
                if (inputs.type.value === Type.EXPENSE) {
                    subcats = getSubCategories(categoriesType, selectedValue);
                } else if (inputs.type.value === Type.INVESTMENT) {
                    subcats = getSubCategories(investmentCategoryType, selectedValue);
                } else {
                    subcats = [];
                }
                setSubcategoryData(convertToTable(subcats));
                setSubcategoryModalVisible(subcats.length > 0);
            }, subCategory: () => {
                changeHandler('subCategory', selectedValue);
                setSubcategoryModalVisible(false);
            }, default: () => {
                changeHandler(selectedInput, selectedValue);
            }
        };

        (actions[selectedInput] || actions.default)();
        setModalVisible(false);
    };

    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.form}>
                    <View style={styles.inputsRow}>
                        <Input
                            style={styles.rowInput}
                            label="Enter amount"
                            inValid={!inputs.amount.isValid}
                            textInputConfig={{
                                keyboardType: 'decimal-pad',
                                onChangeText: (value) => changeHandler('amount', value),
                                value: inputs.amount.value,
                                onBlur: () => Keyboard.dismiss(),
                            }}
                        />
                        <CustomDatePicker
                            style={styles.rowInput}
                            label="Date"
                            onChange={(value) => changeHandler('date', value)}
                            config={{value: inputs.date.value}}
                        />
                    </View>
                    <View style={styles.inputsRow}>
                        {['type', 'paymentMode'].map((field) => (<Input
                            style={styles.rowInput}
                            key={field}
                            label={`Select ${field}`}
                            inValid={!inputs[field].isValid}
                            textInputConfig={{
                                editable: false,
                                value: inputs[field].value,
                                onTouchStart: () => openModal(field, field === 'paymentMode' ? convertToTable(paymentModeData) : convertToTable(typesData)),
                            }}
                        />))}
                    </View>
                    <View style={styles.inputsRow}>
                        {['category', 'subCategory'].map((field) => (<Input
                            style={styles.rowInput}
                            key={field}
                            label={`Select ${field}`}
                            inValid={!inputs[field].isValid}
                            textInputConfig={{
                                editable: false, value: inputs[field].value, onTouchStart: () => {
                                    if (field === 'category') {
                                        openModal(field, categories);
                                    } else if (field === 'subCategory') {
                                        if (subcategories.length > 0) {
                                            setSubcategoryModalVisible(true);
                                        }
                                    }
                                },
                            }}
                        />))}
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
                        onItemClick={(selectedSubItem) => {
                            changeHandler('subCategory', selectedSubItem);
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
    inputsRow: {flexDirection: "row", justifyContent: "flex-start", marginBottom: 5},
    rowInput: {flex: 1, marginBottom: 5},
    buttons: {flexDirection: 'row', justifyContent: 'center', alignItems: "center"},
    button: {minWidth: 120, marginHorizontal: 8}
});
