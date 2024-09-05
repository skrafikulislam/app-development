import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";

const SignUp = () => {
  //? To disable to the top of app navigate path text where navigate route path displays
  const navigation = useNavigation();
  //? TO change routing path on click button
  const router = useRouter();

  //! router.push = when click back tick gonna route to the previous page
  //! router.replace = when click back tick gonna route to the landing page

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //? To disable to the top of app navigate path text where navigate route path displays
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onCreateAccount = () => {
    if (!email || !password || !name) {
      //? This below message only works on andrioid but here i am using web environment so i have to use alert
      // ToastAndroid.show("Please Enter All Details", ToastAndroid.SHORT);

      if (Platform.OS === "web") {
        alert("Please Enter All Details"); // Using 'alert' for web
      } else {
        Alert.alert("Validation Error", "Please Enter All Details");
        ToastAndroid.show("Please Enter All Details", ToastAndroid.SHORT); // For Android/iOS
      }

      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        router.replace("/mytrip");
        // console.log(user);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        // ..
      });

    if (Platform.OS === "web") {
      alert("Sign Up Successfully"); // Using 'alert' for web
    } else {
      Alert.alert("Validation Error", "Error On Sign Up - Try Later");
      ToastAndroid.show("Error On Sign Up - Try Later", ToastAndroid.SHORT); // For Android/iOS
    }
  };

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
          marginTop: 30,
        }}
      >
        Create New Account
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 20,
        }}
      >
        Create Account to Explore
      </Text>
      {/* User Full Name */}
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
          Full Name
        </Text>
        <TextInput
          onChangeText={(value) => setName(value)}
          style={styles.input}
          placeholder="Enter Your Full Name"
          value={name}
        />
      </View>
      {/* Email Here */}
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
          Email
        </Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
          placeholder="Enter Email"
          value={email}
        />
      </View>
      {/* Password Here */}
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
      <Pressable onPress={onCreateAccount} style={styles.button}>
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 18,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Create New Account
        </Text>
      </Pressable>

      {/* Sign Up Button */}

      <Pressable
        onPress={() => router.replace("auth/sign-in")}
        style={{
          backgroundColor: Colors.WHITE,
          padding: 20,
          borderRadius: 15,
          marginTop: 30,
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
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;

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
    marginTop: 40,
  },
});
