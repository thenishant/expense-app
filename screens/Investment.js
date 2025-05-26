import React, {useContext, useLayoutEffect} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import ToInvest from "./sections/investment/ToInvest";
import Summary from "./sections/investment/Summary";
import MonthlyInvestment from "./sections/investment/MonthlyInvestment";
import {SummaryContext} from "../store/summary-context";
import InvestmentByCategory from "./sections/investment/InvestmentByCategory";

function Investment({route, navigation}) {
    const summaryContext = useContext(SummaryContext);
    useLayoutEffect(() => {
        navigation.setOptions({title: 'Investments'});
    }, [navigation]);

    return (<ScrollView>
        <View style={styles.container}>
            <ToInvest/>
            <Summary/>
            <MonthlyInvestment data={summaryContext?.summary}/>
            <InvestmentByCategory/>
        </View>
    </ScrollView>);
}

export default Investment;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#eef4f8', marginTop: 10
    }
});
