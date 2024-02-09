import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";

import { Video } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
// import Onboarding from "./onboarding/Onboarding";
const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(async () => {
      navigation.replace("OnboardingScreen");
    }, 6000);
  }, []);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        // ref={secondVideo}
        style={styles.video}
        source={require("../../assets/splashScreen/Splashscreen.mp4")}
        // useNativeControls
        resizeMode="contain"
        isLooping
        shouldPlay={useIsFocused ? true : false}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "200",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  buttons: {
    margin: 16,
  },
});
