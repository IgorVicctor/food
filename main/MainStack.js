import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
// import Preload from '../screens/Preload';
import Login from '../screens/Login'
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';
import Carrinho from '../screens/Carrinho';
import Conta from '../screens/Conta';
import Pedido from '../screens/Pedido';
import RestaurantDetail from '../screens/RestaurantDetail';
import OrderCompleted from '../screens/OrderCompleted';

import DrawerRoutes from './MainDrawer';

const Stack = createStackNavigator();

function StackRoutes() {
  return (
    
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        headerLeft: null
      }}
      
    >
      
      {/* <Stack.Screen name="Preload" component={Preload}/> */}
      <Stack.Screen name="Login" component={Login}/>
      {/* <Stack.Screen name="Home" component={DrawerRoutes}/> */}

      <Stack.Screen name="Cadastro" component={Cadastro}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetail}/>
      <Stack.Screen name="Pedido" component={Pedido}/>
      <Stack.Screen name="OrderCompleted" component={OrderCompleted}/>
      <Stack.Screen name="Carrinho" component={Carrinho}/>
      <Stack.Screen name="Conta" component={Conta}/>


      
    </Stack.Navigator>
      
  );
}

export default StackRoutes;