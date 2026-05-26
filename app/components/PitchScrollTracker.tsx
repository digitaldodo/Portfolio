"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const lerp = (current: number, target: number, amount: number) => current + (target - current) * amount;

export function PitchScrollTracker() {
  const railRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const ballCoreRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const ball = ballRef.current;
    const ballCore = ballCoreRef.current;

    if (!rail || !ball || !ballCore) {
      return;
    }

    let animationFrame = 0;
    let railHeight = 0;
    let ballHeight = 0;
    let maxTravel = 0;
    let currentY = 0;
    let targetY = 0;
    let hasPositioned = false;
    let lastFrameTime = 0;

    const getDocumentHeight = () =>
      Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight
      );

    const getProgress = () => {
      const scrollableDistance = Math.max(0, getDocumentHeight() - window.innerHeight);

      if (scrollableDistance === 0) {
        return 0;
      }

      return clamp(window.scrollY / scrollableDistance, 0, 1);
    };

    const measure = () => {
      railHeight = rail.clientHeight;
      ballHeight = ball.offsetHeight;
      maxTravel = Math.max(0, railHeight - ballHeight);
      const progress = getProgress();
      targetY = progress * maxTravel;

      if (!hasPositioned) {
        currentY = targetY;
        ball.style.transform = `translate3d(0, ${currentY}px, 0)`;
        ballCore.style.transform = `rotate(${progress * 900}deg)`;
        hasPositioned = true;
      }
    };

    const animate = (timestamp: number) => {
      const deltaSeconds = lastFrameTime === 0 ? 1 / 60 : Math.min((timestamp - lastFrameTime) / 1000, 0.24);
      lastFrameTime = timestamp;
      const progress = getProgress();
      targetY = progress * maxTravel;
      const smoothing = 1 - Math.exp(-18 * deltaSeconds);
      currentY = lerp(currentY, targetY, smoothing);

      if (Math.abs(targetY - currentY) < 0.08) {
        currentY = targetY;
      }

      const constrainedY = clamp(currentY, 0, maxTravel);
      const rotation = progress * 900;
      ball.style.transform = `translate3d(0, ${constrainedY}px, 0)`;
      ballCore.style.transform = `rotate(${rotation}deg)`;
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleViewportChange = () => {
      measure();
    };

    const handleScroll = () => {
      targetY = getProgress() * maxTravel;
    };

    measure();
    animationFrame = window.requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(handleViewportChange);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
    resizeObserver.observe(rail);
    resizeObserver.observe(ball);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);
    window.visualViewport?.addEventListener("resize", handleViewportChange);
    window.addEventListener("load", handleViewportChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
      window.visualViewport?.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("load", handleViewportChange);
    };
  }, []);

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 left-6 top-6 z-40 hidden w-px overflow-visible bg-gradient-to-b from-transparent via-white/15 to-transparent md:block xl:left-8"
    >
      <div
        ref={ballRef}
        className="pitch-scroll-ball absolute -left-[7.5px] top-0 h-4 w-4 rounded-full border border-rcb-gold/80 bg-rcb-crimson shadow-rcb-glow will-change-transform"
      >
        <span ref={ballCoreRef} className="pitch-scroll-ball-core absolute inset-0 rounded-full will-change-transform">
          <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-rcb-gold via-rcb-crimson to-pitch-black" />
          <span className="absolute left-[7px] top-0 h-full w-px bg-rcb-gold/45" />
        </span>
      </div>
    </div>
  );
}
