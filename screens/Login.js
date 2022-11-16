import {React, useState, useEffect} from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, BackHandler } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../firebase";
 
export default function Login ({ navigation }) {

    const database = firebase.firestore()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState("")
    const [list, setList] = useState("")

    useEffect(() => {
        fetch('https://food-apifepi.herokuapp.com/usuarios/', {
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

    const verificaLogin = () => {
        list.map((item) => {
            if(email == item.email){
                if(password == item.senha){
                    navigation.navigate("Home", { idUser: item.id });
                }
            }else{
                setErrorLogin(true)
                // let errorCode = error.code;
                // let errorMessage = error.message;
            }
        })
    
    }
    const loginFirebase = ()=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {

                let user = userCredential.user;
                let uid = user.uid;         
                    database
                        .collection("Usuarios")
                        .doc(uid)
                        .get()
                        .then((teste) => {
                        if(teste.exists){   
                            navigation.navigate("Home", { idUser: user.uid })
                            
                        }    
                    })
                 
            })
            .catch((error) => {
                setErrorLogin(true)
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    }
    
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {     
                let uid = user.uid;      
                database
                        .collection("Usuarios")
                        .doc(uid)
                        .get()
                        .then((teste) => {
                        if(teste.exists){   
                            navigation.navigate("Home", { idUser: user.uid })
                            
                        }    
                    }) 
                } 
          });      
    }, []);

    return (
        <View style={Container.container}>           
            <View style={Container.containerHeader}>
                <Text style={Container.message}>Bem-vindo(a)</Text>
            </View>   
                
            <View style={Container.containerForm}>
            <Text style={Container.title}>Email</Text>
                <TextInput
                    placeholder='Digite seu email'
                    style={Container.input}
                    value={email}
                    type="text"
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={Container.title}>Senha</Text>
                <TextInput
                    placeholder='Digite sua senha'
                    style={Container.input}
                    type="text"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                {errorLogin === true
                ?
                <View style={Container.contentAlert}>
                    {/* <MaterialCommunityIcons 
                    name="alert-circle"
                    size={24}
                    color="red"
                    /> */}
                    <Text style={Container.warningAlert}>E-mail ou senha incorreto</Text>
                </View>
                :
                <View/>
                }
                { email === "" || password === "" 
                ?
                    <TouchableOpacity
                    disabled={true}
                    style={Container.button} 
                    >
                        <Text style={Container.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                :

                    <TouchableOpacity
                    style={Container.button}
                    onPress={verificaLogin}   
                    // onPress={loginFirebase}   
                    >
                        <Text style={Container.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity style={Container.buttonRegister} onPress={()=> navigation.navigate("Cadastro")}>
                    <Text style={Container.registerText}>Não possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>               
            </View>
        </View>
    );
}

const Container = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#6558f5'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title:{
        color: "#000",
        fontSize: 23,
        marginTop: 28
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16,
        padding: 5
    },
    button:{ 
        backgroundColor: '#6558f5',
        width: "100%",
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister:{
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText:{
        color: "#a1a1a1"
    },
    LogoBuzz: {
        marginTop: 230,
        height: 80,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",      
    },
    TextoLogo: {
        color: "#6558f5",
        fontSize: 45,
        flexDirection: "row",
    },
    contentAlert:{
        marginTop: 7,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    warningAlert:{
        paddingLeft: 10,
        color: "red",
        fontSize: 16
    }
})