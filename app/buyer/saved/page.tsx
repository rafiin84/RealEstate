"use client";

import { useState } from "react";
import { projects } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  GitCompareArrows,
  MapPin,
  Star,
  X,
  Building2,
  Home,
  Layers,
  IndianRupee,
  CalendarDays,
  Sparkles,
  CheckCircle2,
  TreePine,
  Landmark,
  ChevronLeft,
  ChevronRight,
  Waves,
  Dumbbell,
  Car,
  ShieldCheck,
  Wifi,
  Zap,
  Trees,
  TrendingUp,
} from "lucide-react";

// ─── Project enrichment ──────────────────────────────────────────────────────

const projectMeta: Record<
  string,
  {
    developer: string;
    priceMin: number;
    priceMax: number;
    unitTypes: string[];
    gradient: string;
    aiMatchScore: number;
    highlights: string[];
    beds?: string;
    constructionProgress?: number;
  }
> = {
  "proj-001": {
    developer: "Prestige Group",
    priceMin: 0.86,
    priceMax: 3.84,
    unitTypes: ["2 BHK", "3 BHK", "Penthouse"],
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    aiMatchScore: 92,
    highlights: ["Metro 800 m", "Top Schools Nearby", "62% Done"],
    beds: "2–4",
    constructionProgress: 62,
  },
  "proj-002": {
    developer: "Sobha Developers",
    priceMin: 6.5,
    priceMax: 8.0,
    unitTypes: ["4 BHK Villa", "5 BHK Villa"],
    gradient: "from-amber-500 via-orange-400 to-rose-500",
    aiMatchScore: 65,
    highlights: ["Golf Course Road", "Ready to Move", "Private Pool"],
    beds: "4–5",
    constructionProgress: 100,
  },
  "proj-003": {
    developer: "Godrej Properties",
    priceMin: 5.5,
    priceMax: 10.0,
    unitTypes: ["Office", "Retail"],
    gradient: "from-sky-500 via-cyan-400 to-teal-500",
    aiMatchScore: 48,
    highlights: ["BKC Location", "Grade A Office", "Metro Access"],
    constructionProgress: 45,
  },
  "proj-004": {
    developer: "Brigade Group",
    priceMin: 0.18,
    priceMax: 0.35,
    unitTypes: ["240 sqyd Plot", "360 sqyd Plot"],
    gradient: "from-emerald-500 via-green-400 to-teal-500",
    aiMatchScore: 78,
    highlights: ["Near Airport", "Gated Township", "RERA Approved"],
    constructionProgress: 20,
  },
  "proj-005": {
    developer: "DLF Limited",
    priceMin: 0.95,
    priceMax: 25.0,
    unitTypes: ["1 BHK", "2 BHK", "3 BHK", "Office"],
    gradient: "from-rose-500 via-pink-400 to-fuchsia-500",
    aiMatchScore: 55,
    highlights: ["GIFT City", "SEZ Benefits", "Smart Township"],
    beds: "1–3",
    constructionProgress: 30,
  },
};

const amenityIconMap: Record<string, React.ReactNode> = {
  "Swimming Pool": <Waves className="w-3.5 h-3.5" />,
  Pool: <Waves className="w-3.5 h-3.5" />,
  "Private Pool": <Waves className="w-3.5 h-3.5" />,
  "Infinity Pool": <Waves className="w-3.5 h-3.5" />,
  Gym: <Dumbbell className="w-3.5 h-3.5" />,
  Parking: <Car className="w-3.5 h-3.5" />,
  "24x7 Security": <ShieldCheck className="w-3.5 h-3.5" />,
  "Smart Home": <Wifi className="w-3.5 h-3.5" />,
  "EV Charging": <Zap className="w-3.5 h-3.5" />,
  Clubhouse: <Building2 className="w-3.5 h-3.5" />,
  "Landscaped Gardens": <Trees className="w-3.5 h-3.5" />,
  "Landscaped Parks": <Trees className="w-3.5 h-3.5" />,
  "Jogging Track": <TrendingUp className="w-3.5 h-3.5" />,
  Concierge: <Star className="w-3.5 h-3.5" />,
};

