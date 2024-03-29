import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

export default Onboardingitem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.discription}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -150,
  },
  image: {
    flex: 0.7,
    marginTop: 150,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
    color: "#115C03",
    marginTop: -50,
    textAlign: "center",
  },

  discription: {
    fontWeight: "300",
    color: "#115C03",
    textAlign: "center",
    paddingHorizontal: 54,
  },
});
