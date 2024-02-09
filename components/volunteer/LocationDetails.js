// Location.js
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
const Location = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    data1,
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    data8,
    data9,
    data10,
  } = route.params;

  return (
    <ScrollView>
      <View>
        <Image
          source={data6}
          style={{ width: "100%", height: 300 }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          //   position: "absolute",
          backgroundColor: "#fff",
          zIndex: 100,
          alignSelf: "center",
          padding: 15,
          width: "90%",
          top: -50,
          borderRadius: 25 / 2,
          // opacity: 0.5,
        }}
      >
        <View>
          <View>
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                fontSize: 15,
                marginBottom: 10,
              }}
            >
              {data1}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                }}
              >
                <Ionicons
                  name="location-outline"
                  style={{ marginTop: 7 }}
                  color={"#000"}
                  size={15}
                />
                <Text
                  style={{
                    color: "#000",
                    marginTop: 7,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {data2}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  columnGap: 5,
                }}
              >
                <Ionicons
                  name="calendar-outline"
                  style={{ marginTop: 7 }}
                  color={"#000"}
                  size={15}
                />
                <Text
                  style={{
                    color: "#000",
                    marginTop: 10,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {data3}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text
          style={{ fontWeight: "bold", fontSize: 15, marginLeft: 20, top: -20 }}
        >
          Description
        </Text>
        <Text
          style={{
            flexWrap: "wrap",
            marginLeft: 20,
            marginRight: 2,
            marginTop: 5,
            top: -20,
          }}
        >
          {data5}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            marginLeft: 20,
            bottom: 10,
          }}
        >
          Venue & Location
        </Text>
        <Image
          style={{
            height: 200,
            width: 320,
            borderRadius: 25 / 2,
            overflow: "hidden",
            alignSelf: "center",
            justifyContent: "center",
          }}
          resizeMode="cover"
          source={data7}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", marginLeft: 20, top: 20 }}>
          Free
        </Text>
        <TouchableOpacity
          style={{
            top: 20,
            right: 20,
            backgroundColor: "#00332b",
            padding: 5,
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate("Ticket", {
              data1: data1,
              data2: data2,
              data3: data3,
              data4: data4,
              data5: data5,
              data6: data6,
              data7: data7,
              data8: data8,
              data9: data9,
              data10: data10,
            });
          }}
        >
          <Text style={{ color: "#fff" }}>Volunteer</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
};

export default Location;
