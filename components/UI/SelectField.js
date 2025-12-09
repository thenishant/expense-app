import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function SelectField({label, value, onPress, placeholder}) {
    return (<View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={onPress} style={styles.input}>
            <Text style={{color: value ? "#333" : "#A1A1A1"}}>
                {value || placeholder}
            </Text>
        </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({
    container: {flex: 1, marginHorizontal: 5}, label: {
        marginBottom: 5, fontSize: 15, fontWeight: "600", color: "#3A3A3A",
    }, input: {
        borderWidth: 1, borderColor: "#D7D7D7", borderRadius: 10, padding: 12, backgroundColor: "#FAFAFA",
    },
});
