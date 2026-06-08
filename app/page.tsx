"use client";

import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  Mail,
  Phone,
  ShieldCheck,
  Smartphone,
  Users,
  Workflow
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Navigation } from "./components/Navigation";
import { ScrollProgressRail } from "./components/ScrollProgressRail";
import { SkillsSection } from "./components/SkillsSection";

const accessFlowProject = {
  name: "AccessFlow",
  liveLink: "https://accessflow-web.onrender.com",
  stack: ["React", "React Native", "Spring Boot", "MongoDB", "Firebase"],
  description:
    "A visitor and workforce operations platform with role-based approvals, QR access, and dedicated web and mobile surfaces for on-site teams."
};

const credentials = [
  {
    title: "Leadership and Team Effectiveness",
    year: "2026",
    issuer: "IIT Roorkee / NPTEL",
    result: "Top 1% Topper, Score: 90",
    highlight: true
  },
  {
    title: "Management Information System",
    year: "2025",
    issuer: "NPTEL",
    result: "Elite + Gold, Score: 92"
  },
  {
    title: "Intro. to Environmental Engineering",
    year: "2025",
    issuer: "NPTEL",
    result: "Elite + Silver, Score: 84"
  },
  {
    title: "Software Engineering",
    year: "2024",
    issuer: "NPTEL",
    result: "Elite, Score: 73"
  },
  {
    title: "Problem Solving",
    year: "Ongoing",
    issuer: "GeeksforGeeks and LeetCode",
    result: "Solved 200+ coding challenges combined"
  }
];

const principles = [
  {
    title: "Product Clarity",
    copy: "Simple flows, legible states, and interfaces that help people make decisions without fighting the system."
  },
  {
    title: "Reliable Architecture",
    copy: "Backend choices matter as much as the surface: permissions, data movement, and deployment paths need to be considered."
  },
  {
    title: "Steady Execution",
    copy: "Progress comes from consistent refinement, honest review, and the discipline to keep a product sharper after every build."
  }
];

const projectNotes = [
  {
    title: "Role clarity",
    copy: "Designed boundaries for admins, guards, and operational users so access decisions remain accountable."
  },
  {
    title: "Multi-surface flow",
    copy: "Built web and mobile touchpoints for visitor approval, identity checks, and on-site access workflows."
  },
  {
    title: "Production backbone",
    copy: "Published Spring Boot services backed by MongoDB with deployment choices suited to practical usage."
  }
];

const projectFrames = [
  {
    label: "01",
    title: "Request",
    copy: "Visitor intent enters a structured approval path."
  },
  {
    label: "02",
    title: "Approve",
    copy: "Operations teams review access with clear ownership."
  },
  {
    label: "03",
    title: "Verify",
    copy: "Guards complete the loop through QR-backed checks."
  }
];

const projectMetrics = [
  { value: "3", label: "Role surfaces" },
  { value: "Web + Mobile", label: "Product clients" },
  { value: "QR", label: "Verification layer" }
];

const resumePath = "/assets/Ansh_Gupta_Resume.pdf";
const logoPath = "/assets/ag-logo.svg";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" as const }
};

