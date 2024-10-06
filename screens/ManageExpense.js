import {StyleSheet, View} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constansts/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import {createExpense, deleteExpense, updateExpense} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const expensesContext = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesContext.expenses.find((expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    if (isSubmitting) return <LoadingOverlay/>

    if (!isSubmitting && error) return <ErrorOverlay message={error}/>

    async function deleteExpenseHandler() {
        setIsSubmitting(true)
        try {
            expensesContext.deleteExpense(editedExpenseId)
            await deleteExpense(editedExpenseId)
            navigation.goBack()
        } catch (error) {
            setError('Could not delete expenses!!')
            setIsSubmitting(false)
        }
    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true)
        try {
            if (isEditing) {
                expensesContext.updateExpense(editedExpenseId, expenseData)
                await updateExpense(editedExpenseId, expenseData)
            } else {
                const id = await createExpense(expenseData);
                expensesContext.addExpense({...expenseData, id: id})
            }
            navigation.goBack()
        } catch (error) {
            setError('Could not save expense!!')
            setIsSubmitting(false)
        }
    }

    return (<View style={styles.container}>
        <ExpenseForm onCancel={cancelHandler}
                     submitButtonLabel={isEditing ? 'Update' : 'Add'}
                     onSubmit={confirmHandler}
                     defaultValues={selectedExpense}/>
        {isEditing && (<View style={styles.deleteContainer}>
            <IconButton icon={'trash'} color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}
            />
        </View>)}
    </View>)
}

export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 24, backgroundColor: GlobalStyles.colors.gray500
    }, deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary700,
        alignItems: 'center'
    }
});

