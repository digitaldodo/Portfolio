"use client";

import { useEffect, useRef } from "react";

export function AmbientLighting() {
  const glowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const currentGlow = glowRef.current;
    if (!currentGlow) {
      return;
    }
    const glowElement: HTMLDivElement = currentGlow;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reduceMotion || coarsePointer) {
      glowElement.style.opacity = "0";
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        glowElement.style.opacity = "1";
        glowElement.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      });
    }

    function handlePointerLeave() {
      glowElement.style.opacity = "0";
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <div ref={glowRef} aria-hidden="true" className="cursor-ambient-glow" />;
}
