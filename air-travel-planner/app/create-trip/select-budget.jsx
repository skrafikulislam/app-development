import {
  View,
  Text,
  FlatList,
  Pressable,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { SelectBudgetOptions } from "../../constants/Options";
import Optioncard from "../../components/CreateTrip/Optioncard";
import { CreateTripContext } from "../../context/CreateTripContext";

const SelectBudget = () => {
  const [selectedOption, setSelectedOption] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  const navigation = useNavigation();

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    selectedOption &&
      setTripData({
        ...tripData,
        budget: selectedOption?.title,
      });
  }, [selectedOption]);

  const onClickContinue = () => {
    if (!selectedOption) {
      if (Platform.OS === "web") {
        alert("Please Select Your Budget To Proceed"); // Using 'alert' for web
      } else {
        Alert.alert("Please Select Your Budget To Proceed");
        ToastAndroid.show(
          "Please Select Your Budget To Proceed",
          ToastAndroid.SHORT
        ); // For Android/iOS
      }
      return;
    } else {
      router.push("/create-trip/review-trip");
    }
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        height: "100%",
        backgroundColor: Colors.WHITE,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          marginTop: 20,
          fontSize: 35,
        }}
      >
        Budget
      </Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          Choose Spending For Your Trip
        </Text>

        <FlatList
          data={SelectBudgetOptions}
          renderItem={({ item, i }) => (
            <Pressable
              onPress={() => setSelectedOption(item)}
              key={i}
              style={{
                marginVertical: 10,
              }}
            >
              <Optioncard option={item} selectedOption={selectedOption} />
            </Pressable>
          )}
        />
      </View>
      <Pressable
        onPress={onClickContinue}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          Continue
        </Text>
      </Pressable>
    </View>
  );
};

export default SelectBudget;
