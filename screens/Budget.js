import React, {useState} from "react";
import {StyleSheet, Text, View, ScrollView} from "react-native";
import ProgressBar from "../components/UI/ProgressBar";
import {GlobalStyles} from "../constansts/styles";

function Budget() {
    const [refreshing, setRefreshing] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [itemWidth, setItemWidth] = useState(0);

    const onRefresh = () => {
        setRefreshing(true);
        setRefreshing(false);
    };

    const handleMonthChange = (newDate) => {
        setSelectedMonth(newDate); // Update selected month state
    };

    const budget = [{category: "Shopping", budget: 12000, spent: 9000}, {
        category: "Shopping", budget: 12000, spent: 6231
    }];

    const generateLightColor = (index) => {
        const hue = (index * 137.508) % 360;
        return `hsl(${hue}, 100%, 90%)`;
    };

    const generateDarkColor = (index) => {
        const hue = (index * 137.508) % 360;
        return `hsl(${hue}, 100%, 30%)`;
    };

    return (<ScrollView>
        {budget.map((item, index) => {
            const progress = item.spent / item.budget;
            const progressPercent = (progress * 100).toFixed(1);
            const lightColor = generateLightColor(index);
            const darkColor = generateDarkColor(index);

            return (
                <View key={index} style={styles.container}>
                    <View style={[styles.expenseItem, {backgroundColor: lightColor}]}>
                        <View
                            style={styles.detailsContainer}
                            onLayout={(event) => {
                                const {width} = event.nativeEvent.layout;
                                setItemWidth(width);
                            }}>
                            <View>
                                <Text style={styles.desc}>{item.category}</Text>
                                <Text style={styles.text}>{`Spent: ${progressPercent} %`}</Text>
                            </View>
                            <View style={styles.amountContainer}>
                                <Text style={[styles.amount, {color: darkColor}]}>
                                    {GlobalStyles.characters.rupee}
                                    {item.spent}
                                </Text>
                            </View>
                        </View>
                        <ProgressBar
                            options={{
                                color: darkColor, progress: progress, height: 10, width: itemWidth
                            }}
                            style={styles.progressBar}
                        />
                    </View>
                </View>);
        })}
    </ScrollView>);
}

export default Budget;

const styles = StyleSheet.create({
    container: {
        padding: 15, backgroundColor: "#eef4f8", flex: 1, marginBottom: -20, marginTop: 10,
    }, expenseItem: {
        padding: 12,
        borderRadius: 6,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    }, textBase: {
        color: GlobalStyles.colors.primary50
    }, detailsContainer: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center"
    }, desc: {
        fontSize: 16, marginBottom: 4, fontWeight: "bold"
    }, amountContainer: {
        padding: 10, backgroundColor: "white", borderRadius: 4
    }, amount: {
        fontWeight: "bold", fontSize: 15, color: "#774936"
    }, progressBar: {
        flex: 1, marginTop: 10 // Add some margin if needed to separate from other elements
    }
});
