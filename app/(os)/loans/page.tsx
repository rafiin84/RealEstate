"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Landmark, CheckCircle2, Clock, AlertTriangle, TrendingUp, Building2, IndianRupee, FileText } from "lucide-react";

type LoanStatus = "Applied" | "Under Processing" | "Sanctioned" | "Disbursed" | "Rejected";

interface LoanApplication {
  id: string;
  buyerName: string;
  unit: string;
  project: string;
  bank: string;
  appliedAmount: number;
  sanctionedAmount?: number;
  disbursed?: number;
  status: LoanStatus;
  appliedOn: string;
  sanctionedOn?: string;
  disbursedOn?: string;
  emi?: number;
  tenure?: number;
  roi?: number;
}

interface BankPartner {
  name: string;
  logo: string;
  avgRate: string;
  processingFee: string;
  maxLTV: string;
  avgDisbursal: string;
  applicationsSent: number;
  approved: number;
}

const loanApplications: LoanApplication[] = [
  { id: "LN-0089", buyerName: "Arjun Mehta", unit: "Godrej Meridien A-1208", project: "Godrej Meridien", bank: "HDFC Bank", appliedAmount: 12500000, sanctionedAmount: 12000000, disbursed: 6000000, status: "Disbursed", appliedOn: "Apr 10, 2026", sanctionedOn: "Apr 22, 2026", disbursedOn: "May 5, 2026", emi: 105000, tenure: 20, roi: 8.6 },
  { id: "LN-0088", buyerName: "Sunita Patel", unit: "Godrej Reserve B-1501", project: "Godrej Reserve", bank: "SBI", appliedAmount: 20000000, sanctionedAmount: 19000000, disbursed: 9500000, status: "Disbursed", appliedOn: "Apr 18, 2026", sanctionedOn: "May 2, 2026", disbursedOn: "May 20, 2026", emi: 162000, tenure: 20, roi: 8.4 },
  { id: "LN-0087", buyerName: "Rohit Bajaj", unit: "Godrej Splendour C-0802", project: "Godrej Splendour", bank: "ICICI Bank", appliedAmount: 8000000, sanctionedAmount: 7500000, status: "Sanctioned", appliedOn: "May 28, 2026", sanctionedOn: "Jun 12, 2026", emi: 64500, tenure: 20, roi: 8.75 },
  { id: "LN-0086", buyerName: "Meera Krishnan", unit: "Godrej Nest D-1104", project: "Godrej Nest", bank: "Axis Bank", appliedAmount: 7000000, status: "Under Processing", appliedOn: "Jun 20, 2026" },
  { id: "LN-0085", buyerName: "Sanjay Gupta", unit: "Godrej Garden City T3-0504", project: "Godrej Garden City", bank: "Kotak Mahindra", appliedAmount: 4000000, status: "Applied", appliedOn: "Jul 8, 2026" },
  { id: "LN-0084", buyerName: "Kavitha Reddy", unit: "Godrej Emerald A-0604", project: "Godrej Emerald", bank: "PNB", appliedAmount: 9000000, status: "Rejected", appliedOn: "May 15, 2026" },
  { id: "LN-0083", buyerName: "Fatima Sheikh", unit: "Godrej South Estate E-0901", project: "Godrej South Estate", bank: "HDFC Bank", appliedAmount: 35000000, sanctionedAmount: 33000000, disbursed: 33000000, status: "Disbursed", appliedOn: "Mar 12, 2026", sanctionedOn: "Mar 25, 2026", disbursedOn: "Apr 8, 2026", emi: 283000, tenure: 20, roi: 8.5 },
];

const bankPartners: BankPartner[] = [
  { name: "HDFC Bank", logo: "HD", avgRate: "8.50–9.0%", processingFee: "0.5%", maxLTV: "80%", avgDisbursal: "12 days", applicationsSent: 82, approved: 74 },
  { name: "SBI Home Loans", logo: "SB", avgRate: "8.40–8.85%", processingFee: "Nil", maxLTV: "80%", avgDisbursal: "18 days", applicationsSent: 65, approved: 55 },
  { name: "ICICI Bank", logo: "IC", avgRate: "8.75–9.15%", processingFee: "0.5%", maxLTV: "75%", avgDisbursal: "10 days", applicationsSent: 48, approved: 42 },
  { name: "Axis Bank", logo: "AX", avgRate: "8.75–9.25%", processingFee: "0.75%", maxLTV: "75%", avgDisbursal: "14 days", applicationsSent: 32, approved: 26 },
  { name: "Kotak Mahindra", logo: "KM", avgRate: "8.65–9.0%", processingFee: "0.5%", maxLTV: "80%", avgDisbursal: "11 days", applicationsSent: 24, approved: 20 },
];

