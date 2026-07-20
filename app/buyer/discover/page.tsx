"use client";

import { useState, useMemo } from "react";
import { projects, buyerProfiles } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Heart,
  GitCompareArrows,
  Eye,
  Sparkles,
  Building2,
  Trees,
  LayoutGrid,
  Map,
  Waves,
  Dumbbell,
  Car,
  ShieldCheck,
  Wifi,
  Zap,
  ChevronRight,
  SlidersHorizontal,
  TrendingUp,
  CalendarDays,
  IndianRupee,
  Home,
  Landmark,
  Star,
  X,
} from "lucide-react";

// ─── Per-project enrichment ──────────────────────────────────────────────────

const projectMeta: Record<
  string,
  {
    developer: string;
    priceMin: number; // in Cr
    priceMax: number; // in Cr
    unitTypes: string[];
    gradient: string;
    iconBg: string;
    aiMatchScore: number;
    highlights: string[];
    amenityIcons: { icon: React.ReactNode; label: string }[];
    image?: string;
  }
> = {
  "proj-001": {
    developer: "Prestige Group",
    priceMin: 0.86,
    priceMax: 3.84,
    unitTypes: ["2 BHK", "3 BHK", "Penthouse"],
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    iconBg: "bg-violet-500/20",
    aiMatchScore: 92,
    highlights: ["Metro 800 m", "Top Schools", "62% Done"],
    amenityIcons: [],
    image: "photo-1545324418-cc1a3fa10c00",
  },
  "proj-002": {
    developer: "Sobha Developers",
    priceMin: 6.5,
    priceMax: 8.0,
    unitTypes: ["4 BHK Villa", "5 BHK Villa"],
    gradient: "from-amber-500 via-orange-400 to-rose-500",
    iconBg: "bg-amber-500/20",
    aiMatchScore: 65,
    highlights: ["Golf Course Road", "Ready to Move", "Private Pool"],
    amenityIcons: [],
    image: "photo-1613977257363-707ba9348227",
  },
  "proj-003": {
    developer: "Godrej Properties",
    priceMin: 5.5,
    priceMax: 10.0,
    unitTypes: ["Office", "Retail"],
    gradient: "from-sky-500 via-cyan-400 to-teal-500",
    iconBg: "bg-sky-500/20",
    aiMatchScore: 48,
    highlights: ["BKC Location", "Grade A Office", "Metro Access"],
    amenityIcons: [],
    image: "photo-1486325212027-8081e485255e",
  },
  "proj-004": {
    developer: "Brigade Group",
    priceMin: 0.18,
    priceMax: 0.35,
    unitTypes: ["240 sqyd Plot", "360 sqyd Plot"],
    gradient: "from-emerald-500 via-green-400 to-teal-500",
    iconBg: "bg-emerald-500/20",
    aiMatchScore: 78,
    highlights: ["Near Airport", "Gated Township", "RERA Approved"],
    amenityIcons: [],
    image: "photo-1500382017468-9049fed747ef",
  },
  "proj-005": {
    developer: "DLF Limited",
    priceMin: 0.95,
    priceMax: 25.0,
    unitTypes: ["1 BHK", "2 BHK", "3 BHK", "Office", "Retail"],
    gradient: "from-rose-500 via-pink-400 to-fuchsia-500",
    iconBg: "bg-rose-500/20",
    aiMatchScore: 55,
    highlights: ["GIFT City", "SEZ Benefits", "Smart Township"],
    amenityIcons: [],
    image: "photo-1448630360428-65456885c650",
  },
};

