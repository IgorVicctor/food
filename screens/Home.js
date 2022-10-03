import React, { useState ,useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar, ScrollView } from "react-native";
// import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs"
import RestaurantItems, { localRestaurants } from "../components/home/RestaurantItems";
import SearchBar from "../components/home/SearchBar"

const YELP_API_KEY = 
    "Dn8ugnfmmBDvl03qWucyl7m0XEPGtnGR14y0QRGn66obYCMc_kwVHAAGrUVXsD_aznnLO92S-7h8LYQcYknNfIupIZlL1Fo1Qntd9doXBr8XZrdBIDtNfG6e_UY7Y3Yx";

export default function Home({ navigation }) {
    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState("San Francisco");
    const [activeTab, setActiveTab] = useState("Delivery");

    const getRestaurantsFromYelp = () => {
        const yelpUrl =
            `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
   
    const apiOptions = {
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
        }}

        return fetch(yelpUrl, apiOptions)
        .then((res) => res.json())
        .then(json => 
            setRestaurantData(
                json.businesses.filter((business) => 
                    business.transactions.includes(activeTab.toLowerCase())
                )
            )
        );
    };

    useEffect(() => {
        getRestaurantsFromYelp();
    }, [city, activeTab]);

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={{backgroundColor: "white", padding: 15}}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
                <SearchBar cityHandler={setCity}/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories />
                <RestaurantItems restaurantData={restaurantData} navigation={navigation}/>
            </ScrollView>
            {/* <Divider width={1} /> */}
            <BottomTabs />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#eee",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }
})
