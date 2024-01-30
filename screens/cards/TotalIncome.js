import React from "react";
import {StyleSheet, View} from "react-native";
import Card from "../../components/Card";

function App() {
    return (
        <View style={styles.cardContainer}>
            <Card
                heading="Income"
                amount="₹133768"
            />
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#2a9d8f",
        marginVertical: 8,
        marginHorizontal: 8,
        marginTop: 50,
        width: 110,
        borderRadius: 20,
    },
});
