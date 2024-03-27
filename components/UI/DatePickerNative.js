import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";

const CustomDatePicker = ({label, config, onChange}) => {
    const [date, setDate] = useState();
    const [mode, setMode] = useState('date');

    const onChangeInternal = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        onChange(currentDate);
    };

    return (<View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <RNDateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeInternal}
            {...config}
        />
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
    }
});
