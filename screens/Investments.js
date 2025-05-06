import React, {useLayoutEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../constansts/styles";

function Investments({route, navigation}) {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Investments'
        });
    }, [navigation]);

    return (<View>
        <Text>Investments</Text>
    </View>);
}

export default Investments;

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 24, backgroundColor: GlobalStyles.colors.gray500
    }
});