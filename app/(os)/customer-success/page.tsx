"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Smile,
  AlertTriangle,
  Ticket,
  Star,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  MessageSquare,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const TOOLTIP_STYLE = {
  fontSize: 12,
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--card-foreground)",
};

const KPI_DATA = [
  {
    label: "NPS Score",
    value: "72",
    sub: "Excellent",
    change: +4,
    icon: Star,
    color: "#6366f1",
  },
  {
    label: "Active Customers",
    value: "1,248",
    sub: "Across 6 projects",
    change: +12,
    icon: Users,
    color: "#22c55e",
  },
  {
    label: "Open Tickets",
    value: "34",
    sub: "8 critical",
    change: -6,
    icon: Ticket,
    color: "#f59e0b",
  },
  {
    label: "Avg Resolution",
    value: "2.4d",
    sub: "SLA: 3 days",
    change: -18,
    icon: Clock,
    color: "#06b6d4",
  },
  {
    label: "Escalations",
    value: "7",
    sub: "This month",
    change: +2,
    icon: AlertTriangle,
    color: "#ec4899",
  },
  {
    label: "CSAT Score",
    value: "88%",
    sub: "Last 30 days",
    change: +3,
    icon: Smile,
    color: "#a78bfa",
  },
];

const SATISFACTION_TREND = [
  { month: "Jan", nps: 61, csat: 78 },
  { month: "Feb", nps: 64, csat: 80 },
  { month: "Mar", nps: 63, csat: 79 },
  { month: "Apr", nps: 67, csat: 83 },
  { month: "May", nps: 65, csat: 81 },
  { month: "Jun", nps: 70, csat: 85 },
  { month: "Jul", nps: 72, csat: 88 },
];

const CUSTOMERS = [
  {
    id: "C001",
    name: "Rajesh Kumar",
    unit: "A-201, Prestige Heights",
    project: "Prestige Heights",
    healthScore: 92,
    lastInteraction: "2 days ago",
    openTickets: 0,
    status: "Healthy",
    nps: "Promoter",
  },
  {
    id: "C002",
    name: "Priya Sharma",
    unit: "B-304, Emerald Bay",
    project: "Emerald Bay",
    healthScore: 74,
    lastInteraction: "5 days ago",
    openTickets: 2,
    status: "At Risk",
    nps: "Passive",
  },
  {
    id: "C003",
    name: "Deepak Agarwal",
    unit: "C-102, Skyline Residences",
    project: "Skyline Residences",
    healthScore: 55,
    lastInteraction: "12 days ago",
    openTickets: 3,
    status: "Critical",
    nps: "Detractor",
  },
  {
    id: "C004",
    name: "Sunita Mehta",
    unit: "D-410, Green Valley",
    project: "Green Valley",
    healthScore: 88,
    lastInteraction: "1 day ago",
    openTickets: 1,
    status: "Healthy",
    nps: "Promoter",
  },
  {
    id: "C005",
    name: "Arjun Nair",
    unit: "E-205, Marina Cove",
    project: "Marina Cove",
    healthScore: 68,
    lastInteraction: "8 days ago",
    openTickets: 2,
    status: "At Risk",
    nps: "Passive",
  },
  {
    id: "C006",
    name: "Kavitha Reddy",
    unit: "F-308, Lakeside Villas",
    project: "Lakeside Villas",
    healthScore: 95,
    lastInteraction: "3 hours ago",
    openTickets: 0,
    status: "Healthy",
    nps: "Promoter",
  },
  {
    id: "C007",
    name: "Vikram Singh",
    unit: "A-509, Prestige Heights",
    project: "Prestige Heights",
    healthScore: 44,
    lastInteraction: "18 days ago",
    openTickets: 5,
    status: "Critical",
    nps: "Detractor",
  },
];

