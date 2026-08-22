"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Compass, Lightbulb, Heart, Shield, Target, Eye, Sparkles, Award } from "lucide-react";
import { Linkedin } from "@/components/SocialIcons";

export default function AboutPage() {
  const values = [
    { title: "Technical Integrity", desc: "We emphasize executable, functional prototypes over generic pitch decks.", icon: <Shield className="w-5 h-5 text-indigo-400" /> },
    { title: "Community First", desc: "No gatekeeping. We construct pathways for developers of all skill tiers.", icon: <Heart className="w-5 h-5 text-rose-400" /> },
    { title: "Real-World Focus", desc: "Solve tangible local issues, agronomy disruptions, or fintech integrations.", icon: <Compass className="w-5 h-5 text-emerald-400" /> },
    { title: "Iterative Learning", desc: "Fail fast, patch routes, rebuild structures. True builders improve incrementally.", icon: <Lightbulb className="w-5 h-5 text-amber-400" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans relative overflow-hidden">
      <Header />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full relative z-10">
        {/* Hero title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">About Vertothon</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            More than a community.<br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              A Platform For Builders.
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full mt-6 mb-6" />
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Uniting developers, designers, and creators to foster open innovation and build tangible technology solutions.
          </p>
        </div>

        {/* Mission / Vision split - CLEAN SOLID DARK CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* OUR MISSION CARD */}
          <div className="group relative rounded-3xl p-8 sm:p-10 bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header Icon + Label */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                  Core Purpose
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">
                Our Mission
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                To construct a frictionless operations operating system for technology learning and execution. We organize meetups, coding cohorts, and multi-track hackathons that connect curious minds with deployable industry expertise.
              </p>
            </div>

            {/* Bottom decorative bar */}
            <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-2 text-zinc-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" /> Action Driven
              </span>
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Vertothon Protocol</span>
            </div>
          </div>

          {/* OUR VISION CARD */}
          <div className="group relative rounded-3xl p-8 sm:p-10 bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header Icon + Label */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                  Future Horizon
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">
                Our Vision
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                To seed a decentralized network of active builder chapters. We see a future where tech enthusiasts, regardless of institutional pedigree, can gather, form cohorts, deploy software, and resolve socio-technical hurdles.
              </p>
            </div>

            {/* Bottom decorative bar */}
            <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-2 text-zinc-400 font-medium">
                <Award className="w-3.5 h-3.5" /> Long-Term Impact
              </span>
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Global Ecosystem</span>
            </div>
          </div>
        </div>

        {/* Founder & CEO Section */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-pink-500/30 mb-20 shadow-2xl overflow-hidden group">
          <div className="rounded-3xl bg-zinc-950/90 backdrop-blur-xl p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute -top-40 -left-40 h-80 w-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative h-56 w-44 rounded-2xl overflow-hidden border-2 border-indigo-500/30 flex-shrink-0 shadow-2xl shadow-indigo-500/20 group-hover:border-indigo-500/60 transition-all duration-300">
              <img
                src="/goutham_badiga.jpg"
                alt="Goutham Badiga - Founder & CEO"
                className="object-cover object-top h-full w-full scale-100 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-grow text-center md:text-left relative z-10">
              <span className="text-[11px] text-indigo-400 font-mono tracking-widest font-bold uppercase block mb-1">
                Leadership & Visionary
              </span>
              <h2 className="text-3xl font-black text-white uppercase tracking-wider">Goutham Badiga</h2>
              <span className="text-xs text-zinc-400 font-semibold block mt-1 uppercase tracking-wider">
                Founder & Lead Organizer, Vertothon
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed font-light">
                Vertothon is a youth-driven technology community and premier hackathon platform founded by Goutham Badiga. It is built to empower aspiring developers, designers, and innovators to collaborate, build impactful open-source technology, and launch real-world prototypes.
              </p>
              
              {/* Social Links */}
              <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                <a
                  href="https://www.linkedin.com/in/goutham-badiga-b20760294?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 hover:border-indigo-500/50 text-indigo-300 text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-indigo-500/10"
                >
                  <Linkedin className="w-4 h-4 text-indigo-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/gouthambadiga?igsh=bXRwN2l1dGdqYm0y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 hover:border-pink-500/50 text-pink-300 text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-pink-500/10"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-pink-400">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Core Tenets section */}
        <div className="mb-20">
          <h3 className="text-2xl font-black text-white mb-8 text-center uppercase tracking-wider">Our Core Tenets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="flex gap-4 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/70 hover:border-zinc-800 transition-all duration-300">
                <div className="flex-shrink-0 p-3 h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-md">
                  {v.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{v.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Philosophy Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-zinc-800 text-center flex flex-col items-center shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Brand Philosophy</h3>
          <span className="text-xs font-mono text-zinc-400 font-bold tracking-widest uppercase mb-4">
            BUILD. CONNECT. CREATE. IMPACT.
          </span>
          <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed font-light">
            We don't do simple pitch contests. We value clean code syntax, working telemetry dashboards, robust API integrations, and practical application layouts. If you share this engineering spirit, welcome home.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
