"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Store, Building2, Users, TrendingUp, Plus, Calendar, IndianRupee, FileText } from "lucide-react";

type LeaseStatus = "Active" | "Expiring" | "Expired" | "Vacant" | "Negotiation";

interface LeasedUnit {
  id: string;
  unit: string;
  project: string;
  tenant: string;
  industry: string;
  area: number;
  rentPsf: number;
  monthlyRent: number;
  leaseStart: string;
  leaseEnd: string;
  status: LeaseStatus;
  lockIn: string;
  deposit: number;
  escalation: string;
}

const leasedUnits: LeasedUnit[] = [
  { id: "LC-0012", unit: "GardenCity — Tower C, 3rd Floor", project: "Godrej Garden City", tenant: "Wipro Technologies", industry: "IT/ITES", area: 28000, rentPsf: 42, monthlyRent: 1176000, leaseStart: "Apr 1, 2024", leaseEnd: "Mar 31, 2029", status: "Active", lockIn: "3 years", deposit: 7056000, escalation: "15% every 3 years" },
  { id: "LC-0011", unit: "GardenCity — Tower C, 4th Floor", project: "Godrej Garden City", tenant: "Cognizant Technology", industry: "IT/ITES", area: 22000, rentPsf: 44, monthlyRent: 968000, leaseStart: "Jul 1, 2024", leaseEnd: "Jun 30, 2027", status: "Active", lockIn: "2 years", deposit: 5808000, escalation: "12% every 2 years" },
  { id: "LC-0010", unit: "South Estate — Retail G-01", project: "Godrej South Estate", tenant: "Starbucks India", industry: "F&B / Retail", area: 3200, rentPsf: 180, monthlyRent: 576000, leaseStart: "Jan 1, 2025", leaseEnd: "Dec 31, 2029", status: "Active", lockIn: "5 years", deposit: 3456000, escalation: "10% every 2 years" },
  { id: "LC-0009", unit: "South Estate — Retail G-02", project: "Godrej South Estate", tenant: "HDFC Bank Branch", industry: "Banking", area: 2800, rentPsf: 160, monthlyRent: 448000, leaseStart: "Mar 1, 2024", leaseEnd: "Feb 28, 2027", status: "Expiring", lockIn: "3 years", deposit: 2688000, escalation: "10% every 2 years" },
  { id: "LC-0008", unit: "Infinity — Commercial Wing 1", project: "Godrej Infinity", tenant: "KPMG India", industry: "Consulting", area: 15000, rentPsf: 68, monthlyRent: 1020000, leaseStart: "Oct 1, 2023", leaseEnd: "Sep 30, 2028", status: "Active", lockIn: "3 years", deposit: 6120000, escalation: "15% every 3 years" },
  { id: "LC-0007", unit: "Garden City — Retail Strip, Unit 5", project: "Godrej Garden City", tenant: "—", industry: "—", area: 1800, rentPsf: 0, monthlyRent: 0, leaseStart: "—", leaseEnd: "—", status: "Vacant", lockIn: "—", deposit: 0, escalation: "—" },
  { id: "LC-0006", unit: "Garden City — Tower B, 2nd Floor", project: "Godrej Garden City", tenant: "TCS Ltd (talks ongoing)", industry: "IT/ITES", area: 32000, rentPsf: 45, monthlyRent: 0, leaseStart: "—", leaseEnd: "—", status: "Negotiation", lockIn: "—", deposit: 0, escalation: "—" },
];

const rentCollection = [
  { month: "Apr", collected: 38.5, expected: 41.2 },
  { month: "May", collected: 40.8, expected: 41.2 },
  { month: "Jun", collected: 39.2, expected: 41.2 },
  { month: "Jul", collected: 28.4, expected: 41.2 },
];

const STATUS_CONFIG: Record<LeaseStatus, { color: string }> = {
  Active: { color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  Expiring: { color: "bg-amber-100 text-amber-700 border-amber-200" },
  Expired: { color: "bg-red-100 text-red-700 border-red-200" },
  Vacant: { color: "bg-zinc-100 text-zinc-600 border-zinc-200" },
  Negotiation: { color: "bg-blue-100 text-blue-700 border-blue-200" },
};

function fmtRent(v: number) { return v ? `₹${(v / 100000).toFixed(1)}L/mo` : "Vacant"; }
function fmtArea(v: number) { return `${(v / 1000).toFixed(0)}K sq ft`; }

export default function LeasingPage() {
  const [tab, setTab] = useState("units");

  const active = leasedUnits.filter((l) => l.status === "Active").length;
  const totalMonthly = leasedUnits.reduce((s, l) => s + l.monthlyRent, 0);
  const vacant = leasedUnits.filter((l) => l.status === "Vacant").length;
  const expiring = leasedUnits.filter((l) => l.status === "Expiring").length;
  const totalArea = leasedUnits.reduce((s, l) => s + l.area, 0);
  const leasedArea = leasedUnits.filter((l) => l.status === "Active").reduce((s, l) => s + l.area, 0);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Commercial Leasing</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Office, retail, and commercial unit lease management</p>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" /> New Lease
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Leases", value: active.toString(), sub: `${Math.round((leasedArea / totalArea) * 100)}% occupancy`, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { label: "Monthly Rent Roll", value: `₹${(totalMonthly / 100000).toFixed(1)}L`, sub: "Total contracted", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
          { label: "Expiring (6M)", value: expiring.toString(), sub: "Need renewal", color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
          { label: "Vacant Units", value: vacant.toString(), sub: "Available to lease", color: "text-red-600", bg: "bg-red-50 border-red-100" },
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
          <TabsTrigger value="units" className="text-xs h-7">Leased Units</TabsTrigger>
          <TabsTrigger value="collection" className="text-xs h-7">Rent Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="units" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Unit</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Tenant</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Area</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Rent/sqft</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Monthly Rent</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Lease Period</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Escalation</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leasedUnits.map((l) => (
                    <tr key={l.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium truncate max-w-[160px]">{l.unit}</p>
                        <p className="text-xs text-muted-foreground">{l.project}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium">{l.tenant !== "—" ? l.tenant : <span className="text-muted-foreground">—</span>}</p>
                        {l.industry !== "—" && <p className="text-[10px] text-muted-foreground">{l.industry}</p>}
                      </td>
                      <td className="px-4 py-3 text-xs">{fmtArea(l.area)}</td>
                      <td className="px-4 py-3 text-xs">{l.rentPsf > 0 ? `₹${l.rentPsf}/sqft` : "—"}</td>
                      <td className="px-4 py-3 text-xs font-medium">{fmtRent(l.monthlyRent)}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{l.leaseStart !== "—" ? `${l.leaseStart} – ${l.leaseEnd}` : "—"}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{l.escalation !== "—" ? l.escalation : "—"}</td>
                      <td className="px-4 py-3">
                        <Badge className={`border text-[10px] ${STATUS_CONFIG[l.status].color}`}>{l.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collection" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Monthly Rent Collection (₹ Cr)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={rentCollection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="expected" fill="var(--muted)" name="Expected" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="collected" fill="#6366f1" name="Collected" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
