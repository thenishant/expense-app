import React from "react";
import {StyleSheet, View} from "react-native";

export default function FormRow({children}) {
    return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row", justifyContent: "space-between", marginBottom: 15,
    },
});
