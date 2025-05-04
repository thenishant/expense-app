import React from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {VictoryBar, VictoryChart, VictoryGroup, VictoryLabel} from "victory-native";
import {formatThousands} from "../../util/Numbers";
import {BalanceContextProvider, useBalance} from "../../store/balance-context";

const IncomeVsExpenseChartContent = () => {
    const {summaryData, isLoading, error} = useBalance();

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error.message}</Text>;
    }

    const incomeExpenseMapping = summaryData?.data?.map((item) => ({
        expense: item.expense, income: item.income, month: item.month,
    })).slice(-5);

    return (<View style={styles.container}>
        <VictoryChart>
            <VictoryGroup offset={20} colorScale={["#ef233c", "#70e000"]}>
                <VictoryBar
                    data={incomeExpenseMapping.map((item) => ({
                        x: item.month, y: Number(formatThousands(item.expense)),
                    }))}
                    labels={({datum}) => `${datum.y}K`}
                    labelComponent={<VictoryLabel/>}
                />
                <VictoryBar
                    data={incomeExpenseMapping.map((item) => ({
                        x: item.month, y: Number(formatThousands(item.income)),
                    }))}
                    labels={({datum}) => `${datum.y}K`}
                    labelComponent={<VictoryLabel/>}
                />
            </VictoryGroup>
        </VictoryChart>
    </View>);
};

const IncomeVsExpenseChart = () => (<BalanceContextProvider>
    <IncomeVsExpenseChartContent/>
</BalanceContextProvider>);

export default IncomeVsExpenseChart;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        margin: 8,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    }, errorText: {
        color: "red", textAlign: "center", fontSize: 16,
    },
});