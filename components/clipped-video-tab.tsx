"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Database,
  CheckCircle2,
  Cpu,
  Lock,
  Zap,
  Mic,
} from "lucide-react";
import { Project } from "@/lib/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


const ICONS = [Zap, Lock, Mic, Database, Globe, Cpu];

interface ClippedVideoTabProps {
  projects: Project[];
}

export function ClippedVideoTab({ projects }: ClippedVideoTabProps) {
  const [activeTab, setActiveTab] = useState(0);

  const activeProject = projects[activeTab % projects.length];
  const activeVideo = activeProject.videoUrls?.[0] || activeProject.videoUrl || "";

  return (
    <div className="w-full flex flex-col gap-6 lg:block relative">
      {/* MOBILE TABS */}
      <div className="flex lg:hidden overflow-x-auto gap-3 pb-2 snap-x scrollbar-hide -mx-6 px-6">
        {projects.map((project, index) => {
          const Icon = ICONS[index % ICONS.length];
          const isActive = activeTab === index;

          return (
            <button
              key={project.id}
              onClick={() => setActiveTab(index)}
              className={`
                flex-shrink-0 snap-center flex items-center gap-2 px-4 py-3 border transition-all duration-300
                ${
                  isActive
                    ? "bg-[#b8ff35] border-[#b8ff35] text-[#0a0a0a]"
                    : "border-[#f0ece3]/20 text-[#f0ece3]/50 hover:bg-[#f0ece3]/5"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-widest font-bold whitespace-nowrap">
                {project.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* FLOATING TABS (DESKTOP) */}
      <div className="hidden lg:block absolute left-8 bottom-16 z-20 w-[260px]">
        <div className="bg-[#0a0a0a] rounded-none border border-[#f0ece3]/20 p-4 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-2">
            {projects.map((project, index) => {
              const Icon = ICONS[index % ICONS.length];
              const isActive = activeTab === index;

              return (
                <button
                  key={project.id}
                  onClick={() => setActiveTab(index)}
                  className={`
                    group flex items-center gap-4 px-4 py-3 rounded-none text-left transition-all duration-300 border
                    ${
                      isActive
                        ? "bg-[#b8ff35] border-[#b8ff35]"
                        : "border-transparent hover:border-[#f0ece3]/20 hover:bg-[#f0ece3]/5"
                    }
                  `}
                >
                  <Icon
                    className={`
                      w-4 h-4 transition-colors duration-300
                      ${
                        isActive
                          ? "text-[#0a0a0a]"
                          : "text-[#f0ece3]/40 group-hover:text-[#b8ff35]"
                      }
                    `}
                  />
                  <span
                    className={`
                      text-xs font-mono uppercase tracking-widest transition-colors duration-300 truncate
                      ${
                        isActive
                          ? "text-[#0a0a0a] font-bold"
                          : "text-[#f0ece3]/50 group-hover:text-[#f0ece3]"
                      }
                    `}
                  >
                    {project.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* VIDEO CONTAINER */}
      <div className="relative overflow-hidden h-[550px] lg:h-[750px] border border-[#f0ece3]/20 lg:[clip-path:polygon(0_0,92%_0,100%_12%,100%_100%,30%_100%,22%_88%,0_88%)]">
        {/* VIDEO */}
        <AnimatePresence mode="wait">
          {activeVideo && (
            <motion.video
              key={activeVideo}
              src={activeVideo}
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen grayscale"
            />
          )}
        </AnimatePresence>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent lg:to-[#0a0a0a]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[#0a0a0a]/40 lg:bg-[#0a0a0a]/30 pointer-events-none" />

        {/* CENTER CARD */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end p-4 lg:p-0 lg:pr-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-[340px] md:max-w-[380px] rounded-none border border-[#b8ff35]/30 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl p-5 lg:p-6"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-[#f0ece3] uppercase tracking-wide">
                  {activeProject.title}
                </h3>
                <span className="text-[10px] font-mono bg-[#b8ff35]/10 text-[#b8ff35] px-2 py-1 uppercase tracking-widest border border-[#b8ff35]/20">
                  {activeProject.type}
                </span>
              </div>

              {/* GOAL */}
              <div className="mt-4 lg:mt-6 border border-[#f0ece3]/10 bg-[#0f0f0f] p-4">
                <p className="text-[10px] font-mono text-[#b8ff35] uppercase tracking-[0.2em]">
                  Overview
                </p>
                <p className="text-[12px] lg:text-[13px] leading-relaxed mt-2 text-[#f0ece3]/80 font-light">
                  {activeProject.description}
                </p>
              </div>

              {/* TASKS / HIGHLIGHTS */}
              <div className="mt-4 lg:mt-6 flex flex-col gap-3 lg:gap-4">
                <p className="text-[10px] font-mono text-[#f0ece3]/40 uppercase tracking-[0.2em] mb-1">
                  Key Features
                </p>
                {activeProject.highlights.slice(0, 3).map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#b8ff35]" />
                    </div>
                    <p className="text-xs text-[#f0ece3]/70 font-light leading-snug">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between mt-6 lg:mt-8 pt-5 lg:pt-6 border-t border-[#f0ece3]/10">
                <Link
                  href={`/projects/${activeProject.slug}`}
                  className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b8ff35] hover:text-[#f0ece3] transition-colors"
                >
                  More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}