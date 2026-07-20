"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Wrench, AlertTriangle, CheckCircle2, Clock, Plus, Building2, Calendar, User, Phone, TrendingDown } from "lucide-react";

type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
type Priority = "Critical" | "High" | "Medium" | "Low";

interface Ticket {
  id: string;
  title: string;
  project: string;
  unit: string;
  category: string;
  status: TicketStatus;
  priority: Priority;
  resident: string;
  phone: string;
  assignedTo: string;
  raised: string;
  sla: string;
  slaBreached: boolean;
}

interface AMC {
  id: string;
  vendor: string;
  service: string;
  project: string;
  startDate: string;
  endDate: string;
  value: number;
  nextService: string;
  status: "Active" | "Expiring" | "Expired";
}

interface PPM {
  id: string;
  task: string;
  project: string;
  frequency: string;
  lastDone: string;
  nextDue: string;
  status: "Due" | "Overdue" | "Completed";
  assignedTo: string;
}

const tickets: Ticket[] = [
  { id: "TKT-0041", title: "Lift not working — Tower B", project: "Godrej Meridien", unit: "B-1204", category: "Lift", status: "In Progress", priority: "Critical", resident: "Amit Khanna", phone: "+91 98765 11111", assignedTo: "Suresh (Lift Tech)", raised: "Today 9:15 AM", sla: "4 hrs", slaBreached: false },
  { id: "TKT-0040", title: "Water leakage from ceiling", project: "Godrej Emerald", unit: "C-0801", category: "Plumbing", status: "Open", priority: "High", resident: "Priya Mehta", phone: "+91 87654 22222", assignedTo: "Unassigned", raised: "Yesterday 6:30 PM", sla: "8 hrs", slaBreached: true },
  { id: "TKT-0039", title: "Gym AC not cooling", project: "Godrej Splendour", unit: "Common Area", category: "HVAC", status: "In Progress", priority: "Medium", resident: "Facility Manager", phone: "+91 76543 33333", assignedTo: "CoolAir Services", raised: "2 days ago", sla: "24 hrs", slaBreached: false },
  { id: "TKT-0038", title: "Parking boom barrier stuck", project: "Godrej Nest", unit: "P-Level 2", category: "Security", status: "Resolved", priority: "High", resident: "Security Desk", phone: "+91 65432 44444", assignedTo: "Ravi (Electrical)", raised: "3 days ago", sla: "8 hrs", slaBreached: false },
  { id: "TKT-0037", title: "Swimming pool pump noise", project: "Godrej Reserve", unit: "Pool Area", category: "Pool", status: "Open", priority: "Low", resident: "Resident RWA", phone: "+91 54321 55555", assignedTo: "Unassigned", raised: "4 days ago", sla: "48 hrs", slaBreached: false },
  { id: "TKT-0036", title: "Street light out — Block D path", project: "Godrej Garden City", unit: "Ext Area D", category: "Electrical", status: "Resolved", priority: "Medium", resident: "Security Guard", phone: "+91 43210 66666", assignedTo: "Electrician Team", raised: "5 days ago", sla: "24 hrs", slaBreached: false },
  { id: "TKT-0035", title: "Main gate intercom faulty", project: "Godrej Infinity", unit: "Main Gate", category: "Security", status: "Closed", priority: "High", resident: "Gatekeeper", phone: "+91 32109 77777", assignedTo: "Intercom Vendor", raised: "1 week ago", sla: "8 hrs", slaBreached: false },
];

const amcList: AMC[] = [
  { id: "amc-001", vendor: "KONE Elevators", service: "Elevator Maintenance", project: "Godrej Meridien", startDate: "Apr 1, 2026", endDate: "Mar 31, 2027", value: 2400000, nextService: "Aug 1, 2026", status: "Active" },
  { id: "amc-002", vendor: "Blue Star AC", service: "HVAC — Central AC", project: "Godrej Reserve", startDate: "Jan 1, 2026", endDate: "Dec 31, 2026", value: 1800000, nextService: "Jul 25, 2026", status: "Active" },
  { id: "amc-003", vendor: "Thermax", service: "STP & WTP Operations", project: "Godrej Nest", startDate: "Apr 1, 2026", endDate: "Mar 31, 2027", value: 960000, nextService: "Aug 15, 2026", status: "Active" },
  { id: "amc-004", vendor: "SecurityGuard Pro", service: "CCTV Maintenance", project: "Godrej Splendour", startDate: "Jul 1, 2025", endDate: "Jun 30, 2026", value: 480000, nextService: "Aug 30, 2026", status: "Expiring" },
  { id: "amc-005", vendor: "Aqua Pure", service: "Swimming Pool Maintenance", project: "Godrej Infinity", startDate: "Apr 1, 2026", endDate: "Mar 31, 2027", value: 720000, nextService: "Jul 28, 2026", status: "Active" },
];

