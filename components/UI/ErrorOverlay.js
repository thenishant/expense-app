import {StyleSheet, Text, View} from "react-native";

function ErrorOverlay({message}) {
    return (<View style={styles.container}>
        <Text style={[styles.text && styles.title]}>An error occurred</Text>
        <Text style={styles.text}>{message}</Text>
    </View>)
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }, text: {
        color: "black", textAlign: "center", margin: 16,
    }, title: {
        fontSize: 20, fontWeight: "bold"
    }
});