import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDoc, doc } from "firebase/firestore";
import { store } from "../../firebase/firebase";

const AI = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(true);

  const openAIEndpoint = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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";

  const aiBotImage = require("../../assets/chat.png");

  useEffect(() => {
    const getDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem("USERID");
        const userDoc = doc(store, "users", userId);
        const user = await getDoc(userDoc);

        if (user.exists()) {
          const userName = user.data().name;
          setName(userName);

          const userImageUrl = user.data().imageUrl;
          setImage({ uri: userImageUrl });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (isFocused) {
      getDetails();
    }
  }, [isFocused, messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length, text: inputText, type: "user" },
    ]);
    setInputText("");

    try {
      const requestBody = {
        model: "gpt-3.5-turbo-1106",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: inputText,
          },
        ],
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      const response = await axios.post(openAIEndpoint, requestBody, {
        headers,
      });

      const answer =
        response.data.choices[0]?.message?.content ||
        "Sorry, I couldn't understand that.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: answer, type: "openai" },
      ]);
    } catch (error) {
      console.error("Error with OpenAI API:", error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              {
                alignSelf: item.type === "user" ? "flex-end" : "flex-start",
                margin: 5,
              },
            ]}
          >
            {item.type === "user" && image && (
              <Image source={image} style={styles.userImage} />
            )}
            {item.type === "openai" && (
              <Image source={aiBotImage} style={styles.botImage} />
            )}
            <Text
              style={[
                styles.messageText,
                {
                  backgroundColor:
                    item.type === "user" ? "lightblue" : "lightgreen",
                },
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your question..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity
          style={{ backgroundColor: "#00332b", padding: 10, borderRadius: 5 }}
          onPress={handleSendMessage}
        >
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  botImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  messageText: {
    padding: 10,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    columnGap: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 8,
    width: "70%",
  },
});

export default AI;
