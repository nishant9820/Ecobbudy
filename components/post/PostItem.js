import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, store } from "../../firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import UserAvatar from "react-native-user-avatar";
const ShopItem = ({ item }) => {
  const isFocused = useIsFocused();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getDetails = async () => {
      const email = await AsyncStorage.getItem("EMAIL");
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      // setUserName(user.data().name);
      //   setImageURL(user);
    };
    getDetails();
  }, [isFocused]);
  const imageURL = item.data.imageURL;
  return (
    <View>
      <View style={styles.postContainer}>
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            alignItems: "center",
          }}
        >
          <View>
            {imageURL ? (
              <Image
                alt="Not find"
                source={{ uri: item.data.imageURL }}
                style={styles.userAvtar}
              />
            ) : (
              <UserAvatar
                style={styles.userAvtar}
                name={item.data.name}
                bgColor={"#BBD6B8"}
                size={40}
              />
            )}
          </View>
          <View style={{ alignSelf: "center", marginLeft: 15, marginTop: -6 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {item.data.name}
            </Text>
            <Text>{item.data.email}</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              marginLeft: "5%",
              marginBottom: 10,
            }}
          >
            {item.data.title}
          </Text>
        </View>
        <View
          style={{
            height: 200,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
          }}
        >
          <Image
            alt="Not find"
            source={{ uri: item.data.postURL }}
            style={{ height: "100%", width: "100%", borderRadius: 10 }}
          />
        </View>
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 16,
              marginTop: 20,
              flexWrap: "wrap",
              alignSelf: "center",
              marginBottom: 10,
            }}
          >
            {item.data.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShopItem;

const styles = StyleSheet.create({
  postContainer: {
    elevation: 8,
    backgroundColor: "#fff",
    elevation: 35,

    borderRadius: 10,
    padding: 5,
    flex: 1,
    margin: 15,
  },
  userAvtar: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginBottom: 10,
  },
});
