import React, {useCallback, useState} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Button from "../UI/Button";
import CustomDatePicker from "../UI/DatePickerNative";
import {getCurrentDate} from "../../util/Date";
import {convertToTable} from "../../util/Table";
import Input from "../UI/Input";
import ModalComponent from "../UI/ModalComponent";
import {
    categoriesType,
    getMainCategories,
    getSubCategories,
    incomeCategoryType,
    investmentCategoryType,
    paymentModeData,
    typesData
} from "../../data/Data";
import {removeEmojisOnForm} from "../../util/Emoji";
import {Type} from "../../util/category";

const FIELDS = {
    amount: {label: 'Enter amount', type: 'input', required: true},
    date: {label: 'Date', type: 'date'},
    type: {
        label: 'Select type',
        type: 'modal',
        data: typesData,
        required: true,
        clears: ['category', 'subCategory', 'paymentMode']
    },
    paymentMode: {label: 'Select paymentMode', type: 'modal', data: paymentModeData},
    category: {label: 'Select category', type: 'modal', required: true, clears: ['subCategory']},
    subCategory: {label: 'Select subCategory', type: 'modal'}
};

const ROWS = [['amount', 'date'], ['type', 'paymentMode'], ['category', 'subCategory']];

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [modal, setModal] = useState({visible: false, data: [], field: '', title: ''});
    const [form, setForm] = useState(() => Object.keys(FIELDS).reduce((acc, key) => ({
        ...acc, [key]: {
            value: key === 'date' ? (defaultValues?.date ? new Date(defaultValues.date) : getCurrentDate()) : (defaultValues?.[key]?.toString() || ''),
            isValid: true
        }
    }), {}));

    const getFieldData = (field) => {
        const dataMap = {
            type: () => typesData, paymentMode: () => paymentModeData, category: () => ({
                [Type.EXPENSE]: getMainCategories(categoriesType),
                [Type.INVESTMENT]: getMainCategories(investmentCategoryType),
                [Type.INCOME]: incomeCategoryType
            }[form.type.value] || []), subCategory: () => ({
                [Type.EXPENSE]: getSubCategories(categoriesType, form.category.value),
                [Type.INVESTMENT]: getSubCategories(investmentCategoryType, form.category.value)
            }[form.type.value] || [])
        };
        return convertToTable(dataMap[field]?.() || []);
    };

    const updateField = useCallback((field, value) => {
        setForm(prev => {
            const updates = {[field]: {value, isValid: true}};
            FIELDS[field].clears?.forEach(f => updates[f] = {value: '', isValid: true});
            return {...prev, ...updates};
        });
    }, []);

    const openModal = (field) => {
        const data = getFieldData(field);
        setModal({visible: true, data, field, title: FIELDS[field].label});
    };

    const handleSelect = (value) => {
        updateField(modal.field, value.trim());
        setModal(prev => ({...prev, visible: false}));

        // Auto-open subcategory if category selected and has subcategories
        modal.field === 'category' && getFieldData('subCategory').length > 0 && setTimeout(() => openModal('subCategory'), 100);
    };

    const handleSubmit = () => {
        Keyboard.dismiss();
        const data = Object.keys(FIELDS).reduce((acc, key) => ({
            ...acc, [key]: key === 'amount' ? +form[key].value : key === 'date' ? form[key].value : form[key].value
        }), {});

        const validation = Object.keys(FIELDS).reduce((acc, key) => {
            const isValid = !FIELDS[key].required || (key === 'amount' ? !isNaN(data[key]) && data[key] > 0 : data[key].trim());
            return {...acc, [key]: {...form[key], isValid}};
        }, {});

        const hasErrors = Object.values(validation).some(f => !f.isValid);
        hasErrors ? setForm(validation) : onSubmit(removeEmojisOnForm(data));
    };

    const renderField = (key) => {
        const config = FIELDS[key];
        const field = form[key];
        const props = {key, style: styles.rowInput, label: config.label, inValid: !field.isValid};

        const components = {
            input: () => <Input {...props} textInputConfig={{
                keyboardType: key === 'amount' ? 'decimal-pad' : 'default',
                onChangeText: (v) => updateField(key, v),
                value: field.value,
                onBlur: Keyboard.dismiss
            }}/>,
            date: () => <CustomDatePicker {...props} onChange={(v) => updateField(key, v)}
                                          config={{value: field.value}}/>,
            modal: () => <Input {...props} textInputConfig={{
                editable: false, value: field.value, onTouchStart: () => openModal(key)
            }}/>
        };

        return components[config.type]();
    };

    return (<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.form}>
                    {ROWS.map((row, i) => (<View key={i} style={styles.inputsRow}>
                        {row.map(renderField)}
                    </View>))}
                    <View style={styles.buttons}>
                        <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
                        <Button onPress={handleSubmit} style={styles.button}>{submitButtonLabel}</Button>
                    </View>
                    <ModalComponent
                        visible={modal.visible}
                        data={modal.data}
                        onClose={() => setModal(prev => ({...prev, visible: false}))}
                        onItemClick={handleSelect}
                        modalTitle={modal.title}
                    />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>);
}

export default ExpenseForm;

const styles = StyleSheet.create({
    scrollContainer: {flexGrow: 1},
    form: {marginTop: 8},
    inputsRow: {flexDirection: "row", justifyContent: "flex-start", marginBottom: 5},
    rowInput: {flex: 1, marginBottom: 5},
    buttons: {flexDirection: 'row', justifyContent: 'center', alignItems: "center"},
    button: {minWidth: 120, marginHorizontal: 8}
});