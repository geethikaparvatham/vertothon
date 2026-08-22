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
      links: {
        linkedin: "https://www.linkedin.com/in/tagarampudi-issaku-7017a3374/",
        github: "https://github.com/tagarampudiissaku55-ops",
        instagram: "https://www.instagram.com/_issaku_tagarampudi"
      },
    },
    {
      name: "MUTHINA ABHILASH",
      role: "TEAM CO-LEAD",
      initials: "MA",
      image: "/team_abhilash.jpg",
      color: "from-blue-400 to-indigo-600",
      glow: "shadow-blue-500/10 hover:border-zinc-800",
      bio: "Handles premium frontend UI elements, page configurations, and responsive micro-animations.",
      links: {
        linkedin: "https://www.linkedin.com/in/muthina-abhilash-9b1838356",
        github: "https://github.com/muthinaabhilash-creator",
        instagram: "https://instagram.com/abhilash_muthina/"
      },
    },
    {
      name: "PARVATHAM GEETHIKA",
      role: "TECH LEAD",
      initials: "PG",
      image: "/team_geethika.jpg",
      color: "from-pink-500 to-rose-600",
      glow: "shadow-pink-500/10 hover:border-zinc-800",
      bio: "Creates user experience mockups for workspaces, project slides, and certificate credentials.",
      links: {
        linkedin: "https://www.linkedin.com/in/geethika-parvatham-a6a96b372",
        github: "https://github.com/geethikaparvatham",
        instagram: "https://www.instagram.com/geethika_parvatham_838?utm_source=qr&igsi=dW45ZzVobzZxc2k4"
      },
    },
    {
      name: "KUSHAL SUTTARAI",
      role: "CREATIVE LEAD",
      initials: "KS",
      image: "/team_kushal.jpg",
      color: "from-amber-500 to-orange-600",
      glow: "shadow-amber-500/10 hover:border-zinc-800",
      bio: "Supervises automated cloud build workflows, static routing parameters, and performance audits.",
      links: {
        linkedin: "https://www.linkedin.com/in/kushal-suttarai-433573371",
        github: "https://github.com/koushikkushal3-ship-it",
        instagram: "https://www.instagram.com/kushals.co"
      },
    },
    {
      name: "RAMIREDDY JOEL",
      role: "DIGITAL LEAD",
      initials: "RJ",
      image: "/team_joel.jpg",
      color: "from-emerald-500 to-teal-600",
      glow: "shadow-emerald-500/10 hover:border-zinc-800",
      bio: "Structures backend provider contexts, checker simulator logs, and evaluation metrics models.",
      links: {
        linkedin: "https://www.linkedin.com/in/joel-ramireddy-5a6800371",
        github: "https://github.com/JoelAstro",
        instagram: "https://www.instagram.com/r.joelofficial85/"
      },
    },
    {
      name: "KATTA CHARAN RAJ",
      role: "CONTENT LEAD",
      initials: "KC",
      image: "/team_charan.jpg",
      color: "from-red-500 to-orange-600",
      glow: "shadow-red-500/10 hover:border-zinc-800",
      bio: "Manages platform security configurations, encrypted audit timeline trails, and registration keys.",
      links: {
        linkedin: "https://www.linkedin.com/in/k-attacharanraj",
        github: "https://github.com/charan123-12",
        instagram: "https://www.instagram.com/charannn.evolves"
      },
    },
    {
      name: "VARSHITH",
      role: "OPERATIONS LEAD",
      initials: "V",
      image: "/team_varshith.jpg",
      color: "from-teal-500 to-emerald-600",
      glow: "shadow-teal-500/10 hover:border-zinc-800",
      bio: "Supports physical venue logistics, setup check simulators, and volunteer operations.",
      links: {
        linkedin: "https://www.linkedin.com/in/varshith-tech",
        github: "https://github.com/varshith",
        instagram: "https://www.instagram.com/varshith_tech"
      },
    },
    {
      name: "MARADANA VAMSI MOHAN",
      role: "OPERATIONS LEAD",
      initials: "MV",
      image: "/team_vamsi_mohan.jpg",
      color: "from-pink-500 to-indigo-500",
      glow: "shadow-pink-500/10 hover:border-zinc-800",
      bio: "Coordinates community communications, social announcements, and press media updates.",
      links: {
        linkedin: "https://www.linkedin.com/in/maradana-vamsi-mohan-341b21404/",
        github: "https://github.com/maradanavamsi2007-cmd",
        instagram: "https://www.instagram.com/_vamsi_2684/"
      },
    },
    {
      name: "KARTHIK NIMMANAGOTI",
      role: "CONTENT LEAD",
      initials: "KN",
      image: "/team_karthik_nimmanagoti.jpg",
      color: "from-violet-500 to-blue-500",
      glow: "shadow-violet-500/10 hover:border-zinc-800",
      bio: "Moderates submitted projects links, evaluates codes parameters, and filters spam.",
      links: {
        linkedin: "https://www.linkedin.com/in/karthik-nimmanagoti-52a403324",
        github: "https://github.com/NIMMANAGOTI777",
        instagram: "https://www.instagram.com/nimmanagoti.karthik"
      },
    },
    {
      name: "PEDADA KARTHIK",
      role: "COORDINATOR LEAD",
      initials: "PK",
      image: "/team_karthik_pedada.jpg",
      color: "from-cyan-500 to-teal-600",
      glow: "shadow-cyan-500/10 hover:border-zinc-800",
      bio: "Manages portal chat channels, credentials support tickets, and role switching.",
      links: {
        linkedin: "https://www.linkedin.com/in/karthik-pedada-862592368",
        github: "",
        instagram: "https://www.instagram.com/son_of_srinivas___"
      },
    },
    {
      name: "MOHAMMAD AYAZ AHMED",
      role: "TECH TEAM",
      initials: "MA",
      image: "/team_ayaz.jpg",
      color: "from-cyan-500 to-blue-600",
      glow: "shadow-cyan-500/10 hover:border-zinc-800",
      bio: "Maintains portal feature consoles, schedule updates, and organizers database entries.",
      links: {
        linkedin: "https://www.linkedin.com/in/mohammad-ayaz-ahmed-45a573371",
        github: "https://github.com/ayazahmed",
        instagram: ""
      },
    },
    {
      name: "CHADA VARSHINI",
      role: "TECH TEAM",
      initials: "CV",
      image: "/team_varshini.jpg",
      color: "from-purple-500 to-pink-500",
      glow: "shadow-purple-500/10 hover:border-zinc-800",
      bio: "Manages participant coordination, verification badges, and event registry records.",
      links: {
        linkedin: "https://www.linkedin.com/in/varshini-chada-799913372/",
        github: "https://github.com/varshinichada2007-coder",
        instagram: "https://www.instagram.com/varshini_chada"
      },
    },
    {
      name: "SHAIK ASIF HUSSAIN",
      role: "TECH TEAM",
      initials: "SA",
      image: "/team_asif.jpg",
      color: "from-yellow-500 to-amber-600",
      glow: "shadow-yellow-500/10 hover:border-zinc-800",
      bio: "Structures documentation briefs, technical guides, and problem statements schedules.",
      links: {
        linkedin: "https://www.linkedin.com/in/shaik-asif-hussain",
        github: "https://github.com/asifhussainsk53-prog",
        instagram: ""
      },
    },
    {
      name: "VEDULA SAI SARANVI",
      role: "EVENT HOST",
      initials: "VS",
      image: "/team_saranvi.jpg",
      color: "from-rose-500 to-purple-600",
      glow: "shadow-rose-500/10 hover:border-zinc-800",
      bio: "Directs developer relations operations, onboarding schedules, and resource docs.",
      links: {
        linkedin: "https://www.linkedin.com/in/vedula-saranvi-16b304374/",
        github: "https://github.com/SaiSaranvi",
        instagram: "https://www.instagram.com/__.saranvi.__/"
      },
    },
    {
      name: "UPPU RISHI KUMAR",
      role: "EVENT HOST",
      initials: "UR",
      image: "/team_rishi_kumar.jpg",
      color: "from-fuchsia-500 to-pink-600",
      glow: "shadow-fuchsia-500/10 hover:border-zinc-800",
      bio: "Develops portal graphics, custom SVG brand badges, and responsive sidebar logos.",
      links: {
        linkedin: "https://www.linkedin.com/in/rishikumaruppu/",
        github: "https://github.com/uppurishikumar-creator",
        instagram: "https://www.instagram.com/rishi_kumar_uppu/"
      },
    },
    {
      name: "SANAPALA TRISHANK",
      role: "EVENT TEAM",
      initials: "ST",
      image: "/team_trishank.jpg",
      color: "from-indigo-650 to-violet-700",
      glow: "shadow-indigo-500/10 hover:border-zinc-800",
      bio: "Facilitates campus chapter outreach, student group signups, and local events promotion.",
      links: {
        linkedin: "https://www.linkedin.com/in/trishank-sanapala-89171a374",
        github: "https://github.com/trishanksanapala72-cyber",
        instagram: "https://www.instagram.com/_crazy_trishank_947"
      },
    },
    {
      name: "UDAI KIRAN",
      role: "EVENT TEAM",
      initials: "UK",
      image: "/team_udai.jpg",
      color: "from-blue-600 to-indigo-700",
      glow: "shadow-blue-500/10 hover:border-zinc-800",
      bio: "Coordinates sponsor tracks criteria, partner benefits, and logo banners updates.",
      links: {
        linkedin: "https://www.linkedin.com/in/uday-kiran-981733421",
        github: "",
        instagram: "https://www.instagram.com/itzzkiran__13"
      },
    },
    {
      name: "ADIMULAM VIJAY KUMAR",
      role: "EVENT TEAM",
      initials: "AV",
      image: "/team_vijay_kumar.jpg",
      color: "from-emerald-500 to-green-600",
      glow: "shadow-emerald-500/10 hover:border-zinc-800",
      bio: "Analyzes system metrics logs, database outputs, and event rosters telemetry.",
      links: {
        linkedin: "https://www.linkedin.com/in/adimulam-vijay-kumar-11039b3a1",
        github: "https://github.com/adimulamvijaykumar1-cloud",
        instagram: "https://www.instagram.com/vinnu_vijay_143"
      },
    },
    {
      name: "BAKKATHALA SHIVA",
      role: "EVENT TEAM",
      initials: "BS",
      image: "/team_shiva.jpg",
      color: "from-sky-500 to-cyan-600",
      glow: "shadow-sky-500/10 hover:border-zinc-800",
      bio: "Configures static page optimization bundles and routing parameters boundaries.",
      links: {
        linkedin: "https://www.linkedin.com/in/bakkathatla-shiva-530745364",
        github: "https://github.com/bakkathatlashiva",
        instagram: ""
      },
    },
    {
      name: "HARSHA",
      role: "EVENT TEAM",
      initials: "H",
      image: "/team_harsha.jpg",
      color: "from-orange-500 to-red-600",
      glow: "shadow-orange-500/10 hover:border-zinc-800",
      bio: "Assists on-ground volunteer rosters scheduling, entry check-in, and info desks.",
      links: {
        linkedin: "https://www.linkedin.com/in/harsha-praneeth-446b1736b",
        github: "https://github.com/Harsha6319",
        instagram: "https://www.instagram.com/harsha_praneeth_"
      },
    },
    {
      name: "YENISHETTY SAI VARUN",
      role: "EVENT TEAM",
      initials: "YS",
      image: "/team_sai_varun.jpg",
      color: "from-teal-500 to-indigo-650",
      glow: "shadow-teal-500/10 hover:border-zinc-800",
      bio: "Helps teams setting up hardware frameworks, IoT interfaces, and mock sensors.",
      links: {
        linkedin: "https://www.linkedin.com/in/yenishetty-sai-varun-8864303a0/",
        github: "https://github.com/saivarunyenishetty13-coder",
        instagram: ""
      },
    },
    {
      name: "RIZWANA LALAMMAGARI",
      role: "EVENT TEAM",
      initials: "RL",
      image: "/team_rizwana.jpg",
      color: "from-purple-500 to-rose-600",
      glow: "shadow-purple-500/10 hover:border-zinc-800",
      bio: "Drives university marketing campaigns and helps onboarding new student chapters.",
      links: {
        linkedin: "https://www.linkedin.com/in/rizwana-lalammagari-42b157396",
        github: "https://github.com/rizwana-15-ux",
        instagram: ""
      },
    },
  ];

  const formatLink = (url?: string, prefix: string = "") => {
    if (!url || url.trim() === "" || url.trim() === "-----") return "";
    let clean = url.trim();
    if (clean.startsWith("http://") || clean.startsWith("https://")) return clean;
    if (clean.startsWith("www.") || clean.includes(".com")) return `https://${clean}`;
    return `${prefix}${clean}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans relative overflow-hidden">
      <Header />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">Team & Leadership</span>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            Meet The Vertothon Council
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full mt-4 mb-6" />
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            The core organizers, technical leads, operations managers, and coordinators driving the Vertothon community and hackathon ecosystem forward.
          </p>
        </div>

        {/* Featured First Card - TEAM LEAD */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="glass-card p-8 rounded-3xl border-2 border-indigo-500/50 bg-zinc-950/90 shadow-2xl shadow-indigo-500/20 relative overflow-hidden flex flex-col items-center text-center group">
            {/* Top-right corner badge */}
            <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-[10px] font-black uppercase tracking-widest text-white shadow-md shadow-indigo-500/25">
              TEAM LEAD
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Avatar */}
            <div className={`h-28 w-28 rounded-full bg-gradient-to-br ${teamMembers[0].color} p-1 shadow-xl relative overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}>
              {teamMembers[0].image ? (
                <img
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  className="object-cover object-top h-full w-full rounded-full"
                />
              ) : (
                <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center font-bold text-2xl text-white">
                  {teamMembers[0].initials}
                </div>
              )}
            </div>

            <h3 className="text-2xl font-black text-white tracking-wide uppercase">
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
            <div className="mt-8 pt-4 border-t border-zinc-900/60 w-full flex items-center justify-center gap-5 text-zinc-400">
              {formatLink(teamMembers[0].links.linkedin, "https://linkedin.com/in/") && (
                <a
                  href={formatLink(teamMembers[0].links.linkedin, "https://linkedin.com/in/")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-1"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {formatLink(teamMembers[0].links.github, "https://github.com/") && (
                <a
                  href={formatLink(teamMembers[0].links.github, "https://github.com/")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-1"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {formatLink(teamMembers[0].links.instagram, "https://instagram.com/") && (
                <a
                  href={formatLink(teamMembers[0].links.instagram, "https://instagram.com/")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-1"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Council Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.slice(1).map((member, idx) => {
            const linkedinUrl = formatLink(member.links.linkedin, "https://linkedin.com/in/");
            const githubUrl = formatLink(member.links.github, "https://github.com/");
            const instagramUrl = formatLink(member.links.instagram, "https://instagram.com/");

            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-3xl border border-zinc-900 bg-zinc-950/80 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:border-zinc-800 group relative overflow-hidden"
              >
                {/* Avatar */}
                <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${member.color} p-0.5 shadow-md relative overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}>
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

                <h3 className="text-base font-bold text-white tracking-wide uppercase">
                  {member.name}
                </h3>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border ${
                  member.role.toUpperCase().includes("LEAD")
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                    : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                }`}>
                  {member.role}
                </span>

                {/* Bio */}
                <p className="text-xs text-zinc-400 mt-4 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>

                {/* Social Connections */}
                <div className="mt-auto pt-6 w-full flex items-center justify-center gap-4 text-zinc-500">
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors p-1"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors p-1"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors p-1"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
