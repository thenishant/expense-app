import React from "react";
import {StyleSheet, View} from "react-native";
import Card from "../../components/UI/Card";

function TotalExpense({amount}) {
    return (<View style={styles.cardContainer}>
        <Card
            heading="Expenses"
            amount={amount}
        />
    </View>);
}

export default TotalExpense;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#ffb100", marginVertical: 8, marginHorizontal: 8, marginTop: 50, width: 110, borderRadius: 20,
    },
});
