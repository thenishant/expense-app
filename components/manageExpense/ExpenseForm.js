import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Input from "./Input";
import Button from "../UI/Button";
import CustomDatePicker from "../UI/DatePickerNative";
import {getCurrentDate} from "../../util/Date";
import {GlobalStyles} from "../../constansts/styles";
import ModalComponent from "../UI/ModalComponent";
import {convertToTableDataWithIcon} from "../../util/Table";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [modalData, setModalData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState('');

    const [inputs, setInputs] = useState({
        amount: {value: defaultValues ? defaultValues.amount.toString() : '', isValid: true},
        date: {value: defaultValues ? new Date(defaultValues.date) : getCurrentDate(), isValid: true},
        desc: {value: defaultValues ? defaultValues.desc : '', isValid: true},
        type: {value: defaultValues ? defaultValues.type : '', isValid: true},
        category: {value: defaultValues ? defaultValues.category : '', isValid: true},
        paymentMode: {value: defaultValues ? defaultValues.paymentMode : '', isValid: true}
    });

    function changeHandler(inputIdentifier, enteredValue) {
        setInputs(currentInput => ({
            ...currentInput, [inputIdentifier]: {value: enteredValue, isValid: true}
        }));
        setModalVisible(false);
    }

    function submitHandler() {
        Keyboard.dismiss();

        const expenseData = {
            amount: +inputs.amount.value,
            date: inputs.date.value,
            desc: inputs.desc.value,
            type: inputs.type.value,
            category: inputs.category.value,
            paymentMode: inputs.paymentMode.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const descIsValid = expenseData.desc.trim().length > 0;
        const categoryIsValid = expenseData.category.trim().length > 0;
        const typeIsValid = expenseData.type.trim().length > 0;

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
        onSubmit(expenseData);
    }

    const formIsValid = !inputs.amount.isValid || !inputs.desc.isValid || !inputs.category.isValid || !inputs.type.isValid || !inputs.paymentMode.isValid;

    const categoryData = [{
        'Investment': 'investment.png',
        'Loan': 'loan.png',
        'Alcohol': 'alcohol.png',
        'Shopping': 'shopping.png',
        'Grocery': 'grocery.png',
        'Dining': 'dining.png',
        'Leisure': 'leisure.png',
        'Home related': 'home.png',
        'Travel': 'travel.png'
    }];

    const types = [{
        'Expense': 'expense.png', 'Income': 'income.png'
    }];

    const paymentModeData = [{
        "Credit Card": "card.png", "Cash": 'cash.png', "Bank Account": 'bank.png'
    }];

    const incomeCategory = [{
        'Interest': 'investment.png', 'ROI': 'loan.png', 'Salary': 'alcohol.png', 'Credit Exchange': 'shopping.png',
    }]

    let categories = inputs.type.value === 'Expense' ? convertToTableDataWithIcon(categoryData) : convertToTableDataWithIcon(incomeCategory);

    let paymentMode = null;

    const openModal = (inputIdentifier, data) => {
        setSelectedInput(inputIdentifier);
        setModalData(data);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleItemClick = (selectedItem) => {
        changeHandler(selectedInput, selectedItem.split('.png ').pop());
    };

    console.log(inputs.date.value)

    const type = <><Input
        label={"Type"}
        inValid={!inputs.type.isValid}
        textInputConfig={{
            editable: false,
            value: inputs.type.value,
            onTouchStart: () => openModal('type', convertToTableDataWithIcon(types)),
            placeholder: "Select type",
        }}
    /></>;

    if (inputs.type.value === 'Expense') {
        paymentMode = (<>
            <Input
                label={"Payment Mode"}
                inValid={!inputs.paymentMode.isValid}
                textInputConfig={{
                    editable: false, value: inputs.paymentMode.value, onTouchStart: () => {
                        openModal('paymentMode', convertToTableDataWithIcon(paymentModeData));
                    }, placeholder: "Select Payment mode",
                }}
            />
        </>);
    }

    let category = null;
    if (inputs.type.value) {
        category = (<View>
            <Input
                label={"Category"}
                inValid={!inputs.category.isValid}
                textInputConfig={{
                    editable: false, value: inputs.category.value, onTouchStart: () => {
                        openModal('category', categories);
                    }, placeholder: "Select category",
                }}
            />
        </View>);
    }

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
                        autoFocus: false
                    }}
                />
                <CustomDatePicker
                    style={styles.rowInput}
                    label={"Date"}
                    onChange={changeHandler.bind(this, 'date')}
                    config={{
                        value: inputs.date.value,
                    }}
                />
            </View>
            <View>
                {type}
                {paymentMode}
                {category}
            </View>
            <Input
                label={"Description"}
                inValid={!inputs.desc.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: changeHandler.bind(this, 'desc'),
                    value: inputs.desc.value,
                    blurOnSubmit: true
                }}
            />
            {formIsValid && (
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
                showSvg={true}
                modalTitle={'Select option'}
            />
        </View>
    </TouchableWithoutFeedback>);
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
