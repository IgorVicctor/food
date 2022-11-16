import React from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SearchBar({ cityHandler }) {
  return (
    <View style={{  flexDirection: "row" }}>
      <GooglePlacesAutocomplete
        // query={{ key: "AIzaSyBCG_yv_UtBmPWm4fXxX6pjrj6xm949FcM" }}
        // onPress={(data, details = null) => {
        //   console.log(data.description);
        //   const city = data.description.split(",")[0];
        //   cityHandler(city);
        // }}
        placeholder="Pesquisar"
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            margin: 5
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        renderRightButton={() => (
          <View style={{ marginRight: 15}}>
            <Ionicons name="search" color={100} size={27} />
          </View>
        )}
        // renderRightButton={() => (
        //   <View
        //     style={{
        //       flexDirection: "row",
        //       marginRight: 8,
        //       backgroundColor: "white",
        //       padding: 9,
        //       borderRadius: 30,
        //       alignItems: "center",
        //     }}
        //   >
        //     <AntDesign
        //       name="clockcircle"
        //       size={11}
        //       style={{ marginRight: 6 }}
        //     />
        //     <Text>Search</Text>
        //   </View>
        // )}
      />
    </View>
  );
}
