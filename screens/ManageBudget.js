import {StyleSheet, View} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constansts/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import {BudgetContext} from "../store/budget-context";
import {createBudget} from "../util/http";
import BudgetForm from "../components/forms/BudgetForm";

function ManageBudget({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const budgetsContext = useContext(BudgetContext);
    const editedBudgetId = route.params?.budgetId;
    const isEditing = !!editedBudgetId;

    const selectedBudget = budgetsContext.budgets.find((budget) => budget.id === editedBudgetId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Budget' : 'Add Budget'
        });
    }, [navigation, isEditing]);

    if (isSubmitting) return <LoadingOverlay/>;
    if (!isSubmitting && error) return <ErrorOverlay message={error}/>;

    async function deleteBudgetHandler() {
        setIsSubmitting(true);
        try {
            budgetsContext.deleteBudget(editedBudgetId);
            // await deleteBudget(editedBudgetId);  // Ensure this is implemented in the http util
            navigation.goBack();
        } catch (error) {
            setError('Could not delete budget!!');
            setIsSubmitting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(budgetData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                budgetsContext.updateBudget(editedBudgetId, budgetData);
                // await updateBudget(editedBudgetId, budgetData);  // Ensure this is implemented in the http util
            } else {
                const id = await createBudget(budgetData);  // Ensure this is implemented in the http util
                budgetsContext.addBudget({...budgetData, id});
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save budget!!');
            setIsSubmitting(false);
        }
    }

    return (<View style={styles.container}>
        <BudgetForm
            onCancel={cancelHandler}
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
            defaultValues={selectedBudget}
        />
        {isEditing && (<View style={styles.deleteContainer}>
            <IconButton
                icon={'trash'}
                color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteBudgetHandler}
            />
        </View>)}
    </View>);
}

export default ManageBudget

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
