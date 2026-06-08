"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  Download,
  Eye,
  FileText,
  Flame,
  Home,
  Layers3,
  Mail,
  UserRound,
  X
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: UserRound },
  { label: "Mindset", href: "#mindset", icon: Flame },
  { label: "Stack", href: "#stack", icon: BriefcaseBusiness },
  { label: "Projects", href: "#projects", icon: Layers3 },
  { label: "Execution Log", href: "#execution-log", icon: Clock3 },
  { label: "Credentials", href: "#credentials", icon: BadgeCheck },
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
      transition={{ type: "spring", stiffness: 100, damping: 14 }}
      className="fixed inset-x-0 top-3 z-50 px-4 sm:top-5"
    >
      <nav className="section-shell nav-shell flex min-h-16 items-center justify-between gap-2 rounded-lg px-3 py-2">
        <a
          href="#home"
          className="focus-ring group inline-flex h-12 shrink-0 items-center gap-3 rounded-md px-1.5 pr-3 transition hover:bg-white/[0.04]"
          aria-label="Go to home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-black">
            <Image src={logoPath} alt="" width={36} height={36} className="portfolio-logo h-9 w-9" priority />
          </span>
          <span className="font-heading hidden text-sm font-semibold text-white sm:inline">Ansh Gupta</span>
        </a>

        <div className="nav-scrollbar flex min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto px-1 md:justify-center">
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              data-active={activeHref === href}
              className="focus-ring group relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.055] hover:text-white data-[active=true]:text-white"
              aria-label={label}
              aria-current={activeHref === href ? "page" : undefined}
            >
              <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 transition group-hover:scale-x-100 group-hover:opacity-70 group-data-[active=true]:scale-x-100 group-data-[active=true]:opacity-100" />
              <Icon
                aria-hidden="true"
                size={16}
                className="text-zinc-600 transition group-hover:text-brand-gold group-data-[active=true]:text-brand-gold"
              />
              <span className="hidden whitespace-nowrap md:inline">{label}</span>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="focus-ring glow-button hidden items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-brand-gold/45 hover:text-white lg:inline-flex"
        >
          <Mail aria-hidden="true" size={16} />
          <span className="hidden whitespace-nowrap lg:inline">Connect</span>
        </a>

        <div className="hidden items-center gap-2 2xl:flex">
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring glow-button inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-brand-gold/45 hover:text-white"
          >
            <Eye aria-hidden="true" size={16} />
            <span className="whitespace-nowrap">View Resume</span>
          </a>
          <a
            href={resumePath}
            download="Ansh_Gupta_Resume.pdf"
            className="focus-ring glow-button inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-3 py-2 text-sm font-bold text-surface-black transition hover:bg-white"
          >
            <Download aria-hidden="true" size={16} />
            <span className="whitespace-nowrap">Download Resume</span>
          </a>
        </div>

        <div className="relative 2xl:hidden">
          <button
            type="button"
            aria-label={isResumeMenuOpen ? "Close resume menu" : "Open resume menu"}
            aria-expanded={isResumeMenuOpen}
            onClick={() => setIsResumeMenuOpen((isOpen) => !isOpen)}
            className="focus-ring glow-button inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-100 transition hover:border-brand-gold/45 hover:text-white"
          >
            {isResumeMenuOpen ? <X aria-hidden="true" size={17} /> : <FileText aria-hidden="true" size={17} />}
          </button>

          {isResumeMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-0 top-12 w-56 rounded-lg border border-white/10 bg-surface-charcoal/95 p-2 shadow-[0_22px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl"
            >
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsResumeMenuOpen(false)}
                className="focus-ring flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-zinc-100 transition hover:bg-white/10 hover:text-white"
              >
                <Eye aria-hidden="true" size={16} className="text-brand-gold" />
                View Resume
              </a>
              <a
                href={resumePath}
                download="Ansh_Gupta_Resume.pdf"
                onClick={() => setIsResumeMenuOpen(false)}
                className="focus-ring mt-1 flex items-center gap-2 rounded-md bg-brand-gold px-3 py-2.5 text-sm font-bold text-surface-black transition hover:bg-white"
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
