import React, {createContext, useContext, useEffect, useState} from "react";
import {getSummary} from "../util/http";

const BalanceContext = createContext();

export const BalanceContextProvider = ({children}) => {
    const [summaryData, setSummaryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                const summary = await getSummary();
                setSummaryData(summary);
            } catch (err) {
                console.error("Error fetching summary data:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSummaryData();
    }, []);

    return (<BalanceContext.Provider value={{summaryData, isLoading, error}}>
        {children}
    </BalanceContext.Provider>);
};

export const useBalance = () => useContext(BalanceContext);