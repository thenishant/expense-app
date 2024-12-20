import React, {useState} from 'react';
import {
    Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList,
} from 'react-native';
import Button from "../UI/Button";
import {GlobalStyles} from "../../constansts/styles";

const ModalInputField = ({label, value, placeholder, data, onChange}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setTimeout(() => setModalVisible(false)); // Add a slight delay for smooth closing
    };

    const handleItemSelect = (item) => {
        // onChange(item.replace(/\p{Emoji}/gu, '').trim());
        onChange(item);
        closeModal();
    };

    return (<View style={styles.wrapper}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
            style={styles.input}
            value={value}
            editable={false}
            placeholder={placeholder}
            onTouchStart={openModal}
        />
        <Modal
            animationType="fade" // Use fade animation for smoother effect
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (<TouchableOpacity onPress={() => handleItemSelect(item)}>
                            <Text style={styles.modalItem}>{item}</Text>
                        </TouchableOpacity>)}
                    />
                    <Button onPress={closeModal} style={styles.modalCloseButton}>
                        Close
                    </Button>
                </View>
            </View>
        </Modal>
    </View>);
};

export default ModalInputField;

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 8,
    }, label: {
        fontSize: 14, marginBottom: 4, color: '#333',
    }, input: {
        borderWidth: 1,
        borderColor: 'transparent',
        padding: 6,
        borderRadius: 6,
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        fontSize: 18,
    }, modalContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }, modalContent: {
        backgroundColor: '#fff', padding: 20, marginHorizontal: 20, borderRadius: 8, width: '80%',
    }, modalItem: {
        padding: 10, borderBottomWidth: 1, textAlign: 'left', fontSize: 18,
    }, modalCloseButton: {
        marginTop: 10,
    },
});
