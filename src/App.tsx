import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Sparkles, 
  Radio, 
  MapPin, 
  ArrowUpRight, 
  Compass,
  Activity
} from 'lucide-react';

/* =========================================================================
   1. PORTFOLIO CONFIGURATION
   ========================================================================= */
const portfolioConfig = {
  name: "ALEX VANCE",
  callsign: "AV-904",
  role: "ASTRO-FRONTEND SPECIALIST & UI ARCHITECT",
  location: "BENGALURU, IN // 12.9716° N, 77.5946° E",
  status: "SYSTEM READY // AVAILABLE FOR CONTRACTS",
  bio: "Architecting zero-latency frontend engines, ultra-fluid reactive micro-interactions, and cinematic web application telemetry.",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:alex.vance@example.com"
  },
  projects: [
    {
      id: "PRJ-01",
      title: "Cosmic SaaS Monitor",
      subtitle: "Telemetry & Mission Ops Dashboard",
      description: "Mission control portal with sub-second WebSocket telemetry, multi-stream data ingestion, and custom shader visualizers.",
      tags: ["React", "TypeScript", "Tailwind", "Canvas API"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      badge: "FEATURED CORE",
      type: "dashboard"
    },
    {
      id: "PRJ-02",
      title: "Quantum Prototype Engine",
      subtitle: "Haptic Motion & Physics System",
      description: "Generative UI system with spring-physics gesture sheets, canvas particle tracers, and instant asset compile pipelines.",
      tags: ["Framer Motion", "React", "Web Audio", "Vite"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      badge: "EXPERIMENTAL",
      type: "prototype"
    },
    {
      id: "PRJ-03",
      title: "Hyperion Variant Hub",
      subtitle: "Component Architecture Matrix",
      description: "Zero-dependency design system library orchestrating 50+ polymorphic tokens with dynamic ambient lighting.",
      tags: ["TypeScript", "Tailwind", "Accessibility", "Storybook"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      badge: "STABLE",
      type: "system"
    }
  ]
};

/* =========================================================================
   2. SYNTHESIZED WEB AUDIO ENGINE
   ========================================================================= */
class SciFiAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBlip(freq = 800, duration = 0.05) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio safety
    }
  }

  playWarpEngage() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch {
      // Audio safety
    }
  }
}

const audio = new SciFiAudioEngine();

/* =========================================================================
   3. 3D GYROSCOPIC TILT CARGO CARD
   ========================================================================= */
