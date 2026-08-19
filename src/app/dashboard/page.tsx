"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/StateContext";
import { UserRole } from "@/types";
import {
  User,
  LayoutDashboard,
  Users,
  Upload,
  Award,
  Settings,
  Bell,
  LogOut,
  Calendar,
  ExternalLink,
  Plus,
  Check,
  X,
  Mail,
  Globe,
  Clock,
  Compass,
} from "lucide-react";
import { Github, Linkedin } from "@/components/SocialIcons";
import Logo from "@/components/Logo";

export default function ParticipantDashboard() {
  const router = useRouter();
  const {
    currentUser,
    setCurrentUser,
    updateProfile,
    events,
    tracks,
    teams,
    teamMembers,
    createTeam,
    joinTeam,
    leaveTeam,
    respondToInvite,
    updateTeamTrack,
    submissions,
    submitProject,
    certificates,
    users,
    notifications,
    markNotificationsAsRead,
  } = useAppState();

  const [activeTab, setActiveTab] = useState("overview");

  // Profile Form States
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileCollege, setProfileCollege] = useState("");
  const [profileCourse, setProfileCourse] = useState("");
  const [profileBranch, setProfileBranch] = useState("");
  const [profileYear, setProfileYear] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileGithub, setProfileGithub] = useState("");
  const [profileLinkedin, setProfileLinkedin] = useState("");
  const [profilePortfolio, setProfilePortfolio] = useState("");
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Team Form States
  const [selectedEventId, setSelectedEventId] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  // Project Submission States
  const [subProjName, setSubProjName] = useState("");
  const [subProjDesc, setSubProjDesc] = useState("");
  const [subProjSolution, setSubProjSolution] = useState("");
  const [subProjGithub, setSubProjGithub] = useState("");
  const [subProjDemo, setSubProjDemo] = useState("");
  const [subProjVideo, setSubProjVideo] = useState("");
  const [subProjSlides, setSubProjSlides] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfileName(currentUser.name || "");
      setProfilePhone(currentUser.phone || "");
      setProfileCollege(currentUser.college || "");
      setProfileCourse(currentUser.course || "");
      setProfileBranch(currentUser.branch || "");
      setProfileYear(currentUser.year || "");
      setProfileCity(currentUser.city || "");
      setProfileBio(currentUser.bio || "");
      setProfileGithub(currentUser.github || "");
      setProfileLinkedin(currentUser.linkedin || "");
      setProfilePortfolio(currentUser.portfolio || "");
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#030303] text-zinc-400 flex flex-col items-center justify-center font-sans">
        <p className="text-sm">Loading session info...</p>
      </div>
    );
  }

  // Logout Simulator
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("vertofi_current_user");
    router.push("/");
  };

  // Profile Save
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone,
      college: profileCollege,
      course: profileCourse,
      branch: profileBranch,
      year: profileYear,
      city: profileCity,
      bio: profileBio,
      github: profileGithub,
      linkedin: profileLinkedin,
      portfolio: profilePortfolio,
    });
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  // Find User Team Context
  // Find which team the user belongs to
  const userTeamMemberRecord = teamMembers.find(
    (m) => m.profile_id === currentUser.id && m.status === "accepted"
  );
  const userTeam = userTeamMemberRecord
    ? teams.find((t) => t.id === userTeamMemberRecord.team_id)
    : null;

  // Invite invitations
  const pendingInvites = teamMembers.filter(
    (m) => m.profile_id === currentUser.id && m.status === "pending"
  );

  // Submissions Check
  const teamSubmission = userTeam ? submissions.find((s) => s.team_id === userTeam.id) : null;

  // Populate submission fields if existing
  useEffect(() => {
    if (teamSubmission) {
      setSubProjName(teamSubmission.project_name || "");
      setSubProjDesc(teamSubmission.description || "");
      setSubProjSolution(teamSubmission.solution || "");
      setSubProjGithub(teamSubmission.github_repo || "");
      setSubProjDemo(teamSubmission.live_demo || "");
      setSubProjVideo(teamSubmission.demo_video || "");
      setSubProjSlides(teamSubmission.presentation || "");
    }
  }, [teamSubmission]);

  // Create Team Trigger
  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !newTeamName) return;
    createTeam(selectedEventId, newTeamName, currentUser.id);
    setNewTeamName("");
  };

  // Invite Peer Trigger
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError("");
    setInviteSuccess("");
    if (!userTeam || !inviteEmail) return;

    // Find peer in user database
    const peer = users.find((u) => u.email.toLowerCase() === inviteEmail.toLowerCase());
    if (!peer) {
      setInviteError("User email not found on Vertofi platform. Ask them to sign up first.");
      return;
    }
    if (peer.id === currentUser.id) {
      setInviteError("You cannot invite yourself.");
      return;
    }

    // Check event sizing limit
    const event = events.find((e) => e.id === userTeam.event_id);
    const limit = event?.settings?.max_team_size || 4;
    const currentMembers = teamMembers.filter((m) => m.team_id === userTeam.id);
    if (currentMembers.length >= limit) {
      setInviteError(`Team size limit reached. Max: ${limit}`);
      return;
    }

    // Check if already in this team
    const inTeam = teamMembers.some((m) => m.team_id === userTeam.id && m.profile_id === peer.id);
    if (inTeam) {
      setInviteError("User is already in your team (or pending invite).");
      return;
    }

    joinTeam(userTeam.id, peer.id, "pending");
    setInviteSuccess(`Invitation sent to ${peer.name}!`);
    setInviteEmail("");
  };

  // Submit Project Trigger
  const handleProjSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTeam) return;

    // Check event deadline (UTC check)
    const event = events.find((e) => e.id === userTeam.event_id);
    if (event?.settings?.submission_deadline) {
      const dl = new Date(event.settings.submission_deadline).getTime();
      if (Date.now() > dl) {
        alert("Deadline exceeded. Project submission is locked.");
        return;
      }
    }

    submitProject({
      team_id: userTeam.id,
      event_id: userTeam.event_id,
      project_name: subProjName,
      description: subProjDesc,
      track_id: userTeam.track_id,
      solution: subProjSolution,
      github_repo: subProjGithub,
      live_demo: subProjDemo,
      demo_video: subProjVideo,
      presentation: subProjSlides,
    });
    setSubSuccess(true);
    setTimeout(() => setSubSuccess(false), 3000);
  };

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case "super_admin": return "Super Admin";
      case "organizer": return "Organizer";
      case "judge": return "Judge";
      default: return "Participant";
    }
  };

  // Filter user certificates
  const myCertificates = certificates.filter((c) => c.profile_id === currentUser.id);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-900 bg-zinc-950/80 p-6 flex flex-col">
        <Link href="/" className="flex items-center gap-2 mb-8 group justify-center md:justify-start">
          <Logo showText={true} showTagline={false} size={28} />
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-650/20 text-indigo-400 border border-indigo-500/10 font-mono font-bold uppercase tracking-wider">
            Portal
          </span>
        </Link>

        {/* User Card */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-900 mb-6 text-center md:text-left">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white mb-2 mx-auto md:mx-0">
            {currentUser.name.substring(0, 2).toUpperCase()}
          </div>
          <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
          <span className="text-[10px] text-indigo-400 font-mono tracking-wider font-semibold uppercase block mt-0.5">
            {getRoleName(currentUser.role)}
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all ${
              activeTab === "overview" ? "bg-indigo-600/10 text-indigo-400" : "text-zinc-400 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all ${
              activeTab === "profile" ? "bg-indigo-600/10 text-indigo-400" : "text-zinc-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("teams")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all ${
              activeTab === "teams" ? "bg-indigo-600/10 text-indigo-400" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            Teams
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all ${
              activeTab === "submissions" ? "bg-indigo-600/10 text-indigo-400" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Upload className="w-4 h-4" />
            Submit Project
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all ${
              activeTab === "certificates" ? "bg-indigo-600/10 text-indigo-400" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" />
            Certificates
          </button>
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto pt-6 border-t border-zinc-900 flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-wider"
          >
            <Compass className="w-4 h-4" />
            Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-rose-500 hover:text-rose-400 transition-colors uppercase tracking-wider"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-grow p-6 md:p-10 max-w-4xl mx-auto w-full overflow-y-auto">
        
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">Dashboard Overview</h2>
              <p className="text-xs text-zinc-500 mt-1">Quick operational highlights of your developer profile</p>
            </div>

            {/* Pending Team Invites Notification Block */}
            {pendingInvites.length > 0 && (
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex flex-col gap-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Pending Team Invitations</span>
                <div className="flex flex-col gap-2">
                  {pendingInvites.map((invite) => {
                    const inviteTeam = teams.find((t) => t.id === invite.team_id);
                    const event = events.find((e) => e.id === inviteTeam?.event_id);
                    return (
                      <div key={invite.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-850">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">{inviteTeam?.name}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">{event?.title}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => respondToInvite(invite.team_id, currentUser.id, true)}
                            className="p-1 px-2.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold uppercase"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => respondToInvite(invite.team_id, currentUser.id, false)}
                            className="p-1 px-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-[10px] font-bold uppercase"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Statistics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Team Participation</span>
                <span className="text-2xl font-bold text-white">{userTeam ? userTeam.name : "None"}</span>
                <span className="text-[10px] text-zinc-500 mt-2 font-mono">{userTeam ? "Hackathon active" : "Not in a team"}</span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Project Deliverable</span>
                <span className={`text-2xl font-bold ${teamSubmission ? "text-emerald-400" : "text-amber-500"}`}>
                  {teamSubmission ? "Submitted" : "Pending"}
                </span>
                <span className="text-[10px] text-zinc-500 mt-2 font-mono">
                  {userTeam ? "Click submit tab" : "Form a team first"}
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Certifications</span>
                <span className="text-2xl font-bold text-white">{myCertificates.length}</span>
                <span className="text-[10px] text-zinc-500 mt-2 font-mono">Issued credentials</span>
              </div>
            </div>

            {/* Upcoming Event reminders */}
            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Recommended Hackathons & Workshops</h3>
              <div className="flex flex-col gap-3">
                {events.slice(0, 2).map((ev) => (
                  <div key={ev.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/40 border border-zinc-900">
                    <div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-indigo-400 uppercase tracking-wider font-bold">
                        {ev.type}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-1.5 uppercase truncate max-w-sm">{ev.title}</h4>
                    </div>
                    <Link
                      href={`/events/${ev.slug}`}
                      className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider flex items-center gap-1"
                    >
                      Event details
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">My Profile Credentials</h2>
              <p className="text-xs text-zinc-500 mt-1">Configure your personal and academic metadata for certificate alignment</p>
            </div>

            {profileSaveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
                ✓ Profile changes synchronized successfully!
              </div>
            )}

            <form onSubmit={handleProfileSave} className="flex flex-col gap-6">
              {/* Basic grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Phone Number</label>
                  <input
                    type="text"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Education Grid */}
              <div className="p-5 rounded-2xl bg-zinc-900/20 border border-zinc-900 flex flex-col gap-4">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Academic Metadata</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">College Name</label>
                    <input
                      type="text"
                      value={profileCollege}
                      onChange={(e) => setProfileCollege(e.target.value)}
                      placeholder="e.g., IIT Madras"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Course Degree</label>
                    <input
                      type="text"
                      value={profileCourse}
                      onChange={(e) => setProfileCourse(e.target.value)}
                      placeholder="e.g., B.Tech"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Branch</label>
                    <input
                      type="text"
                      value={profileBranch}
                      onChange={(e) => setProfileBranch(e.target.value)}
                      placeholder="e.g., Information Technology"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Year of Study</label>
                    <input
                      type="text"
                      value={profileYear}
                      onChange={(e) => setProfileYear(e.target.value)}
                      placeholder="e.g., 3rd Year"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Profiles urls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-1">
                    <Github className="w-3.5 h-3.5" /> Github Handle
                  </label>
                  <input
                    type="text"
                    value={profileGithub}
                    onChange={(e) => setProfileGithub(e.target.value)}
                    placeholder="github_username"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-1">
                    <Linkedin className="w-3.5 h-3.5" /> Linkedin ID
                  </label>
                  <input
                    type="text"
                    value={profileLinkedin}
                    onChange={(e) => setProfileLinkedin(e.target.value)}
                    placeholder="linkedin_id"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> Portfolio Site
                  </label>
                  <input
                    type="text"
                    value={profilePortfolio}
                    onChange={(e) => setProfilePortfolio(e.target.value)}
                    placeholder="https://myweb.io"
                    className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Developer Bio</label>
                <textarea
                  rows={3}
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  placeholder="Describe your domain interest areas..."
                  className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg hover:shadow-indigo-500/10 self-end px-8"
              >
                Save Profile
              </button>
            </form>
          </div>
        )}

        {/* TEAMS TAB */}
        {activeTab === "teams" && (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">Team Builder Workspace</h2>
              <p className="text-xs text-zinc-500 mt-1">Form hackathon coalitions to build and submit products</p>
            </div>

            {/* Check if user has team */}
            {userTeam ? (
              <div className="flex flex-col gap-6">
                <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">Team Active</span>
                    <h3 className="text-lg font-bold text-white mt-1 uppercase tracking-wider">{userTeam.name}</h3>
                    <span className="text-[10px] text-zinc-500 mt-1 block">
                      Assigned event: {events.find((e) => e.id === userTeam.event_id)?.title}
                    </span>
                  </div>
                  <button
                    onClick={() => leaveTeam(userTeam.id, currentUser.id)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-rose-950/30 hover:border-rose-900 hover:text-rose-400 text-zinc-400 text-xs font-bold uppercase tracking-wide transition-all"
                  >
                    Leave Team
                  </button>
                </div>

                {/* Team Members List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Members */}
                  <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 flex flex-col gap-4">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Team Roster</span>
                    <div className="flex flex-col gap-3">
                      {teamMembers
                        .filter((m) => m.team_id === userTeam.id)
                        .map((mem) => {
                          const profile = users.find((u) => u.id === mem.profile_id);
                          const isLeader = userTeam.leader_id === mem.profile_id;
                          return (
                            <div key={mem.id} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-900">
                              <div className="flex items-center gap-2">
                                <div className="h-7 w-7 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-white font-bold">
                                  {profile?.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-semibold text-zinc-200">{profile?.name}</span>
                                  <span className="text-[9px] text-zinc-500">{profile?.email}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {isLeader && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase">
                                    Leader
                                  </span>
                                )}
                                {mem.status === "pending" ? (
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold uppercase">
                                    Pending
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                                    Joined
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Team Operations: Invite / Track */}
                  <div className="flex flex-col gap-6">
                    {/* Track Selection */}
                    <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-3">Select Project Track</span>
                      <select
                        value={userTeam.track_id || ""}
                        onChange={(e) => updateTeamTrack(userTeam.id, e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="">Choose Track...</option>
                        {tracks
                          .filter((t) => t.event_id === userTeam.event_id)
                          .map((track) => (
                            <option key={track.id} value={track.id}>
                              {track.name}
                            </option>
                          ))}
                      </select>
                      <p className="text-[10px] text-zinc-500 mt-2">Updating the project track syncs across all teammate submissions.</p>
                    </div>

                    {/* Invite Peer Form */}
                    {userTeam.leader_id === currentUser.id && (
                      <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-3">Invite Team Teammate</span>
                        
                        {inviteError && <div className="text-[10px] text-rose-400 font-semibold mb-2">{inviteError}</div>}
                        {inviteSuccess && <div className="text-[10px] text-emerald-400 font-semibold mb-2">{inviteSuccess}</div>}

                        <form onSubmit={handleInvite} className="flex gap-2">
                          <input
                            type="email"
                            required
                            placeholder="peer@vertofi.com"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="flex-grow bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase transition-colors"
                          >
                            Invite
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* User has NO team: options to Create */
              <div className="flex flex-col gap-6">
                <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 text-center">
                  <Users className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">No Active Team Found</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    To upload projects for a hackathon, you must either create a new team or accept pending peer invitations.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-900">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block mb-4">Create New Team</span>
                  <form onSubmit={handleCreateTeam} className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-grow flex flex-col gap-1.5 w-full">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Target Event</label>
                      <select
                        required
                        value={selectedEventId}
                        onChange={(e) => setSelectedEventId(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="">Select Event...</option>
                        {events
                          .filter((e) => e.type === "hackathon")
                          .map((ev) => (
                            <option key={ev.id} value={ev.id}>
                              {ev.title}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="flex-grow flex flex-col gap-1.5 w-full">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Team Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Coders"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase transition-colors whitespace-nowrap"
                    >
                      Create Team
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBMISSIONS TAB */}
        {activeTab === "submissions" && (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">Project Submission Console</h2>
              <p className="text-xs text-zinc-500 mt-1">Upload code coordinates, live demos, and slides before the deadline locks</p>
            </div>

            {/* Check team */}
            {!userTeam ? (
              <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 text-center">
                <Upload className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wide">Team Required</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  You must form a team in the "Teams" workspace before submitting project briefs.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {/* Deadline Warning banner */}
                {(() => {
                  const event = events.find((e) => e.id === userTeam.event_id);
                  if (!event?.settings?.submission_deadline) return null;
                  const deadlineStr = new Date(event.settings.submission_deadline).toLocaleString();
                  const isClosed = Date.now() > new Date(event.settings.submission_deadline).getTime();
                  return (
                    <div
                      className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                        isClosed
                          ? "bg-rose-500/10 border-rose-500/20 text-rose-400 animate-pulse"
                          : "bg-indigo-500/5 border-indigo-500/20 text-indigo-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-semibold">
                          {isClosed ? `SUBMISSIONS LOCKED: Closed on ${deadlineStr}` : `SUBMISSION DEADLINE: Closes on ${deadlineStr}`}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {subSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold">
                    ✓ Project submission updated and recorded!
                  </div>
                )}

                <form onSubmit={handleProjSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Project Name</label>
                      <input
                        type="text"
                        required
                        value={subProjName}
                        onChange={(e) => setSubProjName(e.target.value)}
                        placeholder="Project Title"
                        className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Assigned Track</label>
                      <input
                        type="text"
                        disabled
                        value={tracks.find((t) => t.id === userTeam.track_id)?.name || "Select track in Teams tab"}
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">One Line Description</label>
                    <input
                      type="text"
                      required
                      value={subProjDesc}
                      onChange={(e) => setSubProjDesc(e.target.value)}
                      placeholder="e.g. Decentalized micro credit lines using supplier logistics profiles"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Detailed Solution Pitch</label>
                    <textarea
                      rows={4}
                      value={subProjSolution}
                      onChange={(e) => setSubProjSolution(e.target.value)}
                      placeholder="Explain technical design, API frameworks, database setup, and user journeys..."
                      className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Links grid */}
                  <div className="p-5 rounded-2xl bg-zinc-900/20 border border-zinc-900 flex flex-col gap-4">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Deliverable URL Coordinates</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Github Repository</label>
                        <input
                          type="url"
                          value={subProjGithub}
                          onChange={(e) => setSubProjGithub(e.target.value)}
                          placeholder="https://github.com/myteam/project"
                          className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Live Demo Link</label>
                        <input
                          type="url"
                          value={subProjDemo}
                          onChange={(e) => setSubProjDemo(e.target.value)}
                          placeholder="https://project.vercel.app"
                          className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Video Pitch Clip</label>
                        <input
                          type="url"
                          value={subProjVideo}
                          onChange={(e) => setSubProjVideo(e.target.value)}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Presentation Slides</label>
                        <input
                          type="url"
                          value={subProjSlides}
                          onChange={(e) => setSubProjSlides(e.target.value)}
                          placeholder="https://docs.google.com/presentation/..."
                          className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Disable submit button if deadline is past */}
                  {(() => {
                    const event = events.find((e) => e.id === userTeam.event_id);
                    const isClosed = event?.settings?.submission_deadline
                      ? Date.now() > new Date(event.settings.submission_deadline).getTime()
                      : false;

                    return (
                      <button
                        type="submit"
                        disabled={isClosed}
                        className={`py-3 rounded-xl text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg self-end px-12 ${
                          isClosed
                            ? "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-850"
                            : "bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-500/10"
                        }`}
                      >
                        {isClosed ? "Submissions Locked" : "Submit Deliverables"}
                      </button>
                    );
                  })()}
                </form>
              </div>
            )}
          </div>
        )}

        {/* CERTIFICATES TAB */}
        {activeTab === "certificates" && (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">Verifiable Credentials</h2>
              <p className="text-xs text-zinc-500 mt-1">Access cryptographic certificates representing completion and awards</p>
            </div>

            {myCertificates.length === 0 ? (
              <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 text-center">
                <Award className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wide">No Credentials Issued Yet</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Certificates are generated and distributed by organizers after hackathons or bootcamp cycles conclude.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {myCertificates.map((cert) => {
                  const ev = events.find((e) => e.id === cert.event_id);
                  return (
                    <div
                      key={cert.id}
                      className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 flex flex-col hover:border-zinc-800 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-3">
                        <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                          VERT - Cryptographic ID
                        </span>
                        <Award className="w-4 h-4 text-indigo-400" />
                      </div>

                      <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold block">Credential Recipient</span>
                      <h4 className="text-sm font-bold text-white uppercase mt-0.5">{currentUser.name}</h4>

                      <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold block mt-4">Program / Event</span>
                      <p className="text-xs text-zinc-300 mt-0.5 truncate uppercase">{ev?.title || "Vertothon"}</p>

                      <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold block mt-4">Credential Type</span>
                      <span className="text-xs font-semibold text-emerald-400 uppercase mt-0.5 font-mono">
                        {cert.certificate_type}
                      </span>

                      <div className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between text-[10px]">
                        <span className="font-mono text-zinc-500">{cert.issue_date}</span>
                        <Link
                          href={`/verify/${cert.verification_id}`}
                          className="font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider flex items-center gap-1"
                        >
                          Verify Link
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
