"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Building2,
  MapPin,
  Calendar,
  TrendingUp,
  Home,
  BarChart3,
  Wallet,
  ArrowUpRight,
  LayoutGrid,
  List,
  IndianRupee,
  CheckCircle2,
  Clock,
  ShieldCheck,
  HardHat,
  Layers,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { projects } from "@/lib/mock-data";
import type { Project } from "@/types";

// ─── Status config ──────────────────────────────────────────────────────────

const statusConfig: Record<
  string,
  { label: string; className: string; dotClass: string; Icon: React.ElementType }
> = {
  "Under Construction": {
    label: "Under Construction",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border-0",
    dotClass: "bg-blue-500",
    Icon: HardHat,
  },
  "Ready to Move": {
    label: "Ready to Move",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-0",
    dotClass: "bg-emerald-500",
    Icon: CheckCircle2,
  },
  Planning: {
    label: "Planning",
    className:
      "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400 border-0",
    dotClass: "bg-slate-400",
    Icon: Clock,
  },
  Approved: {
    label: "Approved",
    className:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400 border-0",
    dotClass: "bg-violet-500",
    Icon: ShieldCheck,
  },
  Completed: {
    label: "Completed",
    className:
      "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400 border-0",
    dotClass: "bg-teal-500",
    Icon: CheckCircle2,
  },
  "On Hold": {
    label: "On Hold",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-0",
    dotClass: "bg-amber-400",
    Icon: Clock,
  },
};

const typeColors: Record<string, string> = {
  Residential:
    "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200/60 dark:border-blue-500/20",
  Commercial:
    "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200/60 dark:border-purple-500/20",
  Plots:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20",
  Villas:
    "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400 border-teal-200/60 dark:border-teal-500/20",
  "Mixed-use":
    "bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400 border-pink-200/60 dark:border-pink-500/20",
  Township:
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-500/20",
};

const projectAvatarBg: Record<string, string> = {
  Residential: "bg-blue-500",
  Commercial: "bg-purple-600",
  Plots: "bg-amber-500",
  Villas: "bg-teal-600",
  "Mixed-use": "bg-pink-600",
  Township: "bg-indigo-600",
};

// ─── KPI data ────────────────────────────────────────────────────────────────

const kpis = [
  {
    id: "total",
    title: "Total Projects",
    value: "5",
    sub: "All portfolios",
    change: 0,
    changeLabel: "",
    icon: Building2,
    color: "blue" as const,
  },
  {
    id: "active",
    title: "Active",
    value: "3",
    sub: "Under construction",
    change: 0,
    changeLabel: "",
    icon: TrendingUp,
    color: "orange" as const,
  },
  {
    id: "sold",
    title: "Units Sold",
    value: "555",
    sub: "Across all projects",
    change: 8.2,
    changeLabel: "vs last FY",
    icon: Home,
    color: "green" as const,
  },
  {
    id: "revenue",
    title: "Total Revenue",
    value: "₹184 Cr",
    sub: "All time",
    change: 12.4,
    changeLabel: "vs last FY",
    icon: BarChart3,
    color: "purple" as const,
  },
  {
    id: "collections",
    title: "Collections",
    value: "₹118 Cr",
    sub: "Amount collected",
    change: 6.1,
    changeLabel: "vs last month",
    icon: Wallet,
    color: "teal" as const,
  },
];

const kpiColorMap = {
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    icon: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200/40 dark:border-blue-500/20",
  },
  orange: {
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    icon: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200/40 dark:border-orange-500/20",
  },
  green: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    icon: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200/40 dark:border-emerald-500/20",
  },
  purple: {
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    icon: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200/40 dark:border-violet-500/20",
  },
  teal: {
    bg: "bg-teal-500/10 dark:bg-teal-500/15",
    icon: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200/40 dark:border-teal-500/20",
  },
};

