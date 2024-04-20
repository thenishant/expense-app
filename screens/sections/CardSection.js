import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import axios from "axios";
import Card from "../../components/UI/Card";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import {getMonth} from "../../util/Date";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

function CardSection({selectedMonth}) {
    const initialFigures = {
        income: 0, expense: 0, balance: 0
    };
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState('')
    const [currentMonthTransactions, setCurrentMonthTransactions] = useState(initialFigures);

    const fetchData = async () => {
        setIsFetching(true)
        try {
            const month = getMonth(selectedMonth);
            const monthlyTransactions = await axios.get(buildUrl(`${apiEndpoints.monthlyExpense}`))
            const response = monthlyTransactions.data.find(item => item.month === month)
            setCurrentMonthTransactions(response);
        } catch (error) {
            console.error(error);
        }
        setIsFetching(false)
    };

    useEffect(() => {
        fetchData();
    }, [selectedMonth]);

    if (isFetching) return <LoadingOverlay/>

    if (!isFetching && error) return <ErrorOverlay message={error}/>

    return (<View style={styles.container}>
        {currentMonthTransactions ? (<View style={styles.firstRow}>
            <Card style={styles.expenseAmount} amount={currentMonthTransactions.expense} heading={'Expenses'}/>
            <Card style={styles.incomeAmount} amount={currentMonthTransactions.income} heading={'Income'}/>
            <Card style={styles.balanceAmount} amount={currentMonthTransactions.balance} heading={'Balance'}/>
        </View>) : (<ErrorOverlay message={`No expense details found for ${getMonth(selectedMonth)}`}/>)}
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
