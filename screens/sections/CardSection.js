import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import TotalExpense from "../cards/TotalExpense";
import TotalBalance from "../cards/TotalBalance";
import TotalIncome from "../cards/TotalIncome";
import moment from "moment";
import axios from "axios";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import CustomDonutPieChart from "../../components/charts/PieChart";

function CardSection() {
    const chartData = [
        {x: 'Cats', y: 25, color: 'yellow'},
        {x: 'Dogs', y: 50, color: 'green'},
        {x: 'Birds', y: 75, color: 'orange'},
        {x: 'snake', y: 100, color: 'pink'},
        {x: 'Human', y: 125, color: 'aqua'}
    ];

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
            <TotalExpense amount={response.sumOfExpense}/>
            <TotalIncome amount={response.sumOfIncome}/>
            <TotalBalance amount={response.balance}/>
        </View>
        <View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <CustomDonutPieChart chartData={chartData}/>
            </View>
        </View>
    </ScrollView>);
}

export default CardSection;

const styles = StyleSheet.create({
    container: {
        flex: 1, marginTop: -20,
    }, firstRow: {
        flexDirection: "row", justifyContent: "center",
    },
});
