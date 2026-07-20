"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, AlertTriangle, CheckCircle2, Clock, Plus, TrendingUp } from "lucide-react";

type ClaimStatus = "Filed" | "Under Review" | "Approved" | "In Rectification" | "Resolved" | "Rejected";

interface WarrantyClaim {
  id: string;
  unit: string;
  project: string;
  buyer: string;
  category: string;
  description: string;
  status: ClaimStatus;
  filedOn: string;
  resolvedOn?: string;
  daysOpen: number;
  vendor?: string;
}

interface WarrantyPolicy {
  category: string;
  duration: string;
  coverage: string;
  note: string;
}

const claims: WarrantyClaim[] = [
  { id: "WC-0128", unit: "A-1204", project: "Godrej Meridien", buyer: "Amit Verma", category: "Civil — Seepage", description: "Water seepage from bathroom wall, floor staining visible", status: "In Rectification", filedOn: "Jun 12, 2026", daysOpen: 38, vendor: "Waterproof Solutions Ltd" },
  { id: "WC-0127", unit: "C-1501", project: "Godrej Reserve", buyer: "Rajan Pillai", category: "Electrical", description: "MCB tripping repeatedly in kitchen circuit", status: "Resolved", filedOn: "May 28, 2026", resolvedOn: "Jun 10, 2026", daysOpen: 0, vendor: "SparkFix Electricals" },
  { id: "WC-0126", unit: "B-0802", project: "Godrej Meridien", buyer: "Sunita Rao", category: "Flooring", description: "Floor tiles cracked in master bedroom, 3 tiles", status: "Approved", filedOn: "Jun 20, 2026", daysOpen: 30, vendor: "TileWorks Pro" },
  { id: "WC-0125", unit: "A-0304", project: "Godrej Emerald", buyer: "Kavya Nair", category: "Plumbing", description: "Slow drain in bathroom, blockage suspected", status: "Under Review", filedOn: "Jul 5, 2026", daysOpen: 15 },
  { id: "WC-0124", unit: "D-0601", project: "Godrej Nest", buyer: "Meena Iyer", category: "Paint & Finish", description: "Paint peeling near window sill area, multiple spots", status: "Filed", filedOn: "Jul 12, 2026", daysOpen: 8 },
  { id: "WC-0123", unit: "E-0901", project: "Godrej South Estate", buyer: "Fatima Sheikh", category: "HVAC Ducting", description: "AC ducting making rattling noise on startup", status: "Resolved", filedOn: "May 10, 2026", resolvedOn: "May 22, 2026", daysOpen: 0, vendor: "AirFlow Systems" },
  { id: "WC-0122", unit: "A-2001", project: "Godrej Nest", buyer: "Sanjay Kulkarni", category: "Civil — Seepage", description: "Terrace slab seepage into 20th floor bedroom ceiling", status: "Rejected", filedOn: "Apr 5, 2026", daysOpen: 0 },
];

const policies: WarrantyPolicy[] = [
  { category: "Structural (RCC)", duration: "10 Years", coverage: "Foundation, columns, beams, slabs", note: "From date of possession" },
  { category: "Waterproofing", duration: "5 Years", coverage: "Terrace, wet areas, external walls", note: "From date of possession" },
  { category: "Civil Works", duration: "3 Years", coverage: "Plaster, tiles, flooring, brickwork", note: "From date of possession" },
  { category: "Electrical", duration: "2 Years", coverage: "Wiring, DB, switches, fixtures", note: "From date of possession" },
  { category: "Plumbing", duration: "2 Years", coverage: "Pipes, fittings, fixtures", note: "From date of possession" },
  { category: "Aluminium & Glass", duration: "2 Years", coverage: "Windows, sliding doors, glazing", note: "From date of possession" },
  { category: "Paint & Finish", duration: "1 Year", coverage: "Interior and exterior paint", note: "Cosmetic wear excluded" },
];

const STATUS_CONFIG: Record<ClaimStatus, { color: string }> = {
  Filed: { color: "bg-zinc-100 text-zinc-700 border-zinc-200" },
  "Under Review": { color: "bg-blue-100 text-blue-700 border-blue-200" },
  Approved: { color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  "In Rectification": { color: "bg-amber-100 text-amber-700 border-amber-200" },
  Resolved: { color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  Rejected: { color: "bg-red-100 text-red-700 border-red-200" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Civil — Seepage": "bg-blue-100 text-blue-700",
  Electrical: "bg-yellow-100 text-yellow-700",
  Flooring: "bg-orange-100 text-orange-700",
  Plumbing: "bg-cyan-100 text-cyan-700",
  "Paint & Finish": "bg-purple-100 text-purple-700",
  "HVAC Ducting": "bg-teal-100 text-teal-700",
};

export default function WarrantyPage() {
  const [tab, setTab] = useState("claims");

  const open = claims.filter((c) => !["Resolved", "Rejected"].includes(c.status)).length;
  const resolved = claims.filter((c) => c.status === "Resolved").length;
  const inRectification = claims.filter((c) => c.status === "In Rectification").length;
  const avgDays = Math.round(claims.filter((c) => c.daysOpen > 0).reduce((s, c) => s + c.daysOpen, 0) / Math.max(1, claims.filter((c) => c.daysOpen > 0).length));

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Warranty Management</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Defect claims, rectification tracking, and warranty policy details</p>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" /> New Claim
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Open Claims", value: open.toString(), color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
          { label: "In Rectification", value: inRectification.toString(), color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
          { label: "Resolved (FY)", value: resolved.toString(), color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { label: "Avg. Resolution", value: `${avgDays}d`, color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
        ].map((k) => (
          <Card key={k.label} className={`border ${k.bg}`}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className={`text-2xl font-bold mt-1 ${k.color}`}>{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
        <TabsList className="h-8">
          <TabsTrigger value="claims" className="text-xs h-7">Claims ({claims.length})</TabsTrigger>
          <TabsTrigger value="policy" className="text-xs h-7">Warranty Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="claims" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Claim ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Unit / Project</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Description</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Filed</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((c) => (
                    <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-mono text-xs font-medium">{c.id}</p>
                        <p className="text-xs text-muted-foreground">{c.buyer}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium">{c.unit}</p>
                        <p className="text-xs text-muted-foreground">{c.project}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[c.category] ?? "bg-zinc-100 text-zinc-600"}`}>
                          {c.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px] truncate">{c.description}</td>
                      <td className="px-4 py-3">
                        <Badge className={`border text-[10px] ${STATUS_CONFIG[c.status].color}`}>{c.status}</Badge>
                        {c.vendor && <p className="text-[10px] text-muted-foreground mt-0.5">{c.vendor}</p>}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{c.filedOn}</td>
                      <td className="px-4 py-3 text-xs font-medium">
                        {c.daysOpen > 0 ? <span className={c.daysOpen > 30 ? "text-red-600" : ""}>{c.daysOpen}d open</span> : <span className="text-emerald-600">{c.resolvedOn}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy" className="mt-4">
          <div className="grid gap-3">
            {policies.map((p) => (
              <Card key={p.category} className="border">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      <p className="font-medium text-sm">{p.category}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-7">{p.coverage}</p>
                    <p className="text-xs text-muted-foreground ml-7">{p.note}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-primary">{p.duration}</p>
                    <p className="text-xs text-muted-foreground">Warranty period</p>
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
