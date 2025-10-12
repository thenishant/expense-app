import React, {useContext, useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SummaryContext} from "../../../store/summary-context";
import {getCurrentMonth, getPreviousMonth, getYear} from "../../../util/Date";
import ProgressBar from "../../../components/UI/ProgressBar";
import {GlobalStyles} from "../../../constansts/styles";

const screenWidth = Dimensions.get("window").width - 40; // for sparkline

function Summary({data = null}) {
    const summaryContext = useContext(SummaryContext);
    const [itemWidth, setItemWidth] = useState(null);
    const [summaryToShow, setSummaryToShow] = useState(null);
    const [showPercent, setShowPercent] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);

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

    if (!summaryToShow) return null;

    const amountToInvest = summaryToShow?.investmentPlan?.suggestedInvestment;
    const amountInvested = summaryToShow?.investment;
    const amountLeft = summaryToShow?.investmentPlan?.investmentLeft;
    const percentInvested = summaryToShow?.investmentPlan?.percentInvested ?? 0;
    const progress = amountToInvest > 0 ? percentInvested / 100 : 0;

    return (<View style={styles.container}>
        <View style={styles.summaryBox} onLayout={(event) => setItemWidth(event.nativeEvent.layout.width)}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.title}>Investment Summary</Text>
                <TouchableOpacity onPress={() => setShowPercent(!showPercent)}>
                    <Text style={styles.toggleText}>{showPercent ? "%" : "₹"}</Text>
                </TouchableOpacity>
            </View>

            {/* Amounts */}
            <View style={styles.textContainer}>
                <Text style={styles.text}>Invested:</Text>
                <Text style={styles.amountText}>{showPercent ? `${percentInvested}%` : `₹${amountInvested}`}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>To Invest:</Text>
                <Text
                    style={styles.amountText}>{showPercent ? `${((amountToInvest / amountInvested) * 100).toFixed(1)}%` : `₹${amountToInvest}`}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Amount Left:</Text>
                <Text
                    style={styles.amountText}>{showPercent ? `${((amountLeft / amountToInvest) * 100).toFixed(1)}%` : `₹${amountLeft}`}</Text>
            </View>

            <ProgressBar
                options={{progress, height: 15, width: itemWidth ? itemWidth - 20 : 0}}
                style={styles.progressBar}
            />
        </View>
    </View>);
}

export default Summary;

const styles = StyleSheet.create({
    container: {margin: 10},
    summaryBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        shadowColor: GlobalStyles.colors.black700,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 0.5,
    },
    headerRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
    title: {fontSize: 18, fontWeight: "bold", color: GlobalStyles.colors.black700},
    toggleText: {fontSize: 18, fontWeight: "bold", color: "#007bff"},
    textContainer: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10},
    text: {fontSize: 16, color: GlobalStyles.colors.black700},
    amountText: {fontSize: 16, fontWeight: 'bold', color: GlobalStyles.colors.black700},
    progressBar: {marginVertical: 8},
});
