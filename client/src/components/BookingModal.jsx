import { useState } from "react";
import axios from "axios";

function formatPHP(amount) {
  return `₱${Number(amount).toLocaleString("en-PH")}`;
}

function formatDateShort(isoStr) {
  if (!isoStr) return "";
  const d = new Date(`${isoStr}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function BookingModal({
  hotel,
  checkinDate,
  checkoutDate,
  nights,
  guests,
  onClose,
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedReservation, setConfirmedReservation] = useState(null);

  if (!hotel) return null;

  const estimatedTotal = hotel.nightlyRate * nights;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await axios.post("/api/reservations", {
        accommodationId: hotel._id,
        guestFullName: fullName.trim(),
        guestEmail: email.trim(),
        guestPhone: phone.trim(),
        checkinDate,
        checkoutDate,
        nights,
        guests: Number(guests),
        notes: notes.trim() || "None",
      });
      setConfirmedReservation(res.data.reservation);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.error || "Could not save reservation request."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-panel rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-festiveGold-400/35 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="w-9 h-9 rounded-full bg-indigoDeep-800 hover:bg-indigoDeep-700 text-slate-300 hover:text-white flex items-center justify-center absolute top-5 right-5 transition"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        {!confirmedReservation ? (
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta-400">
              Stay Reservation Request
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
              {hotel.name}
            </h3>
            <p className="text-xs text-festiveGold-300 mb-4">
              {hotel.zone} • {hotel.proximityLabel}
            </p>

            <div className="bg-indigoDeep-950/90 border border-white/10 rounded-2xl p-4 mb-5 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Nightly Rate (Sample)</span>
                <span className="font-semibold text-white">
                  {formatPHP(hotel.nightlyRate)}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Duration &amp; Guests</span>
                <span className="font-semibold text-white">
                  {nights} {nights === 1 ? "night" : "nights"} (
                  {formatDateShort(checkinDate)} – {formatDateShort(checkoutDate)})
                  • {guests} {String(guests) === "1" ? "guest" : "guests"}
                </span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between items-center text-base font-bold">
                <span className="text-festiveGold-300">Estimated Total</span>
                <span className="text-xl text-festiveGold-400">
                  {formatPHP(estimatedTotal)}
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-3 px-3.5 py-2.5 rounded-xl bg-terracotta-900/70 border border-terracotta-400/50 text-xs text-terracotta-400">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label
                  htmlFor="guestFullName"
                  className="block text-xs font-semibold text-slate-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="guestFullName"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g., Juan Dela Cruz"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-indigoDeep-950 border border-white/15 focus:border-festiveGold-400 focus:outline-none text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="guestEmail"
                    className="block text-xs font-semibold text-slate-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="guestEmail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juan@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-indigoDeep-950 border border-white/15 focus:border-festiveGold-400 focus:outline-none text-sm text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="guestPhone"
                    className="block text-xs font-semibold text-slate-300 mb-1"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="guestPhone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+63 917 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-indigoDeep-950 border border-white/15 focus:border-festiveGold-400 focus:outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="guestNotes"
                  className="block text-xs font-semibold text-slate-300 mb-1"
                >
                  Festival Requests (Optional)
                </label>
                <input
                  type="text"
                  id="guestNotes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Quiet room away from street drums, early bag drop"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-indigoDeep-950 border border-white/15 focus:border-festiveGold-400 focus:outline-none text-sm text-white"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-festive w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider mt-2 disabled:opacity-60"
              >
                {submitting ? "Saving Request..." : "Confirm Sample Stay Request"}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              <i className="fa-solid fa-check" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              Hala Bira! Sample Request Saved
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 mb-2">
              Booking Summary
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Planning simulation logged to MongoDB—no actual room hold or payment was processed.
            </p>

            <div className="bg-indigoDeep-950/90 border border-festiveGold-400/25 rounded-2xl p-4 text-left text-xs sm:text-sm space-y-2 mb-5">
              <div className="flex justify-between">
                <span className="text-slate-400">Reference Code</span>
                <span className="font-bold text-festiveGold-300">
                  {confirmedReservation.refCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Property</span>
                <span className="font-semibold text-white">
                  {confirmedReservation.hotelName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Guest</span>
                <span className="font-semibold text-white">
                  {confirmedReservation.guestFullName} ({confirmedReservation.guests}{" "}
                  guests)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dates</span>
                <span className="font-semibold text-white">
                  {formatDateShort(confirmedReservation.checkinDate)} –{" "}
                  {formatDateShort(confirmedReservation.checkoutDate)} (
                  {confirmedReservation.nights}n)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact</span>
                <span className="font-semibold text-white">
                  {confirmedReservation.guestEmail} •{" "}
                  {confirmedReservation.guestPhone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Notes</span>
                <span className="text-slate-300">
                  {confirmedReservation.notes}
                </span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-base font-bold">
                <span className="text-festiveGold-300">Estimated Total</span>
                <span className="text-festiveGold-400">
                  {formatPHP(confirmedReservation.estimatedTotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn-gold-accent w-full py-3 rounded-xl text-sm uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}