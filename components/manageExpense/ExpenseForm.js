import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Input from "./Input";
import Button from "../UI/Button";
import CustomDatePicker from "../UI/DatePickerNative";
import {getFormattedDate} from "../../util/Date";
import TextSelector from "../UI/TextSelector";
import {GlobalStyles} from "../../constansts/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const texts = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5", "Text 6", "Text 7", "Text 8", "Text 9", "Text 10"];
    const text2 = ["Text 11", "Text 12", "Text 13", "Text 14", "Text 15", "Text 16", "Text 17", "Text 18", "Text 19", "Text 10"];

    const [inputs, setInputs] = useState({
        amount: {value: defaultValues ? defaultValues.amount.toString() : '', isValid: true},
        date: {value: getFormattedDate(new Date()), isValid: true},
        desc: {value: defaultValues ? defaultValues.desc : '', isValid: true},
        type: {value: defaultValues ? defaultValues.type : '', isValid: true},
        category: {value: defaultValues ? defaultValues.category : '', isValid: true}
    });

    function changeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInput) => ({
            ...currentInput, [inputIdentifier]: {value: enteredValue, isValid: true}
        }));
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: inputs.date.value,
            desc: inputs.desc.value,
            type: inputs.type.value,
            category: inputs.category.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const descIsValid = expenseData.desc.trim().length > 0;
        const categoryIsValid = expenseData.category.trim().length > 0;

        if (!amountIsValid || !descIsValid || !categoryIsValid) {
            setInputs((currentInput) => ({
                ...currentInput,
                amount: {...currentInput.amount, isValid: amountIsValid},
                desc: {...currentInput.desc, isValid: descIsValid},
                category: {...currentInput.category, isValid: categoryIsValid}
            }));
            return;
        }
        onSubmit(expenseData);
    }

    const formIsValid = !inputs.amount.isValid || !inputs.desc.isValid || !inputs.category.isValid;

    return (<View style={styles.form}>
        <View style={styles.inputsRow}>
            <Input
                style={styles.rowInput}
                label={"Amount"}
                inValid={!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: changeHandler.bind(this, 'amount'),
                    value: inputs.amount.value,
                    placeholder: "Enter amount"
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
        <View>
            <TextSelector
                label={"Type"}
                data={texts}
                config={{
                    value: inputs.type.value, onChangeText: changeHandler.bind(this, 'type')
                }}
            />

            <TextSelector
                label={"Category"}
                data={text2}
                config={{
                    value: inputs.category.value, onChangeText: changeHandler.bind(this, 'category')
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
        {formIsValid && (<Text style={styles.errorText}>Invalid input values - please check your entered data</Text>)}
        <View style={styles.buttons}>
            <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
            <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
        </View>
    </View>);
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 8,
    }, title: {
        fontWeight: 'bold', fontSize: 20, color: 'black', marginVertical: 24, textAlign: 'center'
    }, inputsRow: {
        flexDirection: "row", justifyContent: "flex-start"
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
