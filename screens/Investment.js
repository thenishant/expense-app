import React, {useLayoutEffect} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import ToInvest from "./sections/investment/ToInvest";
import Summary from "./sections/investment/Summary";

function Investment({route, navigation}) {
    useLayoutEffect(() => {
        navigation.setOptions({title: 'Investments'});
    }, [navigation]);

    return (<ScrollView>
        <View style={styles.container}>
            <ToInvest/>
            <Summary/>
        </View>
    </ScrollView>);
}

export default Investment;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#eef4f8', marginTop: 10
    }
});
