import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import { CreateTripContext } from "../../context/CreateTripContext";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const ReviewTrip = () => {
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

  const onClickContinue = () => {
    router.replace("/create-trip/generate-trip");
  };


  const cancelTripBuild = () => {
    router.replace("/create-trip/search-place");
    setTripData({});
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
        Review Your Trip
      </Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          Before Generating Your Trip, Please Review First
        </Text>

        {/* For Destination */}
        <View
          style={{
            marginTop: 50,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          {/* <Ionicons name="location-sharp" size={34} color="black" /> */}
          <Text
            style={{
              fontSize: 30,
            }}
          >
            📍
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Destination
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              {tripData?.locationInfo?.name?.split(", ")[0]}
            </Text>
          </View>
        </View>
        {/* Date Selection */}
        <View
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          {/* <Ionicons name="location-sharp" size={34} color="black" /> */}
          <Text
            style={{
              fontSize: 30,
            }}
          >
            📅
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Travel Date
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              {moment(tripData?.startDate).format("DD MMM") +
                " To " +
                moment(tripData?.endDate).format("DD MMM") +
                " "}
              ({tripData?.totaldays} Days)
            </Text>
          </View>
        </View>
        {/* Travelers Selection */}
        <View
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          {/* <Ionicons name="location-sharp" size={34} color="black" /> */}
          <Text
            style={{
              fontSize: 30,
            }}
          >
            ✈️
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Traveling With
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              {tripData?.traveler?.title}
            </Text>
          </View>
        </View>
        {/* Budget Information */}
        <View
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          {/* <Ionicons name="location-sharp" size={34} color="black" /> */}
          <Text
            style={{
              fontSize: 30,
            }}
          >
            💲
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Your Budget
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              {tripData?.budget}
            </Text>
          </View>
        </View>
      </View>
      <Pressable
        onPress={onClickContinue}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 60,
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
          Build My Trip
        </Text>
      </Pressable>
      <Pressable
        onPress={cancelTripBuild}
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 30,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          Cancel
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewTrip;