const ESCALATIONS = [
  {
    id: "ESC-001",
    customer: "Deepak Agarwal",
    unit: "C-102",
    issue: "Seepage in master bedroom — 3rd report unanswered",
    raised: "Jul 18, 2026",
    priority: "High",
    assignedTo: "Rahul Khanna",
    status: "Open",
  },
  {
    id: "ESC-002",
    customer: "Vikram Singh",
    unit: "A-509",
    issue: "Elevator non-functional for 5 days",
    raised: "Jul 15, 2026",
    priority: "Critical",
    assignedTo: "Nikhil Joshi",
    status: "In Progress",
  },
  {
    id: "ESC-003",
    customer: "Priya Sharma",
    unit: "B-304",
    issue: "OC certificate copy not delivered post possession",
    raised: "Jul 12, 2026",
    priority: "Medium",
    assignedTo: "Riya Kapoor",
    status: "Open",
  },
  {
    id: "ESC-004",
    customer: "Arjun Nair",
    unit: "E-205",
    issue: "Handover punch-list items still pending",
    raised: "Jul 10, 2026",
    priority: "High",
    assignedTo: "Rahul Khanna",
    status: "In Progress",
  },
];

const TICKET_STATS = [
  { label: "Open", count: 34, color: "#f59e0b", icon: Clock },
  { label: "In Progress", count: 18, color: "#6366f1", icon: ArrowUpRight },
  { label: "Resolved", count: 142, color: "#22c55e", icon: CheckCircle2 },
  { label: "Closed", count: 89, color: "#94a3b8", icon: XCircle },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function healthColor(score: number) {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

function statusBadgeVariant(status: string) {
  if (status === "Healthy") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (status === "At Risk") return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
}

function priorityBadge(priority: string) {
  if (priority === "Critical")
    return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
  if (priority === "High")
    return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
  return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
}

function escalationStatusBadge(status: string) {
  if (status === "In Progress")
    return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";
  return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
}

function npsBadge(nps: string) {
  if (nps === "Promoter") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (nps === "Passive") return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2);
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CustomerSuccessPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Customer Success</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Health monitoring, escalations &amp; satisfaction tracking
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
              <Download className="w-3.5 h-3.5" />
              Export
            </Button>
          </div>
        </div>

        {/* ── KPI Row ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {KPI_DATA.map((kpi) => {
            const Icon = kpi.icon;
            const isPositive = kpi.change > 0;
            const isGoodUp =
              kpi.label === "Active Customers" ||
              kpi.label === "NPS Score" ||
              kpi.label === "CSAT Score";
            const good = isGoodUp ? isPositive : !isPositive;
            return (
              <Card key={kpi.label} className="py-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground truncate">{kpi.label}</p>
                      <p className="text-2xl font-bold tracking-tight mt-1">{kpi.value}</p>
                      <p className="text-[10px] text-muted-foreground truncate mt-0.5">{kpi.sub}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        {good ? (
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-rose-500" />
                        )}
                        <span
                          className={`text-[10px] font-medium ${
                            good
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {kpi.change > 0 ? "+" : ""}
                          {kpi.change}%
                        </span>
                      </div>
                    </div>
                    <div
                      className="p-2 rounded-lg shrink-0"
                      style={{ background: kpi.color + "18" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ── Ticket Status Strip ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TICKET_STATS.map((t) => {
            const Icon = t.icon;
            return (
              <Card key={t.label} className="py-0">
                <CardContent className="p-4 flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-lg shrink-0"
                    style={{ background: t.color + "18" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: t.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{t.label} Tickets</p>
                    <p className="text-xl font-bold tracking-tight" style={{ color: t.color }}>
                      {t.count}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
          <TabsList>
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="customers" className="text-xs">
              Customer List
            </TabsTrigger>
            <TabsTrigger value="escalations" className="text-xs">
              Escalations
              <span className="ml-1.5 bg-rose-500 text-white text-[9px] rounded-full px-1.5 py-0.5 font-semibold">
                {ESCALATIONS.length}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* ── Overview: Satisfaction Trend ── */}
          <TabsContent value="overview" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-sm font-semibold">
                      Satisfaction Trend
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      NPS &amp; CSAT monthly trend — Jan to Jul 2026
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: "#6366f1" }}
                      />
                      NPS
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: "#22c55e" }}
                      />
                      CSAT %
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart
                    data={SATISFACTION_TREND}
                    margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="color-mix(in oklch, var(--border), transparent 30%)"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                      domain={[50, 100]}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="nps"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ fill: "#6366f1", r: 4 }}
                      name="NPS Score"
                    />
                    <Line
                      type="monotone"
                      dataKey="csat"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ fill: "#22c55e", r: 4 }}
                      name="CSAT %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* NPS Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Promoters", pct: 62, count: 773, color: "#22c55e", desc: "Score 9–10" },
                { label: "Passives", pct: 21, count: 262, color: "#f59e0b", desc: "Score 7–8" },
                { label: "Detractors", pct: 17, count: 213, color: "#ef4444", desc: "Score 0–6" },
              ].map((seg) => (
                <Card key={seg.label} className="py-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-muted-foreground">
                        {seg.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{seg.desc}</span>
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-bold" style={{ color: seg.color }}>
                        {seg.pct}%
                      </span>
                      <span className="text-sm text-muted-foreground mb-0.5">
                        {seg.count} customers
                      </span>
                    </div>
                    <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${seg.pct}%`, background: seg.color }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ── Customer List ── */}
          <TabsContent value="customers" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold">Customer Health</CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      Health score, last interaction &amp; open tickets per customer
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground gap-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    Bulk Message
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {[
                          "Customer",
                          "Project / Unit",
                          "Health Score",
                          "Last Interaction",
                          "Open Tickets",
                          "Status",
                          "NPS",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CUSTOMERS.map((c) => {
                        const hc = healthColor(c.healthScore);
                        return (
                          <tr
                            key={c.id}
                            className="border-b border-border/50 hover:bg-muted/40 transition-colors"
                          >
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2.5">
                                <Avatar className="w-7 h-7 shrink-0">
                                  <AvatarFallback
                                    className="text-[10px] font-semibold"
                                    style={{
                                      background: "#6366f115",
                                      color: "#6366f1",
                                    }}
                                  >
                                    {initials(c.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-xs font-medium text-foreground">
                                    {c.name}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground">{c.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2.5">
                              <p className="text-xs text-foreground">{c.project}</p>
                              <p className="text-[10px] text-muted-foreground">{c.unit}</p>
                            </td>
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      width: `${c.healthScore}%`,
                                      background: hc,
                                    }}
                                  />
                                </div>
                                <span
                                  className="text-[11px] font-semibold tabular-nums"
                                  style={{ color: hc }}
                                >
                                  {c.healthScore}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                              {c.lastInteraction}
                            </td>
                            <td className="px-4 py-2.5">
                              <span
                                className={`text-xs font-semibold ${
                                  c.openTickets > 0
                                    ? "text-amber-600 dark:text-amber-400"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {c.openTickets}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span
                                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusBadgeVariant(
                                  c.status
                                )}`}
                              >
                                {c.status}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span
                                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${npsBadge(
                                  c.nps
                                )}`}
                              >
                                {c.nps}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Escalations ── */}
          <TabsContent value="escalations" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Recent Escalations</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  High-priority issues requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {[
                          "ID",
                          "Customer",
                          "Issue",
                          "Raised",
                          "Priority",
                          "Assigned To",
                          "Status",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ESCALATIONS.map((e) => (
                        <tr
                          key={e.id}
                          className="border-b border-border/50 hover:bg-muted/40 transition-colors"
                        >
                          <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                            {e.id}
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-xs font-medium text-foreground">{e.customer}</p>
                            <p className="text-[10px] text-muted-foreground">{e.unit}</p>
                          </td>
                          <td className="px-4 py-3 text-xs text-foreground max-w-[260px]">
                            {e.issue}
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                            {e.raised}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${priorityBadge(
                                e.priority
                              )}`}
                            >
                              {e.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                            {e.assignedTo}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${escalationStatusBadge(
                                e.status
                              )}`}
                            >
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
