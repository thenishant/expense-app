import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Input from "../UI/Input";
import Button from "../UI/Button";
import {GlobalStyles} from "../../constansts/styles";
import {getMonth, getYear} from "../../util/Date";
import CustomDatePicker from "../UI/CalenderPicker";

function InvestmentForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const initialDate = defaultValues?.date ? new Date(defaultValues.date) : new Date();

    const [inputs, setInputs] = useState({
        percent: {
            value: defaultValues?.percent?.toString() || '', isValid: true
        }, date: {
            value: initialDate, isValid: true
        }, month: {
            value: getMonth(initialDate), isValid: true
        }, year: {
            value: getYear(initialDate), isValid: true
        }
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
            percent: +inputs.percent.value, month: inputs.month.value, year: inputs.year.value,
        };

        const percentIsValid = !isNaN(data.percent) && data.percent >= 0 && data.percent <= 100;

        if (!percentIsValid) {
            setInputs((current) => ({
                ...current, percent: {...current.percent, isValid: false}
            }));
            return;
        }
        onSubmit(data);
    }


    const formIsInvalid = !inputs.percent.isValid;

    return (<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
            <View style={styles.inputsRow}>
                <Input style={styles.rowInput}
                       label="Investment %"
                       inValid={!inputs.percent.isValid}
                       textInputConfig={{
                           keyboardType: 'decimal-pad',
                           placeholder: "e.g. 20",
                           value: inputs.percent.value,
                           onChangeText: value => changeHandler('percent', value)
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
