import React, {useContext, useMemo, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ExpensesContext} from "../../../store/expenses-context";
import PieChart from "../../../components/charts/PieChart";

const categoryColors = ["#f15bb5", "#fee440", "#00bbf9", "#00f5d4", "#f79256", "#90fe00", "#cc17ff", "#ff0000", "#adb5bd"];

const InvestmentByCategory = () => {
    const {expenses} = useContext(ExpensesContext);
    const [expanded, setExpanded] = useState(false);

    const investmentData = useMemo(() => {
        const investments = expenses.filter((item) => item.type === "Investment");
        const total = investments.reduce((sum, item) => sum + parseFloat(item.amount), 0);

        const grouped = investments.reduce((acc, curr) => {
            const category = curr.category || "Uncategorized";
            acc[category] = (acc[category] || 0) + parseFloat(curr.amount);
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
    }, [expenses]);

    return (<View style={styles.container}>
        {investmentData.length === 0 ? (<Text style={styles.noDataText}>No investment data available</Text>) : (<>
            {expanded && (<View style={styles.chart}>
                <PieChart
                    chartData={investmentData}
                    chartTitleName="Investments"
                    chartTitleCount={investmentData.length}
                />
            </View>)}
            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setExpanded((prev) => !prev)}
            >
                <Text style={styles.toggleButtonText}>
                    {expanded ? "Collapse ▲" : "Expand ▼"}
                </Text>
            </TouchableOpacity>
        </>)}
    </View>);
};

export default InvestmentByCategory;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        margin: 8,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    }, chart: {
        flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 10
    }, noDataText: {
        fontSize: 14, color: "#666", padding: 20, textAlign: "center",
    }, toggleButton: {
        paddingVertical: 8, paddingHorizontal: 12, marginBottom: 10,
    }, toggleButtonText: {
        fontSize: 14, color: "#007AFF", fontWeight: "500",
    },
});
