import React, {useState, useEffect} from "react";
import {StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import {GlobalStyles} from "../../constansts/styles";
import {Ionicons} from "@expo/vector-icons";

function BigCard({heading, amount, style, onAmountChange, isEditable: propIsEditable}) {
    const [isEditable, setIsEditable] = useState(propIsEditable || false);
    const [editableAmount, setEditableAmount] = useState(amount);

    useEffect(() => {
        setEditableAmount(amount);
    }, [amount]);

    const handleEditPress = () => {
        setIsEditable(true);
    };

    const handleInputBlur = () => {
        setIsEditable(false);
        if (onAmountChange) {
            onAmountChange(parseFloat(editableAmount));
        }
    };

    return (<View style={styles.container}>
        <Text style={styles.heading}>{heading}</Text>
        <View style={styles.amountContainer}>
            {isEditable ? (<TextInput
                style={[styles.input, style]}
                value={editableAmount.toString()}
                onChangeText={setEditableAmount}
                keyboardType="numeric"
                onBlur={handleInputBlur}
                autoFocus={true}
            />) : (<Text style={[styles.amount, style]}>
                {GlobalStyles.characters.rupee}
                {editableAmount}
            </Text>)}

            {/* Show pencil icon when isEditable is false and propIsEditable is true */}
            {!isEditable && propIsEditable && (<TouchableOpacity onPress={handleEditPress}>
                <Ionicons
                    name={"pencil"}
                    size={20}
                    color="#283618"
                    style={styles.editIcon}
                />
            </TouchableOpacity>)}
        </View>
    </View>);
}

export default BigCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff", margin: 5, borderRadius: 20, alignItems: "center",
        justifyContent: "space-between",
        flex: 1, flexDirection: "row",
        paddingHorizontal: 20,
    }, heading: {
        fontSize: 20, textAlign: "center", color: "#283618",
    }, amountContainer: {
        flexDirection: "row",
        alignItems: "center", // Center items vertically
    }, amount: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 10,
    }, input: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 10, borderBottomWidth: 1, // Add a border for the input
        borderBottomColor: "#ccc", color: "#283618", // Text color for the input
    }, editIcon: {
        marginLeft: 10, // Add spacing between the amount and icon
    },
});