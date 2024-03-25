import {useEffect, useState} from "react";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import axios from "axios";
import {View} from "react-native";
import {VictoryChart, VictoryLine} from "victory-native";
import {formatThousands} from "../../util/Numbers";

function IncomeVsExpenseChart() {
    const [incomeVsExpense, setIncomeVsExpense] = useState([]);
    const incomeVsExpenseChartHandler = async () => {
        const response = await axios.get(buildUrl(apiEndpoints.monthlyExpense))

        try {
            const data = response.data;
            setIncomeVsExpense(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        incomeVsExpenseChartHandler();
    }, []);

    const incomeExpenseMapping = incomeVsExpense.map(item => ({
        expense: item.expense, income: item.income, month: item.month
    }));

    return (<View>
        <VictoryChart>
            <VictoryLine
                style={{
                    data: {stroke: "#ef233c"}, parent: {border: "2px solid #ccc"}
                }}
                data={incomeExpenseMapping.map(item => ({x: item.month, y: formatThousands(item.expense)}))}
                animate={{
                    duration: 2000, onLoad: {duration: 1000}
                }}
            />
            <VictoryLine
                style={{
                    data: {stroke: "#70e000"}, parent: {border: "2px solid #ccc"}
                }}
                data={incomeExpenseMapping.map(item => ({x: item.month, y: formatThousands(item.income)}))}
                animate={{
                    duration: 2000, onLoad: {duration: 1000}
                }}
            />
        </VictoryChart>
    </View>);

}

export default IncomeVsExpenseChart