// import { View, Text, Image } from "react-native";
// import React, { useContext, useEffect, useState } from "react";
// import { Colors } from "../../constants/Colors";
// import { CreateTripContext } from "../../context/CreateTripContext";
// import { AI_PROMPT } from "../../constants/Options";
// import { chatSession } from "../../configs/AiModel";
// import { useRouter } from "expo-router";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../../configs/FirebaseConfig";

// const GenerateTrip = () => {
//   const [loading, setLoading] = useState(false);
//   const { tripData, setTripData } = useContext(CreateTripContext);

//   const router = useRouter();

//   const user = auth.currentUser;

//   useEffect(() => {
//     GenerateAiTrip();
//   }, []);

//   //? To replace the prompt with context so that gemini understands different user places
//   const GenerateAiTrip = async () => {
//     setLoading(true);
//     //?sending prompt to the gemini
//     const FINAL_PROMPT = AI_PROMPT.replace(
//       "{location}",
//       tripData?.locationInfo?.name
//     )
//       .replace("{totalDays}", tripData?.totaldays)
//       .replace("{totalNight}", tripData?.totaldays - 1)
//       .replace("{traveler}", tripData?.traveler?.title)
//       .replace("{budget}", tripData?.budget)
//       .replace("{totalDays}", tripData?.totaldays)
//       .replace("{totalNight}", tripData?.totaldays - 1);

//     // console.log(FINAL_PROMPT);

//     //? Getting the response from gemini with dynamic data
//     const result = await chatSession.sendMessage(FINAL_PROMPT);
//     // console.log(result.response.text());

//     //? converting the response to json before storing firebase database
//     const tripResponse = result.response.text();

//     setLoading(false);

//     //? To generate unique doc id every time
//     const docId = Date.now().toString();

//     //? Saveing the response to the firebase databse
//     await setDoc(doc(db, "UserTrip", docId), {
//       userEmail: user?.email,
//       tripPlan: tripResponse, //? response from the ai
//       tripData: JSON.stringify(tripData), //? user context response
//       docId: docId,
//       locationName: tripData?.locationInfo?.name,
//     });

//     router.push("(tabs)/mytrip");
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
//       <Text
//         style={{
//           fontFamily: "outfit-bold",
//           fontSize: 35,
//           textAlign: "center",
//         }}
//       >
//         Please Wait...
//       </Text>
//       <Text
//         style={{
//           fontFamily: "outfit-medium",
//           fontSize: 20,
//           textAlign: "center",
//           marginTop: 30,
//           color: Colors.GRAY,
//         }}
//       >
//         We are Working on Your Trip
//       </Text>
//       <Image
//         source={require("../../assets/images/plane-loader.gif")}
//         style={{
//           width: "100%",
//           height: 500,
//           marginTop: 20,
//           borderRadius: 20,
//         }}
//       />
//       <Text
//         style={{
//           marginTop: 10,
//           fontFamily: "outfit-regular",
//           color: Colors.GRAY,
//           fontSize: 25,
//           textAlign: "center",
//         }}
//       >
//         Do Not Go Back
//       </Text>
//     </View>
//   );
// };

// export default GenerateTrip;

import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import { AI_PROMPT } from "../../constants/Options";
import { chatSession } from "../../configs/AiModel";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
import moment from "moment";

const GenerateTrip = () => {
  const [loading, setLoading] = useState(false);
  const { tripData, setTripData } = useContext(CreateTripContext);

  const router = useRouter();

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      GenerateAiTrip();
    } else {
      console.error("User not authenticated");
    }
  }, [user]);

  //? To replace the prompt with context so that gemini understands different user places
  const GenerateAiTrip = async () => {
    if (!user?.email) {
      console.error(
        "User email is undefined. Please make sure the user is authenticated."
      );
      return;
    }

    setLoading(true);

    //?sending prompt to the gemini
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.locationInfo?.name
    )
      .replace("{totalDays}", tripData?.totaldays)
      .replace("{totalNight}", tripData?.totaldays - 1)
      .replace("{traveler}", tripData?.traveler?.title)
      .replace("{budget}", tripData?.budget)
      .replace("{totalDays}", tripData?.totaldays)
      .replace("{totalNight}", tripData?.totaldays - 1);

    try {
      //? Getting the response from gemini with dynamic data
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripResponse = result.response.text();

      //? To generate unique doc id every time
      const docId = Date.now().toString();

      //? Saveing the response to the firebase databse
      await setDoc(doc(db, "UserTrip", docId), {
        userEmail: user.email, //? ensuring user email is defined
        tripPlan: tripResponse, //? response from the ai
        tripData: JSON.stringify(tripData), //? user context response
        docId: docId,
        locationName: tripData?.locationInfo?.name,
        startDate: moment(tripData?.startDate).format("DD MMM YYYY"),
        endDate: moment(tripData?.endDate).format("DD MMM YYYY"),
      });

      router.push("(tabs)/mytrip");
    } catch (error) {
      console.error("Error generating trip or saving to Firestore:", error);
    } finally {
      setLoading(false);
    }
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
          textAlign: "center",
        }}
      >
        Please Wait...
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
          textAlign: "center",
          marginTop: 30,
          color: Colors.GRAY,
        }}
      >
        We are Working on Your Trip
      </Text>
      <Image
        source={require("../../assets/images/plane-loader.gif")}
        style={{
          width: "100%",
          height: 500,
          marginTop: 20,
          borderRadius: 20,
        }}
      />
      <Text
        style={{
          marginTop: 10,
          fontFamily: "outfit-regular",
          color: Colors.GRAY,
          fontSize: 25,
          textAlign: "center",
        }}
      >
        Do Not Go Back
      </Text>
    </View>
  );
};

export default GenerateTrip;
