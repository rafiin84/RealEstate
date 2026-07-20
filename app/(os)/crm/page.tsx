"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  User,
  TrendingUp,
  Plus,
  Filter,
  Search,
  Star,
  Clock,
  MapPin,
  Zap,
  IndianRupee,
  Building2,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { leads, teamMembers } from "@/lib/mock-data";
import { KPICard } from "@/components/dashboard/kpi-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import type { Lead, LeadStatus, LeadSource } from "@/types";

// ─── Color Maps ────────────────────────────────────────────────────────────

const sourceColors: Record<string, string> = {
  Website:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  "Channel Partner":
    "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
  Referral:
    "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400",
  "Facebook Ads":
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400",
  "Google Ads":
    "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
  "Walk-in":
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  "Social Media":
    "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400",
  IVR: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-400",
  Event:
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
  Billboard:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  WhatsApp:
    "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
};

const statusMap: Record<string, string> = {
  New: "new",
  Contacted: "contacted",
  "Site Visit Scheduled": "site-visit",
  "Site Visit Done": "site-visit",
  Negotiation: "negotiation",
  Hot: "hot",
  Booked: "booked",
  Lost: "lost",
  "On Hold": "blocked",
};

// Kanban column definitions
const kanbanColumns: { id: string; label: string; statuses: LeadStatus[] }[] = [
  { id: "new", label: "New", statuses: ["New"] },
  { id: "contacted", label: "Contacted", statuses: ["Contacted"] },
  {
    id: "site-visit",
    label: "Site Visit",
    statuses: ["Site Visit Scheduled", "Site Visit Done"],
  },
  { id: "negotiation", label: "Negotiation", statuses: ["Negotiation"] },
  { id: "hot", label: "Hot", statuses: ["Hot"] },
  { id: "booked", label: "Booked", statuses: ["Booked"] },
  { id: "lost", label: "Lost", statuses: ["Lost"] },
];

const kanbanColumnColors: Record<string, string> = {
  new: "border-t-blue-500",
  contacted: "border-t-teal-500",
  "site-visit": "border-t-violet-500",
  negotiation: "border-t-orange-500",
  hot: "border-t-rose-500",
  booked: "border-t-emerald-500",
  lost: "border-t-slate-400",
};

// ─── Score Badge ───────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const colorClass =
    score >= 80
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
      : score >= 60
      ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
      : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400";

  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${score}%`,
            background:
              score >= 80
                ? "#22c55e"
                : score >= 60
                ? "#f59e0b"
                : "#ef4444",
          }}
        />
      </div>
      <span
        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${colorClass}`}
      >
        {score}
      </span>
    </div>
  );
}

// ─── Assigned To Cell ──────────────────────────────────────────────────────

