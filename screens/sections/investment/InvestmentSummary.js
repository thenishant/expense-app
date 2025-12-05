import React, {useContext, useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SummaryContext} from "../../../store/summary-context";
import {getCurrentMonth, getPreviousMonth, getYear} from "../../../util/Date";
import ProgressBar from "../../../components/UI/ProgressBar";
import {GlobalStyles} from "../../../constansts/styles";

const screenWidth = Dimensions.get("window").width - 40; // for sparkline

const InvestmentSummary = ({month, yearly = null}) => {
    const summaryContext = useContext(SummaryContext);
    const [itemWidth, setItemWidth] = useState(null);
    const [summaryToShow, setSummaryToShow] = useState(null);
    const [showPercent, setShowPercent] = useState(false);

    useEffect(() => {
        // If month is passed (modal case), use it directly
        if (month) {
            setSummaryToShow(month);
            return;
        }

        // Otherwise fall back to dashboard summary
        const sourceData = summaryContext?.summary;
        if (!sourceData) return;

        const currentMonth = getCurrentMonth();
        const currentYear = getYear();
        const previousMonth = getPreviousMonth();

        const currentData = sourceData.months.find(m => m.month === currentMonth && m.year === currentYear);
        const previousData = sourceData.months.find(m => m.month === previousMonth && m.year === currentYear);

        const shouldUsePrevious = !currentData?.investmentPlan?.percentToInvest || currentData.investmentPlan.percentToInvest === 0;

        setSummaryToShow(shouldUsePrevious ? previousData : currentData);
    }, [month, summaryContext]);


    if (!summaryToShow) return null;

    const amountToInvest = summaryToShow?.investmentPlan?.amountToInvest;
    const invested = summaryToShow?.investment;
    const amountLeftToInvest = summaryToShow?.investmentPlan?.amountLeftToInvest;
    const percentInvested = summaryToShow?.investmentPlan?.percentInvested ?? 0;
    const percentLeftToInvest = summaryToShow?.investmentPlan?.percentLeftToInvest ?? 0;
    const progress = amountToInvest > 0 ? percentInvested / 100 : 0;

    const format = (showPercent, value, percent) => {
        const safeValue = Number.isFinite(value) ? value : 0;
        const safePercent = Number.isFinite(percent) ? percent : 0;

        return showPercent ? `${safePercent}%` : `${GlobalStyles.characters.rupee}${safeValue}`;
    };

    return (<View style={styles.container}>
        <View style={styles.summaryBox} onLayout={(event) => setItemWidth(event.nativeEvent.layout.width)}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.title}>Investment Summary</Text>
                <TouchableOpacity onPress={() => setShowPercent(!showPercent)}>
                    <Text style={styles.toggleText}>{showPercent ? "%" : "₹"}</Text>
                </TouchableOpacity>
            </View>

            {/* MONTH FIELDS */}
            <Row label="Amount to Invest" value={amountToInvest}/>
            <Row label="Invested" value={format(showPercent, invested, percentInvested)}/>
            <Row label="Amount Left" value={format(showPercent, amountLeftToInvest, percentLeftToInvest)}/>

            {/* YEARLY SECTION */}
            {yearly ? (<>
                <Row label="Yearly Invested" value={`₹${yearly.totals.investment}`}/>
                <Row label="Yearly Left" value={`₹${yearly.investmentLeftToInvest}`}/>
            </>) : null}

            <ProgressBar
                options={{progress, height: 15, width: itemWidth ? itemWidth - 20 : 0}}
                style={styles.progressBar}
            />
        </View>
    </View>);
}

const Row = ({label, value}) => (<View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
</View>);

export default InvestmentSummary;

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
    row: {
        flexDirection: "row", justifyContent: "space-between", paddingVertical: 6
    },
    rowLabel: {fontSize: 16, color: "#444"},
    rowValue: {fontSize: 16, fontWeight: "bold"}
});
