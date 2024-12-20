import {createContext, useReducer} from "react";

export const ExpensesContext = createContext({
    expenses: [], addExpense: ({desc, amount, date, type, category}) => {
    }, deleteExpense: ({id}) => {
    }, updateExpense: (id, {desc, amount, date, type, category}) => {
    }, setExpenses: (expenses) => {
    },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];  // Add new expense at the top
        case 'SET':
            return action.payload.reverse();    // Reverse only on 'SET'
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = {
                ...state[updatableExpenseIndex], ...action.payload.data,
            };
            return updatedExpenses;
        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload);
        default:
            return state;
    }
}

export function ExpensesContextProvider({children}) {
    const [expenseState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({type: "ADD", payload: expenseData});
    }

    function setExpenses(expenses) {
        dispatch({type: 'SET', payload: expenses});
    }

    function deleteExpense(id) {
        dispatch({type: "DELETE", payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: "UPDATE", payload: {id, data: expenseData}});
    }

    const value = {
        expenses: expenseState, addExpense, deleteExpense, updateExpense, setExpenses,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
