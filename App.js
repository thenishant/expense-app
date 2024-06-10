import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import {GlobalStyles} from "./constansts/styles";
import {Ionicons} from '@expo/vector-icons'
import IconButton from "./components/UI/IconButton";
import ExpenseContextProvider from "./store/expenses-context";
import DashBoard from "./screens/DashBoard";
import Budget from "./screens/Budget";
import CategoryContextProvider from "./store/category-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
    return (<BottomTabs.Navigator screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500}, headerTintColor: 'white'
    }}>
        <BottomTabs.Screen
            name={"Dashboard"}
            component={DashBoard}
            options={({navigation, route}) => ({
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
            options={({navigation, route}) => ({
                title: 'Budget',
                tabBarLabel: 'Budget',
                tabBarIcon: ({color, size}) => (<Ionicons name={"calculator-outline"} size={size} color={color}/>),
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
            name={"AllExpenses"}
            component={AllExpenses}
            options={{
                title: 'All Expenses',
                tabBarLabel: 'All Expenses',
                tabBarIcon: ({color, size}) => (<Ionicons name={'calendar-outline'} size={size} color={color}/>)
            }}
        />
    </BottomTabs.Navigator>);
}

export default function App() {
    return (<>
        <StatusBar style={"auto"}/>
        <ExpenseContextProvider>
            <CategoryContextProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: {backgroundColor: GlobalStyles.colors.primary500}, headerTintColor: 'white',
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
                    </Stack.Navigator>
                </NavigationContainer>
            </CategoryContextProvider>
        </ExpenseContextProvider>
    </>);
}
