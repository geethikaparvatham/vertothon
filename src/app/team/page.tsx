"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import { Github, Linkedin, Instagram } from "@/components/SocialIcons";
import { Sparkles, Shield } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  image?: string;
  color: string;
  glow?: string;
  bio: string;
  links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
}

export default function TeamPage() {
  const teamMembers: TeamMember[] = [
    {
      name: "ISSAKU TAGARAMPUDI",
      role: "TEAM LEAD",
      initials: "IT",
      image: "/issaku.jpg",
      color: "from-blue-500 via-indigo-500 to-violet-600",
      glow: "shadow-indigo-500/20 hover:border-indigo-500/40",
      bio: "Lead developer and core council team coordinator. Manages state synchronization, repository modules, and volunteer operations.",
      links: { linkedin: "issaku-tagarampudi", github: "issakut", twitter: "issaku_t" },
    },
    {
      name: "MUTHINA ABHILASH",
      role: "TEAM CO-LEAD",
      initials: "MA",
      image: "/team_abhilash.jpg",
      color: "from-blue-400 to-indigo-600",
      glow: "shadow-blue-500/10 hover:border-zinc-800",
      bio: "Handles premium frontend UI elements, page configurations, and responsive micro-animations.",
      links: { linkedin: "muthina-abhilash", github: "muthinaabhilash", twitter: "abhilash_m" },
    },
    {
      name: "PARVATHAM GEETHIKA",
      role: "TECH LEAD",
      initials: "PG",
      image: "/team_geethika.jpg",
      color: "from-pink-500 to-rose-600",
      glow: "shadow-pink-500/10 hover:border-zinc-800",
      bio: "Creates user experience mockups for workspaces, project slides, and certificate credentials.",
      links: { linkedin: "geethika-parvatham", github: "geethikap", twitter: "geethika_p" },
    },
    {
      name: "KUSHAL SUTTARAI",
      role: "CREATIVE LEAD",
      initials: "KS",
      image: "/team_kushal.jpg",
      color: "from-amber-500 to-orange-600",
      glow: "shadow-amber-500/10 hover:border-zinc-800",
      bio: "Supervises automated cloud build workflows, static routing parameters, and performance audits.",
      links: { linkedin: "kushal-suttarai", github: "kushals", twitter: "kushal_s" },
    },
    {
      name: "RAMIREDDY JOEL",
      role: "DIGITAL LEAD",
      initials: "RJ",
      image: "/team_joel.jpg",
      color: "from-emerald-500 to-teal-600",
      glow: "shadow-emerald-500/10 hover:border-zinc-800",
      bio: "Structures backend provider contexts, checker simulator logs, and evaluation metrics models.",
      links: { linkedin: "joel-ramireddy", github: "joelr", twitter: "joel_r" },
    },
    {
      name: "KATTA CHARAN RAJ",
      role: "CONTENT LEAD",
      initials: "KC",
      image: "/team_charan.jpg",
      color: "from-red-500 to-orange-600",
      glow: "shadow-red-500/10 hover:border-zinc-800",
      bio: "Manages platform security configurations, encrypted audit timeline trails, and registration keys.",
      links: { linkedin: "charan-raj-katta", github: "charanrajk", twitter: "charan_raj" },
    },
    {
      name: "VARSHITH",
      role: "OPERATIONS LEAD",
      initials: "V",
      image: "/team_varshith.jpg",
      color: "from-teal-500 to-emerald-600",
      glow: "shadow-teal-500/10 hover:border-zinc-800",
      bio: "Supports physical venue logistics, setup check simulators, and volunteer operations.",
      links: { linkedin: "varshith-tech", github: "varshith", twitter: "varshith_tech" },
    },
    {
      name: "MARADANA VAMSI MOHAN",
      role: "OPERATIONS LEAD",
      initials: "MV",
      image: "/team_vamsi_mohan.jpg",
      color: "from-pink-500 to-indigo-500",
      glow: "shadow-pink-500/10 hover:border-zinc-800",
      bio: "Coordinates community communications, social announcements, and press media updates.",
      links: { linkedin: "vamsi-mohan-maradana", github: "vamsimohan", twitter: "vamsi_mohan" },
    },
    {
      name: "MOHAMMAD AYAZ AHMED",
      role: "TECH TEAM",
      initials: "MA",
      image: "/team_ayaz.jpg",
      color: "from-cyan-500 to-blue-600",
      glow: "shadow-cyan-500/10 hover:border-zinc-800",
      bio: "Maintains portal feature consoles, schedule updates, and organizers database entries.",
      links: { linkedin: "ayaz-ahmed-mohammad", github: "ayazahmed", twitter: "ayaz_ahmed" },
    },
    {
      name: "CHADA VARSHINI",
      role: "TECH TEAM",
      initials: "CV",
      image: "/team_varshini.jpg",
      color: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/10 hover:border-zinc-800",
      bio: "Manages participant coordination, verification badges, and event registry records.",
      links: { linkedin: "chada-varshini", github: "chadavarshini", twitter: "chada_varshini" },
    },
    {
      name: "VEDULA SAI SARANVI",
      role: "EVENT HOST",
      initials: "VS",
      image: "/team_saranvi.jpg",
      color: "from-rose-500 to-purple-600",
      glow: "shadow-rose-500/10 hover:border-zinc-800",
      bio: "Directs developer relations operations, onboarding schedules, and resource docs.",
      links: { linkedin: "sai-saranvi-vedula", github: "saranvi", twitter: "saranvi_v" },
    },
    {
      name: "UDAI KIRAN",
      role: "EVENT TEAM",
      initials: "UK",
      image: "/team_udai.jpg",
      color: "from-blue-600 to-indigo-700",
      glow: "shadow-blue-500/10 hover:border-zinc-800",
      bio: "Coordinates sponsor tracks criteria, partner benefits, and logo banners updates.",
      links: { linkedin: "udai-kiran", github: "udaikiran", twitter: "udai_kiran" },
    },
    {
      name: "SANAPALA TRISHANK",
      role: "EVENT TEAM",
      initials: "ST",
      image: "/team_trishank.jpg",
      color: "from-indigo-650 to-violet-700",
      glow: "shadow-indigo-500/10 hover:border-zinc-800",
      bio: "Facilitates campus chapter outreach, student group signups, and local events promotion.",
      links: { linkedin: "trishank-sanapala", github: "trishanks", twitter: "trishank_s" },
    },
    {
      name: "UPPU RISHI KUMAR",
      role: "EVENT HOST",
      initials: "UR",
      image: "/team_rishi_kumar.jpg",
      color: "from-fuchsia-500 to-pink-600",
      glow: "shadow-fuchsia-500/10 hover:border-zinc-800",
      bio: "Develops portal graphics, custom SVG brand badges, and responsive sidebar logos.",
      links: { linkedin: "rishi-kumar-uppu", github: "rishikumaru", twitter: "rishi_kumar" },
    },
    {
      name: "ADIMULAM VIJAY KUMAR",
      role: "EVENT TEAM",
      initials: "AV",
      image: "/team_vijay_kumar.jpg",
      color: "from-emerald-500 to-green-600",
      glow: "shadow-emerald-500/10 hover:border-zinc-800",
      bio: "Analyzes system metrics logs, database outputs, and event rosters telemetry.",
      links: { linkedin: "vijay-kumar-adimulam", github: "vijaykumara", twitter: "vijay_kumar" },
    },
    {
      name: "BAKKATHALA SHIVA",
      role: "EVENT TEAM",
      initials: "BS",
      image: "/team_shiva.jpg",
      color: "from-sky-500 to-cyan-600",
      glow: "shadow-sky-500/10 hover:border-zinc-800",
      bio: "Configures static page optimization bundles and routing parameters boundaries.",
      links: { linkedin: "shiva-bakkathala", github: "shivab", twitter: "shiva_b" },
    },
    {
      name: "SHAIK ASIF HUSSAIN",
      role: "TECH TEAM",
      initials: "SA",
      image: "/team_asif.jpg",
      color: "from-yellow-500 to-amber-600",
      glow: "shadow-yellow-500/10 hover:border-zinc-800",
      bio: "Structures documentation briefs, technical guides, and problem statements schedules.",
      links: { linkedin: "asif-hussain-shaik", github: "asifhussain", twitter: "asif_hussain" },
    },
    {
      name: "HARSHA",
      role: "EVENT TEAM",
      initials: "H",
      image: "/team_harsha.jpg",
      color: "from-orange-500 to-red-600",
      glow: "shadow-orange-500/10 hover:border-zinc-800",
      bio: "Assists on-ground volunteer rosters scheduling, entry check-in, and info desks.",
      links: { linkedin: "harsha-tech", github: "harsha", twitter: "harsha_tech" },
    },
    {
      name: "KARTHIK NIMMANAGOTI",
      role: "CONTENT LEAD",
      initials: "KN",
      image: "/team_karthik_nimmanagoti.jpg",
      color: "from-violet-500 to-blue-500",
      glow: "shadow-violet-500/10 hover:border-zinc-800",
      bio: "Moderates submitted projects links, evaluates codes parameters, and filters spam.",
      links: { linkedin: "karthik-nimmanagoti", github: "karthikn", twitter: "karthik_n" },
    },
    {
      name: "YENISHETTY SAI VARUN",
      role: "EVENT TEAM",
      initials: "YS",
      image: "/team_sai_varun.jpg",
      color: "from-teal-500 to-indigo-650",
      glow: "shadow-teal-500/10 hover:border-zinc-800",
      bio: "Helps teams setting up hardware frameworks, IoT interfaces, and mock sensors.",
      links: { linkedin: "sai-varun-yenishetty", github: "saivaruny", twitter: "sai_varun" },
    },
    {
      name: "RIZWANA LALAMMAGARI",
      role: "EVENT TEAM",
      initials: "RL",
      image: "/team_rizwana.jpg",
      color: "from-purple-500 to-rose-600",
      glow: "shadow-purple-500/10 hover:border-zinc-800",
      bio: "Drives university marketing campaigns and helps onboarding new student chapters.",
      links: { linkedin: "rizwana-lalammagari", github: "rizwanal", twitter: "rizwana_l" },
    },
    {
      name: "PEDADA KARTHIK",
      role: "COORDINATOR LEAD",
      initials: "PK",
      image: "/team_karthik_pedada.jpg",
      color: "from-cyan-500 to-teal-600",
      glow: "shadow-cyan-500/10 hover:border-zinc-800",
      bio: "Manages portal chat channels, credentials support tickets, and role switching.",
      links: { linkedin: "karthik-pedada", github: "karthikp", twitter: "karthik_pedada" },
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans relative overflow-hidden">
      <Header />
      <NetworkBackground />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] font-bold tracking-wider uppercase mb-4">
            <Sparkles className="w-3 h-3" />
            VERTOTHON COUNCIL
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight leading-none">
            Meet Our Core Team
          </h1>
          <p className="text-sm text-zinc-400 max-w-lg mt-3 leading-relaxed">
            The community volunteers, technology advisors, and product mentors working behind the scenes to host tech events and accelerate developers.
          </p>
        </div>

        {/* Highlighted 1st Card: Team Lead (ISSAKU TAGARAMPUDI) in the Middle */}
        <div className="flex justify-center mb-20">
          <div className="w-full max-w-md glass-card p-8 rounded-3xl border-2 border-indigo-500/50 bg-zinc-950/90 shadow-2xl shadow-indigo-500/20 hover:scale-[1.03] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group">
            {/* Glowing border / backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-[9px] font-black uppercase tracking-widest text-white shadow-md shadow-indigo-500/25 select-none">
              Team Lead
            </div>
            
            {/* Avatar with dynamic ring glow */}
            <div className="h-24 w-24 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-violet-600 shadow-xl relative overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center bg-zinc-950">
              {teamMembers[0].image ? (
                <img
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  className="object-cover h-full w-full rounded-full"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center font-black text-2xl text-white relative overflow-hidden">
                  <div className="absolute inset-0.5 rounded-full bg-zinc-950/40" />
                  <span className="relative z-10">{teamMembers[0].initials}</span>
                </div>
              )}
            </div>

            {/* Name & Role */}
            <h3 className="text-lg font-black text-white uppercase tracking-wider">
              {teamMembers[0].name}
            </h3>
            <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold tracking-widest uppercase border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              {teamMembers[0].role}
            </span>

            {/* Bio */}
            <p className="text-xs text-zinc-300 mt-4 leading-relaxed max-w-sm">
              {teamMembers[0].bio}
            </p>

            {/* Social Connections */}
            <div className="mt-8 pt-4 border-t border-zinc-900/60 w-full flex items-center justify-center gap-4 text-zinc-500">
              <a
                href={`https://linkedin.com/in/${teamMembers[0].links.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://github.com/${teamMembers[0].links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={teamMembers[0].links.instagram ? (teamMembers[0].links.instagram.startsWith("http") ? teamMembers[0].links.instagram : `https://instagram.com/${teamMembers[0].links.instagram}`) : `https://instagram.com/${teamMembers[0].links.twitter || ""}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Separator Heading for Members */}
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Organizers & Mentors</h2>
          <div className="h-[1px] w-20 bg-zinc-900 mx-auto mt-3" />
        </div>

        {/* Remaining Team Cards Grid (3 Cards Per Row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {teamMembers.slice(1).map((member, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-3xl border border-zinc-900 bg-zinc-950/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:border-zinc-800 group relative overflow-hidden"
            >
              {/* Radial Glow Monogram / Avatar */}
              <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${member.color} p-0.5 shadow-md relative overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}>
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover object-top h-full w-full rounded-full"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center font-bold text-lg text-white relative overflow-hidden">
                    <div className="absolute inset-0.5 rounded-full bg-zinc-950/40" />
                    <span className="relative z-10">{member.initials}</span>
                  </div>
                )}
              </div>

              {/* Name & Role */}
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                {member.name}
              </h3>
              <span className={`inline-block mt-3 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border shadow-[0_0_10px_rgba(99,102,241,0.2)] ${
                member.role.toUpperCase().includes("LEAD")
                  ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                  : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
              }`}>
                {member.role}
              </span>

              {/* Bio */}
              <p className="text-xs text-zinc-400 mt-4 leading-relaxed line-clamp-3">
                {member.bio}
              </p>

              {/* Social Connections */}
              <div className="mt-6 pt-4 border-t border-zinc-900/60 w-full flex items-center justify-center gap-4 text-zinc-500">
                {member.links.linkedin && (
                  <a
                    href={member.links.linkedin.startsWith("http") ? member.links.linkedin : `https://linkedin.com/in/${member.links.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.links.github && (
                  <a
                    href={`https://github.com/${member.links.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {(member.links.instagram || member.links.twitter) && (
                  <a
                    href={
                      (member.links.instagram || member.links.twitter)?.startsWith("http")
                        ? (member.links.instagram || member.links.twitter)
                        : `https://instagram.com/${member.links.instagram || member.links.twitter}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>


      </main>

      <Footer />
    </div>
  );
}
