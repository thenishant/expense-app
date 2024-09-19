import React, {useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {getCurrentDate} from "../../util/Date";
import {GlobalStyles} from "../../constansts/styles";

function MonthYearHeader({onChange}) {
    const [currentDate, setCurrentDate] = useState(getCurrentDate());

    const handleArrowClick = (direction) => {
        const newDate = getCurrentDate(currentDate);
        direction === 'left' ? newDate.setMonth(newDate.getMonth() - 1) : newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
        onChange(newDate);
    };

    const currentMonthYear = () => {
        const currentMonth = currentDate.toLocaleString('default', {month: 'long'});
        const currentYear = currentDate.getFullYear();
        return `${currentMonth} ${currentYear}`;
    };

    const isCurrentMonth = () => {
        const today = new Date();
        return currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
    };

    return (<View style={styles.container}>
        <TouchableOpacity onPress={() => handleArrowClick('left')}>
            <Text style={styles.arrow}>{'\u25C0'}</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{currentMonthYear()}</Text>
        <TouchableOpacity onPress={() => handleArrowClick('right')} disabled={isCurrentMonth()}>
            <Text style={[styles.arrow, isCurrentMonth() && styles.disabledArrow]}>{'\u25B6'}</Text>
        </TouchableOpacity>
    </View>);
}

export default MonthYearHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 70,
        paddingVertical: 15,
    }, header: {
        fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginRight: 10,
    }, arrow: {
        fontSize: 20,
    }, disabledArrow: {
        color: GlobalStyles.colors.gray300,
    },
});
