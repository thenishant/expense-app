import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import Card from "../../components/UI/Card";
import moment from "moment";
import axios from "axios";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";

function App() {

    const [responseJson, setResponseJson] = useState(null);

    const totalExpenseInAMonthHandler = async () => {
        try {
            const month = moment().format('MMM');
            const response = await axios.get(buildUrl(`${apiEndpoints.transactionsInAMonth}?month=${month}`));
            const data = await response.data;
            const balance = data['balance'];
            setResponseJson(balance);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        totalExpenseInAMonthHandler();
    }, []);

    return (<View style={styles.cardContainer}>
        <Card
            heading="Balance"
            amount={`₹ ${responseJson}`}
        />
    </View>);
}

export default App;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#80ed99",
        marginVertical: 8,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginHorizontal: 8,
        marginTop: 50,
        width: 110,
        borderRadius: 20,
    },
});
