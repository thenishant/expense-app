import React, {useState} from 'react';
import {Keyboard, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Button from "../UI/Button";
import CustomDatePicker from "../UI/DatePickerNative";
import {convertToStandardFormat} from "../../util/Date";
import ModalInputField from "../UI/ModalInputField";
import Input from "../UI/Input";
import {
    getMainCategories, getSubCategories, paymentModeData, typesData, incomeCategoryType, investmentCategoryType
} from "../../data/Data";
import {removeEmojisOnForm} from "../../util/Emoji";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {value: defaultValues?.amount?.toString() || '', isValid: true},
        date: {value: defaultValues?.date || new Date(), isValid: true},
        desc: {value: defaultValues?.desc || '', isValid: true},
        type: {value: defaultValues?.type || '', isValid: true},
        category: {value: defaultValues?.category || '', isValid: true},
        subCategory: {value: defaultValues?.subCategory || '', isValid: true},
        paymentMode: {value: defaultValues?.paymentMode || '', isValid: true},
    });

    function changeHandler(inputIdentifier, enteredValue) {
        setInputs(currentInput => ({
            ...currentInput, [inputIdentifier]: {value: enteredValue, isValid: true}
        }));
    }

    function submitHandler() {
        Keyboard.dismiss();

        const expenseData = {
            amount: +inputs.amount.value,
            date: convertToStandardFormat(inputs.date.value),
            desc: inputs.desc.value,
            type: inputs.type.value,
            category: inputs.category.value,
            subCategory: inputs.subCategory.value,
            paymentMode: inputs.paymentMode.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const descIsValid = expenseData.desc.trim().length > 0;
        const categoryIsValid = expenseData.category.length > 0;
        const typeIsValid = expenseData.type.length > 0;

        if (!amountIsValid || !descIsValid || !categoryIsValid || !typeIsValid) {
            setInputs(currentInput => ({
                ...currentInput,
                amount: {...currentInput.amount, isValid: amountIsValid},
                desc: {...currentInput.desc, isValid: descIsValid},
                category: {...currentInput.category, isValid: categoryIsValid},
                type: {...currentInput.type, isValid: typeIsValid}
            }));
            return;
        }

        const dataWithoutEmojis = removeEmojisOnForm(expenseData);
        onSubmit(dataWithoutEmojis); // Pass cleaned data to onSubmit
    }


    const type = (<ModalInputField
        label="Type"
        value={inputs.type.value}
        placeholder="Select type"
        data={typesData}
        onChange={value => changeHandler('type', value)}
    />);

    const expense = typesData[0];
    const investment = typesData[1];
    const income = typesData[2];
    let categoryData;
    let subCategoryData;

    if (inputs.type.value === expense) {
        categoryData = getMainCategories();
        subCategoryData = getSubCategories(inputs.category.value);
    } else if (inputs.type.value === investment) {
        categoryData = investmentCategoryType;
    } else {
        categoryData = incomeCategoryType;
        subCategoryData = getSubCategories(inputs.category.value);
    }

    const category = (<ModalInputField
        label="Category"
        value={inputs.category.value}
        placeholder="Select category"
        data={categoryData}
        onChange={value => changeHandler('category', value)}
    />);
    const subCategory = (<ModalInputField
        label="Sub Category"
        value={inputs.subCategory.value}
        placeholder="Select sub category"
        data={subCategoryData}
        onChange={value => changeHandler('subCategory', value)}
    />);
    const paymentMode = (<ModalInputField
        label="Payment Mode"
        value={inputs.paymentMode.value}
        placeholder="Select payment mode"
        data={paymentModeData}
        onChange={value => changeHandler('paymentMode', value)}
    />);
    const description = (<Input
        label="Description"
        inValid={!inputs.desc.isValid}
        textInputConfig={{
            onChangeText: changeHandler.bind(this, 'desc'), value: inputs.desc.value, placeholder: "Enter Description",
        }}
    />);

    return (<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label="Amount"
                    inValid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: changeHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                        placeholder: "Enter amount",
                    }}
                />
                <CustomDatePicker
                    style={styles.input}
                    label="Date"
                    onChange={value => changeHandler('date', value)}
                    config={{value: inputs.date.value}}
                />
            </View>
            {type}
            {inputs.type.value === expense && (<>
                {paymentMode}
                {category}
                {subCategory}
            </>)}
            {inputs.type.value === investment && (<>
                {paymentMode}
                {category}
            </>)}
            {inputs.type.value === income && (<>
                {category}
            </>)}
            {description}
            <View style={styles.buttons}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
        </View>
    </TouchableWithoutFeedback>);
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 8,
    }, input: {
        borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 8, borderRadius: 4,
    }, rowInput: {
        flex: 1,
    }, inputsRow: {
        flexDirection: 'row', justifyContent: 'space-between',
    }, buttons: {
        flexDirection: 'row', justifyContent: 'center',
    }, button: {
        minWidth: 120, marginHorizontal: 8,
    },
});
