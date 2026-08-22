"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import { useAppState } from "@/context/StateContext";
import { ArrowRight, Calendar, MapPin, Award, Users, ShieldAlert, Sparkles, Code, ExternalLink, Globe } from "lucide-react";
import { Github } from "@/components/SocialIcons";
import Logo from "@/components/Logo";

export default function HomePage() {
  const { events, users, sponsors, tracks, teams, submissions } = useAppState();

  // Filter only published events to show on homepage
  const publishedEvents = events.filter((e) => e.status === "published" || e.status === "open" || e.status === "ongoing");

  const stats = [
    {
      value: `${(users.length + 10320).toLocaleString()}+`,
      label: "COMMUNITY MEMBERS",
      icon: <Users className="w-5 h-5 text-indigo-400" />,
    },
    {
      value: `${events.length + 96}+`,
      label: "EVENTS COMPLETED",
      icon: <Calendar className="w-5 h-5 text-violet-400" />,
    },
    {
      value: `${sponsors.length + 47}+`,
      label: "GLOBAL PARTNERS",
      icon: <Sparkles className="w-5 h-5 text-pink-400" />,
    },
    {
      value: `${tracks.length + 21}+`,
      label: "COMMUNITIES",
      icon: <Code className="w-5 h-5 text-emerald-400" />,
    },
  ];

  const coreValues = [
    {
      title: "BUILD",
      desc: "Turn raw ideas into deployable, functional technology prototypes. Learn by executing.",
      glow: "group-hover:shadow-indigo-500/10",
      accent: "text-indigo-400",
    },
    {
      title: "LEARN",
      desc: "Up-skill through hands-on technical sessions, Bootcamps, and direct industry mentorship.",
      glow: "group-hover:shadow-violet-500/10",
      accent: "text-violet-400",
    },
    {
      title: "CONNECT",
      desc: "Meet like-minded developers, designers, designers, mentors, and corporate recruiters.",
      glow: "group-hover:shadow-fuchsia-500/10",
      accent: "text-fuchsia-400",
    },
    {
      title: "CREATE",
      desc: "Design products that solve micro-level local community issues or large-scale business hurdles.",
      glow: "group-hover:shadow-pink-500/10",
      accent: "text-pink-400",
    },
    {
      title: "IMPACT",
      desc: "Deploy solutions that create measurable real-world improvement in businesses and society.",
      glow: "group-hover:shadow-emerald-500/10",
      accent: "text-emerald-400",
    },
  ];

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "hackathon":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "workshop":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "meetup":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-[#030303] overflow-x-hidden font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-radial-gradient-glow overflow-hidden">
        <NetworkBackground />

        <div className="relative z-10 text-center max-w-4xl mx-auto py-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white text-xs font-semibold tracking-wider uppercase mb-6 animate-pulse-glow">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering the Next Generation of Builders
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gradient-premium mb-6 uppercase">
            BUILD. CONNECT.<br className="sm:hidden" /> CREATE. IMPACT.
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
            Vertothon is a technology-driven community empowering students, developers, creators, and innovators through high-fidelity hackathons, workshops, bootcamps, and real-world opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
            <Link
              id="cta_explore_events"
              href="/events"
              className="flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-white text-black hover:bg-zinc-200 transition-all shadow-lg hover:shadow-indigo-500/10 hover:scale-105 active:scale-95 duration-200"
            >
              EXPLORE EVENTS
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <Link
              id="cta_join_vertofi"
              href="https://whatsapp.com/channel/0029VbDMgyN7dmeZnWSJBp3E"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 duration-200"
            >
              JOIN VERTOTHON COMMUNITY
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics Section */}
      <section className="relative z-10 border-b border-zinc-900 bg-zinc-950/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900/80 text-center hover:border-zinc-800 transition-all"
              >
                <div className="mb-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  {stat.icon}
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                  {stat.value}
                </span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-24 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
                MORE THAN A COMMUNITY
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                A PLATFORM FOR BUILDERS & INNOVATORS.
              </h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed lg:border-l lg:border-zinc-800 lg:pl-6">
              Vertothon constructs ecosystems designed for developer acceleration. We curate high-stakes hacking sprints, intensive workshops, and local meetups that bridge academic curiosities with industry deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="group flex flex-col p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900 transition-all hover:-translate-y-1 hover:border-zinc-800"
              >
                <span className={`text-xl font-bold font-mono mb-4 tracking-wide ${val.accent}`}>
                  {val.title}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forge: Community Open Source Showcase */}
      <section id="forge" className="relative z-10 py-24 border-b border-zinc-900 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
              THE VERTOTHON FORGE
            </h2>
            <h3 className="text-3xl font-extrabold text-white uppercase tracking-tight">
              Community Builds & Projects
            </h3>
            <p className="text-xs text-zinc-500 mt-2 max-w-md mx-auto leading-relaxed">
              Explore working prototypes, sandboxes, and open-source packages designed and deployed by community builders.
            </p>
          </div>

          {submissions.length === 0 ? (
            /* Seeded fallback showcase projects */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 transition-all group">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase tracking-wider">
                    Fintech
                  </span>
                  <div className="flex gap-2">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-indigo-400 transition-colors">Rural Lend Ledger</h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Decentralized lending evaluations utilizing vendor transaction feeds and alternate grain warehouse receipts.</p>
                <span className="text-[9px] font-mono text-zinc-600 block mt-6">By Apex Coders</span>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 transition-all group">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                    Agritech
                  </span>
                  <div className="flex gap-2">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-emerald-400 transition-colors">ColdChain IoT Telemetry</h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Simulated sensor telemetry tracker transmitting real-time threshold alert events for perishables cargo.</p>
                <span className="text-[9px] font-mono text-zinc-600 block mt-6">By Cold Wave Devs</span>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 transition-all group">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold uppercase tracking-wider">
                    AI & Wellness
                  </span>
                  <div className="flex gap-2">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-pink-400 transition-colors">Wearable LLM Orchestrator</h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Syncs biometric telemetry inputs with local LLM prompts to construct responsive mental health checklists.</p>
                <span className="text-[9px] font-mono text-zinc-600 block mt-6">By Mind Hackers</span>
              </div>
            </div>
          ) : (
            /* List user submitted projects */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {submissions.map((sub) => {
                const team = teams.find((t) => t.id === sub.team_id);
                const trackName = tracks.find((t) => t.id === sub.track_id)?.name || "General";
                return (
                  <div key={sub.id} className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 transition-all group">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase tracking-wider">
                        {trackName}
                      </span>
                      <div className="flex gap-2">
                        {sub.github_repo && <a href={sub.github_repo} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>}
                        {sub.live_demo && <a href={sub.live_demo} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>}
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-indigo-400 transition-colors">{sub.project_name}</h4>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-3">{sub.description}</p>
                    <span className="text-[9px] font-mono text-zinc-600 block mt-6">By {team?.name || "Builder Team"}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>


      <Footer />
    </div>
  );
}
