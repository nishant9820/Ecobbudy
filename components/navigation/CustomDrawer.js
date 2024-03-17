import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { signOut } from "firebase/auth";
import UserAvatar from "react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, store } from "../../firebase/firebase";
let userId = "";
const CustomDrawer = (props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uid, setUid] = useState("");
  const [gmail, setGmail] = useState("");
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getCartItems = async () => {
      userId = await AsyncStorage.getItem("USERID");
      setUid(userId);
      const user = await getDoc(doc(store, "users", userId));
      setGmail(user.data().email);
      setImage(user.data().imageUrl);
      setName(user.data().name);
    };

    getCartItems();
  }, [isFocused]);
  useEffect(() => {
    const getDetails = async () => {
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      const userName = user.data().name;
      setName(userName);
      setImageUrl(user.data().imageUrl);
    };
    getDetails();
  }, [isFocused]);

  const logOut = async () => {
    await AsyncStorage.setItem("EMAIL", "");
    await AsyncStorage.setItem("USERID", "");
    alert("Logout Successfull");
    navigation.replace("AppStack");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#013303",
          marginTop: -50,
          zIndex: 10,
        }}
      >
        <ImageBackground
          //   source={require("../assets/Images/background.jpg")}
          style={{ padding: 20 }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Update", {
                name,
                image,
                uid,
              });
            }}
          >
            {image ? (
              <Image
                alt="Not find"
                source={{ uri: imageUrl }}
                style={styles.userAvtar}
              />
            ) : (
              <UserAvatar
                style={styles.userAvtar}
                name={name}
                bgColor={"#BBD6B8"}
                size={80}
              />
            )}
          </TouchableOpacity>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginBottom: 5,
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ccc",
        }}
      >
        <Text style={styles.preferences}>Preferences</Text>
        <View style={styles.switchTextContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor="#f4f3f4"
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
          />
          <Text
            style={{
              fontSize: 15,
            }}
          >
            Dark Theme
          </Text>
        </View>
      </View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UpdateUser", {
              name,
              imageUrl,
              uid,
            })
          }
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: 15 }}
          // onPress={() => {
          //   signOut(auth)
          //     .then(() => {
          //       // Sign-out successful.
          //       logOut();
          //     })
          //     .catch((error) => {
          //       // An error happened.
          //       console.log(error);
          //     });
          // }}
          onPress={logOut}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userAvtar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 20,
  },
  switchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
    paddingVertical: 5,
  },
  preferences: {
    fontSize: 16,
    color: "#ccc",
    paddingTop: 10,
    fontWeight: "500",
    paddingLeft: 20,
  },
  switchText: {
    fontSize: 17,
    color: "",
    paddingTop: 10,
    fontWeight: "bold",
  },
});
