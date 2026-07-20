"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  FileText,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Download,
  Filter,
  Plus,
  Calendar,
  Building2,
  Scale,
  FileBadge,
  ArrowUpRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LegalDoc {
  id: string;
  docType: string;
  project: string;
  docNumber: string;
  issuedBy: string;
  issueDate: string;
  expiryDate: string | null;
  status: "Active" | "Pending" | "Expired" | "Submitted";
  category: "Regulatory" | "Agreement" | "Certificate" | "NOC";
}

interface PendingApproval {
  id: string;
  title: string;
  project: string;
  submittedOn: string;
  authority: string;
  daysElapsed: number;
  priority: "High" | "Medium" | "Low";
}

interface TimelineEvent {
  date: string;
  event: string;
  status: "done" | "current" | "upcoming";
}

// ─── Constants ────────────────────────────────────────────────────────────────

const KPI_DATA = [
  {
    label: "Total Documents",
    value: "84",
    sub: "Across 6 projects",
    icon: FileText,
    color: "#6366f1",
  },
  {
    label: "Active Compliant",
    value: "71",
    sub: "84.5% compliance",
    icon: ShieldCheck,
    color: "#22c55e",
  },
  {
    label: "Pending Approvals",
    value: "8",
    sub: "3 high priority",
    icon: Clock,
    color: "#f59e0b",
  },
  {
    label: "Expiring (30d)",
    value: "4",
    sub: "Renewals needed",
    icon: AlertTriangle,
    color: "#ef4444",
  },
];

const DOCUMENTS: LegalDoc[] = [
  {
    id: "LD-001",
    docType: "RERA Registration",
    project: "Prestige Heights",
    docNumber: "PRM/KA/RERA/2024/001482",
    issuedBy: "KSRERA",
    issueDate: "Jan 2024",
    expiryDate: "Jan 2028",
    status: "Active",
    category: "Regulatory",
  },
  {
    id: "LD-002",
    docType: "Commencement Certificate",
    project: "Prestige Heights",
    docNumber: "BBMP/CC/2024/0087",
    issuedBy: "BBMP",
    issueDate: "Feb 2024",
    expiryDate: null,
    status: "Active",
    category: "Certificate",
  },
  {
    id: "LD-003",
    docType: "RERA Registration",
    project: "Emerald Bay",
    docNumber: "PRM/MH/RERA/2023/003341",
    issuedBy: "MahaRERA",
    issueDate: "Nov 2023",
    expiryDate: "Nov 2027",
    status: "Active",
    category: "Regulatory",
  },
  {
    id: "LD-004",
    docType: "Occupancy Certificate",
    project: "Green Valley",
    docNumber: "HMDA/OC/2025/0292",
    issuedBy: "HMDA",
    issueDate: "Mar 2025",
    expiryDate: null,
    status: "Active",
    category: "Certificate",
  },
  {
    id: "LD-005",
    docType: "Occupancy Certificate",
    project: "Prestige Heights",
    docNumber: "-",
    issuedBy: "BBMP",
    issueDate: "-",
    expiryDate: null,
    status: "Pending",
    category: "Certificate",
  },
  {
    id: "LD-006",
    docType: "Sale Agreement Template",
    project: "Skyline Residences",
    docNumber: "LEGAL/SA/SKY/2024",
    issuedBy: "Internal",
    issueDate: "Aug 2024",
    expiryDate: null,
    status: "Active",
    category: "Agreement",
  },
  {
    id: "LD-007",
    docType: "NOC — Water Department",
    project: "Marina Cove",
    docNumber: "-",
    issuedBy: "BWSSB",
    issueDate: "-",
    expiryDate: null,
    status: "Submitted",
    category: "NOC",
  },
  {
    id: "LD-008",
    docType: "Fire NOC",
    project: "Lakeside Villas",
    docNumber: "FIRE/NOC/2024/LV-09",
    issuedBy: "Fire Dept.",
    issueDate: "Oct 2024",
    expiryDate: "Oct 2026",
    status: "Expired",
    category: "NOC",
  },
  {
    id: "LD-009",
    docType: "Building Plan Approval",
    project: "Marina Cove",
    docNumber: "TNRERA/BP/2024/0591",
    issuedBy: "CMDA",
    issueDate: "Apr 2024",
    expiryDate: "Apr 2027",
    status: "Active",
    category: "Certificate",
  },
  {
    id: "LD-010",
    docType: "RERA Registration",
    project: "Lakeside Villas",
    docNumber: "PRM/TN/RERA/2024/002108",
    issuedBy: "TNRERA",
    issueDate: "Mar 2024",
    expiryDate: "Mar 2028",
    status: "Active",
    category: "Regulatory",
  },
];

