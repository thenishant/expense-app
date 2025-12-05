import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {GlobalStyles} from "../../constansts/styles";

const InvestmentModal = ({visible, onClose, title, children}) => {
    return (<Modal
        visible={visible}
        animationType="fade"
        transparent
        presentationStyle="overFullScreen"
        statusBarTranslucent={true}
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay} pointerEvents="box-none">
            <TouchableOpacity
                style={styles.modalOverlayTouchable}
                activeOpacity={1}
                onPress={onClose}
            />
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
                {children}
            </View>
        </View>
    </Modal>);
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0)',
    }, modalOverlayTouchable: {
        flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }, modalContent: {
        height: '38%',
        backgroundColor: GlobalStyles.colors.white500,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 15,
    }, modalHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
    }, modalTitle: {
        padding: 10, fontSize: 20, fontWeight: 'bold',
    }, closeButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: GlobalStyles.colors.red200,
        borderRadius: 8,
    }, closeText: {
        color: GlobalStyles.colors.white500, fontWeight: '600',
    },
});

export default InvestmentModal;
