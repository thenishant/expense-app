import {StyleSheet, Text, View} from "react-native";
import Input from "./Input";

function ExpenseForm() {
    function amountChangeHandler() {

    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input style={styles.rowInput} label={"Amount"} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: amountChangeHandler
                }}/>
                <Input style={styles.rowInput} label={"Date"} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: () => {
                    }
                }}/>
            </View>
            <Input label={"Description"} textInputConfig={{
                multiline: true
            }}/>
        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        marginVertical:24,
        textAlign:'center'
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    }, rowInput: {
        flex: 1
    }
});
