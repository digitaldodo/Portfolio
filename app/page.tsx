"use client";

import {
  ArrowUpRight,
  Award,
  BadgeCheck,
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
  Target,
  TrendingUp,
  Zap
} from "lucide-react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { PerformanceStrip } from "./components/PerformanceStrip";
import { Navigation } from "./components/Navigation";
import { SkillsSection } from "./components/SkillsSection";

const AmbientLighting = dynamic(
  () => import("./components/AmbientLighting").then((module) => module.AmbientLighting),
  { ssr: false }
);
const ScrollProgressRail = dynamic(
  () => import("./components/ScrollProgressRail").then((module) => module.ScrollProgressRail),
  { ssr: false }
);

const accessFlowProject = {
  name: "AccessFlow",
  liveLink: "https://accessflow-web.onrender.com",
  stack: ["React", "React Native", "Spring Boot", "MongoDB", "Firebase"],
  description:
    "An enterprise-grade visitor and workforce management platform featuring real-time operational visibility and role-based access control. Streamlined visitor approvals and security workflows through QR-based access via dedicated web and mobile applications."
};

const credentials = [
  {
    title: "Leadership and Team Effectiveness",
    year: "2026",
    issuer: "IIT Roorkee / NPTEL",
    result: "Top 1% Topper, Score: 90",
    rarity: "Top 1% Discipline",
    highlight: true
  },
  {
    title: "Management Information System",
    year: "2025",
    issuer: "NPTEL",
    result: "Elite + Gold, Score: 92",
    rarity: "Elite Gold"
  },
  {
    title: "Intro. to Environmental Engineering",
    year: "2025",
    issuer: "NPTEL",
    result: "Elite + Silver, Score: 84",
    rarity: "Elite Silver"
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
    metricLabel: "Architecture Output",
    label: "Systems Built",
    value: 3,
    decimals: 0,
    suffix: "+",
    detail: "Full-stack, mobile, and backend systems",
    icon: Layers3
  },
  {
    metricLabel: "Problem Discipline",
    label: "Problems Solved",
    value: 200,
    decimals: 0,
    suffix: "+",
    detail: "Algorithmic practice across GFG and LeetCode",
    icon: Code2
  },
  {
    metricLabel: "Learning Standard",
    label: "Certifications Earned",
    value: 4,
    decimals: 0,
    suffix: "+",
    detail: "NPTEL credentials with Elite, Gold, and Top 1% outcomes",
    icon: BadgeCheck
  },
  {
    metricLabel: "Release Readiness",
    label: "Production Deployments",
    value: 2,
    decimals: 0,
    suffix: "+",
    detail: "Live web services and shipped product surfaces",
    icon: Server
  },
  {
    metricLabel: "Team Standard",
    label: "Leadership Experience",
    value: 3,
    decimals: 0,
    suffix: "+",
    detail: "Communication, project ownership, and delivery coordination",
    icon: TrendingUp
  }
];

const mindsetPrinciples = [
  {
    title: "Discipline",
    signal: "Daily reps over occasional intensity",
    detail: "Build habits that keep progress moving even when the work is repetitive.",
    icon: Gauge
  },
  {
    title: "Consistency",
    signal: "Small improvements, compounded",
    detail: "Keep solving, shipping, and refining until the system gets sharper.",
    icon: Target
  },
  {
    title: "Resilience",
    signal: "Calm under pressure",
    detail: "Treat blockers as feedback, recover quickly, and stay locked on execution.",
    icon: ShieldCheck
  },
  {
    title: "Execution",
    signal: "Intentional delivery",
    detail: "Translate ideas into reliable products with clean UX and dependable backend flows.",
    icon: Zap
  }
];

