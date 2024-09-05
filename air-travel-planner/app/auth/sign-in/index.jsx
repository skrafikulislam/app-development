import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../configs/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  //? To disable to the top of app navigate path text where navigate route path displays
  const navigation = useNavigation();
  //? TO change routing path on click button
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //! router.push = when click back tick gonna route to the previous page
  //! router.replace = when click back tick gonna route to the landing page

  const signInMethod = () => {
    if (!email || !password) {
      //? This below message only works on andrioid but here i am using web environment so i have to use alert
      // ToastAndroid.show("Please Enter All Details", ToastAndroid.SHORT);

      if (Platform.OS === "web") {
        alert("Please Enter Email And Password"); // Using 'alert' for web
      } else {
        Alert.alert("Validation Error", "Please Enter All Details");
        ToastAndroid.show("Please Enter All Details", ToastAndroid.SHORT); // For Android/iOS
      }

      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.replace("/mytrip");
        // console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/invalid-credential") {
          if (Platform.OS === "web") {
            alert("Email Or Password is Incorrect - Please Try Again"); // Using 'alert' for web
          } else {
            Alert.alert(
              "Validation Error",
              "Email Or Password is Incorrect - Please Try Again"
            );
            ToastAndroid.show(
              "Email Or Password is Incorrect - Please Try Again",
              ToastAndroid.SHORT
            ); // For Android/iOS
          }
        }
      });
  };

  //? To disable to the top of app navigate path text where navigate route path displays
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 50,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginTop: 28,
        }}
      >
        Sign In
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 20,
        }}
      >
        Welcome User
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 10,
        }}
      >
        Let's Explore !!
      </Text>
      <View
        style={{
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-regular",
          }}
        >
          Email
        </Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
          placeholder="Enter Email"
          value={email}
        />
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-regular",
          }}
        >
          Password
        </Text>
        <TextInput
          onChangeText={(value) => setPassword(value)}
          //? Works same as type:password in inputs
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password"
          value={password}
        />
      </View>
      {/* Sign In Button */}
      <Pressable onPress={signInMethod} style={styles.button}>
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 18,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Sign In
        </Text>
      </Pressable>

      {/* Sign Up Button */}

      <Pressable
        onPress={() => router.replace("auth/sign-up")}
        style={{
          backgroundColor: Colors.WHITE,
          padding: 20,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            fontSize: 18,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Create New Account
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    fontFamily: "outfit-regular",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderRadius: 15,
    marginTop: 50,
  },
});
