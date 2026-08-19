"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Profile,
  Event,
  Track,
  ProblemStatement,
  Team,
  TeamMember,
  Submission,
  JudgingCriteria,
  JudgeProfile,
  JudgingAssignment,
  JudgingScore,
  AttendanceRecord,
  Certificate,
  Sponsor,
  EventSponsor,
  EventSpeaker,
  EventMentor,
  EventSchedule,
  Announcement,
  Resource,
  Notification,
  AuditLog,
  UserRole,
  EventType,
  EventStatus,
  ProblemStatus,
} from "@/types";

interface StateContextType {
  currentUser: Profile | null;
  users: Profile[];
  events: Event[];
  tracks: Track[];
  problems: ProblemStatement[];
  teams: Team[];
  teamMembers: TeamMember[];
  submissions: Submission[];
  judges: JudgeProfile[];
  criteria: JudgingCriteria[];
  assignments: JudgingAssignment[];
  scores: JudgingScore[];
  attendance: AttendanceRecord[];
  certificates: Certificate[];
  sponsors: Sponsor[];
  eventSponsors: EventSponsor[];
  eventSpeakers: EventSpeaker[];
  eventMentors: EventMentor[];
  schedules: EventSchedule[];
  announcements: Announcement[];
  resources: Resource[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  
  // Auth simulation
  setCurrentUser: (user: Profile | null) => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (updated: Partial<Profile>) => void;
  registerMockUser: (name: string, email: string) => Profile;

  // Event actions
  addEvent: (event: Omit<Event, "id" | "created_at" | "updated_at">, settings?: any) => Event;
  updateEvent: (id: string, updated: Partial<Event>, settings?: any) => void;
  deleteEvent: (id: string) => void;

  // Track actions
  addTrack: (eventId: string, name: string, description: string) => Track;
  deleteTrack: (id: string) => void;

  // Problem actions
  addProblem: (problem: Omit<ProblemStatement, "id" | "created_at">) => ProblemStatement;
  updateProblem: (id: string, updated: Partial<ProblemStatement>) => void;
  deleteProblem: (id: string) => void;

  // Team actions
  createTeam: (eventId: string, name: string, leaderId: string) => Team;
  joinTeam: (teamId: string, profileId: string, inviteStatus?: "pending" | "accepted") => void;
  leaveTeam: (teamId: string, profileId: string) => void;
  respondToInvite: (teamId: string, profileId: string, accept: boolean) => void;
  updateTeamTrack: (teamId: string, trackId: string) => void;
  deleteTeam: (teamId: string) => void;

  // Submission actions
  submitProject: (submission: Omit<Submission, "id" | "submitted_at" | "updated_at">) => Submission;

  // Judging actions
  addJudgingCriteria: (eventId: string, name: string, weight: number) => JudgingCriteria;
  assignJudge: (eventId: string, judgeId: string, teamId: string) => JudgingAssignment;
  submitScore: (assignmentId: string, criterionId: string, score: number, comment?: string) => void;
  lockJudging: (eventId: string, lock: boolean) => void;

  // Attendance actions
  checkInUser: (eventId: string, profileId: string, checkedInById: string) => AttendanceRecord;

  // Certificate actions
  generateCertificate: (eventId: string, profileId: string, type: string) => Certificate;
  bulkGenerateCertificates: (eventId: string, type: string) => number;

  // Sponsors/Speakers/Mentors actions
  addSponsorToEvent: (eventId: string, sponsorId: string, level: string) => void;
  addSpeakerToEvent: (eventId: string, speakerId: string) => void;
  addMentorToEvent: (eventId: string, mentorId: string) => void;

  // Announcements
  addAnnouncement: (eventId: string, title: string, message: string, audience: string) => Announcement;
  
  // Schedules
  addScheduleItem: (eventId: string, title: string, description: string, startTime: string, endTime: string) => EventSchedule;
  deleteScheduleItem: (id: string) => void;

  // Notifications
  addNotification: (profileId: string, title: string, message: string) => void;
  markNotificationsAsRead: (profileId: string) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

// Initial Static Mock Data / Seed Data
const DEFAULT_USERS: Profile[] = [
  {
    id: "admin-uid",
    name: "Aarav Sharma",
    email: "admin@vertofi.com",
    role: "super_admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "organizer-uid",
    name: "Meera Nair",
    email: "organizer@vertofi.com",
    role: "organizer",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "judge-uid",
    name: "Dr. Sandeep Reddy",
    email: "judge@vertofi.com",
    role: "judge",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "judge2-uid",
    name: "Sarah Fernandes",
    email: "designer@vertofi.com",
    role: "judge",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mentor-uid",
    name: "Amit Patel",
    email: "mentor@vertofi.com",
    role: "mentor",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "user-uid",
    name: "Alex Dev",
    email: "user@vertofi.com",
    phone: "+91 9876543210",
    college: "RV College of Engineering",
    course: "B.E.",
    branch: "Computer Science",
    year: "3rd Year",
    city: "Bengaluru",
    bio: "Fullstack developer interested in decentralized apps and AI safety.",
    github: "alexdev",
    linkedin: "alex-dev-in",
    portfolio: "alexdev.io",
    role: "participant",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p2-uid",
    name: "Rohan Verma",
    email: "rohan@gmail.com",
    role: "participant",
    college: "PES University",
    course: "B.Tech",
    branch: "Information Science",
    year: "4th Year",
    city: "Bengaluru",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p3-uid",
    name: "Priya Rao",
    email: "priya@outlook.com",
    role: "participant",
    college: "MS Ramaiah Institute of Technology",
    course: "B.Tech",
    branch: "Electronics & Communication",
    year: "2nd Year",
    city: "Mysuru",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DEFAULT_JUDGES: JudgeProfile[] = [
  {
    profile_id: "judge-uid",
    bio: "Head of AI Research at TechCorp. Former Stanford Fellow.",
    organization: "TechCorp Research",
    designation: "Director of AI",
    linkedin: "sandeep-reddy-ai",
  },
  {
    profile_id: "judge2-uid",
    bio: "Lead Product Designer at FinSaaS. 8+ years designing complex interfaces.",
    organization: "FinSaaS",
    designation: "Principal UX Designer",
    linkedin: "sarah-design-ux",
  },
];

const DEFAULT_EVENTS: Event[] = [
  {
    id: "event-vertothon-2026",
    title: "Vertothon",
    slug: "vertothon",
    type: "hackathon",
    description: "CODE. INNOVATE. IMPACT. A Vertofi Community hackathon where ambitious builders collaborate to solve real-world challenges and create meaningful technology solutions. FOR MORE DETAILS, STAY TUNED!",
    start_date: "2026-10-10T09:00:00.000Z",
    end_date: "2026-10-12T18:00:00.000Z",
    venue: "Vertofi Tech Hub",
    location: "Hybrid - Bengaluru & Online",
    external_reg_url: "",
    reg_cta_label: "Registrations Opening Soon",
    reg_cta_enabled: true,
    status: "published",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    settings: {
      event_id: "event-vertothon-2026",
      min_team_size: 2,
      max_team_size: 4,
      submission_open_time: "2026-10-10T10:00:00.000Z",
      submission_deadline: "2026-10-12T16:00:00.000Z",
      judging_locked: false,
    },
  },
];

const DEFAULT_TRACKS: Track[] = [
  {
    id: "track-1",
    event_id: "event-vertothon-2026",
    name: "Business & Startups",
    description: "Build software enabling merchants, early-stage operations, or micro-businesses to operate, scale, or automate daily actions.",
    created_at: new Date().toISOString(),
  },
  {
    id: "track-2",
    event_id: "event-vertothon-2026",
    name: "Fintech",
    description: "Reimagine financial inclusion, decentralized banking, fractional asset ownership, or automation of accounting tasks.",
    created_at: new Date().toISOString(),
  },
  {
    id: "track-3",
    event_id: "event-vertothon-2026",
    name: "Food & Agritech",
    description: "Design tools supporting agriculture, precision farming, cold chain tracking, waste mitigation, or logistics optimization.",
    created_at: new Date().toISOString(),
  },
  {
    id: "track-4",
    event_id: "event-vertothon-2026",
    name: "Cybersecurity",
    description: "Build resilience layers, zero-trust validators, real-time threat maps, or privacy protection frameworks.",
    created_at: new Date().toISOString(),
  },
  {
    id: "track-5",
    event_id: "event-vertothon-2026",
    name: "Health & Wellness",
    description: "Leverage APIs, telehealth databases, wearable sync metrics, or custom models to improve community physical/mental wellness.",
    created_at: new Date().toISOString(),
  },
];

const DEFAULT_PROBLEMS: ProblemStatement[] = [
  {
    id: "prob-1",
    event_id: "event-vertothon-2026",
    track_id: "track-2",
    title: "Micro-Lending for Rural Merchants",
    description: "Traditional banking models fail to evaluate risk for informal street vendors. Design a protocol or digital platform that utilizes transaction flow, local supplier data, or alternative inventory evaluations to issue secure, automated short-term capital.",
    requirements: "Provide a working demo, transparent borrower interest calculations, and automated credit assessment simulation.",
    constraints: "Must fit low-latency internet conditions.",
    resources: "NPCI sandbox docs, Open Credit Network API notes.",
    status: "scheduled",
    reveal_date_time: "2026-10-10T09:30:00.000Z", // Scheduled in future (Locked)
    created_at: new Date().toISOString(),
  },
  {
    id: "prob-2",
    event_id: "event-vertothon-2026",
    track_id: "track-3",
    title: "Cold Chain Traceability for Perishables",
    description: "Nearly 30% of agricultural products spoil during transit. Build a tracking system tracking temperature, humidity, and location logs using simulated IoT nodes, with immediate alert triggers for deviations.",
    requirements: "IoT telemetry dashboard, threshold notification webhooks, public verification ledger or dashboard for buyers.",
    constraints: "Sensor data simulated in real-time.",
    status: "revealed",
    reveal_date_time: "2026-08-01T09:30:00.000Z", // Past date (Revealed)
    created_at: new Date().toISOString(),
  },
];

const DEFAULT_SPONSORS: Sponsor[] = [
  { id: "sp-1", company: "Google Cloud", website: "https://cloud.google.com", description: "Empowering developers with secure cloud infrastructure and generative AI suites." },
  { id: "sp-2", company: "Supabase", website: "https://supabase.com", description: "The open source Firebase alternative. Build in a weekend, scale to millions." },
  { id: "sp-3", company: "Vercel", website: "https://vercel.com", description: "Vercel provides developer tools and cloud infrastructure to build a faster Web." },
];

const DEFAULT_EVENT_SPONSORS: EventSponsor[] = [
  { id: "es-1", event_id: "event-vertothon-2026", sponsor_id: "sp-1", sponsor_level: "title" },
  { id: "es-2", event_id: "event-vertothon-2026", sponsor_id: "sp-2", sponsor_level: "gold" },
  { id: "es-3", event_id: "event-vertothon-2026", sponsor_id: "sp-3", sponsor_level: "silver" },
];

const DEFAULT_CRITERIA: JudgingCriteria[] = [
  { id: "cr-1", event_id: "event-vertothon-2026", name: "Innovation", weight_percent: 25, created_at: new Date().toISOString() },
  { id: "cr-2", event_id: "event-vertothon-2026", name: "Technical Execution", weight_percent: 25, created_at: new Date().toISOString() },
  { id: "cr-3", event_id: "event-vertothon-2026", name: "Impact", weight_percent: 20, created_at: new Date().toISOString() },
  { id: "cr-4", event_id: "event-vertothon-2026", name: "UX / Design", weight_percent: 15, created_at: new Date().toISOString() },
  { id: "cr-5", event_id: "event-vertothon-2026", name: "Presentation", weight_percent: 15, created_at: new Date().toISOString() },
];

const DEFAULT_SCHEDULES: EventSchedule[] = [
  { id: "sch-1", event_id: "event-vertothon-2026", title: "Event Check-in", description: "Scan QR credentials and receive your developer kits at the entrance.", start_time: "2026-10-10T07:00:00.000Z", end_time: "2026-10-10T08:30:00.000Z" },
  { id: "sch-2", event_id: "event-vertothon-2026", title: "Opening Ceremony", description: "Introduction to Vertothon 2026, rules presentation, and sponsor introductions.", start_time: "2026-10-10T08:30:00.000Z", end_time: "2026-10-10T09:30:00.000Z" },
  { id: "sch-3", event_id: "event-vertothon-2026", title: "Problem Statement Reveal", description: "Unlocking track problem briefs and beginning code sprints.", start_time: "2026-10-10T09:30:00.000Z", end_time: "2026-10-10T10:00:00.000Z" },
  { id: "sch-4", event_id: "event-vertothon-2026", title: "Build Sprint — Phase 1", description: "Design layouts, configure backends, and sync schemas.", start_time: "2026-10-10T10:00:00.000Z", end_time: "2026-10-11T13:00:00.000Z" },
  { id: "sch-5", event_id: "event-vertothon-2026", title: "Lunch & Networking", description: "Connect with tech mentors, talk to sponsors, and meet organizers.", start_time: "2026-10-11T13:00:00.000Z", end_time: "2026-10-11T14:30:00.000Z" },
  { id: "sch-6", event_id: "event-vertothon-2026", title: "Build Sprint — Phase 2", description: "Final testing, deployment, and submission packaging.", start_time: "2026-10-11T14:30:00.000Z", end_time: "2026-10-12T16:00:00.000Z" },
  { id: "sch-7", event_id: "event-vertothon-2026", title: "Final Submission Deadline", description: "Deploy all submissions to Github/live link. Locks automatically.", start_time: "2026-10-12T16:00:00.000Z", end_time: "2026-10-12T16:15:00.000Z" },
  { id: "sch-8", event_id: "event-vertothon-2026", title: "Judging Period", description: "Judges score live presentations and compile leaderboards.", start_time: "2026-10-12T16:30:00.000Z", end_time: "2026-10-12T18:00:00.000Z" },
];

const DEFAULT_RESOURCES: Resource[] = [
  { id: "res-1", title: "Next.js App Directory Optimization Guide", description: "A detailed breakdown of route handlers, SEO configuration, and static site generation techniques.", category: "tutorials", url: "https://nextjs.org/docs", created_at: new Date().toISOString() },
  { id: "res-2", title: "Fintech Sandbox Integration Sandbox", description: "Mock credit sandboxes and simulated payment processors API keys for hackathons.", category: "dev_tools", url: "https://npci.org.in", created_at: new Date().toISOString() },
  { id: "res-3", title: "Pitch Deck Template for Hackathon Winners", description: "Slide templates focusing on value proposition, technical feasibility, and scale vectors.", category: "templates", url: "https://slides.google.com", created_at: new Date().toISOString() },
  { id: "res-4", title: "Introduction to Multi-Agent Workflows", description: "Learn how to orchestrate autonomous assistants for code debugging and code reviews.", category: "learning", url: "https://github.com", created_at: new Date().toISOString() },
];

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [problems, setProblems] = useState<ProblemStatement[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [judges, setJudges] = useState<JudgeProfile[]>([]);
  const [criteria, setCriteria] = useState<JudgingCriteria[]>([]);
  const [assignments, setAssignments] = useState<JudgingAssignment[]>([]);
  const [scores, setScores] = useState<JudgingScore[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [eventSponsors, setEventSponsors] = useState<EventSponsor[]>([]);
  const [eventSpeakers, setEventSpeakers] = useState<EventSpeaker[]>([]);
  const [eventMentors, setEventMentors] = useState<EventMentor[]>([]);
  const [schedules, setSchedules] = useState<EventSchedule[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Load from local storage or set defaults
  useEffect(() => {
    const getOrSet = (key: string, defaults: any) => {
      if (typeof window === "undefined") return defaults;
      const stored = localStorage.getItem(`vertofi_${key}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return defaults;
        }
      }
      localStorage.setItem(`vertofi_${key}`, JSON.stringify(defaults));
      return defaults;
    };

    const loadedUsers = getOrSet("users", DEFAULT_USERS);
    const loadedEvents = getOrSet("events", DEFAULT_EVENTS);
    const loadedTracks = getOrSet("tracks", DEFAULT_TRACKS);
    const loadedProblems = getOrSet("problems", DEFAULT_PROBLEMS);
    const loadedSponsors = getOrSet("sponsors", DEFAULT_SPONSORS);
    const loadedESponsors = getOrSet("event_sponsors", DEFAULT_EVENT_SPONSORS);
    const loadedCriteria = getOrSet("criteria", DEFAULT_CRITERIA);
    const loadedSchedules = getOrSet("schedules", DEFAULT_SCHEDULES);
    const loadedResources = getOrSet("resources", DEFAULT_RESOURCES);

    setUsers(loadedUsers);
    setEvents(loadedEvents);
    setTracks(loadedTracks);
    setProblems(loadedProblems);
    setSponsors(loadedSponsors);
    setEventSponsors(loadedESponsors);
    setCriteria(loadedCriteria);
    setSchedules(loadedSchedules);
    setResources(loadedResources);

    setTeams(getOrSet("teams", []));
    setTeamMembers(getOrSet("team_members", []));
    setSubmissions(getOrSet("submissions", []));
    setJudges(getOrSet("judges", DEFAULT_JUDGES));
    setAssignments(getOrSet("assignments", []));
    setScores(getOrSet("scores", []));
    setAttendance(getOrSet("attendance", []));
    setCertificates(getOrSet("certificates", []));
    setEventSpeakers(getOrSet("event_speakers", []));
    setEventMentors(getOrSet("event_mentors", []));
    setAnnouncements(getOrSet("announcements", []));
    setNotifications(getOrSet("notifications", []));
    setAuditLogs(getOrSet("audit_logs", []));

    // Default current user is Alex Dev (participant)
    const savedUser = localStorage.getItem("vertofi_current_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        const defaultUser = loadedUsers.find((u: any) => u.id === "user-uid") || loadedUsers[0];
        setCurrentUser(defaultUser);
      }
    } else {
      const defaultUser = loadedUsers.find((u: any) => u.id === "user-uid") || loadedUsers[0];
      setCurrentUser(defaultUser);
      localStorage.setItem("vertofi_current_user", JSON.stringify(defaultUser));
    }
  }, []);

  // Helper to persist data to localStorage
  const saveState = (key: string, data: any) => {
    localStorage.setItem(`vertofi_${key}`, JSON.stringify(data));
  };

  const logActivity = (action: string, eventId?: string, details?: any) => {
    const newLog: AuditLog = {
      id: Math.random().toString(36).substring(7),
      user_id: currentUser?.id || "anonymous",
      action,
      event_id: eventId,
      details,
      created_at: new Date().toISOString(),
    };
    setAuditLogs((prev) => {
      const updated = [newLog, ...prev];
      saveState("audit_logs", updated);
      return updated;
    });
  };

  const switchRole = (role: UserRole) => {
    const matchedUser = users.find((u) => u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
      localStorage.setItem("vertofi_current_user", JSON.stringify(matchedUser));
      logActivity(`Switched role session to ${role}`);
    }
  };

  const updateProfile = (updated: Partial<Profile>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updated, updated_at: new Date().toISOString() };
    setCurrentUser(updatedUser);
    localStorage.setItem("vertofi_current_user", JSON.stringify(updatedUser));

    setUsers((prev) => {
      const copy = prev.map((u) => (u.id === currentUser.id ? updatedUser : u));
      saveState("users", copy);
      return copy;
    });
    logActivity("Updated profile credentials");
  };

  const registerMockUser = (name: string, email: string): Profile => {
    const newUser: Profile = {
      id: "usr-" + Math.random().toString(36).substring(7),
      name,
      email,
      role: "participant",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUsers((prev) => {
      const updated = [...prev, newUser];
      saveState("users", updated);
      return updated;
    });
    setCurrentUser(newUser);
    localStorage.setItem("vertofi_current_user", JSON.stringify(newUser));
    logActivity("Registered new participant account on Vertofi");
    return newUser;
  };

  // Event managers
  const addEvent = (eventData: Omit<Event, "id" | "created_at" | "updated_at">, settings?: any): Event => {
    const id = "event-" + Math.random().toString(36).substring(7);
    const newEvent: Event = {
      ...eventData,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      settings: eventData.type === "hackathon" ? {
        event_id: id,
        min_team_size: settings?.min_team_size || 1,
        max_team_size: settings?.max_team_size || 4,
        submission_open_time: settings?.submission_open_time || new Date().toISOString(),
        submission_deadline: settings?.submission_deadline || new Date(Date.now() + 172800000).toISOString(),
        judging_locked: false,
      } : undefined,
    };

    setEvents((prev) => {
      const updated = [newEvent, ...prev];
      saveState("events", updated);
      return updated;
    });
    logActivity(`Created Event: ${newEvent.title}`, id);
    return newEvent;
  };

  const updateEvent = (id: string, updated: Partial<Event>, settings?: any) => {
    setEvents((prev) => {
      const updatedEvents = prev.map((ev) => {
        if (ev.id === id) {
          const mergedSettings = ev.settings || settings ? {
            ...(ev.settings || {}),
            ...(settings || {}),
          } : undefined;
          return {
            ...ev,
            ...updated,
            settings: mergedSettings,
            updated_at: new Date().toISOString(),
          };
        }
        return ev;
      });
      saveState("events", updatedEvents);
      return updatedEvents;
    });
    logActivity(`Updated Event Configuration`, id);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => {
      const filtered = prev.filter((ev) => ev.id !== id);
      saveState("events", filtered);
      return filtered;
    });
    logActivity(`Deleted Event`, id);
  };

  // Tracks
  const addTrack = (eventId: string, name: string, description: string): Track => {
    const newTrack: Track = {
      id: "trk-" + Math.random().toString(36).substring(7),
      event_id: eventId,
      name,
      description,
      created_at: new Date().toISOString(),
    };
    setTracks((prev) => {
      const updated = [...prev, newTrack];
      saveState("tracks", updated);
      return updated;
    });
    logActivity(`Created Hackathon Track: ${name}`, eventId);
    return newTrack;
  };

  const deleteTrack = (id: string) => {
    setTracks((prev) => {
      const filtered = prev.filter((t) => t.id !== id);
      saveState("tracks", filtered);
      return filtered;
    });
  };

  // Problem statements
  const addProblem = (problemData: Omit<ProblemStatement, "id" | "created_at">): ProblemStatement => {
    const newProb: ProblemStatement = {
      ...problemData,
      id: "prob-" + Math.random().toString(36).substring(7),
      created_at: new Date().toISOString(),
    };
    setProblems((prev) => {
      const updated = [...prev, newProb];
      saveState("problems", updated);
      return updated;
    });
    logActivity(`Created Problem Statement: ${newProb.title}`, problemData.event_id);
    return newProb;
  };

  const updateProblem = (id: string, updated: Partial<ProblemStatement>) => {
    setProblems((prev) => {
      const copy = prev.map((p) => (p.id === id ? { ...p, ...updated } : p));
      saveState("problems", copy);
      return copy;
    });
    logActivity(`Updated Problem Statement`, undefined, { problemId: id });
  };

  const deleteProblem = (id: string) => {
    setProblems((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      saveState("problems", filtered);
      return filtered;
    });
  };

  // Team actions
  const createTeam = (eventId: string, name: string, leaderId: string): Team => {
    const newTeam: Team = {
      id: "team-" + Math.random().toString(36).substring(7),
      event_id: eventId,
      name,
      leader_id: leaderId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Auto-join leader
    const newMember: TeamMember = {
      id: "mem-" + Math.random().toString(36).substring(7),
      team_id: newTeam.id,
      profile_id: leaderId,
      joined_at: new Date().toISOString(),
      status: "accepted",
    };

    setTeams((prev) => {
      const updated = [...prev, newTeam];
      saveState("teams", updated);
      return updated;
    });

    setTeamMembers((prev) => {
      const updated = [...prev, newMember];
      saveState("team_members", updated);
      return updated;
    });

    logActivity(`Created Team: ${name} for Hackathon`, eventId);
    return newTeam;
  };

  const joinTeam = (teamId: string, profileId: string, status: "pending" | "accepted" = "pending") => {
    // Check duplication
    const exists = teamMembers.some((m) => m.team_id === teamId && m.profile_id === profileId);
    if (exists) return;

    const newMember: TeamMember = {
      id: "mem-" + Math.random().toString(36).substring(7),
      team_id: teamId,
      profile_id: profileId,
      joined_at: new Date().toISOString(),
      status,
      invited_at: new Date().toISOString(),
    };

    setTeamMembers((prev) => {
      const updated = [...prev, newMember];
      saveState("team_members", updated);
      return updated;
    });

    const targetTeam = teams.find((t) => t.id === teamId);
    if (targetTeam) {
      logActivity(status === "accepted" ? `Joined team ${targetTeam.name}` : `Invited to team ${targetTeam.name}`, targetTeam.event_id);
    }
  };

  const leaveTeam = (teamId: string, profileId: string) => {
    setTeamMembers((prev) => {
      const filtered = prev.filter((m) => !(m.team_id === teamId && m.profile_id === profileId));
      saveState("team_members", filtered);
      return filtered;
    });

    // Check if team has any members left. If not, delete team.
    const remaining = teamMembers.filter((m) => m.team_id === teamId && m.profile_id !== profileId && m.status === "accepted");
    if (remaining.length === 0) {
      deleteTeam(teamId);
    } else {
      // If leader left, reassign leader
      const team = teams.find((t) => t.id === teamId);
      if (team && team.leader_id === profileId) {
        const nextLeader = remaining[0].profile_id;
        setTeams((prev) => {
          const updated = prev.map((t) => t.id === teamId ? { ...t, leader_id: nextLeader, updated_at: new Date().toISOString() } : t);
          saveState("teams", updated);
          return updated;
        });
      }
    }
    logActivity("Left team membership");
  };

  const respondToInvite = (teamId: string, profileId: string, accept: boolean) => {
    if (accept) {
      setTeamMembers((prev) => {
        const updated = prev.map((m) =>
          m.team_id === teamId && m.profile_id === profileId ? { ...m, status: "accepted" as const } : m
        );
        saveState("team_members", updated);
        return updated;
      });
      const team = teams.find((t) => t.id === teamId);
      if (team) {
        logActivity(`Accepted invite to team: ${team.name}`, team.event_id);
      }
    } else {
      leaveTeam(teamId, profileId);
    }
  };

  const updateTeamTrack = (teamId: string, trackId: string) => {
    setTeams((prev) => {
      const updated = prev.map((t) => t.id === teamId ? { ...t, track_id: trackId, updated_at: new Date().toISOString() } : t);
      saveState("teams", updated);
      return updated;
    });
  };

  const deleteTeam = (teamId: string) => {
    setTeams((prev) => {
      const filtered = prev.filter((t) => t.id !== teamId);
      saveState("teams", filtered);
      return filtered;
    });
    setTeamMembers((prev) => {
      const filtered = prev.filter((m) => m.team_id !== teamId);
      saveState("team_members", filtered);
      return filtered;
    });
  };

  // Submissions
  const submitProject = (subData: Omit<Submission, "id" | "submitted_at" | "updated_at">): Submission => {
    const existingIndex = submissions.findIndex((s) => s.team_id === subData.team_id);
    const now = new Date().toISOString();

    if (existingIndex > -1) {
      const updatedSubmission = {
        ...submissions[existingIndex],
        ...subData,
        updated_at: now,
      };
      setSubmissions((prev) => {
        const copy = [...prev];
        copy[existingIndex] = updatedSubmission;
        saveState("submissions", copy);
        return copy;
      });
      logActivity("Updated project submission", subData.event_id);
      return updatedSubmission;
    } else {
      const newSubmission: Submission = {
        ...subData,
        id: "sub-" + Math.random().toString(36).substring(7),
        submitted_at: now,
        updated_at: now,
      };
      setSubmissions((prev) => {
        const updated = [...prev, newSubmission];
        saveState("submissions", updated);
        return updated;
      });
      logActivity("Submitted hackathon project", subData.event_id);
      return newSubmission;
    }
  };

  // Judging
  const addJudgingCriteria = (eventId: string, name: string, weight: number): JudgingCriteria => {
    const newCriteria: JudgingCriteria = {
      id: "crit-" + Math.random().toString(36).substring(7),
      event_id: eventId,
      name,
      weight_percent: weight,
      created_at: new Date().toISOString(),
    };
    setCriteria((prev) => {
      const updated = [...prev, newCriteria];
      saveState("criteria", updated);
      return updated;
    });
    logActivity(`Added Judging Criteria: ${name} (${weight}%)`, eventId);
    return newCriteria;
  };

  const assignJudge = (eventId: string, judgeId: string, teamId: string): JudgingAssignment => {
    const newAssign: JudgingAssignment = {
      id: "asg-" + Math.random().toString(36).substring(7),
      event_id: eventId,
      judge_id: judgeId,
      team_id: teamId,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    setAssignments((prev) => {
      const updated = [...prev, newAssign];
      saveState("assignments", updated);
      return updated;
    });
    logActivity("Assigned project to judge", eventId);
    return newAssign;
  };

  const submitScore = (assignmentId: string, criterionId: string, scoreVal: number, comment?: string) => {
    const newScore: JudgingScore = {
      id: "scr-" + Math.random().toString(36).substring(7),
      assignment_id: assignmentId,
      criterion_id: criterionId,
      score: scoreVal,
      comment,
    };

    setScores((prev) => {
      // Overwrite if matches assignment and criteria
      const filtered = prev.filter((s) => !(s.assignment_id === assignmentId && s.criterion_id === criterionId));
      const updated = [...filtered, newScore];
      saveState("scores", updated);
      return updated;
    });

    // Check if assignment is now completely evaluated (all criteria scored)
    const assign = assignments.find((a) => a.id === assignmentId);
    if (assign) {
      const eventCrit = criteria.filter((c) => c.event_id === assign.event_id);
      const assignmentScores = scores.filter((s) => s.assignment_id === assignmentId).length + 1; // plus this new score

      if (assignmentScores >= eventCrit.length) {
        setAssignments((prev) => {
          const updated = prev.map((a) => a.id === assignmentId ? { ...a, status: "completed" as const } : a);
          saveState("assignments", updated);
          return updated;
        });
        logActivity("Judge completed project evaluation", assign.event_id);
      }
    }
  };

  const lockJudging = (eventId: string, lock: boolean) => {
    updateEvent(eventId, {}, { judging_locked: lock });
  };

  // Attendance Check-in
  const checkInUser = (eventId: string, profileId: string, checkedInById: string): AttendanceRecord => {
    const exists = attendance.find((a) => a.event_id === eventId && a.profile_id === profileId);
    if (exists) return exists;

    const newRecord: AttendanceRecord = {
      id: "att-" + Math.random().toString(36).substring(7),
      event_id: eventId,
      profile_id: profileId,
      checked_in_by: checkedInById,
      checked_in_at: new Date().toISOString(),
    };

    setAttendance((prev) => {
      const updated = [...prev, newRecord];
      saveState("attendance", updated);
      return updated;
    });

    logActivity("Checked in user for attendance", eventId, { checkedInUserId: profileId });
    return newRecord;
  };

  // Certificates
  const generateCertificate = (eventId: string, profileId: string, type: string): Certificate => {
    const verificationId = "VERT-" + Math.random().toString(36).substring(3, 11).toUpperCase();
    const newCert: Certificate = {
      id: "cert-" + Math.random().toString(36).substring(7),
      verification_id: verificationId,
      event_id: eventId,
      profile_id: profileId,
      certificate_type: type as any,
      issue_date: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
    };

    setCertificates((prev) => {
      const updated = [...prev, newCert];
      saveState("certificates", updated);
      return updated;
    });
    logActivity(`Generated certificate (${type})`, eventId, { recipient: profileId });
    return newCert;
  };

  const bulkGenerateCertificates = (eventId: string, type: string): number => {
    // Collect all unique participants in this event via teams
    const eventTeams = teams.filter((t) => t.event_id === eventId);
    const teamIds = eventTeams.map((t) => t.id);
    const members = teamMembers.filter((m) => teamIds.includes(m.team_id) && m.status === "accepted");
    const profileIds = Array.from(new Set(members.map((m) => m.profile_id)));

    let count = 0;
    profileIds.forEach((pid) => {
      // Check duplicate
      const hasCert = certificates.some((c) => c.event_id === eventId && c.profile_id === pid && c.certificate_type === type);
      if (!hasCert) {
        generateCertificate(eventId, pid, type);
        count++;
      }
    });

    logActivity(`Bulk generated ${count} certificates (${type})`, eventId);
    return count;
  };

  // Relationship bindings
  const addSponsorToEvent = (eventId: string, sponsorId: string, level: string) => {
    const exists = eventSponsors.some((es) => es.event_id === eventId && es.sponsor_id === sponsorId);
    if (exists) return;

    const newBinding: EventSponsor = {
      id: "evsp-" + Math.random().toString(36).substring(7),
      event_id: eventId,
      sponsor_id: sponsorId,
      sponsor_level: level as any,
    };
    setEventSponsors((prev) => {
      const updated = [...prev, newBinding];
      saveState("event_sponsors", updated);
      return updated;
    });
  };

  const addSpeakerToEvent = (eventId: string, speakerId: string) => {
    const exists = eventSpeakers.some((s) => s.event_id === eventId && s.speaker_id === speakerId);
    if (exists) return;

    const newBinding: EventSpeaker = {
      id: "evspk-" + Math.random().toString(36).substring(7),
      event_id: eventId,
      speaker_id: speakerId,
    };
    setEventSpeakers((prev) => {
      const updated = [...prev, newBinding];
      saveState("event_speakers", updated);
      return updated;
    });
  };

  const addMentorToEvent = (eventId: string, mentorId: string) => {
    const exists = eventMentors.some((m) => m.event_id === eventId && m.mentor_id === mentorId);
    if (exists) return;

    const newBinding: EventMentor = {
      id: "evmnt-" + Math.random().toString(36).substring(7),
      event_id: eventId,
      mentor_id: mentorId,
    };
    setEventMentors((prev) => {
      const updated = [...prev, newBinding];
      saveState("event_mentors", updated);
      return updated;
    });
  };

  // Schedule items
  const addScheduleItem = (eventId: string, title: string, description: string, startTime: string, endTime: string): EventSchedule => {
    const newItem: EventSchedule = {
      id: "sch-" + Math.random().toString(36).substring(7),
      event_id: eventId,
      title,
      description,
      start_time: startTime,
      end_time: endTime,
    };
    setSchedules((prev) => {
      const updated = [...prev, newItem].sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
      saveState("schedules", updated);
      return updated;
    });
    logActivity(`Added Schedule: ${title}`, eventId);
    return newItem;
  };

  const deleteScheduleItem = (id: string) => {
    setSchedules((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      saveState("schedules", filtered);
      return filtered;
    });
  };

  // Announcements
  const addAnnouncement = (eventId: string, title: string, message: string, audience: string): Announcement => {
    const newAnn: Announcement = {
      id: "ann-" + Math.random().toString(36).substring(7),
      event_id: eventId,
      title,
      message,
      audience: audience as any,
      created_at: new Date().toISOString(),
    };
    setAnnouncements((prev) => {
      const updated = [newAnn, ...prev];
      saveState("announcements", updated);
      return updated;
    });

    // Create notifications for all participants/judges of that event
    const eventTeams = teams.filter((t) => t.event_id === eventId);
    const tIds = eventTeams.map((t) => t.id);
    const eventUsers = teamMembers
      .filter((m) => tIds.includes(m.team_id) && m.status === "accepted")
      .map((m) => m.profile_id);

    // If super admin/organizers, add them too or notify
    const notifyIds = Array.from(new Set(eventUsers));
    notifyIds.forEach((uid) => {
      addNotification(uid, title, `Announcement for ${events.find(e => e.id === eventId)?.title}: ${message}`);
    });

    logActivity(`Posted Announcement: ${title}`, eventId);
    return newAnn;
  };

  // Notification center
  const addNotification = (profileId: string, title: string, message: string) => {
    const newNotif: Notification = {
      id: "ntf-" + Math.random().toString(36).substring(7),
      profile_id: profileId,
      title,
      message,
      read: false,
      created_at: new Date().toISOString(),
    };
    setNotifications((prev) => {
      const updated = [newNotif, ...prev];
      saveState("notifications", updated);
      return updated;
    });
  };

  const markNotificationsAsRead = (profileId: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => n.profile_id === profileId ? { ...n, read: true } : n);
      saveState("notifications", updated);
      return updated;
    });
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        users,
        events,
        tracks,
        problems,
        teams,
        teamMembers,
        submissions,
        judges,
        criteria,
        assignments,
        scores,
        attendance,
        certificates,
        sponsors,
        eventSponsors,
        eventSpeakers,
        eventMentors,
        schedules,
        announcements,
        resources,
        notifications,
        auditLogs,

        setCurrentUser,
        switchRole,
        updateProfile,
        registerMockUser,

        addEvent,
        updateEvent,
        deleteEvent,

        addTrack,
        deleteTrack,

        addProblem,
        updateProblem,
        deleteProblem,

        createTeam,
        joinTeam,
        leaveTeam,
        respondToInvite,
        updateTeamTrack,
        deleteTeam,

        submitProject,

        addJudgingCriteria,
        assignJudge,
        submitScore,
        lockJudging,

        checkInUser,

        generateCertificate,
        bulkGenerateCertificates,

        addSponsorToEvent,
        addSpeakerToEvent,
        addMentorToEvent,

        addAnnouncement,
        addScheduleItem,
        deleteScheduleItem,

        addNotification,
        markNotificationsAsRead,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
};
