import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const DonateMore = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          Donate to the Global
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Goal</Text>
      </View>
      <View style={{ padding: 15, marginTop: -25 }}>
        <Text style={{ fontSize: 25, color: "grey" }}>
          Which Global Goal would you like to Donate to?
        </Text>
      </View>
      <View style={{ rowGap: 15, marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("DonatePay")}
          style={{
            width: "90%",
            // height: 95,
            alignSelf: "center",
            backgroundColor: "red",
            borderRadius: 18,
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text style={{ fontSize: 60, color: "#fff" }}>1</Text>
            <Text style={{ fontSize: 20, color: "#fff" }}>NO POWERTY</Text>
          </View>
          <View>
            <Image
              source={require("../../assets/donations/0.jpg")}
              style={{ height: 50, width: 90 }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DonatePay")}
          style={{
            width: "90%",
            // height: 95,
            alignSelf: "center",
            backgroundColor: "#DCA639",
            borderRadius: 18,
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text style={{ fontSize: 60, color: "#fff" }}>2</Text>
            <Text style={{ fontSize: 20, color: "#fff" }}>Zero Hunger</Text>
          </View>
          <View>
            <Image
              source={require("../../assets/donations/1.jpg")}
              style={{ height: 50, width: 90 }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DonatePay")}
          style={{
            width: "90%",
            // height: 95,
            alignSelf: "center",
            backgroundColor: "#4C9E38",
            borderRadius: 18,
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text style={{ fontSize: 60, color: "#fff" }}>3</Text>
            <View>
              <Text style={{ fontSize: 20, color: "#fff" }}>
                GOOD HEALTH AND
              </Text>
              <Text style={{ fontSize: 20, color: "#fff" }}>WELL-BEING</Text>
            </View>
          </View>
          <View>
            <Image
              source={require("../../assets/donations/2.jpg")}
              style={{ height: 50, width: 90 }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DonatePay")}
          style={{
            width: "90%",
            // height: 95,
            alignSelf: "center",
            backgroundColor: "#C51A2D",
            borderRadius: 18,
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text style={{ fontSize: 60, color: "#fff" }}>4</Text>
            <View>
              <Text style={{ fontSize: 20, color: "#fff" }}>QUALITY</Text>
              <Text style={{ fontSize: 20, color: "#fff" }}>Education</Text>
            </View>
          </View>
          <View>
            <Image
              source={require("../../assets/donations/3.jpg")}
              style={{ height: 50, width: 90 }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DonatePay")}
          style={{
            width: "90%",
            // height: 95,
            alignSelf: "center",
            backgroundColor: "#FF3821",
            borderRadius: 18,
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text style={{ fontSize: 60, color: "#fff" }}>5</Text>
            <View>
              <Text style={{ fontSize: 20, color: "#fff" }}>Gender</Text>
              <Text style={{ fontSize: 20, color: "#fff" }}>Equality</Text>
            </View>
          </View>
          <View>
            <Image
              source={require("../../assets/donations/4.jpg")}
              style={{ height: 50, width: 90 }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DonatePay")}
          style={{
            width: "90%",
            // height: 95,
            alignSelf: "center",
            backgroundColor: "#23C0E1",
            borderRadius: 18,
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Text style={{ fontSize: 60, color: "#fff" }}>6</Text>
            <View>
              <Text style={{ fontSize: 20, color: "#fff" }}>
                CLEAN WATER AND
              </Text>
              <Text style={{ fontSize: 20, color: "#fff" }}>SANITATION</Text>
            </View>
          </View>
          <View>
            <Image
              source={require("../../assets/donations/5.jpg")}
              style={{ height: 50, width: 90 }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
};

export default DonateMore;

const styles = StyleSheet.create({});
