import {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {VictoryBar, VictoryChart, VictoryGroup, VictoryTooltip} from "victory-native";
import {formatThousands} from "../../util/Numbers";
import {getSummary} from "../../util/http";

function IncomeVsExpenseChart() {
    const [incomeVsExpense, setIncomeVsExpense] = useState([]);
    const incomeVsExpenseChartHandler = async () => {
        try {
            setIncomeVsExpense(await getSummary());
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        incomeVsExpenseChartHandler();
    }, []);

    const incomeExpenseMapping = incomeVsExpense.map(item => ({
        expense: item.expense, income: item.income, month: item.month
    })).reverse().slice(-5);

    return (<View style={styles.container}>
        <VictoryChart>
            <VictoryGroup offset={20}
                          colorScale={["#ef233c", "#70e000"]}>
                <VictoryBar
                    data={incomeExpenseMapping.map(item => ({x: item.month, y: formatThousands(item.expense)}))}
                    labels={({datum}) => `${datum.y}K`}
                    labelComponent={<VictoryTooltip/>}
                    animate={{
                        duration: 2000, onLoad: {duration: 1000}
                    }}
                />
                <VictoryBar
                    data={incomeExpenseMapping.map(item => ({x: item.month, y: formatThousands(item.income)}))}
                    labels={({datum}) => `${datum.y}K`}
                    labelComponent={<VictoryTooltip/>}
                    animate={{
                        duration: 2000, onLoad: {duration: 1000}
                    }}
                />
            </VictoryGroup>
        </VictoryChart>
    </View>);
}

export default IncomeVsExpenseChart

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff', margin: 8, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flex: 1
    }
});