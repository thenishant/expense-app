import React, {useState} from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {createCategory} from "../../util/http";

export default function CategoryForm({navigation}) {
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");

    const handleSubmit = async () => {
        if (!type || !category || !subCategory) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        try {
            const data = await createCategory({type, category, subCategory});

            if (data.error) {
                Alert.alert("Error", data.error || "Something went wrong");
            } else {
                Alert.alert("Success", "Category created successfully!");
                setType("");
                setCategory("");
                setSubCategory("");
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
        <Text style={styles.label}>Type</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter type (e.g. Expense, Income)"
            value={type}
            onChangeText={setType}
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter category (e.g. Bills, Food)"
            value={category}
            onChangeText={setCategory}
        />

        <Text style={styles.label}>Subcategory</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter subcategory (e.g. Mobile, Groceries)"
            value={subCategory}
            onChangeText={setSubCategory}
        />

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.button, {backgroundColor: "#28A745", marginRight: 5}]}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Create Category</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, {backgroundColor: "#dc3545", marginLeft: 5}]}
                onPress={handleCancel}
            >
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    container: {padding: 20, flex: 1, backgroundColor: "#fff"},
    title: {fontSize: 22, fontWeight: "600", textAlign: "center", marginBottom: 24},
    label: {marginTop: 10, marginBottom: 5, fontWeight: "bold", fontSize: 16},
    input: {borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10},
    buttonContainer: {flexDirection: "row", marginTop: 30},
    button: {flex: 1, padding: 15, borderRadius: 5, alignItems: "center"},
    buttonText: {color: "#fff", fontWeight: "bold", fontSize: 16},
});
