"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";
import { Bell, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";

export default function EventsDiscoveryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans relative overflow-hidden">
      <Header />
      <NetworkBackground />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-20">
          
          {/* Left Side: Official Vertothon Poster */}
          <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center flex-shrink-0 group">
            {/* Poster Frame */}
            <div className="w-full rounded-3xl p-2 bg-gradient-to-b from-indigo-500/30 via-zinc-800 to-zinc-900 shadow-2xl shadow-indigo-500/20 border border-indigo-500/30 overflow-hidden group-hover:scale-[1.02] transition-all duration-300">
              <img
                src="/vertothon_poster.jpg"
                alt="Vertothon Official Hackathon Poster"
                className="w-full h-auto object-cover rounded-2xl shadow-inner"
              />
            </div>

            {/* Registrations are opening soon message banner underneath */}
            <div className="mt-6 w-full p-4 sm:p-5 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide uppercase text-center animate-pulse-glow flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/5">
              <Bell className="w-4 h-4 text-indigo-400 animate-bounce" />
              <span>Registrations are opening soon...</span>
            </div>
          </div>

          {/* Right Side: Event Details / Matter */}
          <div className="w-full max-w-lg lg:max-w-xl text-center lg:text-left flex flex-col gap-6 lg:pt-8">
             <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
               <Sparkles className="w-4 h-4" />
               <span>Upcoming Hackathon</span>
             </div>
             
             <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
               The Next Generation <br className="hidden lg:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Hackathon</span>
             </h1>
             
             <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-orange-500 mx-auto lg:mx-0 rounded-full my-2"></div>

             <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
               <strong className="text-white">Vertothon</strong> is a high-fidelity hackathon bringing together the brightest minds, ambitious developers, and creative innovators to build solutions that matter. 
             </p>
             <p className="text-zinc-400 text-sm leading-relaxed">
               Join hundreds of students and tech enthusiasts to collaborate, network, and push the boundaries of technology. Whether you're a seasoned developer or a beginner, Vertothon is your platform to code, innovate, and make an impact on regional and global tech ecosystems.
             </p>

             <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
               <Link 
                 href="https://whatsapp.com/channel/0029VbDMgyN7dmeZnWSJBp3E" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-8 py-3.5 rounded-xl bg-white text-black font-bold uppercase tracking-wide text-xs hover:bg-zinc-200 transition-all shadow-lg w-full sm:w-auto text-center hover:scale-105 active:scale-95 duration-200"
               >
                 Join WhatsApp Channel
               </Link>
               <Link 
                 href="/contact" 
                 className="px-8 py-3.5 rounded-xl bg-zinc-900 text-white font-bold uppercase tracking-wide text-xs border border-zinc-800 hover:bg-zinc-800 transition-all shadow-lg w-full sm:w-auto text-center hover:scale-105 active:scale-95 duration-200"
               >
                 Partner With Us
               </Link>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
