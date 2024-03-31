import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import moment from "moment";
import axios from "axios";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import ExpensePerMonthChart from "../charts/ExpensePerMonthChart";
import IncomeVsExpenseChart from "../charts/IncomeVsExpenseChart";
import PaymentModePerMonth from "../charts/PaymentMode";
import Card from "../../components/UI/Card";
import ExpenseSummary from "../../components/expensesOutput/ExpenseSummary";

function CardSection() {
    const [refreshing, setRefreshing] = useState(false);
    const initialFigures = {
        sumOfIncome: 0, sumOfExpense: 0, balance: 0
    };
    const [currentMonthTransactions, setCurrentMonthTransactions] = useState(initialFigures);
    const [lastMonthTransaction, setLastMonthTransaction] = useState(initialFigures);

    const fetchData = async () => {
        try {
            const month = moment().format('MMM');
            const lastMonth = moment().subtract(1, 'months').format('MMM');

            const monthlyTransactions = await axios.get(buildUrl(`${apiEndpoints.monthlyExpense}`));
            const response = monthlyTransactions.data;

            const lastMonthData = response[1];
            const currentMonthData = response[0];

            setCurrentMonthTransactions(currentMonthData);
            setLastMonthTransaction(lastMonthData)
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    return (<ScrollView
        style={styles.container}
        refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
        />}>
        <View>
            <View style={styles.expenseSummary}>
                <ExpenseSummary expenses={[{amount: lastMonthTransaction.expense}]} periodName={'Last month'}/>
            </View>
            <View style={styles.firstRow}>
                <Card style={styles.expenseAmount} amount={currentMonthTransactions.expense} heading={'Expenses'}/>
                <Card style={styles.incomeAmount} amount={currentMonthTransactions.income} heading={'Income'}/>
                <Card style={styles.balanceAmount} amount={currentMonthTransactions.balance} heading={'Balance'}/>
            </View>
            <View>
                <ExpensePerMonthChart/>
                <IncomeVsExpenseChart/>
                <PaymentModePerMonth/>
            </View>
        </View>
    </ScrollView>);
}

export default CardSection;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#eef4f8'
    }, firstRow: {
        flexDirection: "row", justifyContent: "center", paddingHorizontal: 12, marginTop: -20
    }, incomeAmount: {
        color: '#70e000'
    }, expenseAmount: {
        color: '#ef233c'
    }, balanceAmount: {
        color: '#00b4d8'
    }, expenseSummary: {
        padding: 24, backgroundColor: '#eef4f8', flex: 1
    },
});
