import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, store } from "../../firebase/firebase";
const Image1 = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [userName, setUserName] = useState("");
  const [ChallengeCounter, setChallengeCounter] = useState(Number);
  useEffect(() => {
    const getDetails = async () => {
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      setUserName(user.data().name);
      // setEmail(user.data().email);
      setChallengeCounter(user.data().saveenergy);
      setLoading(false);
    };
    getDetails();
  }, [isFocused]);
  const numberFireChallengeCounter = parseInt(ChallengeCounter);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  };

  const handleContinue = () => {
    if (image) {
      // Continue with your logic here
      Alert.alert("Congratulations on completing daily task!");
      const updatedCounter = numberFireChallengeCounter + 10;
      setLoading(true);
      setTimeout(async () => {
        const userId = await AsyncStorage.getItem("USERID");
        await updateDoc(doc(store, "users", userId), {
          saveenergy: updatedCounter,
        });
        setLoading(false); // Reset loading state
      }, 2000);

      navigation.navigate("Challenges", { imageUri: image });
    } else {
      Alert.alert("Please select an image!");
    }
  };

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
        Detect Image{ChallengeCounter}
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
        >
          <Image
            alt="Not find"
            source={{ uri: image }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            columnGap: 8,
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <Text
              style={{
                borderBottomWidth: 1,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Pick Image
            </Text>
          </TouchableOpacity>

          <MaterialIcons
            name="camera"
            style={{ marginTop: 7 }}
            color={"black"}
            size={25}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleContinue}
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
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Image1;

const styles = StyleSheet.create({});
