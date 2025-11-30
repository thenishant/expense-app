import React, {useEffect, useRef, useState} from "react";
import {Animated, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {GlobalStyles} from "../../constansts/styles";

function BigCard({
                     heading,
                     amount,
                     style,
                     onAmountChange,
                     isEditable: propIsEditable,
                     isHidden: propIsHidden,
                     onToggleHidden,
                     expandableContent
                 }) {
    const [isEditable, setIsEditable] = useState(propIsEditable || false);
    const [editableAmount, setEditableAmount] = useState(amount);
    const [internalIsHidden, setInternalIsHidden] = useState(true);

    const isControlled = propIsHidden !== undefined;
    const isHidden = isControlled ? propIsHidden : internalIsHidden;

    useEffect(() => setEditableAmount(amount), [amount]);

    const toggleHidden = () => {
        if (isControlled) onToggleHidden?.(!propIsHidden); else setInternalIsHidden(prev => !prev);
    };

    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const contentHeight = useRef(0);

    const toggleExpand = () => {
        setExpanded(prev => {
            const next = !prev;

            Animated.parallel([Animated.timing(heightAnim, {
                toValue: next ? contentHeight.current : 0, duration: 220, useNativeDriver: false
            }), Animated.timing(opacityAnim, {
                toValue: next ? 1 : 0, duration: 200, useNativeDriver: false
            })]).start();

            return next;
        });
    };

    return (<View>
        <View style={styles.container}>
            <Text style={styles.heading}>{heading}</Text>

            <View style={styles.amountContainer}>
                {isEditable ? (<TextInput
                    style={[styles.input, style]}
                    value={editableAmount.toString()}
                    onChangeText={setEditableAmount}
                    onBlur={() => {
                        setIsEditable(false);
                        onAmountChange?.(parseFloat(editableAmount));
                    }}
                    keyboardType="numeric"
                    autoFocus
                />) : (<Text style={[styles.amount, style]}>
                    {isHidden ? "*****" : editableAmount}
                </Text>)}

                {/* Eye */}
                <TouchableOpacity onPress={toggleHidden}>
                    <Ionicons
                        name={isHidden ? "eye-off" : "eye"}
                        size={20}
                        color="#283618"
                        style={styles.toggleIcon}
                    />
                </TouchableOpacity>

                {/* Edit */}
                {!isEditable && propIsEditable && (<TouchableOpacity onPress={() => setIsEditable(true)}>
                    <Ionicons
                        name="pencil"
                        size={20}
                        color="#283618"
                        style={styles.editIcon}
                    />
                </TouchableOpacity>)}

                {/* Chevron (expand toggle) */}
                {expandableContent && (<TouchableOpacity onPress={toggleExpand}>
                    <Ionicons
                        name={expanded ? "chevron-collapse-outline" : "chevron-expand-outline"}
                        size={24}
                        color="#283618"
                        style={{marginLeft: 8}}
                    />
                </TouchableOpacity>)}
            </View>
        </View>

        {expandableContent && (<View
            style={styles.hiddenMeasureBox}
            onLayout={(e) => {
                contentHeight.current = e.nativeEvent.layout.height;
            }}
        >
            {expandableContent}
        </View>)}

        {expandableContent && (<Animated.View
            style={[styles.expandContainer, {
                height: heightAnim, opacity: opacityAnim
            }]}
        >
            {expandableContent}
        </Animated.View>)}
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
        paddingHorizontal: 10
    }, heading: {
        fontSize: 20, textAlign: "center", color: "#283618"
    }, amountContainer: {
        flexDirection: "row", alignItems: "center"
    }, amount: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 10
    }, input: {
        fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 10
    }, toggleIcon: {marginLeft: 10}, editIcon: {marginLeft: 10}, hiddenMeasureBox: {
        position: "absolute", left: 0, right: 0, opacity: 0, zIndex: -1
    }, expandContainer: {
        overflow: "hidden",
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: GlobalStyles.colors.white500,
        borderWidth: 0.5
    }
});
