import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { auth, store } from "../../firebase/firebase";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { signOut } from "firebase/auth";
import PieChart from "react-native-pie-chart";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Newsitem from "../../components/news/Newsitem";
import { FlatList } from "react-native";

HomeScreen = () => {
  const navigation = useNavigation();
  const [focused, setFocused] = useState();
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState(0);
  const isFocused = useIsFocused();
  const [orangepoints, setOrangepoints] = useState(0);
  const [yellowpoints, setYellowpoints] = useState(0);
  const [bluepoints, setBluepoints] = useState(0);
  const [pinkpoints, setPinkpoints] = useState(0);
  const widthAndHeight = 100;
  const seriesnull = [];

  const [news, setNews] = useState([]);
  const [points, getPoints] = useState("");
  const [timePoints, setTimePoints] = useState(null);
  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual News API key
    const apiKey = "65e13369d8ce42cc9ac56565f4b78d06";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setNews(response.data.articles.slice(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      const email = await AsyncStorage.getItem("EMAIL");
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      setName(user.data().name);
      getPoints(user.data().walkpoints);
      setOrangepoints(user.data().walkmore || 0);
      setYellowpoints(user.data().shopwisely || 0);
      setBluepoints(user.data().plantatree || 0);
      setPinkpoints(user.data().saveenergy || 0);
    };
    getDetails();
  }, [isFocused]);
  const TotalPoints = points + timePoints;
  const logOut = async () => {
    await AsyncStorage.setItem("EMAIL", "");
    await AsyncStorage.setItem("USERID", "");
    alert("Logout Successfull");
    navigation.replace("AppStack");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the minutes every minute
      setMinutes((prevMinutes) => prevMinutes + 1);
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const numMinutes = parseFloat(minutes);

    if (!isNaN(numMinutes)) {
      // Perform your calculation here
      const calculatedTimePoints = numMinutes;

      // Limit the result to two decimal places
      const roundedTimePoints = parseFloat(calculatedTimePoints.toFixed(2));

      setTimePoints(roundedTimePoints);
    } else {
      // Handle invalid input
      setTimePoints(null);
    }
  }, [minutes]);
  const nonseries = [50, 50, 50, 50];
  const series = [orangepoints, yellowpoints, bluepoints, pinkpoints];
  const sliceColor = ["#FFA500", "#FFD700", "#1E90FF", "#FFC0CB"];
  const total = series.reduce((acc, value) => acc + value, 0);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            onPress={() => {
              navigation.openDrawer(), setFocused;
            }}
            name={focused ? "open-menu" : "menu"}
            style={{ marginBottom: 4 }}
            size={29}
            // color={colour ? colour : "#ffffff40"}
          />
          <Text>{timePoints}</Text>
        </View>
        <View style={styles.rightHeader}>
          <View style={styles.pointsCounterView}>
            <Text style={{ marginRight: 3 }}>{TotalPoints}</Text>
            <Text style={{ marginRight: 3 }}>Ecos</Text>
            <MaterialCommunityIcons
              onPress={() => navigation.openDrawer()}
              name="leaf"
              color={"green"}
              size={20}
            />
          </View>
          <MaterialCommunityIcons
            name="bell"
            color={"black"}
            style={{ marginLeft: 10 }}
            size={29}
          />

          <TouchableOpacity style={styles.userAvtar}>
            {name ? (
              <Ionicons
                name="exit-outline"
                size={29}
                onPress={() => {
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                      logOut();
                    })
                    .catch((error) => {
                      // An error happened.
                      console.log(error);
                    });
                }}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Account");
                }}
              >
                <Image
                  alt="Not find"
                  source={require("../../assets/Gogglelogo.png")}
                  style={{ height: 25, width: 25 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.introView}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>Hey,</Text>
          <Text style={{ fontSize: 26, fontWeight: "bold", marginLeft: 3 }}>
            {name}
          </Text>
        </View>
        <Text style={{ fontSize: 14, marginTop: 2, fontWeight: 500 }}>
          Your contribution to society is exceptional!
        </Text>
      </View>
      <View style={styles.pieView}>
        <Image
          alt="Not find"
          source={require("../../assets/leaf.png")}
          style={styles.leaf}
        />
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#fff",
              marginTop: -8,
            }}
          >
            Good Going,‎
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#fff",
              marginTop: -8,
              marginLeft: 3,
            }}
          >
            {name}
          </Text>
        </View>
        <View style={styles.ratingView}>
          <View
            style={{
              height: 100,
              width: 100,
              borderWidth: 1,
              borderRadius: 100,
              // borderColor: "#fff",
            }}
          >
            {/* <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.75}
              coverFill={"#013303"}
              doughnut={true}
              delay={6000}
            /> */}
            {total > 0 ? (
              <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
                coverRadius={0.75}
                coverFill={"#013303"}
                // doughnut={true}
                delay={6000}
              />
            ) : (
              <PieChart
                widthAndHeight={widthAndHeight}
                series={nonseries}
                sliceColor={sliceColor}
                coverRadius={0.75}
                coverFill={"#013303"}
                // doughnut={true}
                delay={6000}
              />
            )}
          </View>
          <View style={{}}>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <View
                style={{ ...styles.infoCircel, backgroundColor: "yellow" }}
              />
              <Text style={styles.infoText}>Shop Wisely</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 2 }}>
              <View
                style={{ ...styles.infoCircel, backgroundColor: "#00B0FF" }}
              />
              <Text style={styles.infoText}>Plant a Tree</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 2 }}>
              <View style={{ ...styles.infoCircel, backgroundColor: "pink" }} />
              <Text style={styles.infoText}>Save Energy</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 2 }}>
              <View
                style={{ ...styles.infoCircel, backgroundColor: "orange" }}
              />
              <Text style={styles.infoText}>Walk More</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.introView}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Things you Can do
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 22,
          marginRight: 22,
          justifyContent: "space-between",
        }}
      >
        <View style={{ rowGap: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Eco-Shop")}
            style={{
              ...styles.cardContainer,
              backgroundColor: "#FFEAE0",
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                alignItems: "center",
                backgroundColor: "#FFBC9B",
              }}
            >
              <MaterialCommunityIcons
                name="bell"
                style={{ marginTop: 7 }}
                color={"black"}
                size={31}
              />
            </View>
            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
              Shop Wisely
            </Text>
            <Text style={{ marginTop: 5 }}>Eco Store</Text>
          </TouchableOpacity>
          <View style={{ ...styles.cardContainer, backgroundColor: "#FFE0FF" }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F69BFF",
              }}
            >
              <Image
                source={require("../../assets/donation.png")}
                style={{ height: 35, width: 35, alignSelf: "center" }}
              />
            </View>
            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
              Donate More
            </Text>
            <Text style={{ marginTop: 5 }}>EcoStar</Text>
          </View>
          <View style={{ ...styles.cardContainer, backgroundColor: "#E1FFE0" }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                alignItems: "center",
                backgroundColor: "#BBFF9B",
              }}
            >
              <MaterialCommunityIcons
                name="pine-tree"
                style={{ marginTop: 7 }}
                color={"black"}
                size={31}
              />
            </View>
            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
              Plant a Tree
            </Text>
            <Text style={{ marginTop: 5 }}>EcoTree</Text>
          </View>
        </View>
        <View style={{ rowGap: 10, marginTop: "5%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Challenges")}
            style={{ ...styles.cardContainer, backgroundColor: "#FCFFE0" }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                alignItems: "center",
                backgroundColor: "#FCFF9B",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {/* <MaterialCommunityIcons
                name="bell"
                style={{ marginTop: 7 }}
                color={"black"}
                size={31}
              /> */}
              <Image
                source={require("../../assets/trophy.png")}
                resizeMode="contain"
                style={{ height: 35, width: 35, alignSelf: "center" }}
              />
            </View>
            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
              Daily Challenge
            </Text>
            <Text style={{ marginTop: 5 }}>EcoHero</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Volunteer")}
            style={{ ...styles.cardContainer, backgroundColor: "#E0FFFE" }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                alignItems: "center",
                backgroundColor: "#9BFFFA",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/drive.png")}
                style={{ height: 35, width: 35, alignSelf: "center" }}
              />
            </View>
            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
              Volunteer More
            </Text>
            <Text style={{ marginTop: 5 }}>EcoHuman</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Walk")}
            style={{ ...styles.cardContainer, backgroundColor: "#E0E4FF" }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 30,
                alignItems: "center",
                backgroundColor: "#9BA9FF",
              }}
            >
              <MaterialCommunityIcons
                name="walk"
                style={{ marginTop: 10 }}
                color={"black"}
                size={31}
              />
            </View>
            <Text style={{ marginTop: 5, fontWeight: "bold" }}>Walk More</Text>
            <Text style={{ marginTop: 5 }}>EcoDude</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          ...styles.introView,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Latest News</Text>
        <Text
          onPress={() => navigation.navigate("News")}
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#7D817D",
            marginTop: 8,
          }}
        >
          See all
        </Text>
      </View>
      <View style={{ rowGap: 10 }}>
        <FlatList
          data={news}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <Newsitem item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fbedcd",
          height: 150,
          marginTop: 30,
          padding: 5,
        }}
      >
        <View>
          <Text
            style={{
              marginLeft: 8,
              fontSize: 30,
              color: "#C4A484",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Gateway
          </Text>
          <Text
            style={{
              marginLeft: 8,
              fontSize: 30,
              color: "#C4A484",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            to a better
          </Text>
          <Text
            style={{
              marginLeft: 8,
              fontSize: 30,
              color: "#C4A484",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            living
          </Text>
        </View>
        <Image
          style={{ paddingLeft: 200, marginTop: -3, width: 140, height: 130 }}
          source={require("../../assets/snow.png")}
        />
      </View>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10%",
    marginRight: 20,
    marginLeft: 20,
  },
  rightHeader: {
    flexDirection: "row",
  },
  pointsCounterView: {
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "green",
    height: "auto",
    borderWidth: 1,
    padding: 4,
    borderRadius: 6,
  },
  userAvtar: {
    height: 32,
    width: 32,
    borderRadius: 100,
    // borderWidth: 1,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  introView: {
    margin: 20,
  },
  ratingView: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  pieView: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    borderWidth: 1,
    padding: 25,
    borderRadius: 20,
    backgroundColor: "#013303",
  },
  leaf: {
    height: 80,
    width: 80,
    position: "absolute",
    right: -20,
    top: -20,
  },
  infoCircel: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 100,
  },
  infoText: { color: "#fff", fontWeight: "500", marginLeft: 10 },
  cardContainer: {
    alignItems: "center",
    padding: 30,
    borderRadius: 25,
  },
  newsContainer: {
    borderWidth: 1,
    flexDirection: "row",
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
  newsImage: {
    height: 100,
    width: 60,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
  },
  newsContentContainer: {
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  dateviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    height: "auto",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 120,
    borderRadius: 20,
    elevation: 20,
  },
  moduleheader: {
    width: "100%",
    height: 40,
    // alignItems: "flex-start",
    justifyContent: "center",
  },
  moduleheader1: {
    width: "100%",
    height: 70,
    // alignItems: "flex-start",
    justifyContent: "center",
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
});
