// import { View, Text, FlatList, ScrollView } from "react-native";
// import React from "react";

// const HotelList = ({ hotelData }) => {
//   return (
//     <View
//       style={{
//         marginTop: 20,
//       }}
//     >
//       <Text
//         style={{
//           fontFamily: "outfit-bold",
//           fontSize: 20,
//         }}
//       >
//         🏨 Hotel Recommendation
//       </Text>
//       <FlatList
//         data={hotelData}
//         renderItem={({ hotel, i }) => (
//           <View>
//             <Text>{hotel?.name}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default HotelList;

import { View, Text, FlatList, Image } from "react-native";
import React from "react";

const HotelList = ({ hotelData }) => {
  const categories = ["dark", "light", "nature", "abstract", "urban"];

  const getRandomCategory = () => {
    return categories[Math.floor(Math.random() * categories.length)];
  };
  return (
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
        🏨 Hotel Recommendation
      </Text>
      <FlatList
        style={{
          marginTop: 8,
        }}
        // ? to make the images horizontal scroll
        horizontal={true}
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll bar
        data={hotelData}
        keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
        renderItem={({ item }) => (
          <View
            style={{
              marginRight: 20,
              width: 200,
            }}
          >
            {/* <Text>{item?.name}</Text> Correctly access the hotel name */}
            <Image
              source={{
                uri: `https://random-image-pepebigotes.vercel.app/api/random-image?category=${getRandomCategory()}`,
              }}
              style={{
                width: 200,
                height: 120,
                objectFit: "cover",
                borderRadius: 15,
              }}
            />
            <View
              style={{
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 17,
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit-regular",
                  }}
                >
                  ⭐ {item.rating}
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit-regular",
                  }}
                >
                  💸 {item.price}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HotelList;
