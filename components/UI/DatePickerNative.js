import React, {useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, Modal, Button} from "react-native";
import {GlobalStyles} from "../../constansts/styles";
import {Calendar} from "react-native-calendars";
import moment from "moment";

const CustomDatePicker = ({label, config, onChange}) => {
    const [date, setDate] = useState(config.value);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selected, setSelected] = useState('');

    const onChangeInternal = (selectedDate) => {
        setDate(selectedDate);
        onChange(selectedDate);
        setShowCalendar(false);  // Close the calendar after selecting a date
    };

    return (<View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
            <Text style={styles.date}>{date.toLocaleDateString()}</Text>
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
                                  const date = moment(day.dateString).format('DD-MMM-YYYY');
                                  onChangeInternal(new Date(day.dateString));
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
        marginHorizontal: 4, marginVertical: 8
    }, label: {
        fontSize: 12, color: GlobalStyles.colors.black700, marginBottom: 4
    }, date: {
        color: GlobalStyles.colors.primary700
    }, modalOverlay: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'
    }, modalContainer: {
        backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center'
    }, calender: {
        width: 350,
    }
});
