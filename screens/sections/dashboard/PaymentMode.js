import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {getMonth, getYear} from "../../../util/Date";
import PieChart from "../../../components/charts/PieChart";
import LoadingOverlay from "../../../components/UI/LoadingOverlay";
import ErrorOverlay from "../../../components/UI/ErrorOverlay";
import {getTransactionsPaymentMode} from "../../../util/http";

// Golden angle neon palette generator
function generateColor(index) {
    const goldenAngle = 137.508;
    const hue = (index * goldenAngle) % 360;
    return `hsl(${hue}, 90%, 55%)`;
}

// Truncate label to fit UI
// function trimLabel(label, max = 14) {
//     return label.length > max ? label.slice(0, max) + "…" : label;
// }

function PaymentModePerMonth({selectedMonth, selectedYear}) {
    const [paymentMode, setPaymentMode] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const month = getMonth(selectedMonth);
        const year = getYear(selectedYear);

        async function load() {
            try {
                setIsFetching(true);
                const response = await getTransactionsPaymentMode(month, year);
                setPaymentMode([response]);
            } catch (err) {
                setError("Failed to load payment mode data.");
            } finally {
                setIsFetching(false);
            }
        }

        load();
    }, [selectedMonth, selectedYear]);

    if (isFetching) return <LoadingOverlay/>;
    if (error) return <ErrorOverlay message={error}/>;

    // Transform data into array for chart
    const transformedData = paymentMode.flatMap((item, index) => Object.keys(item).map((key, subIndex) => ({
        x: key,  // ✅ prevent layout shift
        y: item[key],
        percent: item[key] ? ((item[key] / Object.values(item).reduce((a, b) => a + b, 0)) * 100).toFixed(1) : 0,
        color: generateColor(index + subIndex), // ✅ no repetition
    })));

    return (<View style={styles.container}>
        {transformedData.length > 0 && (<View style={styles.chart}>
            <PieChart chartData={transformedData} title="Payment Mode" total={paymentMode.length}/>
        </View>)}
    </View>);
}

export default PaymentModePerMonth;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff", margin: 8, borderRadius: 18, paddingVertical: 12, flex: 1, justifyContent: "center"
    },
});
