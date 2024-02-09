import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Image = () => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginTop: "10%",
        }}
      >
        Detect Image
      </Text>
      <View style={{ rowGap: 10 }}>
        <View
          style={{
            height: 290,
            width: 290,
            backgroundColor: "#D3F1CD",
            borderWidth: 1,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            columnGap: 8,
          }}
        >
          <Text
            style={{
              borderBottomWidth: 1,

              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Pick Image
          </Text>
          <MaterialIcons
            name="camera"
            style={{ marginTop: 7 }}
            color={"black"}
            size={25}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: "90%",
          backgroundColor: "#000",
          padding: 15,
          borderRadius: 10,
          marginBottom: "10%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Image;

const styles = StyleSheet.create({});
