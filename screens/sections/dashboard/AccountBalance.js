import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {AccountContext} from "../../../store/AccountContext";
import {Ionicons} from "@expo/vector-icons";
import BigCard from "../../../components/UI/BIgCard";

function AccountBalance() {
    const {accounts} = useContext(AccountContext);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        setBalance(accounts?.totalBalance || 0);
    }, [accounts]);

    const currentBalances = accounts?.currentBalances || [];

    return (<View>
        <BigCard
            heading="Balance"
            amount={balance}
            isEditable={false}
            // rightIcon={<Ionicons name="chevron-collapse-outline" size={25}/>}
            expandableContent={<View style={styles.list}>
                {currentBalances.map((acc) => (<View key={acc.accountName} style={styles.row}>
                    <Text style={styles.name}>{acc.accountName}</Text>
                    <Text style={styles.amt}>
                        ₹ {acc.currentBalance.toLocaleString()}
                    </Text>
                </View>))}
            </View>}
        />
    </View>);
}

const styles = StyleSheet.create({
    list: {
        paddingTop: 0,
    }, row: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    }, name: {
        fontSize: 16, fontWeight: "500",
    }, amt: {
        fontSize: 16, fontWeight: "700",
    },
});

export default AccountBalance;
