import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const PlacesVisit = ({ places }) => {
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
  return (
    <ScrollView
      style={{
        marginTop: 20,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 24,
          marginBottom: 20,
          color: "#2A2A2A",
        }}
      >
        🗾 Places To Visit
      </Text>

      {places?.map((place, i) => (
        <View
          key={i}
          style={{
            marginBottom: i === places.length - 1 ? 5 : 30,
            padding: 16,
            backgroundColor: "#F8F8F8",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <Image
            source={{
              uri:
                // place.image_url ||
                `https://random-image-pepebigotes.vercel.app/api/random-image?category=${getRandomCategory()}`,
            }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 8,
              marginBottom: 10,
            }}
          />

          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 22,
              marginBottom: 5,
              color: "#333",
            }}
          >
            {place.name}
          </Text>

          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 16,
              marginBottom: 10,
              color: "#555",
            }}
          >
            {place.details}
          </Text>

          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 16,
              color: "#888",
            }}
          >
            📍 Coordinates:{" "}
            <Text
              style={{
                fontFamily: "outfit-bold",
                color: Colors.PRIMARY,
              }}
            >
              {place.geo_coordinates}
            </Text>
          </Text>

          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 16,
              color: "#888",
            }}
          >
            🎟️ Ticket Pricing:{" "}
            <Text
              style={{
                fontFamily: "outfit-bold",
                color: Colors.PRIMARY,
              }}
            >
              {place.ticket_pricing}
            </Text>
          </Text>

          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 16,
              color: "#888",
            }}
          >
            ⏳ Time to Travel:{" "}
            <Text
              style={{
                fontFamily: "outfit-bold",
                color: Colors.PRIMARY,
              }}
            >
              {place.time_to_travel}
            </Text>
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default PlacesVisit;
