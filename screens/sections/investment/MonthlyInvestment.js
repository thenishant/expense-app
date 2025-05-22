import React, {useEffect, useState} from 'react';
import {Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {GlobalStyles} from '../../../constansts/styles';
import Summary from './Summary';

const MonthlyInvestment = ({data}) => {
    const [markedMonths, setMarkedMonths] = useState({});
    const [selectedMonthData, setSelectedMonthData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const updatedMarkedMonths = {};

        const getColorByPercent = (percent) => {
            return [{max: 25, color: GlobalStyles.colors.red200},
                {max: 75, color: GlobalStyles.colors.yellow200}, {
                    max: 90, color: GlobalStyles.colors.orange300
                }, {
                    max: 150, color: GlobalStyles.colors.green100
                },].find(({max}) => percent <= max)?.color || GlobalStyles.colors.gray300;
        };

        data.months.forEach(({month, investmentPlan}) => {
            const percent = investmentPlan?.percentInvested ?? 0;
            updatedMarkedMonths[month] = getColorByPercent(percent);
        });

        setMarkedMonths(updatedMarkedMonths);
    }, [data]);

    const openModal = (month) => {
        const monthData = data.months.find((m) => m.month === month);
        if (monthData) {
            setSelectedMonthData(monthData);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => {
            setSelectedMonthData(null);
        }, 200);
    };

    return (<>
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Monthly Summary</Text>
            <View style={styles.monthsContainer}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
                    const monthColor = markedMonths[month] || GlobalStyles.colors.gray300;

                    return (<TouchableOpacity
                        key={index}
                        style={[styles.monthBox, {backgroundColor: monthColor}]}
                        onPress={() => openModal(month)}
                    >
                        <Text style={styles.monthText}>{month}</Text>
                    </TouchableOpacity>);
                })}
            </View>
        </ScrollView>

        <Modal
            visible={modalVisible}
            animationType="fade"
            transparent
            presentationStyle="overFullScreen"
            statusBarTranslucent={true}
            onRequestClose={closeModal}
        >
            <View style={styles.modalOverlay} pointerEvents="box-none">
                <TouchableOpacity
                    style={styles.modalOverlayTouchable}
                    activeOpacity={1}
                    onPress={closeModal}
                />

                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            {selectedMonthData?.month} {selectedMonthData?.year} Investment
                        </Text>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <Summary data={selectedMonthData}/>
                </View>
            </View>
        </Modal>
    </>);
};

const boxWidth = Dimensions.get('window').width / 4;

const styles = StyleSheet.create({
    scrollContent: {
        margin: 10,
    }, monthsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: GlobalStyles.colors.white500,
        borderRadius: 12,
        paddingVertical: 10,
        shadowColor: GlobalStyles.colors.black50,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.white500,
        justifyContent: 'center',
        alignItems: 'center',
    }, title: {
        fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: GlobalStyles.colors.black700
    }, monthBox: {
        width: boxWidth, height: 35, justifyContent: 'center', alignItems: 'center', margin: 8, borderRadius: 8
    }, monthText: {
        fontSize: 16, fontWeight: '600', color: GlobalStyles.colors.white500
    }, modalOverlay: {
        flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0)'
    }, modalOverlayTouchable: {
        flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }, modalContent: {
        height: '33%',
        backgroundColor: GlobalStyles.colors.white500,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 15,
    }, modalTitle: {
        padding: 10, fontSize: 20, fontWeight: 'bold',
    }, modalHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
    }, closeButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: GlobalStyles.colors.red200,
        borderRadius: 8,
    }, closeText: {
        color: 'white', fontWeight: '600',
    },
});

export default MonthlyInvestment;
