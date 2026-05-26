"use client";

import {
  ArrowUpRight,
  Award,
  Code2,
  Database,
  Download,
  Eye,
  ExternalLink,
  Gauge,
  Layers3,
  Mail,
  Phone,
  Route,
  ScanLine,
  Server,
  ShieldCheck,
  Star,
  Smartphone,
  Trophy,
  Zap
} from "lucide-react";
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { AmbientLighting } from "./components/AmbientLighting";
import { LiveMatchStrip } from "./components/LiveMatchStrip";
import { Navigation } from "./components/Navigation";
import { PitchScrollTracker } from "./components/PitchScrollTracker";
import { SkillsSection } from "./components/SkillsSection";

const accessFlowProject = {
  name: "AccessFlow",
  liveLink: "https://accessflow-web.onrender.com",
  stack: ["React", "React Native", "Spring Boot", "MongoDB", "Firebase"],
  description:
    "An enterprise-grade visitor and workforce management platform featuring real-time operational visibility and role-based access control. Streamlined visitor approvals and security workflows through QR-based access via dedicated web and mobile applications."
};

const trophies = [
  {
    title: "Leadership and Team Effectiveness",
    year: "2026",
    issuer: "IIT Roorkee / NPTEL",
    result: "Top 1% Topper, Score: 90",
    rarity: "Player of the Match",
    highlight: true
  },
  {
    title: "Management Information System",
    year: "2025",
    issuer: "NPTEL",
    result: "Elite + Gold, Score: 92",
    rarity: "Gold Medal"
  },
  {
    title: "Intro. to Environmental Engineering",
    year: "2025",
    issuer: "NPTEL",
    result: "Elite + Silver, Score: 84",
    rarity: "Silver Medal"
  },
  {
    title: "Software Engineering",
    year: "2024",
    issuer: "NPTEL",
    result: "Elite, Score: 73",
    rarity: "Elite"
  },
  {
    title: "Problem Solving",
    year: "Ongoing",
    issuer: "GeeksforGeeks and LeetCode",
    result: "Solved 200+ coding challenges combined",
    rarity: "Consistency Streak"
  }
];

const careerStats = [
  {
    inningsLabel: "Matches Played",
    label: "Projects Built",
    value: 1,
    suffix: "+",
    detail: "Flagship full-stack platform",
    icon: Layers3
  },
  {
    inningsLabel: "Runs Scored",
    label: "Problems Solved",
    value: 200,
    suffix: "+",
    detail: "Across GFG and LeetCode",
    icon: Code2
  },
  {
    inningsLabel: "Batting Average",
    label: "CGPA",
    value: 8.43,
    decimals: 2,
    detail: "B.Tech CSE, GLA University",
    icon: Gauge
  },
  {
    inningsLabel: "Partnerships",
    label: "Team Skills",
    value: 3,
    suffix: "+",
    detail: "Leadership, communication, delivery",
    icon: ShieldCheck
  }
];

const recentInnings = [
  {
    title: "Built AccessFlow mobile app",
    description:
      "Created a field-ready React Native interface for visitor and workforce access workflows.",
    icon: Smartphone
  },
  {
    title: "Implemented role-based workflows",
    description:
      "Designed approval paths and access boundaries for admins, guards, and operational users.",
    icon: Route
  },
  {
    title: "Deployed production backend",
    description:
      "Published Spring Boot services with MongoDB-backed data flows for real operational use.",
    icon: Server
  },
  {
    title: "Improved dashboard UX",
    description:
      "Refined high-signal views so teams can scan visitor status and security activity faster.",
    icon: Database
  },
  {
    title: "Solved 200+ DSA problems",
    description:
      "Maintained steady problem-solving practice across GeeksforGeeks and LeetCode.",
    icon: Code2
  }
];

const resumePath = "/assets/Ansh_Gupta_Resume.pdf";
const logoPath = "/assets/ag-logo.svg";

const batSwingTransition = { duration: 0.4, ease: "easeOut" as const };

const buttonHover = {
  scale: 1.05,
  filter: "drop-shadow(0 0 18px rgba(220, 38, 38, 0.72))"
};

function SectionHeading({
  label,
  title,
  copy
}: {
  label: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-heading mb-3 text-sm font-bold uppercase text-rcb-gold">{label}</p>
      <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">{copy}</p>
    </div>
  );
}

