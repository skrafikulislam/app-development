import { View, Text, Image } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";

const UserTripCard = ({ trip }) => {
  const categories = [
    "dark",
    "trees",
    "nature",
    "abstract",
    "urban",
    "animals",
  ];

  const getRandomCategory = () => {
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const formatData = (data) => {
    return JSON.parse(data);
  };

  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      {/* As We do not have google maps api key which gives the refPhotoUrl we are using below static url , if you have api key just as the key and photo-ref = as per instructed in google documentation */}
      <Image
        source={`https://random-image-pepebigotes.vercel.app/api/random-image?category=${getRandomCategory()}`}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      />
      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
          }}
        >
          {trip?.locationName?.split(", ").slice(0, 2).join(" ")}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          {moment(formatData(trip?.tripData).startDate).format("DD MMM YYYY")}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          Travelling: {formatData(trip?.tripData).traveler?.title}
        </Text>
      </View>
    </View>
  );
};

export default UserTripCard;