function AssignedToCell({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
  return (
    <div className="flex items-center gap-1.5">
      <Avatar className="w-5 h-5 shrink-0">
        <AvatarFallback className="text-[9px] bg-primary/10 text-primary font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

// ─── Kanban Card ───────────────────────────────────────────────────────────

function KanbanCard({ lead }: { lead: Lead }) {
  const initials = lead.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const assigneeInitials = lead.assignedTo
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="bg-card border border-border rounded-lg p-3 space-y-2.5 hover:shadow-md transition-all cursor-pointer group">
      {/* Lead name + score */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar className="w-7 h-7 shrink-0">
            <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate leading-tight">
              {lead.name}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {lead.phone}
            </p>
          </div>
        </div>
        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
            lead.score >= 80
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
              : lead.score >= 60
              ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
              : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"
          }`}
        >
          {lead.score}
        </span>
      </div>

      {/* Project */}
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <Building2 className="w-3 h-3 shrink-0" />
        <span className="truncate">{lead.interestedIn}</span>
      </div>

      {/* Budget */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">
          ₹{(lead.budget / 10000000).toFixed(1)} Cr
        </span>
        <Badge
          className={`text-[9px] border-0 px-1.5 py-0 h-4 ${
            sourceColors[lead.source] || ""
          }`}
        >
          {lead.source}
        </Badge>
      </div>

      {/* Assigned + Follow-up */}
      <div className="flex items-center justify-between pt-0.5 border-t border-border/50">
        <div className="flex items-center gap-1">
          <Avatar className="w-4 h-4 shrink-0">
            <AvatarFallback className="text-[8px] bg-muted text-muted-foreground">
              {assigneeInitials}
            </AvatarFallback>
          </Avatar>
          <span className="text-[10px] text-muted-foreground truncate max-w-[70px]">
            {lead.assignedTo}
          </span>
        </div>
        {lead.nextFollowUp !== "-" && (
          <div className="flex items-center gap-0.5 text-[9px] text-amber-600 dark:text-amber-400">
            <Clock className="w-2.5 h-2.5" />
            <span>{lead.nextFollowUp.split("-").slice(1).join("/")}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── All Leads Source Options ──────────────────────────────────────────────

const ALL_SOURCES: LeadSource[] = [
  "Website",
  "Walk-in",
  "Referral",
  "Channel Partner",
  "Social Media",
  "Facebook Ads",
  "Google Ads",
  "IVR",
  "Event",
  "Billboard",
  "WhatsApp",
];

const ALL_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Site Visit Scheduled",
  "Site Visit Done",
  "Negotiation",
  "Hot",
  "Booked",
  "Lost",
  "On Hold",
];

// ─── Page ─────────────────────────────────────────────────────────────────

export default function CRMPage() {
  const [search, setSearch] = useState("");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [tab, setTab] = useState("all");

  const filtered = leads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.interestedIn.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search);
    const matchSource =
      filterSource === "all" || l.source === filterSource;
    const matchStatus =
      filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchSource && matchStatus;
  });

  const siteVisitLeads = leads.filter(
    (l) =>
      l.status === "Site Visit Scheduled" || l.status === "Site Visit Done"
  );

  const myLeads = leads.filter((l) => l.assignedTo === "Vikram Singh");

  return (
    <div className="p-6 space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            CRM &amp; Leads
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage leads, track pipeline, and close deals faster.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="pl-8 h-8 text-xs w-52"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter by Source */}
          <Select value={filterSource} onValueChange={(v) => v && setFilterSource(v)}>
            <SelectTrigger className="h-8 text-xs w-36 gap-1">
              <Filter className="w-3 h-3 text-muted-foreground" />
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                All Sources
              </SelectItem>
              {ALL_SOURCES.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter by Status */}
          <Select value={filterStatus} onValueChange={(v) => v && setFilterStatus(v)}>
            <SelectTrigger className="h-8 text-xs w-40 gap-1">
              <Zap className="w-3 h-3 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                All Statuses
              </SelectItem>
              {ALL_STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />
            New Lead
          </Button>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KPICard
          title="Total Leads"
          value="1,248"
          subtitle="Across all projects"
          change={18.7}
          changeLabel="vs last month"
          icon={<Users className="w-5 h-5" />}
          color="blue"
        />
        <KPICard
          title="New Today"
          value="32"
          subtitle="Added today"
          change={6.7}
          changeLabel="vs yesterday"
          icon={<Zap className="w-5 h-5" />}
          color="green"
        />
        <KPICard
          title="Site Visits"
          value="142"
          subtitle="This month"
          change={22.5}
          changeLabel="vs last month"
          icon={<MapPin className="w-5 h-5" />}
          color="purple"
        />
        <KPICard
          title="Conversions"
          value="34"
          subtitle="Bookings done"
          change={-5.6}
          changeLabel="vs last month"
          icon={<TrendingUp className="w-5 h-5" />}
          color="teal"
        />
        <KPICard
          title="Pipeline Value"
          value="₹42 Cr"
          subtitle="Active pipeline"
          change={14.2}
          changeLabel="vs last month"
          icon={<IndianRupee className="w-5 h-5" />}
          color="orange"
        />
      </div>

      {/* ── Tabs ── */}
      <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
        <TabsList className="h-8 bg-muted/60">
          <TabsTrigger value="all" className="text-xs h-7 px-3">
            All Leads
            <Badge
              variant="secondary"
              className="ml-1.5 text-[9px] h-4 px-1 min-w-[18px]"
            >
              {leads.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="kanban" className="text-xs h-7 px-3">
            Kanban
          </TabsTrigger>
          <TabsTrigger value="my" className="text-xs h-7 px-3">
            My Leads
            <Badge
              variant="secondary"
              className="ml-1.5 text-[9px] h-4 px-1 min-w-[18px]"
            >
              {myLeads.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="visits" className="text-xs h-7 px-3">
            Site Visits
            <Badge
              variant="secondary"
              className="ml-1.5 text-[9px] h-4 px-1 min-w-[18px]"
            >
              {siteVisitLeads.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* ── All Leads Table ── */}
        <TabsContent value="all" className="mt-4">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {[
                      "Lead",
                      "Project Interested",
                      "Budget",
                      "Source",
                      "Status",
                      "AI Score",
                      "Assigned To",
                      "Next Follow-up",
                      "Last Activity",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2.5 whitespace-nowrap uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center py-12 text-sm text-muted-foreground"
                      >
                        No leads match your filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((lead) => (
                      <tr
                        key={lead.id}
                        className="hover:bg-muted/20 transition-colors group cursor-pointer"
                      >
                        {/* Lead name + email */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar className="w-7 h-7 shrink-0">
                              <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
                                {lead.name
                                  .split(" ")
                                  .map((w) => w[0])
                                  .join("")
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                                {lead.name}
                              </p>
                              <p className="text-[10px] text-muted-foreground truncate max-w-[140px]">
                                {lead.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Project */}
                        <td className="px-4 py-3">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {lead.interestedIn}
                          </span>
                        </td>

                        {/* Budget */}
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                            ₹{(lead.budget / 10000000).toFixed(1)} Cr
                          </span>
                        </td>

                        {/* Source badge */}
                        <td className="px-4 py-3">
                          <Badge
                            className={`text-[10px] border-0 px-2 py-0.5 whitespace-nowrap font-medium ${
                              sourceColors[lead.source] || ""
                            }`}
                          >
                            {lead.source}
                          </Badge>
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-3">
                          <StatusBadge
                            status={statusMap[lead.status] || "new"}
                            label={lead.status}
                          />
                        </td>

                        {/* AI Score */}
                        <td className="px-4 py-3">
                          <ScoreBadge score={lead.score} />
                        </td>

                        {/* Assigned To */}
                        <td className="px-4 py-3">
                          <AssignedToCell name={lead.assignedTo} />
                        </td>

                        {/* Next Follow-up */}
                        <td className="px-4 py-3">
                          {lead.nextFollowUp !== "-" ? (
                            <span className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 whitespace-nowrap">
                              <Clock className="w-3 h-3 shrink-0" />
                              {lead.nextFollowUp}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          )}
                        </td>

                        {/* Last Activity */}
                        <td className="px-4 py-3">
                          <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                            {lead.lastActivity}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-emerald-600"
                              title="Call"
                            >
                              <Phone className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-blue-600"
                              title="Message"
                            >
                              <MessageSquare className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-violet-600"
                              title="Schedule"
                            >
                              <Calendar className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground"
                            >
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="border-t border-border px-4 py-2.5 flex items-center justify-between bg-muted/10">
              <span className="text-[11px] text-muted-foreground">
                Showing {filtered.length} of {leads.length} leads
              </span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-6 text-xs" disabled>
                  Previous
                </Button>
                <Button variant="ghost" size="sm" className="h-6 text-xs" disabled>
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ── Kanban ── */}
        <TabsContent value="kanban" className="mt-4">
          <div className="flex gap-3 overflow-x-auto pb-4 items-start">
            {kanbanColumns.map((col) => {
              const colLeads = leads.filter((l) =>
                col.statuses.includes(l.status as LeadStatus)
              );
              const pipelineValue = colLeads.reduce(
                (sum, l) => sum + l.budget,
                0
              );

              return (
                <div key={col.id} className="flex-shrink-0 w-60">
                  {/* Column header */}
                  <div
                    className={`bg-card border border-border rounded-lg border-t-2 ${kanbanColumnColors[col.id]} mb-2`}
                  >
                    <div className="px-3 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">
                          {col.label}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 h-4 min-w-[18px] text-center"
                        >
                          {colLeads.length}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-muted-foreground"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    {pipelineValue > 0 && (
                      <div className="px-3 pb-2 flex items-center gap-1 text-[10px] text-muted-foreground border-t border-border/40 pt-1.5">
                        <IndianRupee className="w-2.5 h-2.5" />
                        <span>
                          ₹
                          {pipelineValue >= 10000000
                            ? `${(pipelineValue / 10000000).toFixed(1)} Cr`
                            : `${(pipelineValue / 100000).toFixed(0)} L`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Cards */}
                  <div className="space-y-2 min-h-16 rounded-lg">
                    {colLeads.length === 0 ? (
                      <div className="border-2 border-dashed border-border/40 rounded-lg h-16 flex items-center justify-center">
                        <span className="text-[10px] text-muted-foreground">
                          No leads
                        </span>
                      </div>
                    ) : (
                      colLeads.map((lead) => (
                        <KanbanCard key={lead.id} lead={lead} />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* ── My Leads ── */}
        <TabsContent value="my" className="mt-4">
          <Card className="overflow-hidden">
            <CardHeader className="px-4 py-3 border-b border-border bg-muted/20">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                My Leads — Vikram Singh
                <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                  {myLeads.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/10">
                    {[
                      "Lead",
                      "Project",
                      "Budget",
                      "Status",
                      "AI Score",
                      "Next Follow-up",
                      "Last Activity",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2.5 whitespace-nowrap uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {myLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-muted/20 transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="w-7 h-7 shrink-0">
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
                              {lead.name
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                              {lead.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {lead.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {lead.interestedIn}
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-foreground whitespace-nowrap">
                        ₹{(lead.budget / 10000000).toFixed(1)} Cr
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          status={statusMap[lead.status] || "new"}
                          label={lead.status}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <ScoreBadge score={lead.score} />
                      </td>
                      <td className="px-4 py-3">
                        {lead.nextFollowUp !== "-" ? (
                          <span className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 whitespace-nowrap">
                            <Clock className="w-3 h-3" />
                            {lead.nextFollowUp}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[11px] text-muted-foreground whitespace-nowrap">
                        {lead.lastActivity}
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 text-[11px] px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Follow up
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* ── Site Visits ── */}
        <TabsContent value="visits" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {siteVisitLeads.map((lead) => (
              <Card
                key={lead.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                          {lead.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {lead.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {lead.phone}
                        </p>
                      </div>
                    </div>
                    <StatusBadge
                      status={statusMap[lead.status] || "site-visit"}
                      label={lead.status}
                    />
                  </div>

                  {/* Project + Budget */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{lead.interestedIn}</span>
                    <span className="ml-auto font-semibold text-foreground whitespace-nowrap">
                      ₹{(lead.budget / 10000000).toFixed(1)} Cr
                    </span>
                  </div>

                  {/* Score + Follow-up */}
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3 h-3 text-amber-500" />
                      <ScoreBadge score={lead.score} />
                    </div>
                    {lead.nextFollowUp !== "-" && (
                      <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 ml-auto">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[11px]">{lead.nextFollowUp}</span>
                      </div>
                    )}
                  </div>

                  {/* Assigned to */}
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground border-t border-border/50 pt-2.5">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-[9px] bg-muted text-muted-foreground">
                        {lead.assignedTo
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{lead.assignedTo}</span>
                    <span className="ml-auto text-[10px] text-muted-foreground">
                      {lead.visits} visit{lead.visits !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-0.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-7 text-xs gap-1.5"
                    >
                      <Phone className="w-3 h-3" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-7 text-xs gap-1.5"
                    >
                      <MessageSquare className="w-3 h-3" />
                      WhatsApp
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 h-7 text-xs gap-1.5"
                    >
                      <Calendar className="w-3 h-3" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
