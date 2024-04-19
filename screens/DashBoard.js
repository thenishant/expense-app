import ExpensePerMonthChart from "./sections/ExpensePerMonthChart";
import IncomeVsExpenseChart from "./sections/IncomeVsExpenseChart";
import PaymentModePerMonth from "./sections/PaymentMode";
import {RefreshControl, ScrollView, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import CardSection from "./sections/CardSection";

function DashBoard() {

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
    };

    return (<ScrollView
        style={styles.container}
        refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
        />}
    >
        <CardSection/>
        <ExpensePerMonthChart/>
        <IncomeVsExpenseChart/>
        <PaymentModePerMonth refreshing={refreshing}/>
    </ScrollView>);
}

export default DashBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#eef4f8'

    }
});
