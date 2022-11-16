import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';

export default function MenuItems({ 
    restaurantName,
    foods,
    hideCheckBox,
    marginLeft
 }) {
    const dispatch = useDispatch();

    const selectItem = (item, checkBoxValue) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ... item,
        restaurantName: restaurantName,
        checkBoxValue: checkBoxValue 
      },
    });

    const cartItems = useSelector(
      (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title == food.title));

  return(
    <ScrollView style={{height: "70%"}} showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
          {hideCheckBox ? (
              <></>
            ) : (
              <BouncyCheckbox
                iconStyle={{ borderColor: "lightgray", }}
                fillColor="black"
                isChecked={isFoodInCart(food, cartItems)}
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
              />
            )}
              <FoodInfo food={food} />
              <FoodImage food={food} marginLeft={marginLeft ? marginLeft: 0}/>
          </View>
          <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.2,
                }}
            />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-evenly"}}>
        <Text style={styles.titleStyle}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>
    </View>
)

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{ 
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: marginLeft
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  menuItemStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 7,
      marginLeft: 10
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "600"
  }
})