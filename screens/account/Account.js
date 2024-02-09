import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Octicons from "react-native-vector-icons/Octicons";
import { auth } from "../../firebase/firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const ResetPoup = ({ visible, children }) => {
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
const Account = () => {
  const [loginpassword, verifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginemail, verifyEmail] = useState("");
  const [loginreset, ResetEmail] = useState("");
  const [loginvisible, setVisibleLogin] = React.useState(false);
  const navigation = useNavigation();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, loginemail, loginpassword)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log("User with:", user.email);
        console.log("User uid:", user.uid);
        await AsyncStorage.setItem("EMAIL", user.email);
        await AsyncStorage.setItem("USERID", user.uid);
      })
      .then(() => {
        navigation.replace("AppStack");
      })

      .catch(() =>
        alert("Incorrect email or password. Please check and try again")
      );
  };
  const resetPassword = () => {
    sendPasswordResetEmail(auth, loginreset, null)
      .then(() => {
        alert("Reset email sent to " + loginreset);
        ResetEmail("");
      })
      .catch(function (e) {
        console.log(e);
      });
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
          placeholder="Email"
          inputMode="email"
          onChangeText={(text) => verifyEmail(text)}
        />
        <View style={[styles.textContainer]}>
          <TextInput
            style={{ width: "90%" }}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={loginpassword}
            onChangeText={(text) => verifyPassword(text)}
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        </View>
        <ResetPoup visible={loginvisible}>
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
                  onPress={() => setVisibleLogin(false)}
                  name="x"
                  style={{ marginBottom: 4 }}
                  size={29}
                  color="#013303"
                />
              </TouchableOpacity>
              <View style={{ rowGap: 10, marginTop: 5 }}>
                <Text style={{ fontSize: 20, color: "#013303" }}>
                  Reset Password
                </Text>
                <TextInput
                  style={{
                    borderBottomWidth: 1,
                    marginTop: "10",
                  }}
                  inputMode="email"
                  onChangeText={(text) => {
                    ResetEmail(text);
                  }}
                  placeholder="User G-mail"
                />

                <View style={{ alignItems: "center", marginTop: 5, rowGap: 5 }}>
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
                    onPress={() => {
                      if (loginreset !== null) {
                        resetPassword();
                      } else {
                        alert("Enter a Email");
                      }
                    }}
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
        </ResetPoup>
        <Text
          style={{ color: "#013303", fontSize: 15, fontWeight: "600" }}
          onPress={setVisibleLogin}
        >
          Can't remember your password?
        </Text>
        <TouchableOpacity style={styles.singInButton} onPress={handleLogin}>
          <Text style={{ fontSize: 15, color: "#fff" }}>Sign In</Text>
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate("CreateAccount")}
          style={{ color: "#013303", fontSize: 15, fontWeight: "600" }}
        >
          CREATE ACCOUNT
        </Text>
      </View>
    </View>
  );
};

export default Account;

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
  singInButton: {
    height: 50,
    backgroundColor: "#013303",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  modalContainer2: {
    width: "80%",
    height: "auto",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 130,
    borderRadius: 20,
    elevation: 20,
  },
  moduleheader: {
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
