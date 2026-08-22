"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Award, Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export default function CommunityPage() {
  const benefits = [
    { title: "Collaborative Teams", desc: "Instantly form teams for hackathons, invite peers, and assign roles.", icon: <Users className="w-5 h-5 text-indigo-400" /> },
    { title: "Skill Validation", desc: "Earn cryptographic verification IDs on participant and winner certificates.", icon: <Award className="w-5 h-5 text-violet-400" /> },
    { title: "Exclusive Access", desc: "Receive immediate notifications about upcoming bootcamps and tech meetups.", icon: <Sparkles className="w-5 h-5 text-pink-400" /> },
    { title: "Direct Mentorship", desc: "Review project submissions with experienced industry engineers.", icon: <MessageCircle className="w-5 h-5 text-emerald-400" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans">
      <Header />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Vertothon Ecosystem</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 uppercase tracking-tight">
            The Hub for Creators & Tech Enthusiasts
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mt-4 leading-relaxed">
            Connect with thousands of students, developers, designers, founders, and engineers globally. Share resources, join forces, and create impact.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
          {benefits.map((b, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 flex gap-4">
              <div className="flex-shrink-0 p-3 h-11 w-11 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                {b.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1 uppercase tracking-wide">{b.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Block */}
        <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-950/40 text-center mb-20">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-6">Backed & Supported By</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="text-sm font-bold tracking-widest text-zinc-400">GOOGLE CLOUD</span>
            <span className="text-sm font-bold tracking-widest text-zinc-400">SUPABASE</span>
            <span className="text-sm font-bold tracking-widest text-zinc-400">VERCEL</span>
            <span className="text-sm font-bold tracking-widest text-zinc-400">RESLEND</span>
          </div>
        </div>

        {/* Join CTA */}
        <div className="p-12 rounded-3xl bg-radial-gradient-glow border border-indigo-500/10 text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Join the Vertothon Community</h2>
          <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
            Create your profile now to join projects, connect with mentors, RSVP for offline meetups, and validate your certifications.
          </p>
          <a
            href="https://whatsapp.com/channel/0029VbDMgyN7dmeZnWSJBp3E"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 text-xs font-bold bg-white text-black hover:bg-zinc-200 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/10 hover:scale-105 duration-200 uppercase tracking-widest"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
