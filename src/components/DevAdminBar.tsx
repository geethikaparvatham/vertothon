"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/StateContext";
import { UserRole } from "@/types";
import { Shield, Sparkles, User, Award, RefreshCw, Layers } from "lucide-react";

export default function DevAdminBar() {
  const { currentUser, switchRole, users } = useAppState();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentUser) return null;

  const handleReset = () => {
    if (confirm("Reset local database to default seed data? All custom entries will be cleared.")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return <Shield className="w-4 h-4 text-rose-500" />;
      case "event_admin":
      case "organizer":
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case "judge":
        return <Award className="w-4 h-4 text-emerald-500" />;
      case "mentor":
        return <Layers className="w-4 h-4 text-sky-500" />;
      default:
        return <User className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "organizer":
        return "Organizer";
      case "judge":
        return "Judge";
      case "mentor":
        return "Mentor";
      default:
        return "Participant";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans">
      {isOpen && (
        <div className="glass-card p-4 rounded-xl border border-zinc-800 bg-zinc-950/95 shadow-2xl flex flex-col gap-2 max-w-sm w-72 mb-2">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-1">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Dev Admin Panel</span>
            <button
              onClick={handleReset}
              className="text-zinc-500 hover:text-rose-400 p-1 rounded hover:bg-zinc-900 transition-colors flex items-center gap-1 text-xs"
              title="Reset Simulated Database"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset DB
            </button>
          </div>
          <span className="text-[11px] text-zinc-500">Quickly toggle user sessions to inspect dashboards:</span>
          
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1">
            {users.map((user) => {
              const isActive = currentUser.id === user.id;
              return (
                <button
                  key={user.id}
                  onClick={() => switchRole(user.role)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-all ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                      : "bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getRoleIcon(user.role)}
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-200">{user.name}</span>
                      <span className="text-[10px] text-zinc-500">{user.email}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                    {getRoleName(user.role)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium text-sm shadow-lg hover:shadow-indigo-500/20 transition-all border border-indigo-400/20 hover:scale-105 active:scale-95"
      >
        {getRoleIcon(currentUser.role)}
        <span>Session: {currentUser.name.split(" ")[0]} ({getRoleName(currentUser.role)})</span>
      </button>
    </div>
  );
}
