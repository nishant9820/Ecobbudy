import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Octicons from "react-native-vector-icons/Octicons";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useIsFocused } from "@react-navigation/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, store, storage } from "../../firebase/firebase";
import UserAvatar from "react-native-user-avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
let userId = "";
import PostItem from "../../components/post/PostItem";
const AddPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer2,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
const MyDropdownMenu = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uid, setUid] = useState("");
  const [addvisible, setVisibleAdd] = React.useState(false);
  const [image, setImage] = useState(null);
  const isFocused = useIsFocused();
  const [imageUrl, setImageUrl] = useState("");
  const [post, setPost] = useState([]);

  const [email, setEmail] = useState("");
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
      console.log(name);
      console.error("Error picking image: ", error);
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      const userName = user.data().name;
      const email = user.data().email;
      setName(userName);
      setImageUrl(user.data().imageUrl);
      setEmail(email);
    };
    getDetails();
  }, [isFocused]);
  console.log(name);

  const submit = async () => {
    try {
      // Image Upload
      const metadata = {
        contentType: "image/jpeg",
      };
      const response = await fetch(image);
      const blob = await response.blob();
      const fileName = image.substring(image.lastIndexOf("/") + 1);
      const imagesRef = ref(storage, "Posts/" + fileName);

      const uploadTaskSnapshot = await uploadBytes(imagesRef, blob, metadata);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

      console.log("File available at", downloadURL);

      // Add post data to Firestore
      const postRef = await addDoc(collection(store, "Posts"), {
        name: name,
        imageURL: imageUrl,
        email: email,
        title: title,
        postURL: downloadURL, // or however you want to structure the URL
        description: description,
      });

      console.log("Post added with ID: ", postRef.id);
      alert("Post added successfully");
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };
  useEffect(() => {
    const q = collection(store, "Posts");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempData = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        tempData.push({ id: doc.id, data: doc.data() });
      });
      setPost(tempData);
    });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Community</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={setVisibleAdd}
            style={styles.dropdownButton}
          >
            <Text>Add Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View
        style={{
          width: "95%",
          height: 80,
          borderWidth: 1,
          alignSelf: "center",
          backgroundColor: "#00332b",
          marginTop: 10,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            height: 60,
            width: 60,
            borderRadius: 60,
          }}
        >
          {imageUrl ? (
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
        </View>
        <View>
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "900" }}>
            {name}
          </Text>
        </View>
      </View> */}
      <AddPoup visible={addvisible}>
        <View
          style={{
            height: 90,
            width: 90,
            borderBottomLeftRadius: 90,
            backgroundColor: "green",
            borderTopRightRadius: 20,
            opacity: 0.2,
            position: "absolute",
            right: "0%",
            top: "0%",
          }}
        ></View>
        <View>
          <View style={styles.moduleheader}>
            <TouchableOpacity>
              <Octicons
                onPress={() => setVisibleAdd(false)}
                name="x"
                style={{ marginBottom: 4 }}
                size={29}
                color="#013303"
              />
            </TouchableOpacity>
            <View style={{ rowGap: 20, marginTop: 5 }}>
              <Text style={{ fontSize: 20, color: "#013303" }}>
                Share your Views
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  marginTop: "20",
                }}
                inputMode="text"
                onChangeText={(text) => setTitle(text)}
                placeholder="Title"
              />
              <View
                style={{
                  height: 50,
                  width: "100%",
                  borderWidth: 1,
                  alignSelf: "center",
                  borderRadius: 5,
                }}
              >
                <Image
                  alt="Not find"
                  source={{ uri: image }}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>

              <TextInput
                multiline
                numberOfLines={5}
                style={{
                  borderWidth: 1,
                  marginTop: "10",
                  borderRadius: 5,
                }}
                inputMode="text"
                onChangeText={(text) => setDescription(text)}
              />

              <View style={{ alignItems: "center", marginTop: 5, rowGap: 5 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FDD017",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 300,
                    width: "98%",
                    height: 50,
                    marginTop: 10,
                  }}
                  onPress={pickImage}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 25,
                      fontWeight: "bold",
                      // marginTop: 1,
                    }}
                  >
                    Add Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#013303",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 300,
                    // paddingVertical: 5,
                    // marginVertical: 10,
                    width: "98%",
                    height: 50,
                    marginTop: 10,
                  }}
                  onPress={submit}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 25,
                      fontWeight: "bold",
                      // marginTop: 1,
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </AddPoup>
      <FlatList
        data={post}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PostItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 80,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
    flexDirection: "row",
    padding: 15,
  },
  headerText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer2: {
    width: "80%",
    height: 500,
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 20,
    justifyContent: "center",
  },
  moduleheader: {
    width: "100%",
    // height: 40,
    justifyContent: "center",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  userAvtar: {
    height: 60,
    width: 60,
    borderRadius: 40,
    marginBottom: 10,
  },
});

export default MyDropdownMenu;
