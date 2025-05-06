import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import {GlobalStyles} from "./constansts/styles";
import {Ionicons} from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import DashBoard from "./screens/DashBoard";
import Budget from "./screens/Budget";
import CategoryContextProvider from "./store/category-context";
import {ExpensesContextProvider} from "./store/expenses-context";
import ManageBudget from "./screens/ManageBudget";
import {BudgetContextProvider} from "./store/budget-context";
import {BalanceContextProvider} from "./store/balance-context";
import Investments from "./screens/Investments";
import ManageInvestment from "./screens/ManageInvestment";
import InvestmentContextProvider from "./store/investment-context";

const RootStack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();

// 👇 Nested stack for Dashboard and Investments
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
            component={Investments}
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

// 👇 Bottom tab navigator
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
            component={AllExpenses}
            options={{
                title: "More",
                tabBarLabel: "More",
                tabBarIcon: ({color, size}) => (<Ionicons name="shuffle-outline" size={size} color={color}/>),
            }}
        />
    </BottomTabs.Navigator>);
}

// 👇 Root App
export default function App() {
    return (<>
        <StatusBar style="auto"/>
        <ExpensesContextProvider>
            <CategoryContextProvider>
                <BudgetContextProvider>
                    <BalanceContextProvider>
                        <InvestmentContextProvider>
                            <NavigationContainer>
                                <RootStack.Navigator
                                    screenOptions={{
                                        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                                        headerTintColor: "white",
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
                                </RootStack.Navigator>
                            </NavigationContainer>
                        </InvestmentContextProvider>
                    </BalanceContextProvider>
                </BudgetContextProvider>
            </CategoryContextProvider>
        </ExpensesContextProvider>
    </>);
}
