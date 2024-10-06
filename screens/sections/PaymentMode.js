import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {getMonth, getYear} from "../../util/Date";
import PieChart from "../../components/charts/PieChart";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import {getTransactionsPaymentMode} from "../../util/http";

function PaymentModePerMonth({refreshing, selectedMonth}) {
    const [paymentMode, setPaymentMode] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date());

    useEffect(() => {
        const month = getMonth(selectedMonth);
        const year = getYear(selectedYear);

        const expenseCategoryHandler = async () => {
            setIsFetching(true);
            const response = await getTransactionsPaymentMode(month, year);
            setPaymentMode([response])
            setIsFetching(false);
        }
        expenseCategoryHandler();
    }, [selectedMonth, selectedYear]);


    const categoryColors = ["#f15bb5", "#fee440", "#00bbf9", "#00f5d4", "#f79256", "#90fe00", "#cc17ff", "#ff0000", "#adb5bd"];

    const transformedData = paymentMode.flatMap((item, index) =>
        Object.keys(item).map((key, subIndex) => ({
            color: categoryColors[(index + subIndex) % categoryColors.length],
            x: key,
            y: item[key]
        }))
    );

    console.log(transformedData);

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
