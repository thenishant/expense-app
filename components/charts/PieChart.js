import React, {useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {VictoryLegend, VictoryPie} from 'victory-native';

function CustomDonutPieChart({chartData}) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    function setSelectCategoryByName(name) {
        let category = chartData.filter(a => a.x === name)
        setSelectedCategory(category[0])
    }

    const {width} = Dimensions.get("window");

    return (<View>
        <VictoryPie
            data={chartData}
            radius={({datum}) => (selectedCategory && selectedCategory.x === datum.x) ? width * 0.4 : width * 0.4 - 10}
            innerRadius={70}
            labelRadius={({innerRadius}) => (width * 0.4 + innerRadius) / 2.5}

            colorScale={chartData.map(item => item.color)}
            events={[{
                target: "data", eventHandlers: {
                    onPress: () => {
                        return [{
                            target: "labels", mutation: (props) => {
                                let categoryName = chartData[props.index].x
                                setSelectCategoryByName(categoryName)
                            }
                        }]
                    }
                }
            }]}
        />
        <VictoryLegend
            x={150}
            y={50}
            orientation="vertical"
            gutter={20}
            style={{border: {stroke: 'black'}, title: {fontSize: 20}}}
            data={chartData.map((item, index) => ({
                name: `${item.x}      ${item.y} - ${((item.y / chartData.reduce((acc, item) => acc + item.y, 0)) * 100).toFixed(0)}%`,
                symbol: {fill: item.color},
                labels: {fill: selectedCategory && selectedCategory.name === item.name ? 'red' : 'black'}
            }))}
            colorScale={chartData.map(item => item.color)}
        />
        <View style={{position: 'absolute', top: '25%', left: '42%'}}>
            <Text style={{textAlign: 'center'}}>{chartData.length}</Text>
            <Text style={{textAlign: 'center'}}>Expenses</Text>
        </View>
    </View>);
}

export default CustomDonutPieChart;
