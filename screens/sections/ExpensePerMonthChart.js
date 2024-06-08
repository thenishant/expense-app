import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import PieChartWithLabel from "../../components/charts/PieChartWithLabel";
import {StyleSheet, View} from "react-native";
import {getMonth} from "../../util/Date";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

function ExpensePerMonthChart({selectedMonth}) {
    const [expenseCategory, setExpenseCategory] = useState([]);
    const [expense, setExpense] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const month = getMonth(selectedMonth);

    const expenseCategoryHandler = async () => {
        setIsFetching(true);
        try {
            const response = await axios.get(buildUrl(`${apiEndpoints.transactionsInAMonth}?month=${month}`));
            const allExpensesResponse = response.data.allExpenses;
            setExpense(allExpensesResponse);
            const totalExpenseSum = allExpensesResponse.reduce((total, expense) => total + expense.amount, 0);
            const expensesByCategory = Object.entries(allExpensesResponse.reduce((acc, expense) => {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                return acc;
            }, {})).map(([category, amount]) => ({
                category, amount, percent: ((amount / totalExpenseSum) * 100).toFixed(1)
            }));
            setExpenseCategory(expensesByCategory);
        } catch (error) {
            setError(`Error fetching expense data for ${month}`);
            console.error(error);
        }
        setIsFetching(false);
    }

    useEffect(() => {
        expenseCategoryHandler();
    }, [selectedMonth]);

    const categoryColors = ["#f15bb5", "#fee440", "#00bbf9", "#00f5d4", "#f79256", "#90fe00", "#cc17ff", "#ff0000", "#adb5bd"];

    const transformedData = Object.entries(expenseCategory).map(([category, item], index) => ({
        x: item.category, y: item.amount, color: categoryColors[index % categoryColors.length], percent: item.percent
    }));

    if (isFetching) return <LoadingOverlay/>

    if (!isFetching && error) return <ErrorOverlay message={error}/>

    return (<View style={styles.container}>
        {transformedData.length > 0 && (<View style={styles.chart}>
            <PieChartWithLabel chartData={transformedData} chartName={'Expenses'}
                               chartPercent={expense.length}/>
        </View>)}
    </View>);
}

export default ExpensePerMonthChart;

const styles = StyleSheet.create({
    chart: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text: {padding: 8, marginTop: 20, marginBottom: -20, marginLeft: '17%', fontWeight: "bold"},
    container: {
        backgroundColor: '#ffffff', margin: 8, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flex: 1
    }
});
