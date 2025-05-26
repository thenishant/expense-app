import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import {VictoryBar, VictoryChart, VictoryGroup, VictoryLabel} from "victory-native";
import {SummaryContext} from "../../../store/summary-context";
import {formatThousands} from "../../../util/Numbers";

const IncomeVsExpenseChart = () => {
    const summaryContext = useContext(SummaryContext);
    const rawData = summaryContext?.summary;

    const incomeExpenseMapping = rawData?.months ? rawData.months
        .map((item) => ({
            expense: item.expense, income: item.income, month: item.month,
        }))
        .slice(-5) : [];

    return (<View style={styles.container}>
        <VictoryChart>
            <VictoryGroup offset={18} colorScale={["#ef233c", "#70e000"]}>
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
        color: "red", textAlign: "center", fontSize: 16, marginTop: 20,
    },
});