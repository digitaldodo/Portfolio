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
  return (
    <aside
      className="performance-strip relative w-full max-w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-xl"
      aria-label="Portfolio engineering signals"
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        {performanceSignals.map(([label, value]) => (
          <div key={label} className="flex min-w-0 items-center gap-3 text-xs sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold/80" />
            <span className="font-heading shrink-0 font-bold uppercase text-brand-gold">{label}:</span>
            <span className="font-semibold text-zinc-200">{value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
