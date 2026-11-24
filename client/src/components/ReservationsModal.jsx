import { useEffect, useState } from "react";
import axios from "axios";

function formatPHP(amount) {
  return `₱${Number(amount).toLocaleString("en-PH")}`;
}

function formatDateShort(isoStr) {
  if (!isoStr) return "";
  const d = new Date(`${isoStr}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ReservationsModal({ onClose }) {
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchReservations(query = "") {
    setLoading(true);
    setErrorMsg("");
    try {
      const trimmed = query.trim();
      const params = {};
      if (trimmed.toUpperCase().startsWith("HB-")) {
        params.refCode = trimmed;
      } else if (trimmed.includes("@")) {
        params.email = trimmed;
      }

      const res = await axios.get("/api/reservations", { params });
      setReservations(res.data.reservations || []);
    } catch {
      setErrorMsg("Could not load saved reservations from the server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchReservations(searchQuery);
  }

  async function handleDelete(id) {
    setDeletingId(id);
    setErrorMsg("");
    try {
      await axios.delete(`/api/reservations/${id}`);
      setReservations((prev) => prev.filter((item) => item._id !== id));
    } catch {
      setErrorMsg("Failed to delete sample request.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-panel rounded-3xl max-w-2xl w-full p-6 sm:p-7 border border-festiveGold-400/35 shadow-2xl relative max-h-[90vh] flex flex-col">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="w-9 h-9 rounded-full bg-indigoDeep-800 hover:bg-indigoDeep-700 text-slate-300 hover:text-white flex items-center justify-center absolute top-5 right-5 transition"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <span className="text-[11px] font-bold uppercase tracking-widest text-festiveGold-400">
          Planning Log
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5 mb-1">
          Sample Stay Requests
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Recent festival stay requests saved to MongoDB. Filter by reference code (e.g., HB-123456) or email.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by HB-XXXXXX or guest@email.com..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-indigoDeep-950 border border-white/15 focus:border-festiveGold-400 focus:outline-none text-xs sm:text-sm text-white"
          />
          <button
            type="submit"
            className="btn-festive px-4 py-2 rounded-xl text-xs sm:text-sm font-bold"
          >
            Search
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                fetchReservations("");
              }}
              className="px-3 py-2 rounded-xl bg-indigoDeep-800 hover:bg-indigoDeep-700 text-xs font-semibold text-slate-300"
            >
              Clear
            </button>
          )}
        </form>

        <div className="overflow-y-auto space-y-3 pr-1 flex-1">
          {loading ? (
            <div className="text-center py-8 text-sm text-slate-400">
              Loading sample requests...
            </div>
          ) : errorMsg ? (
            <div className="p-4 rounded-xl bg-terracotta-900/60 border border-terracotta-400/40 text-xs text-terracotta-400">
              {errorMsg}
            </div>
          ) : reservations.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-400">
              No sample stay requests found.
            </div>
          ) : (
            reservations.map((item) => (
              <div
                key={item._id}
                className="bg-indigoDeep-950/90 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-festiveGold-400/15 border border-festiveGold-400/30 text-[11px] font-bold text-festiveGold-300">
                      {item.refCode}
                    </span>
                    <span className="font-bold text-white text-sm">
                      {item.hotelName}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {item.guestFullName} • {formatDateShort(item.checkinDate)} –{" "}
                    {formatDateShort(item.checkoutDate)} ({item.nights}n,{" "}
                    {item.guests} {item.guests === 1 ? "guest" : "guests"})
                  </div>
                  {item.notes && item.notes !== "None" && (
                    <div className="text-[11px] text-slate-400">
                      Note: {item.notes}
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <div className="sm:text-right">
                    <div className="text-base font-extrabold text-festiveGold-400">
                      {formatPHP(item.estimatedTotal)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {item.guestEmail}
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={deletingId === item._id}
                    onClick={() => handleDelete(item._id)}
                    className="px-2.5 py-1 rounded-lg bg-terracotta-900/60 hover:bg-terracotta-600/70 border border-terracotta-400/30 text-[11px] font-semibold text-terracotta-400 hover:text-white transition disabled:opacity-50"
                  >
                    {deletingId === item._id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}