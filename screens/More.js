import {useContext} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ExpensesContext} from "../store/expenses-context";
import {CategoryForm} from "../components/forms/CategoryForm";
import {AccountForm} from "../components/forms/AccountForm";

function AllExpenses({navigation}) {
    const expensesContext = useContext(ExpensesContext);

    const handleAddCategory = () => {
        navigation.navigate("CategoryForm");
    };

    const handleAddAccount = () => {
        navigation.navigate("AccountForm");
    };

    return (<View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
            <Text style={styles.addText}>＋ Add Category</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleAddAccount}>
            <Text style={styles.addText}>＋ Add Account</Text>
        </TouchableOpacity>
    </View>);
}

export default AllExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff",
    }, addButton: {
        paddingVertical: 14, alignItems: "center", borderTopWidth: 1, borderColor: "#ddd", backgroundColor: "#f7f7f7",
    }, addText: {
        fontSize: 16, fontWeight: "600", color: "#007AFF",
    },
});
