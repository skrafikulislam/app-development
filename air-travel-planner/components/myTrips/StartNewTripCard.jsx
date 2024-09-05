import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

const StartNewTripCard = () => {
  const router = useRouter();

  return (
    <View
      style={{
        padding: 20,
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        gap: 25,
      }}
    >
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text
        style={{
          fontSize: 25,
          fontFamily: "outfit-medium",
        }}
      >
        No Trip Planned Yet
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit-regular",
          textAlign: "center",
          color: Colors.GRAY,
        }}
      >
        Looks Like It's Time For you to Plan An Excited Trip Planning With Our
        AI
      </Text>
      <Pressable
        onPress={() => router.push("/create-trip/search-place")}
        style={styles.button}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            textAlign: "center",
            fontSize: 19,
          }}
        >
          New Trip Planning
        </Text>
      </Pressable>
    </View>
  );
};

export default StartNewTripCard;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderRadius: 15,
    paddingHorizontal: 30,
  },
});
