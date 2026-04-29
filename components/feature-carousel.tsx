"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import {
  Pizza04Icon,
  CommandFreeIcons,
  GlobalSearchIcon,
  AiCloudIcon,
  SmartPhone01Icon,
  CheckmarkCircle01Icon,
  DashboardSquare01Icon,
  MagicWandIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

export interface CarouselFeature {
  id: string;
  label: string;
  icon: any; // Switched to any to accept IconSvgObject from hugeicons
  image: string;
  description: string;
  href?: string;
}

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;
const ITEM_WIDTH = 200; // Added for mobile horizontal stack

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel({ features }: { features: CarouselFeature[] }) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentIndex =
    ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border border-border/40 shadow-2xl">
        <div className="w-full lg:w-[40%] min-h-[200px] md:min-h-[250px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-card border-b lg:border-b-0 lg:border-r border-border/40">
          
          {/* Subtle Ambient Tech Glow */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1/2 opacity-15 blur-[100px] pointer-events-none mix-blend-screen" />
          
          {/* Gradients for "fade" effect - Responsive */}
          <div className={cn(
            "absolute z-40 pointer-events-none",
            isMobile 
              ? "inset-y-0 left-0 w-16 bg-linear-to-r from-card via-card/80 to-transparent" 
              : "inset-x-0 top-0 h-16 bg-linear-to-b from-card via-card/80 to-transparent"
          )} />
          <div className={cn(
            "absolute z-40 pointer-events-none",
            isMobile 
              ? "inset-y-0 right-0 w-16 bg-linear-to-l from-card via-card/80 to-transparent" 
              : "inset-x-0 bottom-0 h-16 bg-linear-to-t from-card via-card/80 to-transparent"
          )} />

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(features.length / 2),
                features.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: isMobile ? "auto" : ITEM_HEIGHT,
                    width: isMobile ? ITEM_WIDTH : "fit-content",
                  }}
                  animate={{
                    [isMobile ? "x" : "y"]: wrappedDistance * (isMobile ? ITEM_WIDTH : ITEM_HEIGHT),
                    opacity: 1 - Math.abs(wrappedDistance) * 0.3,
                    scale: isActive ? 1 : 0.95
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-center lg:justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-8 lg:px-8 py-3.5 md:py-4 lg:py-4 rounded-full transition-all duration-500 text-left group",
                      isActive
                        ? "bg-foreground text-background shadow-lg shadow-primary/10 z-10 scale-100"
                        : "bg-transparent text-foreground/50 hover:bg-muted/50 hover:text-foreground scale-95"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-all duration-500",
                        isActive ? "text-background" : "text-foreground/40 group-hover:scale-110"
                      )}
                    >
                      <HugeiconsIcon
                        icon={feature.icon}
                        size={18}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </div>

                    <span className="font-semibold text-sm md:text-[15px] tracking-tight whitespace-nowrap uppercase">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-h-[500px] md:min-h-[600px] lg:h-full relative bg-secondary/30 flex items-center justify-center py-16 md:py-24 lg:py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20">
          <div className="relative w-full max-w-[420px] aspect-4/5 flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className={cn(
                    "absolute inset-0 rounded-4xl md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-background bg-background origin-center",
                    isActive && "cursor-pointer"
                  )}
                  onClick={() => {
                    if (isActive && feature.href) {
                      router.push(feature.href);
                    }
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-8 md:p-10 pt-32 bg-linear-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end"
                      >
                        <div className="flex flex-col gap-4">
                          <div className="bg-background text-foreground px-4 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] w-fit shadow-lg border border-border/50">
                            {index + 1} • {feature.label}
                          </div>
                          <p className="text-white font-normal text-xl md:text-2xl leading-tight drop-shadow-md tracking-tight">
                            {feature.description}
                          </p>
                          
                          <div className="pt-4 pointer-events-auto">
                            <button 
                              className="group/case flex items-center gap-2 text-white/90 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (feature.href) router.push(feature.href);
                              }}
                            >
                              View Case Study
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/case:bg-white group-hover/case:text-black transition-all duration-300">
                                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                              </div>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                    <span className="text-white/80 text-[10px] font-normal uppercase tracking-[0.3em] font-mono">
                      Live Session
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel
