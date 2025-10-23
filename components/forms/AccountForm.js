import React, {useState} from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const accountTypes = ["Savings", "Current", "Business"];

export default function AccountForm({navigation}) {
    const [accountName, setAccountName] = useState("");
    const [accountType, setAccountType] = useState("Savings");
    const [initialBalance, setInitialBalance] = useState("");

    const handleSubmit = async () => {
        if (!accountName || !accountType || !initialBalance) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/create", {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({
                    accountName, accountType, initialBalance: Number(initialBalance),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert("Error", data.error || "Something went wrong");
            } else {
                Alert.alert("Success", "Account created successfully!");
                setAccountName("");
                setAccountType("Savings");
                setInitialBalance("");
            }
        } catch (err) {
            Alert.alert("Error", "Unable to connect to server");
            console.error(err);
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (<View style={styles.container}>
        <Text style={styles.label}>Account Name</Text>
        <TextInput
            style={styles.input}
            value={accountName}
            onChangeText={setAccountName}
            placeholder="Enter account name"
        />

        <Text style={styles.label}>Account Type</Text>
        <View style={styles.typeContainer}>
            {accountTypes.map((type) => (<TouchableOpacity
                key={type}
                style={[styles.typeButton, accountType === type && styles.typeButtonSelected,]}
                onPress={() => setAccountType(type)}
            >
                <Text
                    style={[styles.typeButtonText, accountType === type && styles.typeButtonTextSelected,]}
                >
                    {type}
                </Text>
            </TouchableOpacity>))}
        </View>

        <Text style={styles.label}>Initial Balance</Text>
        <TextInput
            style={styles.input}
            value={initialBalance}
            onChangeText={(text) => setInitialBalance(text.replace(/[^0-9]/g, ""))}
            placeholder="Enter initial balance"
            keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#28A745", marginRight: 5}]}
                              onPress={handleSubmit}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {backgroundColor: "#dc3545", marginLeft: 5}]}
                              onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>

    </View>);
}

const styles = StyleSheet.create({
    container: {padding: 20, flex: 1, backgroundColor: "#fff"},
    label: {marginTop: 20, marginBottom: 5, fontWeight: "bold", fontSize: 16},
    input: {borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10},
    typeContainer: {flexDirection: "row", justifyContent: "space-between", marginVertical: 10},
    typeButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "#007BFF",
        borderRadius: 5,
        alignItems: "center",
    },
    typeButtonSelected: {
        backgroundColor: "#007BFF",
    },
    typeButtonText: {
        color: "#007BFF", fontWeight: "bold",
    },
    typeButtonTextSelected: {
        color: "#fff",
    },
    buttonContainer: {
        flexDirection: "row", marginTop: 30,
    },
    button: {
        flex: 1, padding: 15, borderRadius: 5, alignItems: "center",
    },
    buttonText: {color: "#fff", fontWeight: "bold", fontSize: 16},
});
