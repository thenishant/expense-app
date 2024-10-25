import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Input from "../UI/Input";
import Button from "../UI/Button";
import CustomDatePicker from "../UI/DatePickerNative";
import {convertToStandardFormat, getMonth, getYear} from "../../util/Date";
import {GlobalStyles} from "../../constansts/styles";
import ModalComponent from "../UI/ModalComponent";
import {convertToTable} from "../../util/Table";

function BudgetForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [modalData, setModalData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState('');

    const [inputs, setInputs] = useState({
        amount: {value: defaultValues ? defaultValues.amount.toString() : '', isValid: true},
        date: {value: defaultValues ? new Date(defaultValues.date) : new Date(), isValid: true},
        category: {value: defaultValues ? defaultValues.category : '', isValid: true},
        year: {
            value: defaultValues ? defaultValues.year.toString() : new Date().getFullYear().toString(), isValid: true
        },
        month: {
            value: defaultValues ? defaultValues.month : new Date().toLocaleString('default', {month: 'short'}),
            isValid: true
        }
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

        const budgetData = {
            amount: +inputs.amount.value,
            date: convertToStandardFormat(inputs.date.value),
            month: inputs.month.value,
            category: inputs.category.value,
            year: +inputs.year.value,
        };

        const amountIsValid = !isNaN(budgetData.amount) && budgetData.amount > 0;
        const categoryIsValid = budgetData.category.trim().length > 0;
        const yearIsValid = !isNaN(budgetData.year) && budgetData.year > 0;

        if (!amountIsValid || !categoryIsValid || !yearIsValid) {
            setInputs((currentInput) => ({
                ...currentInput,
                amount: {...currentInput.amount, isValid: amountIsValid},
                category: {...currentInput.category, isValid: categoryIsValid},
                year: {...currentInput.year, isValid: yearIsValid}
            }));
            return;
        }
        onSubmit(budgetData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.category.isValid || !inputs.year.isValid;

    const categoryData = ['🏦 Loan', '🛍️ Shopping', '🥗 Grocery', '🏠 Home', '🏕️ Leisure'];

    const openModal = (inputIdentifier, data) => {
        setSelectedInput(inputIdentifier);
        setModalData(data);
        setModalVisible(true);
    };

    const closeModal = () => setModalVisible(false);

    const handleItemClick = (selectedItem) => {
        changeHandler(selectedInput, selectedItem.replace(/\p{Emoji}/gu, '').trim());
    };

    return (<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label={"Amount"}
                    inValid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: changeHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                        placeholder: "Enter amount",
                    }}
                />
                <CustomDatePicker
                    style={styles.rowInput}
                    label={"Date"}
                    onChange={dateChangeHandler}
                    config={{
                        value: inputs.date.value,
                    }}
                />
            </View>
            <View>
                <Input
                    label={"Category"}
                    inValid={!inputs.category.isValid}
                    textInputConfig={{
                        editable: false,
                        value: inputs.category.value,
                        onTouchStart: () => openModal('category', convertToTable(categoryData)),
                        placeholder: "Select category",
                    }}
                />
            </View>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label={"Month"}
                    inValid={!inputs.month.isValid}
                    textInputConfig={{
                        editable: false, value: inputs.month.value, placeholder: "Month",
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label={"Year"}
                    inValid={!inputs.year.isValid}
                    textInputConfig={{
                        editable: false, value: inputs.year.value, placeholder: "Year",
                    }}
                />
            </View>
            {formIsInvalid && (
                <Text style={styles.errorText}>Invalid input values - please check your entered data</Text>)}
            <View style={styles.buttons}>
                <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
            <ModalComponent
                visible={modalVisible}
                data={modalData}
                onClose={closeModal}
                onItemClick={handleItemClick}
                modalTitle={'Select option'}
            />
        </View>
    </TouchableWithoutFeedback>);
}

export default BudgetForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 8,
    }, inputsRow: {
        flexDirection: "row", justifyContent: "space-between", marginBottom: 12,
    }, rowInput: {
        flex: 1, marginHorizontal: 5,
    }, buttons: {
        flexDirection: 'row', justifyContent: 'center', alignItems: "center", paddingRight: 50
    }, button: {
        minWidth: 120, marginHorizontal: 8
    }, errorText: {
        textAlign: "center", color: GlobalStyles.colors.error500, margin: 8
    }
});
