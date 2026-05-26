"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Database,
  CheckCircle2,
  LoaderCircle,
  Circle,
  Cpu,
  Lock,
  Zap,
  Mic,
} from "lucide-react";
import { Project } from "@/lib/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const VIDEOS = [
  "/assets/video/alumni-dashboard.mp4",
  "/assets/video/about.mp4",
  "/assets/video/wedding.mp4",
];

const ICONS = [Zap, Lock, Mic, Database, Globe, Cpu];

interface ClippedVideoTabProps {
  projects: Project[];
}

export function ClippedVideoTab({ projects }: ClippedVideoTabProps) {
  const [activeTab, setActiveTab] = useState(0);

  const activeProject = projects[activeTab % projects.length];
  const activeVideo = VIDEOS[activeTab % VIDEOS.length];

  return (
    <div className="w-full relative">
      {/* FLOATING TABS */}
      <div className="absolute left-0 lg:left-8 bottom-8 lg:bottom-16 z-20 w-[260px]">
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
      <div
        className="relative overflow-hidden h-[600px] lg:h-[750px] border border-[#f0ece3]/20"
        style={{
          clipPath:
            "polygon(0 0, 92% 0, 100% 12%, 100% 100%, 30% 100%, 22% 88%, 0 88%)",
        }}
      >
        {/* VIDEO */}
        <AnimatePresence mode="wait">
          <motion.video
            key={activeVideo}
            src={activeVideo}
            autoPlay
            muted
            loop
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen grayscale"
          />
        </AnimatePresence>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[#0a0a0a]/30 pointer-events-none" />

        {/* CENTER CARD */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-[340px] md:w-[380px] rounded-none border border-[#b8ff35]/30 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl p-6"
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
              <div className="mt-6 border border-[#f0ece3]/10 bg-[#0f0f0f] p-4">
                <p className="text-[10px] font-mono text-[#b8ff35] uppercase tracking-[0.2em]">
                  Overview
                </p>
                <p className="text-[13px] leading-relaxed mt-2 text-[#f0ece3]/80 font-light">
                  {activeProject.description}
                </p>
              </div>

              {/* TASKS / HIGHLIGHTS */}
              <div className="mt-6 flex flex-col gap-4">
                <p className="text-[10px] font-mono text-[#f0ece3]/40 uppercase tracking-[0.2em] mb-1">
                  Key Features
                </p>
                {activeProject.highlights.slice(0, 4).map((highlight, index) => (
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
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#f0ece3]/10">
                <Link
                  href={`/projects/${activeProject.slug}`}
                  className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b8ff35] hover:text-[#f0ece3] transition-colors"
                >
                  Explore Core
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 bg-[#b8ff35] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#f0ece3]/30 uppercase tracking-[0.2em]">
                    Active
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}