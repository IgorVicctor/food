import React, { useState ,useEffect } from "react";
import { View, SafeAreaView, StyleSheet, StatusBar, ScrollView, BackHandler, Alert  } from "react-native";
// import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderCarrinho"
import RestaurantItems, { localRestaurants } from "../components/home/RestaurantItems";
import SearchBar from "../components/home/SearchBar"
import firebase from "../firebase"



export default function Home({ navigation, route }) {

    const database = firebase.firestore()  

    const[list, setList] = useState([])
    const[dados, setDados] = useState([])

    const idUser = route.params.idUser;

    useEffect(() => {
        fetch('https://food-apifepi.herokuapp.com/menu/', {
          method: 'GET',
          headers: {
            'Accept':'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(idUser)
          setList(data)
        })
      }, [])

      useEffect(() => {
        const backAction = () => {
          Alert.alert("Espere!", "Você tem certeza que quer sair?", [
            {
              text: "Cancelar",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Sim", onPress: () => navigation.goBack() }
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

      // useEffect(() => {
      //   database.collection("Restaurantes").onSnapshot((query) => {
      //     const list1 = [];
      //     query.forEach((doc) => {
      //       list1.push({ ...doc.data(), id: doc.id });
      //     }); 
      //     setDados(list1);
      //     // console.log(list1)
      //   });
      // }, [])

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={{backgroundColor: "white", padding: 15}}>
                {/* <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/> */}
                {/* <SearchBar cityHandler={setCity}/> */}
                <SearchBar/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories />
                <RestaurantItems idUser={idUser} restaurantData={list} navigation={navigation}/>
                {/* <RestaurantItems idUser={idUser} restaurantData={dados} navigation={navigation}/> */}
            </ScrollView>
            {/* <Divider width={1} /> */}
            <BottomTabs idUser={idUser} navigation={navigation}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#eee",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }
})