const typeIconMap: Record<string, React.ReactNode> = {
  Residential: <Home className="w-8 h-8 text-white/80" />,
  Commercial: <Landmark className="w-8 h-8 text-white/80" />,
  Plots: <Layers className="w-8 h-8 text-white/80" />,
  Villas: <Building2 className="w-8 h-8 text-white/80" />,
  "Mixed-use": <Building2 className="w-8 h-8 text-white/80" />,
};

const statusColor: Record<string, string> = {
  "Ready to Move": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Under Construction": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Planning: "bg-slate-500/15 text-slate-400 border-slate-600/30",
  Approved: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Completed: "bg-teal-500/15 text-teal-400 border-teal-500/30",
};

function formatPrice(value: number) {
  if (value < 1) return `₹${(value * 100).toFixed(0)} L`;
  return `₹${value.toFixed(2).replace(/\.?0+$/, "")} Cr`;
}

// ─── Compare Modal ────────────────────────────────────────────────────────────

function CompareModal({
  ids,
  onClose,
}: {
  ids: string[];
  onClose: () => void;
}) {
  const selected = ids.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as (typeof projects)[number][];

  const rows: { label: string; key: (p: (typeof projects)[number]) => string | React.ReactNode }[] = [
    {
      label: "Developer",
      key: (p) => projectMeta[p.id]?.developer ?? "—",
    },
    {
      label: "Location",
      key: (p) => `${p.location.city}, ${p.location.state}`,
    },
    {
      label: "Status",
      key: (p) => (
        <Badge className={`border text-[10px] ${statusColor[p.status] ?? "bg-slate-500/15 text-slate-400"}`}>
          {p.status}
        </Badge>
      ),
    },
    {
      label: "Price Range",
      key: (p) => {
        const m = projectMeta[p.id];
        return m ? `${formatPrice(m.priceMin)} – ${formatPrice(m.priceMax)}` : "—";
      },
    },
    {
      label: "Unit Types",
      key: (p) => projectMeta[p.id]?.unitTypes.join(", ") ?? "—",
    },
    {
      label: "Available Units",
      key: (p) => `${p.availableUnits} / ${p.totalUnits}`,
    },
    {
      label: "Possession",
      key: (p) =>
        new Date(p.completionDate).toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        }),
    },
    {
      label: "Construction",
      key: (p) => {
        const pct = projectMeta[p.id]?.constructionProgress ?? p.constructionProgress;
        return (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span>{pct}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10">
              <div
                className="h-1.5 rounded-full bg-violet-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      label: "AI Match Score",
      key: (p) => {
        const score = projectMeta[p.id]?.aiMatchScore;
        if (!score) return "—";
        return (
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span className="font-bold text-yellow-300">{score}%</span>
          </div>
        );
      },
    },
    {
      label: "Top Highlights",
      key: (p) => (
        <div className="flex flex-col gap-1">
          {(projectMeta[p.id]?.highlights ?? []).map((h) => (
            <div key={h} className="flex items-center gap-1 text-[10px] text-violet-300">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              {h}
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Amenities",
      key: (p) => (
        <div className="flex flex-wrap gap-1.5">
          {p.amenities.slice(0, 4).map((a) => (
            <div key={a} className="flex items-center gap-1 text-[10px] text-slate-400">
              <span className="text-slate-500">{amenityIconMap[a]}</span>
              {a.split(" ")[0]}
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "RERA Number",
      key: (p) => <span className="font-mono text-[10px] text-slate-500">{p.reraNumber}</span>,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-4xl rounded-2xl bg-[#12121f] border border-white/10 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <div>
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <GitCompareArrows className="w-4 h-4 text-sky-400" />
              Property Comparison
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Side-by-side specs for {selected.length} properties</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project header row */}
        <div className="grid gap-0 border-b border-white/8" style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr)` }}>
          <div className="p-4 text-xs text-slate-500 font-medium uppercase tracking-wider" />
          {selected.map((proj) => {
            const meta = projectMeta[proj.id];
            return (
              <div key={proj.id} className="p-4 border-l border-white/8">
                <div className={`h-16 rounded-xl bg-gradient-to-br ${meta?.gradient ?? "from-slate-700 to-slate-800"} flex items-center justify-center mb-3`}>
                  {typeIconMap[proj.type] ?? <Building2 className="w-8 h-8 text-white/80" />}
                </div>
                <p className="text-sm font-semibold text-white leading-tight">{proj.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{meta?.developer}</p>
              </div>
            );
          })}
        </div>

        {/* Comparison rows */}
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={`grid border-b border-white/5 last:border-0 ${idx % 2 === 0 ? "" : "bg-white/[0.02]"}`}
            style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr)` }}
          >
            <div className="px-4 py-3 text-[11px] text-slate-500 font-medium flex items-center">{row.label}</div>
            {selected.map((proj) => (
              <div key={proj.id} className="px-4 py-3 border-l border-white/5 text-xs text-slate-300">
                {row.key(proj)}
              </div>
            ))}
          </div>
        ))}

        {/* Footer CTAs */}
        <div className="p-5 border-t border-white/8">
          <div className={`grid gap-3`} style={{ gridTemplateColumns: `160px repeat(${selected.length}, 1fr)` }}>
            <div />
            {selected.map((proj) => (
              <Button
                key={proj.id}
                size="sm"
                className="h-9 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs"
              >
                View {proj.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SavedPage() {
  // initialise with 3 saved projects from mock data
  const [savedIds, setSavedIds] = useState<Set<string>>(
    new Set(["proj-001", "proj-002", "proj-004"])
  );
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);

  const savedProjects = projects.filter((p) => savedIds.has(p.id));

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setCompareIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {showCompare && (
        <CompareModal ids={[...compareIds]} onClose={() => setShowCompare(false)} />
      )}

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="border-b border-white/5 bg-gradient-to-br from-slate-900 via-[#0f0f1a] to-[#0a0a0f] px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-violet-400 tracking-widest uppercase mb-1">Buyer OS</p>
            <h1 className="text-2xl font-bold tracking-tight">Saved Properties</h1>
            <p className="text-slate-400 text-sm mt-1">
              {savedProjects.length} {savedProjects.length === 1 ? "property" : "properties"} in your wishlist
            </p>
          </div>
          {compareIds.size >= 2 && (
            <Button
              onClick={() => setShowCompare(true)}
              className="h-10 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium gap-2 shrink-0"
            >
              <GitCompareArrows className="w-4 h-4" />
              Compare {compareIds.size} Properties
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── Compare bar ──────────────────────────────────────────────── */}
        {compareIds.size > 0 && compareIds.size < 2 && (
          <div className="mb-6 rounded-2xl border border-sky-500/20 bg-sky-900/15 px-5 py-3 flex items-center gap-3">
            <GitCompareArrows className="w-4 h-4 text-sky-400 shrink-0" />
            <p className="text-sm text-sky-300 flex-1">
              <span className="font-semibold">{compareIds.size} property selected</span>
              <span className="text-sky-500 ml-2 text-xs">Select at least 2 to compare (max 3)</span>
            </p>
          </div>
        )}

        {/* ── Empty state ───────────────────────────────────────────────── */}
        {savedProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart className="w-14 h-14 text-slate-700 mb-4" />
            <p className="text-slate-400 font-medium mb-1">No saved properties yet</p>
            <p className="text-slate-600 text-sm mb-5">Browse properties and tap the heart icon to save them here</p>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-white/10 text-slate-400 bg-white/5 hover:bg-white/10"
            >
              Discover Properties
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {savedProjects.map((project) => {
              const meta = projectMeta[project.id];
              const isSaved = savedIds.has(project.id);
              const isComparing = compareIds.has(project.id);
              const amenities = project.amenities
                .slice(0, 4)
                .map((a) => ({ icon: amenityIconMap[a], label: a.split(" ")[0] }))
                .filter((a) => a.icon);

              return (
                <Card
                  key={project.id}
                  className={`group relative bg-[#12121f] border rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-2xl hover:shadow-violet-900/20 ${
                    isComparing ? "border-sky-500/40" : "border-white/8 hover:border-violet-500/25"
                  }`}
                >
                  {/* ── Gradient header ── */}
                  <div
                    className={`relative h-40 bg-gradient-to-br ${meta?.gradient ?? "from-slate-700 to-slate-800"} flex flex-col justify-between p-4`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="h-11 w-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                        {typeIconMap[project.type] ?? <Building2 className="w-7 h-7 text-white/80" />}
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <Badge className="bg-white/15 backdrop-blur-sm text-white border-0 text-[10px] font-mono tracking-wide">
                          RERA
                        </Badge>
                        {meta && (
                          <Badge className="bg-black/30 backdrop-blur-sm border-0 text-[10px] font-semibold flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-yellow-400" />
                            <span className="text-yellow-300">{meta.aiMatchScore}%</span>
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <Badge
                        className={`border text-[10px] px-2 py-0 mb-2 ${statusColor[project.status] ?? "bg-slate-500/15 text-slate-400"}`}
                      >
                        {project.status}
                      </Badge>
                      <h3 className="text-base font-bold text-white leading-tight drop-shadow-sm">{project.name}</h3>
                      {meta && <p className="text-white/70 text-xs mt-0.5">{meta.developer}</p>}
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      {project.location.line1}, {project.location.city}
                    </div>

                    {/* Price */}
                    {meta && (
                      <div className="flex items-baseline gap-1">
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-400 self-center shrink-0" />
                        <span className="text-sm font-bold text-white">{formatPrice(meta.priceMin)}</span>
                        <span className="text-slate-500 text-xs">–</span>
                        <span className="text-sm font-bold text-white">{formatPrice(meta.priceMax)}</span>
                        <span className="ml-auto text-[10px] text-slate-500">{project.availableUnits} left</span>
                      </div>
                    )}

                    {/* Unit types */}
                    {meta && (
                      <div className="flex flex-wrap gap-1">
                        {meta.unitTypes.map((u) => (
                          <Badge key={u} variant="outline" className="text-[10px] px-2 py-0 border-white/10 text-slate-400 bg-white/5">
                            {u}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Possession */}
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <CalendarDays className="w-3 h-3" />
                      Possession:{" "}
                      {new Date(project.completionDate).toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    {/* Amenity icons */}
                    {amenities.length > 0 && (
                      <div className="flex items-center gap-3 py-2 border-t border-white/5">
                        {amenities.map((a, i) => (
                          <div key={i} className="flex flex-col items-center gap-0.5 text-slate-500">
                            {a.icon}
                            <span className="text-[9px]">{a.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Highlights */}
                    {meta && (
                      <div className="flex flex-wrap gap-1">
                        {meta.highlights.map((h) => (
                          <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      {/* Save / Unsave */}
                      <button
                        onClick={() => toggleSave(project.id)}
                        className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all shrink-0 bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30"
                        title="Remove from saved"
                      >
                        <Heart className="w-4 h-4" fill="currentColor" />
                      </button>

                      {/* Compare toggle */}
                      <button
                        onClick={() => toggleCompare(project.id)}
                        disabled={!isComparing && compareIds.size >= 3}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
                          isComparing
                            ? "bg-sky-500/20 border-sky-500/40 text-sky-400"
                            : compareIds.size >= 3
                            ? "bg-white/5 border-white/10 text-slate-600 cursor-not-allowed"
                            : "bg-white/5 border-white/10 text-slate-500 hover:border-sky-500/40 hover:text-sky-400"
                        }`}
                        title={isComparing ? "Remove from compare" : "Add to compare"}
                      >
                        <GitCompareArrows className="w-4 h-4" />
                      </button>

                      <Button
                        className="flex-1 h-9 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold gap-1.5"
                      >
                        View Details <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* ── Tips ────────────────────────────────────────────────────── */}
        {savedProjects.length > 0 && (
          <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-900/15 p-4 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-violet-200">Pro tip</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Select 2–3 properties using the compare button to see a side-by-side spec comparison.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
