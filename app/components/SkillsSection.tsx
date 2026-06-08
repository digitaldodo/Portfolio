"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Languages",
    skills: ["C", "Python", "Java"]
  },
  {
    category: "Frameworks & Data",
    skills: ["Spring Boot", "React", "React Native", "MySQL", "MongoDB", "Render", "Firebase"]
  },
  {
    category: "Engineering Fundamentals",
    skills: ["Git", "Operating Systems", "Software Development Lifecycle"]
  },
  {
    category: "Collaboration",
    skills: ["Team Leadership", "Cross-functional Communication", "Project Management"]
  }
];

export function SkillsSection() {
  return (
    <section id="stack" className="section-shell stack-section relative z-10 scroll-mt-28">
      <div className="stack-composition">
        <div className="stack-copy">
          <p className="eyebrow">Stack</p>
          <h2 className="font-heading mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Tools chosen for dependable product delivery.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
            A practical mix for product surfaces, service logic, data movement,
            and the collaboration habits that keep a build usable.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="stack-orbit"
        >
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.category}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="stack-cluster"
              data-offset={index % 2 === 1}
            >
              <h3 className="font-heading text-base font-semibold text-white">{group.category}</h3>
              <div className="stack-skill-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
