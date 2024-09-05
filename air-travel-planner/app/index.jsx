import { Text, View } from "react-native";
import Login from "../components/Login";
import { auth } from "../configs/FirebaseConfig";
import { Redirect } from "expo-router";

export default function Index() {
  //? Check if the user is logged in or not

  const user = auth.currentUser;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* //? redirecting the user if logged in to mytrip tabs - automatically goes there */}
      {user ? <Redirect href={"/mytrip"} /> : <Login />}
    </View>
  );
}
