import React, {createContext, useReducer} from "react";

export const AccountContext = createContext({
    accounts: [], addAccount: ({accountName, accountType, initialBalance, currentBalance}) => {
    }, setAccounts: (accounts) => {
    }, updateAccount: (id, data) => {
    }, deleteAccount: (id) => {
    },
});

function accountReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "SET":
            return action.payload.reverse();
        case "UPDATE":
            return state.map((acc) => acc._id === action.payload.id ? {...acc, ...action.payload.data} : acc);
        case "DELETE":
            return state.filter((acc) => acc._id !== action.payload);

        default:
            return state;
    }
}

function AccountContextProvider({children}) {
    const [accountState, dispatch] = useReducer(accountReducer, []);

    function addAccount(accountData) {
        dispatch({type: "ADD", payload: accountData});
    }

    function setAccounts(accounts) {
        dispatch({type: "SET", payload: accounts});
    }

    function updateAccount(id, data) {
        dispatch({type: "UPDATE", payload: {id, data}});
    }

    function deleteAccount(id) {
        dispatch({type: "DELETE", payload: id});
    }

    const value = {
        accounts: accountState, addAccount, setAccounts, updateAccount, deleteAccount,
    };

    return (<AccountContext.Provider value={value}>{children}</AccountContext.Provider>);
}

export default AccountContextProvider;
