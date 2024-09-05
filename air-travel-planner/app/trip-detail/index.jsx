// import { View, Text, Image } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useLocalSearchParams, useNavigation } from "expo-router";
// import { Colors } from "../../constants/Colors";

// const TripDetails = () => {
//   const navigation = useNavigation();
//   // ? To get the passing data in params from parent page / component
//   const { trip } = useLocalSearchParams();
//   const [tripDetails, setTripDetails] = useState([]);

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: "",
//     });
//     setTripDetails(JSON.parse(trip));
//   }, []);

//   return (
//     tripDetails && (
//       <View>
//         <Image
//           source={
//             "https://random-image-pepebigotes.vercel.app/api/random-image?category={forest}"
//           }
//           style={{
//             width: "100%",
//             height: 330,
//             objectFit: "cover",
//           }}
//         />
//         <View
//           style={{
//             padding: 15,
//             backgroundColor: Colors.WHITE,
//             height: "100%",
//             marginTop: -30,
//             borderTopLeftRadius: 30,
//             borderTopRightRadius: 30,
//           }}
//         >
//           <Text
//             style={{
//               fontFamily: "outfit-bold",
//               fontSize: 25,
//             }}
//           >
//             {tripDetails?.locationName?.split(", ").splice(0, 2).join(" ")}
//           </Text>
//           <View
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               gap: 5,
//             }}
//           >
//             <Text
//               style={{
//                 fontFamily: "outfit-regular",
//                 fontSize: 18,
//                 color: Colors.GRAY,
//               }}
//             >
//               {tripDetails?.startDate}
//             </Text>
//             <Text
//               style={{
//                 fontFamily: "outfit-regular",
//                 fontSize: 18,
//                 color: Colors.GRAY,
//               }}
//             >
//               - {tripDetails?.endDate}
//             </Text>
//           </View>
//           <Text
//             style={{
//               fontFamily: "outfit-regular",
//               fontSize: 18,
//               color: Colors.GRAY,
//             }}
//           >
//             🚌 {tripDetails?.tripData?.traveler?.title}
//           </Text>
//         </View>
//       </View>
//     )
//   );
// };

// export default TripDetails;

import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import TripPlanned from "../../components/TripDetails/TripPlanned";
import PlacesVisit from "../../components/TripDetails/PlacesVisit";

const TripDetails = () => {
  const navigation = useNavigation();
  // ? To get the passing data in params from parent page / component
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null); // Initialize as null to handle loading

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

    // Check if trip is defined and a valid string
    if (trip) {
      try {
        setTripDetails(JSON.parse(trip));
      } catch (error) {
        console.error("Error parsing trip data: ", error);
      }
    }
  }, [trip]);

  const formatData = (data) => {
    return JSON.parse(data);
  };

  return (
    tripDetails && (
      <ScrollView>
        <Image
          source={{
            uri: "https://random-image-pepebigotes.vercel.app/api/random-image?category={forest}",
          }}
          style={{
            width: "100%",
            height: 330,
            objectFit: "cover",
          }}
        />
        <View
          style={{
            padding: 15,
            backgroundColor: Colors.WHITE,
            height: "100%",
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
            }}
          >
            {tripDetails?.locationName?.split(", ").splice(0, 2).join(" ")}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
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
              {tripDetails?.startDate}
            </Text>
            <Text
              style={{
                fontFamily: "outfit-regular",
                fontSize: 18,
                color: Colors.GRAY,
              }}
            >
              - {tripDetails?.endDate}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "outfit-regular",
              fontSize: 18,
              color: Colors.GRAY,
            }}
          >
            🚌 {formatData(tripDetails?.tripData)?.traveler?.title}
          </Text>

          {/* Flight Info */}
          <FlightInfo flightData={formatData(tripDetails?.tripPlan)?.flight} />
          {/* Hotel Lists */}
          <HotelList hotelData={formatData(tripDetails?.tripPlan)?.hotel} />
          {/* Places To visit */}
          <PlacesVisit
            places={formatData(tripDetails?.tripPlan)?.places_to_visit}
          />
          {/* Trip Day Plan */}
          <TripPlanned tripPlan={formatData(tripDetails?.tripPlan)?.day_plan} />
        </View>
      </ScrollView>
    )
  );
};

export default TripDetails;
