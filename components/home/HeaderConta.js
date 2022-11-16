import React, { useState } from "react";
import { View, Text } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


export default function HeaderConta() {
  return (
    <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 33, padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{fontSize: 25, color: "black", fontWeight: "bold"}}>CONTA</Text>
      {/* <FontAwesome5
            name={"shopping-bag"}
            size={24}
            style={{
              marginBottom: 5,
              marginLeft: 10,
              alignSelf: "center",
            }}
          /> */}
    </View>
  );
}

