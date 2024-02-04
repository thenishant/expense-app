import {StyleSheet, Text, View} from "react-native";
import TotalExpense from "./cards/TotalExpense";
import TotalIncome from "./cards/TotalIncome";
import TotalBalance from "./cards/TotalBalance";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";

function AllExpenses() {
    const expensesContext = useContext(ExpensesContext);
    return (
        <>
            {/*<View style={styles.container}>*/}
            {/*    <View style={styles.firstRow}>*/}
            {/*        <TotalExpense/>*/}
            {/*        <TotalIncome/>*/}
            {/*        <TotalBalance/>*/}
            {/*    </View>*/}
            <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod={"Total"}/>
            {/*</View>*/}
        </>
    )
}

export default AllExpenses

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        marginTop: 10
    },
    firstRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
});
