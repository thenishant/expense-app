import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {SummaryContext} from "../../../store/summary-context";
import BigCard from "../../../components/UI/BIgCard";
import {getPreviousMonth, getYear} from "../../../util/Date";

function ToInvest() {
    const summaryContext = useContext(SummaryContext);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        if (summaryContext?.summary) {
            const data = summaryContext.summary;

            const previousMonth = getPreviousMonth()
            const currentYear = getYear()

            const monthData = data.months.find(m => m.month === previousMonth && m.year === currentYear);
            setSummary(monthData);
        } else {
            console.error("No summary data available");
        }
    }, [summaryContext]);

    return (<View style={styles.container}>
        <BigCard
            isHidden={false}
            isEditable={false}
            amount={summary?.investmentPlan?.percentToInvest}
            heading="Percentage To Invest"
        />
    </View>);
}

export default ToInvest;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10
    }
});
