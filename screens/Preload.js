import React, { useEffect } from "react";
import {Text, View, ActivityIndicator, StyleSheet, StatusBar} from 'react-native';
import LottieView from "lottie-react-native";

// import Onibus from '../../img/Onibus.svg';

export default function Preload ({navigation}) {

    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{name: "Login"}]
            })
        }, 1500)
    }, [])
      
return (
    <View style = {Container.Container}>
        {/* <Onibus width="100%" height="175" /> */}
            <View>
                <LottieView
                    style={{ height: 150}}
                    source={require('../assets/animations/cooking.json')}
                    autoPlay
                    backgroundColor={'blacks'}
                    speed={1}      
                />
            </View>
        {/* <Text style={Container.Texto}>Food</Text>
        <ActivityIndicator size={40} color={"#ed2d2d"}/> */}
     </View>
    );
}



const Container = StyleSheet.create ({
    Container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center"  
                
    },
    Texto:{
        color:"#ed2d2d",
        fontSize:50,
        padding:20
    }
})