import React, {useEffect, useState} from "react";
import axios from "axios";
import {StyleSheet, View} from "react-native";
import {getMonth} from "../../util/Date";
import PieChart from "../../components/charts/PieChart";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

function PaymentModePerMonth({refreshing, selectedMonth}) {
    const [expenseCategory, setExpenseCategory] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const currentMonth = getMonth(selectedMonth);

    const expenseCategoryHandler = async () => {
        setIsFetching(true)
        try {
            const response = await axios.get(buildUrl(`${apiEndpoints.paymentMode}?month=${currentMonth}`));
            const responseData = response.data;
            setExpenseCategory(responseData);
        } catch (error) {
            console.error(error);
        }
        setIsFetching(false)
    };

    useEffect(() => {
        expenseCategoryHandler();
    }, [refreshing, selectedMonth]);

    const categoryColors = ["#f15bb5", "#fee440", "#00bbf9", "#00f5d4", "#f79256", "#90fe00", "#cc17ff", "#ff0000", "#adb5bd"];

    const transformedData = expenseCategory?.map((item, index) => ({
        x: item.name, y: item.amount, color: categoryColors[index % categoryColors.length]
    }));

    if (isFetching) return <LoadingOverlay/>

    if (!isFetching && error) return <ErrorOverlay message={error}/>

    return (<View style={styles.container}>
        {transformedData.length > 0 && (<View style={styles.chart}>
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
