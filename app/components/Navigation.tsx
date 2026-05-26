"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BriefcaseBusiness,
  Clock3,
  Download,
  Eye,
  FileText,
  Home,
  Mail,
  Medal,
  Trophy,
  UserRound,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: UserRound },
  { label: "Kitbag", href: "#kitbag", icon: BriefcaseBusiness },
  { label: "Projects", href: "#projects", icon: Medal },
  { label: "Recent Innings", href: "#recent-innings", icon: Clock3 },
  { label: "Trophy Cabinet", href: "#trophy-cabinet", icon: Trophy },
  { label: "Contact", href: "#contact", icon: Mail }
];

const resumePath = "/assets/Ansh_Gupta_Resume.pdf";
const logoPath = "/assets/ag-logo.svg";

export function Navigation() {
  const [activeHref, setActiveHref] = useState("#home");
  const [isResumeMenuOpen, setIsResumeMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (activeEntry?.target.id) {
          setActiveHref(`#${activeEntry.target.id}`);
        }
      },
      {
        rootMargin: "-28% 0px -56% 0px",
        threshold: [0.12, 0.28, 0.45]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

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
          className="focus-ring inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md"
          aria-label="Go to home"
        >
          <Image src={logoPath} alt="" width={44} height={44} className="portfolio-logo h-11 w-11" priority />
        </a>

        <div className="nav-scrollbar flex flex-1 items-center justify-center gap-1 overflow-x-auto px-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              data-active={activeHref === href}
              className="focus-ring group relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white data-[active=true]:text-white"
              aria-label={label}
              aria-current={activeHref === href ? "page" : undefined}
            >
              <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-rcb-gold to-transparent opacity-0 transition group-hover:scale-x-100 group-hover:opacity-70 group-data-[active=true]:scale-x-100 group-data-[active=true]:opacity-100" />
              <Icon
                aria-hidden="true"
                size={16}
                className="text-zinc-500 transition group-hover:text-rcb-gold group-data-[active=true]:text-rcb-gold"
              />
              <span className="hidden whitespace-nowrap md:inline">{label}</span>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="focus-ring glow-button hidden items-center justify-center gap-2 rounded-md border border-rcb-gold/35 bg-rcb-gold/10 px-3 py-2 text-sm font-semibold text-rcb-gold transition hover:border-rcb-gold hover:bg-rcb-gold hover:text-pitch-black lg:inline-flex"
        >
          <Mail aria-hidden="true" size={16} />
          <span className="hidden whitespace-nowrap lg:inline">Open Net</span>
        </a>

        <div className="hidden items-center gap-2 xl:flex">
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring glow-button inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-rcb-gold/50 hover:text-white"
          >
            <Eye aria-hidden="true" size={16} />
            <span className="whitespace-nowrap">View Resume</span>
          </a>
          <a
            href={resumePath}
            download="Ansh_Gupta_Resume.pdf"
            className="focus-ring glow-button inline-flex items-center justify-center gap-2 rounded-md bg-rcb-gold px-3 py-2 text-sm font-bold text-pitch-black transition hover:bg-white"
          >
            <Download aria-hidden="true" size={16} />
            <span className="whitespace-nowrap">Download Resume</span>
          </a>
        </div>

        <div className="relative xl:hidden">
          <button
            type="button"
            aria-label={isResumeMenuOpen ? "Close resume menu" : "Open resume menu"}
            aria-expanded={isResumeMenuOpen}
            onClick={() => setIsResumeMenuOpen((isOpen) => !isOpen)}
            className="focus-ring glow-button inline-flex h-10 w-10 items-center justify-center rounded-md border border-rcb-gold/35 bg-rcb-gold/10 text-rcb-gold transition hover:border-rcb-gold hover:bg-rcb-gold hover:text-pitch-black"
          >
            {isResumeMenuOpen ? <X aria-hidden="true" size={17} /> : <FileText aria-hidden="true" size={17} />}
          </button>

          {isResumeMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-0 top-12 w-56 rounded-lg border border-white/10 bg-pitch-charcoal/95 p-2 shadow-[0_22px_70px_rgba(0,0,0,0.45),0_0_28px_rgba(212,175,55,0.16)] backdrop-blur-xl"
            >
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsResumeMenuOpen(false)}
                className="focus-ring flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-zinc-100 transition hover:bg-white/10 hover:text-white"
              >
                <Eye aria-hidden="true" size={16} className="text-rcb-gold" />
                View Resume
              </a>
              <a
                href={resumePath}
                download="Ansh_Gupta_Resume.pdf"
                onClick={() => setIsResumeMenuOpen(false)}
                className="focus-ring mt-1 flex items-center gap-2 rounded-md bg-rcb-gold px-3 py-2.5 text-sm font-bold text-pitch-black transition hover:bg-white"
              >
                <Download aria-hidden="true" size={16} />
                Download Resume
              </a>
            </motion.div>
          ) : null}
        </div>
      </nav>
    </motion.header>
  );
}
