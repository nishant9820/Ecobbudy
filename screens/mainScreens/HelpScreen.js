import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HelpScreen = () => {
  const navigation = useNavigation();
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
          <View style={{ flexDirection: "row", columnGap: 15, marginTop: 20 }}>
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
          </View>
          <View style={{ flexDirection: "row", columnGap: 15, marginTop: 20 }}>
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
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({});