const PENDING_APPROVALS: PendingApproval[] = [
  {
    id: "PA-001",
    title: "Occupancy Certificate — Prestige Heights",
    project: "Prestige Heights",
    submittedOn: "Jun 15, 2026",
    authority: "BBMP",
    daysElapsed: 35,
    priority: "High",
  },
  {
    id: "PA-002",
    title: "NOC — Water Dept. — Marina Cove",
    project: "Marina Cove",
    submittedOn: "Jul 01, 2026",
    authority: "BWSSB",
    daysElapsed: 19,
    priority: "High",
  },
  {
    id: "PA-003",
    title: "Fire NOC Renewal — Lakeside Villas",
    project: "Lakeside Villas",
    submittedOn: "Jul 05, 2026",
    authority: "Fire Dept.",
    daysElapsed: 15,
    priority: "Medium",
  },
  {
    id: "PA-004",
    title: "RERA Quarterly Update — Emerald Bay",
    project: "Emerald Bay",
    submittedOn: "Jul 10, 2026",
    authority: "MahaRERA",
    daysElapsed: 10,
    priority: "Low",
  },
];

const PROJECT_TIMELINES: Record<string, TimelineEvent[]> = {
  "Prestige Heights": [
    { date: "Jan 2024", event: "RERA Registration", status: "done" },
    { date: "Feb 2024", event: "Commencement Certificate", status: "done" },
    { date: "Jun 2024", event: "Building Plan Approved", status: "done" },
    { date: "Jan 2025", event: "Foundation NOC", status: "done" },
    { date: "Jul 2026", event: "OC Application Filed", status: "current" },
    { date: "Oct 2026", event: "OC Grant (Expected)", status: "upcoming" },
    { date: "Dec 2026", event: "Possession Certificate", status: "upcoming" },
  ],
  "Emerald Bay": [
    { date: "Nov 2023", event: "RERA Registration", status: "done" },
    { date: "Feb 2024", event: "Commencement Certificate", status: "done" },
    { date: "Sep 2024", event: "Structure NOC", status: "done" },
    { date: "Mar 2026", event: "Completion Certificate Filed", status: "current" },
    { date: "Aug 2026", event: "OC Grant (Expected)", status: "upcoming" },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusStyle(status: string) {
  if (status === "Active")
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (status === "Pending")
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  if (status === "Submitted")
    return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";
  return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Active") return <CheckCircle2 className="w-3 h-3" />;
  if (status === "Pending") return <Clock className="w-3 h-3" />;
  if (status === "Submitted") return <ArrowUpRight className="w-3 h-3" />;
  return <XCircle className="w-3 h-3" />;
}

function categoryStyle(cat: string) {
  const map: Record<string, string> = {
    Regulatory: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    Agreement: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    Certificate: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    NOC: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  };
  return map[cat] ?? "bg-muted text-muted-foreground";
}

function priorityStyle(p: string) {
  if (p === "High") return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
  if (p === "Medium")
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  return "bg-slate-500/10 text-slate-600 dark:text-slate-400";
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LegalPage() {
  const [tab, setTab] = useState("documents");
  const [selectedProject, setSelectedProject] = useState("Prestige Heights");

  const timelineProjects = Object.keys(PROJECT_TIMELINES);

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Legal</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Document register, regulatory approvals &amp; compliance timelines
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
            <Button size="sm" className="gap-1.5 h-8 text-xs">
              <Plus className="w-3.5 h-3.5" />
              Add Document
            </Button>
          </div>
        </div>

        {/* ── KPI Row ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {KPI_DATA.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} className="py-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground truncate">{kpi.label}</p>
                      <p className="text-2xl font-bold tracking-tight mt-1">{kpi.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{kpi.sub}</p>
                    </div>
                    <div
                      className="p-2.5 rounded-lg shrink-0"
                      style={{ background: kpi.color + "18" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
          <TabsList>
            <TabsTrigger value="documents" className="text-xs">
              Document Register
            </TabsTrigger>
            <TabsTrigger value="approvals" className="text-xs">
              Pending Approvals
              <span className="ml-1.5 bg-amber-500 text-white text-[9px] rounded-full px-1.5 py-0.5 font-semibold">
                {PENDING_APPROVALS.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs">
              Legal Timeline
            </TabsTrigger>
          </TabsList>

          {/* ── Document Register ── */}
          <TabsContent value="documents" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Legal Documents Register</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  RERA, commencement certificates, OCs, agreements &amp; NOCs
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {[
                          "ID",
                          "Document Type",
                          "Project",
                          "Doc Number",
                          "Issued By",
                          "Issue Date",
                          "Expiry",
                          "Category",
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
                      {DOCUMENTS.map((doc) => (
                        <tr
                          key={doc.id}
                          className={`border-b border-border/50 transition-colors ${
                            doc.status === "Expired"
                              ? "bg-rose-500/5 hover:bg-rose-500/10"
                              : "hover:bg-muted/40"
                          }`}
                        >
                          <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground whitespace-nowrap">
                            {doc.id}
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-2">
                              <FileBadge className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              <span className="text-xs font-medium text-foreground whitespace-nowrap">
                                {doc.docType}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                            {doc.project}
                          </td>
                          <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground max-w-[180px] truncate">
                            {doc.docNumber}
                          </td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                            {doc.issuedBy}
                          </td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                            {doc.issueDate}
                          </td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                            {doc.expiryDate ?? "—"}
                          </td>
                          <td className="px-4 py-2.5">
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${categoryStyle(
                                doc.category
                              )}`}
                            >
                              {doc.category}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <span
                              className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full w-fit ${statusStyle(
                                doc.status
                              )}`}
                            >
                              <StatusIcon status={doc.status} />
                              {doc.status}
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

          {/* ── Pending Approvals ── */}
          <TabsContent value="approvals" className="mt-4">
            <div className="space-y-3">
              {PENDING_APPROVALS.map((pa) => (
                <Card key={pa.id} className="py-0">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/10 shrink-0">
                          <Scale className="w-4 h-4 text-amber-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{pa.title}</p>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Building2 className="w-3 h-3" />
                              {pa.project}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              Filed {pa.submittedOn}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Authority: <span className="text-foreground font-medium">{pa.authority}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Elapsed</p>
                          <p
                            className={`text-sm font-bold ${
                              pa.daysElapsed > 30
                                ? "text-rose-600 dark:text-rose-400"
                                : pa.daysElapsed > 14
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-foreground"
                            }`}
                          >
                            {pa.daysElapsed}d
                          </p>
                        </div>
                        <span
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${priorityStyle(
                            pa.priority
                          )}`}
                        >
                          {pa.priority}
                        </span>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Follow Up
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ── Legal Timeline ── */}
          <TabsContent value="timeline" className="mt-4">
            {/* Project selector */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {timelineProjects.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedProject(p)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                    selectedProject === p
                      ? "bg-indigo-600 text-white border-transparent"
                      : "text-muted-foreground border-border hover:border-foreground/30"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-semibold">
                  {selectedProject} — Legal Milestones
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Regulatory approvals &amp; compliance milestones timeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

                  <div className="space-y-0">
                    {(PROJECT_TIMELINES[selectedProject] ?? []).map((event, idx, arr) => (
                      <div
                        key={idx}
                        className={`relative flex items-start gap-5 pb-6 ${
                          idx === arr.length - 1 ? "pb-0" : ""
                        }`}
                      >
                        {/* Dot */}
                        <div
                          className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0 ${
                            event.status === "done"
                              ? "bg-emerald-500 border-emerald-500"
                              : event.status === "current"
                              ? "bg-indigo-600 border-indigo-600"
                              : "bg-background border-border"
                          }`}
                        >
                          {event.status === "done" ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : event.status === "current" ? (
                            <Clock className="w-4 h-4 text-white" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="pt-1">
                          <p
                            className={`text-sm font-medium ${
                              event.status === "upcoming"
                                ? "text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {event.event}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{event.date}</p>
                          {event.status === "current" && (
                            <span className="inline-block mt-1.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                              In Progress
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
