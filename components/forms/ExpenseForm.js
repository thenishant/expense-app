import React, {useContext, useEffect, useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from "react-native";

import {getCurrentDate} from "../../util/Date";
import {convertToTable} from "../../util/Table";
import {getMainCategories, getSubCategories, paymentModeData, typesData} from "../../data/Data";

import {removeEmojisOnForm} from "../../util/Emoji";
import {AccountContext} from "../../store/AccountContext";
import {Type} from "../../util/category";

import SelectField from "../UI/SelectField";
import FormRow from "../UI/FormRow";
import InputField from "../UI/InputField";
import {DangerButton, PrimaryButton} from "../UI/Button";
import ModalSelector from "../UI/ModalSelector";
import CalendarCard from "../UI/CalenderPicker";
import {getAllCategories} from "../../util/http";
import IconButton from "../UI/IconButton";
import {GlobalStyles} from "../../constansts/styles";

export default function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues, onDelete}) {
    const [form, setForm] = useState({
        amount: defaultValues?.amount?.toString() || "",
        date: defaultValues ? new Date(defaultValues.date) : getCurrentDate(),
        type: defaultValues?.type || "",
        category: defaultValues?.category || "",
        subCategory: defaultValues?.subCategory || "",
        paymentMode: defaultValues?.paymentMode || "",
        fromAccount: defaultValues?.fromAccount || "",
        toAccount: defaultValues?.toAccount || "",
    });

    const [modal, setModal] = useState({visible: false, key: "", data: []});
    const [subModal, setSubModal] = useState({visible: false, data: []});
    const [showCalendar, setShowCalendar] = useState(false);
    const accountContext = useContext(AccountContext);
    const accounts = convertToTable((accountContext?.accounts?.accounts ?? []).map(a => a.accountName));

    const update = (key, value) => setForm((prev) => ({...prev, [key]: value}));
    const [allCategories, setAllCategories] = useState(null);

    useEffect(() => {
        getAllCategories().then(setAllCategories);
    }, []);

    const getCategoryList = () => {
        if (!allCategories) return {};

        if (form.type === Type.EXPENSE) return allCategories.Expense;
        if (form.type === Type.INVESTMENT) return allCategories.Investment;
        return allCategories.Income;
    };

    const openModal = (key, data) => setModal({visible: true, key, data});

    const handleSelect = (item) => {
        if (modal.key === "type") {
            update("type", item);
            update("category", "");
            update("subCategory", "");
        }

        if (modal.key === "category") {
            update("category", item);
            const subs = convertToTable(getSubCategories(getCategoryList(), item));
            if (subs.length) setSubModal({visible: true, data: subs});
        }
        if (modal.key === "subCategory") update("subCategory", item);
        if (modal.key === "paymentMode") update("paymentMode", item);
        if (modal.key === "fromAccount") update("fromAccount", item);
        if (modal.key === "toAccount") update("toAccount", item);

        setModal({...modal, visible: false});
    };

    const submitHandler = () => {
        const payload = {...form, amount: +form.amount};

        if (form.type === Type.TRANSFER) {
            delete payload.category;
            delete payload.subCategory;
            delete payload.paymentMode;
        } else if (form.type === Type.INCOME) delete payload.paymentMode;
        if (+form.amount <= 0 || !form.type) return;
        if (!form.fromAccount) return;
        if (form.type !== Type.TRANSFER && !form.category) return;
        onSubmit(removeEmojisOnForm(payload));
    };

    return (<KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrapper}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.screenBackground}>
                <ScrollView contentContainerStyle={styles.container}>
                    <FormRow>
                        <InputField
                            label="Amount"
                            value={form.amount}
                            onChangeText={(v) => update("amount", v)}
                            keyboardType="decimal-pad"
                        />

                        <SelectField
                            label="Date"
                            value={form.date.toDateString()}
                            placeholder="Pick date"
                            onPress={() => setShowCalendar(true)}
                        />
                    </FormRow>

                    <FormRow>
                        <SelectField
                            label="Type"
                            value={form.type}
                            onPress={() => openModal("type", convertToTable(typesData))}
                        />

                        <SelectField
                            label="Payment Mode"
                            value={form.paymentMode}
                            onPress={() => openModal("paymentMode", convertToTable(paymentModeData))}
                        />
                    </FormRow>

                    <FormRow>
                        <SelectField
                            label="From Account"
                            value={form.fromAccount}
                            onPress={() => openModal("fromAccount", accounts)}
                        />

                        {form.type === Type.TRANSFER ? (<SelectField
                            label="To Account"
                            value={form.toAccount}
                            onPress={() => openModal("toAccount", accounts)}
                        />) : (<View style={{flex: 1, marginHorizontal: 5}}/>)}
                    </FormRow>

                    {form.type !== Type.TRANSFER && (<FormRow>
                        <SelectField
                            label="Category"
                            value={form.category}
                            onPress={() => openModal("category", convertToTable(getMainCategories(getCategoryList())))}
                        />

                        <SelectField
                            label="Subcategory"
                            value={form.subCategory}
                            onPress={() => subModal.data.length && setSubModal({...subModal, visible: true})}
                        />
                    </FormRow>)}

                    <View style={styles.buttons}>
                        <DangerButton title="Cancel" onPress={onCancel}/>
                        <PrimaryButton title={submitButtonLabel} onPress={submitHandler}/>
                    </View>

                    {onDelete && (<View style={styles.deleteContainer}>
                        <IconButton
                            icon="trash"
                            color={GlobalStyles.colors.error500}
                            size={32}
                            onPress={onDelete}
                        />
                    </View>)}
                </ScrollView>

                <CalendarCard
                    visible={showCalendar}
                    date={form.date}
                    onChange={(d) => update("date", d)}
                    onClose={() => setShowCalendar(false)}
                />

                <ModalSelector
                    visible={modal.visible}
                    title="Select option"
                    data={modal.data}
                    onClose={() => setModal({...modal, visible: false})}
                    onSelect={handleSelect}
                />

                <ModalSelector
                    visible={subModal.visible}
                    title="Select Subcategory"
                    data={subModal.data}
                    onClose={() => setSubModal({...subModal, visible: false})}
                    onSelect={(item) => {
                        update("subCategory", item);
                        setSubModal({...subModal, visible: false});
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>);
}

const styles = StyleSheet.create({
    wrapper: {flex: 1},
    screenBackground: {flex: 1, backgroundColor: "#F3F4F6"},
    container: {padding: 20},
    buttons: {flexDirection: "row", marginTop: 25},
    calendarOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    deleteContainer: {
        marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#fa0522", alignItems: "center"
    }
});
