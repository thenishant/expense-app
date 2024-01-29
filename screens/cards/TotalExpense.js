import React from "react";
import {View} from "react-native";
import Card from "../../components/Card";

function App() {
    return (
        <View>
            <Card
                heading="Expenses"
                amount="$500"
                headingStyle={{color: "blue"}}
                amountStyle={{color: "red"}}
            />
        </View>
    );
}

export default App;
