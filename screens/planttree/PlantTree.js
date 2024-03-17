import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
const PlantTree = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "#00332b",
        height: "100%",
        // justifyContent: "center",
      }}
    >
      <View style={{ padding: 15, alignItems: "center", marginTop: "60%" }}>
        <Text style={{ fontSize: 20, color: "#fff", marginBottom: 7 }}>
          EcoBuddy
        </Text>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}>
          Plant a Tree
        </Text>
        <Text style={{ color: "#fffff7", marginTop: 5 }}>
          Planting a tree is act of nurturing the environment
        </Text>
        <Text style={{ color: "#fffff7" }}>
          and securing a greener future. Join us in our mission
        </Text>
        <Text style={{ color: "#fffff7" }}>
          to make the world a better place. One tree at a time.
        </Text>
        <Text style={{ color: "#fffff7" }}>
          Let's grow together-start by planting a tree today
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("PlantPay")}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 5,
            paddingHorizontal: 15,
            marginTop: 18,
          }}
        >
          <Text style={{ color: "#00332b" }}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          //   position: "absolute",
          //   bottom: 0,
          //   alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/pngtree.png")}
          style={{
            height: 450,
            width: 450,
            // position: "absolute",
            alignSelf: "baseline",
            marginTop: "12%",
            marginRight: 800,
            marginLeft: -45,
          }}
        />
      </View>
    </View>
  );
};

export default PlantTree;

const styles = StyleSheet.create({});
