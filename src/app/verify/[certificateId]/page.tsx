"use client";

import React, { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAppState } from "@/context/StateContext";
import { Award, CheckCircle, XCircle, ShieldCheck, Calendar, FileText, ArrowLeft } from "lucide-react";

export default function CertificateVerificationPage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = use(params);
  const { certificates, events, users } = useAppState();

  // Search by verification_id or id
  const certificate = certificates.find(
    (c) =>
      c.verification_id.toLowerCase() === certificateId.toLowerCase() ||
      c.id.toLowerCase() === certificateId.toLowerCase()
  );

  const recipient = certificate ? users.find((u) => u.id === certificate.profile_id) : null;
  const event = certificate ? events.find((e) => e.id === certificate.event_id) : null;

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-zinc-100 font-sans">
      <Header />

      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full relative">
          {/* Decorative glows */}
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

          {certificate ? (
            /* VALID CERTIFICATE CARD */
            <div className="glass-card p-8 rounded-3xl border border-zinc-800 bg-zinc-950/80 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
              {/* Metallic border band */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />
              
              <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4 mt-2">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider font-mono">
                ✓ VERIFIED CREDENTIAL
              </span>

              <h2 className="text-xl font-extrabold uppercase mt-6 text-white tracking-wide">
                Vertofi Certification
              </h2>
              <div className="h-[1px] bg-zinc-900 w-full my-4" />

              <div className="flex flex-col gap-4 w-full text-left text-xs">
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold block">Recipient Name</span>
                  <span className="text-sm font-bold text-zinc-200 uppercase mt-0.5 block">{recipient?.name || "Participant"}</span>
                </div>

                <div>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold block">Program / Event</span>
                  <span className="text-xs text-zinc-300 font-semibold uppercase mt-0.5 block">{event?.title || "Vertothon"}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold block">Credential Class</span>
                    <span className="text-xs text-emerald-400 font-semibold uppercase font-mono mt-0.5 block">
                      {certificate.certificate_type}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold block">Issue Date</span>
                    <span className="text-xs text-zinc-400 mt-0.5 font-mono block">{certificate.issue_date}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold block">Verification ID</span>
                  <span className="text-xs text-zinc-500 font-mono mt-0.5 block">{certificate.verification_id}</span>
                </div>
              </div>

              <div className="h-[1px] bg-zinc-900 w-full my-6" />

              <Link
                href="/"
                className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Homepage
              </Link>
            </div>
          ) : (
            /* INVALID CERTIFICATE CARD */
            <div className="glass-card p-8 rounded-3xl border border-rose-950 bg-zinc-950/80 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-rose-600" />

              <div className="p-3 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-4 mt-2">
                <XCircle className="w-8 h-8 animate-pulse" />
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold uppercase tracking-wider font-mono">
                ✕ INVALID CREDENTIAL
              </span>

              <h2 className="text-lg font-extrabold uppercase mt-6 text-white tracking-wide">
                Verification Failed
              </h2>
              <div className="h-[1px] bg-zinc-900 w-full my-4" />

              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                The verification ID <span className="text-rose-400 font-mono font-semibold">"{certificateId}"</span> does not match any digital credentials issued by the Vertofi Technology Community.
              </p>

              <Link
                href="/"
                className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Homepage
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
