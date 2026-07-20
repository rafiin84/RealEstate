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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  HardHat,
  CheckCircle2,
  Clock,
  Circle,
  AlertCircle,
  Plus,
  User,
  Camera,
  CalendarDays,
  TrendingUp,
  Layers,
  Flag,
  Timer,
  Target,
  ChevronRight,
  MapPin,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { projects, milestones, constructionUpdates } from "@/lib/mock-data";
import { KPICard } from "@/components/dashboard/kpi-card";
import type { Milestone, ConstructionUpdate } from "@/types";

// ─── Milestone Status Config ────────────────────────────────────────────────

const milestoneStatusConfig: Record<
  string,
  {
    Icon: React.ElementType;
    iconClass: string;
    badgeClass: string;
    dotClass: string;
    connectorClass: string;
  }
> = {
  Completed: {
    Icon: CheckCircle2,
    iconClass: "text-emerald-500",
    badgeClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-0",
    dotClass: "bg-emerald-500",
    connectorClass: "bg-emerald-200 dark:bg-emerald-500/30",
  },
  "In Progress": {
    Icon: Clock,
    iconClass: "text-blue-500",
    badgeClass:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border-0",
    dotClass: "bg-blue-500",
    connectorClass: "bg-blue-200 dark:bg-blue-500/30",
  },
  Pending: {
    Icon: Circle,
    iconClass: "text-muted-foreground",
    badgeClass:
      "bg-muted text-muted-foreground border-0",
    dotClass: "bg-muted-foreground/40",
    connectorClass: "bg-border",
  },
  Delayed: {
    Icon: AlertCircle,
    iconClass: "text-rose-500",
    badgeClass:
      "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border-0",
    dotClass: "bg-rose-500",
    connectorClass: "bg-rose-200 dark:bg-rose-500/30",
  },
};

// ─── Phase breakdown data (aligned with 62% progress) ────────────────────────

const phaseBreakdown = [
  { label: "Foundation", pct: 100, color: "bg-emerald-500" },
  { label: "Structure L1-5", pct: 100, color: "bg-emerald-500" },
  { label: "Structure L6-10", pct: 100, color: "bg-emerald-500" },
  { label: "Structure L11-15", pct: 45, color: "bg-blue-500" },
  { label: "Brick Work", pct: 0, color: "bg-muted-foreground/20" },
  { label: "Finish & Handover", pct: 0, color: "bg-muted-foreground/20" },
];

// ─── Milestone Timeline Row ─────────────────────────────────────────────────

