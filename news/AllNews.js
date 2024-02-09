import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Video } from "expo-av";
import { useIsFocused } from "@react-navigation/native";
import Newsitem from "../components/news/Newsitem";

const AllNews = ({ navigation }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual News API key
    const apiKey = "65e13369d8ce42cc9ac56565f4b78d06";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);
  useEffect(() => {
    setTimeout(async () => {
      //   navigation.replace("OnboardingScreen");
    }, 6000);
  }, []);
  const [status, setStatus] = React.useState({});
  return (
    <ScrollView style={styles.container}>
      <Text
        style={{ padding: 15, fontSize: 15, fontWeight: 800, marginTop: "8%" }}
      >
        Explore More
      </Text>
      <View
        style={{
          borderRadius: 10,
          width: "92%",
          backgroundColor: "#90ee90",
          alignSelf: "center",
          padding: 25,
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View>
          <View>
            <View>
              <Text style={{ color: "#000", fontSize: 25, fontWeight: 700 }}>
                There's a Plant
              </Text>
              <Text style={{ color: "#000", fontSize: 25, fontWeight: 700 }}>
                for everyone
              </Text>
            </View>
            <View style={{ marginTop: 25 }}>
              <Text style={{ color: "#000", fontWeight: "bold" }}>
                Get your 1st plant
              </Text>
              <Text style={{ color: "#000", fontWeight: "bold" }}>
                @ 40% off
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, padding: 15 }}>
        <Text style={{ fontSize: 25, fontWeight: "800", marginLeft: 5 }}>
          Lets Make The World
        </Text>
        <Text style={{ fontSize: 25, fontWeight: "800", marginLeft: 5 }}>
          A Better Place
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "grey",
            marginTop: 10,
            fontWeight: 600,
            marginLeft: 2,
          }}
        >
          Explore latest breakthroughs, celebrate climate victories, and
          discover eco-innovations paving the way for a greener and more
          sustainable tomorrow
        </Text>
      </View>
      <View>
        <FlatList
          data={news}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <Newsitem item={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{ height: 50, width: 50 }}></View>
    </ScrollView>
  );
};

export default AllNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: "200",
  },
  video: {
    flex: 1,
    alignSelf: "auto",
    height: "200",
    width: "200",
  },
  buttons: {
    margin: 16,
  },
});
