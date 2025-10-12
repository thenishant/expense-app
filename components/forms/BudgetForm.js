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
import {convertToStandardFormat, getCurrentDate, getMonth, getYear} from "../../util/Date";
import {convertToTable} from "../../util/Table";
import Input from "../UI/Input";
import ModalComponent from "../UI/ModalComponent";
import {removeEmojisOnForm} from "../../util/Emoji";
import {categoriesType, getMainCategories} from "../../data/Data";

function BudgetForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [modalData, setModalData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState('');
    const [selectedMainCategory, setSelectedMainCategory] = useState('');

    const [inputs, setInputs] = useState({
        amount: {value: defaultValues?.amount?.toString() || '', isValid: true},
        date: {value: defaultValues ? new Date(defaultValues.date) : getCurrentDate(), isValid: true},
        type: {value: defaultValues?.type || '', isValid: true},
        year: {value: new Date().getFullYear().toString(), isValid: true},
        month: {value: new Date().toLocaleString('default', {month: 'short'}),},
        category: {value: defaultValues?.category || '', isValid: true},
        subCategory: {value: defaultValues?.subCategory || '', isValid: true},
        paymentMode: {value: defaultValues?.paymentMode || '', isValid: true}
    });

    function changeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInput) => ({
            ...currentInput, [inputIdentifier]: {value: enteredValue, isValid: true},
        }));
        setModalVisible(false);
    }

    function dateChangeHandler(selectedDate) {
        const selectedMonth = getMonth(selectedDate);
        const selectedYear = getYear(selectedDate);

        setInputs((currentInput) => ({
            ...currentInput,
            date: {value: selectedDate, isValid: true},
            month: {value: selectedMonth, isValid: true},
            year: {value: selectedYear, isValid: true},
        }));
    }

    function submitHandler() {
        Keyboard.dismiss();

        const expenseData = {
            amount: +inputs.amount.value, // date: inputs.date.value,
            date: convertToStandardFormat(inputs.date.value),
            month: inputs.month.value,
            category: inputs.category.value,
            year: +inputs.year.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const categoryIsValid = expenseData.category.trim().length > 0;
        const yearIsValid = !isNaN(expenseData.year) && expenseData.year > 0;

        if (!amountIsValid || !categoryIsValid || !yearIsValid) {
            setInputs((currentInput) => ({
                ...currentInput,
                amount: {...currentInput.amount, isValid: amountIsValid},
                category: {...currentInput.category, isValid: categoryIsValid},
                year: {...currentInput.year, isValid: yearIsValid}
            }));
            return;
        }
        const dataWithoutEmojis = removeEmojisOnForm(expenseData);
        onSubmit(dataWithoutEmojis);
    }

    const categories = convertToTable(getMainCategories(categoriesType));

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
                setSelectedMainCategory(categories);
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
                            onChange={dateChangeHandler}
                            config={{value: inputs.date.value}}
                        />
                    </View>
                    <View style={styles.inputsRow}>
                        {['category'].map((field) => (<Input
                            style={styles.rowInput}
                            key={field}
                            label={`Select ${field}`}
                            inValid={!inputs[field].isValid}
                            textInputConfig={{
                                editable: false, value: inputs[field].value, onTouchStart: () => {
                                    openModal(field, categories);
                                },
                            }}
                        />))}
                    </View>

                    <View style={styles.inputsRow}>
                        <Input
                            style={styles.rowInput}
                            label={"Month"}
                            // inValid={!inputs.month.isValid}
                            textInputConfig={{
                                editable: false, value: inputs.month.value, placeholder: "Month",
                            }}
                        />
                        <Input
                            style={styles.rowInput}
                            label={"Year"}
                            // inValid={!inputs.year.isValid}
                            textInputConfig={{
                                editable: false, value: inputs.year.value, placeholder: "Year",
                            }}
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
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>);
}

export default BudgetForm;

const styles = StyleSheet.create({
    scrollContainer: {flexGrow: 1},
    form: {marginTop: 8},
    inputsRow: {flexDirection: "row", justifyContent: "flex-start", marginBottom: 5},
    rowInput: {flex: 1, marginBottom: 5},
    buttons: {flexDirection: 'row', justifyContent: 'center', alignItems: "center"},
    button: {minWidth: 120, marginHorizontal: 8}
});
