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
const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
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
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
const AlertPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
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
            styles.modalAlertContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const ShopItem = ({ item }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [alertVisible, setAlertVisible] = React.useState(false);
  useEffect(() => {
    const getDetails = async () => {
      const email = await AsyncStorage.getItem("EMAIL");
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      setUserName(user.data().name);
    };
    getDetails();
  }, [isFocused]);
  return (
    <View>
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => {
          setAbout(item.data.about);
          setName(item.data.name);
          setPrice(item.data.price);
          setVisible(true);
        }}
      >
        <View style={styles.productImage}>
          <Image
            style={{ height: "100%", width: "100%" }}
            source={{ uri: item.data.image }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.productContentContainer}>
          <View style={{ width: "95%" }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {item.data.name}
            </Text>
          </View>
          <View style={styles.dateviewContainer}>
            <Text style={{ fontWeight: "bold", color: "green" }}>
              {item.data.price}‎ RS
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require("../../assets/x.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: item.data.image }}
            style={{ height: 150, width: 150, marginVertical: 5 }}
          />
        </View>
        <Text style={{ marginVertical: 10, fontSize: 18, fontWeight: "bold" }}>
          {name}
        </Text>
        <Text style={{ marginVertical: 3, fontSize: 13 }}>{about}</Text>
        <Text
          style={{
            marginVertical: 5,
            fontSize: 13,
            fontWeight: "bold",
            color: "green",
          }}
        >
          See more details...
        </Text>

        <View
          style={{
            flexDirection: "row",
            columnGap: 10,
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              paddingHorizontal: 45,
              paddingVertical: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "#fff" }}>Buy</Text>
          </TouchableOpacity>
          <View>
            {userName ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Payment", { data: item.data });
                  () => setVisible(false);
                }}
                style={{
                  backgroundColor: "orange",
                  paddingHorizontal: 45,
                  paddingVertical: 12,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 20, color: "#fff" }}>Buy</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setAlertVisible(true)}
                style={{
                  backgroundColor: "orange",
                  paddingHorizontal: 45,
                  paddingVertical: 12,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 20, color: "#fff" }}>Buy</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <AlertPoup visible={alertVisible}>
          <View style={{ rowGap: 30 }}>
            <View>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>Alert</Text>
              <Text style={{ marginTop: 5 }}>Please Login Before Continue</Text>
            </View>
            <View>
              <Text
                onPress={() => setAlertVisible(false)}
                style={{
                  alignSelf: "flex-end",
                  color: "blue",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                OK
              </Text>
            </View>
          </View>
        </AlertPoup>
      </ModalPoup>
    </View>
  );
};

export default ShopItem;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    elevation: 20,
  },
  modalAlertContainer: {
    width: "90%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 25,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  productContainer: {
    elevation: 8,
    backgroundColor: "#fff",
    elevation: 5,

    borderRadius: 10,
    padding: 5,
    flex: 1,
    margin: 15,
  },
  productImage: {
    height: 150,
    width: 120,
    // borderWidth: 1,
    margin: 5,
    borderRadius: 5,
  },
  productContentContainer: {
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
