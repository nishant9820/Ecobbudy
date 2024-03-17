// YourMainComponent.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import volunteer from "../../extra/volunteer";
import events from "../../extra/events";
import VolunteerItem from "../../components/volunteer/VolunteerItem";
import VolunteerItem2 from "../../components/volunteer/VolunteerItem2";
const VolunteerMore = () => {
  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Find</Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "green" }}>
          NGO Drives
        </Text>
      </View>
      <View style={styles.container}>
        <Feather
          name="search"
          size={25}
          color="#000000"
          //   style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Search"
          placeholderTextColor={"#000000"}
        />
      </View>
      <View style={{ flexDirection: "row", columnGap: 12, margin: 20 }}>
        <View
          style={{
            backgroundColor: "#ECE9FC",
            borderRadius: 5,
            padding: 5,
            elevation: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Music Concert</Text>
        </View>
        <View
          style={{
            backgroundColor: "#FFF5D7",
            borderRadius: 5,
            padding: 5,
            elevation: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Exhibition</Text>
        </View>
        <View
          style={{
            backgroundColor: "#FCEDEA",
            borderRadius: 5,
            padding: 5,
            elevation: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Beach Cleaning</Text>
        </View>
      </View>
      <View
        style={{
          ...styles.introView,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Trending Events
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#7D817D",
            marginTop: 8,
          }}
        >
          See all
        </Text>
      </View>
      <FlatList
        data={volunteer}
        horizontal
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <VolunteerItem item={item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={{
          ...styles.introView,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Events near You
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#7D817D",
            marginTop: 8,
          }}
        >
          See all
        </Text>
      </View>
      <FlatList
        data={events}
        // horizontal
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <VolunteerItem2 item={item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default VolunteerMore;

const styles = StyleSheet.create({
  container: {
    margin: 18,
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    borderRadius: 30,
    elevation: 8,
    marginBottom: 3,
    padding: 8,
  },

  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "100%",
    color: "#493d8a",
  },
  introView: {
    margin: 20,
  },
});
