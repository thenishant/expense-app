import React from "react";
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";

function Card({heading, amount, style, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={[styles.amount, style]}>
                    {GlobalStyles.characters.rupee}{amount}
                </Text>
                <Text style={styles.heading}>{heading}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Card;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderColor: 'black',
        borderWidth: 0.5
    }, heading: {
        fontSize: 13, paddingBottom: 12, textAlign: "center", color: "#283618"
    }, amount: {
        fontSize: 16, fontWeight: "bold", textAlign: "center", marginVertical: 10
    }, pressed: {
        opacity: 0.80
    }
});
