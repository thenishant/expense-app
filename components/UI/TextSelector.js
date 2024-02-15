import React, {useState} from 'react';
import {Dimensions, Modal, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {GlobalStyles} from "../../constansts/styles";

const TextSelector = ({label, data, config, inValid}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const inputStyles = [styles.input]

    if (inValid) inputStyles.push(styles.invalidInput)

    const handleTextSelection = (text) => {
        if (config && config.onChangeText) {
            config.onChangeText(text);
        }
        setModalVisible(false);
    };

    return (<View style={styles.container}>
        <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                onPressIn={() => setModalVisible(true)}
                style={inputStyles}
                {...config}
            />
        </Pressable>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {data.map((item, index) => (
                        <Pressable style={styles.textButton} key={index} onPress={() => handleTextSelection(item)}>
                            <Text>{item}</Text>
                        </Pressable>))}
                </View>
            </View>
        </Modal>
    </View>);
};

const {height} = Dimensions.get('window');
const modalHeight = height / 3;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4, marginVertical: 8
    }, label: {
        fontSize: 12, color: GlobalStyles.colors.black700, marginBottom: 4
    }, input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        overflow: "hidden",
    }, modalContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center',
    }, modalContent: {
        backgroundColor: 'white',
        width: '100%',
        height: modalHeight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }, textButton: {
        margin: 8, padding: 10, borderWidth: 1, height: 40, justifyContent: 'center', alignItems: 'center',
    }, invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
});

export default TextSelector;
