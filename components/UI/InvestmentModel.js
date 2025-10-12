import React from 'react';
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GlobalStyles} from '../../constansts/styles';
import {Ionicons} from '@expo/vector-icons';

const InvestmentModal = ({visible, onClose, title, children, actions = []}) => {
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
                    <Text style={styles.modalTitle} numberOfLines={1} ellipsizeMode="tail">
                        {title}
                    </Text>
                    <View style={styles.headerActions}>
                        {actions.map((action, index) => (<TouchableOpacity
                            key={index}
                            onPress={action.onPress}
                            style={[styles.actionButton, action.style]}
                        >
                            {action.icon &&
                                <Ionicons name={action.icon} size={18} color="#fff" style={{marginRight: 4}}/>}
                            <Text style={styles.actionText}>{action.label}</Text>
                        </TouchableOpacity>))}
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={20} color={GlobalStyles.colors.white500}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.modalBody} showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
            </View>
        </View>
    </Modal>);
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }, modalOverlayTouchable: {flex: 1}, modalContent: {
        backgroundColor: GlobalStyles.colors.white500,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: -2},
        shadowRadius: 6,
        elevation: 5,
    }, modalHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
    }, modalTitle: {
        fontSize: 18, fontWeight: 'bold', flex: 1,
    }, headerActions: {
        flexDirection: 'row', alignItems: 'center',
    }, closeButton: {
        backgroundColor: GlobalStyles.colors.red200, padding: 6, borderRadius: 8, marginLeft: 8,
    }, actionButton: {
        backgroundColor: GlobalStyles.colors.primary500,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        marginLeft: 6,
        flexDirection: 'row',
        alignItems: 'center',
    }, actionText: {
        color: GlobalStyles.colors.white500, fontWeight: '600', fontSize: 14,
    }, modalBody: {
        flexGrow: 1, paddingBottom: 12,
    },
});

export default InvestmentModal;
