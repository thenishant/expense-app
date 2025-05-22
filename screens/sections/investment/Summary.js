import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {SummaryContext} from "../../../store/summary-context";
import {getCurrentMonth, getPreviousMonth, getYear} from "../../../util/Date";
import ProgressBar from "../../../components/UI/ProgressBar";

function Summary({data = null}) {
    const summaryContext = useContext(SummaryContext);
    const [itemWidth, setItemWidth] = useState(null);
    const [summaryToShow, setSummaryToShow] = useState(null);

    useEffect(() => {
        const sourceData = data || summaryContext?.summary;

        if (sourceData) {
            const currentMonth = getCurrentMonth();
            const previousMonth = getPreviousMonth();
            const currentYear = getYear();

            let currentData, previousData;

            if (sourceData?.months) {
                currentData = sourceData.months.find(m => m.month === currentMonth && m.year === currentYear);
                previousData = sourceData.months.find(m => m.month === previousMonth && m.year === currentYear);
            } else currentData = sourceData;

            const shouldUsePrevious = !currentData?.investmentPlan?.percentToInvest || currentData.investmentPlan.percentToInvest === 0;

            setSummaryToShow(shouldUsePrevious ? previousData : currentData);
        } else {
            console.error("No summary data available");
        }
    }, [summaryContext, data]);

    const amountToInvest = summaryToShow?.investmentPlan?.suggestedInvestment;
    const amountInvested = summaryToShow?.investment;
    const amountLeft = summaryToShow?.investmentPlan?.investmentLeft;
    const progress = amountToInvest > 0 ? summaryToShow?.investmentPlan?.percentInvested / 100 : 0;

    return (<View style={styles.container}>
        {summaryToShow && (
            <View style={styles.summaryBox} onLayout={(event) => setItemWidth(event.nativeEvent.layout.width)}>
                <Text style={styles.title}>Investment Summary</Text>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Invested:</Text>
                    <Text style={styles.amountText}>₹{amountInvested}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>To Invest:</Text>
                    <Text style={styles.amountText}>₹{amountToInvest}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Amount Left:</Text>
                    <Text style={styles.amountText}>₹{amountLeft}</Text>
                </View>

                <ProgressBar
                    options={{
                        progress, height: 15, width: itemWidth ? itemWidth - 20 : 0,
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
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,
    }, text: {
        fontSize: 16, color: "#444",
    }, amountText: {
        fontSize: 16, fontWeight: 'bold', color: "#444",
    }, progressBar: {
        marginTop: 12,
    },
});
