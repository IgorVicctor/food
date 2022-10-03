import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import MenuItems from "../components/restaurantDetail/MenuItems";
import firebase from '../firebase'

export default function OrderCompleted(){

    const [lastOrder, setLastOrder] = useState({
        items: [
            {
                title: "Lasagna",
                description: "With butter lettuce, tomato and sauce bechamel",
                price: "$13.50",
                image:
                  "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
            },
        ],
    });
    const {items, restaurantName} = useSelector((state) => state.cartReducer.selectedItems);

    const total = items
        .map((item) => Number(item.price.replace("$", "")))
        .reduce((prev, curr) => prev + curr, 0);

    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    useEffect(() => {
        const db = firebase.firestore();
        const unsubscribe = db
          .collection("orders")
          .orderBy("createdAt", "desc")
          .limit(1)
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
              setLastOrder(doc.data());
            });
          });
    
        return () => unsubscribe();
      }, []);

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={{
                margin: 15,
                alignItems: "center",
                height: "100%"
            }}>
                <LottieView
                    style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
                    source={require('../assets/animations/check-mark.json')}
                    autoPlay
                    speed={0.5}
                    loop={false}       
                />
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your order at {restaurantName} has been placed for ${totalUSD}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MenuItems foods={lastOrder.items} hideCheckBox={true} />
                    <LottieView
                        style={{ height: 200, alignSelf: "center" }}
                        source={require('../assets/animations/cooking.json')}
                        autoPlay
                        speed={0.5}      
                    />
                </ScrollView>
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