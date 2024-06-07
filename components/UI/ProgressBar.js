import React from "react";
import * as Progress from 'react-native-progress';
import {StyleSheet, View} from "react-native";

function ProgressBar({options}) {
    return (<View>
        <Progress.Bar
            style={styles.progressBar}
            {...options}
        />
    </View>)
}

export default ProgressBar

const styles = StyleSheet.create({
    progressBar: {
        marginTop: 15, color: "#522500",
    },
});