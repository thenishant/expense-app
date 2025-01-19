import React, {useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";
import ProgressBar from "../UI/ProgressBar";
import {useNavigation} from "@react-navigation/native";

function BudgetItem({id, category, spentAmount, budgetedAmount, spentPercentage}) {
    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate("ManageBudget", {budgetId: id});
    }

    const categoryWithoutEmoji = category.replace(/\p{Emoji}/gu, '').trim();

    const [itemWidth, setItemWidth] = useState(0);
    const progress = budgetedAmount > 0 ? (spentAmount / budgetedAmount).toFixed(3) : 0; // Safe progress calculation
    const progressBarWidth = itemWidth > 0 ? itemWidth : 100; // Default width
    const darkColor = GlobalStyles.colors.orange100;
    const lightColor = GlobalStyles.colors.orange50;

    return (<Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
        <View>
            <View style={[styles.budgetItem, {backgroundColor: lightColor}]}>
                <View
                    style={styles.detailsContainer}
                    onLayout={(event) => {
                        const {width} = event.nativeEvent.layout;
                        setItemWidth(width);
                    }}
                >
                    <View>
                        <Text style={styles.desc}>{categoryWithoutEmoji}</Text>
                        <Text style={styles.text}>
                            {`Spent: ${spentPercentage} of ${GlobalStyles.characters.rupee}${budgetedAmount}`}
                        </Text>
                    </View>
                    <View style={styles.amountContainer}>
                        <Text style={[styles.amount, {color: darkColor}]}>
                            {GlobalStyles.characters.rupee}
                            {spentAmount}
                        </Text>
                    </View>
                </View>
                <ProgressBar
                    options={{
                        color: darkColor, progress: progress, height: 10, width: progressBarWidth,
                    }}
                    style={styles.progressBar}
                />
            </View>
        </View>
    </Pressable>);
}

export default BudgetItem;

const styles = StyleSheet.create({
    budgetItem: {
        padding: 12, borderRadius: 10, shadowColor: GlobalStyles.colors.gray500, marginVertical: 8
    },
    detailsContainer: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    },
    desc: {fontSize: 16, marginBottom: 4, fontWeight: "bold"},
    amount: {fontWeight: "bold"},
    amountContainer: {padding: 10, backgroundColor: "white", borderRadius: 4},
    progressBar: {flex: 1, marginTop: 10},
    errorText: {
        color: "red", textAlign: "center", marginVertical: 8,
    },
    pressed: {
        opacity: 0.75
    }
});
