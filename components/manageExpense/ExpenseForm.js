import {StyleSheet, Text, View} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/Date";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        desc: defaultValues ? defaultValues.desc : ''
    })

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((currentInput) => {
            return {...currentInput, [inputIdentifier]: enteredValue}
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            desc: inputValues.desc
        }
        onSubmit(expenseData)
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input style={styles.rowInput} label={"Amount"} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputValues.amount
                }}/>
                <Input style={styles.rowInput} label={"Date"} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValues.date
                }}/>
            </View>
            <Input label={"Description"} textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'desc'),
                value: inputValues.desc
            }}/>
            <View style={styles.buttons}>
                <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    }, rowInput: {
        flex: 1
    }, buttons: {
        flexDirection: 'row', justifyContent: 'center', alignItems: "center"
    }, button: {
        minWidth: 120, marginHorizontal: 8
    },
});
