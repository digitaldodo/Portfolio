"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Home, Mail, Medal, Trophy, UserRound } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: UserRound },
  { label: "Kitbag", href: "#kitbag", icon: BriefcaseBusiness },
  { label: "Projects", href: "#projects", icon: Medal },
  { label: "Trophy Cabinet", href: "#trophy-cabinet", icon: Trophy },
  { label: "Contact", href: "#contact", icon: Mail }
];

export function Navigation() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      className="fixed inset-x-0 top-3 z-50 px-4 sm:top-5"
    >
      <nav className="section-shell glass-panel flex min-h-16 items-center justify-between gap-2 rounded-lg px-3 py-2">
        <a
          href="#home"
          className="focus-ring font-heading rounded-md px-2 text-base font-bold text-white"
          aria-label="Go to home"
        >
          AG<span className="text-rcb-gold">.</span>
        </a>

        <div className="flex flex-1 items-center justify-center gap-1 overflow-x-auto px-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="focus-ring group inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
              aria-label={label}
            >
              <Icon
                aria-hidden="true"
                size={16}
                className="text-zinc-500 transition group-hover:text-rcb-gold"
              />
              <span className="hidden whitespace-nowrap md:inline">{label}</span>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-rcb-gold/35 bg-rcb-gold/10 px-3 py-2 text-sm font-semibold text-rcb-gold transition hover:border-rcb-gold hover:bg-rcb-gold hover:text-pitch-black"
        >
          <Mail aria-hidden="true" size={16} />
          <span className="hidden whitespace-nowrap lg:inline">Open Net</span>
        </a>
      </nav>
    </motion.header>
  );
}
