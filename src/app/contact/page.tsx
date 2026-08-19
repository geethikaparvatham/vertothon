"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate inquiry logging
    const storedLogs = localStorage.getItem("vertofi_audit_logs");
    const logs = storedLogs ? JSON.parse(storedLogs) : [];
    logs.unshift({
      id: Math.random().toString(36).substring(7),
      user_id: "anonymous",
      action: `Inquiry submitted by ${name} (${email})`,
      details: { name, email, message },
      created_at: new Date().toISOString(),
    });
    localStorage.setItem("vertofi_audit_logs", JSON.stringify(logs));

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans">
      <Header />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Connect with Us</span>
          <h1 className="text-4xl font-extrabold text-white mt-2 uppercase tracking-tight">
            Contact Vertofi Community
          </h1>
          <div className="h-1 w-20 bg-indigo-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Info Column */}
          <div className="flex flex-col gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-900/80">
              <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact Channels</h2>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block">Email Channel</span>
                    <span className="text-sm font-medium text-zinc-300">hello@vertofi.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-indigo-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold block">Community Base</span>
                    <span className="text-sm font-medium text-zinc-300">Bengaluru, Karnataka, India</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              We aim to reply to general community queries and institutional sponsorship partnerships within 48 business hours.
            </p>
          </div>

          {/* Form Column */}
          <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-900/80">
            <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Send a Message</h2>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center gap-3">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Message Received!</h4>
                <p className="text-xs text-zinc-400">Thank you for writing. Our community organizers will review your message shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider"
                >
                  Submit another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact_name" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    id="contact_name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 placeholder-zinc-600"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact_email" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    id="contact_email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 placeholder-zinc-600"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact_message" className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="contact_message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 placeholder-zinc-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 mt-2 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg hover:shadow-indigo-500/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
