import React, {useState} from "react";
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {VictoryPie} from "victory-native";
import {GlobalStyles} from "../../constansts/styles";

function PieChart({chartData, title, total}) {
    const [selected, setSelected] = useState(null);
    const {width} = Dimensions.get("window");

    function onSelect(name) {
        const item = chartData.find(c => c.x === name);
        setSelected(item || null);
    }

    const renderLegendItem = ({item}) => {
        const active = selected?.x === item.x;
        return (<TouchableOpacity style={[styles.legendRow, active && {backgroundColor: item.color + "20"}]}
                                  onPress={() => onSelect(item.x)}>
            <View style={[styles.colorBox, {backgroundColor: item.color}]}/>
            <Text style={styles.legendLabel}>{item.x}</Text>
            <Text style={styles.legendAmount}>{GlobalStyles.characters.rupee}{item.y}</Text>
            <Text style={styles.legendPercent}>{item.percent}%</Text>
        </TouchableOpacity>);
    };

    return (<View style={styles.wrapper}>
        <VictoryPie
            padding={{top: 10, bottom: 0}}
            data={chartData}
            radius={({datum}) => selected && selected.x === datum.x ? width * 0.38 : width * 0.33}
            labels={() => null}
            colorScale={chartData.map(c => c.color)}
            events={[{target: "data", eventHandlers: {onPress: (_, props) => onSelect(chartData[props.index].x)}}]}
        />

        {/* CENTER LABEL */}
        <View style={styles.centerLabel}>
            <Text style={styles.totalNumber}>{total}</Text>
            <Text style={styles.totalLabel}>{title}</Text>
        </View>

        <FlatList
            data={chartData}
            renderItem={renderLegendItem}
            keyExtractor={item => item.x}
            scrollEnabled={false}
            style={styles.legendList}
        />
    </View>);
}

export default PieChart;

const styles = StyleSheet.create({
    wrapper: {alignItems: "center", paddingBottom: 0},
    centerLabel: {position: "absolute", top: "3%", alignItems: "center",},
    totalNumber: {fontSize: 24, fontWeight: "bold", color: GlobalStyles.colors.black50},
    totalLabel: {fontSize: 13, color: GlobalStyles.colors.black50},
    legendList: {marginTop: -25, width: "95%"},
    legendRow: {
        flexDirection: "row", paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10, alignItems: "center"
    },
    colorBox: {width: 14, height: 14, borderRadius: 4},
    legendLabel: {flex: 1, marginLeft: 10, fontSize: 16, color: GlobalStyles.colors.black50},
    legendAmount: {marginRight: 12, fontSize: 16, color: GlobalStyles.colors.black50},
    legendPercent: {fontSize: 16, color: GlobalStyles.colors.black50},
});
