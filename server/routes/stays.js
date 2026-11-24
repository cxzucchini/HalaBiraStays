import express from "express";
import Accommodation from "../models/Accommodation.js";
import Reservation from "../models/Reservation.js";

const router = express.Router();

// GET /api/stays?zone=...&budget=...&sort=...
router.get("/stays", async (req, res) => {
  try {
    const { zone, budget, sort = "RECOMMENDED" } = req.query;
    const filter = {};

    if (zone && zone !== "ALL") {
      filter.zone = zone;
    }

    if (budget === "UNDER_3500") {
      filter.nightlyRate = { $lt: 3500 };
    } else if (budget === "3500_5500") {
      filter.nightlyRate = { $gte: 3500, $lte: 5500 };
    } else if (budget === "OVER_5500") {
      filter.nightlyRate = { $gt: 5500 };
    }

    let sortOption = { createdAt: 1 };
    if (sort === "PRICE_ASC") {
      sortOption = { nightlyRate: 1 };
    } else if (sort === "PRICE_DESC") {
      sortOption = { nightlyRate: -1 };
    } else if (sort === "PROXIMITY") {
      sortOption = { proximityScore: -1 };
    }

    const stays = await Accommodation.find(filter).sort(sortOption);
    res.json({ stays, count: stays.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch accommodations" });
  }
});

// GET /api/reservations?email=...&refCode=...
router.get("/reservations", async (req, res) => {
  try {
    const { email, refCode } = req.query;
    const filter = {};

    if (refCode && String(refCode).trim()) {
      filter.refCode = String(refCode).trim().toUpperCase();
    }
    if (email && String(email).trim()) {
      filter.guestEmail = String(email).trim().toLowerCase();
    }

    const reservations = await Reservation.find(filter)
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ reservations });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

// POST /api/reservations
router.post("/reservations", async (req, res) => {
  try {
    const {
      accommodationId,
      guestFullName,
      guestEmail,
      guestPhone,
      checkinDate,
      checkoutDate,
      nights,
      guests,
      notes,
    } = req.body;

    if (
      !accommodationId ||
      !guestFullName ||
      !guestEmail ||
      !guestPhone ||
      !checkinDate ||
      !checkoutDate
    ) {
      return res.status(400).json({ error: "Missing required reservation fields" });
    }

    const stay = await Accommodation.findById(accommodationId);
    if (!stay) {
      return res.status(404).json({ error: "Accommodation not found" });
    }

    const validNights = Math.max(1, Number(nights) || 1);
    const validGuests = Math.max(1, Number(guests) || 1);
    const estimatedTotal = stay.nightlyRate * validNights;
    const refCode = "HB-" + Math.floor(100000 + Math.random() * 900000);

    const reservation = await Reservation.create({
      refCode,
      accommodationId: stay._id,
      hotelName: stay.name,
      guestFullName: String(guestFullName).trim(),
      guestEmail: String(guestEmail).trim().toLowerCase(),
      guestPhone: String(guestPhone).trim(),
      checkinDate,
      checkoutDate,
      nights: validNights,
      guests: validGuests,
      nightlyRate: stay.nightlyRate,
      estimatedTotal,
      notes: notes && String(notes).trim() ? String(notes).trim() : "None",
    });

    res.status(201).json({ reservation });
  } catch (error) {
    res.status(500).json({ error: "Failed to create reservation" });
  }
});
// DELETE /api/reservations/:id
router.delete("/reservations/:id", async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json({ message: "Sample reservation deleted", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reservation" });
  }
});

export default router;