import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

const DonatePay = () => {
  const [name, setName] = useState("");
  const stripe = useStripe();
  const [amount, setAmount] = useState(0);
  const windowHeight = useWindowDimensions().height;
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
      Alert.alert("Payment complete, thank you!");
    } catch (err) {
      console.error(err);
      Alert.alert("Something went wrong, try again later!");
    }
  };

  return (
    <View style={{ backgroundColor: "#00332b" }}>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 40,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Donate
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          marginTop: "7%",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <View
          style={{ ...styles.container, minHeight: Math.round(windowHeight) }}
        >
          <TextInput
            onChangeText={(text) => setName(text)}
            placeholder="Name"
            style={styles.inputStyle}
          />
          <TextInput
            keyboardType="numeric"
            onChangeText={(value) => setAmount(value)}
            placeholder="Amount"
            style={styles.inputStyle}
          />

          <TouchableOpacity style={styles.submitBtn} onPress={subscribe}>
            <Text style={styles.btnText}> {`Donate - ${amount} INR`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DonatePay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    gap: 20,
    marginTop: "50%",
    backgroundColor: "#fff",
  },
  inputStyle: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 10,
    borderRadius: 8,
    elevation: 10,
  },

  submitBtn: {
    backgroundColor: "#00332b",
    padding: 20,
    width: "70%",
    alignItems: "center",
    marginTop: "20%",
    borderRadius: 20,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
