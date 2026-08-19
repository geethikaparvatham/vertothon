"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Compass, Lightbulb, Heart, Shield, CheckCircle } from "lucide-react";
import { Linkedin } from "@/components/SocialIcons";

export default function AboutPage() {
  const values = [
    { title: "Technical Integrity", desc: "We emphasize executable, functional prototypes over generic pitch decks.", icon: <Shield className="w-5 h-5 text-indigo-400" /> },
    { title: "Community First", desc: "No gatekeeping. We construct pathways for developers of all skill tiers.", icon: <Heart className="w-5 h-5 text-violet-400" /> },
    { title: "Real-World Focus", desc: "Solve tangible local issues, agronomy disruptions, or fintech integrations.", icon: <Compass className="w-5 h-5 text-emerald-400" /> },
    { title: "Iterative Learning", desc: "Fail fast, patch routes, rebuild structures. True builders improve incrementally.", icon: <Lightbulb className="w-5 h-5 text-amber-400" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans">
      <Header />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Hero title */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">About Vertofi</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 uppercase tracking-tight">
            More than a community.<br />A platform for builders.
          </h1>
          <div className="h-1 w-20 bg-indigo-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Mission / Vision split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-900/80">
            <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Our Mission</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              To construct a frictionless operations operating system for technology learning and execution. We organize meetups, coding cohorts, and multi-track hackathons that connect curious minds with deployable industry expertise.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-900/80">
            <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Our Vision</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              To seed a decentralized network of active builder chapters. We see a future where tech enthusiasts, regardless of institutional pedigree, can gather, form cohorts, deploy software, and resolve socio-technical hurdles.
            </p>
          </div>
        </div>

        {/* Founder & CEO section */}
        <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-900/80 mb-20 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
          <div className="absolute -top-40 -left-40 h-80 w-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative h-52 w-40 rounded-2xl overflow-hidden border border-zinc-800 flex-shrink-0 shadow-2xl group-hover:border-zinc-700 transition-all duration-300">
            <img
              src="/goutham_badiga.jpg"
              alt="Goutham Badiga - Founder & CEO"
              className="object-cover object-top h-full w-full scale-100 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-grow text-center md:text-left relative z-10">
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest font-semibold uppercase block mb-1">
              Leadership
            </span>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Goutham Badiga</h2>
            <span className="text-xs text-zinc-500 font-medium block mt-0.5">Founder & CEO, Vertofi</span>
            <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed">
              Vertofi is an AI-powered Predictive Financial Intelligence Platform founded by Goutham Badiga, built to help businesses automate accounting, predict financial and tax risks, detect profit leakage, monitor financial health, and make smarter, data-driven decisions.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
              <a
                href="https://www.linkedin.com/in/goutham-badiga-b20760294?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-800 hover:text-white text-zinc-400 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <Linkedin className="w-4 h-4 text-indigo-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/gouthambadiga?igsh=bXRwN2l1dGdqYm0y"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-800 hover:text-white text-zinc-400 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-rose-550">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Values section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center uppercase tracking-wider">Our Core Tenets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="flex gap-4 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40">
                <div className="flex-shrink-0 p-3 h-11 w-11 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  {v.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{v.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy grid */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900/10 via-violet-900/10 to-fuchsia-900/10 border border-indigo-500/10 text-center flex flex-col items-center">
          <h3 className="text-xl font-extrabold text-white mb-2 uppercase tracking-wide">Brand Philosophy</h3>
          <span className="text-xs font-mono text-indigo-400 font-semibold tracking-widest uppercase mb-4">
            BUILD. CONNECT. CREATE. IMPACT.
          </span>
          <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
            We don't do simple pitch contests. We value clean code syntax, working telemetry dashboards, robust API integrations, and practical application layouts. If you share this engineering spirit, welcome home.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