// ─── Project Card ────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status] || statusConfig["Planning"];
  const revPct =
    project.totalRevenue > 0
      ? Math.round((project.collectedRevenue / project.totalRevenue) * 100)
      : 0;
  const initials = project.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const avatarBg = projectAvatarBg[project.type] || "bg-slate-500";

  return (
    <Card className="group overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border-border/60">
      {/* Card top strip */}
      <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/30" />

      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          {/* Avatar + name */}
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className={`h-10 w-10 rounded-lg shrink-0 ${avatarBg}`}>
              <AvatarFallback className="rounded-lg bg-transparent text-white text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <CardTitle className="text-sm font-semibold text-foreground leading-tight truncate">
                {project.name}
              </CardTitle>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate">
                  {project.location.city}, {project.location.state}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-1.5 flex-wrap mt-2">
          <Badge
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${status.className}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1 inline-block ${status.dotClass}`}
            />
            {status.label}
          </Badge>
          <Badge
            variant="outline"
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColors[project.type] || ""}`}
          >
            {project.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-3">
        {/* Construction progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
              Construction
            </span>
            <span className="text-[11px] font-semibold text-foreground">
              {project.constructionProgress}%
            </span>
          </div>
          <Progress value={project.constructionProgress} className="h-1.5" />
        </div>

        {/* Unit stats */}
        <div className="grid grid-cols-4 gap-1">
          {[
            {
              label: "Total",
              value: project.totalUnits,
              color: "text-foreground",
              bg: "bg-muted/60",
            },
            {
              label: "Sold",
              value: project.soldUnits,
              color: "text-emerald-600 dark:text-emerald-400",
              bg: "bg-emerald-50 dark:bg-emerald-500/10",
            },
            {
              label: "Avail",
              value: project.availableUnits,
              color: "text-blue-600 dark:text-blue-400",
              bg: "bg-blue-50 dark:bg-blue-500/10",
            },
            {
              label: "Hold",
              value: project.blockedUnits,
              color: "text-amber-600 dark:text-amber-400",
              bg: "bg-amber-50 dark:bg-amber-500/10",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`${s.bg} rounded-md px-1.5 py-2 text-center`}
            >
              <p className={`text-sm font-bold leading-none ${s.color}`}>
                {s.value}
              </p>
              <p className="text-[9px] text-muted-foreground mt-1 uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Revenue collections */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <IndianRupee className="w-2.5 h-2.5" />
              <span className="font-medium uppercase tracking-wide">
                Collections
              </span>
            </div>
            <span className="text-[11px] font-semibold text-foreground">
              ₹{(project.collectedRevenue / 10000000).toFixed(0)} Cr
              <span className="text-muted-foreground font-normal">
                {" "}
                / ₹{(project.totalRevenue / 10000000).toFixed(0)} Cr
              </span>
            </span>
          </div>
          <Progress
            value={revPct}
            className="h-1.5 [&>div]:bg-emerald-500 dark:[&>div]:bg-emerald-400"
          />
          <p className="text-[10px] text-muted-foreground text-right">
            {revPct}% collected
          </p>
        </div>

        {/* Dates + RERA */}
        <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-2.5 h-2.5" />
            {project.launchDate.slice(0, 7)}{" "}
            <span className="text-border">→</span>{" "}
            {project.completionDate.slice(0, 7)}
          </span>
          <span className="font-mono tracking-tight text-[9px] bg-muted/80 px-1.5 py-0.5 rounded">
            {project.reraNumber.length > 14
              ? `${project.reraNumber.slice(0, 14)}…`
              : project.reraNumber}
          </span>
        </div>

        {/* View Details CTA */}
        <Button
          variant="outline"
          size="sm"
          className="w-full h-8 text-xs gap-1.5 group-hover:border-primary/50 group-hover:text-primary transition-colors"
        >
          View Details
          <ArrowUpRight className="w-3 h-3" />
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Table row ───────────────────────────────────────────────────────────────

function ProjectTableRow({ project }: { project: Project }) {
  const status = statusConfig[project.status] || statusConfig["Planning"];
  const revPct =
    project.totalRevenue > 0
      ? Math.round((project.collectedRevenue / project.totalRevenue) * 100)
      : 0;
  const initials = project.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const avatarBg = projectAvatarBg[project.type] || "bg-slate-500";

  return (
    <tr className="border-b border-border/50 hover:bg-muted/40 transition-colors group">
      {/* Project name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className={`h-8 w-8 rounded-md shrink-0 ${avatarBg}`}>
            <AvatarFallback className="rounded-md bg-transparent text-white text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-semibold text-foreground leading-tight">
              {project.name}
            </p>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
              {project.reraNumber.length > 16
                ? `${project.reraNumber.slice(0, 16)}…`
                : project.reraNumber}
            </p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <Badge
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${status.className}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1 inline-block ${status.dotClass}`}
          />
          {status.label}
        </Badge>
      </td>

      {/* Type */}
      <td className="px-4 py-3">
        <Badge
          variant="outline"
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColors[project.type] || ""}`}
        >
          {project.type}
        </Badge>
      </td>

      {/* City */}
      <td className="px-4 py-3">
        <span className="text-xs text-muted-foreground">
          {project.location.city}
        </span>
      </td>

      {/* Units */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {project.soldUnits}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{project.totalUnits}</span>
          <span className="text-[10px] text-muted-foreground">sold</span>
        </div>
      </td>

      {/* Progress */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 min-w-[100px]">
          <Progress
            value={project.constructionProgress}
            className="h-1.5 flex-1"
          />
          <span className="text-[10px] text-muted-foreground w-7 text-right">
            {project.constructionProgress}%
          </span>
        </div>
      </td>

      {/* Revenue */}
      <td className="px-4 py-3">
        <div>
          <p className="text-xs font-semibold text-foreground">
            ₹{(project.collectedRevenue / 10000000).toFixed(0)} Cr
          </p>
          <p className="text-[10px] text-muted-foreground">
            of ₹{(project.totalRevenue / 10000000).toFixed(0)} Cr ({revPct}%)
          </p>
        </div>
      </td>

      {/* Dates */}
      <td className="px-4 py-3 text-[10px] text-muted-foreground whitespace-nowrap">
        {project.launchDate.slice(0, 7)} → {project.completionDate.slice(0, 7)}
      </td>

      {/* Action */}
      <td className="px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          View <ArrowUpRight className="w-3 h-3" />
        </Button>
      </td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const typeFilters = [
    "All",
    "Residential",
    "Commercial",
    "Plots",
    "Villas",
  ];

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(q) ||
      p.location.city.toLowerCase().includes(q) ||
      p.reraNumber.toLowerCase().includes(q);
    const matchType = typeFilter === "All" || p.type === typeFilter;
    return matchSearch && matchType;
  });

  // Derived KPI values from data
  const totalUnits = projects.reduce((s, p) => s + p.totalUnits, 0);
  const soldUnits = projects.reduce((s, p) => s + p.soldUnits, 0);

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-screen-2xl mx-auto">
      {/* ── Page Header ── */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#5956E9] to-[#4338ca] p-5 md:p-6 text-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 85% 30%, rgba(255,255,255,0.9) 0%, transparent 55%)" }} />
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-white/15 items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-0.5">Project Portfolio</div>
              <h1 className="text-lg md:text-xl font-bold">Projects <span className="text-white/60 text-base font-medium">({projects.length})</span></h1>
              <p className="text-sm text-white/60 mt-0.5">Manage and track all Godrej Properties developments</p>
            </div>
          </div>
          <Button size="sm" className="gap-1.5 h-8 bg-white/15 border border-white/20 text-white hover:bg-white/25">
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Project</span>
          </Button>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change > 0;
          // Use legacy card style for the 5-column narrow cards
          const colorMap2: Record<string, string> = {
            blue: "from-blue-500 to-blue-700",
            orange: "from-orange-500 to-amber-600",
            green: "from-emerald-500 to-teal-600",
            purple: "from-violet-500 to-purple-700",
            teal: "from-cyan-500 to-teal-600",
          };
          return (
            <div
              key={kpi.id}
              className={`relative overflow-hidden rounded-xl p-4 text-white bg-gradient-to-br ${colorMap2[kpi.color] || "from-slate-500 to-slate-700"}`}
            >
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-white/10" />
              <div className="flex items-start gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${isPositive ? "bg-white/20" : "bg-black/20"}`}>
                  {isPositive ? "+" : ""}{kpi.change}%
                </span>
              </div>
              <p className="text-xl font-bold leading-none">
                {kpi.id === "sold"
                  ? soldUnits.toString()
                  : kpi.value}
              </p>
              <p className="text-[11px] text-white/70 mt-0.5 truncate">{kpi.title}</p>
              <div className="flex items-center gap-1 mt-1.5">
                {isPositive ? (
                  <ChevronUp className="w-3 h-3 text-white/70" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-white/70" />
                )}
                <span
                  className="text-[10px] text-white/70"
                >
                  {isPositive ? "+" : ""}
                          {kpi.change}%
                        </span>
                        <span className="text-[10px] text-white/60">
                          {kpi.changeLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
      </div>

      {/* ── Search + Filter bar ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative min-w-52 max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search by name, city or RERA…"
            className="pl-9 h-8 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {typeFilters.map((t) => (
            <Button
              key={t}
              variant={typeFilter === t ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs px-3"
              onClick={() => setTypeFilter(t)}
            >
              {t}
            </Button>
          ))}
        </div>
        {filtered.length !== projects.length && (
          <span className="text-xs text-muted-foreground ml-1">
            {filtered.length} of {projects.length} shown
          </span>
        )}
      </div>

      {/* ── Tabs: Grid / Table ── */}
      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="h-8 p-0.5">
            <TabsTrigger value="grid" className="h-7 px-3 text-xs gap-1.5">
              <LayoutGrid className="w-3.5 h-3.5" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="h-7 px-3 text-xs gap-1.5">
              <List className="w-3.5 h-3.5" />
              Table
            </TabsTrigger>
          </TabsList>
          <p className="text-xs text-muted-foreground">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid View */}
        <TabsContent value="grid" className="mt-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Building2 className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                No projects match your filters
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 text-xs"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("All");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Table View */}
        <TabsContent value="table" className="mt-0">
          <Card className="border-border/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {[
                      "Project",
                      "Status",
                      "Type",
                      "City",
                      "Units",
                      "Progress",
                      "Revenue",
                      "Timeline",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2.5"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-16 text-sm text-muted-foreground"
                      >
                        No projects found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <ProjectTableRow key={p.id} project={p} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {filtered.length > 0 && (
              <div className="px-4 py-2.5 border-t border-border/50 bg-muted/20 flex items-center justify-between">
                <p className="text-[11px] text-muted-foreground">
                  Showing {filtered.length} of {projects.length} projects
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Total units:{" "}
                  <span className="font-semibold text-foreground">
                    {filtered.reduce((s, p) => s + p.totalUnits, 0)}
                  </span>{" "}
                  &nbsp;·&nbsp; Sold:{" "}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {filtered.reduce((s, p) => s + p.soldUnits, 0)}
                  </span>
                </p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
