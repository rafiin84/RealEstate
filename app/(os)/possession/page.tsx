"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { KeyRound, CheckCircle2, Clock, AlertTriangle, CalendarDays, User, FileText, Download } from "lucide-react";

type PossessionStatus = "Scheduled" | "Snag Pending" | "Snag Cleared" | "Handed Over" | "Delayed";

interface PossessionUnit {
  id: string;
  unit: string;
  project: string;
  tower: string;
  floor: number;
  type: string;
  buyer: string;
  phone: string;
  status: PossessionStatus;
  offerLetterDate: string;
  scheduledDate: string;
  snags: number;
  snagsCleared: number;
  documentsReady: boolean;
}

const units: PossessionUnit[] = [
  { id: "p001", unit: "A-1204", project: "Godrej Meridien", tower: "Tower A", floor: 12, type: "3 BHK", buyer: "Amit Verma", phone: "+91 98765 11111", status: "Handed Over", offerLetterDate: "Apr 15, 2026", scheduledDate: "May 10, 2026", snags: 6, snagsCleared: 6, documentsReady: true },
  { id: "p002", unit: "B-0802", project: "Godrej Meridien", tower: "Tower B", floor: 8, type: "4 BHK", buyer: "Sunita Rao", phone: "+91 87654 22222", status: "Snag Cleared", offerLetterDate: "May 1, 2026", scheduledDate: "Jul 25, 2026", snags: 9, snagsCleared: 9, documentsReady: true },
  { id: "p003", unit: "C-1501", project: "Godrej Reserve", tower: "Tower C", floor: 15, type: "3 BHK", buyer: "Rajan Pillai", phone: "+91 76543 33333", status: "Snag Pending", offerLetterDate: "May 20, 2026", scheduledDate: "Aug 5, 2026", snags: 14, snagsCleared: 9, documentsReady: false },
  { id: "p004", unit: "A-0304", project: "Godrej Emerald", tower: "Tower A", floor: 3, type: "2 BHK", buyer: "Kavya Nair", phone: "+91 65432 44444", status: "Scheduled", offerLetterDate: "Jun 10, 2026", scheduledDate: "Aug 12, 2026", snags: 0, snagsCleared: 0, documentsReady: true },
  { id: "p005", unit: "B-1001", project: "Godrej Emerald", tower: "Tower B", floor: 10, type: "3 BHK", buyer: "Pradeep Joshi", phone: "+91 54321 55555", status: "Delayed", offerLetterDate: "Mar 15, 2026", scheduledDate: "Jun 30, 2026", snags: 21, snagsCleared: 14, documentsReady: false },
  { id: "p006", unit: "D-0601", project: "Godrej Nest", tower: "Tower D", floor: 6, type: "2 BHK", buyer: "Meena Iyer", phone: "+91 43210 66666", status: "Handed Over", offerLetterDate: "Apr 5, 2026", scheduledDate: "May 20, 2026", snags: 4, snagsCleared: 4, documentsReady: true },
  { id: "p007", unit: "A-2001", project: "Godrej Nest", tower: "Tower A", floor: 20, type: "4 BHK", buyer: "Sanjay Kulkarni", phone: "+91 32109 77777", status: "Snag Pending", offerLetterDate: "Jun 1, 2026", scheduledDate: "Aug 20, 2026", snags: 18, snagsCleared: 11, documentsReady: true },
  { id: "p008", unit: "E-0901", project: "Godrej South Estate", tower: "Tower E", floor: 9, type: "4 BHK", buyer: "Fatima Sheikh", phone: "+91 21098 88888", status: "Scheduled", offerLetterDate: "Jun 20, 2026", scheduledDate: "Sep 1, 2026", snags: 0, snagsCleared: 0, documentsReady: false },
];

