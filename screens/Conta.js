import {React, useState, useEffect} from "react";
import { View, TextInput, TouchableOpacity, Text, Keyboard, Pressable, Alert, ScrollView,  Image, StyleSheet, StatusBar } from "react-native";
// import firebase from "../../../config/firebaseconfig"
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import * as ImagePicker from 'expo-image-picker';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';  
import HeaderConta from "../components/home/HeaderConta";
import BottomTabs from "../components/home/BottomTabs";



export default function Conta({navigation, route }) {

    const { idUser } = route.params;

    return (
        <>
        <HeaderConta />

        <View style={styles.AndroidSafeArea}>

            
            {/* <ScrollView>

            <TouchableOpacity style={{marginTop: 50, marginLeft: 10}} onPress={() => navigation.openDrawer()}>
                <Icon  name="menu" size={45} color='#6558f5' />    
            </TouchableOpacity>

            <Pressable onPress={Keyboard.dismiss}>
            <View style={Container.InputArea}>

            <Image style={Container.avatar} source={{ uri: url ? url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzO5Fb637v1B6CAONSt4mGfckCw1gM8tHaJw&usqp=CAU' }}/>
            <TouchableOpacity onPress={pickImage}>
                <Text style={{fontSize: 12,paddingHorizontal: 3, borderWidth: 1, borderRadius: 5, textAlign:"center"}}>Atualizar foto</Text>
            </TouchableOpacity>  

                <View style={Container.InputLogin}>

                    <Text style={[Container.Texto, {marginTop: 10}]}>Nome</Text>
                    <TextInput style={Container.input} value={nome} onChangeText={(text) => setNome(text)}/>
                    
                    <Text style={Container.Texto}>Senha</Text>
                    <TextInput style={[Container.input, {padding: 6}]} secureTextEntry={true} type="text" value={password} placeholder={"Mínimo 6 caracteres"} onChangeText={value => {
                                        setErrorPassword(null)
                                        setPassword(value)
                                    }}
                                    errorMessage={errorPassword}  />

                    <Text style={Container.Texto}>Confirmar senha</Text>
                    <TextInput style={[Container.input, {padding: 6}]} placeholder={"Mínimo 6 caracteres"} secureTextEntry={true} 
                                    onChangeText={value => {

                                        setErrorCPassword(null)
                                        setCpass(value)
                                    }}
                                    errorMessage={errorCPassword}/>

                    <Text style={Container.Texto}>Cidade</Text>
                    <TextInput style={Container.input} value={cidade} onChangeText={(text) => setCidade(text)}/>

                    <Text style={Container.Texto}>Faculdade</Text>
                    <TextInput style={Container.input} value={faculdade} onChangeText={(text) => setFaculdade(text)}/>

                    <Text style={Container.Texto}>Curso</Text>
                    <TextInput style={Container.input} value={curso} onChangeText={(text) => setCurso(text)}/>

                    <Text style={Container.Texto}>Período</Text>
                    <TextInput style={Container.input} value={periodo} onChangeText={(text) => setPeriodo(text)}/>

                    <Text style={Container.Texto}>Dias de Uso:</Text>
                    <TextInput style={[Container.input, {marginBottom: 5, padding: 6}]} value={diasdeuso} placeholder={"Ex.: Seg/Qua/Sex"} onChangeText={(text) => setDiasDeUso(text)}/>

                    {errorRegister === true
                        ?
                        <View style={Container.contentAlert}>
                            <MaterialCommunityIcons 
                            name="alert-circle"
                            size={24}
                            color="red"
                            />
                            <Text style={Container.warningAlert}>Os dados inseridos estão incorretos</Text>
                        </View>
                        :
                        <View/>
                        }
                        { password === "" || nome === "" || cidade === "" || faculdade === "" || curso === "" || periodo === ""
                        ?
                            <TouchableOpacity
                            disabled={true}
                            style={Container.botao} 
                            >
                                <Text style={Container.botaoText}>Alterar</Text>
                            </TouchableOpacity>
                        :

                            <TouchableOpacity
                             style={Container.botao}
                              onPress={() => { validar(), updateUser()}}
                              >
                                <Text style={Container.botaoText}>Alterar</Text>
                            </TouchableOpacity>
                        }
                </View>           
            </View>
            </Pressable>
        </ScrollView> */}
    </View>
    <BottomTabs idUser={idUser} navigation={navigation}/>
    </>
    );
}

const styles = StyleSheet.create ({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }
})

const Container = StyleSheet.create(
    {
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
            margin: 25,
            alignItems: "center",
            
        },
        input:{
            top: 10,
            padding: 6,
            marginTop:1,
            width: 366,
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
            bottom: 15              
        },
        Texto:{
            top: 10,
            color:"#6558f5",
            fontSize:22,
            marginTop: 30,
            textAlign: 'auto',
            width: 365
        },
        botaoText:{
            color: "#FFF",
            fontSize: 18,
            fontWeight: 'bold'
        },
        botao:{
            backgroundColor: '#6558f5',
            width: 355,
            borderRadius: 6,
            paddingVertical: 8,
            marginTop: 18,
            justifyContent: 'center',
            alignItems: 'center'
        },
        textoCadastro:{
            justifyContent:"center",
            marginTop: 20,
            fontSize: 17,
            flexDirection: "row",     
        },
        LogoBuzz: {
            marginTop: 50,
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
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        warningAlert:{
            paddingLeft: 10,
            color: "red",
            fontSize: 16
        },
        avatar: {
            width: 130,
            height: 130,
            borderRadius: 63,
            borderWidth: 1,
            borderColor: "#6558f5",
            bottom: 20,
          },
          touchMenu:{
            marginTop:40,
            backgroundColor:'#6558f5',
            width:50,
            height:50,
            zIndex:999
          },
    }
)