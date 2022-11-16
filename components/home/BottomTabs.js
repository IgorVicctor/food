import React from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabs({ navigation, idUser }) {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      
    <TouchableOpacity onPress={() => navigation.navigate("Home", { idUser: idUser })}>
        <View>
          <FontAwesome5
            name={"home"}
            size={25}
            style={{
              marginBottom: 3,
              alignSelf: "center",
            }}
          />
          <Text>{"Home"}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity  onPress={() => Keyboard}>
        <View>
          <FontAwesome5
            name={"search"}
            size={25}
            style={{
              marginBottom: 3,
              alignSelf: "center",
            }}
          />
          <Text>Pesquisar</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Carrinho", { idUser: idUser })}>
        <View>
          <FontAwesome5
            name={"shopping-bag"}
            size={25}
            style={{
              marginBottom: 3,
              alignSelf: "center",
            }}
          />
          <Text>Carrinho</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Pedido", { idUser: idUser })}>
        <View>
          <FontAwesome5
            name={"receipt"}
            size={25}
            style={{
              marginBottom: 3,
              alignSelf: "center",
            }}
          />
          <Text>Pedidos</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Conta", { idUser: idUser })}>
        <View>
          <FontAwesome5
            name={"user"}
            size={25}
            style={{
              marginBottom: 3,
              alignSelf: "center",
            }}
          />
          <Text>Conta</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}