import React from "react";
import {StyleSheet, Text, View} from "react-native";

function Card({heading, amount, headingStyle, amountStyle}) {
    return (
        <View style={styles.cardContainer}>
            <Text style={[styles.heading, headingStyle]}>{heading}</Text>
            <Text style={[styles.amount, amountStyle]}>{amount}</Text>
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#bea9b4",
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 50,
        width: "40%",
        borderRadius: 15,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    amount: {
        fontSize: 18,
        textAlign: "center",
    },
});
