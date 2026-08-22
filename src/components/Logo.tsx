"use client";

import React from "react";

export default function Logo({
  className = "",
  showText = true,
  showTagline = false,
  size = 40,
  lightTheme = false,
}: {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  size?: number;
  lightTheme?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon Symbol */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="flex-shrink-0"
        aria-hidden="true"
      >
        {/* Speed lines/dashes on the left (currentColor) */}
        {/* Row 1 */}
        <rect x="32" y="36" width="3.5" height="3.5" rx="1.75" fill="currentColor" className={lightTheme ? "text-zinc-700" : "text-zinc-400 dark:text-zinc-200"} />
        <rect x="40" y="36" width="11" height="3.5" rx="1.75" fill="currentColor" className={lightTheme ? "text-zinc-700" : "text-zinc-400 dark:text-zinc-200"} />

        {/* Row 2 */}
        <rect x="25" y="44" width="3.5" height="3.5" rx="1.75" fill="currentColor" className={lightTheme ? "text-zinc-700" : "text-zinc-400 dark:text-zinc-200"} />
        <rect x="33" y="44" width="18" height="3.5" rx="1.75" fill="currentColor" className={lightTheme ? "text-zinc-700" : "text-zinc-400 dark:text-zinc-200"} />

        {/* Row 3 */}
        <rect x="32" y="52" width="7" height="3.5" rx="1.75" fill="currentColor" className={lightTheme ? "text-zinc-700" : "text-zinc-400 dark:text-zinc-200"} />
        <rect x="43" y="52" width="18" height="3.5" rx="1.75" fill="currentColor" className={lightTheme ? "text-zinc-700" : "text-zinc-400 dark:text-zinc-200"} />

        {/* Row 4 */}
        <rect x="36" y="60" width="3.5" height="3.5" rx="1.75" fill="currentColor" className={lightTheme ? "text-zinc-700" : "text-zinc-400 dark:text-zinc-200"} />
        <rect x="43" y="60" width="18" height="3.5" rx="1.75" fill="currentColor" className={lightTheme ? "text-zinc-700" : "text-zinc-400 dark:text-zinc-200"} />

        {/* Blue chevron/slant on top left */}
        <path
          d="M57 26 M57 26 L57 51 L63 51 L63 36 L70 30 Z"
          fill="#1b73e8"
        />

        {/* Gold shape resembling a '1' on the right */}
        <path
          d="M66 31 L80 31 L80 73 L74 69 L74 58 L66 52 Z"
          fill="#e5a910"
        />

        {/* Red triangle at the bottom */}
        <polygon
          points="66 73, 80 79, 66 79"
          fill="#e50000"
        />
      </svg>

      {/* Typography */}
      {showText && (
        <div className={`flex flex-col font-sans leading-none ${lightTheme ? "text-zinc-950" : "text-white"}`}>
          <span className="text-lg font-bold tracking-[0.18em] uppercase font-sans">
            VERTOTHON
          </span>
          {showTagline && (
            <span className="text-[7px] font-bold uppercase tracking-wider text-zinc-500 mt-1 flex items-center gap-1">
              <span>CODE</span>
              <span className="text-rose-500">•</span>
              <span className="text-indigo-400">INNOVATE</span>
              <span className="text-indigo-500">•</span>
              <span className="text-amber-500">IMPACT</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
