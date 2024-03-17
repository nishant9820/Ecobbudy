import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { auth, store } from "../../firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useStripe } from "@stripe/stripe-react-native";
import * as Print from "expo-print";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { shareAsync } from "expo-sharing";
import { PdfCode } from "./Pdf.js";
const Payment = ({ route }) => {
  const applyCoupon = () => {
    if (!couponApplied && coupon === "ABC678BDC") {
      // Apply a 10% discount
      setDiscount(total * 0.1);
      setCouponApplied(true);
      Alert.alert("Coupon applied successfully!");
    } else {
      Alert.alert("Invalid coupon or already applied.");
    }
  };
  // const totalWithDiscount = total - discount;

  const printToFile = async () => {
    let html = PdfCode(productName, userName, total, PaymentType, email);
    try {
      const { uri } = await Print.printToFileAsync({
        html,
      });
      console.log("File has been saved to:", uri);
      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    } catch (err) {
      Alert.alert(
        "Make shure You have Internet Connection or contact @+91 8530730017"
      );
    }
  };
  console.log(email);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [counter, setCounter] = useState(0);
  const [PaymentType, setPaymentType] = useState("online");
  const isFocused = useIsFocused();
  const stripe = useStripe();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const { data } = route.params;
  const [fireShopCounter, setFireShopCounter] = useState(Number);
  const [quantity, setQuantity] = useState(1);
  const [couponApplied, setCouponApplied] = useState(false);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const total = data.price * quantity - discount;
  useEffect(() => {
    const getDetails = async () => {
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      setUserName(user.data().name);
      setEmail(user.data().email);
      setFireShopCounter(user.data().shopwisely);
      setLoading(false);
    };
    getDetails();
  }, [isFocused]);
  const numberFireShopCounter = parseInt(fireShopCounter);

  const productName = data?.name ?? "DefaultProductName";
  if (productName) {
    // Now you can use productName in your code
    console.log("Product Name:", productName);
  } else {
    console.error('The "name" property in data is null or undefined.');
  }
  const subscribe = async () => {
    try {
      const response = await fetch("http://192.168.1.103:8080/pay", {
        method: "POST",
        body: JSON.stringify({ userName, total, productName }),
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
        // paymentMethodTypes: ["card"],
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);

      Alert.alert("Payment complete, thank you!");
      await printToFile();
      const updatedCounter = numberFireShopCounter + 20;

      // Set a loading state to prevent the interval from starting immediately
      setLoading(true);

      // Delay the shopwisely update by 1 second
      setTimeout(async () => {
        const userId = await AsyncStorage.getItem("USERID");
        await updateDoc(doc(store, "users", userId), {
          shopwisely: updatedCounter,
        });
        setLoading(false); // Reset loading state
      }, 1000);

      // const userId = await AsyncStorage.getItem("USERID");
      // await updateDoc(doc(store, "users", userId), {
      //   shopwisely: updatedCounter,
      // });
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };
  // const updatedCounter = numberFireShopCounter + 20;
  // useEffect(() => {
  //   if (!loading) {
  //     const timeout = setInterval(() => {
  //       const setDetails = async () => {
  //         const counts = Number(updatedCounter);
  //         const email = await AsyncStorage.getItem("EMAIL");
  //         const userId = await AsyncStorage.getItem("USERID");

  //         await updateDoc(doc(store, "users", userId), {
  //           shopwisely: counts,
  //         }).catch((error) => {
  //           console.log(error.message);
  //         });
  //       };

  //       setDetails();
  //     }, 1000); // Update every 1 second

  //     return () => clearInterval(timeout);
  //   }
  // }, [loading, updatedCounter]);
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>ECOBUDDY</Text>
      </View>
      <View style={styles.productContainerAdd}>
        <View style={styles.productImage}>
          <Image
            style={{ height: "100%", width: "100%" }}
            source={{ uri: data.image }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.productContentContainer}>
          <View style={{ width: "95%", marginLeft: 5 }}>
            <Text style={{ fontWeight: "bold", fontSize: 25, color: "#000" }}>
              {data.name}
            </Text>
          </View>
          <View style={{ marginLeft: 5 }}>
            <Text style={{ fontWeight: "bold", color: "green" }}>
              {data.price}‎ RS
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              width: "80%",
              alignItems: "center",
              marginTop: 10,
              borderRadius: 10,
              borderColor: "gray",
              paddingVertical: 2,
            }}
          >
            <Text>More Details</Text>
          </View>
        </View>
        <View style={{ alignSelf: "center" }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "green",
              paddingHorizontal: 15,
              borderRadius: 15,
              columnGap: 10,
            }}
          >
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decreaseQuantity}
            >
              <Text
                style={{
                  fontSize: 35,
                  marginTop: -2,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </TouchableOpacity>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ color: "#fff", fontSize: 20 }}>{quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={increaseQuantity}
            >
              <Text style={{ fontSize: 35, color: "#fff" }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.billContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text>{name}</Text>
        </View>

        <View style={styles.productContainer}>
          <Text style={styles.label}>Product:</Text>
          <Text>{data.name}</Text>
        </View>

        <View style={styles.productContainer}>
          <Text style={styles.label}>Price:</Text>
          <Text>₹{data.price}</Text>
        </View>

        <View style={styles.productContainer}>
          <Text style={styles.label}>Quantity:</Text>
          <Text>{quantity}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: data.imageUrl }} style={styles.image} />
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.label}>Total:</Text>
          <Text>₹{total}</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <TextInput
          style={styles.couponInput}
          placeholder="Enter Coupon"
          onChangeText={(text) => setCoupon(text)}
        />
        <TouchableOpacity style={styles.applyButton} onPress={applyCoupon}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.paymentContainer} onPress={subscribe}>
        <Text style={{ color: "#fff", fontSize: 30, fontWeight: "600" }}>
          {`Pay - ${total} INR`}
        </Text>
      </TouchableOpacity>
      <View style={styles.invoiceContainer}>
        {/* <TouchableOpacity style={styles.btn} onPress={printToFile}>
          <Text style={styles.btnText}>Download Invoice</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Light Gray background
    padding: 16,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: "10%",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2ecc71", // Green color
  },
  billContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
  productContainerAdd: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
  },
  productImage: {
    height: 100,
    width: 60,
    margin: 5,
    borderRadius: 5,
  },
  productContentContainer: {
    marginTop: 15,
    alignSelf: "center",
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 5,
    marginLeft: 15,
  },
  paymentContainer: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
    bottom: 10,
    marginTop: "30%",
  },
});

export default Payment;
