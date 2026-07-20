"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  IndianRupee,
  MapPin,
  Calendar,
  ChevronRight,
  Home,
  Layers,
  AlertCircle,
  Receipt,
  ShieldCheck,
  Phone,
  User,
  Landmark,
  TrendingUp,
} from "lucide-react";

// ─── Mock data ──────────────────────────────────────────────────────────────

const booking = {
  id: "BKG-2024-0872",
  project: "Prestige Heights",
  unit: "A-201",
  floor: 2,
  tower: "Tower A",
  type: "3 BHK",
  area: 1620,
  price: 12400000, // ₹1.24 Cr
  status: "Agreement Done",
  bookedOn: "Jun 25, 2024",
  possessionDate: "Dec 2026",
  agent: "Vikram Singh",
  agentPhone: "+91 98765 00002",
  address: "Sector 75, Noida, UP 201301",
  reraNumber: "UPRERAPRJ23456",
  amenities: ["Swimming Pool", "Clubhouse", "Gym", "Jogging Track", "24x7 Security"],
};

type PaymentStatus = "paid" | "upcoming" | "future";

const paymentSchedule: {
  id: string;
  milestone: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paidOn?: string;
  txnId?: string;
}[] = [
  {
    id: "pay-001",
    milestone: "Booking Amount",
    percentage: 5,
    amount: 620000,
    dueDate: "Jun 25, 2024",
    status: "paid",
    paidOn: "Jun 25, 2024",
    txnId: "TXN98765001",
  },
  {
    id: "pay-002",
    milestone: "Allotment",
    percentage: 10,
    amount: 1240000,
    dueDate: "Jul 15, 2024",
    status: "paid",
    paidOn: "Jul 14, 2024",
    txnId: "TXN98765042",
  },
  {
    id: "pay-003",
    milestone: "Agreement Execution",
    percentage: 10,
    amount: 1240000,
    dueDate: "Aug 5, 2024",
    status: "upcoming",
  },
  {
    id: "pay-004",
    milestone: "Plinth Level",
    percentage: 15,
    amount: 1860000,
    dueDate: "Dec 2024",
    status: "future",
  },
  {
    id: "pay-005",
    milestone: "5th Floor Slab",
    percentage: 15,
    amount: 1860000,
    dueDate: "Apr 2025",
    status: "future",
  },
  {
    id: "pay-006",
    milestone: "10th Floor Slab",
    percentage: 15,
    amount: 1860000,
    dueDate: "Sep 2025",
    status: "future",
  },
  {
    id: "pay-007",
    milestone: "Top Slab / Terrace",
    percentage: 15,
    amount: 1860000,
    dueDate: "Mar 2026",
    status: "future",
  },
  {
    id: "pay-008",
    milestone: "Possession",
    percentage: 15,
    amount: 1860000,
    dueDate: "Dec 2026",
    status: "future",
  },
];

type DocumentStatus = "available" | "pending" | "processing";

