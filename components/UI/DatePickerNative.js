import React, {useState} from "react";
import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";
import {Calendar} from "react-native-calendars";
import {convertToStandardFormat} from "../../util/Date";

const CustomDatePicker = ({label, config, onChange}) => {
    const [date, setDate] = useState(config.value);
    const [showCalendar, setShowCalendar] = useState(false);

    const onChangeInternal = (selectedDate) => {
        setDate(selectedDate);
        onChange(selectedDate);
        setShowCalendar(false);  // Close the calendar after selecting a date
    };

    return (<View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
            <Text style={styles.date}>{convertToStandardFormat(date)}</Text>
        </TouchableOpacity>
        <Modal
            transparent={true}
            visible={showCalendar}
            animationType="fade"
            onRequestClose={() => setShowCalendar(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Calendar style={styles.calender}
                              onDayPress={day => {
                                  const date = convertToStandardFormat(day.dateString);
                                  onChangeInternal(date);
                              }}
                    />
                    <Button title="Cancel" onPress={() => setShowCalendar(false)}/>
                </View>
            </View>
        </Modal>
    </View>);
};

export default CustomDatePicker;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4, marginVertical: 8, paddingLeft: 2
    }, label: {
        fontSize: 15, color: GlobalStyles.colors.black700, marginBottom: 4, fontWeight: 'bold'
    }, date: {
        color: GlobalStyles.colors.primary700, marginVertical: 6, fontWeight: "bold", fontSize: 15,
    }, modalOverlay: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'
    }, modalContainer: {
        backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center'
    }, calender: {
        width: 350,
    }
});
