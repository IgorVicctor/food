import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from './screens/Home';
import RestaurantDetail from './screens/RestaurantDetail';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from './redux/store';
import OrderCompleted from './screens/OrderCompleted';
import Carrinho from './screens/Carrinho';
import Conta from './screens/Conta';
import Pedido from './screens/Pedido';
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';



const store = configureStore();

export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <ReduxProvider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
                    <Stack.Screen name="Cadastro" component={Cadastro} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Pedido" component={Pedido} />
                    <Stack.Screen name="Conta" component={Conta} />
                    <Stack.Screen name="Carrinho" component={Carrinho} />
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="RestaurantDetail" component={RestaurantDetail}/>
                    <Stack.Screen name="OrderCompleted" component={OrderCompleted}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ReduxProvider>
    );
}