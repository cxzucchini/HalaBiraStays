import mongoose from "mongoose";
import dotenv from "dotenv";
import Accommodation from "./models/Accommodation.js";

dotenv.config();

const ACCOMMODATIONS = [
  {
    slug: "citadines-amigo",
    name: "Citadines Amigo Iloilo",
    zone: "City Proper / Parade Route",
    nightlyRate: 4650,
    rating: 4.7,
    reviews: 842,
    proximityScore: 98,
    proximityLabel: "2 min walk (140m) to main City Proper parade avenue",
    closureTip:
      "Step right out into pedestrian-friendly festival zones; expect lively drum sounds nearby.",
    amenities: ["Free Wi-Fi", "Outdoor Pool", "Gym", "Kitchenette"],
    badge: "Prime Parade Walk",
    accentGradient:
      "from-terracotta-600/80 via-indigoDeep-900 to-indigoDeep-950",
  },
  {
    slug: "harbor-town-hotel",
    name: "Harbor Town Hotel",
    zone: "City Proper / Parade Route",
    nightlyRate: 2450,
    rating: 4.3,
    reviews: 519,
    proximityScore: 94,
    proximityLabel: "5 min walk (380m) to parade & judging perimeter",
    closureTip:
      "Great budget base on foot; main avenues close early so walk rather than book taxis.",
    amenities: ["Free Wi-Fi", "Air-Con", "24h Front Desk", "Near Eateries"],
    badge: "Walkable Value",
    accentGradient: "from-amber-700/70 via-indigoDeep-900 to-indigoDeep-950",
  },
  {
    slug: "hotel-del-rio",
    name: "Hotel Del Rio",
    zone: "City Proper / Parade Route",
    nightlyRate: 2890,
    rating: 4.4,
    reviews: 675,
    proximityScore: 92,
    proximityLabel: "6 min walk (450m) to historic plaza & parade route",
    closureTip:
      "Classic City Proper location along the riverfront edge—ideal for walking to morning tribes.",
    amenities: ["Free Wi-Fi", "River View", "Pool", "Restaurant"],
    badge: "Heritage Spot",
    accentGradient:
      "from-terracotta-500/70 via-indigoDeep-900 to-indigoDeep-950",
  },
  {
    slug: "days-hotel-iloilo",
    name: "Days Hotel by Wyndham Iloilo",
    zone: "Mandurriao / Business Park",
    nightlyRate: 3680,
    rating: 4.5,
    reviews: 490,
    proximityScore: 76,
    proximityLabel: "12–18 min transit to City Proper parade stages",
    closureTip:
      "Leave early for parade mornings as City Proper roads reroute; easy access to dining & shops.",
    amenities: ["Free Wi-Fi", "Breakfast Option", "Gym", "Parking"],
    badge: "Reliable Comfort",
    accentGradient: "from-sky-800/70 via-indigoDeep-900 to-indigoDeep-950",
  },
  {
    slug: "go-hotels-iloilo",
    name: "Go Hotels Iloilo",
    zone: "Mandurriao / Business Park",
    nightlyRate: 2150,
    rating: 4.2,
    reviews: 730,
    proximityScore: 72,
    proximityLabel: "15–20 min ride + short walk to judging zones",
    closureTip:
      "Budget-friendly clean base; buffer extra transit time when street closures take effect.",
    amenities: ["Free Wi-Fi", "Smart TV", "24h Security", "Mall Adjacent"],
    badge: "Smart Budget",
    accentGradient: "from-emerald-800/70 via-indigoDeep-900 to-indigoDeep-950",
  },
  {
    slug: "goldberry-lite-hotel",
    name: "Goldberry Lite Hotel",
    zone: "City Proper / Parade Route",
    nightlyRate: 2650,
    rating: 4.4,
    reviews: 412,
    proximityScore: 90,
    proximityLabel: "7 min walk (520m) to parade corridor",
    closureTip:
      "Compact, modern rooms near downtown action—skip car rides during peak street dancing.",
    amenities: ["Free Wi-Fi", "Cafe", "Air-Con", "Elevator"],
    badge: "Central & Handy",
    accentGradient:
      "from-festiveGold-600/70 via-indigoDeep-900 to-indigoDeep-950",
  },
  {
    slug: "richmonde-hotel-iloilo",
    name: "Richmonde Hotel Iloilo",
    zone: "Mandurriao / Business Park",
    nightlyRate: 6200,
    rating: 4.7,
    reviews: 915,
    proximityScore: 78,
    proximityLabel: "12–18 min drive to City Proper parade perimeter",
    closureTip:
      "Upscale business park stay; arrange early morning rides before road closures tighten.",
    amenities: ["Pool", "Spa / Wellness", "Free Wi-Fi", "Fine Dining"],
    badge: "Upscale Retreat",
    accentGradient: "from-indigo-700/70 via-indigoDeep-900 to-indigoDeep-950",
  },
  {
    slug: "courtyard-by-marriott",
    name: "Courtyard by Marriott Iloilo",
    zone: "Mandurriao / Business Park",
    nightlyRate: 6850,
    rating: 4.8,
    reviews: 1040,
    proximityScore: 77,
    proximityLabel: "12–18 min transit to main parade & stage zones",
    closureTip:
      "Spacious rooms for families/groups; head out early on festival day and unwind at night.",
    amenities: ["Outdoor Pool", "Fitness Center", "Free Wi-Fi", "Lounge"],
    badge: "Group Favorite",
    accentGradient:
      "from-terracotta-700/75 via-indigoDeep-900 to-indigoDeep-950",
  },
  {
    slug: "seda-atria",
    name: "Seda Atria",
    zone: "Mandurriao / Business Park",
    nightlyRate: 5750,
    rating: 4.6,
    reviews: 788,
    proximityScore: 74,
    proximityLabel: "15–20 min ride to City Proper parade venues",
    closureTip:
      "Calm, modern atmosphere with easy dining nearby; plan early departures for street events.",
    amenities: ["Pool", "Free Wi-Fi", "Restaurant", "Family Rooms"],
    badge: "Calm & Modern",
    accentGradient: "from-teal-800/70 via-indigoDeep-900 to-indigoDeep-950",
  },
  {
    slug: "smallville-21-hotel",
    name: "Smallville 21 Hotel",
    zone: "Molo / Esplanade",
    nightlyRate: 3250,
    rating: 4.5,
    reviews: 620,
    proximityScore: 82,
    proximityLabel:
      "10–15 min ride or brisk Esplanade route toward festival zones",
    closureTip:
      "Great for evening dining & lively nights; expect traffic pockets near bridge & main roads.",
    amenities: ["Free Wi-Fi", "Nightlife Nearby", "Restaurant", "Parking"],
    badge: "Evening & Dining",
    accentGradient: "from-purple-800/70 via-indigoDeep-900 to-indigoDeep-950",
  },
];

async function seedAccommodations() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    for (const item of ACCOMMODATIONS) {
      await Accommodation.findOneAndUpdate(
        { slug: item.slug },
        { $set: item },
        { upsert: true, new: true, runValidators: true }
      );
    }

    console.log(`Seeded ${ACCOMMODATIONS.length} accommodations successfully.`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seedAccommodations();