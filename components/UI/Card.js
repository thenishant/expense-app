import React from "react";
import {StyleSheet, Text, View} from "react-native";

function Card({heading, amount}) {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.amount}>{amount}</Text>
            <Text style={styles.heading}>{heading}</Text>
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({
    heading: {
        fontSize: 12,
        paddingBottom: 12,
        textAlign: "center",
        color: "#283618"
    },
    amount: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 13,
        color: "#003049"
    },
});
