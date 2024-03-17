import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";
import Octicons from "react-native-vector-icons/Octicons";
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

const HelpScreen = () => {
  const [addvisible, setVisibleAdd] = React.useState(false);
  const navigation = useNavigation();
  const handleCopy = () => {
    const textToCopy =
      "exp://u.expo.dev/update/6dd5f5b0-3cd0-4476-9f6e-f37dd38c3de8"; // Replace with your actual text
    Clipboard.setString(textToCopy);
    // You can provide some feedback to the user, e.g., show a toast
  };
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#00332b",
        height: "100%",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: "#fff",
          fontSize: 24,
          alignSelf: "flex-start",
          marginLeft: 30,
          marginTop: 30,
        }}
      >
        Settings
      </Text>
      <View style={{ width: "90%", alignSelf: "center", marginTop: 40 }}>
        <Image
          source={require("../../assets/settings_card.png")}
          resizeMode="contain"
          style={{ height: 300, width: 300, alignSelf: "center" }}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          padding: 20,
        }}
      >
        <ScrollView>
          <View style={{ flexDirection: "row", columnGap: 15 }}>
            <Feather
              name="bell"
              style={{ marginTop: 7 }}
              color={"black"}
              size={31}
            />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Notifications
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 13, color: "#707070" }}
              >
                Notifications, Tones, Vibrations, Reminders
              </Text>
            </View>
          </View>
          <TouchableOpacity
            // onPress={() => navigation.navigate("Language")}
            style={{ flexDirection: "row", columnGap: 15, marginTop: 20 }}
          >
            <Ionicons
              name="language"
              style={{ marginTop: 7 }}
              color={"black"}
              size={31}
            />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                App Language
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 13, color: "#707070" }}
              >
                English
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", columnGap: 15, marginTop: 20 }}>
            <MaterialCommunityIcons
              name="web"
              style={{ marginTop: 7 }}
              color={"black"}
              size={31}
            />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Storage and data
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 13, color: "#707070" }}
              >
                Network usage and auto-download
              </Text>
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", columnGap: 15, marginTop: 20 }}>
            <MaterialCommunityIcons
              name="message-alert-outline"
              style={{ marginTop: 7 }}
              color={"black"}
              size={31}
            />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Send feedback
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 13, color: "#707070" }}
              >
                send suggestions and feedback
              </Text>
            </View>
          </View> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("AI")}
            style={{ flexDirection: "row", columnGap: 15, marginTop: 20 }}
          >
            <MaterialCommunityIcons
              name="message-alert-outline"
              style={{ marginTop: 7 }}
              color={"black"}
              size={31}
            />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Ask your question
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 13, color: "#707070" }}
              >
                Get answer to your all question through aur AI
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={setVisibleAdd}
            style={{ flexDirection: "row", columnGap: 15, marginTop: 20 }}
          >
            <Feather
              name="share-2"
              style={{ marginTop: 7 }}
              color={"black"}
              size={31}
            />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Share with Friends
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 13, color: "#707070" }}
              >
                Challenge your friends for a good cause!
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ height: 100 }} />
        </ScrollView>
        <AddPoup visible={addvisible}>
          {/* <View
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
          ></View> */}
          <View>
            <View style={styles.moduleheader}>
              <TouchableOpacity>
                <Octicons
                  onPress={() => setVisibleAdd(false)}
                  name="x"
                  style={{ marginBottom: 10 }}
                  size={29}
                  color="#013303"
                />
              </TouchableOpacity>

              <View
                style={{
                  height: 300,
                  width: "100%",
                  borderWidth: 1,
                  alignSelf: "center",
                  borderRadius: 5,
                  padding: 15,
                }}
              >
                <Image
                  alt="Not find"
                  source={require("../../assets/easupdate.png")}
                  style={{ height: "100%", width: "100%" }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  borderWidth: 1,
                  borderRadius: 5,
                  marginTop: 13,
                }}
              >
                <View style={{ padding: 7 }}>
                  <Text>
                    exp://u.expo.dev/update/40420dbe-a8f3-48aa-8f5a-5c2dc79a3cac
                  </Text>
                </View>
                <TouchableOpacity onPress={handleCopy}>
                  <View style={styles.button}>
                    <Octicons
                      name="copy"
                      style={{
                        bottom: 0,
                        alignSelf: "flex-end",
                        marginTop: 23,
                        marginLeft: -10,
                      }}
                      size={20}
                      color="#013303"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </AddPoup>
      </View>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  modalContainer2: {
    width: "80%",
    // height: 500,
    backgroundColor: "white",
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 20,
    justifyContent: "center",
    padding: 25,
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
