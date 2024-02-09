import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import BottomTab from "./BottomTabs/BottomTab";
import BottomTab from "./components/navigation/BottomTab";
const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <BottomTab />
      {/* <BottomTab /> */}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
