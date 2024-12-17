import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Input from "../UI/Input";
import Button from "../UI/Button";
import CustomDatePicker from "../UI/DatePickerNative";
import {convertToStandardFormat, getMonth, getYear} from "../../util/Date";
import {GlobalStyles} from "../../constansts/styles";
import ModalInputField from "../UI/ModalInputField";
import {getMainCategories} from "../../data/Data";

function BudgetForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [modalVisible, setModalVisible] = useState(false);

    const [inputs, setInputs] = useState({
        amount: {value: defaultValues?.amount?.toString() || '', isValid: true},
        date: {value: new Date(), isValid: true},
        category: {value: '', isValid: true},
        year: {
            value: new Date().getFullYear().toString(), isValid: true
        },
        month: {
            value: new Date().toLocaleString('default', {month: 'short'}),
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
                <ModalInputField
                    label="Category"
                    value={inputs.category.value}
                    placeholder="Select category"
                    data={getMainCategories()}
                    onChange={value => changeHandler('category', value)}
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