const amenityConfig: Record<string, { icon: React.ReactNode; label: string }> = {
  "Swimming Pool": { icon: <Waves className="h-3.5 w-3.5" />, label: "Pool" },
  Pool: { icon: <Waves className="h-3.5 w-3.5" />, label: "Pool" },
  "Private Pool": { icon: <Waves className="h-3.5 w-3.5" />, label: "Pool" },
  "Infinity Pool": { icon: <Waves className="h-3.5 w-3.5" />, label: "Pool" },
  Gym: { icon: <Dumbbell className="h-3.5 w-3.5" />, label: "Gym" },
  Parking: { icon: <Car className="h-3.5 w-3.5" />, label: "Parking" },
  "24x7 Security": { icon: <ShieldCheck className="h-3.5 w-3.5" />, label: "Security" },
  "Smart Home": { icon: <Wifi className="h-3.5 w-3.5" />, label: "Smart" },
  "EV Charging": { icon: <Zap className="h-3.5 w-3.5" />, label: "EV Charge" },
  Clubhouse: { icon: <Building2 className="h-3.5 w-3.5" />, label: "Clubhouse" },
  "Landscaped Gardens": { icon: <Trees className="h-3.5 w-3.5" />, label: "Gardens" },
  "Landscaped Parks": { icon: <Trees className="h-3.5 w-3.5" />, label: "Gardens" },
  "Jogging Track": { icon: <TrendingUp className="h-3.5 w-3.5" />, label: "Jogging" },
  Concierge: { icon: <Star className="h-3.5 w-3.5" />, label: "Concierge" },
};

const typeIconMap: Record<string, React.ReactNode> = {
  Residential: <Home className="h-8 w-8 text-white/80" />,
  Commercial: <Landmark className="h-8 w-8 text-white/80" />,
  Plots: <LayoutGrid className="h-8 w-8 text-white/80" />,
  Villas: <Building2 className="h-8 w-8 text-white/80" />,
  "Mixed-use": <Building2 className="h-8 w-8 text-white/80" />,
};

const formatPrice = (value: number) => {
  if (value < 1) return `₹${(value * 100).toFixed(0)} L`;
  return `₹${value.toFixed(2).replace(/\.?0+$/, "")} Cr`;
};

