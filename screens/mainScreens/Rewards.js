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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, store } from "../../firebase/firebase";
import UserAvatar from "react-native-user-avatar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";
const Rewards = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [points, getPoints] = useState("");
  const isFocused = useIsFocused();
  const handlePress = () => {
    Clipboard.setString("ABC678BDC");
    console.log("Text copied to clipboard: ABC678BDC");
  };

  useEffect(() => {
    const getDetails = async () => {
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      // setUserName(user.data().name);
      // setEmail(user.data().email);
      getPoints(user.data().totalpoints);
      setLoading(false);
    };
    getDetails();
  }, [isFocused]);

  useEffect(() => {
    const q = collection(store, "users");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempData = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        // Convert walkpoints to a number
        const totalpoints = parseInt(userData.totalpoints, 10);
        tempData.push({
          id: doc.id,
          ...userData,
          totalpoints,
          data: doc.data(),
        });
      });
      // Sort users by walkpoints in descending order
      tempData.sort((a, b) => b.totalpoints - a.totalpoints);
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
          <Text style={{ alignSelf: "flex-start", fontSize: 15 }}>
            10% Discount
          </Text>
        </View>
        <View>
          <Image
            source={require("../../assets/wheel.png")}
            style={{ height: 150, width: 150 }}
          />
        </View>
      </View>

      <View style={{ marginTop: "7%", marginStart: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>
          Gaming Zone{points}
        </Text>
      </View>
      <View style={{ elevation: 5, marginLeft: 15 }}>
        <FlatList
          data={gameData}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => <GameItem item={item} />}
        />
      </View>
      <View style={{ marginTop: "7%", marginStart: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Rewards</Text>
      </View>
      <ScrollView horizontal style={{ flexDirection: "row", padding: 15 }}>
        {points > 100 ? (
          <TouchableOpacity
            onPress={handlePress}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 100 points
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => alert("Not Enough Points")}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 100 points
            </Text>
          </TouchableOpacity>
        )}
        {points > 500 ? (
          <TouchableOpacity
            onPress={handlePress}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 500 points
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => alert("Not Enough Points")}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 500 points
            </Text>
          </TouchableOpacity>
        )}

        {points > 1000 ? (
          <TouchableOpacity
            onPress={handlePress}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 1000 points
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => alert("Not Enough Points")}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 1000 points
            </Text>
          </TouchableOpacity>
        )}
        {points > 1500 ? (
          <TouchableOpacity
            onPress={handlePress}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 1500 points
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => alert("Not Enough Points")}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 1500 points
            </Text>
          </TouchableOpacity>
        )}
        {points > 2000 ? (
          <TouchableOpacity
            onPress={handlePress}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 2000 points
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => alert("Not Enough Points")}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 2000 points
            </Text>
          </TouchableOpacity>
        )}
        {points > 2500 ? (
          <TouchableOpacity
            onPress={handlePress}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 2500 points
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => alert("Not Enough Points")}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 2500 points
            </Text>
          </TouchableOpacity>
        )}
        {points > 3000 ? (
          <TouchableOpacity
            onPress={handlePress}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
              marginRight: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 3000 points
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => alert("Not Enough Points")}
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#fff",
              borderRadius: 10,
              zIndex: 99,
              elevation: 6,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              marginBottom: 10,
              marginRight: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              At 3000 points
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
                      {item.data.totalpoints}
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
