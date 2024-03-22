import {useEffect, useState} from "react";
import moment from "moment/moment";
import axios from "axios";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import CustomDonutPieChart from "../../components/charts/PieChart";
import {StyleSheet, Text, View} from "react-native";
import {getCurrentMonth} from "../../util/Date";

function ExpensePerMonthChart() {
    const [expenseCategory, setExpenseCategory] = useState([]);
    const currentMonth = getCurrentMonth();
    const expenseCategoryHandler = async () => {
        const response = await axios.get(buildUrl(`${apiEndpoints.monthlyTransactions}?month=${currentMonth}`));
        try {
            const responseData = response.data;
            setExpenseCategory(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        expenseCategoryHandler();
    }, []);

    const categoryColors = {
        "Grocery": "#f15bb5", "Shopping": "#fee440", "Dining": "#00bbf9", "Interest": "#00f5d4", "Leisure": "#f79256"
    };

    const transformedData = expenseCategory?.[currentMonth]?.Expenses?.map(item => ({
        x: item.category, y: item.amount, color: categoryColors[item.category]
    }));

    return (<View>
        <Text style={styles.text}>{'Category wise expenses this month'}</Text>
        {transformedData && (<View style={styles.chart}>
            <CustomDonutPieChart chartData={transformedData}/>
        </View>)}
    </View>);
}

export default ExpensePerMonthChart

const styles = StyleSheet.create({
    chart: {flex: 1, alignItems: 'center', justifyContent: 'center'}, text: {
        padding: 8, marginTop: 20, marginBottom: -20, marginLeft: '17%', fontWeight: "bold",
    }
});