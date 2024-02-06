import {Alert, StyleSheet, Text, View} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/Date";
import {GlobalStyles} from "../../constansts/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {value: defaultValues ? defaultValues.amount.toString() : '', isValid: true},
        date: {value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true},
        desc: {value: defaultValues ? defaultValues.desc : '', isValid: true}
    })

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInput) => {
            return {...currentInput, [inputIdentifier]: {value: enteredValue, isValid: true}}
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value, date: new Date(inputs.date.value), desc: inputs.desc.value
        }
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toDateString() !== 'Invalid Date'
        const descIsValid = expenseData.desc.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descIsValid) {
            setInputs((currentInput) => {
                return {
                    amount: {value: currentInput.amount.value, isValid: amountIsValid},
                    date: {value: currentInput.date.value, isValid: dateIsValid},
                    desc: {value: currentInput.desc.value, isValid: descIsValid}
                }
            })
            return
        }
        onSubmit(expenseData)
    }

    const formIsValid = !inputs.amount.isValid || !inputs.desc.isValid || !inputs.date.isValid

    return (<View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input style={styles.rowInput} label={"Amount"}
                   inValid={!inputs.amount.isValid}
                   textInputConfig={{
                       keyboardType: 'decimal-pad',
                       onChangeText: inputChangeHandler.bind(this, 'amount'),
                       value: inputs.amount.value,
                   }}/>
            <Input style={styles.rowInput} label={"Date"}
                   inValid={!inputs.date.isValid}
                   textInputConfig={{
                       placeholder: 'YYYY-MM-DD',
                       maxLength: 10,
                       onChangeText: inputChangeHandler.bind(this, 'date'),
                       value: inputs.date.value
                   }}/>
        </View>
        <Input label={"Description"} inValid={!inputs.desc.isValid}
               textInputConfig={{
                   multiline: true, onChangeText: inputChangeHandler.bind(this, 'desc'), value: inputs.desc.value
               }}/>
        {formIsValid && (<Text style={styles.errorText}>Invalid input values - please check your entered data</Text>)}
        <View style={styles.buttons}>
            <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
            <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
        </View>
    </View>)
}

export default ExpenseForm

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
