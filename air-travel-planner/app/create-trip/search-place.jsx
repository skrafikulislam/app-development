// import { View, Text } from "react-native";
// import React, { useEffect } from "react";
// import { useNavigation } from "expo-router";
// import { Colors } from "../../constants/Colors";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// const SearchPlace = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: "Search",
//     });
//   }, []);

//   return (
//     <View
//       style={{
//         padding: 25,
//         paddingTop: 75,
//         backgroundColor: Colors.WHITE,
//         height: "100%",
//       }}
//     >
//       <GooglePlacesAutocomplete
//         placeholder="Search"
//         fetchDetails={true}
//         onPress={(data, details = null) => {
//           // 'details' is provided when fetchDetails = true
//           console.log(data, details);
//         }}
//         query={{
//           key:
//             process.env.EXPO_PUBLIC_GOOGLE_API_KEY ||
//             "AIzaSyDDlanSvK0Nz4kRPbDzONMgpLdhWIgvvzM",
//           language: "en",
//         }}
//       />
//     </View>
//   );
// };

// export default SearchPlace;

// import React, { useContext, useEffect, useState } from "react";
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import { useNavigation } from "expo-router";
// import { Colors } from "../../constants/Colors";
// import { CreateTripContext } from "../../context/CreateTripContext";

// const SearchPlace = () => {
//   const navigation = useNavigation();
//   const [query, setQuery] = useState("");
//   const [placesName, setPlacesName] = useState([]);

//   const { tripData, setTripData } = useContext(CreateTripContext);

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: "Search",
//     });
//   }, []);

//   // useEffect(() => {
//   //   console.log(tripData);
//   // }, [tripData]);

//   const searchPlaces = async (text) => {
//     setQuery(text);
//     if (text.length > 2) {
//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//             text
//           )}&format=json&addressdetails=1`
//         );
//         const data = await response.json();

//         if (data.length > 0) {
//           setPlacesName(data); // Update the places array with search results
//         } else {
//           console.log("No results found. Please try another search query.");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   // Function to handle the selection of a place
//   const selectPlace = (place) => {
//     setTripData({
//       // ...tripData, // Preserve other trip data if any
//       locationInfo: {
//         name: place.display_name,
//         coordinates: { lat: place.lat, lon: place.lon },
//         rank: place.place_rank,
//         addressType: place.addresstype,
//       },
//     });

//     console.log(`Selected place: ${place.display_name}`);
//   };

//   return (
//     <View
//       style={{
//         padding: 25,
//         paddingTop: 75,
//         backgroundColor: Colors.WHITE,
//         height: "100%",
//       }}
//     >
//       <TextInput
//         style={{
//           height: 40,
//           borderColor: Colors.GRAY,
//           borderWidth: 1,
//           paddingHorizontal: 10,
//           borderRadius: 10,
//           marginTop: 20,
//           marginBottom:30
//         }}
//         placeholder="Search Place"
//         onChangeText={searchPlaces}
//         value={query}
//       />
//       <FlatList
//         data={placesName}
//         keyExtractor={(item) => item.place_id}
//         renderItem={({ item }) => (
//           <Pressable onPress={() => selectPlace(item)}>
//             <Text style={{ padding: 10 }}>{item.display_name}</Text>
//           </Pressable>
//         )}
//       />
//     </View>
//   );
// };

// export default SearchPlace;

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";

const SearchPlace = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [placesName, setPlacesName] = useState([]);

  const { tripData, setTripData } = useContext(CreateTripContext);

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  const searchPlaces = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            text
          )}&format=json&addressdetails=1`
        );
        const data = await response.json();

        if (data.length > 0) {
          setPlacesName(data); // Update the places array with search results
        } else {
          console.log("No results found. Please try another search query.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function to handle the selection of a place
  const selectPlace = (place) => {
    setTripData({
      // ...tripData, // Preserve other trip data if any
      locationInfo: {
        name: place.display_name,
        coordinates: { lat: place.lat, lon: place.lon },
        rank: place.place_rank,
        addressType: place.addresstype,
      },
    });

    // console.log(`Selected place: ${place.display_name}`);

    router.push("/create-trip/select-traveler");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Place"
        onChangeText={searchPlaces}
        value={query}
      />
      {query ? (
        <FlatList
          data={placesName}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => selectPlace(item)}
              style={styles.resultItem}
            >
              <Text style={styles.resultText}>{item.display_name}</Text>
            </Pressable>
          )}
        />
      ) : (
        <Image
          source={require("../../assets/images/new-trip-2.jpeg")}
          style={{
            width: "100%",
            height: 600,
            borderRadius:20
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 75,
    backgroundColor: Colors.WHITE,
  },
  searchInput: {
    height: 45,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android shadow
  },
  resultItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android shadow
  },
  resultText: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SearchPlace;
