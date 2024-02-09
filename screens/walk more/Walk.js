import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Accelerometer } from "expo-sensors";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { store } from "../../firebase/firebase";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [name, setName] = useState("");
  const [fireSteps, setFireSteps] = useState(Number);
  const [fireDistance, setFireDistance] = useState("");
  const isFocused = useIsFocused();
  const [isStepDetected, setIsStepDetected] = useState(false);
  const [lastStepTime, setLastStepTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const averageStepLength = 0.76;

  useEffect(() => {
    const getDetails = async () => {
      const email = await AsyncStorage.getItem("EMAIL");
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      setName(user.data().name);
      setFireSteps(user.data().steps);
      setFireDistance(user.data().distancewalked);
    };
    getDetails();
  }, [isFocused]);
  useEffect(() => {
    let subscription;

    const subscribeToAccelerometer = async () => {
      subscription = Accelerometer.addListener((accelerometerData) => {
        calculateSteps(accelerometerData);
      });
    };

    const calculateSteps = (accelerometerData) => {
      const acceleration = Math.sqrt(
        accelerometerData.x ** 2 +
          accelerometerData.y ** 2 +
          accelerometerData.z ** 2
      );

      // Fine-tune these parameters based on testing
      const stepThreshold = 1.15;
      const stepDelay = 300; // Minimum time between steps in milliseconds

      if (acceleration > stepThreshold) {
        const currentTime = new Date().getTime();

        if (!isStepDetected && currentTime - lastStepTime > stepDelay) {
          setIsStepDetected(true);
          setLastStepTime(currentTime);

          setSteps((prevSteps) => prevSteps + 1);

          // Calculate distance based on step count and average step length
          setDistance((prevDistance) => prevDistance + averageStepLength);

          // Reset the step detection flag after a short delay
          setTimeout(() => {
            setIsStepDetected(false);
          }, 100);
        }
      }
    };

    const startAccelerometer = async () => {
      await Accelerometer.setUpdateInterval(100); // Set the update interval in milliseconds
      subscribeToAccelerometer();
    };

    startAccelerometer();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isStepDetected, lastStepTime]);
  const CurrentSteps = fireSteps + steps;
  const CurrentDistance = fireDistance + distance;
  // const setSendSteps = cuurentSteps;
  useEffect(() => {
    const timeout = setInterval(() => {
      const setDetails = async () => {
        const distanceWalked = Number(CurrentDistance);
        const steps = Number(CurrentSteps);
        const points = Number(newpoints);
        const email = await AsyncStorage.getItem("EMAIL");
        const userId = await AsyncStorage.getItem("USERID");

        await updateDoc(doc(store, "users", userId), {
          distancewalked: distanceWalked,
          steps: steps,
          walkpoints: points,
        }).catch((error) => {
          console.log(error.message);
        });
      };

      setDetails();
    }, 1000); // Update every 1 second

    return () => clearInterval(timeout);
  }, [CurrentDistance, CurrentSteps]);

  // // const DistanceNumber = parseFloat(fireDistance);
  const newpoints = CurrentSteps;
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginTop: "10%",
          marginLeft: "5%",
          columnGap: 5,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 55, fontWeight: "600" }}>
          {CurrentSteps}
        </Text>
        <Text
          style={{
            alignSelf: "flex-end",
            fontSize: 18,
            color: "#fff",
            marginBottom: 12,
            fontWeight: "600",
          }}
        >
          steps
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          backgroundColor: "#86DAB9",
          height: 10,
          alignSelf: "center",
          borderRadius: 10,
        }}
      />
      <View style={{ marginTop: 7, width: "90%", alignSelf: "center" }}>
        <Text style={{ color: "#A4A9A5" }}>Goal 7,500</Text>
      </View>
      <View
        style={{
          width: "90%",
          height: 450,
          alignSelf: "center",
          marginLeft: 30,
        }}
      >
        <Image
          source={require("../../assets/TreeWalk.png")}
          style={{ width: "100%", height: 400 }}
        />
      </View>
      <View
        style={{
          height: 90,
          backgroundColor: "#00523B",
          width: "90%",
          flexDirection: "row",
          alignSelf: "center",
          padding: 20,
          columnGap: 14,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            height: 60,
            width: 60,
            backgroundColor: "#83CEB0",
            borderRadius: 60,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons name="fire" color={"#00523B"} size={40} />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ color: "#C8F0E7", fontWeight: "600" }}>
            {CurrentDistance} kcal
          </Text>
          <Text style={{ color: "#C8F0E7" }}>Calorie burned</Text>
        </View>
      </View>
      <View
        style={{
          height: 90,
          backgroundColor: "#264B5D",
          width: "90%",
          flexDirection: "row",
          alignSelf: "center",
          padding: 20,
          columnGap: 14,
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <View
          style={{
            height: 60,
            width: 60,
            backgroundColor: "#ACD1E4",
            borderRadius: 60,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="map-marker-distance"
            color={"#264B5D"}
            size={40}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ color: "#D1E8F0", fontWeight: "600" }}>
            {CurrentDistance} m
          </Text>
          <Text style={{ color: "#D1E8F0" }}>Distance travelled</Text>
        </View>
      </View>
      <View
        style={{
          height: 90,
          backgroundColor: "#D1EAE4",
          width: "90%",
          flexDirection: "row",
          alignSelf: "center",
          padding: 20,
          columnGap: 14,
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <View
          style={{
            height: 60,
            width: 60,
            backgroundColor: "#4B6258",
            borderRadius: 60,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="chart-bubble"
            color={"#D1EAE4"}
            size={40}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ color: "#4B6258", fontWeight: "600" }}>
            {CurrentDistance} m
          </Text>
          <Text style={{ color: "#4B6258" }}>Carbon dioxide saved</Text>
        </View>
      </View>
      {/* <Text style={styles.header}>
        <Icon name="user" size={30} color="#2C3E50" /> {name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Icon name="heartbeat" size={20} color="#E74C3C" /> Steps:
          {CurrentSteps}
        </Text>
        <Text style={styles.infoText}>
          <Icon name="road" size={20} color="#3498DB" /> Distance:
          {CurrentDistance} meters
        </Text>
        <Text>{newpoints}</Text>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#000",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2C3E50",
  },
  infoContainer: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#34495E",
  },
});

export default StepCounter;
