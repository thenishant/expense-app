import {Pressable, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";
import {useNavigation} from "@react-navigation/native";
import {getFormattedDate} from "../../util/Date";

function ExpenseItem({id, desc, amount, date, type, category}) {

    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate("ManageExpense", {expenseId: id})
    }

    const backgroundColor = type === "Expense" ? GlobalStyles.colors.red100 : GlobalStyles.colors.green100;
    const color = type === "Expense" ? GlobalStyles.colors.red100 : GlobalStyles.colors.green100;

    return (<Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.expenseItem, {backgroundColor}]}>
            <View>
                <Text style={[styles.textBase, styles.desc]}>{desc}</Text>
                <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                <Text style={styles.textBase}>{category}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={[styles.amount, {color}]}>{GlobalStyles.characters.rupee}{amount}</Text>
            </View>
        </View>
    </Pressable>)

}

export default ExpenseItem

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 6,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    }, textBase: {
        color: GlobalStyles.colors.primary50
    }, desc: {
        fontSize: 16, marginBottom: 4, fontWeight: "bold"
    }, amountContainer: {
        paddingHorizontal: 15, backgroundColor: "white", justifyContent: "center", alignItems: 'center', borderRadius: 4
    }, amount: {
        fontWeight: "bold", fontSize: 15
    }, pressed: {
        opacity: 0.75
    }
});