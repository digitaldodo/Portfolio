"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Languages",
    skills: ["C", "Python", "Java"]
  },
  {
    category: "Frameworks & Databases",
    skills: ["Spring Boot", "React", "React Native", "MySQL", "MongoDB", "Render", "Firebase"]
  },
  {
    category: "Core Concepts",
    skills: ["Git", "Operating Systems (OS)", "Software Development Lifecycle (SDLC)"]
  },
  {
    category: "Soft Skills",
    skills: ["Team Leadership", "Cross-functional Communication", "Project Management"]
  }
];

const stackVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.1
    }
  }
};

const pillVariants = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15
    }
  }
};

export function SkillsSection() {
  return (
    <motion.section
      id="stack"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="section-shell relative z-10 scroll-mt-28 py-20"
    >
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] px-5 py-8 shadow-premium-glow backdrop-blur-xl sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            variants={pillVariants}
            className="font-heading inline-flex rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase text-brand-gold backdrop-blur-md"
          >
            Technical Skills
          </motion.p>
          <motion.h2
            variants={pillVariants}
            className="font-heading mt-5 text-4xl font-bold text-white sm:text-5xl"
          >
            Engineering Stack
          </motion.h2>
        </div>

        <motion.div variants={stackVariants} className="relative mt-12 grid gap-8">
          {skillGroups.map((group) => (
            <div key={group.category} className="grid gap-4 lg:grid-cols-[220px_1fr] lg:items-start">
              <motion.div
                variants={pillVariants}
                className="font-heading inline-flex w-fit rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-brand-gold backdrop-blur-lg"
              >
                {group.category}
              </motion.div>

              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={pillVariants}
                    whileHover={{
                      y: -2,
                      borderColor: "#D4AF37",
                      boxShadow: "0 0 0 1px rgba(212, 175, 55, 0.28)"
                    }}
                    transition={{
                      x: { type: "spring", stiffness: 320, damping: 18 },
                      y: { type: "spring", stiffness: 320, damping: 18 },
                      borderColor: { duration: 0 },
                      boxShadow: { duration: 0 }
                    }}
                    className="font-heading inline-flex cursor-default items-center rounded-md border border-white/15 bg-white/[0.055] px-5 py-2.5 text-sm font-semibold text-zinc-100 backdrop-blur-xl hover:border-brand-gold/40 sm:text-base"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
