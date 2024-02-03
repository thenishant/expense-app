import {StyleSheet, Text, View} from "react-native";
import {useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constansts/styles";
import Button from "../components/UI/Button";

function ManageExpense({route, navigation}) {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        navigation.goBack()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    function confirmHandler() {
        navigation.goBack()
    }

    return (<View style={styles.container}>
        <View style={styles.buttons}>
            <Button mode={'flat'} onPress={cancelHandler} style={styles.button}>Cancel</Button>
            <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
        </View>
        {isEditing && (<View style={styles.deleteContainer}>
            <IconButton icon={'trash'} color={GlobalStyles.colors.error500} size={36} onPress={() => {
            }}
            />
        </View>)}
    </View>)
}

export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 24, backgroundColor: GlobalStyles.colors.gray500
    }, buttons: {
        flexDirection: 'row', justifyContent: 'center', alignItems: "center"
    }, button: {
        minWidth: 120, marginHorizontal: 8
    }, deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary700,
        alignItems: 'center'
    }
});

