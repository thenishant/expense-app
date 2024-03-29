import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import moment from "moment";
import axios from "axios";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import ExpensePerMonthChart from "../charts/ExpensePerMonthChart";
import IncomeVsExpenseChart from "../charts/IncomeVsExpenseChart";
import PaymentModePerMonth from "../charts/PaymentMode";
import Card from "../../components/UI/Card";

function CardSection() {
    const [refreshing, setRefreshing] = useState(false);
    const [response, setResponse] = useState({
        sumOfIncome: 0, sumOfExpense: 0, balance: 0
    });

    const fetchData = async () => {
        try {
            const month = moment().format('MMM');
            const response = await axios.get(buildUrl(`${apiEndpoints.transactionsInAMonth}?month=${month}`));
            const responseData = response.data;
            const sumOfIncome = responseData.sumOfIncome || 0;
            const sumOfExpense = responseData.sumOfExpense || 0;
            const balance = responseData.balance || 0;
            setResponse({
                sumOfIncome, sumOfExpense, balance
            });
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
        />}
    >
        <View style={styles.firstRow}>
            <Card style={styles.expenseAmount} amount={response.sumOfExpense} heading={'Expenses'}/>
            <Card style={styles.incomeAmount} amount={response.sumOfIncome} heading={'Income'}/>
            <Card style={styles.balanceAmount} amount={response.balance} heading={'Balance'}/>
        </View>
        <View>
            <ExpensePerMonthChart/>
            <IncomeVsExpenseChart/>
            <PaymentModePerMonth/>
        </View>
    </ScrollView>);
}

export default CardSection;

const styles = StyleSheet.create({
    container: {
        flex: 1, marginTop: -20, backgroundColor: '#eef4f8'
    }, firstRow: {
        flexDirection: "row", justifyContent: "center",
    }, incomeAmount: {
        color: '#70e000'
    }, expenseAmount: {
        color: '#ef233c'
    }, balanceAmount: {
        color: '#00b4d8'
    }
});
