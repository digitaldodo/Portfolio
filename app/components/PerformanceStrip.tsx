"use client";

const performanceSignals = [
  "Product-minded software engineer",
  "Full-stack systems + mobile",
  "Available for impactful teams"
];

export function PerformanceStrip() {
  return (
    <aside
      className="w-full max-w-full border-y border-white/[0.08] bg-white/[0.018] backdrop-blur-xl"
      aria-label="Portfolio focus"
    >
      <div className="grid gap-0 sm:grid-cols-3">
        {performanceSignals.map((signal, index) => (
          <p
            key={signal}
            className={`flex min-h-12 items-center px-1 py-3 text-sm font-medium leading-6 text-zinc-300 sm:justify-center sm:px-5 sm:text-center ${
              index > 0 ? "border-t border-white/[0.06] sm:border-l sm:border-t-0" : ""
            }`}
          >
            {signal}
          </p>
        ))}
      </div>
    </aside>
  );
}
