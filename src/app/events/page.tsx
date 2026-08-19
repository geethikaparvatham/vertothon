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
          
          {/* Left Side: Flyer Card */}
          <div className="w-full max-w-xs flex flex-col items-center flex-shrink-0">
            {/* Main Flyer Card */}
            <div className="w-full bg-gradient-to-b from-white to-zinc-100 text-zinc-950 rounded-3xl px-6 py-4 shadow-2xl border border-zinc-200 relative overflow-hidden flex flex-col items-center text-center">
              {/* Tech Grid Trace Overlays */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]" />
              <div className="absolute -top-40 -right-40 h-80 w-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Logo at the top */}
              <Logo showText={true} showTagline={false} size={40} lightTheme={true} className="flex-col mb-3" />

              {/* Separator code tag */}
              <div className="relative z-10 text-zinc-400 font-mono text-xs tracking-wider mb-3 flex items-center gap-2">
                <span className="h-[1px] w-8 bg-zinc-300" />
                <span>&lt;/&gt;</span>
                <span className="h-[1px] w-8 bg-zinc-300" />
              </div>

              {/* VERTOTHON */}
              <div className="relative z-10 mb-1">
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none uppercase font-sans">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-indigo-950">VERTO</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600">THON</span>
                </h2>
              </div>

              {/* Tagline */}
              <p className="relative z-10 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-4 flex items-center justify-center gap-2 w-full">
                <span>CODE</span>
                <span className="text-rose-500 font-black">•</span>
                <span>INNOVATE</span>
                <span className="text-indigo-500 font-black">•</span>
                <span>IMPACT</span>
              </p>

              {/* COMING SOON BANNER */}
              <div className="relative z-10 w-full mb-4">
                <div className="bg-zinc-950 text-white py-2 px-6 rounded-xl font-black text-xl sm:text-2xl uppercase tracking-widest shadow-lg inline-block border-l-4 border-r-4 border-indigo-500 transform -rotate-1 skew-x-3 select-none">
                  COMING SOON
                </div>
              </div>

              {/* STAY TUNED */}
              <div className="relative z-10 mb-3">
                <p className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase">For More Details</p>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="h-[1px] w-6 bg-blue-500" />
                  <h3 className="text-base sm:text-lg font-black tracking-widest text-zinc-900 uppercase">Stay Tuned!</h3>
                  <span className="h-[1px] w-6 bg-orange-500" />
                </div>
              </div>

              {/* Bottom code tag */}
              <div className="relative z-10 font-mono text-base font-bold mb-2 flex items-center justify-center">
                <span className="text-blue-500">&lt;</span>
                <span className="text-orange-500">/</span>
                <span className="text-rose-500">&gt;</span>
              </div>
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
