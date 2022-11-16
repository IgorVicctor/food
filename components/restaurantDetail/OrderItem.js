import React from "react";
import { View, Text } from "react-native";

export default function OrderItem({item}){
    const { title, price } = item;
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // paddingTop: 20,
            paddingVertical: 20,
            borderBottomWidth: 2,
            borderBottomColor: "#999"
        }}>
            <Text style={{ fontWeight: "600", fontSize: 18}}>{title}</Text>
            <Text style={{ opacity: 0.7, fontSize: 18}}>{price}</Text>
        </View>
    );
}