function SectionHeading({
  label,
  title,
  copy
}: {
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2 className="font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">{copy}</p> : null}
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[21px] w-[21px] fill-current">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.86 8.37 6.83 9.72.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 7c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.17 10.17 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const copyY = useTransform(scrollYProgress, [0, 0.22], [0, -22]);
  const featureY = useTransform(scrollYProgress, [0, 0.22], [0, 24]);

  return (
    <section id="home" className="section-shell hero-section relative z-10">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-composition">
        <motion.div style={{ y: prefersReducedMotion ? 0 : copyY }} className="hero-copy">
          <div className="hero-identity">
            <span className="hero-logo-shell inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/[0.035] p-1">
              <Image
                src={logoPath}
                alt="Ansh Gupta logo"
                width={92}
                height={92}
                className="portfolio-logo h-12 w-12"
                priority
              />
            </span>
            <div>
              <p className="font-heading text-lg font-semibold text-white">Ansh Gupta</p>
              <p className="mt-1 text-sm text-zinc-500">Software Engineer / Product Systems</p>
            </div>
          </div>

          <p className="eyebrow hero-kicker">Software Engineering Portfolio</p>
          <h1 className="font-heading hero-headline text-white">
            <span>Product engineering,</span>
            <span>built with restraint.</span>
          </h1>

          <div className="hero-support">
            <p className="hero-intro text-zinc-300">
              Computer Science undergraduate building secure full-stack products with composed interfaces,
              dependable backend flows, and clear execution habits.
            </p>

            <div className="hero-proof-line" aria-label="Engineering focus areas">
              <span>Full-stack systems</span>
              <span>Role-aware UX</span>
              <span>Production habits</span>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="focus-ring primary-link">
                View selected work
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
              <a href={resumePath} target="_blank" rel="noopener noreferrer" className="focus-ring quiet-link">
                Resume
              </a>
            </div>
          </div>
        </motion.div>

        <motion.aside
          style={{ y: prefersReducedMotion ? 0 : featureY }}
          className="hero-feature"
          aria-label="Featured project preview"
        >
          <div className="hero-feature-visual" aria-hidden="true">
            <div className="hero-feature-grid" />
            <div className="hero-feature-ring" />
            <div className="hero-feature-beacon">
              <span />
              <p>Live access cycle</p>
            </div>
            <div className="hero-flow-line hero-flow-line-one" />
            <div className="hero-flow-line hero-flow-line-two" />
            <span className="hero-flow-node hero-flow-node-one">Admin</span>
            <span className="hero-flow-node hero-flow-node-two">Guard</span>
            <span className="hero-flow-node hero-flow-node-three">Guest</span>
            <div className="hero-system-card hero-system-card-one">
              <strong>Approval desk</strong>
              <span>Queue / roles / status</span>
            </div>
            <div className="hero-system-card hero-system-card-two">
              <strong>QR verify</strong>
              <span>Mobile checkpoint</span>
            </div>
            <p className="hero-feature-word">AccessFlow</p>
          </div>
          <div className="hero-feature-copy">
            <p className="eyebrow">Selected Case Study</p>
            <h2 className="font-heading">AccessFlow</h2>
            <p>
              A product ecosystem connecting approvals, QR checks, dashboards, and field verification.
            </p>
            <a href="#projects" className="focus-ring hero-feature-link">
              View project
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <motion.section id="about" className="section-shell editorial-section relative z-10 scroll-mt-28" {...fadeUp}>
      <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
        <SectionHeading label="Profile" title="A builder with product taste and engineering patience." />
        <div className="space-y-7 text-lg leading-9 text-zinc-300">
          <p>
            I am a Computer Science undergraduate at GLA University, currently working across frontend,
            mobile, and backend systems. My work is shaped by a simple standard: make the experience
            understandable, keep the architecture dependable, and leave every flow cleaner than it started.
          </p>
          <p className="text-zinc-500">
            I care about the quiet parts of software too: access boundaries, approval paths,
            database operations, deployment reliability, and the details that make a product feel composed.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function PrinciplesSection() {
  return (
    <section id="mindset" className="section-shell dense-section relative z-10 scroll-mt-28">
      <SectionHeading
        label="Operating Style"
        title="Built for high-trust product work."
        copy="The focus is on useful systems, measured decisions, and consistent follow-through."
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mt-14 grid gap-8 lg:grid-cols-3"
      >
        {principles.map((principle) => (
          <motion.article
            key={principle.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
            }}
            className="editorial-rule pt-7"
          >
            <h3 className="font-heading text-2xl font-semibold text-white">{principle.title}</h3>
            <p className="mt-5 leading-8 text-zinc-400">{principle.copy}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function NarrativeBreak() {
  return (
    <motion.section className="section-shell breathing-section relative z-10" {...fadeUp}>
      <div className="narrative-break">
        <p className="eyebrow">Throughline</p>
        <p className="font-heading narrative-statement">
          Product clarity first. System reliability underneath. Execution visible in the details.
        </p>
      </div>
    </motion.section>
  );
}

function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [36, -34]);
  const detailY = useTransform(scrollYProgress, [0, 1], [-14, 18]);

  return (
    <section ref={sectionRef} id="projects" className="project-cinema relative z-10 scroll-mt-0">
      <div className="section-shell">
        <div className="project-cinema-heading">
          <SectionHeading
            label="Selected Work"
            title="AccessFlow"
            copy="A full-stack product system for visitor and workforce operations, presented through the decisions that make it usable."
          />
          <a
            href={accessFlowProject.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring quiet-link project-live-link"
          >
            Open live build
            <ExternalLink aria-hidden="true" size={18} />
          </a>
        </div>

        <motion.article {...fadeUp} className="project-showcase">
          <motion.div style={{ y: prefersReducedMotion ? 0 : mockupY }} className="project-visual-stage">
            <div className="project-stage-glow" aria-hidden="true" />
            <div className="project-context-card project-context-card-top" aria-hidden="true">
              <span>Decision layer</span>
              <strong>Role-based approval</strong>
            </div>
            <div className="project-browser" aria-label="AccessFlow operations dashboard mockup">
              <div className="project-browser-bar">
                <span />
                <span />
                <span />
                <p>accessflow.app / operations</p>
              </div>
              <div className="project-browser-grid">
                <div className="project-side-rail">
                  <ShieldCheck aria-hidden="true" size={18} />
                  <Users aria-hidden="true" size={16} />
                  <Code2 aria-hidden="true" size={16} />
                  <Database aria-hidden="true" size={16} />
                </div>
                <div className="project-dashboard">
                  <div className="project-dashboard-header">
                    <div>
                      <p className="project-screen-label">Visitor intake</p>
                      <h3 className="font-heading">Access request queue</h3>
                    </div>
                    <span>Live ops</span>
                  </div>
                  <div className="project-approval-card">
                    <div>
                      <p>Guest verification</p>
                      <strong>Pending approval</strong>
                    </div>
                    <CheckCircle2 aria-hidden="true" size={22} />
                  </div>
                  <div className="project-table" aria-hidden="true">
                    {["Vendor meeting", "Interview panel", "Maintenance"].map((item, index) => (
                      <div key={item}>
                        <span>{item}</span>
                        <strong>{index === 0 ? "Approve" : index === 1 ? "Review" : "Scheduled"}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="project-flow-map">
                    {projectFrames.map((frame) => (
                      <div key={frame.title} className="project-flow-step">
                        <span>{frame.label}</span>
                        <p>{frame.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="project-context-card project-context-card-bottom" aria-hidden="true">
              <span>Field layer</span>
              <strong>QR-backed verification</strong>
            </div>

            <div className="project-phone" aria-hidden="true">
              <div className="project-phone-notch" />
              <div className="project-phone-content">
                <Smartphone size={18} />
                <p>Guard check-in</p>
                <div className="qr-mark">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <span key={index} />
                  ))}
                </div>
                <span className="project-phone-status">Verified</span>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: prefersReducedMotion ? 0 : detailY }} className="project-story-panel">
            <div className="project-kicker">
              <Workflow aria-hidden="true" size={17} />
              Access operations system
            </div>
            <p className="project-lede">{accessFlowProject.description}</p>

            <div className="project-impact-strip">
              {projectMetrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <p className="project-story-copy">
              The system is shaped around one practical loop: request, approve, and verify.
              Each surface has a clear owner so operational teams can move quickly without losing accountability.
            </p>

            <div className="project-notes">
              {projectNotes.map((note) => (
                <article key={note.title}>
                  <h3 className="font-heading">{note.title}</h3>
                  <p>{note.copy}</p>
                </article>
              ))}
            </div>

            <div className="project-stack-line">
              {accessFlowProject.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </motion.div>
        </motion.article>

        <div className="project-frame-strip">
          {projectFrames.map((frame) => (
            <motion.article key={frame.title} {...fadeUp}>
              <span>{frame.label}</span>
              <h3 className="font-heading">{frame.title}</h3>
              <p>{frame.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CredentialsSection() {
  const featuredCredential = credentials[0];
  const supportingCredentials = credentials.slice(1);

  return (
    <section id="credentials" className="credentials-editorial relative z-10 scroll-mt-28">
      <div className="section-shell">
        <div className="credentials-intro">
          <SectionHeading
            label="Credentials"
            title="A learning record with a visible arc."
            copy="A compact record across leadership, systems thinking, engineering fundamentals, and problem-solving practice."
          />
        </div>

        <div className="credentials-layout">
          <motion.article {...fadeUp} className="credential-spotlight">
            <div className="credential-spotlight-mark">
              <Award aria-hidden="true" size={28} />
            </div>
            <p className="eyebrow">{featuredCredential.year} / Leadership</p>
            <h3 className="font-heading">{featuredCredential.title}</h3>
            <p>
              A top-percentile leadership result that reflects the side of engineering I care about:
              thoughtful teams, clear coordination, and execution that holds under pressure.
            </p>
            <div className="credential-result-line">
              <span>{featuredCredential.issuer}</span>
              <strong>{featuredCredential.result}</strong>
            </div>
          </motion.article>

          <div className="credential-timeline" aria-label="Credential timeline">
            {supportingCredentials.map((item, index) => (
              <motion.article
                key={`${item.title}-${item.year}`}
                {...fadeUp}
                className="credential-milestone"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="credential-time">
                  <span>{item.year}</span>
                </div>
                <div>
                  <p className="credential-issuer">{item.issuer}</p>
                  <h3 className="font-heading">{item.title}</h3>
                  <p>{item.result}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-shell final-section relative z-10 scroll-mt-28">
      <motion.div {...fadeUp} className="max-w-4xl">
        <p className="eyebrow">Contact</p>
        <h2 className="font-heading mt-6 text-5xl font-semibold leading-tight text-white sm:text-6xl">
          Interested in useful products, careful systems, and teams with momentum.
        </h2>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
          Open to software engineering roles, internships, and collaborations around clear UX,
          dependable architecture, and practical product delivery.
        </p>
        <div className="mt-10 flex flex-col gap-4 text-zinc-300 sm:flex-row sm:flex-wrap sm:items-center">
          <a href="mailto:anshguptakmrn@gmail.com" className="focus-ring primary-link">
            <Mail aria-hidden="true" size={18} />
            anshguptakmrn@gmail.com
          </a>
          <a href="tel:+918643074602" className="focus-ring quiet-link">
            <Phone aria-hidden="true" size={17} />
            +91 8643074602
          </a>
          <a
            href="https://github.com/digitaldodo"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring quiet-link"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 py-10">
      <div className="section-shell flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© Ansh Gupta</p>
        <p>Software engineering, product craft, and steady execution.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <Navigation />
      <ScrollProgressRail />
      <Hero />
      <AboutSection />
      <NarrativeBreak />
      <PrinciplesSection />
      <SkillsSection />
      <ProjectSection />
      <CredentialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
