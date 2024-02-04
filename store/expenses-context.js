import {createContext, useReducer} from "react";

export const DUMMY_EXPENSE = [{
    id: 'e1',
    desc: 'Shoes',
    amount: 1200,
    date: new Date('2024-01-20')
}, {
    id: 'e2',
    desc: 'Book',
    amount: 614,
    date: new Date('2024-01-22')
}, {
    id: 'e3',
    desc: 'Loan',
    amount: 12000,
    date: new Date('2024-01-29')
}, {
    id: 'e4',
    desc: 'Bag',
    amount: 1000,
    date: new Date('2024-01-30')
}, {
    id: 'e5',
    desc: 'Loan',
    amount: 12000,
    date: new Date('2024-02-02')
}, {
    id: 'e6',
    desc: 'Loan in future',
    amount: 12000,
    date: new Date('2024-03-03')
},]

export const ExpensesContext = createContext({
    expenses: [], addExpense: ({desc, amount, date}) => {
    }, deleteExpense: ({id}) => {
    }, updateExpense: (id, {desc, amount, date}) => {
    },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case  'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state]
        case  'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
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
    const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSE)

    function addExpense(expenseData) {
        dispatch({type: "ADD", payload: expenseData})
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
        updateExpense: updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}


export default ExpenseContextProvider