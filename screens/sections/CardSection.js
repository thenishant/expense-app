import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import Card from "../../components/UI/Card";
import {getMonth} from "../../util/Date";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import {ExpensesContext} from "../../store/expenses-context";

function CardSection({selectedMonth}) {
    const initialFigures = {
        income: 0, expense: 0, investment: 0, balance: 0,
    };
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState('')
    const [currentMonthTransactions, setCurrentMonthTransactions] = useState(initialFigures);
    const expensesContext = useContext(ExpensesContext);

    useEffect(() => {
        const transactions = expensesContext.expenses.reduce((acc, {amount, type}) => {
            acc[type] = (acc[type] || 0) + amount;
            return acc;
        }, {Expense: 0, Income: 0, Investment: 0});

        transactions.Balance = transactions.Income - (transactions.Expense + transactions.Investment);

        setCurrentMonthTransactions(transactions);
        setIsFetching(false);
    }, [expensesContext.expenses]);

    if (isFetching) return <LoadingOverlay/>

    if (!isFetching && error) return <ErrorOverlay message={error}/>

    function formatAmountToThousands(amount) {
        return (amount / 1000).toFixed(1) + 'K';
    }

    return (<View style={styles.container}>
        {currentMonthTransactions ? (<View style={styles.firstRow}>
            <Card style={styles.expenseAmount} amount={formatAmountToThousands(currentMonthTransactions.Expense)}
                  heading={'Expense'}/>
            <Card style={styles.incomeAmount} amount={formatAmountToThousands(currentMonthTransactions.Income)}
                  heading={'Income'}/>
            <Card style={styles.investmentAmount} amount={formatAmountToThousands(currentMonthTransactions.Investment)}
                  heading={'Investment'}/>
            <Card style={styles.balanceAmount} amount={formatAmountToThousands(currentMonthTransactions.Balance)}
                  heading={'Balance'}/>
        </View>) : (<ErrorOverlay message={`No expense details found for ${getMonth(selectedMonth)}`}/>)}
    </View>);
}

export default CardSection;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#eef4f8'
    }, firstRow: {
        flexDirection: "row", justifyContent: "center", backgroundColor: '#eef4f8'
    }, incomeAmount: {
        color: '#52b788'
    }, expenseAmount: {
        color: '#ef233c'
    }, balanceAmount: {
        color: '#008bf8'
    }, investmentAmount: {
        color: '#bc6c25'
    }
});
