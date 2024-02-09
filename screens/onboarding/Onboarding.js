import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import Onboardingitem from "../../components/onboardingComponent/Onboardingitem.js";
import Paginator from "../../components/onboardingComponent/Paginator.js";
import Slides from "../../extra/Slides.js";
import { useNavigation } from "@react-navigation/native";

export default Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const navigation = useNavigation();
  const scrollTo = () => {
    if (currentIndex < Slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("AppStack");
    }
  };
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 300,
          width: 300,
          borderBottomLeftRadius: 300,
          backgroundColor: "green",
          opacity: 0.2,
          position: "absolute",
          right: "-20%",
          top: "-5%",
        }}
      ></View>
      <View style={{ flex: 3 }}>
        <FlatList
          data={Slides}
          renderItem={({ item }) => <Onboardingitem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
      <Paginator data={Slides} scrollX={scrollX} />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("AppStack");
            // currentLogin();
          }}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: "bold",
              letterSpacing: 0.25,
              color: "#115C03",
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={scrollTo}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 50,
            width: 50,
            borderTopRightRadius: 50,
            backgroundColor: "green",
            opacity: 0.2,
            position: "absolute",
            left: "-9%",
            bottom: "-5%",
          }}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 100,
    backgroundColor: "#fff",
    marginBottom: -34,
    marginRight: 250,
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 100,
    backgroundColor: "#115C03",
    marginBottom: 7,
    marginLeft: 250,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
