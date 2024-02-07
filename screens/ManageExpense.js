import {StyleSheet, View} from "react-native";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constansts/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import {storeExpense} from "../util/http";

function ManageExpense({route, navigation}) {
    const expensesContext = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesContext.expenses.find((expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expensesContext.deleteExpense(editedExpenseId)
        navigation.goBack()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    function confirmHandler(expenseData) {
        if (isEditing) {
            expensesContext.updateExpense(editedExpenseId, expenseData)
        } else {
            storeExpense(expenseData)
            expensesContext.addExpense(expenseData)
        }
        navigation.goBack()
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

