import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import {CategoryContext} from "../../../store/category-context";
import {ExpensesContext} from "../../../store/expenses-context";
import PieChart from "../../../components/charts/PieChart";

function ExpensePerMonthChart() {
    const categoryContext = useContext(CategoryContext);
    const expenseContext = useContext(ExpensesContext)

    const categoryColors = ["#f15bb5", "#fee440", "#00bbf9", "#00f5d4", "#f79256", "#90fe00", "#cc17ff", "#ff0000", "#adb5bd"];

    const transformedData = categoryContext.category.map((item, index) => ({
        x: item.category, y: item.amount, color: categoryColors[index % categoryColors.length], percent: item.percentage
    })).sort((a, b) => b.y - a.y);

    if (!transformedData.length) return <LoadingOverlay/>;

    return (<View style={styles.container}>
        {transformedData.length > 0 && (<View style={styles.chart}>
            <PieChart
                chartData={transformedData}
                showInnerRadius={true}
                chartTitleName="Expenses"
                chartTitleCount={expenseContext.expenses.length}/>
        </View>)}
    </View>);
}

export default ExpensePerMonthChart;

const styles = StyleSheet.create({
    chart: {flex: 1, alignItems: 'center', justifyContent: 'center'}, container: {
        backgroundColor: '#ffffff', margin: 8, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flex: 1
    }
});
