import React, {useContext, useEffect, useState} from "react";
import {ScrollView, StyleSheet, View, Text} from "react-native";
import {GlobalStyles} from "../constansts/styles";
import axios from "axios";
import {apiEndpoints, buildUrl} from "../constansts/Endpoints";
import {getMonth} from "../util/Date";
import {ExpensesContext} from "../store/expenses-context";
import categoryContext, {CategoryContext} from "../store/category-context";
import ProgressBar from "../components/UI/ProgressBar";

function Budget() {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [error, setError] = useState('');
    const [budget, setBudget] = useState([]);
    const [itemWidth, setItemWidth] = useState(0);
    const [isFetching, setIsFetching] = useState(true)

    const categoryContext = useContext(CategoryContext);

    const month = getMonth(selectedMonth);
    const budgetHandler = async () => {
        setIsFetching(true);
        try {
            const response = await axios.get(buildUrl(`${apiEndpoints.allBudget}?month=${month}`));
            const allBudgetResponse = response.data;
            setBudget(allBudgetResponse);
        } catch (error) {
            setError(`Error fetching expense data for ${month}`);
            console.error(error);
        }
        setIsFetching(false);
    }

    useEffect(() => {
        budgetHandler();
    }, [selectedMonth]);

    const generateLightColor = (index) => {
        const hue = (index * 137.508) % 360;
        return `hsl(${hue}, 100%, 90%)`;
    };

    const outputArray = [];

    categoryContext.category.forEach(data1 => {
        const {amount: spentAmount, category} = data1;

        const matchedData2 = budget.find(data2 => data2.category === category);

        if (matchedData2) {
            const {_id, amount: totalAmount, month, year} = matchedData2;
            outputArray.push({
                "_id": _id,
                "category": category,
                "month": month,
                "spentAmount": spentAmount,
                "totalAmount": totalAmount,
                "year": parseInt(year) // Converting year to integer
            });
        }
    });

    const generateDarkColor = (index) => {
        const hue = (index * 137.508) % 360;
        return `hsl(${hue}, 100%, 30%)`;
    };

    return (<ScrollView>
        {outputArray.map((item, index) => {
            const progress = item.spentAmount / item.totalAmount;
            const progressPercent = (progress * 100).toFixed(1);
            const lightColor = generateLightColor(index);
            const darkColor = generateDarkColor(index);

            return (<View key={index} style={styles.container}>
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
                                {item.spentAmount}
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
    container: {padding: 15, backgroundColor: "#eef4f8", flex: 1, marginBottom: -20, marginTop: 10,},
    expenseItem: {
        padding: 12,
        borderRadius: 6,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    },
    textBase: {color: GlobalStyles.colors.primary50},
    detailsContainer: {flexDirection: "row", justifyContent: "space-between", alignItems: "center"},
    desc: {fontSize: 16, marginBottom: 4, fontWeight: "bold"},
    amountContainer: {padding: 10, backgroundColor: "white", borderRadius: 4},
    amount: {fontWeight: "bold", fontSize: 15, color: "#774936"},
    progressBar: {
        flex: 1, marginTop: 10
    }
});
r