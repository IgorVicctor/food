import {React, useState, useEffect, useRef} from "react";
import { View, TouchableOpacity, Text, ScrollView,  Image, StyleSheet, StatusBar, Modal, Animated  } from "react-native";
import HeaderPedido from "../components/home/HeaderPedido";
import BottomTabs from "../components/home/BottomTabs";
// import firebase from "../../../config/firebaseconfig"

const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if(visible){
        setShowModal(true);
        Animated.spring(scaleValue,{
          toValue:1,
          duration: 300,
          useNativeDriver: true
        }).start();
      } else {
          setTimeout(() => setShowModal(false), 200);
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          }).start();
      }
    };

    
    return (
        <Modal transparent visible={showModal}>
          <View style={styles.modalBackGround}>
            <Animated.View style={[styles.modalContainer,{transform:[{scale:scaleValue}]}]}>
                {children}
            </Animated.View>
          </View>
        </Modal>
        )
    };

export default function Pedido({navigation, route}) {

    const [list, setList] = useState([]);
    const [idItem, setIdItem] = useState([]);
    const [visible, setVisible] = useState(false);
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
            setList(data)
        })
    }, [])

    function info(item) {     
        fetch(`https://food-apifepi.herokuapp.com/pedido/${idUser}/${item}`, {
            method: 'GET',
            headers: {
            'Accept':'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setIdItem(data[0].itens)
        })
    } 

    return (
        <>
        <HeaderPedido />
        <View style={styles.AndroidSafeArea}>
            {list.map((food, index) => (
                <View key={index}>
                    <TouchableOpacity onPress={() => {info(food.id), setVisible(true)}}>
                <View style={styles.menuItemStyle}>
                    <FoodInfo food={food} />
                </View>
                <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.2,
                        }}
                    />
                    </TouchableOpacity>
                </View>
            ))}

            <ModalPoup visible={visible}> 
                <View style={{alignItems: 'center'}}>
                <View style={styles.header}>
                    <TouchableOpacity style={{bottom: 275, left: 10}} onPress={() => setVisible(false)}>
                    <Image
                        source={require('../assets/images/x.png')} 
                        style={{height: 40, width: 40}}
                        />
                    </TouchableOpacity>  
                    </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', bottom: 583}}>ITENS</Text>
                </View> 
                <View style={{bottom: 550}}>
                <ScrollView style={{height: 250}} showsVerticalScrollIndicator={false}>

                    {idItem.map((food, index) => (
                        <View key={index}>
                            <View style={styles.menuItemStyle}>

                                <FoodInfo2 food={food} />
                                <FoodImage food={food} />

                                
                            </View>
                            <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 0.2,
                            }}
                        />
                        </View>
                    ))} 

                </ScrollView>
                </View>
         
            </ModalPoup>
        </View>
        <BottomTabs idUser={idUser} navigation={navigation}/>
    </>
    );
}

const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-evenly", marginBottom: 10}}>
        <Text style={{fontSize: 13}}>Nome: Restaurante do Zé</Text>
        <Text style={{fontSize: 13}}>Valor: {props.food.valor}</Text>
        <Text style={{fontSize: 13}}>Data: 15/11/2022</Text>
    </View>
)

const FoodInfo2 = (props) => (
    <View>
        <Text style={{fontSize: 14}}>{props.food[0]}</Text>
        <Text style={{ marginTop: 5 ,fontSize: 14}}>{props.food[1]}</Text>
    </View>
)

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food[3] }}
      style={{ 
        width: 50,
        height: 50,
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
        paddingTop: 10,
    },
    menuItemStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 8,
        marginLeft: 10
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: "600"
    },
    name:{
        fontSize:18,
        flex:1,
        alignSelf:'center',
        color:"#008080",
        fontWeight:'bold'
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        width: '80%',
        height: 350,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    }, 
    header: {
        bottom: 10,
        width: '100%',
        height: 570,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },       
})
