import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, store } from "../../firebase/firebase";
import { useIsFocused } from "@react-navigation/core";
import ShopItem from "../../components/shoopingItem/ShopItem";
const ShopWisely = () => {
  const [product, setProduct] = useState([]);
  const [message, setMessage] = useState("");
  const isFocused = useIsFocused();
  useEffect(() => {
    const q = collection(store, "product");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempData = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        tempData.push({ id: doc.id, data: doc.data() });
      });
      setProduct(tempData);
    });
  }, [isFocused]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#fff" }}
    >
      <Image
        source={require("../../assets/explore_card.png")}
        style={{ width: "90%", height: 250, alignSelf: "center" }}
        resizeMode="contain"
      />
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 3,
            paddingHorizontal: 20,
          }}
        >
          Special Deals
        </Text>
        <ScrollView horizontal style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ width: 200, margin: 15, elevation: 5 }}
            onPress={() => alert("Coming Soon")}
          >
            <ImageBackground
              style={{
                width: 200,
                height: 109,
                alignSelf: "center",
                borderRadius: 25 / 2,
                overflow: "hidden",
              }}
              source={require("../../assets/TBrand.jpg")}
              resizeMode="stretch"
            >
              <View
                style={{
                  // position: "absolute",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 100,
                  alignSelf: "center",
                  padding: 15,
                  width: "100%",
                  height: "100%",
                  // bottom: 18,
                  // borderRadius: 25 / 2,
                  opacity: 0.2,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, color: "#00332b" }}
                >
                  Apparels
                </Text>
                <Text style={{ fontSize: 12, color: "#00332b" }}>
                  18 Brands
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Coming Soon")}>
            <ImageBackground
              style={{
                width: 200,
                height: 109,
                elevation: 5,
                alignSelf: "center",
                borderRadius: 25 / 2,
                marginTop: 15,
                overflow: "hidden",
              }}
              source={require("../../assets/Handicraft.jpg")}
              resizeMode="cover"
            >
              <View
                style={{
                  // position: "absolute",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 100,
                  alignSelf: "center",
                  padding: 15,
                  width: "99%",
                  height: "100%",
                  // bottom: 18,
                  // borderRadius: 25 / 2,
                  opacity: 0.5,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, color: "#fff" }}
                >
                  Handicrafts
                </Text>
                <Text style={{ fontSize: 12, color: "#fff" }}>25 Brands</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              elevation: 8,
              backgroundColor: "#fff",
              elevation: 5,
              borderRadius: 10,
              padding: 5,
              flex: 1,
              margin: 15,
              width: 200,
            }}
            onPress={() => alert("Coming Soon")}
          >
            <Image
              style={{ width: 150, height: 100, alignSelf: "center" }}
              source={require("../../assets/coming_soon.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              elevation: 8,
              backgroundColor: "#fff",
              elevation: 5,
              borderRadius: 10,
              padding: 5,
              flex: 1,
              margin: 15,
              width: 200,
            }}
            onPress={() => alert("Coming Soon")}
          >
            <Image
              style={{ width: 150, height: 100, alignSelf: "center" }}
              source={require("../../assets/coming_soon.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 1,
            paddingHorizontal: 20,
          }}
        >
          Plant Product
        </Text>
        <FlatList
          data={product}
          horizontal
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <ShopItem item={item} />}
        />
      </View>

      <View style={{ height: 70 }}></View>
    </ScrollView>
  );
};

export default ShopWisely;

const styles = StyleSheet.create({});
