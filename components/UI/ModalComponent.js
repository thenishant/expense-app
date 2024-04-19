import React from 'react';
import {Modal, Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import {SvgUri} from 'react-native-svg';

const ModalComponent = ({visible, data, onClose, onItemClick, modalTitle}) => {
    return (<Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <View style={styles.header}>
                    <Text style={styles.modalTitle}>{modalTitle}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.table}>
                    {data.map((row, rowIndex) => (<View key={rowIndex} style={styles.row}>
                        {row.map((cell, cellIndex) => (<TouchableOpacity
                            key={cellIndex}
                            onPress={() => onItemClick(cell)}
                            style={styles.cell}>
                            <Text style={styles.text}>{cell}</Text>
                        </TouchableOpacity>))}
                    </View>))}
                </View>
            </View>
        </View>
    </Modal>);
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }, modalContent: {
        backgroundColor: '#fff', borderRadius: 4, padding: 15, width: '102%', paddingBottom: 25
    }, header: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, margin: 10
    }, closeButton: {
        fontSize: 16, color: 'blue',
    }, modalTitle: {
        fontSize: 18, fontWeight: 'bold',
    }, table: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 2, marginBottom: 10,
    }, row: {
        flexDirection: 'row',
    }, cell: {
        flex: 1, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: '#ccc', justifyContent: 'center'
    }, text: {
        textAlign: 'center', color: 'black', fontSize: 16
    },
});

export default ModalComponent;
