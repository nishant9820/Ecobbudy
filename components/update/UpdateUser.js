import React, { useEffect } from "react";
import { Alert, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
// import Background from "../Background";
import { useRoute } from "@react-navigation/core";
import { useState } from "react";
import { storage, store } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import UserAvatar from "react-native-user-avatar";

const UpdateUser = ({ navigation }) => {
  const route = useRoute();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [userId, setUserId] = useState(route.params.uid);
  const [name, setName] = useState(route.params.name);
  const [image, setImage] = useState(route.params.image);

  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.MediaTypeOptions();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

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

  const uploadImage = async () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const response = await fetch(image);
    const blob = await response.blob();
    const fileName = image.substring(image.lastIndexOf("/") + 1);
    const imagesRef = ref(storage, "User_Profiles/" + fileName);

    try {
      const uploadTaskSnapshot = await uploadBytes(imagesRef, blob, metadata);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

      console.log("File available at", downloadURL);
      setImage(downloadURL);
      updateItem(downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const updateItem = async (downloadURL) => {
    const washingtonRef = doc(store, "users", userId);

    await updateDoc(washingtonRef, {
      name: name,

      imageUrl: downloadURL + "",
    }).then(() => {
      console.log("Add - User updated");
      alert("Update Successful");
      navigation.goBack();
    });
  };

  return (
    <View
      style={{
        width: 360,
        justifyContent: "center",
        backgroundColor: "#00332b",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={styles.heading}>Update Details</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={{ marginTop: "15%", alignItems: "center" }}>
          {image ? (
            <Image
              alt="Not find"
              source={{ uri: image }}
              style={styles.avatar}
            />
          ) : (
            <UserAvatar
              style={styles.avatar}
              name={name}
              bgColor={"#BBD6B8"}
              size={80}
            />
          )}

          <TouchableOpacity
            style={{ ...styles.submitButton, marginTop: 60 }}
            onPress={pickImage}
          >
            <Text style={styles.submitText}>Update Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            // onPress={checkValue}
            onPress={uploadImage}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  heading: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 50,
    // marginLeft: "3.5%",
  },
  submitButton: {
    backgroundColor: "#00332b",
    borderRadius: 10,
    alignItems: "center",
    width: 290,
    paddingVertical: 5,
    marginVertical: 10,
    marginLeft: 10,
    alignSelf: "baseline",
    height: 40,
  },
  inputContainer: {
    backgroundColor: "#fff",
    height: 700,
    width: 360,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: "7%",
    alignItems: "center",
  },
  textInput: {
    borderRadius: 100,
    color: "#000000",
    paddingHorizontal: 10,
    width: 290,
    height: 35,
    backgroundColor: "rgb(220,220, 220)",
    marginVertical: 10,
    // marginRight: 80,
  },
  submitText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: -3,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
});
