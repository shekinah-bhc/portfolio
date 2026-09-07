"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
}

interface StickyScrollProps {
  content: ContentItem[];
  contentClassName?: string;
}

const BACKGROUND_COLORS = ["#0a0a0a", "#050505", "#0f0f0f"] as const;
const LINEAR_GRADIENTS = [
  "linear-gradient(135deg, rgba(184,255,53,0.05) 0%, rgba(10,10,10,1) 100%)",
  "linear-gradient(225deg, rgba(184,255,53,0.03) 0%, rgba(10,10,10,1) 100%)",
  "linear-gradient(45deg, rgba(184,255,53,0.07) 0%, rgba(10,10,10,1) 100%)",
] as const;

export const StickyScroll: React.FC<StickyScrollProps> = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [panelY, setPanelY] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  // Memoized gradient calculation
  const [backgroundGradient, setBackgroundGradient] = useState<string>(
    LINEAR_GRADIENTS[0]
  );

  const handleScrollProgress = useCallback((latest: number) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce<number>(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
    setPanelY(closestBreakpointIndex * 400);
  }, [content, cardLength]);

  useMotionValueEvent(scrollYProgress, "change", handleScrollProgress);

  useEffect(() => {
    setBackgroundGradient(
      LINEAR_GRADIENTS[activeCard % LINEAR_GRADIENTS.length]
    );
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: BACKGROUND_COLORS[activeCard % BACKGROUND_COLORS.length],
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={cn(
        "relative flex items-start justify-center lg:space-x-12 rounded-3xl p-4 lg:p-10 max-w-7xl mx-auto",
        "border border-white/5 shadow-2xl overflow-hidden"
      )}
      ref={containerRef}
    >
      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] rounded-3xl pointer-events-none" />

      {/* Blur effect overlay */}
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

      {/* Left: Scrolling content */}
      <div className="relative flex items-start px-2 lg:px-6 w-full max-w-2xl z-10">
        <div className="max-w-xl w-full">
          {content.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              className="my-20 lg:my-40"
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
                y: activeCard === index ? 0 : 20,
                scale: activeCard === index ? 1 : 0.95,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-start gap-4 mb-4">
                {item.icon && (
                  <motion.div
                    animate={{
                      scale: activeCard === index ? 1 : 0.8,
                      opacity: activeCard === index ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {item.icon}
                  </motion.div>
                )}
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  {item.title}
                </h2>
              </div>
              <p className="text-base lg:text-lg text-slate-300/80 leading-relaxed max-w-md font-light mb-8">
                {item.description}
              </p>

              {/* Show the right-panel content inline on mobile */}
              {item.content && (
                <div className="block lg:hidden w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 mt-6">
                  {item.content}
                </div>
              )}
            </motion.div>
          ))}
          <div className="h-20 lg:h-40" />
        </div>
      </div>

      {/* Right: Scroll-linked animated panel */}
      <div className="relative hidden lg:block w-140 shrink-0 self-stretch z-20">
        <motion.div
          ref={rightPanelRef}
          animate={{
            background: backgroundGradient,
            y: panelY,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className={cn(
            "h-120 w-full rounded-3xl border border-white/10",
            "shadow-2xl shadow-black/20 overflow-hidden",
            "flex items-center justify-center relative",
            "backdrop-blur-sm",
            contentClassName
          )}
        >
          {/* Noise overlay for the right panel */}
          <div 
            className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none z-10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 1.05,
                y: -20,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="w-full h-full flex items-center justify-center"
            >
              {content[activeCard].content ?? null}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};