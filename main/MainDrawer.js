import React from 'react'
import { View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import firebase from "./config/firebaseconfig"

import Home from '../screens/Home';
import RestaurantDetail from '../screens/RestaurantDetail';

const Draweer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <PaperProvider>
      <Draweer.Navigator 
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
      
        headerShown: false,
      }}
       initialRouteName="Home" >

        <Draweer.Screen name='Home ' component={Home} options={{swipeEnabled: false, unmountOnBlur: true}}/>
        <Draweer.Screen name='RestaurantDetail'  component={RestaurantDetail} options={{swipeEnabled: false, unmountOnBlur: true}}/> 
        {/* <Draweer.Screen name='Alterar Dados'  component={AlterarDados} options={{swipeEnabled: false}}/>  */}
      </Draweer.Navigator>
      </PaperProvider>   
  );
}
export default DrawerRoutes;

// function CustomDrawerContent(props) {
//   return (
//     <View style={{flex: 1}} >
//       <DrawerContentScrollView {...props}  >
//       <Drawer.Section style={{flex: 1, marginTop: 15, }}>
//         <DrawerItemList {...props} />
//       </Drawer.Section>

//       </DrawerContentScrollView>

//       {/* <Drawer.Section style={{marginBottom: 15, borderTopColor: '#f4f4f4', borderTopWidth: 1}}>   
//         <DrawerItem        
//             label="Sair"
//             icon={() => (
//               <Icon name="exit-to-app" size={35} color='#6558f5'/>
//             )}
//             onPress={() => {
//               firebase.auth().signOut().then(() => {       
//                 props.navigation.reset({
//                   index: 0,
//                   routes: [{ name: "Login" }]
//               })
//               }).catch((error) => {
//                 // An error happened.
//               });;
//             }}
//           />
//       </Drawer.Section>   */}
//      </View>
//   );
// }