"use client";

import { useEffect, useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const experiences = [
  {
    title: "Freelance Full Stack Developer",
    company: "Self-Employed",
    period: "2024 — Present",
    type: "Work",
    description: [
      "Built production web applications for institutional and private clients using Next.js 15, TypeScript, and high-end animations.",
      "Developed high-performance agency websites and complex full-stack portals from scratch.",
      "Implemented GSAP-powered scroll sequences and Three.js visual elements for luxury aesthetics.",
    ],
    skills: ["Next.js 15", "TypeScript", "GSAP", "Three.js", "Resend", "AWS S3"],
    accent: "#60a5fa",
    glow: "rgba(96,165,250,0.15)",
    border: "rgba(96,165,250,0.35)",
  },
  {
    title: "MCA (Master of Computer Applications)",
    company: "Bishop Heber College",
    period: "2022 — 2024",
    type: "Education",
    description: [
      "Specialized in advanced web technologies and software engineering principles.",
      "Graduated with honors, focusing on building scalable full-stack applications.",
      "Participated in various technical symposiums and development workshops.",
    ],
    skills: ["Full Stack", "Software Architecture", "Distributed Systems"],
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    border: "rgba(167,139,250,0.35)",
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Particle canvas ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let w = 0, h = 0;

    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; pulse: number };
    const pts: P[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.1 + 0.3, pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.01;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const a = (0.08 + 0.06 * Math.sin(p.pulse));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${a})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(148,163,184,${0.06 * (1 - d / 110)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // ── GSAP ─────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Headline SplitText
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: "chars" });
        gsap.fromTo(split.chars,
          { opacity: 0, y: 60, rotateX: -80, filter: "blur(6px)" },
          {
            opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
            duration: 0.8, stagger: 0.04, ease: "expo.out",
            scrollTrigger: { trigger: headlineRef.current, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      }

      // Timeline line draw
      if (lineRef.current && lineTrackRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: lineTrackRef.current,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );
      }

      // Cards — scroll-scrubbed reveal
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i % 2 === 0;

        gsap.fromTo(card,
          { opacity: 0, x: isLeft ? -60 : 60, scale: 0.95, filter: "blur(6px)" },
          {
            opacity: 1, x: 0, scale: 1, filter: "blur(0px)",
            duration: 1, ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Staggered description lines
        const lines = card.querySelectorAll(".desc-line");
        gsap.fromTo(lines,
          { opacity: 0, x: isLeft ? -20 : 20 },
          {
            opacity: 1, x: 0,
            duration: 0.6, stagger: 0.1, ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 75%", toggleActions: "play none none reverse" },
          }
        );

        // Skill badges pop
        const badges = card.querySelectorAll(".skill-badge");
        gsap.fromTo(badges,
          { opacity: 0, scale: 0.7, y: 8 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.5, stagger: 0.07, ease: "back.out(1.7)",
            scrollTrigger: { trigger: card, start: "top 70%", toggleActions: "play none none reverse" },
          }
        );
      });

      // Node icons pulse in
      nodeRefs.current.forEach((node) => {
        if (!node) return;
        gsap.fromTo(node,
          { scale: 0, opacity: 0, rotate: -30 },
          {
            scale: 1, opacity: 1, rotate: 0,
            duration: 0.7, ease: "elastic.out(1,0.6)",
            scrollTrigger: { trigger: node, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Card tilt ─────────────────────────────────────────────────────
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left, y = e.clientY - top;
    gsap.to(el, {
      rotateX: ((y - height / 2) / height) * -6,
      rotateY: ((x - width / 2) / width) * 6,
      transformPerspective: 900, duration: 0.4, ease: "power2.out",
    });
    const glow = el.querySelector<HTMLElement>(".cursor-glow");
    if (glow) gsap.to(glow, { x: x - 80, y: y - 80, duration: 0.3, ease: "power2.out" });
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1,0.7)" });
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative px-6 py-32 overflow-hidden bg-black"
      style={{ perspective: "1200px" }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full opacity-50" />

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(148,163,184,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.04) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Bloom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(96,165,250,0.05) 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-5xl relative z-10">

        {/* Header */}
        <div className="mb-24 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-blue-400" />
            <span className="text-[10px] tracking-[.2em] uppercase text-blue-400 font-medium font-mono">
              Career / Timeline
            </span>
          </div>
          <h2
            ref={headlineRef}
            className="text-6xl md:text-7xl font-bold tracking-tighter"
            style={{
              background: "linear-gradient(135deg, #fff 40%, #60a5fa 70%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              perspective: "600px",
              transformStyle: "preserve-3d",
            }}
          >
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div ref={lineTrackRef} className="relative">

          {/* Track + animated fill */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/5 md:-translate-x-px">
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{
                background: "linear-gradient(to bottom, #60a5fa, #a78bfa, rgba(167,139,250,0))",
                boxShadow: "0 0 12px rgba(96,165,250,0.4)",
                transform: "scaleY(0)",
              }}
            />
          </div>

          <div className="space-y-28">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center"
                >
                  {/* Node */}
                  <div
                    ref={(el) => { nodeRefs.current[i] = el; }}
                    className="absolute left-4 md:left-1/2 z-20 -translate-x-[19px] md:-translate-x-1/2 group/node"
                  >
                    <div
                      className="relative w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(10,10,15,0.9)",
                        border: `1px solid ${exp.border}`,
                        backdropFilter: "blur(12px)",
                        boxShadow: `0 0 20px ${exp.glow}`,
                      }}
                    >
                      {/* Ripple */}
                      <div
                        className="absolute inset-0 rounded-xl animate-ping"
                        style={{ background: exp.glow, animationDuration: "2.5s" }}
                      />
                      {exp.type === "Work"
                        ? <Briefcase size={16} style={{ color: exp.accent, position: "relative", zIndex: 1 }} />
                        : <GraduationCap size={16} style={{ color: exp.accent, position: "relative", zIndex: 1 }} />
                      }
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className={cn(
                      "w-full md:w-[45%] mt-16 md:mt-0 ml-12 md:ml-0 relative group",
                      isLeft ? "md:pr-14" : "md:ml-auto md:pl-14"
                    )}
                    style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden p-6"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: `1px solid rgba(148,163,184,0.1)`,
                        backdropFilter: "blur(16px)",
                        transition: "border-color 0.3s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = exp.border; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(148,163,184,0.1)"; }}
                    >
                      {/* Cursor glow */}
                      <div
                        className="cursor-glow pointer-events-none absolute w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `radial-gradient(circle, ${exp.glow}, transparent 70%)` }}
                      />

                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, transparent, ${exp.accent}, transparent)` }}
                      />

                      {/* Terminal dots */}
                      <div className={cn("flex gap-1.5 mb-5", isLeft ? "md:justify-end" : "justify-start")}>
                        {[exp.accent, "rgba(255,255,255,0.15)", "rgba(255,255,255,0.08)"].map((c, j) => (
                          <div key={j} className="w-2 h-2 rounded-full" style={{ background: c }} />
                        ))}
                      </div>

                      {/* Period badge */}
                      <div className={cn("mb-3", isLeft ? "md:text-right" : "")}>
                        <span
                          className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                          style={{ background: exp.glow, color: exp.accent, border: `1px solid ${exp.border}` }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Title / company */}
                      <div className={cn("space-y-1 mb-5", isLeft ? "md:text-right" : "")}>
                        <h3
                          className="text-xl md:text-2xl font-bold"
                          style={{ color: "#fff" }}
                        >
                          {exp.title}
                        </h3>
                        <p className="text-sm font-medium italic" style={{ color: exp.accent }}>
                          {exp.company}
                        </p>
                      </div>

                      {/* Divider */}
                      <div
                        className="mb-5 h-px"
                        style={{ background: `linear-gradient(${isLeft ? "270deg" : "90deg"}, ${exp.border}, transparent)` }}
                      />

                      {/* Description */}
                      <ul className={cn("space-y-3 mb-6", isLeft ? "md:text-right" : "")}>
                        {exp.description.map((item, j) => (
                          <li
                            key={j}
                            className="desc-line text-sm leading-relaxed text-zinc-400"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className={cn("flex flex-wrap gap-2", isLeft ? "md:justify-end" : "justify-start")}>
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="skill-badge px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest rounded-lg transition-all duration-300 cursor-default"
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(148,163,184,0.12)",
                              color: "#94a3b8",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = exp.border;
                              (e.currentTarget as HTMLElement).style.color = exp.accent;
                              (e.currentTarget as HTMLElement).style.background = exp.glow;
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = "rgba(148,163,184,0.12)";
                              (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}