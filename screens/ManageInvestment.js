import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {SummaryContext} from "../store/summary-context";
import {GlobalStyles} from "../constansts/styles";

function ManageInvestment({route, navigation}) {
    const {summary, addSummary} = useContext(SummaryContext);
    const {month, year} = route.params;

    const selectedSummary = summary.months.find((item) => item.month === month && item.year === year);

    const existingPlan = selectedSummary?.investmentPlan;
    const [percentToInvest, setPercentToInvest] = useState(existingPlan?.percentToInvest?.toString() || "");

    useEffect(() => {
        navigation.setOptions({title: `${month} ${year} Investment`});
    }, [navigation, month, year]);

    function confirmHandler() {
        const percent = parseFloat(percentToInvest);
        if (isNaN(percent) || percent < 0 || percent > 100) {
            alert("Enter a valid percentage (0–100)");
            return;
        }

        const income = selectedSummary?.income ?? 0;
        const suggestedInvestment = (percent / 100) * income;
        const percentInvested = income ? ((selectedSummary.investment || 0) / suggestedInvestment) * 100 : 0;

        const investmentPlan = {
            percentToInvest: percent,
            suggestedInvestment: parseFloat(suggestedInvestment.toFixed(2)),
            percentInvested: parseFloat(percentInvested.toFixed(1)),
            statusColor: {},
        };

        addSummary(month, year, investmentPlan);
        navigation.goBack();
    }

    return (<View style={styles.container}>
        <Text style={styles.label}>Percent to Invest</Text>
        <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={percentToInvest}
            onChangeText={setPercentToInvest}
            placeholder="Enter percent"
        />
        <Button title="Save Investment Plan" onPress={confirmHandler}/>
    </View>);
}

export default ManageInvestment;

const styles = StyleSheet.create({
    container: {
        padding: 24, backgroundColor: "white", flex: 1,
    }, label: {
        fontSize: 18, color: GlobalStyles.colors.primary500, marginBottom: 8,
    }, input: {
        borderWidth: 1,
        borderColor: GlobalStyles.colors.primary200,
        padding: 12,
        fontSize: 18,
        marginBottom: 16,
        borderRadius: 6,
    },
});
