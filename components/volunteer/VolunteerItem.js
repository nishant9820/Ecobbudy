import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
const VolunteerItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={{
          margin: 10,
          height: 300,
          width: 320,
        }}
        onPress={() => {
          navigation.navigate("Location", {
            data1: item.title,
            data2: item.location,
            data3: item.date,
            data4: item.Price,
            data5: item.description,
            data6: item.image,
            data7: item.image2,
            data8: item.order,
            data9: item.time,
            data10: item.meeting_point,
          });
        }}
      >
        <ImageBackground
          source={item.image}
          style={{
            height: 300,
            width: 320,
            borderRadius: 25 / 2,
            overflow: "hidden",

            justifyContent: "center",
          }}
          resizeMode="cover"
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 100,
              alignSelf: "center",
              padding: 15,
              width: "90%",
              bottom: 18,
              borderRadius: 25 / 2,
              // opacity: 0.5,
            }}
          >
            <View>
              <View>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 15,
                    marginBottom: 10,
                  }}
                >
                  {item.title}
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
                      color={"#fff"}
                      size={15}
                    />
                    <Text style={{ color: "#fff", marginTop: 7, fontSize: 12 }}>
                      {item.location}
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
                      color={"#fff"}
                      size={15}
                    />
                    <Text
                      style={{ color: "#fff", marginTop: 10, fontSize: 12 }}
                    >
                      {item.date}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={{ color: "#fff", marginTop: 6, fontSize: 12 }}>
                    Starts from
                  </Text>
                  <Text style={{ color: "#fff", marginTop: 11, fontSize: 12 }}>
                    Free
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default VolunteerItem;

const styles = StyleSheet.create({});
