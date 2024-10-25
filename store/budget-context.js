import {createContext, useReducer} from "react";

export const BudgetContext = createContext({
    budgets: [], addBudget: ({category, amount, month, year}) => {
    }, deleteBudget: (id) => {
    }, updateBudget: (id, {category, amount, month, year}) => {
    }, setBudgets: (budgets) => {
    },
});

function budgetReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            return action.payload.reverse();
        case 'UPDATE':
            const updatableBudgetIndex = state.findIndex(budget => budget.id === action.payload.id);
            const updatedBudgets = [...state];
            updatedBudgets[updatableBudgetIndex] = {
                ...state[updatableBudgetIndex], ...action.payload.data,
            };
            return updatedBudgets;
        case 'DELETE':
            return state.filter(budget => budget.id !== action.payload);  // Remove budget by id
        default:
            return state;
    }
}

export function BudgetContextProvider({children}) {
    const [budgetState, dispatch] = useReducer(budgetReducer, []);

    function addBudget(budgetData) {
        dispatch({type: "ADD", payload: budgetData});
    }

    function setBudgets(budgets) {
        dispatch({type: 'SET', payload: budgets});
    }

    function deleteBudget(id) {
        dispatch({type: "DELETE", payload: id});
    }

    function updateBudget(id, budgetData) {
        dispatch({type: "UPDATE", payload: {id, data: budgetData}});
    }

    const value = {
        budgets: budgetState, addBudget, deleteBudget, updateBudget, setBudgets,
    };

    return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
}
