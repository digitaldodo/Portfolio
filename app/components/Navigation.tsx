"use client";

import Image from "next/image";
import { FileText, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Profile", href: "#about" },
  { label: "Craft", href: "#mindset" },
  { label: "Stack", href: "#stack" },
  { label: "Project", href: "#projects" },
  { label: "Proof", href: "#credentials" },
  { label: "Contact", href: "#contact" }
];

const resumePath = "/assets/Ansh_Gupta_Resume.pdf";
const logoPath = "/assets/ag-logo.svg";

export function Navigation() {
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      const sections = [
        document.querySelector<HTMLElement>("#home"),
        ...navItems.map((item) => document.querySelector<HTMLElement>(item.href))
      ].filter((section): section is HTMLElement => section !== null);
      const marker = window.scrollY + window.innerHeight * 0.36;
      const currentSection = sections.reduce((current, section) => {
        if (section.offsetTop <= marker) {
          return section;
        }
        return current;
      }, sections[0]);

      if (currentSection?.id) {
        setActiveHref(`#${currentSection.id}`);
      }

      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="section-shell nav-shell flex min-h-14 items-center justify-between gap-4 px-2.5 py-2">
        <a
          href="#home"
          className="focus-ring inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-1.5 pr-3 text-sm font-semibold text-white"
          aria-label="Go to home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04]">
            <Image src={logoPath} alt="" width={34} height={34} className="portfolio-logo h-8 w-8" priority />
          </span>
          <span className="hidden sm:inline">Ansh Gupta</span>
        </a>

        <div className="nav-scrollbar flex min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto md:justify-center">
          {navItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              data-active={activeHref === href}
              className="focus-ring nav-link px-3 py-2 text-sm font-medium text-zinc-500 transition data-[active=true]:text-white"
              aria-current={activeHref === href ? "page" : undefined}
            >
              <span className="whitespace-nowrap">{label}</span>
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring nav-icon-link inline-flex h-10 w-10 items-center justify-center text-zinc-400 transition"
            aria-label="Open resume"
          >
            <FileText aria-hidden="true" size={17} />
          </a>
          <a
            href="mailto:anshguptakmrn@gmail.com"
            className="focus-ring nav-contact-link hidden h-10 items-center justify-center gap-2 bg-white px-4 text-sm font-semibold text-surface-black transition sm:inline-flex"
          >
            <Mail aria-hidden="true" size={15} />
            Connect
          </a>
        </div>
      </nav>
    </header>
  );
}
