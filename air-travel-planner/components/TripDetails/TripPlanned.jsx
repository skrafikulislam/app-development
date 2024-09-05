import { View, Text, Image } from "react-native";
import React from "react";

const TripPlanned = ({ tripPlan }) => {
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
    <View
      style={{
        marginTop: "-60%",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 24,
        }}
      >
        🏕️ Plan Details
      </Text>
      {tripPlan?.map((item, i) => (
        <View key={i} style={{ marginBottom: 30 }}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 22,
              color: "#4C4C4C",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {item.day}
          </Text>
          {/* Image before the day's plan */}
          <Image
            // ? here we are using random images as the gemini does not provide valid urls to different places
            source={{
              uri: `https://random-image-pepebigotes.vercel.app/api/random-image?category=${getRandomCategory()}`,
            }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginBottom: 10,
            }}
          />

          {item?.schedule?.map((place, j) => (
            <View
              key={j}
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
                gap: 20,
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor: "#F0F0F5",
                borderRadius: 8,
                marginBottom: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 18,
                  color: "#333",
                }}
              >
                ⏰ {place.time}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  fontSize: 18,
                  color: "#666",
                }}
              >
                📍 {place.activity}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default TripPlanned;
