import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useIsFocused } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth, store } from "../../firebase/firebase";
const PlantPay = () => {
  const stripe = useStripe();
  const isFocused = useIsFocused();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null); //
  const [userName, setUserName] = useState("");
  const [plantCounter, setPlantCounter] = useState(Number);
  const plants = [
    { name: "Monstera Deliciosa", price: 400 },
    { name: "Snake Plant (Sansevieria)", price: 1500 },
    { name: "Pothos (Epipremnum Aureum)", price: 800 },
  ];

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
    setAmount(plant.price); // Set the amount here
    toggleModal();
  };
  useEffect(() => {
    const getDetails = async () => {
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      setUserName(user.data().plantatree);
      setEmail(user.data().email);
      setFireShopCounter(user.data().shopwisely);
      setLoading(false);
    };
    getDetails();
  }, [isFocused]);
  const numberFirePlantCounter = parseInt(userName);
  const subscribe = async () => {
    try {
      const response = await fetch("http://192.168.1.103:8000/pay", {
        method: "POST",
        body: JSON.stringify({ amount, name }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Merchant Name",
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment complete, thank you! Let's make world beautiful!!!");

      const updatedCounter = numberFirePlantCounter + 50;
      setLoading(true);
      setTimeout(async () => {
        const userId = await AsyncStorage.getItem("USERID");
        await updateDoc(doc(store, "users", userId), {
          plantatree: updatedCounter,
        });
        setLoading(false); // Reset loading state
      }, 2000);
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };
  const [loading, setLoading] = useState(true);
  const updatedCounter = numberFirePlantCounter + 50;
  return (
    <View style={{ backgroundColor: "#00332b", height: "100%" }}>
      <View style={{ padding: 15, alignItems: "center", marginTop: "60%" }}>
        <Text style={{ fontSize: 20, color: "#fff", marginBottom: 7 }}>
          EcoBuddy
        </Text>
        <TextInput
          onChangeText={(text) => setName(text)}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            width: "80%",
            marginTop: 10,
            borderRadius: 5,
          }}
          placeholder="Enter Your Name"
        />
        <TouchableOpacity
          onPress={toggleModal}
          style={styles.dropdownContainer}
        >
          <Text style={styles.dropdownText}>
            {selectedPlant
              ? `${selectedPlant.name} - ${selectedPlant.price}rs`
              : "Select Plant"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={subscribe}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 5,
            paddingHorizontal: 15,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#00332b" }}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../assets/pngtree.png")}
          style={styles.image}
        />
      </View>

      {/* Custom Dropdown Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          {plants.map((plant, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePlantSelect(plant)}
              style={styles.modalItem}
            >
              <Text
                style={styles.modalItemText}
              >{`${plant.name} - ${plant.price}rs`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: "#fff",
    padding: 10,
    width: "80%",
    marginTop: 10,
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
  },
  image: {
    height: 450,
    width: 450,
    alignSelf: "baseline",
    marginTop: "15%",
    marginRight: 800,
    marginLeft: -45,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default PlantPay;
