import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Input from "../UI/Input";
import Button from "../UI/Button";
import {GlobalStyles} from "../../constansts/styles";
import {getMonth, getYear} from "../../util/Date";
import CustomDatePicker from "../UI/DatePickerNative";

function InvestmentForm({onCancel, onSubmit, submitButtonLabel}) {
    const [inputs, setInputs] = useState({
        investmentPercent: {value: '', isValid: true},
        date: {value: new Date(), isValid: true},
        month: {value: new Date().toLocaleString('default', {month: 'short'}), isValid: true},
        year: {value: new Date().getFullYear().toString(), isValid: true}
    });

    function changeHandler(field, value) {
        setInputs((current) => ({
            ...current, [field]: {value, isValid: true}
        }));
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

        const data = {
            investmentPercent: +inputs.investmentPercent.value, month: inputs.month.value, year: +inputs.year.value,
        };

        const percentIsValid = !isNaN(data.investmentPercent) && data.investmentPercent >= 0 && data.investmentPercent <= 100;

        if (!percentIsValid) {
            setInputs((current) => ({
                ...current, investmentPercent: {...current.investmentPercent, isValid: false}
            }));
            return;
        }

        onSubmit(data);
    }

    const formIsInvalid = !inputs.investmentPercent.isValid;

    return (<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
            <View style={styles.inputsRow}>
                <Input style={styles.rowInput}
                       label="Investment %"
                       inValid={!inputs.investmentPercent.isValid}
                       textInputConfig={{
                           keyboardType: 'decimal-pad',
                           placeholder: "e.g. 20",
                           value: inputs.investmentPercent.value,
                           onChangeText: value => changeHandler('investmentPercent', value)
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
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Month"
                    textInputConfig={{editable: false, value: inputs.month.value}}
                />
                <Input
                    style={styles.rowInput}
                    label="Year"
                    textInputConfig={{editable: false, value: inputs.year.value}}
                />
            </View>
            {formIsInvalid && (<Text style={styles.errorText}>Enter a valid investment percentage (0-100)</Text>)}
            <View style={styles.buttons}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
        </View>
    </TouchableWithoutFeedback>);
}

export default InvestmentForm;

const styles = StyleSheet.create({
    form: {marginTop: 1}, inputsRow: {
        flexDirection: "row", justifyContent: "space-between", marginTop: 1, marginBottom: 1,
    }, rowInput: {flex: 1, marginHorizontal: 10}, buttons: {
        flexDirection: 'row', justifyContent: 'center', alignItems: "center", paddingRight: 50, marginTop: 16
    }, button: {minWidth: 120, marginHorizontal: 8}, errorText: {
        textAlign: "center", color: GlobalStyles.colors.error500, marginTop: 8
    }
});
