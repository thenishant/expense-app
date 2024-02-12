import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Input from "./Input";
import Button from "../UI/Button";
import CustomDatePicker from "../UI/DatePickerNative";
import {GlobalStyles} from "../../constansts/styles";
import {getFormattedDate} from "../../util/Date";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {value: defaultValues ? defaultValues.amount.toString() : '', isValid: true},
        date: {value: getFormattedDate(new Date()), isValid: true},
        desc: {value: defaultValues ? defaultValues.desc : '', isValid: true}
    });

    function changeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInput) => ({
            ...currentInput, [inputIdentifier]: {value: enteredValue, isValid: true}
        }));
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value, date: inputs.date.value, desc: inputs.desc.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const descIsValid = expenseData.desc.trim().length > 0;

        if (!amountIsValid || !descIsValid) {
            setInputs((currentInput) => ({
                ...currentInput,
                amount: {...currentInput.amount, isValid: amountIsValid},
                desc: {...currentInput.desc, isValid: descIsValid}
            }));
            return;
        }
        onSubmit(expenseData);
    }

    const formIsValid = !inputs.amount.isValid || !inputs.desc.isValid;

    return (<View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label={"Amount"}
                    inValid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: changeHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                    }}
                />
                <CustomDatePicker
                    style={styles.rowInput}
                    label={"Date"}
                    onChange={changeHandler.bind(this, 'date')}
                    textInputConfig={{
                        value: inputs.date.value,
                    }}
                />
            </View>
            <Input
                label={"Description"}
                inValid={!inputs.desc.isValid}
                textInputConfig={{
                    multiline: true, onChangeText: changeHandler.bind(this, 'desc'), value: inputs.desc.value
                }}
            />
            {formIsValid && (
                <Text style={styles.errorText}>Invalid input values - please check your entered data</Text>)}
            <View style={styles.buttons}>
                <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
        </View>);
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    }, title: {
        fontWeight: 'bold', fontSize: 20, color: 'black', marginVertical: 24, textAlign: 'center'
    }, inputsRow: {
        flexDirection: "row", justifyContent: "space-between"
    }, rowInput: {
        flex: 1
    }, buttons: {
        flexDirection: 'row', justifyContent: 'center', alignItems: "center"
    }, button: {
        minWidth: 120, marginHorizontal: 8
    }, errorText: {
        textAlign: "center", color: GlobalStyles.colors.error500, margin: 8
    }
});