const ppmTasks: PPM[] = [
  { id: "ppm-001", task: "Fire Fighting System Check", project: "Godrej Meridien", frequency: "Monthly", lastDone: "Jun 30, 2026", nextDue: "Jul 31, 2026", status: "Due", assignedTo: "Fire Safety Team" },
  { id: "ppm-002", task: "DG Set Load Test", project: "Godrej Reserve", frequency: "Monthly", lastDone: "Jun 15, 2026", nextDue: "Jul 15, 2026", status: "Overdue", assignedTo: "Electrical Team" },
  { id: "ppm-003", task: "Terrace Waterproofing Inspection", project: "Godrej Emerald", frequency: "Quarterly", lastDone: "Apr 10, 2026", nextDue: "Jul 10, 2026", status: "Overdue", assignedTo: "Civil Team" },
  { id: "ppm-004", task: "CCTV Camera Cleaning", project: "Godrej Nest", frequency: "Bi-monthly", lastDone: "May 20, 2026", nextDue: "Jul 20, 2026", status: "Due", assignedTo: "Security Vendor" },
  { id: "ppm-005", task: "Elevator Safety Certificate Renewal", project: "Godrej Splendour", frequency: "Annually", lastDone: "Jul 5, 2025", nextDue: "Jul 5, 2026", status: "Overdue", assignedTo: "KONE Team" },
  { id: "ppm-006", task: "Gym Equipment Servicing", project: "Godrej Infinity", frequency: "Quarterly", lastDone: "May 1, 2026", nextDue: "Aug 1, 2026", status: "Completed", assignedTo: "Fitness First" },
];

const STATUS_CONFIG: Record<TicketStatus, { color: string; icon: React.ReactNode }> = {
  Open: { color: "bg-red-100 text-red-700 border-red-200", icon: <AlertTriangle className="w-3 h-3" /> },
  "In Progress": { color: "bg-blue-100 text-blue-700 border-blue-200", icon: <Clock className="w-3 h-3" /> },
  Resolved: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="w-3 h-3" /> },
  Closed: { color: "bg-zinc-100 text-zinc-600 border-zinc-200", icon: <CheckCircle2 className="w-3 h-3" /> },
};

const PRIORITY_COLOR: Record<Priority, string> = {
  Critical: "bg-red-500",
  High: "bg-orange-400",
  Medium: "bg-amber-400",
  Low: "bg-blue-400",
};

const PPM_STATUS: Record<PPM["status"], string> = {
  Overdue: "bg-red-100 text-red-700 border-red-200",
  Due: "bg-amber-100 text-amber-700 border-amber-200",
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function formatCr(n: number) {
  return n >= 10000000 ? `₹${(n / 10000000).toFixed(1)} Cr` : `₹${(n / 100000).toFixed(0)}L`;
}

export default function FacilityPage() {
  const [tab, setTab] = useState("tickets");

  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;
  const breached = tickets.filter((t) => t.slaBreached).length;
  const overdueAMC = amcList.filter((a) => a.status === "Expiring").length;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Facility Management</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Maintenance tickets, AMC contracts, and PPM schedules</p>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" /> Raise Ticket
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Open Tickets", value: open.toString(), sub: "Awaiting action", color: "text-red-600", bg: "bg-red-50 border-red-100" },
          { label: "In Progress", value: inProgress.toString(), sub: "Being resolved", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
          { label: "SLA Breaches", value: breached.toString(), sub: "This week", color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
          { label: "AMC Expiring", value: overdueAMC.toString(), sub: "Next 30 days", color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
        ].map((k) => (
          <Card key={k.label} className={`border ${k.bg}`}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className={`text-2xl font-bold mt-1 ${k.color}`}>{k.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
        <TabsList className="h-8">
          <TabsTrigger value="tickets" className="text-xs h-7">Tickets ({tickets.length})</TabsTrigger>
          <TabsTrigger value="amc" className="text-xs h-7">AMC Contracts</TabsTrigger>
          <TabsTrigger value="ppm" className="text-xs h-7">PPM Schedule</TabsTrigger>
        </TabsList>

        {/* Tickets */}
        <TabsContent value="tickets" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">ID / Title</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Project</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Priority</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Resident</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Assigned</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">SLA</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((t) => {
                    const cfg = STATUS_CONFIG[t.status];
                    return (
                      <tr key={t.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium text-xs">{t.id}</p>
                          <p className="text-muted-foreground text-xs mt-0.5 max-w-[200px] truncate">{t.title}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs">{t.project}</p>
                          <p className="text-xs text-muted-foreground">{t.unit}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${PRIORITY_COLOR[t.priority]}`} />
                            <span className="text-xs">{t.priority}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`border text-[10px] gap-1 ${cfg.color}`}>
                            {cfg.icon}{t.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs font-medium">{t.resident}</p>
                          <p className="text-xs text-muted-foreground">{t.phone}</p>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{t.assignedTo}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium ${t.slaBreached ? "text-red-600" : "text-muted-foreground"}`}>
                            {t.sla}{t.slaBreached && " ⚠ Breached"}
                          </span>
                          <p className="text-[10px] text-muted-foreground">{t.raised}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AMC */}
        <TabsContent value="amc" className="mt-4">
          <div className="grid gap-3">
            {amcList.map((amc) => (
              <Card key={amc.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{amc.service}</p>
                        <Badge className={`text-[10px] border ${amc.status === "Active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : amc.status === "Expiring" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-red-100 text-red-700 border-red-200"}`}>
                          {amc.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{amc.vendor} · {amc.project}</p>
                      <div className="flex items-center gap-6 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{amc.startDate} – {amc.endDate}</span>
                        <span>Next service: <span className="font-medium text-foreground">{amc.nextService}</span></span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatCr(amc.value)}</p>
                      <p className="text-xs text-muted-foreground">Annual value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* PPM */}
        <TabsContent value="ppm" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Task</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Project</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Frequency</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Last Done</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Next Due</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  {ppmTasks.map((p) => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-xs">{p.task}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{p.project}</td>
                      <td className="px-4 py-3 text-xs">{p.frequency}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{p.lastDone}</td>
                      <td className="px-4 py-3 text-xs font-medium">{p.nextDue}</td>
                      <td className="px-4 py-3">
                        <Badge className={`border text-[10px] ${PPM_STATUS[p.status]}`}>{p.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{p.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
