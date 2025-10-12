import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {SummaryContext} from "../../../store/summary-context";
import BigCard from "../../../components/UI/BIgCard";
import {getCurrentMonth, getPreviousMonth, getYear} from "../../../util/Date";

function ToInvest() {
    const summaryContext = useContext(SummaryContext);
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

    return (<View>
        <BigCard
            isHidden={false}
            isEditable={false}
            amount={summaryToShow?.investmentPlan?.percentToInvest}
            heading="Percentage To Invest"
        />
    </View>);
}

export default ToInvest;

const styles = StyleSheet.create({});
