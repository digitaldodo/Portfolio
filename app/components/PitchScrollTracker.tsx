"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function PitchScrollTracker() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.42
  });
  const ballY = useTransform(smoothProgress, [0, 1], ["0px", "calc(100vh - 16px)"]);
  const ballRotate = useTransform(smoothProgress, [0, 1], [0, 900]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-3 top-0 z-40 w-px bg-white/10 sm:left-6"
    >
      <motion.div
        style={{ y: ballY, rotate: ballRotate }}
        className="absolute -left-[7.5px] top-0 h-4 w-4 rounded-full border border-rcb-gold/70 bg-rcb-crimson shadow-rcb-glow"
      >
        <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-rcb-gold via-rcb-crimson to-pitch-black" />
        <span className="absolute left-[7px] top-0 h-full w-px bg-rcb-gold/45" />
      </motion.div>
    </div>
  );
}
