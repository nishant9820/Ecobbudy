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

export default Newsitem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      style={styles.newsContainer}
      onPress={() => Linking.openURL(item.url)}
    >
      <View style={styles.newsImage}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{ uri: item.urlToImage }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.newsContentContainer}>
        <View style={{ width: "95%" }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
        </View>
        <View style={styles.dateviewContainer}>
          <Text>{item.publishedAt.toString().slice(0, 10)}</Text>
          <Text>{item.publishedAt.toString().slice(11, 16)}‎ am</Text>
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
  newsImage: {
    height: 100,
    width: 60,
    // borderWidth: 1,
    margin: 5,
    borderRadius: 5,
  },
  newsContentContainer: {
    justifyContent: "space-between",
    marginTop: 5,
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 5,
    marginLeft: 5,
  },
  dateviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
