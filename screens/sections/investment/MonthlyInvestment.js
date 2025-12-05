import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {GlobalStyles} from '../../../constansts/styles';
import InvestmentSummary from './InvestmentSummary';
import InvestmentModal from "../../../components/UI/InvestmentModel";

const MonthlyInvestment = ({data}) => {
    const [markedMonths, setMarkedMonths] = useState({});
    const [selectedMonthData, setSelectedMonthData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const updatedMarkedMonths = {};

        const getColorByPercent = (percent) => [{max: 25, color: GlobalStyles.colors.red200}, {
            max: 75, color: GlobalStyles.colors.yellow200
        }, {max: 90, color: GlobalStyles.colors.orange300}, {
            max: 150, color: GlobalStyles.colors.green100
        },].find(({max}) => percent <= max)?.color || GlobalStyles.colors.gray300;

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
            <View style={styles.monthsContainer}>
                <Text style={styles.title}>Monthly Summary</Text>
                <View style={styles.monthBoxesWrapper}>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',].map((month, index) => {
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
            </View>
        </ScrollView>

        <InvestmentModal
            visible={modalVisible}
            onClose={closeModal}
            title={`${selectedMonthData?.month} ${selectedMonthData?.year} Investment`}>
            {selectedMonthData &&
                <InvestmentSummary month={selectedMonthData}/>
            }
        </InvestmentModal>
    </>);
};

const boxWidth = Dimensions.get('window').width / 4;

const styles = StyleSheet.create({
    scrollContent: {
        margin: 10,
    }, monthsContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: GlobalStyles.colors.white500,
        borderRadius: 12,
        shadowColor: GlobalStyles.colors.black50,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.black50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    }, title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: GlobalStyles.colors.black700,
        alignSelf: 'flex-start',
        paddingTop: 10,
        paddingLeft: 15
    }, monthBoxesWrapper: {
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', paddingHorizontal: 10
    }, monthBox: {
        width: boxWidth, height: 35, justifyContent: 'center', alignItems: 'center', margin: 8, borderRadius: 8,
    }, monthText: {
        fontSize: 16, fontWeight: '600', color: GlobalStyles.colors.white500,
    }, textContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        alignSelf: 'flex-start',
        paddingTop: 5,
        fontWeight: 'bold',
        paddingLeft: 20
    }, text: {
        fontSize: 16, color: "#444",
    }, amountText: {
        fontSize: 16, fontWeight: 'bold', color: "#444",
    }
});

export default MonthlyInvestment;
