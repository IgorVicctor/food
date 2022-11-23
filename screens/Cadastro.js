import {React, useState, useEffect} from "react";
// import { Container } from './style';
import { View, TextInput, TouchableOpacity, Text, Keyboard, Pressable, Alert, ScrollView, KeyboardAvoidingView, StyleSheet } from "react-native";
import firebase from "../firebase"
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Cadastro({navigation}) {

    const database = firebase.firestore()  

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [cpass, setCpass] = useState(null)
    const[errorRegister, setErrorRegister] = useState("")
    const[nome, setNome] = useState("");
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorCPassword, setErrorCPassword] = useState(null)

    const [list, setList] = useState("")

    const cadastrar = () => {
        fetch('https://food-apifepi.herokuapp.com/cadastro/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },   
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: password
            })
        })
        
        Alert.alert("Atenção", "O cadastro foi realizado com sucesso!")
    }

    const validar = () => {
        let error = false
        // setErrorNome(null)
        setErrorEmail(null)
        setErrorPassword(null)
        setErrorCPassword(null)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(email).toLowerCase())) {
            setErrorEmail("Preencha o email corretamente")
            error = true
        }

        if (password < 6) {
            Alert.alert("Atenção", "Preencha com uma senha válida")
            return false;
        } 
        
        if (password != cpass) {
            Alert.alert("Atenção", "As senhas nao coincidem, tente novamente")
            return false;
        }
        
        return !error
    }


    const registerUser = () =>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                database.collection("Usuarios").doc(user.uid).set({
                    nome: nome,
                    email: email,
                    password: password
                  })
                
                navigation.navigate("Home", { idUser: user.uid })
            })
            .catch((error) => {
                setErrorRegister(true)
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    }


    const clicouLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        })
    }

    return (
        <View style={Container.MainContainer}>
            <ScrollView>
            <Pressable onPress={Keyboard.dismiss}>
            <View style={Container.InputArea}>              
                <View style={Container.InputLogin}>

                    <Text style={Container.Texto}>Nome</Text>
                    <TextInput style={Container.input} value={nome} onChangeText={(text) => setNome(text)}/>

                    <Text style={Container.Texto}>Email</Text>
                    <TextInput style={Container.input} type="text" value={email} onChangeText={value => {
                                        // setErrorNome(null)
                                        setEmail(value)

                                    }}
                                    errorMessage={errorEmail}
                                    />

                    <Text style={Container.Texto}>Senha</Text>
                    <TextInput style={Container.input} secureTextEntry={true} type="text" value={password} placeholder={"Mínimo 6 caracteres"} onChangeText={value => {
                                        setErrorPassword(null)
                                        setPassword(value)
                                    }}
                                    errorMessage={errorPassword}  />

                    <Text style={Container.Texto}>Confirmar senha</Text>
                    <TextInput style={Container.input} placeholder={"Mínimo 6 caracteres"} secureTextEntry={true} 
                                    onChangeText={value => {

                                        setErrorCPassword(null)
                                        setCpass(value)
                                    }}
                                    errorMessage={errorCPassword}/> 

                    {errorRegister === true
                        ?
                        <View style={Container.contentAlert}>
                            {/* <MaterialCommunityIcons 
                            name="alert-circle"
                            size={24}
                            color="red"
                            /> */}
                            <Text style={Container.warningAlert}>Os dados inseridos estão incorretos</Text>
                        </View>
                        :
                        <View/>
                        }
                        { email === "" || password === "" || nome === ""
                        ?
                            <TouchableOpacity
                            disabled={true}
                            style={Container.botao}
                            >
                                <Text style={Container.botaoText}>Cadastrar</Text>
                            </TouchableOpacity>
                        :

                            <TouchableOpacity
                             style={Container.botao}
                            onPress={() =>{  validar(), cadastrar() }}
                            //   onPress={() =>{  validar(), registerUser() }}
                              >
                                <Text style={Container.botaoText}>Cadastrar</Text>
                            </TouchableOpacity>

                        }

                    <TouchableOpacity style={Container.textoCadastro} onPress={() => {clicouLogin()}}>
                        <Text style={Container.textoCadastro}>Já possui uma conta? Faça login</Text>
                    </TouchableOpacity>

                </View>           
            </View>
            </Pressable>
        </ScrollView>
    </View>
    );
}

const Container = StyleSheet.create({ //Tela de fundo
    MainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    check:{
        width: "80%",
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10
    },
    TextoTitulo:{
        fontSize: 33,
        marginTop: 80,
        marginBottom: 40,
        color:"#6558f5",
    },
    InputArea: {
        flex: 1,
        marginTop: 50,
        alignItems: "center",
        
    },
    input:{
        top: 10,
        padding: 5,
        marginTop:1,
        width: 355,
        height: 35,
        borderColor: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        margin: "-4%",
        borderBottomWidth: 1,
        fontSize: 16,       
      },
    InputLogin:{
        alignItems: "center",            
    },
    Texto:{
        top: 10,
        color:"#ed5c5c",
        fontSize:21,
        marginTop: 20,
        textAlign: 'center',
        fontFamily: 'sans-serif-light',
        width: 355,
        borderRadius: 8,
        paddingVertical: 6
    },
    botaoText:{
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold'
    },
    botao:{
        backgroundColor: '#ed5c5c',
        width: 355,
        borderRadius: 6,
        paddingVertical: 8,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCadastro:{
        marginTop: 14,
        alignSelf: 'center' 
    },
    textoCadastro:{
        marginTop: 5,
        color: "#a1a1a1"
    },
    
    contentAlert:{
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    warningAlert:{
        paddingLeft: 10,
        color: "red",
        fontSize: 16
    }
}
)