const disbursal = [
  { month: "Apr", amount: 48 },
  { month: "May", amount: 62 },
  { month: "Jun", amount: 44 },
  { month: "Jul", amount: 28 },
];

const STATUS_CONFIG: Record<LoanStatus, { color: string }> = {
  Applied: { color: "bg-zinc-100 text-zinc-700 border-zinc-200" },
  "Under Processing": { color: "bg-blue-100 text-blue-700 border-blue-200" },
  Sanctioned: { color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  Disbursed: { color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  Rejected: { color: "bg-red-100 text-red-700 border-red-200" },
};

function fmt(v: number) { return `₹${(v / 10000000).toFixed(1)} Cr`; }

export default function LoansPage() {
  const [tab, setTab] = useState("applications");

  const disbursed = loanApplications.filter((l) => l.status === "Disbursed");
  const inPipeline = loanApplications.filter((l) => !["Disbursed", "Rejected"].includes(l.status)).length;
  const totalDisbursed = disbursed.reduce((s, l) => s + (l.disbursed ?? 0), 0);
  const sanctioned = loanApplications.filter((l) => ["Sanctioned", "Disbursed"].includes(l.status)).length;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Home Loan Management</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track buyer loan applications, bank disbursals, and preferred lender performance</p>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <FileText className="w-3.5 h-3.5" /> New Application
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "In Pipeline", value: inPipeline.toString(), sub: "Active applications", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
          { label: "Sanctioned", value: sanctioned.toString(), sub: "This quarter", color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
          { label: "Total Disbursed", value: fmt(totalDisbursed), sub: "This FY", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { label: "Avg ROI", value: "8.62%", sub: "Across all banks", color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
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
          <TabsTrigger value="applications" className="text-xs h-7">Applications</TabsTrigger>
          <TabsTrigger value="banks" className="text-xs h-7">Bank Partners</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs h-7">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Loan ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Buyer / Unit</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Bank</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Applied</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Sanctioned</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Disbursed</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">EMI / Rate</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loanApplications.map((l) => (
                    <tr key={l.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-medium">{l.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium">{l.buyerName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">{l.unit}</p>
                      </td>
                      <td className="px-4 py-3 text-xs">{l.bank}</td>
                      <td className="px-4 py-3 text-xs font-medium">{fmt(l.appliedAmount)}</td>
                      <td className="px-4 py-3 text-xs">{l.sanctionedAmount ? fmt(l.sanctionedAmount) : "—"}</td>
                      <td className="px-4 py-3 text-xs">{l.disbursed ? fmt(l.disbursed) : "—"}</td>
                      <td className="px-4 py-3 text-xs">
                        {l.emi ? <><p className="font-medium">₹{(l.emi / 1000).toFixed(0)}K/mo</p><p className="text-muted-foreground">{l.roi}% · {l.tenure}yr</p></> : "—"}
                      </td>
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

        <TabsContent value="banks" className="mt-4">
          <div className="grid gap-3">
            {bankPartners.map((b) => {
              const approvalRate = Math.round((b.approved / b.applicationsSent) * 100);
              return (
                <Card key={b.name} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">{b.logo}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{b.name}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2 text-xs text-muted-foreground">
                          <span>Rate: <span className="font-medium text-foreground">{b.avgRate}</span></span>
                          <span>LTV: <span className="font-medium text-foreground">{b.maxLTV}</span></span>
                          <span>Processing: <span className="font-medium text-foreground">{b.processingFee}</span></span>
                          <span>Disbursal: <span className="font-medium text-foreground">{b.avgDisbursal}</span></span>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Approval rate</span>
                            <span className="font-medium">{b.approved}/{b.applicationsSent} ({approvalRate}%)</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${approvalRate}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Monthly Loan Disbursals (₹ Cr)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={disbursal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`₹${v} Cr`, "Disbursed"]} />
                  <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
