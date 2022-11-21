import {React, useState, useEffect} from "react";
import { View, TextInput, TouchableOpacity, Text, Keyboard, Pressable, Alert, ScrollView,  Image, StyleSheet, StatusBar } from "react-native";
// import firebase from "../../../config/firebaseconfig"
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import * as ImagePicker from 'expo-image-picker';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';  
import HeaderPedido from "../components/home/HeaderPedido";
import BottomTabs from "../components/home/BottomTabs";

export default function Pedido({navigation, route}) {

    const [list, setList] = useState([]);
    const { idUser } = route.params;

    useEffect(() => {
        fetch(`https://food-apifepi.herokuapp.com/pedido/${idUser}`, {
            method: 'GET',
            headers: {
            'Accept':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            setList(data)
        })
    }, [])

    return (
        <>
        <HeaderPedido />
        <View style={styles.AndroidSafeArea}>

        {list.map((food, index) => (
            // console.log(food.alltestes[0][0])
        <View key={index}>
          <View style={styles.menuItemStyle}>

              <FoodInfo food={food.alltestes} />
              <FoodImage food={food.alltestes} />
              <Text>{food.valor}</Text>
          </View>
          <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.2,
                }}
            />
        </View>
      ))}
        {/* <View style={{
                margin: 15,
                alignItems: "center",
                height: "100%"
            }}> */}
                {/* <LottieView
                    style={{ height: 100, alignSelf: "center", marginBottom: 15 }}
                    source={require('../assets/animations/check-mark.json')}
                    autoPlay
                    speed={0.5}
                    loop={false}       
                /> */}
                {/* <View style={{width: "100%"}}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 40, textAlign: 'center' }}>Seu pedido no {restaurantName} foi finalizado por R${totalUSD}!</Text>
                </View> */}
                {/* <View style={{height: 400}}> */}
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    {/* <MenuItems foods={lastOrder.items} hideCheckBox={true} /> */}
                {/* </ScrollView> */}
                {/* </View>
          */}
                {/* <View style={{position: "absolute", bottom: 45}}>
                    <LottieView
                        style={{ height: 180, alignSelf: "center"}}
                        source={require('../assets/animations/cooking.json')}
                        autoPlay
                        backgroundColor={'blacks'}
                        speed={1}      
                    />
                </View> */}
            </View>
        <BottomTabs idUser={idUser} navigation={navigation}/>
    </>
    );
}

const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-evenly"}}>
        <Text style={styles.titleStyle}>{props.food[0][0]}</Text>
        <Text style={{fontSize: 14}}>{props.food[0][2]}</Text>
        <Text style={{fontSize: 13}}>Valor: {props.food[0][1]}</Text>
    </View>
)

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food[0][3] }}
      style={{ 
        width: 65,
        height: 65,
        borderRadius: 8,
        marginLeft: marginLeft
      }}
    />
  </View>
);
const styles = StyleSheet.create ({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    menuItemStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 7,
        marginLeft: 10
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: "600"
    }
})