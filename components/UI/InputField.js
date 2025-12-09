import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

export default function InputField({label, value, onChangeText, placeholder, keyboardType}) {
    return (<View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#A1A1A1"
            keyboardType={keyboardType}
        />
    </View>);
}

const styles = StyleSheet.create({
    container: {flex: 1, marginHorizontal: 5}, label: {
        marginBottom: 5, fontSize: 15, fontWeight: "600", color: "#3A3A3A",
    }, input: {
        borderWidth: 1,
        borderColor: "#D7D7D7",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#FAFAFA",
        fontSize: 15,
        color: "#333",
    },
});
