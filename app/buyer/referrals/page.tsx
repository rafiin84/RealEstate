"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Copy,
  Check,
  Share2,
  Mail,
  Link,
  Gift,
  IndianRupee,
  Users,
  CheckCircle2,
  Clock,
  X,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Star,
  ArrowRight,
  UserPlus,
  Home,
  BadgeCheck,
} from "lucide-react";

// ─── Mock data ──────────────────────────────────────────────────────────────

const REFERRAL_CODE = "RAMESH2024";
const REFERRAL_LINK = "https://realstate.os/ref/RAMESH2024";
const REWARD_PER_BOOKING = 10000;

type ReferralStatus = "registered" | "visiting" | "booked" | "rewarded";

const referredFriends: {
  id: string;
  name: string;
  phone: string;
  referredOn: string;
  status: ReferralStatus;
  project?: string;
  reward?: number;
}[] = [
  {
    id: "ref-001",
    name: "Anil Kumar",
    phone: "+91 98700 11122",
    referredOn: "Jun 15, 2024",
    status: "booked",
    project: "Prestige Heights",
    reward: 25000,
  },
  {
    id: "ref-002",
    name: "Sunita Reddy",
    phone: "+91 98700 33344",
    referredOn: "Jul 2, 2024",
    status: "visiting",
    project: "Green Valley Plots",
  },
  {
    id: "ref-003",
    name: "Kiran Patel",
    phone: "+91 98700 55566",
    referredOn: "Jul 10, 2024",
    status: "registered",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig: Record<ReferralStatus, { label: string; color: string; icon: React.ReactNode }> = {
  registered: {
    label: "Registered",
    color: "bg-slate-500/15 text-slate-400 border-slate-600/30",
    icon: <UserPlus className="w-3 h-3" />,
  },
  visiting: {
    label: "Site Visit Scheduled",
    color: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    icon: <Clock className="w-3 h-3" />,
  },
  booked: {
    label: "Booking Done",
    color: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    icon: <Home className="w-3 h-3" />,
  },
  rewarded: {
    label: "Reward Paid",
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    icon: <BadgeCheck className="w-3 h-3" />,
  },
};

const totalEarned = referredFriends
  .filter((r) => r.status === "rewarded")
  .reduce((s, r) => s + (r.reward ?? 0), 0);

const pendingReward = referredFriends
  .filter((r) => r.status === "booked")
  .reduce((s, r) => s + (r.reward ?? REWARD_PER_BOOKING), 0);

// ─── Share Modal ─────────────────────────────────────────────────────────────

function ShareModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleEmailShare = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#12121f] border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Share2 className="w-4 h-4 text-violet-400" />
            Share Your Referral
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Hey! I found some amazing properties on RealEstate OS. Use my referral code ${REFERRAL_CODE} and get priority access + special offers! ${REFERRAL_LINK}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/15 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Share via WhatsApp</p>
              <p className="text-[11px] text-slate-400">Send your referral link directly</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </a>

          {/* Email */}
          {!sent ? (
            <form onSubmit={handleEmailShare} className="space-y-3">
              <label className="text-xs font-medium text-slate-300">Send via Email</label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="friend@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 rounded-xl bg-white/5 border-white/10 text-slate-200 placeholder:text-slate-600 focus-visible:ring-violet-500"
                  required
                />
                <Button
                  type="submit"
                  className="h-10 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white shrink-0 gap-1.5 text-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Send
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-300">Referral invite sent to {email}</p>
            </div>
          )}

          {/* Copy link */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Or copy your referral link</label>
            <div className="flex gap-2">
              <div className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 px-3 flex items-center text-xs font-mono text-slate-400 overflow-hidden">
                <span className="truncate">{REFERRAL_LINK}</span>
              </div>
              <button
                onClick={() => navigator.clipboard?.writeText(REFERRAL_LINK)}
                className="h-10 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 transition-colors"
              >
                <Link className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="border-b border-white/5 bg-gradient-to-br from-purple-950/60 via-[#0f0f1a] to-[#0a0a0f] px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium text-violet-400 tracking-widest uppercase mb-1">Buyer OS</p>
          <h1 className="text-2xl font-bold tracking-tight">Referral Program</h1>
          <p className="text-slate-400 text-sm mt-1">
            Refer friends &amp; earn ₹{(REWARD_PER_BOOKING).toLocaleString("en-IN")} for every booking
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

        {/* ── Earnings Overview ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-[#12121f] border-violet-500/20 rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-xs text-slate-400">Reward Pending</p>
              </div>
              <p className="text-2xl font-bold text-white">₹{pendingReward.toLocaleString("en-IN")}</p>
              <p className="text-[10px] text-amber-400 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Awaiting agreement execution
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#12121f] border-white/8 rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400">Total Earned</p>
              </div>
              <p className="text-2xl font-bold text-white">₹{totalEarned.toLocaleString("en-IN")}</p>
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {totalEarned > 0 ? "Credited to your account" : "Make your first referral"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#12121f] border-white/8 rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-xs text-slate-400">Friends Referred</p>
              </div>
              <p className="text-2xl font-bold text-white">{referredFriends.length}</p>
              <p className="text-[10px] text-slate-500 mt-1">
                {referredFriends.filter((r) => r.status === "booked" || r.status === "rewarded").length} booked so far
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ── Referral Code Card ───────────────────────────────────────── */}
        <Card className="bg-gradient-to-br from-violet-900/40 via-purple-900/20 to-[#12121f] border-violet-500/25 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <p className="text-xs font-medium text-violet-300 uppercase tracking-widest">Your Referral Code</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-3 bg-black/30 border border-violet-500/30 rounded-xl px-4 py-3">
                    <span className="text-2xl font-bold font-mono text-white tracking-widest">{REFERRAL_CODE}</span>
                    <button
                      onClick={handleCopy}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        copied
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-white/10 hover:bg-white/20 text-slate-300"
                      }`}
                      title="Copy code"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {copied && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Copied!
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Share this code with friends — they get priority onboarding &amp; you earn rewards
                </p>
              </div>

              {/* Share buttons */}
              <div className="flex flex-wrap gap-2 sm:flex-col">
                <Button
                  onClick={() => setShowShare(true)}
                  className="h-10 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-medium gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button
                  onClick={() => setShowShare(true)}
                  variant="outline"
                  className="h-10 rounded-xl border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="h-10 rounded-xl border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 gap-2 text-sm"
                >
                  <Link className="w-4 h-4" />
                  Copy Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── How It Works ─────────────────────────────────────────────── */}
        <Card className="bg-[#12121f] border-white/8 rounded-2xl">
          <CardHeader className="pb-2 px-5 pt-5">
            <CardTitle className="text-sm font-semibold text-white">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative">
              {/* Connector line (desktop only) */}
              <div className="absolute top-8 left-[calc(16.7%+8px)] right-[calc(16.7%+8px)] h-px bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-violet-500/30 hidden sm:block" />

              {[
                {
                  step: 1,
                  icon: Share2,
                  title: "Share Your Code",
                  desc: "Copy your unique code RAMESH2024 and share it with friends looking for their dream home.",
                  color: "text-violet-400",
                  bg: "bg-violet-500/15",
                  border: "border-violet-500/25",
                },
                {
                  step: 2,
                  icon: UserPlus,
                  title: "Friend Registers & Visits",
                  desc: "Your friend signs up using your referral code and schedules a site visit with our team.",
                  color: "text-amber-400",
                  bg: "bg-amber-500/15",
                  border: "border-amber-500/25",
                },
                {
                  step: 3,
                  icon: Gift,
                  title: "You Earn ₹25,000",
                  desc: "Once your friend books a property, ₹25,000 is credited to your account within 7 days.",
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/15",
                  border: "border-emerald-500/25",
                },
              ].map(({ step, icon: Icon, title, desc, color, bg, border }) => (
                <div key={step} className={`relative rounded-2xl border ${border} ${bg} p-5 space-y-3`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${color}`}>Step {step}</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-white/[0.03] border border-white/8 p-4 flex items-start gap-3">
              <Star className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <span className="text-slate-200 font-medium">Terms:</span> Reward is paid after the referred friend completes the agreement execution and pays the first instalment. No cap on earnings — refer as many friends as you like!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Referred Friends ─────────────────────────────────────────── */}
        <Card className="bg-[#12121f] border-white/8 rounded-2xl">
          <CardHeader className="pb-0 px-5 pt-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                Referred Friends
              </CardTitle>
              <Badge className="bg-blue-500/15 text-blue-400 border-blue-500/30 text-[10px]">
                {referredFriends.length} total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-5 py-4 space-y-3">
            {referredFriends.length === 0 ? (
              <div className="text-center py-10">
                <UserPlus className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No referrals yet</p>
                <p className="text-slate-600 text-xs mt-1">Share your code to get started</p>
              </div>
            ) : (
              referredFriends.map((ref) => {
                const sc = statusConfig[ref.status];
                return (
                  <div
                    key={ref.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-violet-300">
                        {ref.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-white">{ref.name}</p>
                        <Badge className={`border text-[10px] flex items-center gap-1 ${sc.color}`}>
                          {sc.icon}
                          {sc.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-[11px] text-slate-500">
                        <span>{ref.phone}</span>
                        {ref.project && (
                          <>
                            <span>·</span>
                            <span className="text-violet-400">{ref.project}</span>
                          </>
                        )}
                        <span>·</span>
                        <span>Referred {ref.referredOn}</span>
                      </div>
                    </div>

                    {/* Reward */}
                    {ref.reward && (
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-amber-300">
                          ₹{ref.reward.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-amber-500">Reward pending</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Invite more */}
            <button
              onClick={() => setShowShare(true)}
              className="w-full mt-2 h-11 rounded-xl border border-dashed border-white/15 hover:border-violet-500/40 text-slate-500 hover:text-violet-400 text-sm transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Invite another friend
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
