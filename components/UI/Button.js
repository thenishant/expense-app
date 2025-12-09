import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

export function PrimaryButton({title, onPress}) {
    return (<TouchableOpacity style={[styles.button, styles.primary]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>);
}

export function DangerButton({title, onPress}) {
    return (<TouchableOpacity style={[styles.button, styles.danger]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    button: {
        flex: 1, padding: 15, borderRadius: 8, alignItems: "center", marginHorizontal: 5,
    }, primary: {backgroundColor: "#28A745"}, danger: {backgroundColor: "#D9534F"}, text: {
        color: "#fff", fontWeight: "bold", fontSize: 16,
    },
});
