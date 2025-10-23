import React from "react";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import {GlobalStyles} from "./constansts/styles";
import IconButton from "./components/UI/IconButton";
import DashBoard from "./screens/DashBoard";
import Investment from "./screens/Investment";
import Budget from "./screens/Budget";
import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import ManageBudget from "./screens/ManageBudget";
import ManageInvestment from "./screens/ManageInvestment";
import {ExpensesContextProvider} from "./store/expenses-context";
import CategoryContextProvider from "./store/category-context";
import {BudgetContextProvider} from "./store/budget-context";
import {SummaryContextProvider} from "./store/summary-context";
import More from "./screens/More";
import CategoryForm from "./components/forms/CategoryForm";
import AccountForm from "./components/forms/AccountForm";

const RootStack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();

function DashboardStackNavigator() {
    return (<DashboardStack.Navigator
        screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500}, headerTintColor: "white",
        }}
    >
        <DashboardStack.Screen
            name="DashBoard"
            component={DashBoard}
            options={({navigation}) => ({
                title: "Dashboard", headerRight: ({tintColor}) => (<IconButton
                    icon="add"
                    size={28}
                    color={tintColor}
                    onPress={() => navigation.navigate("ManageExpense")}
                />),
            })}
        />
        <DashboardStack.Screen
            name="Investments"
            component={Investment}
            options={({navigation}) => ({
                title: "Investments", headerRight: ({tintColor}) => (<IconButton
                    icon="add"
                    size={28}
                    color={tintColor}
                    onPress={() => navigation.navigate("ManageInvestment")}
                />),
            })}
        />
    </DashboardStack.Navigator>);
}

function ExpensesOverview() {
    return (<BottomTabs.Navigator
        screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500}, headerTintColor: "white",
        }}
    >
        <BottomTabs.Screen
            name="DashboardTab"
            component={DashboardStackNavigator}
            options={{
                title: "Dashboard",
                tabBarLabel: "Dashboard",
                tabBarIcon: ({color, size}) => (<Ionicons name="grid-outline" size={size} color={color}/>),
                headerShown: false,
            }}
        />
        <BottomTabs.Screen
            name="Budget"
            component={Budget}
            options={({navigation}) => ({
                title: "Budget",
                tabBarLabel: "Budget",
                tabBarIcon: ({color, size}) => (<Ionicons name="calculator-outline" size={size} color={color}/>),
                headerRight: ({tintColor}) => (<IconButton
                    icon="add"
                    size={28}
                    color={tintColor}
                    onPress={() => navigation.navigate("ManageBudget")}
                />),
            })}
        />
        <BottomTabs.Screen
            name="AllExpenses"
            component={AllExpenses}
            options={{
                title: "All Expenses",
                tabBarLabel: "All Expenses",
                tabBarIcon: ({color, size}) => (<Ionicons name="calendar-outline" size={size} color={color}/>),
            }}
        />
        <BottomTabs.Screen
            name="More"
            component={More}
            options={{
                title: "More",
                tabBarLabel: "More",
                tabBarIcon: ({color, size}) => (<Ionicons name="shuffle-outline" size={size} color={color}/>),
            }}
        />
    </BottomTabs.Navigator>);
}

export default function App() {
    return (<>
        <StatusBar style="auto"/>
        <ExpensesContextProvider>
            <CategoryContextProvider>
                <BudgetContextProvider>
                    <SummaryContextProvider>
                        <NavigationContainer>
                            <RootStack.Navigator
                                screenOptions={{
                                    headerStyle: {
                                        backgroundColor: GlobalStyles.colors.primary500,
                                    }, headerTintColor: "white",
                                }}
                            >
                                <RootStack.Screen
                                    name="ExpensesOverview"
                                    component={ExpensesOverview}
                                    options={{headerShown: false}}
                                />
                                <RootStack.Screen
                                    name="ManageExpense"
                                    component={ManageExpense}
                                    options={{presentation: "modal"}}
                                />
                                <RootStack.Screen
                                    name="ManageBudget"
                                    component={ManageBudget}
                                    options={{presentation: "modal"}}
                                />
                                <RootStack.Screen
                                    name="ManageInvestment"
                                    component={ManageInvestment}
                                    options={{presentation: "modal"}}
                                />
                                <RootStack.Screen
                                    name="CategoryForm"
                                    component={CategoryForm}
                                    options={{title: "Add Category", presentation: "transparentModal"}}
                                />
                                <RootStack.Screen
                                    name="AccountForm"
                                    component={AccountForm}
                                    options={{title: "Add Account", presentation: "transparentModal"}}
                                />
                            </RootStack.Navigator>
                        </NavigationContainer>
                    </SummaryContextProvider>
                </BudgetContextProvider>
            </CategoryContextProvider>
        </ExpensesContextProvider>
    </>);
}
