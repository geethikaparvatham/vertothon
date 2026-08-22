"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  Code, 
  Cpu, 
  Flame, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  CheckCircle2, 
  Gift, 
  Rocket, 
  Layers,
  Terminal,
  ShieldCheck
} from "lucide-react";

export default function VertothonHomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const tracks = [
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: "AI & Machine Learning",
      desc: "Build autonomous agents, generative AI tools, predictive analytics, and intelligent systems solving real human problems."
    },
    {
      icon: <Layers className="w-6 h-6 text-indigo-400" />,
      title: "Full-Stack & Web3",
      desc: "Craft high-performance web applications, decentralized platforms, or collaborative developer tooling."
    },
    {
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      title: "Open Innovation & Social Tech",
      desc: "Address pressing challenges in education, healthcare, sustainability, agriculture, or civic empowerment."
    },
    {
      icon: <Terminal className="w-6 h-6 text-emerald-400" />,
      title: "Developer Tools & Cyber",
      desc: "Build developer productivity tools, secure cloud infrastructure, APIs, or open-source developer libraries."
    }
  ];

  const timelineSteps = [
    {
      phase: "Phase 01",
      title: "Registration & Team Formation",
      date: "Stay Tuned",
      desc: "Register your team of 2-4 developers, designers, or problem solvers. Individual participants will get matched in team formation channels.",
      status: "Upcoming"
    },
    {
      phase: "Phase 02",
      title: "Grand Opening & Problem Statements",
      date: "Day 1 - Morning",
      desc: "Official kickoff keynote, reveal of surprise track challenges, guidelines distribution, and commencement of 24-hour hacking countdown.",
      status: "Scheduled"
    },
    {
      phase: "Phase 03",
      title: "Hacking Sprint & Mentor Check-ins",
      date: "Day 1 - Afternoon to Night",
      desc: "Intensive building sprint with 1-on-1 feedback sessions from expert engineering and product mentors.",
      status: "Scheduled"
    },
    {
      phase: "Phase 04",
      title: "Code Freeze & Pitching Round",
      date: "Day 2 - Morning",
      desc: "Final repository submissions, video demos, followed by live prototype pitches before the jury panel.",
      status: "Scheduled"
    },
    {
      phase: "Phase 05",
      title: "Award Ceremony & Closing",
      date: "Day 2 - Afternoon",
      desc: "Announcements of top winners, track prizes, goodies distribution, and networking mixer.",
      status: "Scheduled"
    }
  ];

  const prizes = [
    {
      rank: "2nd",
      title: "1st Runner Up",
      amount: "Cash & Swag Box",
      perks: ["Runner-Up Trophy", "Exclusive Vertothon Merch", "Mentorship Access", "Certificate of Excellence"],
      gradient: "from-zinc-400/20 to-zinc-600/10",
      border: "border-zinc-700/60",
      badge: "Silver Tier"
    },
    {
      rank: "1st",
      title: "Grand Champion",
      amount: "Grand Prize & Trophy",
      perks: ["Winner Trophy & Medals", "Premium Swag Kit", "Direct Investor / Partner Intro", "Winner Spotlight & Press Feature"],
      gradient: "from-indigo-600/30 via-violet-600/20 to-amber-500/10",
      border: "border-indigo-500",
      badge: "Winner Champion",
      featured: true
    },
    {
      rank: "3rd",
      title: "2nd Runner Up",
      amount: "Cash & Goodies",
      perks: ["Bronze Trophy", "Vertothon Swag Pack", "Partner Perks & Credits", "Certificate of Excellence"],
      gradient: "from-amber-700/20 to-amber-900/10",
      border: "border-amber-700/40",
      badge: "Bronze Tier"
    }
  ];

  const faqs = [
    {
      q: "Who can participate in Vertothon?",
      a: "Vertothon is open to all students, developers, designers, and innovators irrespective of college or background. If you love building solutions with technology, you are welcome!"
    },
    {
      q: "Is there any registration fee for Vertothon?",
      a: "No! Registration for Vertothon is 100% free of cost. Food, mentor support, and workshop sessions will be provided to shortlisted participants."
    },
    {
      q: "What is the team size allowed?",
      a: "Teams can have 2 to 4 members. If you don't have a team yet, you can register individually and form a team during our team-matching sessions on WhatsApp & Discord."
    },
    {
      q: "Can beginners participate?",
      a: "Absolutely! We will have dedicated mentors, workshops, and starter resources to help beginners take their ideas from zero to a working prototype."
    },
    {
      q: "How can I stay updated on registration dates?",
      a: "Join the official Vertothon WhatsApp community channel or follow our social channels for instant announcements regarding registration launch!"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <Header />
      <NetworkBackground />

      <main className="relative z-10 flex-grow">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden border-b border-zinc-900/60">
          <div className="absolute inset-0 bg-radial-gradient-glow opacity-80 pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
            {/* Top Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 shadow-lg shadow-indigo-500/10 animate-pulse-glow">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>The Flagship Student & Builder Hackathon</span>
            </div>

            {/* Main Big Title */}
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight leading-none uppercase font-sans mb-4">
              <span className="text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">VERTO</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400">THON</span>
            </h1>

            {/* Tagline */}
            <div className="flex items-center justify-center gap-3 text-xs sm:text-base font-bold uppercase tracking-[0.3em] text-zinc-400 mb-8">
              <span className="text-zinc-200">CODE</span>
              <span className="text-rose-500 font-black">•</span>
              <span className="text-zinc-200">INNOVATE</span>
              <span className="text-indigo-400 font-black">•</span>
              <span className="text-zinc-200">IMPACT</span>
            </div>

            <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
              A high-energy, 24-hour national hackathon bringing together the sharpest coders, creators, and innovators to build disruptive tech solutions.
            </p>

            {/* Coming Soon & Key Highlights Pill */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium text-zinc-400 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>24 Hours Non-Stop</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
                <Users className="w-4 h-4 text-violet-400" />
                <span>Teams of 2 - 4</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Exciting Prizes & Swag</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
              <a
                href="https://whatsapp.com/channel/0029VbDMgyN7dmeZnWSJBp3E"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold uppercase tracking-wider text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-xl shadow-white/10 hover:scale-105 active:scale-95 duration-200 flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                Get Notified on WhatsApp
              </a>
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 text-zinc-200 font-bold uppercase tracking-wider text-xs sm:text-sm border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 transition-all hover:scale-105 active:scale-95 duration-200 flex items-center justify-center gap-2"
              >
                Learn More
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-zinc-950/40 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">About The Event</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Where Visionaries Meet Technology
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full mt-4 mb-6" />
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Vertothon is designed to unleash creative engineering, rapid prototyping, and collaborative spirit. Whether you are building AI agents, Web3 infrastructure, or social impact applications, Vertothon is your launchpad.
              </p>
            </div>

            {/* Hackathon Tracks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tracks.map((track, i) => (
                <div 
                  key={i} 
                  className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-900 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="p-3 rounded-xl bg-zinc-900/90 w-fit mb-4 border border-zinc-800 group-hover:scale-110 group-hover:border-indigo-500/50 transition-all">
                      {track.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide group-hover:text-indigo-300 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {track.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center text-xs font-semibold text-indigo-400 gap-1 group-hover:gap-2 transition-all">
                    <span>Open Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TIMELINE SECTION ================= */}
        <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-violet-400 uppercase tracking-widest block mb-2">The Schedule</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Hackathon Timeline
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-rose-500 mx-auto rounded-full mt-4 mb-6" />
              <p className="text-zinc-400 text-sm">
                Follow the milestone roadmap from team registration up to the final demo pitches.
              </p>
            </div>

            <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-32 space-y-10">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative pl-8 sm:pl-10 group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-indigo-500 group-hover:bg-indigo-500 group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                  {/* Date badge on left for larger screens */}
                  <div className="sm:absolute sm:-left-32 sm:top-1 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 sm:mb-0">
                    {step.phase}
                  </div>

                  <div className="p-6 rounded-2xl bg-zinc-950/90 border border-zinc-900 group-hover:border-zinc-800 transition-all shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                        {step.title}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRIZES SECTION ================= */}
        <section id="prizes" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-zinc-950/40 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">Rewards & Recognition</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Prizes & Perks
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-rose-500 mx-auto rounded-full mt-4 mb-6" />
              <p className="text-zinc-400 text-sm">
                Compete for grand prizes, sponsored track bounties, exclusive swags, and developer certifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {prizes.map((p, i) => (
                <div
                  key={i}
                  className={`rounded-3xl p-8 bg-gradient-to-b ${p.gradient} bg-zinc-950/90 border ${p.border} flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:scale-105 shadow-2xl ${
                    p.featured ? "md:-translate-y-4 md:py-12 border-2" : ""
                  }`}
                >
                  <div className="px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-300 mb-6">
                    {p.badge}
                  </div>

                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-2xl font-black text-white shadow-inner">
                    {p.rank}
                  </div>

                  <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-1">
                    {p.title}
                  </h3>

                  <div className="text-sm font-semibold text-indigo-400 mb-6">
                    {p.amount}
                  </div>

                  <div className="w-full h-[1px] bg-zinc-900 mb-6" />

                  <ul className="w-full space-y-3 text-left mb-6 text-xs text-zinc-300">
                    {p.perks.map((perk, j) => (
                      <li key={j} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COMMUNITY COUNCIL & TEAM ================= */}
        <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 relative">
          <div className="max-w-6xl mx-auto text-center">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">Community Council</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Meet The Vertothon Team
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full mb-6" />
            <p className="text-zinc-400 text-sm max-w-xl mx-auto mb-12 leading-relaxed">
              Organized by passionate student leads, technical architects, and community volunteers dedicated to empowering the next generation of builders.
            </p>

            {/* Featured Leads Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  name: "ISSAKU TAGARAMPUDI",
                  role: "TEAM LEAD",
                  image: "/issaku.jpg",
                  initials: "IT",
                  color: "from-blue-500 via-indigo-500 to-violet-600",
                  linkedin: "issaku-tagarampudi"
                },
                {
                  name: "MUTHINA ABHILASH",
                  role: "TEAM CO-LEAD",
                  image: "/team_abhilash.jpg",
                  initials: "MA",
                  color: "from-blue-400 to-indigo-600",
                  linkedin: "muthina-abhilash"
                },
                {
                  name: "PARVATHAM GEETHIKA",
                  role: "TECH LEAD",
                  image: "/team_geethika.jpg",
                  initials: "PG",
                  color: "from-pink-500 to-rose-600",
                  linkedin: "geethika-parvatham"
                },
                {
                  name: "VARSHITH",
                  role: "OPERATIONS LEAD",
                  image: "/team_varshith.jpg",
                  initials: "V",
                  color: "from-teal-500 to-emerald-600",
                  linkedin: "varshith-tech"
                },
                {
                  name: "KATTA CHARAN RAJ",
                  role: "CONTENT LEAD",
                  image: "/team_charan.jpg",
                  initials: "KC",
                  color: "from-red-500 to-orange-600",
                  linkedin: "charan-raj-katta"
                },
                {
                  name: "KUSHAL SUTTARAI",
                  role: "CREATIVE LEAD",
                  image: "/team_kushal.jpg",
                  initials: "KS",
                  color: "from-amber-500 to-orange-600",
                  linkedin: "kushal-suttarai"
                },
                {
                  name: "RAMIREDDY JOEL",
                  role: "DIGITAL LEAD",
                  image: "/team_joel.jpg",
                  initials: "RJ",
                  color: "from-emerald-500 to-teal-600",
                  linkedin: "joel-ramireddy"
                },
                {
                  name: "VEDULA SAI SARANVI",
                  role: "EVENT HOST",
                  image: "/team_saranvi.jpg",
                  initials: "VS",
                  color: "from-rose-500 to-purple-600",
                  linkedin: "sai-saranvi-vedula"
                }
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl border border-zinc-900 bg-zinc-950/80 shadow-lg hover:shadow-indigo-500/10 hover:border-zinc-800 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
                >
                  <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${member.color} p-0.5 shadow-md relative overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}>
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="object-cover object-top h-full w-full rounded-full"
                      />
                    ) : (
                      <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center font-bold text-lg text-white">
                        {member.initials}
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-1">
                    {member.name}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border ${
                    member.role.includes("LEAD")
                      ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                      : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                  }`}>
                    {member.role}
                  </span>
                  <a
                    href={`https://linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-zinc-500 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>Connect</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>

            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold uppercase text-xs tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              View All 24+ Council Members
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-zinc-950/40 relative">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">Got Questions?</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full mt-4 mb-6" />
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-zinc-900 bg-zinc-950/80 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:text-indigo-400 transition-colors"
                    >
                      <span className="font-bold text-sm sm:text-base text-zinc-200">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-400 transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-180 text-indigo-400" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-900/60 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= REGISTER / CTA SECTION ================= */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-zinc-950/80 to-zinc-950 border border-indigo-500/30 shadow-2xl relative">
            <div className="absolute inset-0 bg-radial-gradient-glow opacity-50 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 block">
                Be Part of Something Big
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-4">
                Ready to Hack at Vertothon?
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl mb-10 leading-relaxed">
                Registrations will be opening soon. Join our WhatsApp channel to get priority registration access, team-mate pairing, and hackathon preparation updates.
              </p>

              <a
                href="https://whatsapp.com/channel/0029VbDMgyN7dmeZnWSJBp3E"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-xl bg-white text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-xl hover:scale-105 active:scale-95 duration-200 flex items-center gap-2"
              >
                Join Official Channel
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
