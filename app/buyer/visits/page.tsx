"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Camera,
  CheckSquare,
  QrCode,
  Plus,
  X,
  Building2,
  Phone,
  User,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Circle,
  Image,
  CalendarDays,
} from "lucide-react";

// ─── Mock data ──────────────────────────────────────────────────────────────

const upcomingVisits = [
  {
    id: "v-001",
    project: "Prestige Heights",
    address: "Sector 75, Noida, UP 201301",
    date: "Jul 22, 2024",
    time: "11:00 AM",
    agent: "Vikram Singh",
    agentRole: "Senior Sales Manager",
    phone: "+91 98765 00002",
    type: "In-person Tour",
    confirmationCode: "PH-7744",
  },
  {
    id: "v-002",
    project: "Green Valley Plots",
    address: "Devanahalli, Bengaluru, Karnataka",
    date: "Jul 28, 2024",
    time: "10:30 AM",
    agent: "Priya Nair",
    agentRole: "Site Manager",
    phone: "+91 98765 00008",
    type: "Guided Walk",
    confirmationCode: "GVP-3391",
  },
];

const pastVisits = [
  {
    id: "pv-001",
    project: "Skyline Villas",
    address: "Golf Course Extn Rd, Gurugram",
    date: "Jul 8, 2024",
    rating: 4,
    photosCount: 12,
    checklist: [
      { item: "Location & Connectivity", done: true },
      { item: "Unit Layout & Sizes", done: true },
      { item: "Construction Quality", done: true },
      { item: "Amenities Inspection", done: true },
      { item: "Document Verification", done: false },
    ],
    aiSummary:
      "Impressive villa layout with excellent Golf Course views. Construction quality is top-notch — M-Sand bricks and vitrified flooring observed. Amenities like pool and landscaped gardens are well-maintained. Minor concern: legal documents for Plot 14-C still pending RERA update.",
  },
  {
    id: "pv-002",
    project: "Prestige Heights",
    address: "Sector 75, Noida",
    date: "Jun 18, 2024",
    rating: 5,
    photosCount: 8,
    checklist: [
      { item: "Location & Connectivity", done: true },
      { item: "Unit Layout & Sizes", done: true },
      { item: "Construction Quality", done: true },
      { item: "Amenities Inspection", done: true },
      { item: "Document Verification", done: true },
    ],
    aiSummary:
      "Excellent project with strong metro connectivity at 800m. Unit A-201 (3 BHK, 1620 sqft) perfectly fits your profile. Construction is 62% complete and on schedule for Dec 2026 delivery. All RERA documents verified. Highly recommended for booking.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
        />
      ))}
      <span className="ml-1 text-xs text-slate-400">{rating}/5</span>
    </div>
  );
}

