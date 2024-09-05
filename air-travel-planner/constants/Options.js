export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole travels in exploration",
    icon: "🧍‍♂️",
    people: "1 People",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travels In tandem",
    icon: "💑",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adventure",
    icon: "👪",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of Thrill Seeks",
    icon: "👬",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay Concious of Cost",
    icon: "💸",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep Cost on the Average Saving",
    icon: "🤑",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Do not Worry About The cost",
    icon: "💰",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {totalDays} Days and {totalNight} Night for {traveler} with a {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format.";
