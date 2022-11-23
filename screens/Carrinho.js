import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../components/restaurantDetail/OrderItem";
import firebase from "../firebase";
import LottieView from "lottie-react-native";
import BottomTabs from "../components/home/BottomTabs";
import HeaderCarrinho from "../components/home/HeaderCarrinho";
import HeaderConta from "../components/home/HeaderConta";


export default function Carrinho({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const { idUser } = route.params;
    
    const {items, restaurantName} = useSelector(
        (state) => state.cartReducer.selectedItems
    );

    const total = items
    .map((item) => Number(item.price.replace("R$", "")))
    .reduce((prev, curr) => prev + curr, 0);

    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    const addOrderToFireBase = () => {
        setLoading(true);
        const db = firebase.firestore();
        db.collection("Pedidos").doc(idUser)
          .set({
            items: items,
            restaurantName: restaurantName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          }).then(() => {
            setTimeout(() => {
                setLoading(false);
                navigation.navigate("OrderCompleted");
            }, 1000);
          });
      };

      const addOrder = () => {
        setLoading(true);
            if (items[0] && !items[1]){
            fetch('https://food-apifepi.herokuapp.com/pedido/', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },  
                body: JSON.stringify({
                    subid: idUser,
                    nome: restaurantName,
                    valor: totalUSD,
                    data: "10/11/2022",
                    itens: [
                        [
                            items[0].title,
                            items[0].price,
                            items[0].description,
                            items[0].image
                        ],
                    ]  
                })
            }).then(() => {
                setTimeout(() => {
                    setLoading(false);
                    navigation.navigate("OrderCompleted", {idUser: idUser});
                }, 1000);
            });             
            }else{
                if(items[0] && items[1] && !items[2]){
                fetch('https://food-apifepi.herokuapp.com/pedido/', {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },  
                    body: JSON.stringify({
                        subid: idUser,
                        nome: restaurantName,
                        valor: totalUSD,
                        data: "10/11/2022",
                        itens: [
                            [
                                items[0].title,
                                items[0].price,
                                items[0].description,
                                items[0].image
                            ],
                            [
                                items[1].title,
                                items[1].price,
                                items[1].description,
                                items[1].image
                            ],                 
                        ]              
                    })
                }).then(() => {
                    setTimeout(() => {
                        setLoading(false);
                        navigation.navigate("OrderCompleted", {idUser: idUser});
                    }, 1000);
                }); 
                }else{
                    if(items[0] && items[1] && items[2] && !items[3]){
                    fetch('https://food-apifepi.herokuapp.com/pedido/', {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json'
                        },  
                        body: JSON.stringify({
                            subid: idUser,
                            nome: restaurantName,
                            valor: totalUSD,
                            data: "10/11/2022",
                            itens: [
                                [
                                    items[0].title,
                                    items[0].price,
                                    items[0].description,
                                    items[0].image
                                ],
                                [
                                    items[1].title,
                                    items[1].price,
                                    items[1].description,
                                    items[1].image
                                ],
                                [
                                    items[2].title,
                                    items[2].price,
                                    items[2].description,
                                    items[2].image
                                ],
                            ]        
                        })
                    }).then(() => {
                        setTimeout(() => {
                            setLoading(false);
                            navigation.navigate("OrderCompleted", {idUser: idUser});
                        }, 1000);
                    }); 
                    }else{
                        if(items[0] && items[1] && items[2] && items[3] && !items[4]){
                        fetch('https://food-apifepi.herokuapp.com/pedido/', {
                            method: 'POST',
                            headers: {
                                'Content-Type':'application/json'
                            },  
                            body: JSON.stringify({
                                subid: idUser,
                                nome: restaurantName,
                                valor: totalUSD,
                                data: "10/11/2022",
                                itens: [
                                    [
                                        items[0].title,
                                        items[0].price,
                                        items[0].description,
                                        items[0].image
                                    ],
                                    [
                                        items[1].title,
                                        items[1].price,
                                        items[1].description,
                                        items[1].image
                                    ],
                                    [
                                        items[2].title,
                                        items[2].price,
                                        items[2].description,
                                        items[2].image
                                    ],
                                    [
                                        items[3].title,
                                        items[3].price,
                                        items[3].description,
                                        items[3].image
                                    ],
                                ]        
                            })
                        }).then(() => {
                            setTimeout(() => {
                                setLoading(false);
                                navigation.navigate("OrderCompleted", {idUser: idUser});
                            }, 1000);
                        }); 
                    }else{
                        if(items[0] && items[1] && items[2] && items[3] && items[4] && !items[5]){
                        fetch('https://food-apifepi.herokuapp.com/pedido/', {
                            method: 'POST',
                            headers: {
                                'Content-Type':'application/json'
                            },  
                            body: JSON.stringify({
                                subid: idUser,
                                nome: restaurantName,
                                valor: totalUSD,
                                itens: [
                                    [
                                        items[0].title,
                                        items[0].price,
                                        items[0].description,
                                        items[0].image
                                    ],
                                    [
                                        items[1].title,
                                        items[1].price,
                                        items[1].description,
                                        items[1].image
                                    ],
                                    [
                                        items[2].title,
                                        items[2].price,
                                        items[2].description,
                                        items[2].image
                                    ],
                                    [
                                        items[3].title,
                                        items[3].price,
                                        items[3].description,
                                        items[3].image
                                    ],
                                    [
                                        items[4].title,
                                        items[4].price,
                                        items[4].description,
                                        items[4].image
                                    ],
                                    
                                ]        
                            })
                        }).then(() => {
                            setTimeout(() => {
                                setLoading(false);
                                navigation.navigate("OrderCompleted", {idUser: idUser});
                            }, 1000);
                        }); 
                    }}}
                }
            }  
        };

    return (
        <>
        <HeaderCarrinho/>
            {total == 0 ? (
                <View style={styles.modalContainer}>
                    <Text style={styles.restaurantName}>O carrinho está vazio!</Text>
                </View>
            ) : (
            <View style={styles.modalContainer}>
            {/* <ScrollView> */}
                <View style={styles.modalCheckoutContainer}>
                    {/* <Text style={styles.restaurantName}>{restaurantName}</Text> */}
                    {items.map((item, index) => (
                        <OrderItem key={index} item={item} />
                    ))}
                    <View style={styles.subTotalContainer}>
                        <Text style={styles.subTotalText}>Total</Text>
                        <Text style={{fontSize: 20}}>R${totalUSD}</Text>
                    </View>
                    <View style={{ position: 'absolute', top: 500, left: 47 }}>
                        <TouchableOpacity style={{
                            marginTop: 20,
                            backgroundColor: "black",
                            alignItems: "center",
                            padding: 12,
                            borderRadius: 15,
                            width: 300,
                            position: "relative" 
                        }}
                        onPress={() => {
                            addOrder();
                            // addOrderToFireBase();
                        }}
                        >
                            <Text style={{ color: "white", fontSize: 25}}>Finalizar</Text>
                            <Text 
                                style={{ 
                                    position: "absolute",
                                    right: 20,
                                    color: "white",
                                    fontSize: 15,
                                    top: 16 
                                }}
                            >
                                {/* R${total ? totalUSD : ""} */}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </ScrollView> */}
            </View>
        )}
            <BottomTabs idUser={idUser} navigation={navigation}/>
            {/* <BottomTabs  navigation={navigation}/> */}

        
            {total ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        position: "absolute",
                        bottom: 60,
                        zIndex: 999,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            width: "100%"
                        }}
                    >
                    </View>

                </View>
                ) : (
                    <></>
                )}
                {loading? <View
                    style={{
                        backgroundColor: "black",
                        position: "absolute",
                        opacity: 0.6,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%"
                    }}
                >
                    <LottieView
                        style={{ height: 200 }}    
                        source={require('../assets/animations/scanner.json')}
                        autoPlay
                        speed={3}
                    />
                </View> : <></>}
                </>    
            );
        }

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white"
    },

    modalCheckoutContainer: {
        backgroundColor: "white",
        padding: 16,
        height: "90%",
        borderWitdh: 1
    },

    restaurantName: {
        textAlign: "center",
        // fontWeight: "600",
        fontSize: 20,
    },

    subTotalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 50
    },

    subTotalText: {
        textAlign: "left",
        fontWeight: "600",
        fontSize: 20,
    },  
})