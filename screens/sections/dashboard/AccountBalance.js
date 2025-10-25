import React, {useContext, useEffect, useState} from "react";
import BigCard from "../../../components/UI/BIgCard";
import {AccountContext} from "../../../store/AccountContext";

function AccountBalance() {
    const accountContext = useContext(AccountContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        try {
            const totalBalance = accountContext?.accounts?.reduce((sum, acc) => sum + (acc.currentBalance || 0), 0);
            setBalance(totalBalance || 0);
        } catch (err) {
            setError('Error loading data');
        } finally {
            setIsFetching(false);
        }
    }, [accountContext]);

    if (isFetching) {
        return <BigCard heading="Balance" amount="Loading..."/>;
    }

    if (error) {
        return <BigCard heading="Balance" amount={error}/>;
    }

    return (<BigCard
        isEditable={false}
        amount={balance}
        heading="Balance"
    />);
}

export default AccountBalance;
