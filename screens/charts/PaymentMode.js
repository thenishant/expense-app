import {useEffect, useState} from "react";
import axios from "axios";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import {StyleSheet, Text, View} from "react-native";
import {getCurrentMonth} from "../../util/Date";
import PieChart from "../../components/charts/PieChart";

function PaymentModePerMonth() {
    const [expenseCategory, setExpenseCategory] = useState([]);
    const currentMonth = getCurrentMonth();
    const expenseCategoryHandler = async () => {
        const response = await axios.get(buildUrl(`${apiEndpoints.paymentMode}?month=${currentMonth}`));
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

    const categoryColors = ["#f15bb5", "#fee440", "#00bbf9", "#00f5d4", "#f79256", "#90fe00", "#cc17ff", "#ff0000", "#adb5bd",];

    const transformedData = expenseCategory?.map((item, index) => ({
        x: item.name, y: item.amount, color: categoryColors[index % categoryColors.length]
    }));

    console.log(transformedData)
    return (<View>
        {/*<Text style={styles.text}>{'Category wise expenses this month'}</Text>*/}
        {transformedData && (<View style={styles.chart}>
            <PieChart chartData={transformedData}/>
        </View>)}
    </View>);
}

export default PaymentModePerMonth

const styles = StyleSheet.create({
    chart: {flex: 1, alignItems: 'center', justifyContent: 'center'}, text: {
        padding: 8, marginTop: 20, marginBottom: -20, marginLeft: '17%', fontWeight: "bold",
    }
});