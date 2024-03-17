import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { auth, store } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fName, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [yellow, setYellow] = useState("");
  const [pink, setPink] = useState("");
  const [blue, setBlue] = useState("");
  const [orange, setOrange] = useState("");
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
        const userId = user.uid;
        await setDoc(doc(store, "users", userId), {
          name: fName,
          email: email,
          imageUrl: "",
          steps: 0,
          walkpoints: 0,
          distancewalked: 0,
          shopwisely: 0,
          plantatree: 0,
          saveenergy: 0,
          walkmore: 0,
          totalpoints: 0,
        }).catch((error) => {
          console.log(error.message);
        });
      })
      .then(() => {
        alert("User Registered");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image
        source={require("../../assets/onboardingImages/earth.png")}
        style={[styles.image, { resizeMode: "contain" }]}
      />
      <View style={{ alignItems: "center", rowGap: 20 }}>
        <TextInput
          style={[styles.textContainer]}
          placeholder="Username"
          inputMode="text"
          onChangeText={(text) => setFName(text)}
        />
        {/* <View style={{ flexDirection: "row", columnGap: 2 }}>
          <TextInput
            style={{ borderBottomWidth: 1 }}
            // placeholder="Email"
            inputMode="email"
            onChangeText={(text) => setOrange(text)}
          />
          <TextInput
            style={{ borderBottomWidth: 1 }}
            // placeholder="Email"
            inputMode="text"
            onChangeText={(text) => setYellow(text)}
          />
          <TextInput
            style={{ borderBottomWidth: 1 }}
            // placeholder="Email"
            inputMode="text"
            onChangeText={(text) => setPink(text)}
          />
          <TextInput
            style={{ borderBottomWidth: 1 }}
            // placeholder="Email"
            inputMode="text"
            onChangeText={(text) => setBlue(text)}
          />
        </View> */}
        <TextInput
          style={[styles.textContainer]}
          placeholder="Email"
          inputMode="text"
          onChangeText={(text) => setEmail(text)}
        />
        <View style={[styles.textContainer]}>
          <TextInput
            style={{ width: "90%" }}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        </View>
        <View style={styles.terms}>
          <Text style={{ color: "#808080", fontSize: 14 }}>
            By Register in, you agree to our{" "}
            <Text
              style={{
                color: "#013303",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Terms & Conditions
            </Text>
          </Text>
          <View style={styles.privacy}>
            <Text>and </Text>
            <Text>Privacy Policy</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          style={{ ...styles.singUpButton, marginTop: 20 }}
        >
          <Text style={{ fontSize: 15, color: "#fff" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  image: {
    flex: 0.7,
    width: "75%",
    height: "75%",
    alignSelf: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    padding: 10,
    backgroundColor: "#DEDEE0",
    width: "90%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 1,
  },
  singUpButton: {
    height: 50,
    backgroundColor: "#013303",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  privacy: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
