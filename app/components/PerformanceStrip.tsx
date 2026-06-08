"use client";

const performanceSignals = [
  ["Current Mode", "Building scalable product systems"],
  ["Execution", "Reliable release rhythm"],
  ["Systems", "Full-stack, mobile, backend"],
  ["Practice", "200+ problems solved"],
  ["Deployments", "Live production surfaces"],
  ["Status", "Available for focused teams"]
];

export function PerformanceStrip() {
  const tickerItems = [...performanceSignals, ...performanceSignals];

  return (
    <aside
      className="performance-strip group relative w-full max-w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-[0_16px_54px_rgba(0,0,0,0.28),0_0_28px_rgba(212,175,55,0.14)] backdrop-blur-xl"
      aria-label="Portfolio engineering signals"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-surface-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-surface-black to-transparent" />
      <div className="ticker-track flex w-max items-center gap-7 py-2.5">
        {tickerItems.map(([label, value], index) => (
          <div key={`${label}-${index}`} className="flex items-center gap-3 whitespace-nowrap px-1 text-xs sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-crimson shadow-[0_0_14px_rgba(220,38,38,0.72)]" />
            <span className="font-heading font-bold uppercase text-brand-gold">{label}:</span>
            <span className="font-semibold text-zinc-200">{value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
