import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Calendar} from "react-native-calendars";

export default function CalendarCard({visible, date, onChange, onClose}) {
    if (!visible) return null;

    const formatted = date.toISOString().split("T")[0];

    return (<View style={styles.overlay}>

        <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={onClose}
        />

        <View style={styles.card}>
            <Calendar
                initialDate={formatted}
                onDayPress={(day) => {
                    onChange(new Date(day.dateString));
                    onClose();
                }}
                theme={{
                    selectedDayBackgroundColor: "#007AFF",
                    selectedDayTextColor: "#fff",
                    todayTextColor: "#FF3B30",
                    arrowColor: "#007AFF",
                }}
            />
        </View>
    </View>);
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 99,
    }, backdrop: {
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    }, card: {
        width: "90%",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "white",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 3},
    }
});
