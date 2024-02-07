import {createContext, useReducer} from "react";

export const ExpensesContext = createContext({
    expenses: [], addExpense: ({desc, amount, date}) => {
    }, deleteExpense: ({id}) => {
    }, updateExpense: (id, {desc, amount, date}) => {
    }, setExpenses: (expense) => {
    }
});

function expensesReducer(state, action) {
    switch (action.type) {
        case  'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state]
        case 'SET':
            return action.payload
        case  'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses
        case  'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state
    }
}

function ExpenseContextProvider({children}) {
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


export default ExpenseContextProvider