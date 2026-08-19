export type UserRole = 'super_admin' | 'event_admin' | 'organizer' | 'judge' | 'mentor' | 'participant';

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
  course?: string;
  branch?: string;
  year?: string;
  city?: string;
  bio?: string;
  avatar_url?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export type EventType = 'hackathon' | 'workshop' | 'meetup' | 'bootcamp' | 'conference' | 'competition';
export type EventStatus = 'draft' | 'published' | 'open' | 'ongoing' | 'completed' | 'cancelled' | 'archived';

export interface EventSettings {
  event_id: string;
  min_team_size: number;
  max_team_size: number;
  submission_open_time?: string;
  submission_deadline?: string;
  judging_locked: boolean;
  certificate_template_url?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  type: EventType;
  description: string;
  banner_url?: string;
  start_date: string;
  end_date: string;
  venue: string;
  location: string; // e.g., 'Online', 'Offline - Bengaluru', 'Hybrid'
  external_reg_url?: string;
  reg_cta_label: string;
  reg_cta_enabled: boolean;
  status: EventStatus;
  created_at: string;
  updated_at: string;
  settings?: EventSettings;
}

export interface EventParticipant {
  id: string;
  event_id: string;
  profile_id: string;
  joined_at: string;
}

export interface Track {
  id: string;
  event_id: string;
  name: string;
  description: string;
  created_at: string;
}

export type ProblemStatus = 'draft' | 'scheduled' | 'locked' | 'revealed' | 'archived';

export interface ProblemStatement {
  id: string;
  event_id: string;
  track_id?: string;
  title: string;
  description: string;
  requirements?: string;
  constraints?: string;
  resources?: string;
  attachments?: string[];
  status: ProblemStatus;
  reveal_date_time?: string;
  created_at: string;
}

export interface Team {
  id: string;
  event_id: string;
  name: string;
  leader_id: string;
  track_id?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  profile_id: string;
  joined_at: string;
  invited_at?: string;
  status: 'pending' | 'accepted';
}

export interface Submission {
  id: string;
  team_id: string;
  event_id: string;
  project_name: string;
  description: string;
  track_id?: string;
  solution?: string;
  github_repo?: string;
  live_demo?: string;
  demo_video?: string;
  presentation?: string;
  additional_files?: string[];
  submitted_at: string;
  updated_at: string;
}

export interface JudgingCriteria {
  id: string;
  event_id: string;
  name: string;
  weight_percent: number; // e.g., 25
  created_at: string;
}

export interface JudgeProfile {
  profile_id: string;
  bio?: string;
  organization?: string;
  designation?: string;
  linkedin?: string;
}

export interface JudgingAssignment {
  id: string;
  event_id: string;
  judge_id: string;
  team_id: string;
  status: 'pending' | 'completed';
  created_at: string;
}

export interface JudgingScore {
  id: string;
  assignment_id: string;
  criterion_id: string;
  score: number; // scale 1-10
  comment?: string;
}

export interface AttendanceRecord {
  id: string;
  event_id: string;
  profile_id: string;
  checked_in_by?: string;
  checked_in_at: string;
}

export interface Certificate {
  id: string;
  verification_id: string;
  event_id: string;
  profile_id: string;
  certificate_type: 'participant' | 'winner' | 'runner_up' | 'mentor' | 'judge' | 'speaker' | 'volunteer' | 'organizer';
  issue_date: string;
  created_at: string;
}

export interface Sponsor {
  id: string;
  company: string;
  logo_url?: string;
  website?: string;
  description?: string;
}

export interface EventSponsor {
  id: string;
  event_id: string;
  sponsor_id: string;
  sponsor_level: 'title' | 'gold' | 'silver' | 'community' | 'technology';
}

export interface EventSpeaker {
  id: string;
  event_id: string;
  speaker_id: string; // profiles.id
}

export interface EventMentor {
  id: string;
  event_id: string;
  mentor_id: string; // profiles.id
}

export interface EventSchedule {
  id: string;
  event_id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
}

export interface Announcement {
  id: string;
  event_id: string;
  title: string;
  message: string;
  audience: 'all' | 'participants' | 'teams' | 'mentors' | 'judges';
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  category: 'tutorials' | 'guides' | 'templates' | 'dev_tools' | 'learning';
  url: string;
  created_at: string;
}

export interface Notification {
  id: string;
  profile_id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  event_id?: string;
  details?: Record<string, any>;
  created_at: string;
}
