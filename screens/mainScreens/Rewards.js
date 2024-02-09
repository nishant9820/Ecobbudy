import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import gameData from "../../extra/gameData";
import GameItem from "../../components/game/GameItem";
// import call from "react-native-phone-call";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, store } from "../../firebase/firebase";
import UserAvatar from "react-native-user-avatar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Rewards = () => {
  console.log("gameData");
  const [users, setUsers] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [points, getPoints] = useState("");

  useEffect(() => {
    const q = collection(store, "users");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempData = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        // Convert walkpoints to a number
        const walkpoints = parseInt(userData.walkpoints, 10);
        tempData.push({
          id: doc.id,
          ...userData,
          walkpoints,
          data: doc.data(),
        });
      });
      // Sort users by walkpoints in descending order
      tempData.sort((a, b) => b.walkpoints - a.walkpoints);
      setUsers(tempData);
    });

    // Clean-up function
    return () => unsubscribe();
  }, []);
  const getColor = (index) => {
    if (index === 0) return "#FDD017"; // yellow
    if (index === 1) return "#ADD8E6"; // light blue
    if (index === 2) return "#FFC0CB"; // light red
    return "#FFFFFF"; // default color
  };
  const getWitdth = (index) => {
    if (index === 0) return 0; // yellow
    if (index === 1) return 0; // light blue
    if (index === 2) return 0; // light red
    return 1; // default color
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.ad}>
        <View style={styles.bannerTextView}>
          <View>
            <Text style={{ color: "#000", fontSize: 35, fontWeight: 600 }}>
              Win
            </Text>
            <Text style={{ color: "#000", fontSize: 35, fontWeight: 600 }}>
              Exciting
            </Text>
            <Text style={{ color: "#000", fontSize: 35, fontWeight: 600 }}>
              Rewards
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={require("../../assets/wheel.png")}
            style={{ height: 150, width: 150 }}
          />
        </View>
      </View>

      <View style={{ marginTop: "7%", marginStart: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Gaming Zone</Text>
      </View>
      <View style={{ elevation: 5 }}>
        <FlatList
          data={gameData}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => <GameItem item={item} />}
        />
      </View>
      <View style={{ marginTop: "7%", marginStart: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Leaderboard</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{ ...styles.itemView, backgroundColor: getColor(index) }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    ...styles.imageContainer,
                    borderWidth: getWitdth(index),
                  }}
                >
                  {item.data.imageUrl ? (
                    <Image
                      source={{ uri: item.data.imageUrl }}
                      style={styles.userAvtar}
                    />
                  ) : (
                    <UserAvatar
                      style={styles.userAvtar}
                      name={item.data.name}
                      bgColor={"#fff"}
                      size={50}
                      textColor={"#000"}
                    />
                  )}
                </View>
                <View
                  style={{
                    width: "70%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.itemContentView}>
                    <Text style={{ ...styles.contentText, fontSize: 20 }}>
                      {item.data.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.pointsCounterView,
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: " green",
                    }}
                  >
                    <Text style={{ marginRight: 3 }}>
                      {item.data.walkpoints}
                    </Text>
                    <Text style={{ marginRight: 3 }}>Ecos</Text>
                    <MaterialCommunityIcons
                      onPress={() => navigation.openDrawer()}
                      name="leaf"
                      color={"green"}
                      size={20}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.itemBottomView}>
                <TouchableOpacity
                  onPress={() => {
                    triggerCall(item.data.mobile);
                  }}
                >
                  {/* <Feather name="phone-call" color={"#064F60"} size={34} /> */}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteUser(item.id);
                  }}
                >
                  {/* <AntDesign name="delete" color={"#064F60"} size={34} /> */}
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  ad: {
    width: "93%",
    backgroundColor: "#90ee90",
    height: 200,
    marginTop: "10%",
    borderRadius: 15,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    justifyContent: "center",
    columnGap: 5,
  },
  bannerTextView: {
    alignItems: "center",
    justifyContent: "flex-start",
    // marginStart: "8%",
  },
  itemView: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemFirstView: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "yellow",
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  userAvtar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  imageContainer: {
    // width: "30%",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 30,
  },
  itemContentView: {
    paddingVertical: 10,
  },
  contentText: {
    fontWeight: "bold",
    color: "#064F60",
    padding: 5,
    marginLeft: 5,
  },
  pointsCounterView: {
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "green",
    height: 30,
    borderWidth: 1,
    padding: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
});
