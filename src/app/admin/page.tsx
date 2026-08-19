"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/StateContext";
import { Event, Track, ProblemStatement, EventSchedule, Sponsor } from "@/types";
import Logo from "@/components/Logo";
import {
  Shield,
  LayoutDashboard,
  Calendar,
  Users,
  Compass,
  Plus,
  ArrowLeft,
  Settings as SettingsIcon,
  BookOpen,
  Volume2,
  Lock,
  Unlock,
  Clock,
  Award,
  DollarSign,
  FileText,
  Activity,
  Send,
  AlertTriangle,
  QrCode,
  Trophy,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const {
    currentUser,
    events,
    tracks,
    problems,
    users,
    teams,
    teamMembers,
    submissions,
    scores,
    criteria,
    assignments,
    attendance,
    certificates,
    sponsors,
    eventSponsors,
    eventSpeakers,
    eventMentors,
    schedules,
    announcements,
    resources,
    auditLogs,
    addEvent,
    updateEvent,
    deleteEvent,
    addTrack,
    deleteTrack,
    addProblem,
    updateProblem,
    deleteProblem,
    addScheduleItem,
    deleteScheduleItem,
    addAnnouncement,
    bulkGenerateCertificates,
    checkInUser,
    addSponsorToEvent,
  } = useAppState();

  const [activeGlobalTab, setActiveGlobalTab] = useState("overview");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [activeEventTab, setActiveEventTab] = useState("overview");

  // Create Event Form States
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [evTitle, setEvTitle] = useState("");
  const [evSlug, setEvSlug] = useState("");
  const [evType, setEvType] = useState("hackathon");
  const [evDesc, setEvDesc] = useState("");
  const [evStart, setEvStart] = useState("");
  const [evEnd, setEvEnd] = useState("");
  const [evVenue, setEvVenue] = useState("");
  const [evFormat, setEvFormat] = useState("Offline - Bengaluru");
  const [evRegUrl, setEvRegUrl] = useState("");
  const [evRegLabel, setEvRegLabel] = useState("Register Now");
  const [evRegEnabled, setEvRegEnabled] = useState(true);

  // Quick relation helpers
  const [selectedSponsorId, setSelectedSponsorId] = useState("");
  const [sponsorLevel, setSponsorLevel] = useState("gold");

  // Create Track Form States
  const [newTrackName, setNewTrackName] = useState("");
  const [newTrackDesc, setNewTrackDesc] = useState("");

  // Create Problem Form States
  const [newProbTitle, setNewProbTitle] = useState("");
  const [newProbDesc, setNewProbDesc] = useState("");
  const [newProbReq, setNewProbReq] = useState("");
  const [newProbReveal, setNewProbReveal] = useState("");
  const [newProbTrackId, setNewProbTrackId] = useState("");

  // Create Schedule Form States
  const [newSchTitle, setNewSchTitle] = useState("");
  const [newSchDesc, setNewSchDesc] = useState("");
  const [newSchStart, setNewSchStart] = useState("");
  const [newSchEnd, setNewSchEnd] = useState("");

  // Create Announcement Form States
  const [annTitle, setAnnTitle] = useState("");
  const [annMsg, setAnnMsg] = useState("");
  const [annAudience, setAnnAudience] = useState("all");

  // QR Simulation Checkin States
  const [qrProfileId, setQrProfileId] = useState("");

  // Check auth
  if (!currentUser || (currentUser.role !== "super_admin" && currentUser.role !== "organizer")) {
    return (
      <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col items-center justify-center font-sans px-4 text-center">
        <AlertTriangle className="w-12 h-12 text-rose-500 mb-4 animate-bounce" />
        <h1 className="text-xl font-extrabold uppercase tracking-tight text-white">Unauthorized Access</h1>
        <p className="text-xs text-zinc-500 mt-1 max-w-sm">
          Your current session lacks organizer privileges. Toggle user profile to "Aarav Sharma" or "Meera Nair" using the Session Switcher in the bottom right corner.
        </p>
        <Link href="/" className="mt-6 px-4 py-2 text-xs font-semibold uppercase bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // Global Stat aggregates
  const totalEventsCount = events.length;
  const totalUsersCount = users.length;
  const totalTeamsCount = teams.length;
  const totalSubmissionsCount = submissions.length;

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evTitle || !evSlug || !evDesc || !evStart || !evEnd || !evVenue) return;

    addEvent(
      {
        title: evTitle,
        slug: evSlug,
        type: evType as any,
        description: evDesc,
        start_date: new Date(evStart).toISOString(),
        end_date: new Date(evEnd).toISOString(),
        venue: evVenue,
        location: evFormat,
        external_reg_url: evRegUrl || undefined,
        reg_cta_label: evRegLabel,
        reg_cta_enabled: evRegEnabled,
        status: "published",
      },
      { min_team_size: 2, max_team_size: 4 }
    );

    // Reset Form
    setEvTitle("");
    setEvSlug("");
    setEvDesc("");
    setEvStart("");
    setEvEnd("");
    setEvVenue("");
    setEvRegUrl("");
    setShowCreateForm(false);
  };

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !newTrackName) return;
    addTrack(selectedEventId, newTrackName, newTrackDesc);
    setNewTrackName("");
    setNewTrackDesc("");
  };

  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !newProbTitle || !newProbDesc) return;
    addProblem({
      event_id: selectedEventId,
      track_id: newProbTrackId || undefined,
      title: newProbTitle,
      description: newProbDesc,
      requirements: newProbReq || undefined,
      status: newProbReveal ? "scheduled" : "revealed",
      reveal_date_time: newProbReveal ? new Date(newProbReveal).toISOString() : undefined,
    });
    setNewProbTitle("");
    setNewProbDesc("");
    setNewProbReq("");
    setNewProbReveal("");
    setNewProbTrackId("");
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !newSchTitle || !newSchStart || !newSchEnd) return;
    addScheduleItem(
      selectedEventId,
      newSchTitle,
      newSchDesc,
      new Date(newSchStart).toISOString(),
      new Date(newSchEnd).toISOString()
    );
    setNewSchTitle("");
    setNewSchDesc("");
    setNewSchStart("");
    setNewSchEnd("");
  };

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !selectedSponsorId) return;
    addSponsorToEvent(selectedEventId, selectedSponsorId, sponsorLevel);
    setSelectedSponsorId("");
  };

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !annTitle || !annMsg) return;
    addAnnouncement(selectedEventId, annTitle, annMsg, annAudience);
    setAnnTitle("");
    setAnnMsg("");
    alert("Announcements broadcasted to target participants!");
  };

  const handleSimulateCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !qrProfileId) return;
    checkInUser(selectedEventId, qrProfileId, currentUser.id);
    setQrProfileId("");
    alert("Participant QR simulation scan check-in completed!");
  };

  // Compile project leaderboard ranking
  const getLeaderboard = (eventId: string) => {
    const eventTeams = teams.filter((t) => t.event_id === eventId);
    const eventCriteria = criteria.filter((c) => c.event_id === eventId);

    const scoresList = eventTeams.map((team) => {
      const teamAssignments = assignments.filter((a) => a.team_id === team.id);
      let cumulativeScore = 0;
      let reviewCount = 0;

      teamAssignments.forEach((asg) => {
        const asgScores = scores.filter((s) => s.assignment_id === asg.id);
        if (asgScores.length > 0) {
          let scoreSum = 0;
          asgScores.forEach((s) => {
            const crit = eventCriteria.find((c) => c.id === s.criterion_id);
            const weight = crit ? crit.weight_percent : 20;
            scoreSum += (s.score / 10) * weight; // Score normalized to weight
          });
          cumulativeScore += scoreSum;
          reviewCount++;
        }
      });

      const avg = reviewCount > 0 ? cumulativeScore / reviewCount : 0;
      return {
        team,
        avgScore: Math.round(avg),
        reviews: reviewCount,
      };
    }).sort((a, b) => b.avgScore - a.avgScore);

    return scoresList;
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-900 bg-zinc-950/80 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8 justify-center md:justify-start">
          <Logo showText={true} showTagline={false} size={28} />
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-650/20 text-rose-450 border border-rose-500/10 font-mono font-bold uppercase tracking-wider">
            Console
          </span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-900 mb-6 text-center md:text-left">
          <div className="h-10 w-10 rounded-full bg-rose-650 flex items-center justify-center text-xs font-bold text-white mb-2 mx-auto md:mx-0">
            {currentUser.name.substring(0, 2).toUpperCase()}
          </div>
          <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
          <span className="text-[10px] text-rose-400 font-mono tracking-wider font-semibold uppercase block mt-0.5">
            {currentUser.role === "super_admin" ? "Super Admin" : "Event Organizer"}
          </span>
        </div>

        {/* Global tab options */}
        {!selectedEventId ? (
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 mb-6">
            <button
              onClick={() => setActiveGlobalTab("overview")}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all ${
                activeGlobalTab === "overview" ? "bg-rose-600/10 text-rose-450" : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveGlobalTab("events")}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all ${
                activeGlobalTab === "events" ? "bg-rose-600/10 text-rose-450" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Events Manager
            </button>
            <button
              onClick={() => setActiveGlobalTab("audit")}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all ${
                activeGlobalTab === "audit" ? "bg-rose-600/10 text-rose-450" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4" />
              Audit Logs
            </button>
          </nav>
        ) : (
          /* Per-event Admin tabs */
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setSelectedEventId(null)}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white mb-2 uppercase tracking-wide"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Global
            </button>

            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-850 text-center mb-4">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Managing Event</span>
              <h5 className="text-xs font-bold text-white mt-1 uppercase truncate">{selectedEvent?.title}</h5>
            </div>

            <nav className="flex flex-col gap-1">
              {["overview", "settings", "tracks", "problem statements", "schedules", "teams", "attendance", "submissions", "judging", "announcements", "certificates"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveEventTab(tab)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all ${
                    activeEventTab === tab ? "bg-indigo-600/10 text-indigo-400" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        )}

        <div className="mt-auto pt-6 border-t border-zinc-900 flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-wider">
            <Compass className="w-4 h-4" /> Public Site
          </Link>
        </div>
      </aside>

      {/* Main Console */}
      <main className="flex-grow p-6 md:p-10 max-w-4xl mx-auto w-full overflow-y-auto">

        {/* --- GLOBAL: OVERVIEW --- */}
        {!selectedEventId && activeGlobalTab === "overview" && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">Console Overview</h2>
                <p className="text-xs text-zinc-500 mt-1">Global aggregates and system activity logs</p>
              </div>
              <button
                onClick={() => { setSelectedEventId(null); setActiveGlobalTab("events"); setShowCreateForm(true); }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white text-black hover:bg-zinc-200 rounded-xl transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                CREATE EVENT
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Total Events</span>
                <span className="text-2xl font-bold text-white font-mono">{totalEventsCount}</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Total Users</span>
                <span className="text-2xl font-bold text-white font-mono">{totalUsersCount}</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Active Teams</span>
                <span className="text-2xl font-bold text-white font-mono">{totalTeamsCount}</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Submissions</span>
                <span className="text-2xl font-bold text-white font-mono">{totalSubmissionsCount}</span>
              </div>
            </div>

            {/* Recent activities */}
            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-4">Recent Audit Actions</span>
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
                {auditLogs.slice(0, 8).map((log) => (
                  <div key={log.id} className="flex justify-between items-start p-2.5 rounded-lg bg-zinc-950 border border-zinc-900 text-xs">
                    <div className="flex flex-col">
                      <span className="text-zinc-300 font-medium">{log.action}</span>
                      <span className="text-[10px] text-zinc-500 font-mono mt-0.5">Executor: {log.user_id}</span>
                    </div>
                    <span className="text-[9px] text-zinc-650 font-mono shrink-0">{new Date(log.created_at).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- GLOBAL: EVENTS MANAGER --- */}
        {!selectedEventId && activeGlobalTab === "events" && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">Events Database</h2>
                <p className="text-xs text-zinc-500 mt-1">Add, update, or launch modules for Vertofi experiences</p>
              </div>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white text-black hover:bg-zinc-200 rounded-xl transition-all shadow-md"
              >
                {showCreateForm ? "Cancel" : "Create Event"}
              </button>
            </div>

            {/* Create Event Form */}
            {showCreateForm && (
              <form onSubmit={handleCreateEventSubmit} className="glass-card p-6 rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl flex flex-col gap-4">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">New Event Creation Flow</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wide">Event Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Vertothon 2027"
                      value={evTitle}
                      onChange={(e) => setEvTitle(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wide">Url Slug</label>
                    <input
                      type="text"
                      required
                      placeholder="vertothon-2027"
                      value={evSlug}
                      onChange={(e) => setEvSlug(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wide">Event Classification</label>
                    <select
                      value={evType}
                      onChange={(e) => setEvType(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                    >
                      <option value="hackathon">Hackathon</option>
                      <option value="workshop">Workshop</option>
                      <option value="meetup">Meetup</option>
                      <option value="bootcamp">Bootcamp</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wide">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={evStart}
                      onChange={(e) => setEvStart(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wide">End Date & Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={evEnd}
                      onChange={(e) => setEvEnd(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wide">Venue Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Vertofi Hub Campus, Bengaluru"
                      value={evVenue}
                      onChange={(e) => setEvVenue(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wide">Format Mode</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hybrid"
                      value={evFormat}
                      onChange={(e) => setEvFormat(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                    />
                  </div>
                </div>

                {/* External Registration fields */}
                <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-900 flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">External Registration Configuration</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Registration URL</label>
                      <input
                        type="url"
                        placeholder="https://forms.google.com/..."
                        value={evRegUrl}
                        onChange={(e) => setEvRegUrl(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Button Label</label>
                      <input
                        type="text"
                        placeholder="Register Now"
                        value={evRegLabel}
                        onChange={(e) => setEvRegLabel(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-450 uppercase tracking-wide">Long Description</label>
                  <textarea
                    rows={3}
                    required
                    value={evDesc}
                    onChange={(e) => setEvDesc(e.target.value)}
                    placeholder="Provide overview details..."
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
                >
                  Launch & Publish Event Page
                </button>
              </form>
            )}

            {/* List Events */}
            <div className="flex flex-col gap-3">
              {events.map((ev) => (
                <div key={ev.id} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                  <div className="flex flex-col max-w-md">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-850 text-indigo-400 font-mono font-bold uppercase tracking-wider block self-start">
                      {ev.type}
                    </span>
                    <h4 className="text-sm font-bold text-white uppercase mt-1.5 truncate">{ev.title}</h4>
                    <span className="text-[10px] text-zinc-500 mt-0.5 font-mono truncate">{ev.venue}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSelectedEventId(ev.id); setActiveEventTab("overview"); }}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white text-[10px] font-bold uppercase transition-colors"
                    >
                      Manage
                    </button>
                    <button
                      onClick={() => { if (confirm(`Delete event ${ev.title}?`)) deleteEvent(ev.id); }}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-rose-950/20 hover:border-rose-900 hover:text-rose-450 text-zinc-500 text-[10px] font-bold uppercase transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- GLOBAL: AUDIT LOGS --- */}
        {!selectedEventId && activeGlobalTab === "audit" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">System Audit Trail</h2>
              <p className="text-xs text-zinc-500 mt-1">Chronological list of local state modification events</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900">
              <div className="flex flex-col gap-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-xs">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <span className="font-bold text-zinc-300">{log.action}</span>
                      <span className="text-[9px] text-zinc-500 font-mono shrink-0">{new Date(log.created_at).toLocaleString()}</span>
                    </div>
                    <div className="flex gap-4 text-[10px] text-zinc-500 font-mono">
                      <span>Executor ID: {log.user_id}</span>
                      {log.event_id && <span>Event ID: {log.event_id}</span>}
                    </div>
                    {log.details && (
                      <pre className="mt-2 text-[9px] bg-zinc-900 p-2 rounded text-zinc-400 overflow-x-auto border border-zinc-850">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- PER-EVENT TABS MANAGER --- */}
        {selectedEventId && selectedEvent && (
          <div className="flex flex-col gap-8 animate-fade-in">
            {/* Event overview tab */}
            {activeEventTab === "overview" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Event Overview</h3>
                  <p className="text-xs text-zinc-500 mt-1">Live registration statistics and configuration summary</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase block">Associated Teams</span>
                    <span className="text-2xl font-bold text-white font-mono mt-1 block">
                      {teams.filter((t) => t.event_id === selectedEventId).length}
                    </span>
                  </div>
                  <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase block">Project Submissions</span>
                    <span className="text-2xl font-bold text-white font-mono mt-1 block">
                      {submissions.filter((s) => s.event_id === selectedEventId).length}
                    </span>
                  </div>
                  <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase block">Check-ins</span>
                    <span className="text-2xl font-bold text-white font-mono mt-1 block">
                      {attendance.filter((a) => a.event_id === selectedEventId).length}
                    </span>
                  </div>
                </div>

                {/* Event Sponsor bindings */}
                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900">
                  <span className="text-xs font-bold text-zinc-400 uppercase block mb-4">Assign Sponsor Partner</span>
                  <form onSubmit={handleAddSponsor} className="flex gap-3 items-end">
                    <div className="flex-grow flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Sponsor Profile</label>
                      <select
                        required
                        value={selectedSponsorId}
                        onChange={(e) => setSelectedSponsorId(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                      >
                        <option value="">Select Company...</option>
                        {sponsors.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.company}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-grow flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Sponsorship Tier</label>
                      <select
                        value={sponsorLevel}
                        onChange={(e) => setSponsorLevel(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                      >
                        <option value="title">Title Sponsor</option>
                        <option value="gold">Gold</option>
                        <option value="silver">Silver</option>
                        <option value="technology">Tech Partner</option>
                      </select>
                    </div>

                    <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase transition-colors">
                      Bind Sponsor
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Event settings tab */}
            {activeEventTab === "settings" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Event Settings</h3>
                  <p className="text-xs text-zinc-500 mt-1">Configure external registration redirects and limits</p>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">External Registration Link</label>
                    <input
                      type="url"
                      value={selectedEvent.external_reg_url || ""}
                      onChange={(e) => updateEvent(selectedEvent.id, { external_reg_url: e.target.value })}
                      placeholder="https://forms.google.com/..."
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Button Label text</label>
                      <input
                        type="text"
                        value={selectedEvent.reg_cta_label}
                        onChange={(e) => updateEvent(selectedEvent.id, { reg_cta_label: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Event Status</label>
                      <select
                        value={selectedEvent.status}
                        onChange={(e) => updateEvent(selectedEvent.id, { status: e.target.value as any })}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2.5 text-xs text-zinc-300 focus:outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="open">Open (Accepting team-ups)</option>
                        <option value="ongoing">Ongoing (Build live)</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tracks tab */}
            {activeEventTab === "tracks" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Tracks Manager</h3>
                  <p className="text-xs text-zinc-500 mt-1">Set vertical tracks for teams to filter problem statements</p>
                </div>

                {/* Add track form */}
                <form onSubmit={handleAddTrack} className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Track Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Food & Agritech"
                      value={newTrackName}
                      onChange={(e) => setNewTrackName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Track description</label>
                    <textarea
                      rows={2}
                      placeholder="Describe target objectives..."
                      value={newTrackDesc}
                      onChange={(e) => setNewTrackDesc(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none resize-none"
                    />
                  </div>
                  <button type="submit" className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold uppercase tracking-wider self-end px-6">
                    Add Track
                  </button>
                </form>

                {/* List Tracks */}
                <div className="flex flex-col gap-3">
                  {tracks.filter((t) => t.event_id === selectedEventId).map((track) => (
                    <div key={track.id} className="flex justify-between items-center p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-xs">
                      <div>
                        <h4 className="font-bold text-white">{track.name}</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{track.description}</p>
                      </div>
                      <button onClick={() => deleteTrack(track.id)} className="text-[10px] font-bold text-rose-400 hover:text-rose-300 uppercase tracking-wider">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problem statements tab */}
            {activeEventTab === "problem statements" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Problem Statements Briefs</h3>
                  <p className="text-xs text-zinc-500 mt-1">Design track problem statements and configure reveal timers</p>
                </div>

                {/* Add problem statement form */}
                <form onSubmit={handleAddProblem} className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Problem Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Micro-Lending sandboxes"
                        value={newProbTitle}
                        onChange={(e) => setNewProbTitle(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Associated Track</label>
                      <select
                        value={newProbTrackId}
                        onChange={(e) => setNewProbTrackId(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                      >
                        <option value="">Select Track...</option>
                        {tracks.filter((t) => t.event_id === selectedEventId).map((t) => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Long Description Brief</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Explain details of the challenge..."
                      value={newProbDesc}
                      onChange={(e) => setNewProbDesc(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Deliverable Constraints</label>
                      <input
                        type="text"
                        placeholder="e.g. Must run offline without connectivity limits"
                        value={newProbReq}
                        onChange={(e) => setNewProbReq(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Scheduled Reveal Time (UTC)</label>
                      <input
                        type="datetime-local"
                        value={newProbReveal}
                        onChange={(e) => setNewProbReveal(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button type="submit" className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold uppercase tracking-wider self-end px-6">
                    Add Problem Brief
                  </button>
                </form>

                {/* List Problems */}
                <div className="flex flex-col gap-3">
                  {problems.filter((p) => p.event_id === selectedEventId).map((prob) => {
                    const isRevealed = prob.status === "revealed" || (prob.reveal_date_time && Date.now() >= new Date(prob.reveal_date_time).getTime());
                    return (
                      <div key={prob.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-xs">
                        <div className="flex justify-between items-center gap-4 mb-2">
                          <h4 className="font-bold text-white uppercase">{prob.title}</h4>
                          <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${isRevealed ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                            {isRevealed ? "Revealed" : "Locked / Scheduled"}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-relaxed mb-3">{prob.description}</p>
                        <div className="flex gap-3 justify-between items-center border-t border-zinc-900 pt-2 text-[9px] text-zinc-500">
                          {prob.reveal_date_time ? (
                            <span>Release UTC: {new Date(prob.reveal_date_time).toLocaleString()}</span>
                          ) : (
                            <span>Instant Release</span>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateProblem(prob.id, { status: isRevealed ? "locked" : "revealed" })}
                              className="text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider"
                            >
                              Toggle Lock
                            </button>
                            <button onClick={() => deleteProblem(prob.id)} className="text-rose-450 hover:text-rose-400 font-bold uppercase tracking-wider">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Schedules tab */}
            {activeEventTab === "schedules" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Timeline Schedule</h3>
                  <p className="text-xs text-zinc-500 mt-1">Add session markers to event landing timelines</p>
                </div>

                {/* Add schedule form */}
                <form onSubmit={handleAddSchedule} className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Marker Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Build Sprint - Phase 1"
                        value={newSchTitle}
                        onChange={(e) => setNewSchTitle(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Start time</label>
                      <input
                        type="datetime-local"
                        required
                        value={newSchStart}
                        onChange={(e) => setNewSchStart(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Marker Description</label>
                      <input
                        type="text"
                        placeholder="Short explanation..."
                        value={newSchDesc}
                        onChange={(e) => setNewSchDesc(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">End time</label>
                      <input
                        type="datetime-local"
                        required
                        value={newSchEnd}
                        onChange={(e) => setNewSchEnd(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button type="submit" className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold uppercase tracking-wider self-end px-6">
                    Add Schedule Item
                  </button>
                </form>

                {/* List Schedules */}
                <div className="flex flex-col gap-3">
                  {schedules.filter((s) => s.event_id === selectedEventId).map((sch) => (
                    <div key={sch.id} className="flex justify-between items-center p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-xs">
                      <div>
                        <span className="text-[9px] font-mono text-indigo-400 font-bold block">
                          {new Date(sch.start_time).toLocaleTimeString()} - {new Date(sch.end_time).toLocaleTimeString()}
                        </span>
                        <h4 className="font-bold text-white mt-1">{sch.title}</h4>
                      </div>
                      <button onClick={() => deleteScheduleItem(sch.id)} className="text-[10px] font-bold text-rose-450 hover:text-rose-400 uppercase tracking-wider">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teams tab */}
            {activeEventTab === "teams" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Active Teams</h3>
                  <p className="text-xs text-zinc-500 mt-1">Review active rosters and assigned project tracks</p>
                </div>

                <div className="flex flex-col gap-3">
                  {teams.filter((t) => t.event_id === selectedEventId).map((team) => {
                    const leader = users.find((u) => u.id === team.leader_id);
                    const membersCount = teamMembers.filter((m) => m.team_id === team.id && m.status === "accepted").length;
                    return (
                      <div key={team.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-xs flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-white uppercase">{team.name}</h4>
                          <span className="text-[10px] text-zinc-500 mt-1 block">Leader: {leader?.name} ({leader?.email})</span>
                          <span className="text-[10px] text-indigo-400 mt-1 block font-mono">Teammates: {membersCount} active</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Attendance tab */}
            {activeEventTab === "attendance" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Attendance Console</h3>
                  <p className="text-xs text-zinc-500 mt-1">Simulate QR scan badges or verify check-in logs</p>
                </div>

                {/* Simulate checkin form */}
                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900">
                  <span className="text-xs font-bold text-zinc-400 uppercase block mb-4 flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-indigo-400" /> Simulated QR Scanner
                  </span>
                  
                  <form onSubmit={handleSimulateCheckIn} className="flex gap-3 items-end">
                    <div className="flex-grow flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Target Participant Profile</label>
                      <select
                        required
                        value={qrProfileId}
                        onChange={(e) => setQrProfileId(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none"
                      >
                        <option value="">Select User badge...</option>
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name} ({u.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    <button type="submit" className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase transition-colors whitespace-nowrap">
                      Scan QR Code
                    </button>
                  </form>
                </div>

                {/* Checked in List */}
                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-4">Checked In Logs</span>
                  <div className="flex flex-col gap-2">
                    {attendance.filter((a) => a.event_id === selectedEventId).map((att) => {
                      const profile = users.find((u) => u.id === att.profile_id);
                      return (
                        <div key={att.id} className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-950 border border-zinc-900 text-xs">
                          <div>
                            <span className="font-bold text-zinc-200">{profile?.name}</span>
                            <span className="text-[9px] text-zinc-500 ml-2">Checked-in</span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500">{new Date(att.checked_in_at).toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Submissions tab */}
            {activeEventTab === "submissions" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Submitted Deliverables</h3>
                  <p className="text-xs text-zinc-500 mt-1">Review code links and demo coordinates uploaded by teams</p>
                </div>

                <div className="flex flex-col gap-4">
                  {submissions.filter((s) => s.event_id === selectedEventId).map((sub) => {
                    const team = teams.find((t) => t.id === sub.team_id);
                    return (
                      <div key={sub.id} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-900 text-xs flex flex-col gap-3">
                        <div className="flex justify-between items-start border-b border-zinc-900 pb-2.5">
                          <div>
                            <span className="text-[9px] font-mono text-indigo-400 font-bold block">Team: {team?.name}</span>
                            <h4 className="text-sm font-bold text-white mt-1 uppercase">{sub.project_name}</h4>
                          </div>
                          <span className="text-[9px] text-zinc-500 font-mono">{new Date(sub.submitted_at).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-zinc-450 leading-relaxed">{sub.description}</p>
                        <div className="flex gap-3 text-[10px] text-zinc-500 font-mono mt-1">
                          {sub.github_repo && <span className="hover:text-indigo-400">Git: {sub.github_repo}</span>}
                          {sub.live_demo && <span className="hover:text-indigo-400">Demo: {sub.live_demo}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Judging Leaderboards */}
            {activeEventTab === "judging" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-indigo-400 animate-pulse" />
                    Judging Leaderboard
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Automatic real-time rank compiling based on judge score averages</p>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Ranks Leaderboard</span>
                    <button
                      onClick={() => updateEvent(selectedEvent.id, {}, { judging_locked: !selectedEvent.settings?.judging_locked })}
                      className={`px-3 py-1 text-[10px] font-bold uppercase rounded border transition-colors ${
                        selectedEvent.settings?.judging_locked
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400"
                      }`}
                    >
                      {selectedEvent.settings?.judging_locked ? "Unlock Judging" : "Lock Judging"}
                    </button>
                  </div>

                  <div className="flex flex-col gap-3">
                    {getLeaderboard(selectedEventId).map((item, idx) => (
                      <div
                        key={item.team.id}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-900"
                      >
                        <div className="flex items-center gap-4">
                          <span className="h-6 w-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold font-mono text-xs text-zinc-400">
                            {idx + 1}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-white uppercase tracking-wide">{item.team.name}</span>
                            <span className="text-[10px] text-zinc-500 font-mono mt-0.5">Reviews counted: {item.reviews}</span>
                          </div>
                        </div>

                        <span className="text-sm font-extrabold text-indigo-400 font-mono">
                          {item.avgScore}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Announcements tab */}
            {activeEventTab === "announcements" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Compose Announcements</h3>
                  <p className="text-xs text-zinc-500 mt-1">Broadcast high-priority communications to event participants</p>
                </div>

                <form onSubmit={handleSendAnnouncement} className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Announcement Subject</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Final Submission deadlines extended"
                        value={annTitle}
                        onChange={(e) => setAnnTitle(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Target Audience</label>
                      <select
                        value={annAudience}
                        onChange={(e) => setAnnAudience(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2.5 text-xs text-zinc-350 focus:outline-none"
                      >
                        <option value="all">All Audiences</option>
                        <option value="participants">Participants only</option>
                        <option value="teams">Team leaders only</option>
                        <option value="judges">Event Judges only</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Broadcast Message body</label>
                    <textarea
                      rows={4}
                      required
                      value={annMsg}
                      onChange={(e) => setAnnMsg(e.target.value)}
                      placeholder="Write message content details..."
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold uppercase tracking-wider self-end px-8"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Broadcast via Email & Notification
                  </button>
                </form>
              </div>
            )}

            {/* Certificate tab */}
            {activeEventTab === "certificates" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Credential Distribution</h3>
                  <p className="text-xs text-zinc-500 mt-1">Bulk generate completion templates for checked-in participants</p>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900 flex flex-col items-center justify-center text-center">
                  <Award className="w-10 h-10 text-indigo-400 mb-3" />
                  <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-wide">Generate completion credentials</h4>
                  <p className="text-xs text-zinc-500 max-w-sm mt-1 leading-relaxed">
                    Bulk-distribute participant certificates dynamically mapping name coordinates and issue stamps.
                  </p>

                  <button
                    onClick={() => {
                      const count = bulkGenerateCertificates(selectedEventId, "participant");
                      alert(`Successfully generated verifiable completion credentials for ${count} roster members!`);
                    }}
                    className="mt-6 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg hover:shadow-indigo-500/10"
                  >
                    Bulk Generate Participant Certificates
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
