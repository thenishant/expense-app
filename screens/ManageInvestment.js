import {StyleSheet, View} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constansts/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import {createInvestmentPlan} from "../util/http";
import InvestmentForm from "../components/forms/InvestmentForm";
import {SummaryContext} from "../store/summary-context";

function ManageInvestment({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const investmentContext = useContext(SummaryContext);

    const editedInvestmentId = route.params?.id;
    const isEditing = !!editedInvestmentId;
    const selectedInvestment = investmentContext.summary.find(p => p.id === editedInvestmentId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Investment Plan' : 'Add Investment Plan'
        });
    }, [navigation, isEditing]);

    if (isSubmitting) return <LoadingOverlay/>;
    if (!isSubmitting && error) return <ErrorOverlay message={error}/>;

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(data) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                investmentContext.updatePlan(editedInvestmentId, data);
            } else {
                const id = await createInvestmentPlan(data);
                investmentContext.addPlan({...data, id});
            }
            navigation.goBack();
        } catch {
            setError('Could not save investment plan!');
            setIsSubmitting(false);
        }
    }

    function deleteHandler() {
        setIsSubmitting(true);
        try {
            investmentContext.deletePlan(editedInvestmentId);
            navigation.goBack();
        } catch {
            setError('Could not delete investment plan!');
            setIsSubmitting(false);
        }
    }

    return (<View style={styles.container}>
        <InvestmentForm
            onCancel={cancelHandler}
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
            defaultValues={selectedInvestment}
        />
        {isEditing && (<View style={styles.deleteContainer}>
            <IconButton
                icon="trash"
                color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteHandler}
            />
        </View>)}
    </View>);
}

export default ManageInvestment;

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 24, backgroundColor: GlobalStyles.colors.gray500,
    }, deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary700,
        alignItems: 'center',
    },
});
