import {createContext, useState} from 'react';

export const InvestmentContext = createContext({
    plans: [],
    createPlan: (plan) => {
    },
    updatePlan: (id, updatedPlan) => {
    },
    deletePlan: (id) => {
    },
});

function InvestmentContextProvider({children}) {
    const [plans, setPlans] = useState([]);

    function createPlan(plan) {
        setPlans((current) => [...current, plan]);
    }

    function updatePlan(id, updatedPlan) {
        setPlans((current) =>
            current.map((plan) => (plan.id === id ? {...plan, ...updatedPlan} : plan))
        );
    }

    function deletePlan(id) {
        setPlans((current) => current.filter((plan) => plan.id !== id));
    }

    return (
        <InvestmentContext.Provider
            value={{plans, createPlan, updatePlan, deletePlan}}
        >
            {children}
        </InvestmentContext.Provider>
    );
}

export default InvestmentContextProvider;
