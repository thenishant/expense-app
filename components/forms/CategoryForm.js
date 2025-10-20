import {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {postCategories} from "../../util/http";

function CategoryForm({navigation}) {
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [error, setError] = useState("");

    // Check if all fields are filled
    const isFormValid = type.trim() && category.trim() && subCategory.trim();

    const handleSubmit = async () => {
        if (!isFormValid) {
            setError("Please fill all fields");
            return;
        }

        const newCategory = {type, category, subCategory};
        setError("");

        const data = await postCategories(newCategory);

        if (data.error) {
            setError(data.error); // show backend error above buttons
            return;
        }

        console.log("Category created:", data);
        navigation.goBack(); // navigate back after success
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    // Clear error on any input change
    const handleChange = (setter) => (text) => {
        setter(text);
        if (error) setError("");
    };

    return (<View style={styles.container}>
        <Text style={styles.title}>Add New Category</Text>

        <TextInput
            style={styles.input}
            placeholder="Type (e.g. Expense, Income)"
            value={type}
            onChangeText={handleChange(setType)}
        />

        <TextInput
            style={styles.input}
            placeholder="Category (e.g. Bills, Food)"
            value={category}
            onChangeText={handleChange(setCategory)}
        />

        <TextInput
            style={styles.input}
            placeholder="Subcategory (e.g. Mobile, Groceries)"
            value={subCategory}
            onChangeText={handleChange(setSubCategory)}
        />

        {/* Error message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.button, styles.submit, !isFormValid && styles.disabled]}
                onPress={handleSubmit}
                disabled={!isFormValid}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    </View>);
}

export default CategoryForm;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff", padding: 20, justifyContent: "center",
    }, title: {
        fontSize: 22, fontWeight: "600", textAlign: "center", marginBottom: 24,
    }, input: {
        borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16,
    }, errorText: {
        color: "red", fontSize: 14, textAlign: "center", marginBottom: 12,
    }, buttonContainer: {
        flexDirection: "row", justifyContent: "space-between", marginTop: 12,
    }, button: {
        flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: "center", marginHorizontal: 5,
    }, submit: {
        backgroundColor: "#007AFF",
    }, disabled: {
        backgroundColor: "#a0cfff",
    }, cancel: {
        backgroundColor: "#999",
    }, buttonText: {
        color: "#fff", fontWeight: "600", fontSize: 16,
    },
});
