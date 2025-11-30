import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import {CategoryContext} from "../../../store/category-context";
import {ExpensesContext} from "../../../store/expenses-context";
import PieChart from "../../../components/charts/PieChart";

// Golden Angle Neon Fintech Palette
function categoryToColor(_, index) {
    const goldenAngle = 137.508;
    const hue = (index * goldenAngle) % 360;
    return `hsl(${hue}, 90%, 55%)`;
}

// ✅ Truncate labels to prevent layout breaking
function trimLabel(label, max = 14) {
    return label.length > max ? label.slice(0, max) + "…" : label;
}

function ExpensePerMonthChart() {
    const catCtx = useContext(CategoryContext);
    const expenseCtx = useContext(ExpensesContext);

    if (!catCtx.category.length) return <LoadingOverlay/>;

    const chartData = catCtx.category
        .map((item, index) => ({
            x: trimLabel(item.category),
            y: item.amount,
            percent: item.percentage,
            color: categoryToColor(item.category, index),
        }))
        .sort((a, b) => b.y - a.y);

    return (<View style={styles.container}>
        <PieChart
            chartData={chartData}
            title="Expenses"
            total={expenseCtx.expenses.length}
        />
    </View>);
}

export default ExpensePerMonthChart;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff", margin: 10, borderRadius: 18, paddingVertical: 5, flex: 1, justifyContent: "center"
    },
});