const statusColor: Record<string, string> = {
  "Ready to Move": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Under Construction": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Planning: "bg-muted text-muted-foreground border-border",
  Approved: "bg-primary/10 text-primary border-primary/20",
  Completed: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  "On Hold": "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function DiscoverPage() {
  const buyer = buyerProfiles[0];

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCity, setFilterCity] = useState("all");
  const [filterBudget, setFilterBudget] = useState("all");
  const [filterBHK, setFilterBHK] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [savedIds, setSavedIds] = useState<Set<string>>(
    new Set(buyer?.savedProperties ?? [])
  );
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [mapView, setMapView] = useState(false);

  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Plot", "Office"];

  const cities = useMemo(
    () => Array.from(new Set(projects.map((p) => p.location.city))),
    []
  );

  const toggleBHK = (val: string) => {
    setFilterBHK((prev) =>
      prev.includes(val) ? prev.filter((b) => b !== val) : [...prev, val]
    );
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
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

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const meta = projectMeta[p.id];
      const q = search.toLowerCase();

      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.location.city.toLowerCase().includes(q) &&
        !(meta?.developer ?? "").toLowerCase().includes(q)
      )
        return false;

      if (filterType !== "all") {
        const typeMap: Record<string, string[]> = {
          Residential: ["Residential", "Villas", "Mixed-use"],
          Commercial: ["Commercial", "Office", "Retail"],
          Plots: ["Plots"],
        };
        if (!typeMap[filterType]?.includes(p.type)) return false;
      }

      if (filterCity !== "all" && p.location.city !== filterCity) return false;

      if (filterStatus !== "all") {
        const statusMap: Record<string, string[]> = {
          Ready: ["Ready to Move", "Completed"],
          "Under Construction": ["Under Construction", "Approved"],
        };
        if (!statusMap[filterStatus]?.includes(p.status)) return false;
      }

      if (filterBudget !== "all" && meta) {
        const budgetRanges: Record<string, [number, number]> = {
          "Under 50L": [0, 0.5],
          "50L–1Cr": [0.5, 1],
          "1Cr–3Cr": [1, 3],
          "3Cr–7Cr": [3, 7],
          "7Cr+": [7, Infinity],
        };
        const [lo, hi] = budgetRanges[filterBudget] ?? [0, Infinity];
        if (meta.priceMax < lo || meta.priceMin > hi) return false;
      }

      if (filterBHK.length > 0 && meta) {
        const match = filterBHK.some((b) =>
          meta.unitTypes.some((u) => u.toLowerCase().includes(b.toLowerCase()))
        );
        if (!match) return false;
      }

      return true;
    });
  }, [search, filterType, filterCity, filterBudget, filterBHK, filterStatus]);

  const activeFilterCount =
    (filterType !== "all" ? 1 : 0) +
    (filterCity !== "all" ? 1 : 0) +
    (filterBudget !== "all" ? 1 : 0) +
    (filterStatus !== "all" ? 1 : 0) +
    filterBHK.length;

  const clearFilters = () => {
    setFilterType("all");
    setFilterCity("all");
    setFilterBudget("all");
    setFilterStatus("all");
    setFilterBHK([]);
    setSearch("");
  };

  return (
    <div className="min-h-full bg-background">
      {/* ── Hero Search Banner ─────────────────────────────── */}
      <div className="border-b border-border bg-card px-6 py-10">
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-1 text-sm font-medium text-primary tracking-widest uppercase">
            Buyer OS — Discover
          </p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            Find your dream property
          </h1>
          <p className="mb-8 text-muted-foreground text-sm">
            Browse {projects.length} curated projects across India&apos;s fastest-growing cities
          </p>

          {/* Search bar */}
          <div className="relative flex items-center max-w-3xl">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by project, location, budget..."
              className="w-full h-14 pl-12 pr-16 rounded-2xl bg-background border-border text-foreground placeholder:text-muted-foreground text-base focus-visible:ring-primary focus-visible:border-primary"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* ── Filter Row ────────────────────────────────────── */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </div>

          {/* Property Type */}
          <Select value={filterType} onValueChange={(v) => setFilterType(v ?? "all")}>
            <SelectTrigger className="h-9 w-44 rounded-xl bg-muted/40 border-border text-sm text-foreground hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Plots">Plots</SelectItem>
            </SelectContent>
          </Select>

          {/* City */}
          <Select value={filterCity} onValueChange={(v) => setFilterCity(v ?? "all")}>
            <SelectTrigger className="h-9 w-40 rounded-xl bg-muted/40 border-border text-sm text-foreground hover:border-primary/50 transition-colors">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Budget */}
          <Select value={filterBudget} onValueChange={(v) => setFilterBudget(v ?? "all")}>
            <SelectTrigger className="h-9 w-40 rounded-xl bg-muted/40 border-border text-sm text-foreground hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              <SelectItem value="all">Any Budget</SelectItem>
              <SelectItem value="Under 50L">Under ₹50 L</SelectItem>
              <SelectItem value="50L–1Cr">₹50 L – ₹1 Cr</SelectItem>
              <SelectItem value="1Cr–3Cr">₹1 Cr – ₹3 Cr</SelectItem>
              <SelectItem value="3Cr–7Cr">₹3 Cr – ₹7 Cr</SelectItem>
              <SelectItem value="7Cr+">₹7 Cr+</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v ?? "all")}>
            <SelectTrigger className="h-9 w-48 rounded-xl bg-muted/40 border-border text-sm text-foreground hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              <SelectItem value="all">Any Status</SelectItem>
              <SelectItem value="Ready">Ready to Move</SelectItem>
              <SelectItem value="Under Construction">Under Construction</SelectItem>
            </SelectContent>
          </Select>

          {/* BHK multi-select pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {bhkOptions.map((b) => (
              <button
                key={b}
                onClick={() => toggleBHK(b)}
                className={`h-9 rounded-xl border px-3 text-xs font-medium transition-all ${
                  filterBHK.includes(b)
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "bg-muted/40 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
              Clear ({activeFilterCount})
            </button>
          )}

          {/* Map toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMapView((v) => !v)}
            className={`ml-auto h-9 rounded-xl border transition-all gap-1.5 ${
              mapView
                ? "bg-primary/10 border-primary/50 text-primary"
                : "bg-muted/40 border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            {mapView ? (
              <>
                <LayoutGrid className="h-3.5 w-3.5" /> Grid View
              </>
            ) : (
              <>
                <Map className="h-3.5 w-3.5" /> Map View
              </>
            )}
          </Button>
        </div>

        {/* ── AI Recommendation Banner ──────────────────────── */}
        {buyer && (
          <div className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary mb-0.5">
                Based on your profile, here are our top picks for you
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {buyer.aiPersona}
              </p>
            </div>
            <Badge className="flex-shrink-0 bg-primary/10 text-primary border-primary/20 text-xs">
              AI Powered
            </Badge>
          </div>
        )}

        {/* ── Compare Bar ───────────────────────────────────── */}
        {compareIds.size > 0 && (
          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <GitCompareArrows className="h-4 w-4" />
              <span className="font-medium">{compareIds.size} properties selected for comparison</span>
              <span className="text-muted-foreground text-xs">(max 3)</span>
            </div>
            <Button
              size="sm"
              className="h-8 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs gap-1.5"
            >
              Compare Now <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}

        {/* ── Map Placeholder ───────────────────────────────── */}
        {mapView && (
          <div className="mb-8 rounded-2xl border border-border bg-muted/40 h-96 flex flex-col items-center justify-center gap-3">
            <Map className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground font-medium">Interactive Map View</p>
            <p className="text-muted-foreground text-sm">
              Map integration coming soon — showing {filteredProjects.length} results
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMapView(false)}
              className="mt-2 rounded-xl border-border text-muted-foreground bg-muted/40 hover:bg-muted"
            >
              Back to Grid
            </Button>
          </div>
        )}

        {/* ── Results Header ────────────────────────────────── */}
        {!mapView && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="text-foreground font-semibold">{filteredProjects.length}</span>{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
              {activeFilterCount > 0 && (
                <span className="text-muted-foreground"> · {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active</span>
              )}
            </p>
            <p className="text-xs text-muted-foreground">Sorted by AI Match Score</p>
          </div>
        )}

        {/* ── Property Cards Grid ───────────────────────────── */}
        {!mapView && (
          <>
            {filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground font-medium mb-1">No properties match your filters</p>
                <p className="text-muted-foreground text-sm mb-4">Try adjusting or clearing your filters</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="rounded-xl border-border text-muted-foreground bg-muted/40 hover:bg-muted"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProjects
                  .sort(
                    (a, b) =>
                      (projectMeta[b.id]?.aiMatchScore ?? 0) -
                      (projectMeta[a.id]?.aiMatchScore ?? 0)
                  )
                  .map((project) => {
                    const meta = projectMeta[project.id];
                    const isSaved = savedIds.has(project.id);
                    const isComparing = compareIds.has(project.id);
                    const amenities = project.amenities.slice(0, 5).map((a) => amenityConfig[a]).filter(Boolean);

                    return (
                      <Card
                        key={project.id}
                        className="group relative bg-card border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                      >
                        {/* ── Photo Header ── */}
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={`https://images.unsplash.com/${meta?.image ?? "photo-1545324418-cc1a3fa10c00"}?w=600&q=80&fit=crop&auto=format`}
                            alt={project.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
                          <div className="relative flex flex-col justify-between h-full p-4">
                            {/* Top row: type icon + RERA badge */}
                            <div className="flex items-start justify-between">
                              <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                                {typeIconMap[project.type] ?? <Building2 className="h-8 w-8 text-white/80" />}
                              </div>
                              <div className="flex flex-col items-end gap-1.5">
                                <Badge className="bg-white/15 backdrop-blur-sm text-white border-0 text-[10px] font-mono tracking-wide">
                                  RERA ✓
                                </Badge>
                                {meta && buyer && (
                                  <Badge className="bg-black/30 backdrop-blur-sm border-0 text-[10px] font-semibold flex items-center gap-1">
                                    <Sparkles className="h-2.5 w-2.5 text-yellow-400" />
                                    <span className="text-yellow-300">{meta.aiMatchScore}% Match</span>
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Bottom: project name + status badge */}
                            <div>
                              <div className="mb-2">
                                <Badge
                                  className={`border text-[10px] px-2 py-0 ${statusColor[project.status] ?? "bg-muted text-muted-foreground border-border"}`}
                                >
                                  {project.status}
                                </Badge>
                              </div>
                              <h3 className="text-lg font-bold text-white leading-tight drop-shadow-sm">
                                {project.name}
                              </h3>
                              {meta && (
                                <p className="text-white/70 text-xs mt-0.5">{meta.developer}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-4 space-y-3">
                          {/* Location */}
                          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-rose-400" />
                            <span>
                              {project.location.line1}, {project.location.city},{" "}
                              {project.location.state}
                            </span>
                          </div>

                          {/* Price range */}
                          {meta && (
                            <div className="flex items-baseline gap-1.5">
                              <IndianRupee className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 self-center" />
                              <span className="text-base font-bold text-foreground">
                                {formatPrice(meta.priceMin)}
                              </span>
                              <span className="text-muted-foreground text-xs">–</span>
                              <span className="text-base font-bold text-foreground">
                                {formatPrice(meta.priceMax)}
                              </span>
                              <span className="text-muted-foreground text-xs ml-auto">
                                {project.availableUnits} units left
                              </span>
                            </div>
                          )}

                          {/* Unit type badges */}
                          {meta && (
                            <div className="flex flex-wrap gap-1.5">
                              {meta.unitTypes.map((u) => (
                                <Badge
                                  key={u}
                                  variant="outline"
                                  className="text-[10px] px-2 py-0 border-border text-muted-foreground bg-muted/40 rounded-lg"
                                >
                                  {u}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Possession date + RERA number */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="h-3 w-3" />
                              <span>
                                Possession:{" "}
                                {new Date(project.completionDate).toLocaleDateString("en-IN", {
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {project.reraNumber}
                            </span>
                          </div>

                          {/* Amenities icons */}
                          {amenities.length > 0 && (
                            <div className="flex items-center gap-3 py-2 border-t border-border">
                              {amenities.map((a, i) => (
                                <div
                                  key={i}
                                  className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors"
                                  title={a.label}
                                >
                                  {a.icon}
                                  <span className="text-[9px]">{a.label}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* AI Highlights */}
                          {meta && (
                            <div className="flex flex-wrap gap-1.5">
                              {meta.highlights.map((h) => (
                                <span
                                  key={h}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                                >
                                  {h}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => toggleSave(project.id)}
                              className={`h-9 w-9 rounded-xl border flex items-center justify-center transition-all flex-shrink-0 ${
                                isSaved
                                  ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
                                  : "bg-muted/40 border-border text-muted-foreground hover:border-rose-500/40 hover:text-rose-400"
                              }`}
                              title={isSaved ? "Saved" : "Save"}
                            >
                              <Heart
                                className="h-4 w-4"
                                fill={isSaved ? "currentColor" : "none"}
                              />
                            </button>

                            <button
                              onClick={() => toggleCompare(project.id)}
                              className={`h-9 w-9 rounded-xl border flex items-center justify-center transition-all flex-shrink-0 ${
                                isComparing
                                  ? "bg-sky-500/20 border-sky-500/40 text-sky-400"
                                  : "bg-muted/40 border-border text-muted-foreground hover:border-sky-500/40 hover:text-sky-400"
                              }`}
                              title="Compare"
                            >
                              <GitCompareArrows className="h-4 w-4" />
                            </button>

                            <Button
                              className="flex-1 h-9 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold gap-1.5 transition-all"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
