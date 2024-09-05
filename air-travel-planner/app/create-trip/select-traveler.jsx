import { View, Text, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, router, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import { SelectTravelsList } from "../../constants/Options";
import Optioncard from "../../components/CreateTrip/Optioncard";
import { CreateTripContext } from "../../context/CreateTripContext";

const selectTraveler = () => {
  const navigation = useNavigation();

  const [selectedtraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    setTripData({ ...tripData, traveler: selectedtraveler });
  }, [selectedtraveler]);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

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
          fontSize: 35,
          fontFamily: "outfit-bold",
          marginTop: 20,
        }}
      >
        Who is Traveling
      </Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 23,
          }}
        >
          Choose Your Travel Type
        </Text>
        <FlatList
          //? works same as map in js
          data={SelectTravelsList}
          renderItem={({ item, i }) => (
            <Pressable
              onPress={() => setSelectedTraveler(item)}
              style={{
                marginVertical: 10,
              }}
              key={i}
            >
              <Optioncard option={item} selectedOption={selectedtraveler} />
            </Pressable>
          )}
        />
      </View>

      <Pressable
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 20,
        }}
      >
        <Link
          style={{
            width: "100%",
            textAlign: "center",
          }}
          href={"/create-trip/select-dates"}
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
        </Link>
      </Pressable>
    </View>
  );
};

export default selectTraveler;