const STATUS_CONFIG: Record<PossessionStatus, { color: string; icon: React.ReactNode }> = {
  "Handed Over": { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="w-3 h-3" /> },
  "Snag Cleared": { color: "bg-blue-100 text-blue-700 border-blue-200", icon: <CheckCircle2 className="w-3 h-3" /> },
  "Snag Pending": { color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Clock className="w-3 h-3" /> },
  Scheduled: { color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: <CalendarDays className="w-3 h-3" /> },
  Delayed: { color: "bg-red-100 text-red-700 border-red-200", icon: <AlertTriangle className="w-3 h-3" /> },
};

const TIMELINE = [
  { step: "Offer Letter", desc: "OC received, offer sent to buyer" },
  { step: "Snag Inspection", desc: "Joint inspection with buyer" },
  { step: "Snag Rectification", desc: "Defects cleared by team" },
  { step: "NOC Collection", desc: "Buyer provides NOC" },
  { step: "Key Handover", desc: "Keys handed, docs signed" },
];

export default function PossessionPage() {
  const [tab, setTab] = useState("units");
  const [filter, setFilter] = useState("all");

  const handedOver = units.filter((u) => u.status === "Handed Over").length;
  const scheduled = units.filter((u) => u.status === "Scheduled").length;
  const snagPending = units.filter((u) => u.status === "Snag Pending").length;
  const delayed = units.filter((u) => u.status === "Delayed").length;

  const filtered = filter === "all" ? units : units.filter((u) => u.status === filter);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Possession</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Unit handover tracking, snag management, and possession scheduling</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <CalendarDays className="w-3.5 h-3.5" /> Schedule Possession
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Handed Over", value: handedOver.toString(), color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { label: "Scheduled", value: scheduled.toString(), color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
          { label: "Snag Pending", value: snagPending.toString(), color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
          { label: "Delayed", value: delayed.toString(), color: "text-red-600", bg: "bg-red-50 border-red-100" },
        ].map((k) => (
          <Card key={k.label} className={`border ${k.bg}`}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className={`text-2xl font-bold mt-1 ${k.color}`}>{k.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Units</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
        <TabsList className="h-8">
          <TabsTrigger value="units" className="text-xs h-7">All Units</TabsTrigger>
          <TabsTrigger value="process" className="text-xs h-7">Possession Process</TabsTrigger>
        </TabsList>

        <TabsContent value="units" className="mt-4 space-y-3">
          {/* Quick filter */}
          <div className="flex gap-2">
            {["all", "Scheduled", "Snag Pending", "Snag Cleared", "Delayed", "Handed Over"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50"}`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>

          <div className="grid gap-3">
            {filtered.map((u) => {
              const cfg = STATUS_CONFIG[u.status];
              const snagPct = u.snags > 0 ? Math.round((u.snagsCleared / u.snags) * 100) : 100;
              return (
                <Card key={u.id} className="border hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-sm">{u.unit}</p>
                          <span className="text-xs text-muted-foreground">·</span>
                          <p className="text-xs text-muted-foreground">{u.type}</p>
                          <span className="text-xs text-muted-foreground">·</span>
                          <p className="text-xs text-muted-foreground">{u.project}, {u.tower}</p>
                          <Badge className={`border text-[10px] gap-1 ml-1 ${cfg.color}`}>{cfg.icon}{u.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><User className="w-3 h-3" />{u.buyer}</span>
                          <span>{u.phone}</span>
                          <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />Possession: {u.scheduledDate}</span>
                          <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{u.documentsReady ? <span className="text-emerald-600 font-medium">Docs Ready</span> : <span className="text-red-500">Docs Pending</span>}</span>
                        </div>
                        {u.snags > 0 && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Snag Rectification</span>
                              <span className="font-medium">{u.snagsCleared}/{u.snags} cleared</span>
                            </div>
                            <Progress value={snagPct} className="h-1.5" />
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-xs shrink-0">View</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="process" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Standard Possession Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {TIMELINE.map((step, i) => (
                  <div key={step.step} className="flex gap-4 pb-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">{i + 1}</div>
                      {i < TIMELINE.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="font-medium text-sm">{step.step}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