function MilestoneRow({
  milestone,
  isLast,
  index,
}: {
  milestone: Milestone;
  isLast: boolean;
  index: number;
}) {
  const cfg =
    milestoneStatusConfig[milestone.status as keyof typeof milestoneStatusConfig] ??
    milestoneStatusConfig["Pending"];
  const { Icon, iconClass, badgeClass, connectorClass } = cfg;

  return (
    <div className="flex gap-4 group">
      {/* Icon + connector line */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ring-4 ring-background ${
            milestone.status === "Completed"
              ? "bg-emerald-100 dark:bg-emerald-500/15"
              : milestone.status === "In Progress"
              ? "bg-blue-100 dark:bg-blue-500/15"
              : milestone.status === "Delayed"
              ? "bg-rose-100 dark:bg-rose-500/15"
              : "bg-muted"
          }`}
        >
          <Icon className={`w-4 h-4 ${iconClass}`} />
        </div>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 min-h-[2rem] mt-1 ${connectorClass}`}
          />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-6"}`}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-medium text-muted-foreground">
                #{index + 1}
              </span>
              <p className="text-sm font-semibold text-foreground leading-tight">
                {milestone.name}
              </p>
              <Badge className={`text-[10px] px-1.5 h-4 rounded-sm font-medium ${badgeClass}`}>
                {milestone.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {milestone.description}
            </p>
          </div>

          {/* Dates */}
          <div className="text-right shrink-0 space-y-0.5">
            <div>
              <p className="text-[9px] uppercase tracking-wide text-muted-foreground/70 font-medium">
                Planned
              </p>
              <p className="text-xs font-medium text-foreground tabular-nums">
                {milestone.plannedDate}
              </p>
            </div>
            {milestone.actualDate && (
              <div>
                <p className="text-[9px] uppercase tracking-wide text-emerald-600/70 dark:text-emerald-400/70 font-medium">
                  Actual
                </p>
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {milestone.actualDate}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar for in-progress milestones */}
        {milestone.status === "In Progress" && (
          <div className="mt-2.5 space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {milestone.progress}%
              </span>
            </div>
            <div className="relative h-2 bg-blue-100 dark:bg-blue-500/15 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
                style={{ width: `${milestone.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Completed indicator */}
        {milestone.status === "Completed" && (
          <div className="mt-2 flex items-center gap-1.5">
            <div className="h-1.5 flex-1 bg-emerald-500 rounded-full" />
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              100% Complete
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Update Card ─────────────────────────────────────────────────────────────

function UpdateCard({ update }: { update: ConstructionUpdate }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3.5 space-y-2.5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground leading-snug">
            {update.title}
          </p>
          {update.milestone && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 mt-1 h-4 rounded-sm"
            >
              <Layers className="w-2.5 h-2.5 mr-1" />
              {update.milestone}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
          <CalendarDays className="w-3 h-3" />
          {update.date}
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {update.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
            <User className="w-3 h-3" />
          </div>
          <span>{update.postedBy}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-[10px] gap-1 px-2"
          >
            <Camera className="w-3 h-3" />
            Media
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-[10px] px-2"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Radial Progress Chart ───────────────────────────────────────────────────

function RadialProgress({ value }: { value: number }) {
  const data = [{ name: "Progress", value, fill: "url(#progressGradient)" }];
  return (
    <div className="relative w-36 h-36 shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="72%"
          outerRadius="100%"
          startAngle={220}
          endAngle={-40}
          data={data}
          barSize={12}
        >
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: "var(--muted)" }}
            dataKey="value"
            cornerRadius={6}
            angleAxisId={0}
          />
          <Tooltip
            formatter={(v) => [`${v}%`, "Progress"]}
            contentStyle={{ fontSize: "11px" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-foreground tabular-nums">
          {value}%
        </span>
        <span className="text-[10px] text-muted-foreground font-medium">
          Complete
        </span>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ConstructionPage() {
  const [selectedProjectId, setSelectedProjectId] = useState("proj-001");

  const project = projects.find((p) => p.id === selectedProjectId);
  const projectMilestones = milestones.filter(
    (m) => m.projectId === selectedProjectId
  );
  const projectUpdates = constructionUpdates.filter(
    (u) => u.projectId === selectedProjectId
  );

  const completedCount = projectMilestones.filter(
    (m) => m.status === "Completed"
  ).length;
  const inProgressCount = projectMilestones.filter(
    (m) => m.status === "In Progress"
  ).length;
  const delayedCount = projectMilestones.filter(
    (m) => m.status === "Delayed"
  ).length;
  const pendingCount = projectMilestones.filter(
    (m) => m.status === "Pending"
  ).length;
  const onTimeCount = completedCount; // completed on time = all completed (no delayed in data)
  const upcomingCount = pendingCount;

  // Working days elapsed (launch to today — rough business days calc)
  const launchDateStr = project?.launchDate ?? "2023-06-15";
  const launchDate = new Date(launchDateStr);
  const today = new Date("2026-07-20");
  const totalDays = Math.floor(
    (today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const workingDays = Math.floor(totalDays * (5 / 7));

  // Completion forecast (linear extrapolation)
  const progress = project?.constructionProgress ?? 0;
  const remaining = 100 - progress;
  const daysToComplete =
    progress > 0 ? Math.round((totalDays / progress) * remaining) : 0;
  const forecastDate = new Date(today.getTime() + daysToComplete * 86400000);
  const forecastStr = forecastDate.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="p-6 space-y-6">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/15 flex items-center justify-center">
            <HardHat className="w-4.5 h-4.5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              Construction
            </h1>
            {project && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {project.location.city}, {project.location.state}
                <ChevronRight className="w-3 h-3 mx-0.5" />
                RERA: {project.reraNumber}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={selectedProjectId}
            onValueChange={(v) => v && setSelectedProjectId(v)}
          >
            <SelectTrigger className="h-9 w-56 text-xs">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  <span className="flex items-center gap-2">
                    <span>{p.name}</span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1 h-4 ml-1"
                    >
                      {p.constructionProgress}%
                    </Badge>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button size="sm" className="h-9 gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />
            Add Update
          </Button>
        </div>
      </div>

      {project && (
        <>
          {/* ── KPI Row ────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KPICard
              title="Overall Progress"
              value={`${project.constructionProgress}%`}
              subtitle="Construction complete"
              change={4.2}
              changeLabel="vs last month"
              icon={<TrendingUp className="w-5 h-5" />}
              color="blue"
            />
            <KPICard
              title="On-time Milestones"
              value={`${onTimeCount}/${projectMilestones.length}`}
              subtitle="Completed on schedule"
              change={0}
              changeLabel="no change"
              icon={<Target className="w-5 h-5" />}
              color="green"
            />
            <KPICard
              title="Delayed"
              value={delayedCount}
              subtitle="Milestones behind schedule"
              change={0}
              changeLabel="no delays"
              icon={<AlertCircle className="w-5 h-5" />}
              color={delayedCount > 0 ? "rose" : "teal"}
            />
            <KPICard
              title="Upcoming"
              value={upcomingCount}
              subtitle="Milestones pending"
              change={0}
              changeLabel="milestones"
              icon={<Flag className="w-5 h-5" />}
              color="orange"
            />
          </div>

          {/* ── Progress Overview Card ──────────────────────────────────────── */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-stretch gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
                {/* Left: radial chart + project info */}
                <div className="flex items-center gap-5 p-5 flex-1">
                  <RadialProgress value={project.constructionProgress} />

                  <div className="flex-1 min-w-0 space-y-3">
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {project.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {project.type} · {project.totalUnits} units ·{" "}
                        {project.location.city}
                      </p>
                    </div>

                    {/* Overall bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground font-medium">
                          Overall Construction Progress
                        </span>
                        <span className="font-bold text-primary">
                          {project.constructionProgress}%
                        </span>
                      </div>
                      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 transition-all duration-700"
                          style={{ width: `${project.constructionProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>
                          Launched:{" "}
                          {new Date(project.launchDate).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </span>
                        <span>
                          Target:{" "}
                          {new Date(project.completionDate).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: phase breakdown */}
                <div className="p-5 w-full md:w-72 space-y-3">
                  <p className="text-xs font-semibold text-foreground">
                    Phase Breakdown
                  </p>
                  <div className="space-y-2.5">
                    {phaseBreakdown.map((phase) => (
                      <div key={phase.label} className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-muted-foreground">
                            {phase.label}
                          </span>
                          <span
                            className={`font-semibold ${
                              phase.pct === 100
                                ? "text-emerald-600 dark:text-emerald-400"
                                : phase.pct > 0
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-muted-foreground"
                            }`}
                          >
                            {phase.pct}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${phase.color}`}
                            style={{ width: `${phase.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Main Grid ──────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Milestones Timeline (3/5 cols) */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-3 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-sm font-semibold">
                        Milestones Timeline
                      </CardTitle>
                      <Badge variant="secondary" className="text-[10px] px-1.5">
                        {projectMilestones.length} total
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* legend */}
                      {[
                        { label: "Done", cls: "bg-emerald-500" },
                        { label: "Active", cls: "bg-blue-500" },
                        { label: "Pending", cls: "bg-muted-foreground/40" },
                      ].map((l) => (
                        <span
                          key={l.label}
                          className="flex items-center gap-1 text-[10px] text-muted-foreground"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${l.cls}`}
                          />
                          {l.label}
                        </span>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs gap-1 ml-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="space-y-0">
                    {projectMilestones.map((m, idx) => (
                      <MilestoneRow
                        key={m.id}
                        milestone={m}
                        isLast={idx === projectMilestones.length - 1}
                        index={idx}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column: Updates + Summary (2/5 cols) */}
            <div className="lg:col-span-2 space-y-5">
              {/* Construction Updates Feed */}
              <Card>
                <CardHeader className="pb-3 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">
                      Site Updates
                    </CardTitle>
                    <Badge variant="secondary" className="text-[10px] px-1.5">
                      {projectUpdates.length} recent
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  {projectUpdates.length > 0 ? (
                    projectUpdates.map((update) => (
                      <UpdateCard key={update.id} update={update} />
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-muted-foreground">
                      No updates yet for this project.
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 text-xs gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Post New Update
                  </Button>
                </CardContent>
              </Card>

              {/* Summary Stats Card */}
              <Card>
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold">
                    Project Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-1">
                  {[
                    {
                      label: "Working Days Elapsed",
                      value: workingDays.toLocaleString("en-IN"),
                      icon: Timer,
                      valueClass: "text-foreground",
                    },
                    {
                      label: "Total Milestones",
                      value: String(projectMilestones.length),
                      icon: Layers,
                      valueClass: "text-foreground",
                    },
                    {
                      label: "Completed",
                      value: String(completedCount),
                      icon: CheckCircle2,
                      valueClass:
                        "text-emerald-600 dark:text-emerald-400",
                    },
                    {
                      label: "In Progress",
                      value: String(inProgressCount),
                      icon: Clock,
                      valueClass: "text-blue-600 dark:text-blue-400",
                    },
                    {
                      label: "Pending",
                      value: String(pendingCount),
                      icon: Circle,
                      valueClass: "text-muted-foreground",
                    },
                    {
                      label: "Delayed",
                      value: String(delayedCount),
                      icon: AlertCircle,
                      valueClass:
                        delayedCount > 0
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-muted-foreground",
                    },
                  ].map((row, i) => (
                    <div key={row.label}>
                      {i > 0 && <Separator className="my-1.5" />}
                      <div className="flex items-center justify-between py-0.5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <row.icon className="w-3.5 h-3.5 shrink-0" />
                          {row.label}
                        </div>
                        <span
                          className={`text-xs font-semibold ${row.valueClass}`}
                        >
                          {row.value}
                        </span>
                      </div>
                    </div>
                  ))}

                  <Separator className="my-2" />

                  {/* Completion forecast */}
                  <div className="rounded-md bg-primary/5 border border-primary/10 p-3 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <CalendarDays className="w-3.5 h-3.5 text-primary" />
                      Completion Forecast
                    </div>
                    <p className="text-lg font-bold text-primary">
                      {forecastStr}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Based on current pace · Target:{" "}
                      {new Date(project.completionDate).toLocaleDateString(
                        "en-IN",
                        { month: "short", year: "numeric" }
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
