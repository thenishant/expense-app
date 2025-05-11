import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {SummaryContext} from "../../../store/summary-context";
import {getCurrentMonth, getPreviousMonth, getYear} from "../../../util/Date";
import ProgressBar from "../../../components/UI/ProgressBar";

function Summary() {
    const summaryContext = useContext(SummaryContext);
    const [itemWidth, setItemWidth] = useState(null);
    const [summaryToShow, setSummaryToShow] = useState(null);

    useEffect(() => {
        if (summaryContext?.summary) {
            const data = summaryContext.summary;
            const currentMonth = getCurrentMonth();
            const previousMonth = getPreviousMonth();
            const currentYear = getYear();

            const currentData = data.months.find(m => m.month === currentMonth && m.year === currentYear);
            const previousData = data.months.find(m => m.month === previousMonth && m.year === currentYear);

            const shouldUsePrevious = !currentData?.investmentPlan?.percentToInvest || currentData.investmentPlan.percentToInvest === 0;

            setSummaryToShow(shouldUsePrevious ? previousData : currentData);
        } else {
            console.error("No summary data available");
        }
    }, [summaryContext]);

    const amountToInvest = summaryToShow?.investmentPlan?.suggestedInvestment;
    const amountInvested = summaryToShow?.investment;
    const progress = amountToInvest > 0 ? amountInvested / amountToInvest : 0;

    const handleLayout = (event) => {
        const {width} = event.nativeEvent.layout;
        setItemWidth(width);
    };

    return (<View style={styles.container}>
        {summaryToShow && (<View
            style={styles.summaryBox}
            onLayout={(event) => {
                const {width} = event.nativeEvent.layout;
                setItemWidth(width); // Captures the actual width of the summary box
            }}
        >
            <Text style={styles.title}>Investment Summary</Text>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Invested:</Text>
                <Text style={styles.amountText}>₹{amountInvested}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>To Invest:</Text>
                <Text style={styles.amountText}>₹{amountToInvest}</Text>
            </View>

            <ProgressBar
                options={{
                    progress: progress, height: 12, width: itemWidth ? itemWidth - 20 : 0,
                }}
                style={styles.progressBar}
            />
        </View>)}
    </View>);
}

export default Summary;

const styles = StyleSheet.create({
    container: {
        margin: 10,
    }, summaryBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 0.5,
    }, title: {
        fontSize: 18, fontWeight: "bold", marginBottom: 8, color: "#333",
    }, textContainer: {
        flexDirection: 'row', justifyContent: 'space-between', // Ensure space between left and right aligned elements
        marginBottom: 10, // Optional margin for spacing between text and progress bar
    }, text: {
        fontSize: 16, color: "#444",
    }, amountText: {
        fontSize: 16, fontWeight: 'bold',  // Optional: Add bold styling for the amount
        color: "#444",
    }, progressBar: {
        marginTop: 12,
    }, loader: {
        marginTop: 12, alignSelf: 'center',
    },
});