function QRPlaceholder({ code }: { code: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 w-28 shrink-0">
      <div className="relative w-16 h-16">
        {/* QR pattern placeholder */}
        <div className="absolute inset-0 rounded-lg bg-white p-1 grid grid-cols-5 gap-0.5">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-[1px] ${
                [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24, 7, 12, 17].includes(i)
                  ? "bg-slate-900"
                  : "bg-transparent"
              }`}
            />
          ))}
        </div>
        <QrCode className="absolute inset-0 m-auto w-14 h-14 text-slate-900 opacity-0" />
      </div>
      <p className="text-[9px] font-mono text-slate-500 tracking-widest">{code}</p>
      <p className="text-[8px] text-slate-600 text-center">Show at gate</p>
    </div>
  );
}

// ─── Schedule Form ────────────────────────────────────────────────────────────

function ScheduleForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    project: "",
    date: "",
    time: "",
    visitType: "In-person Tour",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-[#12121f] border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <div>
            <h2 className="text-base font-semibold text-white">Schedule a Site Visit</h2>
            <p className="text-xs text-slate-400 mt-0.5">Our team will confirm within 2 hours</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Project / Property</label>
            <select
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
              className="w-full h-10 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 px-3 focus:outline-none focus:border-violet-500/60"
              required
            >
              <option value="" disabled>Select a project</option>
              <option value="Prestige Heights">Prestige Heights — Noida</option>
              <option value="Skyline Villas">Skyline Villas — Gurugram</option>
              <option value="Green Valley Plots">Green Valley Plots — Bengaluru</option>
              <option value="Central Square">Central Square — Mumbai</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Preferred Date</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="h-10 rounded-xl bg-white/5 border-white/10 text-slate-200 focus-visible:ring-violet-500"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Preferred Time</label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="h-10 rounded-xl bg-white/5 border-white/10 text-slate-200 focus-visible:ring-violet-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Visit Type</label>
            <div className="flex gap-2">
              {["In-person Tour", "Guided Walk", "Virtual Tour"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm({ ...form, visitType: type })}
                  className={`flex-1 h-9 rounded-xl border text-xs font-medium transition-all ${
                    form.visitType === type
                      ? "bg-violet-600/20 border-violet-500/50 text-violet-300"
                      : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Any specific unit preferences or questions..."
              rows={3}
              className="w-full rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 placeholder:text-slate-600 p-3 resize-none focus:outline-none focus:border-violet-500/60"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-10 rounded-xl border-white/10 text-slate-400 bg-transparent hover:bg-white/5"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-10 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium"
            >
              Confirm Visit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function VisitsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {showForm && <ScheduleForm onClose={() => setShowForm(false)} />}

      {/* Header */}
      <div className="border-b border-white/5 bg-gradient-to-br from-slate-900 via-[#0f0f1a] to-[#0a0a0f] px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-violet-400 tracking-widest uppercase mb-1">Buyer OS</p>
            <h1 className="text-2xl font-bold tracking-tight">Site Visits</h1>
            <p className="text-slate-400 text-sm mt-1">
              {upcomingVisits.length} upcoming &nbsp;·&nbsp; {pastVisits.length} completed
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="h-10 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium gap-2"
          >
            <Plus className="w-4 h-4" />
            Schedule New Visit
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        {/* ── Upcoming Visits ─────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <CalendarDays className="w-4 h-4 text-violet-400" />
            <h2 className="text-base font-semibold text-white">Upcoming Visits</h2>
            <Badge className="bg-violet-500/15 text-violet-300 border-violet-500/30 text-[10px]">
              {upcomingVisits.length}
            </Badge>
          </div>

          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <Card
                key={visit.id}
                className="bg-[#12121f] border-white/8 rounded-2xl overflow-hidden hover:border-violet-500/20 transition-all"
              >
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    {/* QR Code placeholder */}
                    <QRPlaceholder code={visit.confirmationCode} />

                    {/* Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-white">{visit.project}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                            <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                            {visit.address}
                          </div>
                        </div>
                        <Badge className="bg-violet-500/15 text-violet-300 border-violet-500/30 text-[10px] shrink-0">
                          {visit.type}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-violet-400" />
                          {visit.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-violet-400" />
                          {visit.time}
                        </div>
                      </div>

                      <Separator className="bg-white/5" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-violet-400" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white">{visit.agent}</p>
                            <p className="text-[10px] text-slate-500">{visit.agentRole}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-xl border-white/10 text-slate-400 bg-white/5 hover:bg-white/10 gap-1.5 text-xs"
                          >
                            <Phone className="w-3 h-3" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs"
                          >
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Past Visits ─────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-4 h-4 text-slate-400" />
            <h2 className="text-base font-semibold text-white">Visit History</h2>
            <Badge className="bg-slate-500/15 text-slate-400 border-slate-500/30 text-[10px]">
              {pastVisits.length}
            </Badge>
          </div>

          <div className="space-y-5">
            {pastVisits.map((visit) => {
              const donePct = Math.round(
                (visit.checklist.filter((c) => c.done).length / visit.checklist.length) * 100
              );
              return (
                <Card
                  key={visit.id}
                  className="bg-[#12121f] border-white/8 rounded-2xl overflow-hidden"
                >
                  <CardHeader className="pb-0 px-5 pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-sm font-semibold text-white">{visit.project}</CardTitle>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                          {visit.address}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          {visit.date}
                        </div>
                        <StarRating rating={visit.rating} />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-5 py-4 space-y-4">
                    {/* Stats row */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Image className="w-3.5 h-3.5 text-sky-400" />
                        {visit.photosCount} photos
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                        {visit.checklist.filter((c) => c.done).length}/{visit.checklist.length} checks ({donePct}%)
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {visit.checklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          {item.done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          )}
                          <span className={item.done ? "text-slate-300" : "text-slate-600"}>{item.item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Photo thumbnails placeholder */}
                    <div className="flex gap-2">
                      {Array.from({ length: Math.min(visit.photosCount, 5) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-14 h-14 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0"
                        >
                          <Camera className="w-4 h-4 text-slate-600" />
                        </div>
                      ))}
                      {visit.photosCount > 5 && (
                        <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                          <span className="text-[10px] text-slate-500">+{visit.photosCount - 5}</span>
                        </div>
                      )}
                    </div>

                    {/* AI Summary */}
                    <div className="rounded-xl bg-violet-900/20 border border-violet-500/20 p-3.5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-medium text-violet-300 uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        AI Visit Summary
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{visit.aiSummary}</p>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-xl border-white/10 text-slate-400 bg-white/5 hover:bg-white/10 text-xs gap-1.5"
                      >
                        <Camera className="w-3 h-3" />
                        View Photos
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs gap-1.5"
                      >
                        Full Report <ChevronRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
