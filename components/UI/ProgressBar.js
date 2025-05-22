import React from "react";
import * as Progress from "react-native-progress";
import {StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constansts/styles";

function getColorByProgress(progress) {
    if (progress < 0.3) return GlobalStyles.colors.red200;
    if (progress < 0.7) return GlobalStyles.colors.yellow200;
    return GlobalStyles.colors.green100;
}

function ProgressBar({options, style}) {
    const {
        progress = 0, width = 100, height = 10, borderRadius = 6, animated = true, color = getColorByProgress(progress)
    } = options;

    const percentage = Math.round(progress * 100);
    const textColor = progress > 0.3 ? GlobalStyles.colors.white500 : GlobalStyles.colors.black700;

    return (<View style={[styles.container, {width, height}, style]}>
        <Progress.Bar
            style={styles.progressBar}
            progress={progress}
            width={width}
            height={height}
            color={color}
            animated={animated}
            borderRadius={borderRadius}
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
        justifyContent: "center",
    }, progressBar: {
        position: "absolute", zIndex: 0,
    }, overlay: {
        position: "absolute", width: "100%", alignItems: "center", zIndex: 1,
    }, percentageText: {
        fontSize: 15, fontWeight: "bold",
    },
});