const executionLog = [
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

const entranceTransition = { duration: 0.4, ease: "easeOut" as const };

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
      <p className="font-heading mb-3 text-sm font-bold uppercase text-brand-gold">{label}</p>
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

function PerformanceIndex() {
  return (
    <div className="relative">
      <div className="absolute inset-x-8 -top-5 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 190, damping: 18 }}
        className="glass-panel premium-card rounded-lg p-4"
      >
        <div className="index-scan relative overflow-hidden rounded-lg border border-white/10 bg-surface-charcoal p-5">
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="font-heading text-sm font-bold text-brand-gold">ENGINEERING INDEX</p>
              <p className="mt-1 text-sm text-zinc-400">Focused full-stack execution</p>
            </div>
            <Target className="text-brand-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.44)]" aria-hidden="true" size={24} />
          </div>

          <div className="relative z-10 grid gap-3 py-5 sm:grid-cols-2">
            {careerStats.map(({ metricLabel, label, value, suffix, decimals, detail, icon: Icon }) => (
              <div
                key={label}
                className="premium-card rounded-md border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading text-[11px] font-bold uppercase text-brand-gold/80">{metricLabel}</p>
                    <p className="font-heading mt-2 text-3xl font-bold text-white">
                      <AnimatedNumber value={value} decimals={decimals} suffix={suffix} />
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-300">{label}</p>
                  </div>
                  <Icon aria-hidden="true" size={20} className="mt-1 shrink-0 text-brand-gold" />
                </div>
                <p className="relative z-10 mt-3 text-xs leading-5 text-zinc-500">{detail}</p>
              </div>
            ))}
          </div>

          <div className="relative z-10 rounded-md border border-brand-crimson/35 bg-brand-crimson/10 p-4 shadow-[0_0_24px_rgba(220,38,38,0.08)]">
            <p className="font-heading text-lg font-bold text-white">Current Focus</p>
            <p className="mt-2 leading-7 text-zinc-300">
              Designing clean product flows, secure backends, and frontend systems that feel fast, reliable, and deliberate from the first click.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MindsetSection() {
  return (
    <section id="mindset" className="section-shell relative z-10 scroll-mt-28 py-20">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.56, ease: "easeOut" }}
          className="mindset-spotlight relative overflow-hidden rounded-lg border border-brand-gold/20 bg-[linear-gradient(145deg,rgba(212,175,55,0.12),rgba(255,255,255,0.04)_36%,rgba(220,38,38,0.11))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.4),0_0_34px_rgba(212,175,55,0.12)] backdrop-blur-xl sm:p-8"
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          <div className="relative z-10">
            <p className="font-heading mb-3 text-sm font-bold uppercase text-brand-gold">Mindset</p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              Built around discipline, resilience, and repeatable execution.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-300">
              The standard is simple: prepare with intent, perform with control, review honestly, and improve the next build.
            </p>
          </div>
          <div className="relative z-10 mt-8 grid grid-cols-3 gap-3">
            {["Prepare", "Execute", "Improve"].map((stage) => (
              <div key={stage} className="rounded-md border border-white/10 bg-black/[0.24] p-3 text-center">
                <p className="font-heading text-[11px] font-bold uppercase text-zinc-500">{stage}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {mindsetPrinciples.map(({ title, signal, detail, icon: Icon }) => (
            <motion.article
              key={title}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.46, ease: "easeOut" } }
              }}
              className="premium-card rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
            >
              <div className="relative z-10 flex items-start justify-between gap-5">
                <div>
                  <p className="font-heading text-xs font-bold uppercase text-brand-gold/80">{signal}</p>
                  <h3 className="font-heading mt-3 text-2xl font-bold text-white">{title}</h3>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-brand-gold/35 bg-brand-gold/10 text-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.16)]">
                  <Icon aria-hidden="true" size={19} />
                </div>
              </div>
              <p className="relative z-10 mt-4 leading-7 text-zinc-400">{detail}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
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
        className="glass-panel premium-card group relative overflow-hidden rounded-lg p-6 sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(212,175,55,0.2),transparent_30%),linear-gradient(135deg,rgba(220,38,38,0.16),transparent_46%)] opacity-80" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80" />

        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-brand-crimson/40 bg-brand-crimson/10 px-3 py-2 text-sm font-bold uppercase text-brand-crimson">
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
              <div className="premium-card rounded-md border border-white/10 bg-surface-charcoal/80 p-4 backdrop-blur-md">
                <ScanLine className="text-brand-gold" aria-hidden="true" size={22} />
                <p className="font-heading mt-4 text-lg font-bold text-white">QR Access</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Visitor entry flows and approval gates.</p>
              </div>
              <div className="premium-card rounded-md border border-white/10 bg-surface-charcoal/80 p-4 backdrop-blur-md">
                <Smartphone className="text-brand-gold" aria-hidden="true" size={22} />
                <p className="font-heading mt-4 text-lg font-bold text-white">Web + Mobile</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Dedicated interfaces for teams in motion.</p>
              </div>
            </div>
            <motion.a
              href={accessFlowProject.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              className="focus-ring glow-button inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-5 py-3 text-sm font-bold text-surface-black transition hover:bg-white"
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
              className="rounded-md border px-3 py-1.5 text-sm font-semibold backdrop-blur-md transition-[background-color,border-color,box-shadow,color] duration-300 group-hover:border-brand-gold/80 group-hover:bg-brand-gold/15 group-hover:text-white group-hover:shadow-[0_0_0_1px_rgba(212,175,55,0.28),0_0_22px_rgba(212,175,55,0.35)]"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.article>
    </div>
  );
}

function ExecutionLogSection() {
  return (
    <section id="execution-log" className="section-shell relative z-10 scroll-mt-28 py-20">
      <SectionHeading
        label="Execution Log"
        title="Recent delivery milestones."
        copy="A focused timeline of product, backend, mobile, and problem-solving progress built around consistency and clean execution."
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
        <div className="absolute left-5 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-brand-gold/75 via-white/15 to-brand-crimson/30 sm:block" />
        {executionLog.map(({ title, description, icon: Icon }, index) => (
          <motion.article
            key={title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className="grid gap-4 sm:grid-cols-[42px_1fr] sm:items-start"
          >
            <div className="relative z-10 hidden h-10 w-10 items-center justify-center rounded-md border border-brand-gold/35 bg-surface-black text-brand-gold shadow-[0_0_24px_rgba(212,175,55,0.18)] sm:flex">
              <Icon aria-hidden="true" size={18} />
            </div>
            <div className="premium-card rounded-lg border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl sm:p-6">
              <div className="relative z-10 flex items-start justify-between gap-5">
                <div>
                  <p className="font-heading text-xs font-bold uppercase text-brand-gold/80">Phase {index + 1}</p>
                  <h3 className="font-heading mt-2 text-xl font-bold text-white">{title}</h3>
                </div>
                <Icon aria-hidden="true" size={20} className="shrink-0 text-brand-gold sm:hidden" />
              </div>
              <p className="relative z-10 mt-3 max-w-3xl leading-7 text-zinc-300">{description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function CredentialTimelineItem({
  item,
  index
}: {
  item: (typeof credentials)[number];
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
      <div className="absolute left-[7px] top-2 h-4 w-4 rounded-full border border-brand-gold bg-surface-black shadow-premium-glow sm:left-[15px]" />
      <div className="font-heading text-sm font-bold text-brand-gold sm:pt-1">{item.year}</div>
      <div
        className={`premium-card rounded-lg border p-5 backdrop-blur-xl ${
          item.highlight
            ? "border-brand-gold/35 bg-[linear-gradient(135deg,rgba(212,175,55,0.105),rgba(220,38,38,0.075),rgba(255,255,255,0.035))] shadow-[0_24px_70px_rgba(0,0,0,0.35),0_0_34px_rgba(212,175,55,0.16)]"
            : "border-white/10 bg-white/[0.045]"
        }`}
      >
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className={`font-heading inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-bold uppercase ${
                  item.highlight
                    ? "border-brand-gold/50 bg-brand-gold text-surface-black"
                    : "border-white/10 bg-white/5 text-brand-gold"
                }`}
              >
                {item.highlight ? <Star aria-hidden="true" size={12} /> : <Award aria-hidden="true" size={12} />}
                {item.rarity}
              </span>
            </div>
            <p className="font-heading text-xl font-bold text-white">{item.title}</p>
            <p className="mt-2 text-sm font-semibold uppercase text-zinc-500">{item.issuer}</p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-gold text-surface-black shadow-[0_0_22px_rgba(212,175,55,0.32)]">
            {index === credentials.length - 1 ? (
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

function ExecutiveContactCard() {
  const [flashKey, setFlashKey] = useState(0);

  function triggerFlash() {
    setFlashKey((key) => key + 1);
  }

  return (
    <motion.article
      onClick={triggerFlash}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className="group relative mx-auto mt-12 max-w-4xl cursor-pointer overflow-hidden rounded-lg border border-brand-gold/45 bg-[linear-gradient(115deg,#050505_0%,#171717_28%,#0b0b0b_52%,#2a090d_76%,#090909_100%)] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.5),0_0_42px_rgba(212,175,55,0.16)] sm:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.08)_18%,transparent_34%,rgba(255,225,150,0.14)_52%,transparent_68%)] opacity-70 mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(220,38,38,0.22),transparent_34%),radial-gradient(circle_at_82%_88%,rgba(212,175,55,0.2),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-24 bg-[linear-gradient(135deg,transparent_0%,rgba(212,175,55,0.1)_48%,rgba(220,38,38,0.16)_49%,transparent_72%)]" />

      {flashKey > 0 ? (
        <motion.div
          key={flashKey}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 0.85, 0], scale: [0.9, 1.03, 1.16] }}
          transition={{ duration: 0.36, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),rgba(212,175,55,0.35)_28%,transparent_62%)]"
        />
      ) : null}

      <div className="relative z-10 grid gap-6 sm:grid-cols-[1fr_104px] sm:items-stretch">
        <div className="grid gap-6 rounded-md border border-white/10 bg-black/20 p-5 backdrop-blur-md sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-heading text-xs font-bold uppercase text-brand-gold">Elite Builder Signal</p>
              <h2 className="font-heading mt-3 text-3xl font-bold text-white sm:text-4xl">
                Ready For High-Trust Product Work
              </h2>
            </div>
            <div className="rounded-md border border-brand-gold/45 bg-brand-gold px-3 py-2 text-center text-surface-black">
              <p className="font-heading text-xs font-bold uppercase">Code</p>
              <p className="font-heading text-lg font-bold">AG / 18</p>
            </div>
          </div>

          <div className="grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="font-heading text-xs font-bold uppercase text-zinc-500">Standard</p>
              <p className="mt-1 font-semibold text-white">Disciplined Build</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="font-heading text-xs font-bold uppercase text-zinc-500">Mindset</p>
              <p className="mt-1 font-semibold text-white">Calm Precision</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-3">
              <p className="font-heading text-xs font-bold uppercase text-zinc-500">Signal</p>
              <p className="mt-1 font-semibold text-white">Product Teams</p>
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
              className="focus-ring glow-button inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-brand-crimson px-5 py-3 text-sm font-bold text-white shadow-premium-glow transition-colors hover:bg-red-500"
            >
              Start a Conversation
              <Mail aria-hidden="true" size={18} />
            </motion.a>
          </div>
        </div>

        <div className="relative min-h-28 overflow-hidden rounded-md border border-white/10 bg-black/40 p-3 sm:min-h-full">
          <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-gold/45 to-transparent" />
          <motion.div
            aria-hidden="true"
            animate={{ top: ["12%", "88%", "12%"] }}
            transition={{ duration: 1.25, ease: "easeInOut", repeat: Infinity }}
            className="absolute left-2 right-2 h-0.5 rounded-full bg-red-500 opacity-0 shadow-[0_0_16px_rgba(239,68,68,0.95)] transition-opacity duration-200 group-hover:opacity-100"
          />
          <div
            aria-hidden="true"
            className="h-full min-h-24 rounded-sm bg-[repeating-linear-gradient(90deg,#f8fafc_0_2px,transparent_2px_5px,#d4af37_5px_7px,transparent_7px_13px,#dc2626_13px_14px,transparent_14px_18px)] opacity-70 sm:bg-[repeating-linear-gradient(0deg,#f8fafc_0_2px,transparent_2px_5px,#d4af37_5px_7px,transparent_7px_13px,#dc2626_13px_14px,transparent_14px_18px)]"
          />
          <p className="font-heading absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase text-zinc-500 sm:bottom-4 sm:[writing-mode:vertical-rl]">
            EXECUTION-AG
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
          Built with discipline, focus, and product ambition. © Ansh Gupta.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:anshguptakmrn@gmail.com"
            className="focus-ring glow-button inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-brand-gold/45 hover:text-white"
          >
            <Mail aria-hidden="true" size={16} />
            Email
          </a>
          <a
            href="tel:+918643074602"
            className="focus-ring glow-button inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-brand-gold/45 hover:text-white"
          >
            <Phone aria-hidden="true" size={16} />
            +91 8643074602
          </a>
          <a
            href="https://github.com/digitaldodo"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring glow-button inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-brand-gold/45 hover:text-white"
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
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const ambientY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -44]);
  const heroVisualY = useTransform(scrollYProgress, [0, 0.22], [0, 24]);
  const heroCopyY = useTransform(scrollYProgress, [0, 0.22], [0, -14]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <Navigation />
      <ScrollProgressRail />
      <AmbientLighting />

      <motion.div
        style={{ y: prefersReducedMotion ? 0 : ambientY }}
        className="ambient-grid pointer-events-none fixed inset-0 z-0"
      />
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : glowY }}
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-28 border-b border-white/5 bg-gradient-to-b from-brand-crimson/18 via-brand-gold/5 to-transparent"
      />

      <section
        id="home"
        className="section-shell relative z-10 grid min-h-screen items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <motion.div
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...entranceTransition, delay: 0.06 }}
          className="min-w-0 lg:col-span-2"
        >
          <PerformanceStrip />
        </motion.div>

        <motion.div style={{ y: prefersReducedMotion ? 0 : heroCopyY }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...entranceTransition, delay: 0.03 }}
            className="hero-logo-shell mb-7 inline-flex h-20 w-20 items-center justify-center rounded-lg border border-brand-gold/30 bg-black/30 p-1 backdrop-blur-md sm:h-24 sm:w-24"
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
            transition={entranceTransition}
            className="mb-6 inline-flex items-center gap-2 rounded-md border border-brand-gold/30 bg-brand-gold/10 px-3 py-2 text-sm font-semibold text-brand-gold backdrop-blur-md"
          >
            <Zap aria-hidden="true" size={16} />
            Prepare Relentlessly. Build Precisely.
          </motion.div>
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...entranceTransition, delay: 0.08 }}
            className="font-heading max-w-4xl text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
          >
            Ansh Gupta
          </motion.h1>
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...entranceTransition, delay: 0.16 }}
            className="font-heading mt-5 max-w-3xl text-2xl font-bold leading-tight text-brand-gold sm:text-3xl lg:text-4xl"
          >
            Computer Science Undergraduate & Software Developer
          </motion.p>
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...entranceTransition, delay: 0.2 }}
            className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl"
          >
            Building scalable enterprise solutions with disciplined execution, product clarity, and a premium engineering standard.
          </motion.p>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...entranceTransition, delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <motion.a
              whileHover={buttonHover}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="focus-ring glow-button inline-flex items-center justify-center gap-2 rounded-md bg-brand-crimson px-5 py-3 text-sm font-bold text-white shadow-premium-glow transition-colors hover:bg-red-500"
            >
              View Project Work
              <ArrowUpRight aria-hidden="true" size={18} />
            </motion.a>
            <motion.a
              whileHover={buttonHover}
              whileTap={{ scale: 0.98 }}
              href="#connect"
              className="focus-ring glow-button inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-zinc-100 backdrop-blur-md transition-colors hover:border-brand-crimson/70 hover:text-white"
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
                className="focus-ring glow-button inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-brand-gold/45 bg-brand-gold/10 px-5 py-3 text-sm font-bold text-brand-gold backdrop-blur-md transition-colors hover:border-brand-gold hover:bg-brand-gold hover:text-surface-black sm:w-auto"
              >
                View Resume
                <Eye aria-hidden="true" size={18} />
              </motion.a>
              <div className="pointer-events-none absolute left-0 top-[calc(100%+0.75rem)] z-20 hidden w-64 rounded-lg border border-white/10 bg-surface-charcoal/95 p-4 text-left opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.42),0_0_24px_rgba(212,175,55,0.15)] backdrop-blur-xl transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 md:block md:translate-y-1">
                <p className="font-heading text-sm font-bold text-white">Ansh Gupta Resume</p>
                <p className="mt-1 text-xs leading-5 text-zinc-400">PDF resume with education, project work, technical skills, certifications, and contact details.</p>
              </div>
            </div>
            <motion.a
              whileHover={buttonHover}
              whileTap={{ scale: 0.98 }}
              href={resumePath}
              download="Ansh_Gupta_Resume.pdf"
              className="focus-ring glow-button inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-gold px-5 py-3 text-sm font-bold text-surface-black transition-colors hover:bg-white"
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
              className="focus-ring glow-button inline-flex h-12 w-full items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-100 backdrop-blur-md transition-colors hover:border-brand-crimson/70 hover:text-white sm:w-12"
            >
              <GitHubIcon />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: prefersReducedMotion ? 0 : heroVisualY }}>
          <PerformanceIndex />
        </motion.div>
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
            <p className="font-heading mb-3 text-sm font-bold uppercase text-brand-gold">About Me</p>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">Disciplined Builder, Modern Execution</h2>
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

      <MindsetSection />

      <SkillsSection />

      <section id="projects" className="section-shell relative z-10 scroll-mt-28 py-20">
        <SectionHeading
          label="Flagship Build"
          title="AccessFlow as a high-trust product system."
          copy="A focused project highlight for enterprise operations, where access control, approvals, and field-ready interfaces have to move together."
        />
        <AccessFlowCard />
      </section>

      <ExecutionLogSection />

      <section id="credentials" className="section-shell relative z-10 scroll-mt-28 py-20">
        <SectionHeading
          label="Credentials"
          title="Proof of consistency."
          copy="A chronological view of learning outcomes, national recognition, and problem-solving discipline."
        />
        <div className="relative mt-12 grid gap-7">
          <div className="absolute bottom-8 left-[14px] top-2 w-px bg-gradient-to-b from-brand-gold via-white/20 to-brand-crimson/20 sm:left-[22px]" />
          {credentials.map((item, index) => (
            <CredentialTimelineItem key={`${item.title}-${item.year}`} item={item} index={index} />
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell relative z-10 scroll-mt-28 py-20">
        <div className="glass-panel rounded-lg p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <SectionHeading
              label="Contact"
              title="Ready for the next challenge."
              copy="For roles, collaborations, or a sharper version of this portfolio, the inbox is open."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:anshguptakmrn@gmail.com"
                className="focus-ring premium-card rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-brand-gold/45"
              >
                <Mail className="relative z-10 mb-4 text-brand-gold" aria-hidden="true" size={22} />
                <p className="font-heading relative z-10 font-bold text-white">Email</p>
                <p className="relative z-10 mt-2 break-all text-sm text-zinc-400">anshguptakmrn@gmail.com</p>
              </a>
              <a
                href="https://github.com/digitaldodo"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring premium-card rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-brand-gold/45"
              >
                <Code2 className="relative z-10 mb-4 text-brand-gold" aria-hidden="true" size={22} />
                <p className="font-heading relative z-10 font-bold text-white">GitHub</p>
                <p className="relative z-10 mt-2 break-all text-sm text-zinc-400">github.com/digitaldodo</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="connect" className="section-shell relative z-10 scroll-mt-28 py-20">
        <ExecutiveContactCard />
      </section>

      <Footer />
    </main>
  );
}
