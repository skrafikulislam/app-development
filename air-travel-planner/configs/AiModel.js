const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey =
  process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY ||
  "AIzaSyDCEWViLePw_bHmRthPB-Mt50sC-bJwnjs";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Par, Cornwall, England, PL24 2AD, United Kingdom, for 3 Days and 2 Night for Just Me with a Cheap budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days and 2 night with each day plan with best time to visit in JSON format.\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "flight": {\n    "details": "London Gatwick (LGW) to Newquay Cornwall Airport (NQY)",\n    "price": "$50 (round trip)",\n    "booking_url": "https://www.easyjet.com/en/flights/london-gatwick-to-newquay-cornwall"\n  },\n  "hotel": [\n    {\n      "name": "The Ship Inn",\n      "address": "The Ship Inn, Par, Cornwall PL24 2AD, United Kingdom",\n      "price": "$50/night",\n      "image_url": "https://www.theshippin.co.uk/images/gallery/ship-inn-exterior-01.jpg",\n      "geo_coordinates": "50.3050, -4.7906",\n      "rating": 4.5,\n      "description": "A traditional pub with rooms offering basic accommodation at a good price."\n    },\n    {\n      "name": "The Bay Hotel",\n      "address": "The Bay Hotel, Par, Cornwall PL24 2AD, United Kingdom",\n      "price": "$70/night",\n      "image_url": "https://www.thebayhotelpar.co.uk/images/gallery/hotel-exterior-01.jpg",\n      "geo_coordinates": "50.3048, -4.7908",\n      "rating": 4.0,\n      "description": "A modern hotel with sea views, offering comfortable rooms and a restaurant."\n    },\n    {\n      "name": "The Fowey Hall Hotel",\n      "address": "Fowey Hall Hotel, Fowey, Cornwall PL23 1EL, United Kingdom",\n      "price": "$100/night",\n      "image_url": "https://www.foweyhallhotel.co.uk/images/gallery/hotel-exterior-01.jpg",\n      "geo_coordinates": "50.3367, -4.6807",\n      "rating": 4.8,\n      "description": "A luxurious hotel with stunning views and excellent facilities, located about 10 miles from Par."\n    }\n  ],\n  "places_to_visit": [\n    {\n      "name": "Charlestown",\n      "details": "A historic port village with preserved 18th and 19th-century buildings, including the famous \'Charlestown Shipyard\'.",\n      "image_url": "https://www.visitcornwall.com/media/images/charlestown-harbour-cornwall.jpg",\n      "geo_coordinates": "50.3197, -4.7853",\n      "ticket_pricing": "Free entry",\n      "time_to_travel": "1-2 hours"\n    },\n    {\n      "name": "Eden Project",\n      "details": "A unique biodome complex showcasing plants from around the world.",\n      "image_url": "https://www.edenproject.com/media/images/eden-project-aerial-view.jpg",\n      "geo_coordinates": "50.3302, -4.8770",\n      "ticket_pricing": "Adult: £29.95",\n      "time_to_travel": "3-4 hours"\n    },\n    {\n      "name": "The Lost Gardens of Heligan",\n      "details": "A historic garden with diverse landscapes and stunning plant collections.",\n      "image_url": "https://www.heligan.com/media/images/the-lost-gardens-of-heligan-aerial-view.jpg",\n      "geo_coordinates": "50.3088, -4.6838",\n      "ticket_pricing": "Adult: £23.50",\n      "time_to_travel": "2-3 hours"\n    },\n    {\n      "name": "The Cornish Seal Sanctuary",\n      "details": "A rescue and rehabilitation center for seals, offering educational tours and close encounters.",\n      "image_url": "https://www.sealsanctuary.co.uk/media/images/cornish-seal-sanctuary-seals.jpg",\n      "geo_coordinates": "50.3371, -4.7016",\n      "ticket_pricing": "Adult: £15.00",\n      "time_to_travel": "1-2 hours"\n    }\n  ],\n  "day_plan": [\n    {\n      "day": "Day 1",\n      "schedule": [\n        {\n          "time": "10:00 AM",\n          "activity": "Arrive at Newquay Airport (NQY) and take a bus to Par (approximately 1 hour)."\n        },\n        {\n          "time": "11:00 AM",\n          "activity": "Check into your hotel and drop off your luggage."\n        },\n        {\n          "time": "11:30 AM",\n          "activity": "Walk to Charlestown and explore the historic port village (1 hour)."\n        },\n        {\n          "time": "12:30 PM",\n          "activity": "Have lunch at a local pub in Charlestown."\n        },\n        {\n          "time": "1:30 PM",\n          "activity": "Visit the Charlestown Shipyard and learn about its history (1 hour)."\n        },\n        {\n          "time": "2:30 PM",\n          "activity": "Walk back to Par and relax by the beach or explore the local shops (1 hour)."\n        },\n        {\n          "time": "3:30 PM",\n          "activity": "Have dinner at your hotel or at a local restaurant in Par."\n        }\n      ]\n    },\n    {\n      "day": "Day 2",\n      "schedule": [\n        {\n          "time": "9:00 AM",\n          "activity": "Take a bus to Eden Project (approximately 30 minutes)."\n        },\n        {\n          "time": "9:30 AM",\n          "activity": "Explore the biodomes and learn about plants from around the world (3 hours)."\n        },\n        {\n          "time": "12:30 PM",\n          "activity": "Have lunch at the Eden Project restaurant."\n        },\n        {\n          "time": "1:30 PM",\n          "activity": "Visit the Eden Project\'s visitor centre and gift shop."\n        },\n        {\n          "time": "2:30 PM",\n          "activity": "Take a bus back to Par (approximately 30 minutes)."\n        },\n        {\n          "time": "3:00 PM",\n          "activity": "Relax by the beach or explore the local area."\n        },\n        {\n          "time": "6:30 PM",\n          "activity": "Have dinner at a local restaurant in Par."\n        }\n      ]\n    },\n    {\n      "day": "Day 3",\n      "schedule": [\n        {\n          "time": "9:00 AM",\n          "activity": "Take a bus to The Lost Gardens of Heligan (approximately 30 minutes)."\n        },\n        {\n          "time": "9:30 AM",\n          "activity": "Explore the historic gardens and their stunning landscapes (2 hours)."\n        },\n        {\n          "time": "11:30 AM",\n          "activity": "Have lunch at the Heligan restaurant."\n        },\n        {\n          "time": "12:30 PM",\n          "activity": "Visit the Heligan\'s visitor centre and gift shop."\n        },\n        {\n          "time": "1:30 PM",\n          "activity": "Take a bus to The Cornish Seal Sanctuary (approximately 30 minutes)."\n        },\n        {\n          "time": "2:00 PM",\n          "activity": "Visit the seal sanctuary and learn about seal conservation (1 hour)."\n        },\n        {\n          "time": "3:00 PM",\n          "activity": "Take a bus back to Par (approximately 30 minutes)."\n        },\n        {\n          "time": "3:30 PM",\n          "activity": "Relax by the beach or explore the local area."\n        },\n        {\n          "time": "5:00 PM",\n          "activity": "Check out of your hotel and take a bus to Newquay Airport (NQY) for your flight home."\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Notes:**\n\n* This travel plan is based on a cheap budget, with affordable flights, accommodation, and activities.\n* The flight price and booking URL are for illustrative purposes only. \n* You can adjust the schedule and activities based on your preferences and interests.\n* Public transportation is recommended to get around, as it is a cost-effective option.\n* Be sure to check the latest travel advisories and guidelines before you travel.\n\n**Enjoy your trip to Par, Cornwall!** \n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
