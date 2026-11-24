import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    zone: {
      type: String,
      required: true,
      enum: [
        "City Proper / Parade Route",
        "Mandurriao / Business Park",
        "Molo / Esplanade",
      ],
    },
    nightlyRate: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviews: { type: Number, required: true, min: 0 },
    proximityScore: { type: Number, required: true, min: 0, max: 100 },
    proximityLabel: { type: String, required: true, trim: true },
    closureTip: { type: String, required: true, trim: true },
    amenities: [{ type: String, trim: true }],
    badge: { type: String, required: true, trim: true },
    accentGradient: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Accommodation", accommodationSchema);