function AnimatedNumber({
  value,
  decimals = 0,
  suffix = ""
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (latest) => `${latest.toFixed(decimals)}${suffix}`);
  const isInView = useInView(ref, { once: true, amount: 0.65 });

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: "easeOut"
    });

    return controls.stop;
  }, [isInView, motionValue, value]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

function CareerStatsScorecard() {
  return (
    <div className="relative">
      <div className="absolute inset-x-8 -top-5 h-px bg-gradient-to-r from-transparent via-rcb-gold to-transparent" />
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 190, damping: 18 }}
        className="glass-panel stadium-card rounded-lg p-4"
      >
        <div className="scoreboard-flicker relative overflow-hidden rounded-lg border border-white/10 bg-pitch-charcoal p-5">
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="font-heading text-sm font-bold text-rcb-gold">LIVE SCORECARD</p>
              <p className="mt-1 text-sm text-zinc-400">Full-stack innings in progress</p>
            </div>
            <Trophy className="text-rcb-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.44)]" aria-hidden="true" size={24} />
          </div>

          <div className="relative z-10 grid gap-3 py-5 sm:grid-cols-2">
            {careerStats.map(({ inningsLabel, label, value, suffix, decimals, detail, icon: Icon }) => (
              <div
                key={label}
                className="stadium-card rounded-md border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading text-[11px] font-bold uppercase text-rcb-gold/80">{inningsLabel}</p>
                    <p className="font-heading mt-2 text-3xl font-bold text-white">
                      <AnimatedNumber value={value} decimals={decimals} suffix={suffix} />
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-300">{label}</p>
                  </div>
                  <Icon aria-hidden="true" size={20} className="mt-1 shrink-0 text-rcb-gold" />
                </div>
                <p className="relative z-10 mt-3 text-xs leading-5 text-zinc-500">{detail}</p>
              </div>
            ))}
          </div>

          <div className="relative z-10 rounded-md border border-rcb-crimson/35 bg-rcb-crimson/10 p-4 shadow-[0_0_24px_rgba(220,38,38,0.08)]">
            <p className="font-heading text-lg font-bold text-white">Current Crease</p>
            <p className="mt-2 leading-7 text-zinc-300">
              Designing clean product flows, secure backends, and frontend systems that feel fast from the first click.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AccessFlowCard() {
  const [isHovered, setIsHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(pointerX, [-0.5, 0.5], ["-11deg", "11deg"]);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setIsHovered(true);
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div className="mt-10 [perspective:1200px]">
      <motion.article
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="glass-panel stadium-card group relative overflow-hidden rounded-lg p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(212,175,55,0.2),transparent_30%),linear-gradient(135deg,rgba(220,38,38,0.16),transparent_46%)] opacity-80" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rcb-gold to-transparent opacity-80" />

        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-rcb-crimson/40 bg-rcb-crimson/10 px-3 py-2 text-sm font-bold uppercase text-rcb-crimson">
              <ShieldCheck aria-hidden="true" size={16} />
              Full-stack platform
            </div>
            <h3 className="font-heading text-4xl font-bold text-white sm:text-5xl">{accessFlowProject.name}</h3>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">
              {accessFlowProject.description}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="stadium-card rounded-md border border-white/10 bg-pitch-charcoal/80 p-4 backdrop-blur-md">
                <ScanLine className="text-rcb-gold" aria-hidden="true" size={22} />
                <p className="font-heading mt-4 text-lg font-bold text-white">QR Access</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Visitor entry flows and approval gates.</p>
              </div>
              <div className="stadium-card rounded-md border border-white/10 bg-pitch-charcoal/80 p-4 backdrop-blur-md">
                <Smartphone className="text-rcb-gold" aria-hidden="true" size={22} />
                <p className="font-heading mt-4 text-lg font-bold text-white">Web + Mobile</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Dedicated interfaces for teams in motion.</p>
              </div>
            </div>
            <motion.a
              href={accessFlowProject.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              className="focus-ring glow-button inline-flex items-center justify-center gap-2 rounded-md bg-rcb-gold px-5 py-3 text-sm font-bold text-pitch-black transition hover:bg-white"
            >
              Open Live Build
              <ExternalLink aria-hidden="true" size={18} />
            </motion.a>
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap gap-2">
          {accessFlowProject.stack.map((tech, index) => (
            <motion.span
              key={tech}
              animate={
                isHovered
                  ? {
                      borderColor: "rgba(212, 175, 55, 0.88)",
                      backgroundColor: "rgba(212, 175, 55, 0.16)",
                      color: "#ffffff",
                      boxShadow: "0 0 0 1px rgba(212,175,55,0.28), 0 0 22px rgba(212,175,55,0.35)"
                    }
                  : {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "#e4e4e7",
                      boxShadow: "0 0 0 0 rgba(212,175,55,0)"
                    }
              }
              transition={{ duration: 0.22, delay: isHovered ? index * 0.1 : 0 }}
              style={{ transitionDelay: `${index * 100}ms` }}
              className="rounded-md border px-3 py-1.5 text-sm font-semibold backdrop-blur-md transition-[background-color,border-color,box-shadow,color] duration-300 group-hover:border-rcb-gold/80 group-hover:bg-rcb-gold/15 group-hover:text-white group-hover:shadow-[0_0_0_1px_rgba(212,175,55,0.28),0_0_22px_rgba(212,175,55,0.35)]"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.article>
    </div>
  );
}

function RecentInningsSection() {
  return (
    <section id="recent-innings" className="section-shell relative z-10 scroll-mt-28 py-20">
      <SectionHeading
        label="Recent Innings"
        title="Recent delivery milestones."
        copy="A focused timeline of recent product, backend, and problem-solving progress without turning the portfolio into a novelty scoreboard."
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
        className="relative mt-12 grid gap-4"
      >
        <div className="absolute left-5 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-rcb-gold/75 via-white/15 to-rcb-crimson/30 sm:block" />
        {recentInnings.map(({ title, description, icon: Icon }, index) => (
          <motion.article
            key={title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className="grid gap-4 sm:grid-cols-[42px_1fr] sm:items-start"
          >
            <div className="relative z-10 hidden h-10 w-10 items-center justify-center rounded-md border border-rcb-gold/35 bg-pitch-black text-rcb-gold shadow-[0_0_24px_rgba(212,175,55,0.18)] sm:flex">
              <Icon aria-hidden="true" size={18} />
            </div>
            <div className="stadium-card rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl sm:p-6">
              <div className="relative z-10 flex items-start justify-between gap-5">
                <div>
                  <p className="font-heading text-xs font-bold uppercase text-rcb-gold/80">Over {index + 1}</p>
                  <h3 className="font-heading mt-2 text-xl font-bold text-white">{title}</h3>
                </div>
                <Icon aria-hidden="true" size={20} className="shrink-0 text-rcb-gold sm:hidden" />
              </div>
              <p className="relative z-10 mt-3 max-w-3xl leading-7 text-zinc-300">{description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function TrophyTimelineItem({
  item,
  index
}: {
  item: (typeof trophies)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "center center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative grid gap-4 pl-10 sm:grid-cols-[120px_1fr] sm:gap-6 sm:pl-14">
      <div className="absolute left-[7px] top-2 h-4 w-4 rounded-full border border-rcb-gold bg-pitch-black shadow-rcb-glow sm:left-[15px]" />
      <div className="font-heading text-sm font-bold text-rcb-gold sm:pt-1">{item.year}</div>
      <div
        className={`stadium-card rounded-lg border p-5 backdrop-blur-xl ${
          item.highlight
            ? "border-rcb-gold/35 bg-[linear-gradient(135deg,rgba(212,175,55,0.105),rgba(220,38,38,0.075),rgba(255,255,255,0.035))] shadow-[0_24px_70px_rgba(0,0,0,0.35),0_0_34px_rgba(212,175,55,0.16)]"
            : "border-white/10 bg-white/[0.045]"
        }`}
      >
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className={`font-heading inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-bold uppercase ${
                  item.highlight
                    ? "border-rcb-gold/50 bg-rcb-gold text-pitch-black"
                    : "border-white/10 bg-white/5 text-rcb-gold"
                }`}
              >
                {item.highlight ? <Star aria-hidden="true" size={12} /> : <Award aria-hidden="true" size={12} />}
                {item.rarity}
              </span>
            </div>
            <p className="font-heading text-xl font-bold text-white">{item.title}</p>
            <p className="mt-2 text-sm font-semibold uppercase text-zinc-500">{item.issuer}</p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-rcb-gold text-pitch-black shadow-[0_0_22px_rgba(212,175,55,0.32)]">
            {index === trophies.length - 1 ? (
              <Code2 aria-hidden="true" size={20} />
            ) : (
              <Award aria-hidden="true" size={20} />
            )}
          </div>
        </div>
        <p className="relative z-10 mt-4 leading-7 text-zinc-300">{item.result}</p>
      </div>
    </motion.div>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px] fill-current">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.86 8.37 6.83 9.72.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 7c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.17 10.17 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function SponsorTicket() {
  const [flashKey, setFlashKey] = useState(0);

  function triggerFlash() {
    setFlashKey((key) => key + 1);
  }

  return (
    <motion.article
      onClick={triggerFlash}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className="group relative mx-auto mt-12 max-w-4xl cursor-pointer overflow-hidden rounded-lg border border-rcb-gold/55 bg-[linear-gradient(115deg,#191006_0%,#3d2408_24%,#111111_46%,#5e3a0b_72%,#1a0d06_100%)] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.5),0_0_42px_rgba(212,175,55,0.18)] sm:p-7"
    >
      <div className="pointer-events-none absolute inset-y-1/2 left-0 z-20 h-16 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-rcb-gold/45 bg-pitch-black" />
      <div className="pointer-events-none absolute inset-y-1/2 right-0 z-20 h-16 w-8 translate-x-1/2 -translate-y-1/2 rounded-full border border-rcb-gold/45 bg-pitch-black" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.1)_18%,transparent_34%,rgba(255,225,150,0.2)_52%,transparent_68%)] opacity-70 mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(220,38,38,0.28),transparent_34%),radial-gradient(circle_at_82%_88%,rgba(212,175,55,0.26),transparent_30%)]" />
      <div className="pointer-events-none absolute bottom-0 left-10 right-10 top-0 border-x border-dashed border-rcb-gold/28" />

      {flashKey > 0 ? (
        <motion.div
          key={flashKey}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 0.85, 0], scale: [0.9, 1.03, 1.16] }}
          transition={{ duration: 0.36, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),rgba(212,175,55,0.35)_28%,transparent_62%)]"
        />
      ) : null}

      <div className="relative z-10 grid gap-6 sm:grid-cols-[1fr_96px] sm:items-stretch">
        <div className="grid gap-6 rounded-md border border-white/10 bg-black/20 p-5 backdrop-blur-md sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-heading text-xs font-bold uppercase text-rcb-gold">VIP Pavilion Pass</p>
              <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">
                Recruiter Pavilion Pass
              </h2>
            </div>
            <div className="rounded-md border border-rcb-gold/45 bg-rcb-gold px-3 py-2 text-center text-pitch-black">
              <p className="font-heading text-xs font-bold uppercase">Seat</p>
              <p className="font-heading text-lg font-bold">AG-18</p>
            </div>
          </div>

          <div className="grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="font-heading text-xs font-bold uppercase text-zinc-500">Stand</p>
              <p className="mt-1 font-semibold text-white">Builder&apos;s Box</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="font-heading text-xs font-bold uppercase text-zinc-500">Fixture</p>
              <p className="mt-1 font-semibold text-white">Ideas vs Execution</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="font-heading text-xs font-bold uppercase text-zinc-500">Access</p>
              <p className="mt-1 font-semibold text-white">Premium Support</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-zinc-400">
              Open to software engineering roles, internships, and collaborative product teams.
            </p>
            <motion.a
              href="mailto:anshguptakmrn@gmail.com"
              whileHover={buttonHover}
              whileTap={{ scale: 0.95 }}
              className="focus-ring glow-button inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-rcb-crimson px-5 py-3 text-sm font-bold text-white shadow-rcb-glow transition-colors hover:bg-red-500"
            >
              Start a Conversation
              <Mail aria-hidden="true" size={18} />
            </motion.a>
          </div>
        </div>

        <div className="relative min-h-28 overflow-hidden rounded-md border border-white/10 bg-black/40 p-3 sm:min-h-full">
          <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-white/18" />
          <motion.div
            aria-hidden="true"
            animate={{ top: ["12%", "88%", "12%"] }}
            transition={{ duration: 1.25, ease: "easeInOut", repeat: Infinity }}
            className="absolute left-2 right-2 h-0.5 rounded-full bg-red-500 opacity-0 shadow-[0_0_16px_rgba(239,68,68,0.95)] transition-opacity duration-200 group-hover:opacity-100"
          />
          <div
            aria-hidden="true"
            className="h-full min-h-24 rounded-sm bg-[repeating-linear-gradient(90deg,#f8fafc_0_2px,transparent_2px_5px,#f8fafc_5px_7px,transparent_7px_13px,#f8fafc_13px_14px,transparent_14px_18px)] opacity-80 sm:bg-[repeating-linear-gradient(0deg,#f8fafc_0_2px,transparent_2px_5px,#f8fafc_5px_7px,transparent_7px_13px,#f8fafc_13px_14px,transparent_14px_18px)]"
          />
          <p className="font-heading absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase text-zinc-500 sm:bottom-4 sm:[writing-mode:vertical-rl]">
            VIP-2026-AG
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/30 py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="font-heading max-w-md text-lg font-bold text-white">
          Built with a Play Bold Mentality. © Ansh Gupta.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:anshguptakmrn@gmail.com"
            className="focus-ring glow-button inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-rcb-gold/45 hover:text-white"
          >
            <Mail aria-hidden="true" size={16} />
            Email
          </a>
          <a
            href="tel:+918643074602"
            className="focus-ring glow-button inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-rcb-gold/45 hover:text-white"
          >
            <Phone aria-hidden="true" size={16} />
            +91 8643074602
          </a>
          <a
            href="https://github.com/digitaldodo"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring glow-button inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-rcb-gold/45 hover:text-white"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-pitch-black text-white">
      <Navigation />
      <PitchScrollTracker />
      <AmbientLighting />

      <div className="pitch-grid pointer-events-none fixed inset-0 z-0" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-24 border-b border-white/5 bg-gradient-to-b from-rcb-crimson/20 to-transparent" />

      <section
        id="home"
        className="section-shell relative z-10 grid min-h-screen items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <motion.div
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...batSwingTransition, delay: 0.06 }}
          className="min-w-0 lg:col-span-2"
        >
          <LiveMatchStrip />
        </motion.div>

        <div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...batSwingTransition, delay: 0.03 }}
            className="hero-logo-shell mb-7 inline-flex h-20 w-20 items-center justify-center rounded-full border border-rcb-gold/30 bg-black/20 backdrop-blur-md sm:h-24 sm:w-24"
          >
            <Image
              src={logoPath}
              alt="Ansh Gupta logo"
              width={92}
              height={92}
              className="portfolio-logo h-[4.6rem] w-[4.6rem] sm:h-[5.7rem] sm:w-[5.7rem]"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={batSwingTransition}
            className="mb-6 inline-flex items-center gap-2 rounded-md border border-rcb-gold/30 bg-rcb-gold/10 px-3 py-2 text-sm font-semibold text-rcb-gold backdrop-blur-md"
          >
            <Zap aria-hidden="true" size={16} />
            The Opening Stand
          </motion.div>
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...batSwingTransition, delay: 0.08 }}
            className="font-heading max-w-4xl text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
          >
            Ansh Gupta
          </motion.h1>
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...batSwingTransition, delay: 0.16 }}
            className="font-heading mt-5 max-w-3xl text-2xl font-bold leading-tight text-rcb-gold sm:text-3xl lg:text-4xl"
          >
            Computer Science Undergraduate & Software Developer
          </motion.p>
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...batSwingTransition, delay: 0.2 }}
            className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl"
          >
            Building scalable enterprise solutions. Coding with a &quot;Play Bold&quot; mentality.
          </motion.p>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...batSwingTransition, delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <motion.a
              whileHover={buttonHover}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="focus-ring glow-button inline-flex items-center justify-center gap-2 rounded-md bg-rcb-crimson px-5 py-3 text-sm font-bold text-white shadow-rcb-glow transition-colors hover:bg-red-500"
            >
              View Match Highlights
              <ArrowUpRight aria-hidden="true" size={18} />
            </motion.a>
            <motion.a
              whileHover={buttonHover}
              whileTap={{ scale: 0.98 }}
              href="#sponsor"
              className="focus-ring glow-button inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-zinc-100 backdrop-blur-md transition-colors hover:border-rcb-crimson/70 hover:text-white"
            >
              Contact Me
              <Mail aria-hidden="true" size={18} />
            </motion.a>
            <div className="group relative w-full sm:w-auto">
              <motion.a
                whileHover={buttonHover}
                whileTap={{ scale: 0.98 }}
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring glow-button inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-rcb-gold/45 bg-rcb-gold/10 px-5 py-3 text-sm font-bold text-rcb-gold backdrop-blur-md transition-colors hover:border-rcb-gold hover:bg-rcb-gold hover:text-pitch-black sm:w-auto"
              >
                View Resume
                <Eye aria-hidden="true" size={18} />
              </motion.a>
              <div className="pointer-events-none absolute left-0 top-[calc(100%+0.75rem)] z-20 hidden w-64 rounded-lg border border-white/10 bg-pitch-charcoal/95 p-4 text-left opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.42),0_0_24px_rgba(212,175,55,0.15)] backdrop-blur-xl transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 md:block md:translate-y-1">
                <p className="font-heading text-sm font-bold text-white">Ansh Gupta Resume</p>
                <p className="mt-1 text-xs leading-5 text-zinc-400">PDF resume with education, project work, technical skills, certifications, and contact details.</p>
              </div>
            </div>
            <motion.a
              whileHover={buttonHover}
              whileTap={{ scale: 0.98 }}
              href={resumePath}
              download="Ansh_Gupta_Resume.pdf"
              className="focus-ring glow-button inline-flex h-12 items-center justify-center gap-2 rounded-md bg-rcb-gold px-5 py-3 text-sm font-bold text-pitch-black transition-colors hover:bg-white"
            >
              Download Resume
              <Download aria-hidden="true" size={18} />
            </motion.a>
            <motion.a
              whileHover={buttonHover}
              whileTap={{ scale: 0.98 }}
              href="https://github.com/digitaldodo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile"
              className="focus-ring glow-button inline-flex h-12 w-full items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-100 backdrop-blur-md transition-colors hover:border-rcb-crimson/70 hover:text-white sm:w-12"
            >
              <GitHubIcon />
            </motion.a>
          </motion.div>
        </div>

        <CareerStatsScorecard />
      </section>

      <motion.section
        id="about"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="section-shell relative z-10 scroll-mt-28 py-20"
      >
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="font-heading mb-3 text-sm font-bold uppercase text-rcb-gold">About Me</p>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">The Opening Stand</h2>
          </div>
          <div className="glass-panel rounded-lg p-6 sm:p-8">
            <p className="text-base leading-8 text-zinc-300 sm:text-lg">
              Driven and detail-oriented Computer Science undergraduate at GLA University (B.Tech CSE, CGPA:
              8.43, Exp. 2027). Highly adaptable and a continuous learner, demonstrated by multiple advanced
              certifications. Adept at designing secure, role-based workflows and optimizing database operations
              to streamline business processes. Passionate about solving complex problems and eager to contribute
              technical and collaborative skills to innovative tech teams.
            </p>
          </div>
        </div>
      </motion.section>

      <SkillsSection />

      <section id="projects" className="section-shell relative z-10 scroll-mt-28 py-20">
        <SectionHeading
          label="Top Innings"
          title="AccessFlow leads the scoreboard."
          copy="A focused project highlight for enterprise operations, where access control, approvals, and field-ready interfaces have to move together."
        />
        <AccessFlowCard />
      </section>

      <RecentInningsSection />

      <section id="trophy-cabinet" className="section-shell relative z-10 scroll-mt-28 py-20">
        <SectionHeading
          label="Trophy Cabinet"
          title="Certifications with scoreboard value."
          copy="A chronological run of learning outcomes, national recognition, and problem-solving consistency."
        />
        <div className="relative mt-12 grid gap-7">
          <div className="absolute bottom-8 left-[14px] top-2 w-px bg-gradient-to-b from-rcb-gold via-white/20 to-rcb-crimson/20 sm:left-[22px]" />
          {trophies.map((item, index) => (
            <TrophyTimelineItem key={`${item.title}-${item.year}`} item={item} index={index} />
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell relative z-10 scroll-mt-28 py-20">
        <div className="glass-panel rounded-lg p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <SectionHeading
              label="Contact"
              title="Ready for the next over."
              copy="For roles, collaborations, or a sharper version of this portfolio, the inbox is open."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:anshguptakmrn@gmail.com"
                className="focus-ring stadium-card rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-rcb-gold/45"
              >
                <Mail className="relative z-10 mb-4 text-rcb-gold" aria-hidden="true" size={22} />
                <p className="font-heading relative z-10 font-bold text-white">Email</p>
                <p className="relative z-10 mt-2 break-all text-sm text-zinc-400">anshguptakmrn@gmail.com</p>
              </a>
              <a
                href="https://github.com/digitaldodo"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring stadium-card rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-rcb-gold/45"
              >
                <Code2 className="relative z-10 mb-4 text-rcb-gold" aria-hidden="true" size={22} />
                <p className="font-heading relative z-10 font-bold text-white">GitHub</p>
                <p className="relative z-10 mt-2 break-all text-sm text-zinc-400">github.com/digitaldodo</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="sponsor" className="section-shell relative z-10 scroll-mt-28 py-20">
        <SponsorTicket />
      </section>

      <Footer />
    </main>
  );
}
