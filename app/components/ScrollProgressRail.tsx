"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function ScrollProgressRail() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progressLine = progressRef.current;

    if (!progressLine) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reduceMotion || coarsePointer) {
      progressLine.parentElement?.setAttribute("hidden", "");
      return;
    }

    let animationFrame = 0;

    const updateProgress = () => {
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableDistance > 0 ? clamp(window.scrollY / scrollableDistance, 0, 1) : 0;
      progressLine.style.transform = `scaleY(${progress})`;
      animationFrame = 0;
    };

    const requestProgressUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    window.addEventListener("orientationchange", requestProgressUpdate);

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      window.removeEventListener("orientationchange", requestProgressUpdate);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-10 left-6 top-28 z-40 hidden w-px bg-white/10 md:block xl:left-8"
    >
      <div
        ref={progressRef}
        className="absolute left-0 top-0 h-full w-px origin-top bg-brand-gold/80 shadow-[0_0_14px_rgba(212,175,55,0.24)]"
      />
    </div>
  );
}
