import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import {GlobalStyles} from "./constansts/styles";
import {Ionicons} from '@expo/vector-icons'
import IconButton from "./components/UI/IconButton";
import DashBoard from "./screens/DashBoard";
import Budget from "./screens/Budget";
import CategoryContextProvider from "./store/category-context";
import {ExpensesContextProvider} from "./store/expenses-context";
import ManageBudget from "./screens/ManageBudget";
import {BudgetContextProvider} from "./store/budget-context";
import {BalanceContextProvider} from "./store/balance-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
    return (<BottomTabs.Navigator screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500}, headerTintColor: 'white'
    }}>
        <BottomTabs.Screen
            name={"Dashboard"}
            component={DashBoard}
            options={({navigation}) => ({
                title: 'Dashboard',
                tabBarLabel: 'Dashboard',
                tabBarIcon: ({color, size}) => (<Ionicons name={"grid-outline"} size={size} color={color}/>),
                headerRight: ({tintColor}) => (<IconButton
                    icon={"add"}
                    size={28}
                    color={tintColor}
                    onPress={() => {
                        navigation.navigate("ManageExpense")
                    }}
                />)
            })}
        />
        <BottomTabs.Screen
            name={"Budget"}
            component={Budget}
            options={({navigation}) => ({
                title: 'Budget',
                tabBarLabel: 'Budget',
                tabBarIcon: ({color, size}) => (<Ionicons name={"calculator-outline"} size={size} color={color}/>),
                headerRight: ({tintColor}) => (<IconButton
                    icon={"add"}
                    size={28}
                    color={tintColor}
                    onPress={() => {
                        navigation.navigate("ManageBudget")
                    }}
                />)
            })}
        />
        <BottomTabs.Screen
            name={"AllExpenses"}
            component={AllExpenses}
            options={{
                title: 'All Expenses',
                tabBarLabel: 'All Expenses',
                tabBarIcon: ({color, size}) => (<Ionicons name={'calendar-outline'} size={size} color={color}/>)
            }}
        />
        <BottomTabs.Screen
            name={"More"}
            component={AllExpenses}
            options={{
                title: 'More',
                tabBarLabel: 'More',
                tabBarIcon: ({color, size}) => (<Ionicons name={'shuffle-outline'} size={size} color={color}/>)
            }}
        />
    </BottomTabs.Navigator>);
}

export default function App() {
    return (<>
        <StatusBar style={"auto"}/>
        <ExpensesContextProvider>
            <CategoryContextProvider>
                <BudgetContextProvider>
                    <BalanceContextProvider>
                        <NavigationContainer>
                            <Stack.Navigator screenOptions={{
                                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                                headerTintColor: 'white',
                            }}>
                                <Stack.Screen
                                    name={"ExpensesOverview"}
                                    component={ExpensesOverview}
                                    options={{headerShown: false}}/>
                                <Stack.Screen
                                    name={"ManageExpense"}
                                    component={ManageExpense}
                                    options={{presentation: 'modal'}}
                                />
                                <Stack.Screen
                                    name={"ManageBudget"}
                                    component={ManageBudget}
                                    options={{presentation: 'modal'}}
                                />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </BalanceContextProvider>
                </BudgetContextProvider>
            </CategoryContextProvider>
        </ExpensesContextProvider>
    </>);
}
