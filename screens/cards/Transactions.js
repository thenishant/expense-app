import React from "react";
import {View} from "react-native";
import Card from "../../components/Card";

function Transactions() {
    return (
        <View>
            <Card
                heading="Transactions"
                amount="13"
                amountStyle={{color: "#264653"}}
            />
        </View>
    );
}

export default Transactions;
