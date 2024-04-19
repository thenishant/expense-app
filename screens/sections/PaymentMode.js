import React, {useEffect, useState} from "react";
import axios from "axios";
import {StyleSheet, View} from "react-native";
import {getCurrentMonth} from "../../util/Date";
import PieChart from "../../components/charts/PieChart";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";

function PaymentModePerMonth({refreshing}) {
    const [expenseCategory, setExpenseCategory] = useState([]);
    const currentMonth = getCurrentMonth();

    const expenseCategoryHandler = async () => {
        try {
            const response = await axios.get(buildUrl(`${apiEndpoints.paymentMode}?month=${currentMonth}`));
            const responseData = response.data;
            setExpenseCategory(responseData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        expenseCategoryHandler();
    }, [refreshing]);

    const categoryColors = ["#f15bb5", "#fee440", "#00bbf9", "#00f5d4", "#f79256", "#90fe00", "#cc17ff", "#ff0000", "#adb5bd"];

    const transformedData = expenseCategory?.map((item, index) => ({
        x: item.name, y: item.amount, color: categoryColors[index % categoryColors.length]
    }));

    return (<View style={styles.container}>
        {transformedData && (<View style={styles.chart}>
            <PieChart chartData={transformedData}/>
        </View>)}
    </View>);
}

export default PaymentModePerMonth;

const styles = StyleSheet.create({
    chart: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    }, container: {
        backgroundColor: '#ffffff', margin: 8, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flex: 1
    }
});
