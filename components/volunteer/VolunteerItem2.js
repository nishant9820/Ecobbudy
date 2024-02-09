import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";

export default VolunteerItem2 = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      style={styles.newsContainer}
      onPress={() => alert("Opening Soon")}
    >
      <View style={styles.Image}>
        <Image
          style={{ height: "100%", width: "100%", borderRadius: 10 }}
          source={item.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.LocationContainer}>
        <View style={{ width: "95%" }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
        </View>
        <View style={styles.detailsContainer}>
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
            <Text style={{ color: "#000", marginTop: 7, fontSize: 12 }}>
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
              color={"#000"}
              size={15}
            />
            <Text style={{ color: "#000", marginTop: 7, fontSize: 12 }}>
              {item.date}
            </Text>
          </View>
          <Text></Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newsContainer: {
    elevation: 8,
    backgroundColor: "#fff",
    elevation: 5,
    flexDirection: "row",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    margin: 12,
  },
  Image: {
    height: 100,
    width: 110,
    // borderWidth: 1,
    margin: 5,
    borderRadius: 5,
  },
  LocationContainer: {
    // justifyContent: "space-between",
    marginTop: 5,
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 5,
    marginLeft: 5,
  },
  detailsContainer: {
    // flexDirection: "row",
    justifyContent: "space-between",
  },
});
