import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

const UserTripList = ({ userTrips }) => {
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
  // Parse tripData into an object
  const tripData = JSON.parse(userTrips[0]?.tripData);
  const router = useRouter();

  return (
    <View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        {/* As We do not have google maps api key which gives the refPhotoUrl we are using below static url , if you have api key just as the key and photo-ref = as per instructed in google documentation */}
        {tripData?.locationInfo ? (
          <Image
            source={
              "https://random-image-pepebigotes.vercel.app/api/random-image?category=urban"
            }
            style={{
              width: "100%",
              height: 260,
              objectFit: "cover",
              borderRadius: 15,
            }}
          />
        ) : (
          <Image
            source={
              "https://random-image-pepebigotes.vercel.app/api/random-image?category=nature"
            }
            style={{
              width: "100%",
              height: 260,
              objectFit: "cover",
              borderRadius: 15,
            }}
          />
        )}

        <View
          style={{
            marginTop: 12,
          }}
        >
          {/* Access the name property from locationInfo */}
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            {userTrips[0]?.locationName?.split(", ").slice(0, 2).join(" ")}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 18,
                color: Colors.GRAY,
              }}
            >
              {moment(tripData?.startDate).format("DD MMM YYYY")}
            </Text>
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 18,
                color: Colors.GRAY,
              }}
            >
              🚌 {tripData?.traveler?.title}
            </Text>
          </View>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/trip-detail",
                params: {
                  trip: JSON.stringify(userTrips[0]),
                },
              })
            }
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 15,
              borderRadius: 15,
              marginTop: 18,
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: "center",
                fontFamily: "outfit-medium",
                fontSize: 18,
              }}
            >
              SEE YOUR PLAN
            </Text>
          </Pressable>
        </View>
        {/* {userTrips.map((trip, i) => (
          <UserTripCard trip={trip} key={i} />
        ))} */}
        {userTrips.map((trip, i) => (
          <Pressable
            key={i}
            onPress={() =>
              router.push({
                pathname: "/trip-detail",
                params: {
                  trip: JSON.stringify(trip),
                },
              })
            }
          >
            <UserTripCard trip={trip} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default UserTripList;
