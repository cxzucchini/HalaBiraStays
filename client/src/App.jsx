import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import SearchFilterBar from "./components/SearchFilterBar";
import AccommodationCard from "./components/AccommodationCard";
import StayGuideSection from "./components/StayGuideSection";
import BookingModal from "./components/BookingModal";
import ReservationsModal from "./components/ReservationsModal";

const DEFAULT_CHECKIN = "2027-01-22";
const DEFAULT_CHECKOUT = "2027-01-25";
const STORAGE_KEY = "hala_bira_saved_stays";

function addDaysISO(isoDate, days) {
  const d = new Date(`${isoDate}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export default function App() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [checkinDate, setCheckinDate] = useState(DEFAULT_CHECKIN);
  const [checkoutDate, setCheckoutDate] = useState(DEFAULT_CHECKOUT);
  const [zoneFilter, setZoneFilter] = useState("ALL");
  const [budgetFilter, setBudgetFilter] = useState("ALL");
  const [guestCount, setGuestCount] = useState("2");
  const [sortBy, setSortBy] = useState("RECOMMENDED");

  const [savedIds, setSavedIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [onlySaved, setOnlySaved] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showReservationsModal, setShowReservationsModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedIds]);

  function handleCheckinChange(newCheckin) {
    setCheckinDate(newCheckin);
    if (newCheckin && (!checkoutDate || checkoutDate <= newCheckin)) {
      setCheckoutDate(addDaysISO(newCheckin, 1));
    }
  }

  function handleCheckoutChange(newCheckout) {
    if (checkinDate && newCheckout <= checkinDate) {
      setCheckoutDate(addDaysISO(checkinDate, 1));
      return;
    }
    setCheckoutDate(newCheckout);
  }

  const nights = useMemo(() => {
    if (!checkinDate || !checkoutDate) return 3;
    const start = new Date(`${checkinDate}T00:00:00`);
    const end = new Date(`${checkoutDate}T00:00:00`);
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkinDate, checkoutDate]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setApiError("");

    axios
      .get("/api/stays", {
        params: {
          zone: zoneFilter,
          budget: budgetFilter,
          sort: sortBy,
        },
      })
      .then((res) => {
        if (!active) return;
        setStays(res.data.stays || []);
      })
      .catch(() => {
        if (!active) return;
        setApiError(
          "Could not load accommodations from the API. Make sure MongoDB is connected and server/seed.js has been run."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [zoneFilter, budgetFilter, sortBy]);

  function handleToggleShortlist(hotelId) {
    setSavedIds((prev) => {
      const exists = prev.includes(hotelId);
      const next = exists
        ? prev.filter((id) => id !== hotelId)
        : [...prev, hotelId];
      if (next.length === 0) {
        setOnlySaved(false);
      }
      return next;
    });
  }

  function handleToggleOnlySaved() {
    if (savedIds.length === 0 && !onlySaved) return;
    setOnlySaved((prev) => !prev);
  }

  function handleResetAll() {
    setCheckinDate(DEFAULT_CHECKIN);
    setCheckoutDate(DEFAULT_CHECKOUT);
    setZoneFilter("ALL");
    setBudgetFilter("ALL");
    setGuestCount("2");
    setSortBy("RECOMMENDED");
    setOnlySaved(false);
  }

  const visibleStays = useMemo(() => {
    if (!onlySaved) return stays;
    return stays.filter((hotel) => savedIds.includes(hotel._id));
  }, [stays, onlySaved, savedIds]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* TOP FESTIVAL NOTICE BAR */}
      <div className="bg-gradient-to-r from-terracotta-900 via-indigoDeep-800 to-terracotta-900 border-b border-festiveGold-400/30 px-4 py-2 text-center text-xs sm:text-sm text-festiveGold-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-festiveGold-400/20 border border-festiveGold-400/40 text-[11px] font-bold uppercase tracking-wider text-festiveGold-300">
            <i className="fa-solid fa-drum mr-1" /> Dinagyang Festival Guide
          </span>
          <span>
            Illustrative sample rates &amp; availability for Iloilo City festival planning.
          </span>
        </div>
      </div>

      {/* NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-indigoDeep-950/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-terracotta-500 via-festiveGold-400 to-terracotta-600 p-[1.5px] shadow-gold-soft">
              <div className="w-full h-full bg-indigoDeep-950 rounded-[10px] flex items-center justify-center">
                <i className="fa-solid fa-fire-flame-curved text-festiveGold-400 text-lg" />
              </div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl font-bold tracking-wide text-white leading-none">
                Hala Bira <span className="text-festiveGold-400">Stays</span>
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-terracotta-400 font-semibold mt-0.5">
                Iloilo City • Dinagyang
              </div>
            </div>
          </a>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <a
              href="#stays-catalog"
              className="hidden md:inline-block text-sm font-medium text-slate-300 hover:text-festiveGold-300 transition"
            >
              Accommodations
            </a>
            <a
              href="#stay-guide"
              className="hidden md:inline-block text-sm font-medium text-slate-300 hover:text-festiveGold-300 transition"
            >
              Route &amp; Stay Guide
            </a>
            <button
              type="button"
              onClick={() => setShowReservationsModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigoDeep-800 hover:bg-indigoDeep-700 border border-white/15 text-xs sm:text-sm font-semibold text-slate-200 transition"
            >
              <i className="fa-solid fa-receipt text-festiveGold-400" />
              <span>Requests</span>
            </button>
            <button
              type="button"
              onClick={handleToggleOnlySaved}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                onlySaved
                  ? "bg-terracotta-500 border border-terracotta-400 font-bold text-white"
                  : "bg-indigoDeep-800 hover:bg-indigoDeep-700 border border-festiveGold-400/30 text-festiveGold-300"
              }`}
            >
              <i className="fa-solid fa-heart text-terracotta-400" />
              <span>Saved ({savedIds.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION + SEARCH & FILTER BAR */}
      <section className="hero-gradient border-b border-festiveGold-400/20 pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/20 border border-terracotta-400/40 text-terracotta-400 text-xs font-bold uppercase tracking-wider mb-4">
              <i className="fa-solid fa-location-dot" /> Iloilo City, Western Visayas, Philippines
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-white leading-[1.08] mb-4">
              Feel the <span className="text-festiveGold-400 italic">Hala Bira</span> Beat — Stay Close to the Action
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Curated hotels and stays across Iloilo City for Dinagyang Festival weekend. Compare walkability to parade &amp; judging zones, street-closure realities, and nightly PHP rates before you book.
            </p>
          </div>

          <SearchFilterBar
            checkinDate={checkinDate}
            setCheckinDate={handleCheckinChange}
            checkoutDate={checkoutDate}
            setCheckoutDate={handleCheckoutChange}
            zoneFilter={zoneFilter}
            setZoneFilter={setZoneFilter}
            budgetFilter={budgetFilter}
            setBudgetFilter={setBudgetFilter}
            guestCount={guestCount}
            setGuestCount={setGuestCount}
            nights={nights}
            onReset={handleResetAll}
          />
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        <section id="stays-catalog">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-terracotta-400 font-bold">
                Curated Festival Stays
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Iloilo City Accommodations{" "}
                <span className="text-lg font-sans font-semibold text-festiveGold-400 ml-1">
                  ({visibleStays.length})
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2.5">
              <label
                htmlFor="sortSelect"
                className="text-xs uppercase tracking-wider text-slate-400 font-semibold"
              >
                Sort by:
              </label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-indigoDeep-900 border border-festiveGold-400/30 text-xs sm:text-sm font-semibold text-festiveGold-300 focus:outline-none"
              >
                <option value="RECOMMENDED">Recommended</option>
                <option value="PROXIMITY">Proximity to Stages</option>
                <option value="PRICE_ASC">Price: Low to High</option>
                <option value="PRICE_DESC">Price: High to Low</option>
              </select>
            </div>
          </div>

          {apiError && (
            <div className="glass-panel rounded-2xl p-5 border border-terracotta-400/40 text-sm text-terracotta-400 mb-6">
              {apiError}
            </div>
          )}

          {loading ? (
            <div className="glass-panel rounded-3xl p-10 text-center text-sm text-slate-300">
              Loading Iloilo City festival stays...
            </div>
          ) : visibleStays.length === 0 ? (
            <div className="glass-panel rounded-3xl p-10 text-center my-6">
              <i className="fa-solid fa-compass text-4xl text-festiveGold-400 mb-3" />
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                No stays match your current filters
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-5">
                Try expanding your nightly budget, switching to All Zones, or turning off the Saved filter.
              </p>
              <button
                type="button"
                onClick={handleResetAll}
                className="btn-festive px-6 py-2.5 rounded-xl text-sm font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleStays.map((hotel) => (
                <AccommodationCard
                  key={hotel._id}
                  hotel={hotel}
                  nights={nights}
                  isSaved={savedIds.includes(hotel._id)}
                  onToggleShortlist={handleToggleShortlist}
                  onReserve={(stay) => setSelectedHotel(stay)}
                />
              ))}
            </div>
          )}
        </section>

        <StayGuideSection />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-indigoDeep-950 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-fire-flame-curved text-festiveGold-400" />
            <span className="font-display text-base font-bold text-white">
              Hala Bira Stays
            </span>
            <span>• Iloilo City Dinagyang Festival Accommodation Guide</span>
          </div>
          <p className="text-center md:text-right text-slate-400 max-w-xl">
            <strong className="text-festiveGold-300">
              Demo &amp; Sample Rate Disclaimer:
            </strong>{" "}
            Nightly PHP rates, proximity estimates, and room availability shown are illustrative sample data for festival planning and booking simulation—not live hotel inventory.
          </p>
        </div>
      </footer>

      {selectedHotel && (
        <BookingModal
          hotel={selectedHotel}
          checkinDate={checkinDate}
          checkoutDate={checkoutDate}
          nights={nights}
          guests={guestCount}
          onClose={() => setSelectedHotel(null)}
        />
      )}

      {showReservationsModal && (
        <ReservationsModal onClose={() => setShowReservationsModal(false)} />
      )}
    </div>
  );
}