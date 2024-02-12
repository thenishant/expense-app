import React, {useState} from 'react';
import {Dimensions, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from "../../constansts/styles";

const TextSelector = ({label, data}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedText, setSelectedText] = useState('');

    const handleTextSelection = (text) => {
        setSelectedText(text);
        setModalVisible(false);
    };

    return (<View style={styles.container}>
        <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.input}>{selectedText}</Text>
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
        fontSize: 12, color: 'black', marginBottom: 4
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
    },
});

export default TextSelector;
