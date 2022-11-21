import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import MenuItems from "../components/restaurantDetail/MenuItems";
import firebase from '../firebase'

export default function OrderCompleted({route}){
    const database = firebase.firestore() 

    const[list, setList] = useState([])

    const [lastOrder, setLastOrder] = useState({
        items: [],
    });

    const {items, restaurantName} = useSelector((state) => state.cartReducer.selectedItems);

    const total = items
        .map((item) => Number(item.price.replace("R$", "")))
        .reduce((prev, curr) => prev + curr, 0);

    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    // useEffect(() => {
    //     database
    //         .collection("Pedidos")
    //         .doc("hybGrRxzZve7pIbtPz1gLEgfCj03")
    //         .get()
    //         .then((doc) => {
    //         const list1 = [];
    //         querySnapshot.forEach(doc => {
    //           list1.push({ ...doc.data(), id: doc.id });
    //         });
    //         setLastOrder(doc.data());
    //     });
    // }, []);

    useEffect(() => {
        setList(items)
    }, [])

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={{
                margin: 15,
                alignItems: "center",
                height: "100%"
            }}>
                <LottieView
                    style={{ height: 100, alignSelf: "center", marginBottom: 15 }}
                    source={require('../assets/animations/check-mark.json')}
                    autoPlay
                    speed={0.5}
                    loop={false}       
                />
                <View style={{width: "100%"}}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 40, textAlign: 'center' }}>Seu pedido no {restaurantName} foi finalizado por R${totalUSD}!</Text>
                </View>
                <View style={{height: 400}}>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    <MenuItems foods={list} hideCheckBox={true} />
                {/* </ScrollView> */}
                </View>
                <View style={{position: "absolute", bottom: 45}}>
                    <LottieView
                        style={{ height: 180, alignSelf: "center"}}
                        source={require('../assets/animations/cooking.json')}
                        autoPlay
                        backgroundColor={'blacks'}
                        speed={1}      
                    />
              </View>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create ({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }
})