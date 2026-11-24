function formatPHP(amount) {
  return `₱${Number(amount).toLocaleString("en-PH")}`;
}

export default function AccommodationCard({
  hotel,
  nights,
  isSaved,
  onToggleShortlist,
  onReserve,
}) {
  const stayTotal = hotel.nightlyRate * nights;

  return (
    <article className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-festiveGold-400/45 transition-all duration-200 hover:-translate-y-0.5">
      <div>
        <div
          className={`h-36 bg-gradient-to-br ${hotel.accentGradient} p-5 flex flex-col justify-between relative`}
        >
          <div className="flex items-start justify-between gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigoDeep-950/75 border border-festiveGold-400/30 text-[11px] font-bold uppercase tracking-wider text-festiveGold-300">
              {hotel.badge}
            </span>
            <button
              type="button"
              onClick={() => onToggleShortlist(hotel._id)}
              aria-label={`Save ${hotel.name}`}
              className="w-9 h-9 rounded-full bg-indigoDeep-950/75 hover:bg-indigoDeep-900 border border-white/15 flex items-center justify-center transition"
            >
              <i
                className={`${
                  isSaved
                    ? "fa-solid text-terracotta-400"
                    : "fa-regular text-slate-300"
                } fa-heart text-sm`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between text-xs text-white/90">
            <span className="font-semibold flex items-center gap-1.5">
              <i className="fa-solid fa-map-pin text-festiveGold-400" /> {hotel.zone}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/40 font-bold text-festiveGold-300">
              <i className="fa-solid fa-star text-festiveGold-400 mr-1" />
              {Number(hotel.rating).toFixed(1)} ({hotel.reviews})
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3.5">
          <h3 className="font-display text-2xl font-bold text-white leading-snug">
            {hotel.name}
          </h3>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2 bg-indigoDeep-950/70 p-2.5 rounded-xl border border-white/5">
              <i className="fa-solid fa-person-walking text-festiveGold-400 mt-0.5" />
              <span>
                <strong className="text-white">Stage Access:</strong> {hotel.proximityLabel}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed pl-1">
              <i className="fa-solid fa-circle-info text-terracotta-400 mr-1" />
              {hotel.closureTip}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {(hotel.amenities || []).map((am) => (
              <span
                key={am}
                className="px-2.5 py-1 rounded-lg bg-indigoDeep-800/90 text-[11px] font-medium text-slate-300 border border-white/5"
              >
                {am}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold text-festiveGold-400">
            {formatPHP(hotel.nightlyRate)}{" "}
            <span className="text-xs font-normal text-slate-400">/ night</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Est. {nights}n:{" "}
            <strong className="text-slate-200">{formatPHP(stayTotal)}</strong>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onReserve(hotel)}
          className="btn-festive px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap"
        >
          Reserve Stay
        </button>
      </div>
    </article>
  );
}