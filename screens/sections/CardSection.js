import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import axios from "axios";
import Card from "../../components/UI/Card";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import {getMonth} from "../../util/Date";

function CardSection({selectedMonth}) {
    const initialFigures = {
        income: 0, expense: 0, balance: 0
    };
    const [currentMonthTransactions, setCurrentMonthTransactions] = useState(initialFigures);

    useEffect(() => {
        fetchData();
    }, [selectedMonth]);

    const fetchData = async () => {
        try {
            const month = getMonth(selectedMonth);
            const monthlyTransactions = await axios.get(buildUrl(`${apiEndpoints.monthlyExpense}`))
            const response = monthlyTransactions.data.find(item => item.month === month)
            setCurrentMonthTransactions(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (<View
        style={styles.container}>
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
        flex: 1, backgroundColor: '#eef4f8', marginTop: 20
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
    }
});
