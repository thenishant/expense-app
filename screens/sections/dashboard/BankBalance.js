import React, {useContext, useEffect, useState} from "react";
import BigCard from "../../../components/UI/BIgCard";
import {SummaryContext} from "../../../store/summary-context";

function BankBalance() {
    const {summary} = useContext(SummaryContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {

        try {
            setBalance(summary.effectiveBalance);
        } catch (err) {
            setError('Error loading data');
        }
        setIsFetching(false)
    }, [summary]);

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

export default BankBalance;
