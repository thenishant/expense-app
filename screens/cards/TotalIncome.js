import React from "react";
import {StyleSheet, View} from "react-native";
import Card from "../../components/UI/Card";

function TotalIncome({amount}) {
    return (<View style={styles.cardContainer}>
        <Card
            heading="Income"
            amount={amount}
        />
    </View>);
}

export default TotalIncome;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#00ffcc", marginVertical: 8, marginHorizontal: 8, marginTop: 50, width: 110, borderRadius: 20,
    },
});
