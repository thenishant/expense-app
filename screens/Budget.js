import React, {useContext, useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {getMonth, getYear} from "../util/Date";
import {CategoryContext} from "../store/category-context";
import ProgressBar from "../components/UI/ProgressBar";
import {GlobalStyles} from "../constansts/styles";
import {getBudgetForMonth} from "../util/http";

function Budget() {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [error, setError] = useState('');
    const [budget, setBudget] = useState([]);
    const [itemWidth, setItemWidth] = useState(0);
    const [isFetching, setIsFetching] = useState(true);

    const categoryContext = useContext(CategoryContext);

    // Get month and year from the selected date
    const month = getMonth(selectedMonth);  // e.g., "Oct"
    const year = getYear(selectedMonth);    // e.g., "2024"

    // Fetch the budget data whenever month or year changes
    useEffect(() => {
        const budgetHandler = async () => {
            setIsFetching(true);
            try {
                const response = await getBudgetForMonth(month, year); // Add async/await here
                setBudget(response); // Save the fetched budget data
            } catch (error) {
                setError(`Error fetching expense data for ${month}`);
                console.error(error);
            }
            setIsFetching(false); // Stop fetching after the data is retrieved
        };

        budgetHandler(); // Call the fetch function
    }, [selectedMonth, month, year]); // Depend on month and year

    const outputArray = [];

    // Match the category context with the fetched budget data
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

    // Render the progress bar and expense details
    const renderItem = ({item, index}) => {
        const progress = (item.spentAmount / item.totalAmount).toFixed(3); // Calculate progress
        const progressPercent = (progress * 100).toFixed(1); // Convert to percentage
        const darkColor = '#7f5539';
        const lightColor = '#ddb892';

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
                        <Text
                            style={styles.text}>{`Spent: ${progressPercent} % of ${GlobalStyles.characters.rupee}${item.totalAmount}`}</Text>
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
    };

    return (<View style={styles.listContainer}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {isFetching ? (<Text>Loading...</Text> // Display a loading state
        ) : (<FlatList
            data={outputArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />)}
    </View>);
}

export default Budget;

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: 'transparent', borderRadius: 20, margin: 8, paddingVertical: 8
    },
    container: {margin: 8},
    expenseItem: {
        padding: 12, borderRadius: 10, shadowColor: GlobalStyles.colors.gray500,
    },
    detailsContainer: {flexDirection: "row", justifyContent: "space-between", alignItems: "center"},
    desc: {fontSize: 16, marginBottom: 4, fontWeight: "bold"},
    amountContainer: {padding: 10, backgroundColor: "white", borderRadius: 4},
    amount: {fontWeight: "bold", fontSize: 15, color: "#7f5539"},
    progressBar: {flex: 1, marginTop: 10},
    errorText: {
        color: 'red', textAlign: 'center', marginVertical: 8,
    }
});
