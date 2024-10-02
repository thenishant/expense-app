import {createContext, useReducer} from "react";

export const ExpensesContext = createContext({
    transactions: {
        Expense: [], Income: [], Investment: []
    }, paymentMode: {}, addExpense: ({desc, amount, date, type, category, paymentMode}) => {
    }, deleteExpense: ({id, type, paymentMode}) => {
    }, updateExpense: (id, {desc, amount, date, type, category, paymentMode}) => {
    }, setExpenses: (expensesData) => {
    }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const transactionType = action.payload.type; // "Expense", "Income", or "Investment"
            return {
                ...state, transactions: {
                    ...state.transactions, [transactionType]: [...state.transactions[transactionType], action.payload] // Add the new expense to the correct transaction type
                }, paymentMode: {
                    ...state.paymentMode,
                    [action.payload.paymentMode]: (state.paymentMode[action.payload.paymentMode] || 0) + action.payload.amount // Update the payment mode total
                }
            };

        case 'SET':
            return {
                ...action.payload
            };

        case 'UPDATE':
            const {id, data} = action.payload;
            const expenseType = data.type;
            const updatedTransactionList = state.transactions[expenseType].map(expense => expense._id === id ? {...expense, ...data} : expense // Update the expense data
            );

            return {
                ...state, transactions: {
                    ...state.transactions, [expenseType]: updatedTransactionList // Update the specific transaction type with the modified expense
                }, paymentMode: {
                    ...state.paymentMode, [data.paymentMode]: (state.paymentMode[data.paymentMode] || 0) + data.amount // Update the payment mode total if needed
                }
            };

        case 'DELETE':
            const deleteType = action.payload.type;
            return {
                ...state, transactions: {
                    ...state.transactions,
                    [deleteType]: state.transactions[deleteType].filter(expense => expense._id !== action.payload.id) // Remove the expense by id
                }, paymentMode: {
                    ...state.paymentMode,
                    [action.payload.paymentMode]: state.paymentMode[action.payload.paymentMode] - action.payload.amount // Adjust the payment mode total
                }
            };

        default:
            return state;
    }
}

export function ExpenseContextProvider({children}) {
    const [expenseState, dispatch] = useReducer(expensesReducer, [])

    function addExpense(expenseData) {
        dispatch({type: "ADD", payload: expenseData})
    }

    function setExpenses(expenses) {
        dispatch({type: 'SET', payload: expenses})
    }

    function deleteExpense(id) {
        dispatch({type: "DELETE", payload: id})
    }

    function updateExpense(id, expenseData) {
        dispatch({type: "UPDATE", payload: {id: id, data: expenseData}})
    }

    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
        setExpenses: setExpenses
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

