import {createContext, useReducer} from "react";

export const SummaryContext = createContext({
    summary: [], addSummary: ({percentToInvest, suggestedInvestment, month, year}) => {
    }, deleteSummary: (id) => {
    }, updateSummary: (id, {percentToInvest, suggestedInvestment, month, year}) => {
    }, setSummary: (summaries) => {
    }
});

function summaryReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "SET":
            return action.payload;
        case "UPDATE": {
            const index = state.findIndex(summary => summary.id === action.payload.id);
            if (index === -1) return state;
            const updated = [...state];
            updated[index] = {...updated[index], ...action.payload.data};
            return updated;
        }
        case "DELETE":
            return state.filter(summary => summary.id !== action.payload);
        default:
            return state;
    }
}

export function SummaryContextProvider({children}) {
    const [summaryState, dispatch] = useReducer(summaryReducer, []);

    function addSummary(summaryData) {
        dispatch({type: "ADD", payload: summaryData});
    }

    function setSummary(summaries) {
        dispatch({type: "SET", payload: summaries});
    }

    function deleteSummary(id) {
        dispatch({type: "DELETE", payload: id});
    }

    function updateSummary(id, summaryData) {
        dispatch({type: "UPDATE", payload: {id, data: summaryData}});
    }

    const value = {
        summary: summaryState, addSummary, deleteSummary, updateSummary, setSummary
    };

    return (<SummaryContext.Provider value={value}>
        {children}
    </SummaryContext.Provider>);
}
