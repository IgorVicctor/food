import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import About from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';
import ViewCart from '../components/restaurantDetail/ViewCart';
import firebase from "../firebase"


export default function RestaurantDetail({ route, navigation }) {

  const database = firebase.firestore() 

  const[list, setList] = useState([])

  useEffect(() => {
    fetch(`https://food-apifepi.herokuapp.com/item/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Accept':'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setList(data)
    });
  }, [])

  // useEffect(() => {
  //   database
  //     .collection("Orders")
  //     .doc("Items")
  //     .collection(route.params.id)
  //     .get()
  //     .then((querySnapshot) => {
  //       const list1 = [];
  //       querySnapshot.forEach(doc => {
  //         list1.push({ ...doc.data(), id: doc.id });
  //       });
  //       setList(list1);
  //     });
  // }, []);

    return(
        <View>
            <About route={route} />
            <View
                style={{
                    marginTop: 25,
                    marginBottom: 15,
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.5,
                }}
            />

            <MenuItems restaurantName={route.params.nome} foods={list}/>
            <ViewCart idUser={route.params.idUser} navigation={navigation} />
        </View>
    );
}