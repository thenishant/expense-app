import React from "react";
import {StyleSheet, View} from "react-native";
import TotalExpense from "../cards/TotalExpense";
import TotalBalance from "../cards/TotalBalance";
import TotalIncome from "../cards/TotalIncome";
import Transactions from "../cards/Transactions";

function CardSection() {
    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <TotalExpense/>
                <TotalIncome/>
                <TotalBalance/>
            </View>
        </View>
    );
}

export default CardSection;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        marginTop: 10
    },
    firstRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
    secondRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: -40
    },
});