function ProjectTiltCard({ project }: { project: typeof portfolioConfig.projects[0] }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((p) => ({ ...p, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => audio.playBlip(1100, 0.03)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/50 to-zinc-950 p-6 flex flex-col justify-between overflow-hidden shadow-2xl group hover:border-emerald-500/50"
    >
      <div 
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(350px circle at ${glarePos.x}px ${glarePos.y}px, rgba(52, 211, 153, 0.15), transparent 80%)`
        }}
      />

      <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-emerald-400/50 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-emerald-400/50 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-emerald-400/50 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-emerald-400/50 pointer-events-none" />

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
            {project.badge}
          </span>
          <span className="text-zinc-500 tracking-widest">{project.id} // CARGO</span>
        </div>

        {/* VISUAL MOCKUP PREVIEW CONTAINER */}
        <div className="h-32 w-full rounded-2xl bg-zinc-950/80 border border-zinc-800/80 overflow-hidden relative p-3 flex flex-col justify-between group-hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
            <span className="flex items-center gap-1 text-emerald-400">
              <Activity className="w-3 h-3 animate-pulse" /> LIVE STREAM
            </span>
            <span>60 FPS</span>
          </div>

          {project.type === 'dashboard' && (
            <div className="space-y-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-6 rounded bg-emerald-500/20 border border-emerald-500/30" />
                <div className="h-6 rounded bg-zinc-900 border border-zinc-800" />
                <div className="h-6 rounded bg-zinc-900 border border-zinc-800" />
              </div>
              <div className="h-10 rounded bg-zinc-900/90 border border-zinc-800 flex items-end p-1 gap-1">
                <div className="w-1/6 h-3 bg-emerald-400/60 rounded-sm" />
                <div className="w-1/6 h-6 bg-emerald-400/80 rounded-sm" />
                <div className="w-1/6 h-4 bg-emerald-400/50 rounded-sm" />
                <div className="w-1/6 h-7 bg-emerald-400 rounded-sm" />
                <div className="w-1/6 h-5 bg-emerald-400/70 rounded-sm" />
                <div className="w-1/6 h-8 bg-emerald-300 rounded-sm" />
              </div>
            </div>
          )}

          {project.type === 'prototype' && (
            <div className="flex items-center justify-center h-full">
              <div className="w-20 h-20 rounded-full border border-emerald-500/40 flex items-center justify-center animate-spin-slow relative">
                <div className="w-12 h-12 rounded-full border border-indigo-400/40" />
                <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              </div>
            </div>
          )}

          {project.type === 'system' && (
            <div className="grid grid-cols-2 gap-2 h-full items-center p-1">
              <div className="space-y-1">
                <div className="h-2 w-12 bg-emerald-400/40 rounded" />
                <div className="h-4 w-full bg-zinc-900 border border-zinc-800 rounded" />
              </div>
              <div className="space-y-1">
                <div className="h-2 w-10 bg-indigo-400/40 rounded" />
                <div className="h-4 w-full bg-zinc-900 border border-zinc-800 rounded" />
              </div>
            </div>
          )}

          <div className="text-[8px] font-mono text-zinc-600 text-right uppercase">
            RENDER ID: {project.id}-TX
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
            {project.title}
            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
          </h3>
          <p className="text-xs font-mono text-zinc-400 pt-0.5">{project.subtitle}</p>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed font-sans">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((t, idx) => (
            <span key={idx} className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-xl border border-zinc-800">
              #{t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-900/90 pt-4 mt-6 relative z-10">
        <a 
          href={project.githubUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          onClick={() => audio.playBlip(750, 0.04)}
        >
          SOURCE_CODE
        </a>
        <a 
          href={project.demoUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
          onClick={() => audio.playWarpEngage()}
        >
          DEPLOYED_URL <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

/* =========================================================================
   4. MAIN ORBITAL DECK APPLICATION
   ========================================================================= */
export default function App() {
  const [audioMuted, setAudioMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0] + " UTC");
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    audio.enabled = audioMuted;
    setAudioMuted(!audioMuted);
    if (audioMuted) audio.playBlip(880, 0.05);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden pb-24">
      
      {/* Background Star Ambient Radiance */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.15),transparent_70%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Floating Status Nav Bar */}
      <nav className="sticky top-4 z-50 max-w-5xl mx-auto px-4">
        <div className="backdrop-blur-xl bg-zinc-950/80 border border-emerald-500/25 rounded-2xl px-5 py-3 flex items-center justify-between shadow-[0_0_30px_rgba(52,211,153,0.1)]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="w-3 h-3 rounded-full bg-emerald-400 block animate-ping absolute inset-0 opacity-75" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 block relative" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white tracking-widest">{portfolioConfig.callsign} // ORBITAL DECK</span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-emerald-400 ml-2">● SYSTEM ONLINE</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden md:flex items-center gap-1.5 text-zinc-400">
              <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
              <span>{currentTime || "00:00:00 UTC"}</span>
            </div>

            <button 
              onClick={toggleAudio}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
              title="Toggle Audio Feedback"
            >
              {audioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span className="text-[10px] hidden sm:inline">{audioMuted ? "MUTED" : "AUDIO ON"}</span>
            </button>

            <a 
              href={portfolioConfig.socials.email}
              onClick={() => audio.playWarpEngage()}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              TRANSMIT
            </a>
          </div>
        </div>
      </nav>

      {/* Main Mission Control Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12 relative z-10">
        
        {/* TOP HERO BENTO GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Pilot Dossier */}
          <div className="lg:col-span-7 rounded-3xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/50 via-zinc-950 to-zinc-950 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                {portfolioConfig.status}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">[PRIMARY DESIGNATION]</span>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
                  {portfolioConfig.name}
                </h1>
                <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent pt-1">
                  {portfolioConfig.role}
                </p>
                <p className="text-xs font-mono text-zinc-500 flex items-center gap-1.5 pt-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {portfolioConfig.location}
                </p>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed max-w-xl font-sans">
                {portfolioConfig.bio}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-zinc-900 mt-6">
              <a 
                href={portfolioConfig.socials.github} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => audio.playBlip(700, 0.03)}
                className="px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                GITHUB
              </a>
              <a 
                href={portfolioConfig.socials.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => audio.playBlip(800, 0.03)}
                className="px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                LINKEDIN
              </a>
              <a 
                href={portfolioConfig.socials.twitter} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => audio.playBlip(900, 0.03)}
                className="px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                TWITTER
              </a>
              <a 
                href={portfolioConfig.socials.email} 
                onClick={() => audio.playWarpEngage()}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-mono font-bold hover:bg-emerald-400 transition-all ml-auto shadow-md shadow-emerald-500/20"
              >
                CONNECT // COMMS
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center">
            <div className="w-full p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 text-sm text-zinc-300 leading-relaxed shadow-xl">
              Ready to deploy production web frontends with fluid state transitions and pixel-clean typography.
            </div>
          </div>

        </section>

        {/* FEATURED CARGO / PROJECTS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Mission Cargo // Featured Builds
              </h2>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">3 VERIFIED DEPLOYMENTS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioConfig.projects.map((proj) => (
              <ProjectTiltCard key={proj.id} project={proj} />
            ))}
          </div>
        </section>

      </main>

    </div>
  );
}