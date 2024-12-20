import {FlatList} from "react-native";
import BudgetItem from "./BudgetItem";

function renderBudgetItem(itemData) {
    return <BudgetItem {...itemData.item}/>
}

function BudgetList({budgets}) {
    return (<FlatList data={budgets} renderItem={renderBudgetItem} keyExtractor={budgets.id}/>)
}

export default BudgetList