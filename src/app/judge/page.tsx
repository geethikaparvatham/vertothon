"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "@/context/StateContext";
import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Compass,
  ExternalLink,
  Globe,
  LayoutDashboard,
  LogOut,
  Sliders,
  AlertTriangle,
  PlayCircle,
} from "lucide-react";
import { Github } from "@/components/SocialIcons";
import Logo from "@/components/Logo";

export default function JudgeDashboard() {
  const router = useRouter();
  const {
    currentUser,
    setCurrentUser,
    events,
    criteria,
    teams,
    submissions,
    assignments,
    scores,
    submitScore,
    users,
  } = useAppState();

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, string>>({});
  const [currentScores, setCurrentScores] = useState<Record<string, number>>({});

  // Verify Role
  if (!currentUser || currentUser.role !== "judge") {
    return (
      <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col items-center justify-center font-sans px-4 text-center">
        <AlertTriangle className="w-12 h-12 text-rose-500 mb-4 animate-bounce" />
        <h1 className="text-xl font-extrabold uppercase tracking-tight text-white">Unauthorized Access</h1>
        <p className="text-xs text-zinc-500 mt-1 max-w-sm">
          Your active session does not possess Judge permissions. Use the Session Switcher in the bottom right corner to log in as "Dr. Sandeep Reddy" or "Sarah Fernandes".
        </p>
        <Link href="/" className="mt-6 px-4 py-2 text-xs font-semibold uppercase bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  // Active event simulation: target Vertothon 2026
  const activeEvent = events.find((e) => e.slug === "vertothon-2026") || events[0];
  const eventCriteria = criteria.filter((c) => c.event_id === activeEvent.id);
  const eventTeams = teams.filter((t) => t.event_id === activeEvent.id);

  // Teams with active project submissions
  const evaluableTeams = eventTeams.filter((t) =>
    submissions.some((s) => s.team_id === t.id)
  );

  const selectedTeam = teams.find((t) => t.id === selectedTeamId);
  const selectedSubmission = selectedTeam ? submissions.find((s) => s.team_id === selectedTeam.id) : null;

  // Check if judging is locked
  const isLocked = activeEvent.settings?.judging_locked || false;

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("vertofi_current_user");
    router.push("/");
  };

  // Check if a team is already scored by this judge
  const isTeamScored = (teamId: string) => {
    // For local simulation, check if scores exist matching this team's assignment
    // Assignment id search
    const assignment = assignments.find((a) => a.team_id === teamId && a.judge_id === currentUser.id);
    if (!assignment) return false;
    const assignmentScores = scores.filter((s) => s.assignment_id === assignment.id);
    return assignmentScores.length >= eventCriteria.length;
  };

  const getTeamScoreStats = (teamId: string) => {
    // Collect all scores for this team to display total/average
    // Assignment
    const teamAssignments = assignments.filter((a) => a.team_id === teamId);
    let totalScoreSum = 0;
    let assignmentCount = 0;

    teamAssignments.forEach((asg) => {
      const asgScores = scores.filter((s) => s.assignment_id === asg.id);
      if (asgScores.length > 0) {
        let weightSum = 0;
        asgScores.forEach((s) => {
          const crit = eventCriteria.find((c) => c.id === s.criterion_id);
          const weight = crit ? crit.weight_percent : 20;
          weightSum += (s.score / 10) * weight; // Normalized out of 10 times weight
        });
        totalScoreSum += weightSum;
        assignmentCount++;
      }
    });

    if (assignmentCount === 0) return { total: 0, average: 0 };
    return { total: Math.round(totalScoreSum / assignmentCount), average: totalScoreSum / assignmentCount };
  };

  // Scoring Handler
  const handleScoreChange = (criterionId: string, value: number) => {
    setCurrentScores((prev) => ({ ...prev, [criterionId]: value }));
  };

  const handleCommentChange = (criterionId: string, val: string) => {
    setComments((prev) => ({ ...prev, [criterionId]: val }));
  };

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamId || isLocked) return;

    // Find or create assignment
    let assignment = assignments.find(
      (a) => a.team_id === selectedTeamId && a.judge_id === currentUser.id
    );

    if (!assignment) {
      // Create assignment dynamically in local storage
      const newAssignId = "asg-" + Math.random().toString(36).substring(7);
      const storedAssignments = localStorage.getItem("vertofi_assignments");
      const list = storedAssignments ? JSON.parse(storedAssignments) : [];
      assignment = {
        id: newAssignId,
        event_id: activeEvent.id,
        judge_id: currentUser.id,
        team_id: selectedTeamId,
        status: "pending",
        created_at: new Date().toISOString(),
      };
      list.push(assignment);
      localStorage.setItem("vertofi_assignments", JSON.stringify(list));
      assignments.push(assignment); // Mutate cache
    }

    // Submit scores
    eventCriteria.forEach((crit) => {
      const scoreVal = currentScores[crit.id] || 5;
      const comment = comments[crit.id] || "";
      submitScore(assignment!.id, crit.id, scoreVal, comment);
    });

    // Mark assignment completed
    const storedAssignments = localStorage.getItem("vertofi_assignments");
    if (storedAssignments) {
      const list = JSON.parse(storedAssignments);
      const updated = list.map((a: any) => a.id === assignment!.id ? { ...a, status: "completed" } : a);
      localStorage.setItem("vertofi_assignments", JSON.stringify(updated));
    }
    assignment.status = "completed";

    alert(`Scores submitted for ${selectedTeam?.name}!`);
    setSelectedTeamId(null);
    setCurrentScores({});
    setComments({});
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-900 bg-zinc-950/80 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8 justify-center md:justify-start">
          <Logo showText={true} showTagline={false} size={28} />
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-650/20 text-emerald-400 border border-emerald-500/10 font-mono font-bold uppercase tracking-wider">
            Judging
          </span>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-900 mb-6 text-center md:text-left">
          <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white mb-2 mx-auto md:mx-0">
            {currentUser.name.substring(0, 2).toUpperCase()}
          </div>
          <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
          <span className="text-[10px] text-emerald-400 font-mono tracking-wider font-semibold uppercase block mt-0.5">
            Active Judge Panel
          </span>
        </div>

        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 mb-6">
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all bg-emerald-600/10 text-emerald-400">
            <Sliders className="w-4 h-4" />
            Evaluation Queue
          </button>
        </nav>

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

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 max-w-4xl mx-auto w-full overflow-y-auto">
        <div className="flex flex-col gap-8">
          
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-tight text-white">Evaluation Queue</h2>
              <p className="text-xs text-zinc-500 mt-1">Review active project coordinates and allocate scores</p>
            </div>
            
            {isLocked ? (
              <span className="px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                Judging Locked
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Evaluation Open
              </span>
            )}
          </div>

          {/* Locked Notice banner */}
          {isLocked && (
            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Judging assignments have been locked by Vertofi administrators. Score forms are deactivated.</span>
            </div>
          )}

          {/* Detail Split View or Modal */}
          {selectedTeamId ? (
            <div className="glass-card p-6 rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Reviewing Team</span>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">{selectedTeam?.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedTeamId(null)}
                  className="p-1 px-3 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs uppercase"
                >
                  Cancel
                </button>
              </div>

              {/* Sub details */}
              {selectedSubmission ? (
                <div className="flex flex-col gap-5">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-300">Project: {selectedSubmission.project_name}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-2">{selectedSubmission.description}</p>
                    {selectedSubmission.solution && (
                      <p className="text-xs text-zinc-500 bg-zinc-900/30 p-3 rounded-lg border border-zinc-900/80 leading-relaxed mt-4">
                        <span className="font-bold text-zinc-400 block mb-1">SOLUTION ARCHITECTURE:</span>
                        {selectedSubmission.solution}
                      </p>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 text-xs">
                    {selectedSubmission.github_repo && (
                      <a href={selectedSubmission.github_repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-400 hover:text-indigo-400 transition-colors">
                        <Github className="w-4 h-4" /> Github Repo
                      </a>
                    )}
                    {selectedSubmission.live_demo && (
                      <a href={selectedSubmission.live_demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-400 hover:text-indigo-400 transition-colors">
                        <Globe className="w-4 h-4" /> Live Site
                      </a>
                    )}
                    {selectedSubmission.demo_video && (
                      <a href={selectedSubmission.demo_video} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-400 hover:text-indigo-400 transition-colors">
                        <PlayCircle className="w-4 h-4" /> Pitch Video
                      </a>
                    )}
                  </div>

                  {/* Criteria Sliders */}
                  <form onSubmit={handleScoreSubmit} className="flex flex-col gap-6 border-t border-zinc-900 pt-6">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">Grading Matrix</span>
                    
                    <div className="flex flex-col gap-4">
                      {eventCriteria.map((crit) => {
                        const val = currentScores[crit.id] || 5;
                        return (
                          <div key={crit.id} className="p-4 rounded-xl bg-zinc-900/20 border border-zinc-900 flex flex-col gap-3">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold text-zinc-200">
                                {crit.name} ({crit.weight_percent}%)
                              </span>
                              <span className="font-mono text-indigo-400 font-bold bg-indigo-600/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                {val} / 10
                              </span>
                            </div>
                            
                            <input
                              type="range"
                              min="1"
                              max="10"
                              disabled={isLocked}
                              value={val}
                              onChange={(e) => handleScoreChange(crit.id, parseInt(e.target.value))}
                              className="w-full h-1.5 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />

                            <input
                              type="text"
                              disabled={isLocked}
                              placeholder="Write a comment regarding criteria assessment (optional)..."
                              value={comments[crit.id] || ""}
                              onChange={(e) => handleCommentChange(crit.id, e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-850 rounded-lg px-3 py-1.5 text-[11px] text-zinc-300 focus:outline-none placeholder-zinc-700"
                            />
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="submit"
                      disabled={isLocked}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg ${
                        isLocked
                          ? "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-850"
                          : "bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-500/10 text-white"
                      }`}
                    >
                      Save Evaluated Scores
                    </button>
                  </form>
                </div>
              ) : (
                <p className="text-xs text-zinc-500">No project submission details uploaded by this team yet.</p>
              )}
            </div>
          ) : (
            /* Queue Table */
            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-4">Evaluatable Projects Queue</span>
              {evaluableTeams.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
                  <p className="text-xs text-zinc-500">No submitted project deliverables are available to evaluate yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {evaluableTeams.map((team) => {
                    const submission = submissions.find((s) => s.team_id === team.id);
                    const scored = isTeamScored(team.id);
                    const stats = getTeamScoreStats(team.id);

                    return (
                      <div
                        key={team.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-850 transition-colors"
                      >
                        <div className="flex flex-col max-w-md">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wide truncate">{team.name}</h4>
                          <span className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase truncate">
                            Project: {submission?.project_name}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          {scored ? (
                            <div className="flex flex-col items-end">
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Scored
                              </span>
                              <span className="text-[10px] text-zinc-500 font-mono mt-1">Weighted: {stats.total}%</span>
                            </div>
                          ) : (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold uppercase tracking-wider flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}

                          <button
                            onClick={() => setSelectedTeamId(team.id)}
                            className="p-1.5 px-3 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white text-[10px] font-bold uppercase transition-colors"
                          >
                            Evaluate
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
