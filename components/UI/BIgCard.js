import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {GlobalStyles} from "../../constansts/styles";

function BigCard({
                     heading,
                     amount,
                     style,
                     onAmountChange,
                     isEditable: propIsEditable,
                     isHidden: propIsHidden,
                     onToggleHidden
                 }) {
    const [isEditable, setIsEditable] = useState(propIsEditable || false);
    const [editableAmount, setEditableAmount] = useState(amount);
    const [internalIsHidden, setInternalIsHidden] = useState(true);

    const isControlled = propIsHidden !== undefined;
    const isHidden = isControlled ? propIsHidden : internalIsHidden;

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

    const toggleHidden = () => {
        if (isControlled && onToggleHidden) {
            onToggleHidden(!propIsHidden);
        } else {
            setInternalIsHidden(prev => !prev);
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
                {isHidden ? "*****" : editableAmount}
            </Text>)}

            <TouchableOpacity onPress={toggleHidden}>
                <Ionicons
                    name={isHidden ? "eye-off" : "eye"}
                    size={20}
                    color="#283618"
                    style={styles.toggleIcon}
                />
            </TouchableOpacity>

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
        backgroundColor: GlobalStyles.colors.white500,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        borderWidth: 0.5,
        margin: 10,
        flexDirection: "row",
        paddingHorizontal: 20,
    }, heading: {
        fontSize: 20, textAlign: "center", color: "#283618",
    }, amountContainer: {
        flexDirection: "row", alignItems: "center",
    }, amount: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 10,
    }, input: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 10,
    }, toggleIcon: {
        marginLeft: 10,
    }, editIcon: {
        marginLeft: 10,
    },
});
