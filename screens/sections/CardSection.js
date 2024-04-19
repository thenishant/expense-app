import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import axios from "axios";
import Card from "../../components/UI/Card";
import ExpenseSummary from "../../components/expensesOutput/ExpenseSummary";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";

function CardSection() {
    const initialFigures = {
        sumOfIncome: 0, sumOfExpense: 0, balance: 0
    };
    const [currentMonthTransactions, setCurrentMonthTransactions] = useState(initialFigures);
    const [lastMonthTransaction, setLastMonthTransaction] = useState(initialFigures);

    const fetchData = async () => {
        try {
            const monthlyTransactions = await axios.get(buildUrl(`${apiEndpoints.monthlyExpense}`));
            const response = monthlyTransactions.data;

            const [currentMonthData, lastMonthData] = response;
            setCurrentMonthTransactions(currentMonthData);
            setLastMonthTransaction(lastMonthData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (<View
        style={styles.container}>
        <View style={styles.expenseSummary}>
            <ExpenseSummary expenses={[{amount: lastMonthTransaction.expense, type: "Expense"}]}
                            periodName="Last month"/>
        </View>
        <View style={styles.firstRow}>
            <Card style={styles.expenseAmount} amount={currentMonthTransactions.expense} heading={'Expenses'}/>
            <Card style={styles.incomeAmount} amount={currentMonthTransactions.income} heading={'Income'}/>
            <Card style={styles.balanceAmount} amount={currentMonthTransactions.balance} heading={'Balance'}/>
        </View>
    </View>);
}

export default CardSection;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#eef4f8'
    }, firstRow: {
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 12,
        marginTop: -20,
        width: '105%',
        marginLeft: -10,
        backgroundColor: '#eef4f8'
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
