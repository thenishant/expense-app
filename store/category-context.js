import React, {createContext, useReducer} from 'react';

export const CategoryContext = createContext({
    category: [], addCategory: ({amount, category, percent}) => {
    }, setCategory: (category) => {
    }
});

function categoryReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            if (Array.isArray(action.payload)) {
                return action.payload.reverse();
            } else if (typeof action.payload === "object" && action.payload !== null) {
                return action.payload;
            }
            return state;
        default:
            return state;
    }
}

function CategoryContextProvider({children}) {
    const [categoryState, dispatch] = useReducer(categoryReducer, []);

    function addCategory(categoryData) {
        dispatch({type: "ADD", payload: categoryData});
    }

    function setCategory(category) {
        dispatch({type: 'SET', payload: category});
    }

    const value = {
        category: categoryState, addCategory: addCategory, setCategory: setCategory
    };

    return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

export default CategoryContextProvider;
