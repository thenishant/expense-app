import React from "react";
import * as Progress from 'react-native-progress';
import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";

function ProgressBar({options}) {
    const {progress = 0, width = 100, height = 10, color = "#3b5998"} = options;
    const percentage = Math.round(progress * 100);

    const textColor = progress > 0.3 ? GlobalStyles.colors.white500 : GlobalStyles.colors.black700;

    return (<View style={[styles.container, {width, height}]}>
        <Progress.Bar
            style={styles.progressBar}
            {...options}
        />
        <View style={styles.overlay}>
            <Text style={[styles.percentageText, {color: textColor}]}>
                {percentage}%
            </Text>
        </View>
    </View>);
}

export default ProgressBar;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', marginTop: 15
    }, progressBar: {
        position: 'absolute', zIndex: 0,
    }, overlay: {
        position: 'absolute', width: '100%', alignItems: 'center', zIndex: 1,
    }, percentageText: {
        fontSize: 15, fontWeight: 'bold',
    },
});
