import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {GlobalStyles} from "../../../constansts/styles";
import Summary from "./Summary";
import InvestmentModal from "../../../components/UI/InvestmentModel";

const boxWidth = Dimensions.get("window").width / 5; // optimized width

const MonthlyInvestment = ({data}) => {
    const [markedMonths, setMarkedMonths] = useState({});
    const [monthPercents, setMonthPercents] = useState({});
    const [selectedMonthData, setSelectedMonthData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const updatedColors = {};
        const updatedPercents = {};

        const getColorByPercent = (percent) => {
            const colors = [{max: 25, color: GlobalStyles.colors.red200}, {
                max: 75, color: GlobalStyles.colors.yellow200
            }, {max: 90, color: GlobalStyles.colors.orange300}, {max: 150, color: GlobalStyles.colors.green100},];
            return colors.find(({max}) => percent <= max)?.color || GlobalStyles.colors.gray300;
        };

        data?.months?.forEach(({month, investmentPlan}) => {
            const percent = investmentPlan?.percentInvested ?? 0;
            updatedColors[month] = getColorByPercent(percent);
            updatedPercents[month] = percent;
        });

        setMarkedMonths(updatedColors);
        setMonthPercents(updatedPercents);
    }, [data]);

    const openModal = (month) => {
        const monthData = data?.months?.find((m) => m.month === month);
        if (monthData) {
            setSelectedMonthData(monthData);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedMonthData(null);
    };

    const modalActions = [{label: "Edit", icon: "pencil", onPress: () => console.log("Edit pressed")},];

    const legendColors = [{color: GlobalStyles.colors.red200, label: "<=25%"}, {
        color: GlobalStyles.colors.yellow200, label: "26-75%"
    }, {color: GlobalStyles.colors.orange300, label: "76-90%"}, {color: GlobalStyles.colors.green100, label: ">90%"},];

    return (<>
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Monthly Summary</Text>
                <Text style={styles.amount}>
                    {GlobalStyles.characters.rupee}
                    {data?.investment ?? 0}
                </Text>
            </View>

            <View style={styles.monthBoxesWrapper}>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",].map((month) => {
                    const monthColor = markedMonths[month] || GlobalStyles.colors.gray300;
                    const percent = monthPercents[month] ?? 0;
                    return (<TouchableOpacity
                        key={month}
                        style={[styles.monthBox, {backgroundColor: monthColor}]}
                        onPress={() => openModal(month)}
                    >
                        <Text style={styles.monthText}>{month}</Text>
                        <Text style={styles.percentText}>{percent}%</Text>
                    </TouchableOpacity>);
                })}
            </View>

            {/* Legend */}
            <View style={styles.legendWrapper}>
                {legendColors.map(({color, label}) => (<View key={label} style={styles.legendItem}>
                    <View style={[styles.legendColor, {backgroundColor: color}]}/>
                    <Text style={styles.legendLabel}>{label}</Text>
                </View>))}
            </View>
        </View>

        <InvestmentModal
            visible={modalVisible}
            onClose={closeModal}
            title={selectedMonthData ? `${selectedMonthData.month} ${selectedMonthData.year} Investment` : ""}
            actions={modalActions}
        >
            {selectedMonthData && <Summary data={selectedMonthData}/>}
        </InvestmentModal>
    </>);
};

export default MonthlyInvestment;

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalStyles.colors.white500,
        borderRadius: 12,
        shadowColor: GlobalStyles.colors.black50,
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 0.5,
        borderColor: GlobalStyles.colors.black50,
        padding: 10,
        margin: 10,
    }, headerRow: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8,
    }, title: {
        fontSize: 16, fontWeight: "bold", color: GlobalStyles.colors.black700,
    }, amount: {
        fontSize: 15, fontWeight: "bold", color: GlobalStyles.colors.black700,
    }, monthBoxesWrapper: {
        flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between",
    }, monthBox: {
        width: boxWidth, height: 45, justifyContent: "center", alignItems: "center", marginBottom: 8, borderRadius: 6,
    }, monthText: {
        fontSize: 15, fontWeight: "600", color: GlobalStyles.colors.white500,
    }, percentText: {
        fontSize: 13, color: GlobalStyles.colors.white500, fontWeight: "500",
    }, legendWrapper: {
        flexDirection: "row", justifyContent: "space-around", marginTop: 10,
    }, legendItem: {
        flexDirection: "row", alignItems: "center",
    }, legendColor: {
        width: 12, height: 12, borderRadius: 3, marginRight: 4,
    }, legendLabel: {
        fontSize: 12, color: "#333",
    },
});
