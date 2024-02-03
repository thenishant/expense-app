import {StyleSheet, Text, View} from "react-native";
import TotalExpense from "./cards/TotalExpense";
import TotalIncome from "./cards/TotalIncome";
import TotalBalance from "./cards/TotalBalance";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";

function AllExpenses() {
    return (
        <>
            {/*<View style={styles.container}>*/}
            {/*    <View style={styles.firstRow}>*/}
            {/*        <TotalExpense/>*/}
            {/*        <TotalIncome/>*/}
            {/*        <TotalBalance/>*/}
            {/*    </View>*/}
            <ExpensesOutput expensesPeriod={"Total"}/>
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
