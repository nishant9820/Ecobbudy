import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/core";
import { store } from "../../firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Ticket = () => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const [name, setName] = useState("");
  const {
    data1,
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    data8,
    data9,
    data10,
  } = route.params;
  useEffect(() => {
    const getDetails = async () => {
      const email = await AsyncStorage.getItem("EMAIL");
      const userId = await AsyncStorage.getItem("USERID");
      const user = await getDoc(doc(store, "users", userId));
      setName(user.data().name);
    };
    getDetails();
  }, [isFocused]);
  return (
    <View
      style={{
        backgroundColor: "#00332b",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: "80%",
          width: "90%",
          backgroundColor: "#fff",
          alignSelf: "center",
          borderRadius: 20,
        }}
      >
        <Image
          source={data6}
          style={{
            height: 160,
            width: "90%",
            borderRadius: 25 / 2,
            overflow: "hidden",
            alignSelf: "center",
            margin: 10,
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            marginLeft: 20,
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 5,
          }}
        >
          {data1}
        </Text>
        <Text style={{ marginLeft: 20, fontWeight: "bold", marginTop: 5 }}>
          {data3} ~ {data2}
        </Text>
        <View
          style={{
            height: 0.2,
            width: "90%",
            backgroundColor: "grey",
            alignSelf: "center",
            marginTop: 10,
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <View style={{ rowGap: 10 }}>
            <View>
              <Text style={{ fontWeight: "bold" }}>Name</Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>{name}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold" }}>Date</Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>{data3}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold" }}>Meeting Point</Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>{data10}</Text>
            </View>
          </View>
          <View style={{ rowGap: 10 }}>
            <View>
              <Text style={{ fontWeight: "bold" }}>Order Number</Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>{data8}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold" }}>Time</Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>{data9}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: "#00332b",
              borderRadius: 40,
              left: -20,
            }}
          />
          <View
            style={{
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 1,
              height: 0,
              width: "98%",
              left: -20,
            }}
          ></View>
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: "#00332b",
              borderRadius: 40,
              left: -53,
            }}
          />
        </View>
        <Image
          source={require("../../assets/volunteer/barcode.png")}
          style={{
            height: 160,
            width: "90%",
            borderRadius: 25 / 2,
            overflow: "hidden",
            alignSelf: "center",
            marginTop: -15,
          }}
          resizeMode="cover"
        />
        <Text style={{ alignSelf: "center", marginTop: -10 }}>
          Scan your barcode at entry gate
        </Text>
      </View>
    </View>
  );
};

export default Ticket;

const styles = StyleSheet.create({});
