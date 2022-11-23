import React from "react";
import { View, Text } from "react-native";

export default function HeaderPedido() {
  return (
    <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 33, padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{fontSize: 25, color: "black", fontWeight: "bold"}}>PEDIDO</Text>
    </View>
  );
}

