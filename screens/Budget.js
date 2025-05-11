import {useContext} from "react";
import {BudgetContext} from "../store/budget-context";
import BudgetOutput from "../components/budgetOutput/BudgetOutput";

function Budget() {
    const budgetContext = useContext(BudgetContext);

    return (<>
        <BudgetOutput budgets={budgetContext.budgets}
                      expensesPeriod={""} fallbackText={"No budgets found!!"}/>
    </>)
}

export default Budget
