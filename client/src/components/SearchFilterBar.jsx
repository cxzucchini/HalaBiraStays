function formatDateShort(isoStr) {
  if (!isoStr) return "";
  const d = new Date(`${isoStr}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function SearchFilterBar({
  checkinDate,
  setCheckinDate,
  checkoutDate,
  setCheckoutDate,
  zoneFilter,
  setZoneFilter,
  budgetFilter,
  setBudgetFilter,
  guestCount,
  setGuestCount,
  nights,
  onReset,
}) {
  return (
    <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 items-end">
        <div>
          <label
            htmlFor="checkinDate"
            className="block text-[11px] font-bold uppercase tracking-wider text-festiveGold-300 mb-1.5"
          >
            Check-In
          </label>
          <input
            type="date"
            id="checkinDate"
            value={checkinDate}
            onChange={(e) => setCheckinDate(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-indigoDeep-950 border border-white/15 focus:border-festiveGold-400 focus:outline-none text-xs sm:text-sm text-white"
          />
        </div>

        <div>
          <label
            htmlFor="checkoutDate"
            className="block text-[11px] font-bold uppercase tracking-wider text-festiveGold-300 mb-1.5"
          >
            Check-Out
          </label>
          <input
            type="date"
            id="checkoutDate"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-indigoDeep-950 border border-white/15 focus:border-festiveGold-400 focus:outline-none text-xs sm:text-sm text-white"
          />
        </div>

        <div>
          <label
            htmlFor="zoneFilter"
            className="block text-[11px] font-bold uppercase tracking-wider text-festiveGold-300 mb-1.5"
          >
            District / Zone
          </label>
          <select
            id="zoneFilter"
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-indigoDeep-950 border border-white/15 focus:border-festiveGold-400 focus:outline-none text-xs sm:text-sm text-white"
          >
            <option value="ALL">All Zones</option>
            <option value="City Proper / Parade Route">City Proper / Parade Route</option>
            <option value="Mandurriao / Business Park">Mandurriao / Business Park</option>
            <option value="Molo / Esplanade">Molo / Esplanade</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="budgetFilter"
            className="block text-[11px] font-bold uppercase tracking-wider text-festiveGold-300 mb-1.5"
          >
            Nightly Budget (PHP)
          </label>
          <select
            id="budgetFilter"
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-indigoDeep-950 border border-white/15 focus:border-festiveGold-400 focus:outline-none text-xs sm:text-sm text-white"
          >
            <option value="ALL">Any Budget</option>
            <option value="UNDER_3500">Under ₱3,500 / night</option>
            <option value="3500_5500">₱3,500 – ₱5,500 / night</option>
            <option value="OVER_5500">₱5,500+ / night</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="guestCount"
            className="block text-[11px] font-bold uppercase tracking-wider text-festiveGold-300 mb-1.5"
          >
            Guests
          </label>
          <select
            id="guestCount"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-indigoDeep-950 border border-white/15 focus:border-festiveGold-400 focus:outline-none text-xs sm:text-sm text-white"
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onReset}
            title="Reset all filters"
            className="w-full py-2.5 px-4 rounded-xl bg-indigoDeep-800 hover:bg-indigoDeep-700 border border-white/15 text-xs sm:text-sm font-semibold text-slate-200 transition flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-rotate-left text-festiveGold-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
        <div>
          Showing rates for{" "}
          <strong className="text-festiveGold-300">
            {nights} {nights === 1 ? "night" : "nights"}
          </strong>{" "}
          ({formatDateShort(checkinDate)} – {formatDateShort(checkoutDate)}) •{" "}
          <strong className="text-white">
            {guestCount} {guestCount === "1" ? "Guest" : "Guests"}
          </strong>
        </div>
        <div className="text-slate-400">
          Tip: Pick <span className="text-terracotta-400 font-semibold">City Proper</span> for car-free walking to parade &amp; judging areas.
        </div>
      </div>
    </div>
  );
}