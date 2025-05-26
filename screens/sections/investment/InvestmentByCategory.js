import React, {useContext, useMemo} from "react";
import {StyleSheet, View} from "react-native";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import {ExpensesContext} from "../../../store/expenses-context";
import PieChart from "../../../components/charts/PieChart";

const InvestmentByCategory = () => {
    const expenseContext = useContext(ExpensesContext);

    const categoryColors = ["#f15bb5", "#fee440", "#00bbf9", "#00f5d4", "#f79256", "#90fe00", "#cc17ff", "#ff0000", "#adb5bd",];

    const investmentData = useMemo(() => {
        const investments = expenseContext.expenses.filter((item) => item.type === "Investment");

        const total = investments.reduce((sum, item) => sum + parseFloat(item.amount), 0);

        const grouped = investments.reduce((acc, curr) => {
            const category = curr.category || "Uncategorized";
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += parseFloat(curr.amount);
            return acc;
        }, {});

        return Object.entries(grouped)
            .map(([category, amount], index) => ({
                x: category,
                y: amount,
                color: categoryColors[index % categoryColors.length],
                percent: total > 0 ? ((amount / total) * 100).toFixed(1) : 0,
            }))
            .sort((a, b) => b.y - a.y);
    }, [expenseContext.expenses]);

    if (!investmentData.length) return <LoadingOverlay/>;

    return (<View style={styles.container}>
        {investmentData.length > 0 && (<View style={styles.chart}>
            <PieChart
                chartData={investmentData}
                chartTitleName={"Investments"}
                chartTitleCount={investmentData.length}
            />
        </View>)}
    </View>);
};

export default InvestmentByCategory;

const styles = StyleSheet.create({
    chart: {
        flex: 1, alignItems: "center", justifyContent: "center",
    }, container: {
        backgroundColor: "#ffffff",
        margin: 8,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
});
