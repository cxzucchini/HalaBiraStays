import { useState } from "react";

export default function StayGuideSection() {
  const [activeTab, setActiveTab] = useState("closures");

  return (
    <section
      id="stay-guide"
      className="glass-panel rounded-3xl p-6 sm:p-10 border border-festiveGold-400/25"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-festiveGold-400 font-bold">
            Local Festival Playbook
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">
            Dinagyang Stay &amp; Route Guide
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mt-1">
            Navigate road closures, crowd surges, and tribe drum schedules like a seasoned Ilonggo festivalgoer.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 bg-indigoDeep-950 p-1.5 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("closures")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "closures"
                ? "bg-terracotta-500 text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <i className="fa-solid fa-road-barrier mr-1.5" />
            Street Closures &amp; Walkability
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("zones")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "zones"
                ? "bg-terracotta-500 text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <i className="fa-solid fa-users mr-1.5" />
            Best Zones by Traveler
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("checklist")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "checklist"
                ? "bg-terracotta-500 text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <i className="fa-solid fa-list-check mr-1.5" />
            Festival Stay Checklist
          </button>
        </div>
      </div>

      {activeTab === "closures" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-indigoDeep-950/90 border border-terracotta-500/30 rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-terracotta-500/20 text-terracotta-400 flex items-center justify-center mb-3">
              <i className="fa-solid fa-shoe-prints text-lg" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">
              City Proper = Walkable Freedom
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Major parade corridors and judging areas in City Proper close early to private vehicles and regular public jeepneys. Staying in City Proper lets you walk directly to viewing spots and return mid-day to cool down without fighting traffic reroutes.
            </p>
          </div>
          <div className="bg-indigoDeep-950/90 border border-festiveGold-400/25 rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-festiveGold-400/15 text-festiveGold-400 flex items-center justify-center mb-3">
              <i className="fa-solid fa-car-side text-lg" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">
              Mandurriao &amp; Molo = Plan Early Transit
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hotels in Mandurriao / Iloilo Business Park and Molo / Esplanade offer spacious modern rooms and quieter evenings, but ride-hailing or transit into City Proper takes longer during peak parade hours—depart early or mix walking with designated drop-off points.
            </p>
          </div>
          <div className="bg-indigoDeep-950/90 border border-white/10 rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-3">
              <i className="fa-solid fa-clock text-lg" />
            </div>
            <h3 className="font-bold text-white text-base mb-2">
              Buffer Your Parade Arrival
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Street barricades and crowd density tighten quickly on main festival days. Aim to leave your hotel at least 60–90 minutes before tribe performances begin, and carry a printed or offline hotel address for perimeter checkpoints.
            </p>
          </div>
        </div>
      )}

      {activeTab === "zones" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-indigoDeep-950/90 border border-terracotta-500/30 rounded-2xl p-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta-400">
              Parade Walkers
            </span>
            <h3 className="font-bold text-white text-lg mt-1 mb-2">
              City Proper / Parade Route
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
              Ideal if your main goal is catching street warriors, judging performances, and heritage spots on foot without relying on vehicles.
            </p>
            <div className="text-xs text-festiveGold-300 font-semibold">
              Top picks: Citadines Amigo, Harbor Town Hotel, Hotel Del Rio
            </div>
          </div>
          <div className="bg-indigoDeep-950/90 border border-festiveGold-400/25 rounded-2xl p-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-festiveGold-400">
              Families &amp; Groups
            </span>
            <h3 className="font-bold text-white text-lg mt-1 mb-2">
              Mandurriao / Business Park
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
              Great for families, multi-room groups, or travelers wanting wide sidewalks, mall dining, pools, and calmer recovery spaces away from street crowds.
            </p>
            <div className="text-xs text-festiveGold-300 font-semibold">
              Top picks: Courtyard by Marriott, Richmonde Hotel, Seda Atria
            </div>
          </div>
          <div className="bg-indigoDeep-950/90 border border-white/10 rounded-2xl p-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Nightlife &amp; Comfort
            </span>
            <h3 className="font-bold text-white text-lg mt-1 mb-2">
              Smallville &amp; Esplanade Corridor
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
              Suited for travelers who want evening dining, social hangouts, riverside jogs along the Esplanade, and comfortable mid-to-upscale rooms.
            </p>
            <div className="text-xs text-festiveGold-300 font-semibold">
              Top picks: Smallville 21 Hotel, Days Hotel, Goldberry Lite
            </div>
          </div>
        </div>
      )}

      {activeTab === "checklist" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigoDeep-950/90 border border-white/10 rounded-2xl p-4">
            <div className="text-festiveGold-400 font-bold text-sm mb-1.5">
              <i className="fa-solid fa-bed mr-1.5" />
              Early Check-In &amp; Late Rest
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Request early luggage drop-off if arriving on morning flights, and pack an eye mask if your room faces busy festival streets.
            </p>
          </div>
          <div className="bg-indigoDeep-950/90 border border-white/10 rounded-2xl p-4">
            <div className="text-sky-400 font-bold text-sm mb-1.5">
              <i className="fa-solid fa-bottle-water mr-1.5" />
              Hydration &amp; Sun Gear
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Iloilo&apos;s January sun and crowd heat can be intense. Bring a refillable tumbler, electrolytes, cap, and breathable clothing.
            </p>
          </div>
          <div className="bg-indigoDeep-950/90 border border-white/10 rounded-2xl p-4">
            <div className="text-terracotta-400 font-bold text-sm mb-1.5">
              <i className="fa-solid fa-ear-listen mr-1.5" />
              Ear Protection for Drums
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Massed percussion and tribe drums are thrilling up close—pack light ear plugs for kids, sensitive ears, or front-row spots.
            </p>
          </div>
          <div className="bg-indigoDeep-950/90 border border-white/10 rounded-2xl p-4">
            <div className="text-emerald-400 font-bold text-sm mb-1.5">
              <i className="fa-solid fa-battery-full mr-1.5" />
              Powerbank &amp; Offline Map
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Keep a charged powerbank handy for photos and e-payments, and save your hotel pin offline in case mobile data slows down.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}