const documents: {
  id: string;
  name: string;
  type: string;
  uploadedOn?: string;
  status: DocumentStatus;
  size?: string;
}[] = [
  {
    id: "doc-001",
    name: "Booking Form",
    type: "PDF",
    uploadedOn: "Jun 25, 2024",
    status: "available",
    size: "1.2 MB",
  },
  {
    id: "doc-002",
    name: "Allotment Letter",
    type: "PDF",
    uploadedOn: "Jun 30, 2024",
    status: "available",
    size: "0.8 MB",
  },
  {
    id: "doc-003",
    name: "Sale Agreement",
    type: "PDF",
    uploadedOn: "Jul 16, 2024",
    status: "available",
    size: "3.4 MB",
  },
  {
    id: "doc-004",
    name: "Payment Receipt — Booking",
    type: "PDF",
    uploadedOn: "Jun 25, 2024",
    status: "available",
    size: "0.3 MB",
  },
  {
    id: "doc-005",
    name: "Payment Receipt — Allotment",
    type: "PDF",
    uploadedOn: "Jul 14, 2024",
    status: "available",
    size: "0.3 MB",
  },
  {
    id: "doc-006",
    name: "Agreement Receipt",
    type: "PDF",
    status: "pending",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

const totalPaid = paymentSchedule
  .filter((p) => p.status === "paid")
  .reduce((s, p) => s + p.amount, 0);

const paidPercent = Math.round((totalPaid / booking.price) * 100);

const statusBadge: Record<PaymentStatus, string> = {
  paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  upcoming: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  future: "bg-slate-500/15 text-slate-500 border-slate-600/30",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<"timeline" | "payments" | "documents">("timeline");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="border-b border-white/5 bg-gradient-to-br from-slate-900 via-[#0f0f1a] to-[#0a0a0f] px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium text-violet-400 tracking-widest uppercase mb-1">Buyer OS</p>
          <h1 className="text-2xl font-bold tracking-tight">My Booking</h1>
          <p className="text-slate-400 text-sm mt-1">
            Booking ID: <span className="font-mono text-slate-300">{booking.id}</span>
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* ── Property Card ────────────────────────────────────────────── */}
        <Card className="bg-[#12121f] border-white/8 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-violet-600/25 via-purple-600/15 to-transparent p-6 border-b border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center shrink-0">
                    <Building2 className="w-7 h-7 text-violet-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-white">{booking.project}</h2>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px]">
                        <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      {booking.address}
                    </div>
                    <p className="text-[10px] font-mono text-slate-600 mt-1">RERA: {booking.reraNumber}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-xl border-white/10 text-slate-400 bg-white/5 hover:bg-white/10 text-xs gap-1.5 shrink-0"
                >
                  <Phone className="w-3 h-3" />
                  Call Agent
                </Button>
              </div>
            </div>

            {/* Unit details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-y divide-white/5">
              {[
                { icon: Home, label: "Unit", value: `${booking.tower}, ${booking.unit}` },
                { icon: Layers, label: "Configuration", value: `${booking.type} · ${booking.area} sqft` },
                { icon: IndianRupee, label: "Total Price", value: formatCurrency(booking.price) },
                { icon: Calendar, label: "Possession", value: booking.possessionDate },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Payment Summary ──────────────────────────────────────────── */}
        <Card className="bg-[#12121f] border-white/8 rounded-2xl">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Payment Summary</h3>
              <span className="text-xs text-slate-400">{paidPercent}% paid</span>
            </div>
            <Progress value={paidPercent} className="h-2 bg-white/5" />
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3">
                <p className="text-[10px] text-emerald-400 mb-1">Amount Paid</p>
                <p className="text-base font-bold text-emerald-300">{formatCurrency(totalPaid)}</p>
              </div>
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
                <p className="text-[10px] text-amber-400 mb-1">Next Due</p>
                <p className="text-base font-bold text-amber-300">{formatCurrency(1240000)}</p>
                <p className="text-[9px] text-amber-500 mt-0.5">Aug 5, 2024</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/8 p-3">
                <p className="text-[10px] text-slate-400 mb-1">Balance</p>
                <p className="text-base font-bold text-white">{formatCurrency(booking.price - totalPaid)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Tab Navigation ───────────────────────────────────────────── */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/8 w-fit">
          {(["timeline", "payments", "documents"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-8 px-4 rounded-lg text-xs font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab === "timeline" ? "Booking Timeline" : tab === "payments" ? "Payment Schedule" : "Documents"}
            </button>
          ))}
        </div>

        {/* ── Booking Timeline ─────────────────────────────────────────── */}
        {activeTab === "timeline" && (
          <Card className="bg-[#12121f] border-white/8 rounded-2xl">
            <CardHeader className="pb-2 px-5 pt-5">
              <CardTitle className="text-sm font-semibold text-white">Booking Timeline</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="relative">
                <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/8" />
                <div className="space-y-5">
                  {[
                    { label: "Inquiry & Site Visit", date: "Jun 18, 2024", done: true },
                    { label: "Unit Blocked", date: "Jun 23, 2024", done: true },
                    { label: "Booking Amount Paid", date: "Jun 25, 2024", done: true },
                    { label: "Allotment Letter Issued", date: "Jun 30, 2024", done: true },
                    { label: "Sale Agreement Signed", date: "Jul 16, 2024", done: true, active: true },
                    { label: "Agreement Registration", date: "Aug 2024", done: false },
                    { label: "Construction Milestones & Payments", date: "2024–2026", done: false },
                    { label: "Possession", date: "Dec 2026", done: false },
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 relative">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ring-2 ${
                          step.done && step.active
                            ? "bg-violet-600 ring-violet-500/30"
                            : step.done
                            ? "bg-emerald-500 ring-emerald-500/20"
                            : "bg-[#12121f] ring-white/10 border border-white/15"
                        }`}
                      >
                        {step.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-white/20" />
                        )}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p
                          className={`text-sm font-medium ${
                            step.active ? "text-violet-300" : step.done ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {step.label}
                          {step.active && (
                            <Badge className="ml-2 bg-violet-500/20 text-violet-300 border-violet-500/30 text-[9px]">
                              Current
                            </Badge>
                          )}
                        </p>
                        <p className="text-[11px] text-slate-600 mt-0.5">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Payment Schedule ─────────────────────────────────────────── */}
        {activeTab === "payments" && (
          <Card className="bg-[#12121f] border-white/8 rounded-2xl overflow-hidden">
            <CardHeader className="pb-0 px-5 pt-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-white">Payment Schedule</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 rounded-xl border-white/10 text-slate-400 bg-white/5 hover:bg-white/10 text-xs gap-1.5"
                >
                  <Download className="w-3 h-3" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5 pt-4">
              <div className="rounded-xl overflow-hidden border border-white/8">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/8">
                      <th className="text-left px-4 py-3 text-slate-400 font-medium">Milestone</th>
                      <th className="text-right px-4 py-3 text-slate-400 font-medium hidden sm:table-cell">%</th>
                      <th className="text-right px-4 py-3 text-slate-400 font-medium">Amount</th>
                      <th className="text-center px-4 py-3 text-slate-400 font-medium hidden md:table-cell">Due Date</th>
                      <th className="text-center px-4 py-3 text-slate-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentSchedule.map((pay, idx) => (
                      <tr
                        key={pay.id}
                        className={`border-b border-white/5 last:border-0 ${
                          pay.status === "upcoming" ? "bg-amber-500/5" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <p className="text-slate-200 font-medium">{pay.milestone}</p>
                          {pay.txnId && (
                            <p className="text-[10px] font-mono text-slate-600 mt-0.5">{pay.txnId}</p>
                          )}
                          {pay.status === "upcoming" && (
                            <div className="flex items-center gap-1 mt-1 text-amber-400 text-[10px]">
                              <AlertCircle className="w-3 h-3" />
                              Due soon
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-400 hidden sm:table-cell">{pay.percentage}%</td>
                        <td className="px-4 py-3 text-right font-semibold text-white">
                          {formatCurrency(pay.amount)}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-400 hidden md:table-cell">{pay.dueDate}</td>
                        <td className="px-4 py-3 text-center">
                          <Badge className={`border text-[10px] ${statusBadge[pay.status]}`}>
                            {pay.status === "paid" ? "Paid" : pay.status === "upcoming" ? "Due Soon" : "Upcoming"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-white/5 border-t border-white/10">
                      <td className="px-4 py-3 text-slate-300 font-semibold">Total</td>
                      <td className="px-4 py-3 text-right text-slate-400 hidden sm:table-cell">100%</td>
                      <td className="px-4 py-3 text-right font-bold text-white">{formatCurrency(booking.price)}</td>
                      <td className="hidden md:table-cell" />
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Documents ────────────────────────────────────────────────── */}
        {activeTab === "documents" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Your Documents</h3>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-xl border-white/10 text-slate-400 bg-white/5 hover:bg-white/10 text-xs gap-1.5"
              >
                <Download className="w-3 h-3" />
                Download All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {documents.map((doc) => (
                <Card
                  key={doc.id}
                  className="bg-[#12121f] border-white/8 rounded-xl hover:border-violet-500/20 transition-all"
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        doc.status === "available"
                          ? "bg-violet-500/15"
                          : "bg-white/5"
                      }`}
                    >
                      {doc.name.includes("Receipt") ? (
                        <Receipt className={`w-5 h-5 ${doc.status === "available" ? "text-violet-400" : "text-slate-600"}`} />
                      ) : (
                        <FileText className={`w-5 h-5 ${doc.status === "available" ? "text-violet-400" : "text-slate-600"}`} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${doc.status === "available" ? "text-white" : "text-slate-600"}`}>
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {doc.uploadedOn && (
                          <span className="text-[10px] text-slate-500">{doc.uploadedOn}</span>
                        )}
                        {doc.size && (
                          <span className="text-[10px] text-slate-600">{doc.size}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {doc.status === "available" ? (
                        <>
                          <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <Badge className="bg-slate-500/15 text-slate-500 border-slate-600/30 text-[10px]">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Help block */}
            <Card className="bg-violet-900/15 border-violet-500/20 rounded-2xl">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-violet-200">Need a document?</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Contact your relationship manager or raise a request
                  </p>
                </div>
                <Button
                  size="sm"
                  className="h-8 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs shrink-0"
                >
                  Raise Request
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
