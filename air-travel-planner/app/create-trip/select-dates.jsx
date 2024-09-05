import {
  View,
  Text,
  Pressable,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import CalendarPicker from "react-native-calendar-picker";
import { CreateTripContext } from "../../context/CreateTripContext";
import moment from "moment";

const SelectDate = () => {
  const navigation = useNavigation();

  const { tripData, setTripData } = useContext(CreateTripContext);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const onDateChange = (date, type) => {
    if (type == "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelectionContinue = () => {
    if (!startDate && !endDate) {
      if (Platform.OS === "web") {
        alert("Please Select Dates To Proceed"); // Using 'alert' for web
      } else {
        Alert.alert("Please Select Dates To Proceed");
        ToastAndroid.show("Please Select Dates To Proceed", ToastAndroid.SHORT); // For Android/iOS
      }
      return;
    } else {
      const totalNoOfDays = endDate.diff(startDate, "days");
      //   console.log(totalNoOfDays);
      setTripData({
        ...tripData,
        startDate: startDate,
        endDate: endDate,
        totaldays: totalNoOfDays + 1,
      });
    }

    router.push("/create-trip/select-budget");
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          marginTop: 20,
        }}
      >
        Travel Dates
      </Text>
      <View
        style={{
          marginTop: 50,
        }}
      >
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY,
          }}
          selectedDayTextStyle={{ color: Colors.WHITE }}
        />
      </View>
      <Pressable
        onPress={onDateSelectionContinue}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 35,
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

export default SelectDate;
