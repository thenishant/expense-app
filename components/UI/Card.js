import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";

function Card({heading, amount, style}) {
    return (<View style={styles.container}>
        <Text style={[styles.amount, style]}>{GlobalStyles.characters.rupee}{amount}</Text>
        <Text style={styles.heading}>{heading}</Text>
    </View>);
}

export default Card;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff', margin: 8, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flex: 1
    }, heading: {
        fontSize: 12, paddingBottom: 12, textAlign: "center", color: "#283618"
    }, amount: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 13
    },
});
