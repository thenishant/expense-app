import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import Card from "../../components/UI/Card";
import {apiEndpoints, buildUrl} from "../../constansts/Endpoints";
import axios from "axios";
import moment from "moment";

function App() {
    const [responseJson, setResponseJson] = useState(null);

    const totalExpenseInAMonthHandler = async () => {
        try {
            const month = moment().format('MMM');
            const response = await axios.get(buildUrl(`${apiEndpoints.transactionsInAMonth}?month=${month}`));
            const data = await response.data;
            const sumOfExpense = data["sumOfExpense"];
            setResponseJson(sumOfExpense);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        totalExpenseInAMonthHandler();
    }, []);

    return (<View style={styles.cardContainer}>
        <Card
            heading="Expenses"
            amount={`₹ ${responseJson}`}
        />
    </View>);
}

export default App;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#e85d04", marginVertical: 8, marginHorizontal: 8, marginTop: 50, width: 110, borderRadius: 20,
    },
});
