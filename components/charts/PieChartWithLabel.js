import React, {useState} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import {GlobalStyles} from "../../constansts/styles";

function PieChartWithLabel({chartData}) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    function setSelectCategoryByName(name) {
        let category = chartData.filter(a => a.x === name)
        setSelectedCategory(category[0])
    }

    const {width} = Dimensions.get("window");

    function renderExpenseSummary() {
        let data = chartData

        const renderItem = ({item}) => {
            return (<TouchableOpacity style={{
                flexDirection: 'row',
                height: 40,
                paddingHorizontal: 8,
                borderRadius: 10,
                backgroundColor: (selectedCategory && selectedCategory.x === item.x) ? item.color : '#ffffff',
                width: 350
            }}
                                      onPress={() => {
                                          let categoryName = item.x
                                          setSelectCategoryByName(categoryName)
                                      }}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 5,
                            backgroundColor: (selectedCategory && selectedCategory.x === item.x) ? 'white' : item.color,
                        }}>
                    </View>
                    <Text style={{
                        marginLeft: 10, color: (selectedCategory && selectedCategory.x === item.x) ? 'black' : '#194868'
                    }}>{item.x}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    color: (selectedCategory && selectedCategory.x === item.x) ? 'white' : '#194868'
                }}>
                    <Text>{GlobalStyles.characters.rupee}{item.y}</Text>
                </View>
                <View style={{
                    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'
                }}>
                    <Text>{item.percent}%</Text>
                </View>
            </TouchableOpacity>)
        }

        return (<View style={{padding: 8}}>
            <FlatList data={data} renderItem={renderItem} keyExtractor={item => `${item.x}`}/>
        </View>)
    }

    return (<View style={{alignItems: 'center', justifyContent: 'center', marginTop: 280, marginBottom: -280}}>
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
        <View>
            {renderExpenseSummary()}
        </View>
        <View style={{position: 'absolute', top: '-2%', left: '42%'}}>
            <Text style={{textAlign: 'center'}}>{chartData.length}</Text>
            <Text style={{textAlign: 'center'}}>Expenses</Text>
        </View>
    </View>);
}

export default PieChartWithLabel;
