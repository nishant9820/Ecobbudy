import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React from "react";

const GameItem = ({ item }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => Linking.openURL(item.uri)}
      >
        <Image
          source={item.image}
          style={{ height: 180, width: 180 }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameItem;

const styles = StyleSheet.create({
  productContainer: {
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    zIndex: 99,
    elevation: 6,
    padding: 4,
    backgroundColor: "#fff",
  },
});
