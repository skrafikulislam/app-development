import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const Login = () => {
  //? To change Route path use below and change the view/div to Pressable to use onpress //! as react native suppor folder routing as nextjs
  const router = useRouter();

  return (
    <View>
      <Image
        source={require("../assets/images/Travel2.png")}
        style={{
          width: "100%",
          height: 480,
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Travel Smarter with AI
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: 17,
            textAlign: "center",
            color: Colors.GRAY,
            marginTop: 20,
          }}
        >
          Our AI-powered travel planner takes the guesswork out of trip planning
          for you.
        </Text>
        <Pressable
          onPress={() => router.push("auth/sign-in")}
          style={styles.button}
        >
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 18,
              fontFamily: "outfit-bold",
              textAlign: "center",
            }}
          >
            Sign In With Google
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 99,
    marginTop: "6%",
  },
});
