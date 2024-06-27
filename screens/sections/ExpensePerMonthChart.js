import React, {useContext} from "react";
import PieChartWithLabel from "../../components/charts/PieChartWithLabel";
import {StyleSheet, View} from "react-native";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import {CategoryContext} from "../../store/category-context";
import {ExpensesContext} from "../../store/expenses-context";

function ExpensePerMonthChart({selectedMonth}) {
    const categoryContext = useContext(CategoryContext);
    const expenseContext = useContext(ExpensesContext)

    const categoryColors = ["#f15bb5", "#fee440", "#00bbf9", "#00f5d4", "#f79256", "#90fe00", "#cc17ff", "#ff0000", "#adb5bd"];

    const transformedData = categoryContext.category.map((item, index) => ({
        x: item.category, y: item.amount, color: categoryColors[index % categoryColors.length], percent: item.percent
    })).sort((a, b) => b.percent - a.percent);

    if (!transformedData.length) return <LoadingOverlay/>;

    return (<View style={styles.container}>
        {transformedData.length > 0 && (<View style={styles.chart}>
            <PieChartWithLabel chartData={transformedData} chartName={'Expenses'} chartPercent={expenseContext.expenses.length}/>
        </View>)}
    </View>);
}

export default ExpensePerMonthChart;

const styles = StyleSheet.create({
    chart: {flex: 1, alignItems: 'center', justifyContent: 'center'}, container: {
        backgroundColor: '#ffffff', margin: 8, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flex: 1
    }
});
