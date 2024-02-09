import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useNavigation, useIsFocused } from "@react-navigation/native";
const Challenges = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View
        style={{
          width: "100%",
          height: 295,
          backgroundColor: "#145010",
          justifyContent: "center",
          padding: 15,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Challenges This Week
          </Text>
          <View>
            <Image
              source={require("../../assets/leaderboard.png")}
              style={{ height: 30, width: 30 }}
            />
          </View>
        </View>

        <Image
          resizeMode="contain"
          style={{ width: "90", height: 200 }}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/ecobuddy-ae54d.appspot.com/o/sine_tri_sm.gif?alt=media&token=350d36ae-9523-4708-b9c7-9e3d9afa632f",
          }}
        />
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          challenges for you
        </Text>
      </View>
      <View style={{ rowGap: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Image")}
          style={{
            backgroundColor: "#F4A6B3",
            width: "90%",
            alignSelf: "center",
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#F94F49",
            }}
          />
          <Text style={{ color: "#000", marginLeft: 10, fontWeight: "bold" }}>
            Buy an ecofriendly product
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Image")}
          style={{
            backgroundColor: "#F0DAB1",
            width: "90%",
            alignSelf: "center",
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#FFC266",
            }}
          />
          <Text style={{ color: "#000", marginLeft: 10, fontWeight: "bold" }}>
            Best out of waste
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Image")}
          style={{
            backgroundColor: "#B3D8AD",
            width: "90%",
            alignSelf: "center",
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#1EDB05",
            }}
          />
          <Text style={{ color: "#000", marginLeft: 10, fontWeight: "bold" }}>
            Donation to needy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Image")}
          style={{
            backgroundColor: "#E6A3AA",
            width: "90%",
            alignSelf: "center",
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#8F233A",
            }}
          />
          <Text style={{ color: "#000", marginLeft: 10, fontWeight: "bold" }}>
            Waste segregation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Image")}
          style={{
            backgroundColor: "#FBB1A6",
            width: "90%",
            alignSelf: "center",
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#FB7333",
            }}
          />
          <Text style={{ color: "#000", marginLeft: 10, fontWeight: "bold" }}>
            Tree plantation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Image")}
          style={{
            backgroundColor: "#A7E5F4",
            width: "90%",
            alignSelf: "center",
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#001AF4",
            }}
          />
          <Text style={{ color: "#000", marginLeft: 10, fontWeight: "bold" }}>
            Beach Cleaning
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Image")}
          style={{
            backgroundColor: "#F9E79F",
            width: "90%",
            alignSelf: "center",
            padding: 10,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#FFFF00",
            }}
          />
          <Text style={{ color: "#000", marginLeft: 10, fontWeight: "bold" }}>
            Education program
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Challenges;

const styles = StyleSheet.create({});
