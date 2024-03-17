import React from "react";
import {StyleSheet, View} from "react-native";
import Card from "../../components/UI/Card";

function TotalBalance({amount}) {
    return (<View style={styles.cardContainer}>
        <Card
            heading="Balance"
            amount={amount}
        />
    </View>);
}

export default TotalBalance;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#80ed99",
        marginVertical: 8,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginHorizontal: 8,
        marginTop: 50,
        width: 110,
        borderRadius: 20,
    },
});
