"use client";

import React, { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppState } from "@/context/StateContext";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Users,
  Compass,
  FileText,
  Clock,
  Award,
  BookOpen,
  Volume2,
  Lock,
  Unlock,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const {
    events,
    tracks,
    problems,
    schedules,
    eventSponsors,
    sponsors,
    eventSpeakers,
    eventMentors,
    users,
    judges,
  } = useAppState();

  // Find event
  const event = events.find((ev) => ev.slug === slug);

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center py-24 text-center px-4">
          <h1 className="text-2xl font-extrabold text-rose-500 uppercase tracking-wide">Event Not Found</h1>
          <p className="text-xs text-zinc-400 mt-2">The event you are looking for doesn't exist or is currently unavailable.</p>
          <Link href="/events" className="mt-6 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 text-white transition-colors">
            Back to Events
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Fetch relations for this event
  const eventTracks = tracks.filter((t) => t.event_id === event.id);
  const eventProblems = problems.filter((p) => p.event_id === event.id);
  const eventSchedules = schedules.filter((s) => s.event_id === event.id);

  // Sponsors
  const activeEventSponsorIds = eventSponsors.filter((es) => es.event_id === event.id);
  const eventSponsorList = activeEventSponsorIds.map((es) => {
    const sp = sponsors.find((s) => s.id === es.sponsor_id);
    return { ...sp, level: es.sponsor_level };
  }).filter((s) => s.id !== undefined);

  // Speakers & Mentors
  const activeSpeakerIds = eventSpeakers.filter((es) => es.event_id === event.id).map((es) => es.speaker_id);
  const eventSpeakerList = users.filter((u) => activeSpeakerIds.includes(u.id));

  const activeMentorIds = eventMentors.filter((em) => em.event_id === event.id).map((em) => em.mentor_id);
  const eventMentorList = users.filter((u) => activeMentorIds.includes(u.id));

  const formattedStartDate = new Date(event.start_date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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

  // Helper to verify if problem statement is revealed
  const isProblemRevealed = (prob: any) => {
    if (prob.status === "revealed") return true;
    if (prob.reveal_date_time) {
      const revealTime = new Date(prob.reveal_date_time).getTime();
      return Date.now() >= revealTime;
    }
    return false;
  };

  const getRevealDateString = (prob: any) => {
    if (!prob.reveal_date_time) return "";
    return new Date(prob.reveal_date_time).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans">
      <Header />

      {/* Hero */}
      <section className="relative py-20 border-b border-zinc-900 bg-gradient-to-b from-indigo-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Header info */}
            <div className="lg:col-span-2">
              <span className={`inline-flex px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getEventBadgeColor(event.type)} mb-4`}>
                {event.type}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-none">
                {event.title}
              </h1>
              <p className="text-base text-zinc-400 mt-4 max-w-xl leading-relaxed">
                {event.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mt-8 text-xs text-zinc-400 border-t border-zinc-900 pt-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <div>
                    <p className="font-semibold text-zinc-300">Date & Time</p>
                    <p className="font-mono mt-0.5">{formattedStartDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <div>
                    <p className="font-semibold text-zinc-300">Venue</p>
                    <p className="mt-0.5">{event.venue} ({event.location})</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="glass-card p-6 rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Registration Status</span>
                {event.status === "open" || event.status === "published" ? (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 uppercase">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    Accepting Applications
                  </span>
                ) : event.status === "ongoing" ? (
                  <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5 uppercase">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    Event Live Now
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1.5 uppercase">
                    Closed
                  </span>
                )}
                <p className="text-[11px] text-zinc-500 mt-4 leading-relaxed">
                  Vertofi processes event communications, developer collaborations, submissions, and credentials. The actual registration data is managed externally by the organizer.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                {event.reg_cta_enabled && (
                  event.external_reg_url ? (
                    <a
                      href={event.external_reg_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full py-3.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors shadow-lg hover:shadow-indigo-500/10"
                    >
                      {event.reg_cta_label}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex items-center justify-center gap-1.5 w-full py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                    >
                      {event.reg_cta_label}
                    </button>
                  )
                )}
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Join Teams / Submit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Quick links Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-2">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Event Directory</h4>
              <a href="#about" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1 flex items-center justify-between group">
                About Event
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              {event.type === "hackathon" && eventTracks.length > 0 && (
                <a href="#tracks" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1 flex items-center justify-between group">
                  Tracks
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              {event.type === "hackathon" && eventProblems.length > 0 && (
                <a href="#problems" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1 flex items-center justify-between group">
                  Problem Statements
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              {eventSpeakerList.length > 0 && (
                <a href="#speakers" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1 flex items-center justify-between group">
                  Speakers
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              {eventMentorList.length > 0 && (
                <a href="#mentors" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1 flex items-center justify-between group">
                  Mentors
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              {eventSchedules.length > 0 && (
                <a href="#schedule" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1 flex items-center justify-between group">
                  Schedule
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              {eventSponsorList.length > 0 && (
                <a href="#sponsors" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1 flex items-center justify-between group">
                  Sponsors
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
          </div>

          {/* Sections List */}
          <div className="lg:col-span-3 flex flex-col gap-16">
            {/* About */}
            <div id="about" className="scroll-mt-24 border-b border-zinc-900 pb-12">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                About the Event
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            {/* Tracks */}
            {event.type === "hackathon" && eventTracks.length > 0 && (
              <div id="tracks" className="scroll-mt-24 border-b border-zinc-900 pb-12">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-400" />
                  Hackathon Tracks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {eventTracks.map((trk, idx) => (
                    <div key={trk.id} className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col">
                      <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest mb-2">
                        Track 0{idx + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-white mb-2">{trk.name}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">{trk.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problem Statements */}
            {event.type === "hackathon" && eventProblems.length > 0 && (
              <div id="problems" className="scroll-mt-24 border-b border-zinc-900 pb-12">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  Problem Statements
                </h3>
                <div className="flex flex-col gap-6">
                  {eventProblems.map((prob) => {
                    const revealed = isProblemRevealed(prob);
                    const trackName = eventTracks.find((t) => t.id === prob.track_id)?.name || "General Track";

                    return (
                      <div
                        key={prob.id}
                        className={`p-6 rounded-2xl border ${
                          revealed
                            ? "bg-zinc-900/20 border-zinc-900 hover:border-zinc-800"
                            : "bg-zinc-950/40 border-zinc-900/80 border-dashed"
                        } transition-all`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-bold text-zinc-400 uppercase tracking-wider">
                              {trackName}
                            </span>
                          </div>

                          {revealed ? (
                            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                              <Unlock className="w-3 h-3" />
                              PROBLEM REVEALED
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1 uppercase tracking-wider">
                              <Lock className="w-3 h-3" />
                              PROBLEM STATEMENT LOCKED
                            </span>
                          )}
                        </div>

                        {revealed ? (
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">{prob.title}</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed mb-4">{prob.description}</p>
                            {prob.requirements && (
                              <div className="text-[11px] text-zinc-500 bg-zinc-900/40 p-3 rounded-lg border border-zinc-900/80 mb-2">
                                <span className="font-bold text-zinc-400 block mb-1">REQUIREMENTS:</span>
                                {prob.requirements}
                              </div>
                            )}
                            {prob.constraints && (
                              <p className="text-[10px] text-zinc-500 mt-2">
                                <span className="font-bold text-zinc-400">CONSTRAINTS: </span>
                                {prob.constraints}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-xs font-semibold text-zinc-400">PROBLEM DETAILS LOCKED BEFORE THE EVENT</p>
                            {prob.reveal_date_time && (
                              <p className="text-[10px] text-zinc-500 mt-1">
                                Will unlock automatically on <span className="text-indigo-400 font-mono">{getRevealDateString(prob)}</span>
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Speakers */}
            {eventSpeakerList.length > 0 && (
              <div id="speakers" className="scroll-mt-24 border-b border-zinc-900 pb-12">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  Featured Speakers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {eventSpeakerList.map((sp) => (
                    <div key={sp.id} className="p-4 rounded-xl bg-zinc-900/20 border border-zinc-900 text-center">
                      <div className="h-12 w-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white mx-auto mb-3">
                        {sp.name.substring(0, 2).toUpperCase()}
                      </div>
                      <h4 className="text-xs font-bold text-white">{sp.name}</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wider">Speaker</p>
                      {sp.bio && <p className="text-[10px] text-zinc-400 mt-2 line-clamp-2">{sp.bio}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mentors */}
            {eventMentorList.length > 0 && (
              <div id="mentors" className="scroll-mt-24 border-b border-zinc-900 pb-12">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  Mentors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {eventMentorList.map((m) => (
                    <div key={m.id} className="p-4 rounded-xl bg-zinc-900/20 border border-zinc-900 text-center">
                      <div className="h-12 w-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white mx-auto mb-3">
                        {m.name.substring(0, 2).toUpperCase()}
                      </div>
                      <h4 className="text-xs font-bold text-white">{m.name}</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wider">Mentor</p>
                      {m.bio && <p className="text-[10px] text-zinc-400 mt-2 line-clamp-2">{m.bio}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule */}
            {eventSchedules.length > 0 && (
              <div id="schedule" className="scroll-mt-24 border-b border-zinc-900 pb-12">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  Timeline Schedule
                </h3>
                <div className="flex flex-col border-l border-zinc-900 pl-4 gap-6 ml-2">
                  {eventSchedules.map((sch) => {
                    const start = new Date(sch.start_time).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const end = sch.end_time
                      ? " - " +
                        new Date(sch.end_time).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "";

                    return (
                      <div key={sch.id} className="relative">
                        {/* Dot indicator */}
                        <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-[#030303]" />
                        <span className="text-[10px] font-bold font-mono text-indigo-400 block uppercase tracking-wide">
                          {start} {end}
                        </span>
                        <h4 className="text-sm font-semibold text-white mt-1 leading-tight">{sch.title}</h4>
                        {sch.description && (
                          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                            {sch.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sponsors */}
            {eventSponsorList.length > 0 && (
              <div id="sponsors" className="scroll-mt-24 pb-12">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400" />
                  Sponsors & Partners
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {eventSponsorList.map((sp) => (
                    <div
                      key={sp.id}
                      className="p-6 rounded-xl border border-zinc-900 bg-zinc-950/20 text-center hover:border-zinc-800 transition-colors flex flex-col items-center justify-center"
                    >
                      <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 font-mono block mb-2 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        {sp.level} partner
                      </span>
                      <h4 className="text-sm font-extrabold text-white uppercase tracking-tight">{sp.company}</h4>
                      {sp.description && <p className="text-[9px] text-zinc-500 mt-2">{sp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer external register trigger */}
      {event.external_reg_url && event.reg_cta_enabled && (
        <section className="py-20 border-t border-zinc-900 bg-zinc-950/30">
          <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
            <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight mb-2">Join {event.title}</h3>
            <p className="text-xs text-zinc-400 mb-6 max-w-sm">Secure your placement on the official organizer channel before spots fill up.</p>
            <a
              href={event.external_reg_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-lg hover:shadow-indigo-500/10"
            >
              {event.reg_cta_label}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
