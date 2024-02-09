import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/mainScreens/HomeScreen";
// import MapScreen from "../Screens/MapScreen";
// import SearchScreen from "../Screens/SearchScreen";
// import PostScreen from "../Screens/PostScreen";
// import ProfileScreen from "../Screens/ProfileScreen";
import Ionic from "react-native-vector-icons/Ionicons";
import CommunityScreen from "../../screens/mainScreens/CommunityScreen";
import Rewards from "../../screens/mainScreens/Rewards";
import HelpScreen from "../../screens/mainScreens/HelpScreen";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <View style={{ justifyContent: "center", flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#1A1A23",
            borderRadius: 30,
            position: "absolute",
            borderTopColor: "transparent",
            elevation: 0,
            height: 54,
            overflow: "hidden",
            bottom: 25,
            margin: "5%",
            width: "90%",
          },
          tabBarIcon: ({ focused, colour }) => {
            let iconName;
            if (route.name === "HomeScreen") {
              iconName = focused ? "home-sharp" : "home-outline";
              colour = focused && "#ffffff";
            } else if (route.name === "CommunityScreen") {
              iconName = focused ? "people-sharp" : "people-outline";
              colour = focused && "#ffffff";
            } else if (route.name === "Rewards") {
              iconName = focused ? "trophy-sharp" : "trophy-outline";
              colour = focused && "#ffffff";
            } else if (route.name === "HelpScreen") {
              iconName = focused
                ? "chatbox-ellipses"
                : "chatbox-ellipses-outline";
              colour = focused && "#ffffff";
            }
            return (
              <>
                <Ionic
                  name={iconName}
                  style={{ marginBottom: 4 }}
                  size={26}
                  color={colour ? colour : "#ffffff40"}
                />
                <Ionic
                  name="ellipse"
                  style={{ display: colour ? "flex" : "none" }}
                  size={4}
                  color={colour ? colour : "transparent"}
                />
              </>
            );
          },
        })}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />

        <Tab.Screen name="CommunityScreen" component={CommunityScreen} />
        <Tab.Screen name="Rewards" component={Rewards} />
        <Tab.Screen name="HelpScreen" component={HelpScreen} />
      </Tab.Navigator>
    </View>
  );
};
export default BottomTab;
