import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GlobalStyles} from '../../constansts/styles';

const InvestmentModal = ({visible, onClose, title, children}) => {
    return (<Modal
        visible={visible}
        animationType="fade"
        transparent
        presentationStyle="overFullScreen"
        statusBarTranslucent
        onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
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

                <View style={styles.modalBody}>{children}</View>
            </View>
        </View>
    </Modal>);
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }, modalOverlayTouchable: {
        flex: 1,
    }, modalContent: {
        backgroundColor: GlobalStyles.colors.white500,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        maxHeight: '80%',
    }, modalHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
    }, modalTitle: {
        fontSize: 18, fontWeight: 'bold',
    }, closeButton: {
        backgroundColor: GlobalStyles.colors.red200, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
    }, closeText: {
        color: GlobalStyles.colors.white500, fontWeight: '600',
    }, modalBody: {
        flexGrow: 1,
    },
});

export default InvestmentModal;
