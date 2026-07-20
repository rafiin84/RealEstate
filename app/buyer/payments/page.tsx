"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CreditCard, CheckCircle2, Clock, AlertTriangle, Download, IndianRupee, Calendar, FileText, ChevronRight } from "lucide-react";

interface PaymentRecord {
  id: string;
  milestone: string;
  percentage: number;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "Paid" | "Due" | "Upcoming" | "Overdue";
  receiptNo?: string;
  mode?: string;
}

interface UpcomingDue {
  milestone: string;
  amount: number;
  dueDate: string;
  daysLeft: number;
}

const payments: PaymentRecord[] = [
  { id: "pay-001", milestone: "Booking Amount", percentage: 5, amount: 925000, dueDate: "Jan 15, 2026", paidDate: "Jan 12, 2026", status: "Paid", receiptNo: "GPL-REC-0012451", mode: "NEFT" },
  { id: "pay-002", milestone: "Agreement Execution", percentage: 10, amount: 1850000, dueDate: "Feb 28, 2026", paidDate: "Feb 25, 2026", status: "Paid", receiptNo: "GPL-REC-0012892", mode: "RTGS" },
  { id: "pay-003", milestone: "Excavation / Foundation", percentage: 10, amount: 1850000, dueDate: "May 15, 2026", paidDate: "May 14, 2026", status: "Paid", receiptNo: "GPL-REC-0013440", mode: "RTGS" },
  { id: "pay-004", milestone: "Plinth Completion", percentage: 10, amount: 1850000, dueDate: "Aug 30, 2026", status: "Due" },
  { id: "pay-005", milestone: "Floor Slab — 5th Level", percentage: 10, amount: 1850000, dueDate: "Dec 31, 2026", status: "Upcoming" },
  { id: "pay-006", milestone: "Floor Slab — 10th Level", percentage: 10, amount: 1850000, dueDate: "Apr 30, 2027", status: "Upcoming" },
  { id: "pay-007", milestone: "Floor Slab — 15th Level", percentage: 10, amount: 1850000, dueDate: "Aug 31, 2027", status: "Upcoming" },
  { id: "pay-008", milestone: "Brickwork & Plaster", percentage: 10, amount: 1850000, dueDate: "Jan 31, 2028", status: "Upcoming" },
  { id: "pay-009", milestone: "Flooring & Tiling", percentage: 10, amount: 1850000, dueDate: "Jun 30, 2028", status: "Upcoming" },
  { id: "pay-010", milestone: "Possession & Handover", percentage: 15, amount: 2775000, dueDate: "Dec 31, 2028", status: "Upcoming" },
];

const totalValue = 18500000;
const paid = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
const paidPct = Math.round((paid / totalValue) * 100);

const STATUS_CONFIG: Record<PaymentRecord["status"], { color: string; icon: React.ReactNode }> = {
  Paid: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="w-3 h-3" /> },
  Due: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Clock className="w-3 h-3" /> },
  Overdue: { color: "bg-red-100 text-red-700 border-red-200", icon: <AlertTriangle className="w-3 h-3" /> },
  Upcoming: { color: "bg-zinc-100 text-zinc-600 border-zinc-200", icon: <Calendar className="w-3 h-3" /> },
};

function fmt(v: number) {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
  return `₹${(v / 100000).toFixed(2)}L`;
}

export default function BuyerPaymentsPage() {
  const [tab, setTab] = useState("schedule");

  const due = payments.filter((p) => p.status === "Due");
  const upcoming = payments.filter((p) => p.status === "Upcoming");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">My Payments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Godrej Meridien — Tower A, Unit A-1208 · 3 BHK · ₹1.85 Cr</p>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Download className="w-3.5 h-3.5" /> Download Statement
        </Button>
      </div>

      {/* Progress banner */}
      <Card className="border border-primary/20 bg-gradient-to-r from-primary/5 to-indigo-50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold">Payment Progress</p>
              <p className="text-xs text-muted-foreground mt-0.5">{fmt(paid)} paid of {fmt(totalValue)}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{paidPct}%</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
          <Progress value={paidPct} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{fmt(paid)} paid</span>
            <span>{fmt(totalValue - paid)} remaining</span>
          </div>
        </CardContent>
      </Card>

      {/* Due now alert */}
      {due.length > 0 && (
        <Card className="border border-amber-200 bg-amber-50">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-amber-800">Payment Due</p>
                <p className="text-xs text-amber-700">{due[0].milestone} — {fmt(due[0].amount)} by {due[0].dueDate}</p>
              </div>
            </div>
            <Button size="sm" className="h-8 text-xs bg-amber-600 hover:bg-amber-700">Pay Now</Button>
          </CardContent>
        </Card>
      )}

      <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
        <TabsList className="h-8">
          <TabsTrigger value="schedule" className="text-xs h-7">Payment Schedule</TabsTrigger>
          <TabsTrigger value="receipts" className="text-xs h-7">Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardContent className="p-0">
              {payments.map((p, i) => {
                const cfg = STATUS_CONFIG[p.status];
                return (
                  <div key={p.id} className={`flex items-center gap-4 px-4 py-3 ${i < payments.length - 1 ? "border-b border-border/50" : ""} hover:bg-muted/30 transition-colors`}>
                    {/* Step indicator */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${p.status === "Paid" ? "bg-emerald-100 text-emerald-700" : p.status === "Due" ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"}`}>
                      {p.status === "Paid" ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{p.milestone}</p>
                        <Badge className={`border text-[10px] gap-1 ${cfg.color}`}>{cfg.icon}{p.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {p.percentage}% · Due: {p.dueDate}
                        {p.paidDate && ` · Paid: ${p.paidDate}`}
                        {p.mode && ` · ${p.mode}`}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-sm">{fmt(p.amount)}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts" className="mt-4">
          <div className="grid gap-2">
            {payments.filter((p) => p.status === "Paid").map((p) => (
              <Card key={p.id} className="border hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.milestone}</p>
                    <p className="text-xs text-muted-foreground">{p.receiptNo} · Paid on {p.paidDate}</p>
                  </div>
                  <p className="font-semibold text-sm">{fmt(p.amount)}</p>
                  <Download className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
