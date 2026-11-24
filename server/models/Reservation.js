import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    refCode: { type: String, required: true, unique: true, trim: true },
    accommodationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
      required: true,
    },
    hotelName: { type: String, required: true, trim: true },
    guestFullName: { type: String, required: true, trim: true },
    guestEmail: { type: String, required: true, trim: true },
    guestPhone: { type: String, required: true, trim: true },
    checkinDate: { type: String, required: true },
    checkoutDate: { type: String, required: true },
    nights: { type: Number, required: true, min: 1 },
    guests: { type: Number, required: true, min: 1 },
    nightlyRate: { type: Number, required: true, min: 0 },
    estimatedTotal: { type: Number, required: true, min: 0 },
    notes: { type: String, default: "None", trim: true },
    status: {
      type: String,
      enum: ["SAMPLE_LOGGED", "CONFIRMED", "CANCELLED"],
      default: "SAMPLE_LOGGED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);