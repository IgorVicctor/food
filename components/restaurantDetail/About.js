import React from 'react';
import { View, Text, Image } from 'react-native';

export default function About(props) {
    
    const { id, nome, imagem, preco, revisao, avaliacao, categoria } =
        props.route.params;

    // const formatterdcategoria = categoria.map((cat) => cat.title).join( " • ");

    const description = `${categoria} ${
        preco ? " • " + preco : ""
        } • 🎫 • ${avaliacao} ⭐ (${revisao}+)`;

    return (
        <View>
            <RestaurantImage image={imagem} />
            <RestaurantName title={nome} />
            <RestaurantDescription description={description} />
        </View>
    );
}

const RestaurantImage = (props) => (
    <Image source={{uri: props.image}} style={{ width: "100%", height: 150 }}/>
)

const RestaurantName = (props) => (
    <Text
        style={{
            fontSize: 29,
            fontWeight: "600",
            marginTop: 10,
            marginHorizontal: 15
        }}
    >
        {props.title}
    </Text>
)

const RestaurantDescription = (props) => (
    <Text
        style={{
        marginTop:10,
        marginHorizontal: 15,
        fontWeight: "400",
        fontSize: 15.5
      }}
    >
        {props.description}
    </Text>
)