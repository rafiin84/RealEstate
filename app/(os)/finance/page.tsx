"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Building2,
  CreditCard,
  Banknote,
  Wallet,
} from "lucide-react";
import { bookings, projects, revenueChartData } from "@/lib/mock-data";
import type { Project, Booking } from "@/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const TOOLTIP_STYLE = {
  fontSize: 12,
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--card-foreground)",
};

const PROJECT_COLORS = ["#6366f1", "#06b6d4", "#22c55e", "#f59e0b", "#ec4899"];

// ─── Mock Finance Data ────────────────────────────────────────────────────────

const PAYMENT_TRANSACTIONS = [
  { id: "txn-001", date: "2024-07-18", bookingId: "bk001", buyer: "Rajesh Kumar", project: "Prestige Heights", amount: 1500000, mode: "NEFT", status: "Cleared" },
  { id: "txn-002", date: "2024-07-15", bookingId: "bk003", buyer: "Fatima Sheikh", project: "Skyline Villas", amount: 5000000, mode: "RTGS", status: "Cleared" },
  { id: "txn-003", date: "2024-07-12", bookingId: "bk002", buyer: "Priya Sharma", project: "Prestige Heights", amount: 1300000, mode: "Cheque", status: "Clearing" },
  { id: "txn-004", date: "2024-07-10", bookingId: "bk001", buyer: "Rajesh Kumar", project: "Prestige Heights", amount: 2000000, mode: "NEFT", status: "Cleared" },
  { id: "txn-005", date: "2024-07-08", bookingId: "bk003", buyer: "Fatima Sheikh", project: "Skyline Villas", amount: 10000000, mode: "RTGS", status: "Cleared" },
  { id: "txn-006", date: "2024-07-05", bookingId: "bk002", buyer: "Priya Sharma", project: "Prestige Heights", amount: 500000, mode: "UPI", status: "Cleared" },
  { id: "txn-007", date: "2024-07-02", bookingId: "bk003", buyer: "Fatima Sheikh", project: "Skyline Villas", amount: 7000000, mode: "RTGS", status: "Cleared" },
  { id: "txn-008", date: "2024-06-28", bookingId: "bk001", buyer: "Rajesh Kumar", project: "Prestige Heights", amount: 2400000, mode: "NEFT", status: "Cleared" },
  { id: "txn-009", date: "2024-06-20", bookingId: "bk002", buyer: "Priya Sharma", project: "Prestige Heights", amount: 1300000, mode: "Cheque", status: "Bounced" },
  { id: "txn-010", date: "2024-06-15", bookingId: "bk003", buyer: "Fatima Sheikh", project: "Skyline Villas", amount: 20000000, mode: "RTGS", status: "Cleared" },
  { id: "txn-011", date: "2024-06-10", bookingId: "bk001", buyer: "Rajesh Kumar", project: "Prestige Heights", amount: 1800000, mode: "NEFT", status: "Cleared" },
  { id: "txn-012", date: "2024-05-30", bookingId: "bk002", buyer: "Priya Sharma", project: "Prestige Heights", amount: 800000, mode: "UPI", status: "Cleared" },
];

const AGING_BUCKETS = [
  {
    label: "0–30 days",
    color: "#22c55e",
    colorBg: "#22c55e15",
    records: [
      { buyer: "Priya Sharma", project: "Prestige Heights", unit: "B-801", dueDate: "2024-07-01", overdueDays: 19, amount: 1500000 },
      { buyer: "Nexus Retail Ltd", project: "Central Square", unit: "C-201", dueDate: "2024-07-05", overdueDays: 15, amount: 3200000 },
      { buyer: "Arjun Mehta", project: "Prestige Heights", unit: "A-401", dueDate: "2024-07-10", overdueDays: 10, amount: 900000 },
    ],
  },
  {
    label: "31–60 days",
    color: "#f59e0b",
    colorBg: "#f59e0b15",
    records: [
      { buyer: "Rajesh Kumar", project: "Prestige Heights", unit: "A-201", dueDate: "2024-06-18", overdueDays: 32, amount: 2000000 },
      { buyer: "Deepak Agarwal", project: "Central Square", unit: "C-301", dueDate: "2024-06-12", overdueDays: 38, amount: 5500000 },
    ],
  },
  {
    label: "61–90 days",
    color: "#f97316",
    colorBg: "#f9731615",
    records: [
      { buyer: "Sunita Patel", project: "Skyline Villas", unit: "V-007", dueDate: "2024-05-22", overdueDays: 59, amount: 8000000 },
    ],
  },
  {
    label: "90+ days",
    color: "#ef4444",
    colorBg: "#ef444415",
    records: [
      { buyer: "Rohit Bajaj", project: "Central Square", unit: "C-101", dueDate: "2024-04-10", overdueDays: 101, amount: 4200000 },
      { buyer: "Meera Krishnan", project: "Prestige Heights", unit: "A-105", dueDate: "2024-04-02", overdueDays: 109, amount: 1800000 },
    ],
  },
];

const PNL_DATA = [
  { month: "Apr", revenue: 12.4, cost: 8.2, gross: 4.2 },
  { month: "May", revenue: 18.2, cost: 11.8, gross: 6.4 },
  { month: "Jun", revenue: 15.8, cost: 10.5, gross: 5.3 },
  { month: "Jul", revenue: 22.1, cost: 14.2, gross: 7.9 },
  { month: "Aug", revenue: 19.5, cost: 12.8, gross: 6.7 },
  { month: "Sep", revenue: 24.8, cost: 15.6, gross: 9.2 },
  { month: "Oct", revenue: 21.3, cost: 13.9, gross: 7.4 },
  { month: "Nov", revenue: 28.6, cost: 17.2, gross: 11.4 },
  { month: "Dec", revenue: 26.4, cost: 16.1, gross: 10.3 },
  { month: "Jan", revenue: 31.2, cost: 18.5, gross: 12.7 },
  { month: "Feb", revenue: 29.8, cost: 17.9, gross: 11.9 },
  { month: "Mar", revenue: 35.6, cost: 20.4, gross: 15.2 },
];

const COST_BREAKDOWN = [
  { label: "Construction Cost", amount: 8420000000, pct: 49.2, color: "#6366f1" },
  { label: "Land Acquisition", amount: 3680000000, pct: 21.5, color: "#06b6d4" },
  { label: "Marketing & Sales", amount: 1840000000, pct: 10.7, color: "#22c55e" },
  { label: "Admin & Overheads", amount: 1380000000, pct: 8.1, color: "#f59e0b" },
  { label: "Finance Costs", amount: 920000000, pct: 5.4, color: "#ec4899" },
  { label: "Legal & Compliance", amount: 860000000, pct: 5.1, color: "#a78bfa" },
];

// ─── KPI Cards ────────────────────────────────────────────────────────────────

const KPI_ITEMS = [
  {
    title: "Total Revenue",
    value: "₹184 Cr",
    sub: "Booked across all projects",
    change: 12.4,
    icon: IndianRupee,
    color: "#6366f1",
  },
  {
    title: "Total Collections",
    value: "₹118 Cr",
    sub: "Received this FY",
    change: 8.1,
    icon: Wallet,
    color: "#06b6d4",
  },
  {
    title: "Pending Receivables",
    value: "₹66 Cr",
    sub: "Outstanding balance",
    change: -4.2,
    icon: CreditCard,
    color: "#f59e0b",
  },
  {
    title: "Overdue",
    value: "₹8.2 Cr",
    sub: "Past due date",
    change: -18.6,
    icon: AlertTriangle,
    color: "#ef4444",
  },
  {
    title: "This Month",
    value: "₹14.8 Cr",
    sub: "Collections in July",
    change: 6.3,
    icon: TrendingUp,
    color: "#22c55e",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; dot: string }> = {
    Cleared: { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
    Clearing: { bg: "bg-amber-50 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
    Bounced: { bg: "bg-red-50 dark:bg-red-950/40", text: "text-red-700 dark:text-red-400", dot: "bg-red-500" },
  };
  const s = map[status] ?? map.Clearing;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function ModeIcon({ mode }: { mode: string }) {
  if (mode === "RTGS" || mode === "NEFT") return <Banknote className="w-3.5 h-3.5 text-muted-foreground" />;
  if (mode === "Cheque") return <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />;
  return <Wallet className="w-3.5 h-3.5 text-muted-foreground" />;
}

// ─── Sub-sections ─────────────────────────────────────────────────────────────

function ChartTooltip(props: Parameters<typeof Tooltip>[0]) {
  return (
    <Tooltip
      contentStyle={TOOLTIP_STYLE}
      labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
      {...props}
    />
  );
}

function OverviewTab({ typedProjects }: { typedProjects: Project[] }) {
  return (
    <div className="space-y-5">
      {/* Area Chart */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <CardTitle className="text-sm font-semibold">Revenue vs Collections</CardTitle>
              <CardDescription className="text-xs mt-0.5">Monthly trend FY 2023–24 (₹ Cr)</CardDescription>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#6366f1" }} />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#06b6d4" }} />
                Collections
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueChartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="gradFinRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradFinCollections" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in oklch, var(--border), transparent 30%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit=" Cr" />
              <ChartTooltip formatter={(v) => [`₹${v} Cr`, ""]} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#gradFinRevenue)" name="Revenue (₹Cr)" />
              <Area type="monotone" dataKey="collections" stroke="#06b6d4" strokeWidth={2} fill="url(#gradFinCollections)" name="Collections (₹Cr)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Project-wise Revenue Breakdown */}
      <div>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Project-wise Revenue Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {typedProjects.map((proj, idx) => {
            const collectedPct = proj.collectedRevenue > 0
              ? Math.round((proj.collectedRevenue / proj.totalRevenue) * 100)
              : 0;
            const pending = proj.totalRevenue - proj.collectedRevenue;
            const accentColor = PROJECT_COLORS[idx % PROJECT_COLORS.length];
            return (
              <Card key={proj.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="p-1.5 rounded-md shrink-0"
                        style={{ background: accentColor + "18" }}
                      >
                        <Building2 className="w-3.5 h-3.5" style={{ color: accentColor }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{proj.name}</p>
                        <p className="text-[10px] text-muted-foreground">{proj.location.city} · {proj.type}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] h-5 px-1.5 shrink-0 whitespace-nowrap"
                      style={{ borderColor: accentColor + "60", color: accentColor }}
                    >
                      {proj.status}
                    </Badge>
                  </div>

                  {/* Revenue figures */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Total Revenue</p>
                      <p className="text-sm font-bold text-foreground mt-0.5">
                        {fmt(proj.totalRevenue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Collected</p>
                      <p className="text-sm font-bold mt-0.5" style={{ color: accentColor }}>
                        {fmt(proj.collectedRevenue)}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>Collection progress</span>
                      <span className="font-semibold" style={{ color: accentColor }}>{collectedPct}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${collectedPct}%`, background: accentColor }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>Pending: {fmt(pending)}</span>
                      <span>{proj.soldUnits}/{proj.totalUnits} units sold</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CollectionsTab() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="text-sm font-semibold">Payment Transactions</CardTitle>
            <CardDescription className="text-xs mt-0.5">All payment receipts across projects</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {PAYMENT_TRANSACTIONS.filter(t => t.status === "Cleared").length} Cleared
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {PAYMENT_TRANSACTIONS.filter(t => t.status === "Clearing").length} Clearing
            </span>
            <span className="flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-red-500" />
              {PAYMENT_TRANSACTIONS.filter(t => t.status === "Bounced").length} Bounced
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2.5">Date</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2.5">Booking ID</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2.5">Buyer</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2.5">Project</th>
                <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-2.5">Amount</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2.5">Mode</th>
                <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {PAYMENT_TRANSACTIONS.map((txn, i) => (
                <tr
                  key={txn.id}
                  className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}
                >
                  <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(txn.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">{txn.bookingId.toUpperCase()}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <p className="text-xs font-medium text-foreground">{txn.buyer}</p>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground max-w-[140px] truncate">{txn.project}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className="text-xs font-semibold text-foreground tabular-nums">{fmt(txn.amount)}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <ModeIcon mode={txn.mode} />
                      {txn.mode}
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusPill status={txn.status} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border bg-muted/30">
                <td colSpan={4} className="px-4 py-2.5 text-xs font-semibold text-muted-foreground">Total</td>
                <td className="px-4 py-2.5 text-right text-xs font-bold text-foreground tabular-nums">
                  {fmt(PAYMENT_TRANSACTIONS.reduce((s, t) => s + (t.status !== "Bounced" ? t.amount : 0), 0))}
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function ReceivablesTab() {
  const totalOverdue = AGING_BUCKETS.flatMap(b => b.records).reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-5">
      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {AGING_BUCKETS.map(bucket => {
          const total = bucket.records.reduce((s, r) => s + r.amount, 0);
          return (
            <Card key={bucket.label} className="py-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-muted-foreground">{bucket.label}</span>
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: bucket.colorBg, color: bucket.color }}
                  >
                    {bucket.records.length} dues
                  </span>
                </div>
                <p className="text-lg font-bold" style={{ color: bucket.color }}>{fmt(total)}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {Math.round((total / totalOverdue) * 100)}% of overdue
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Aging Tables */}
      <div className="space-y-4">
        {AGING_BUCKETS.map(bucket => (
          <Card key={bucket.label} className="overflow-hidden">
            <div
              className="px-4 py-2.5 border-b border-border flex items-center justify-between"
              style={{ background: bucket.colorBg }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: bucket.color }}
                />
                <span className="text-xs font-semibold" style={{ color: bucket.color }}>
                  {bucket.label} Overdue
                </span>
                <span className="text-[10px] text-muted-foreground">
                  ({bucket.records.length} {bucket.records.length === 1 ? "record" : "records"})
                </span>
              </div>
              <span className="text-xs font-bold" style={{ color: bucket.color }}>
                {fmt(bucket.records.reduce((s, r) => s + r.amount, 0))}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2">Buyer</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2">Project</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2">Unit</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2">Due Date</th>
                    <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-2">Days Overdue</th>
                    <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-2">Amount</th>
                    <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bucket.records.map((rec, i) => (
                    <tr key={i} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-2.5">
                        <p className="text-xs font-medium text-foreground">{rec.buyer}</p>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{rec.project}</td>
                      <td className="px-4 py-2.5">
                        <span className="text-xs font-mono text-foreground">{rec.unit}</span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">
                        {new Date(rec.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <span
                          className="inline-flex items-center gap-1 text-xs font-semibold tabular-nums"
                          style={{ color: bucket.color }}
                        >
                          <Clock className="w-3 h-3" />
                          {rec.overdueDays}d
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right text-xs font-bold text-foreground tabular-nums">
                        {fmt(rec.amount)}
                      </td>
                      <td className="px-4 py-2.5">
                        <Button variant="ghost" size="sm" className="h-6 text-[11px] px-2 gap-1 text-muted-foreground hover:text-foreground">
                          Send Reminder
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PandLTab() {
  const totalRevenue = 18400000000;
  const totalCost = PNL_DATA.reduce((s, d) => s + d.cost, 0) * 10_000_000;
  const grossProfit = totalRevenue - totalCost;
  const grossMargin = Math.round((grossProfit / totalRevenue) * 100);
  const operatingExpenses = 920000000;
  const ebit = grossProfit - operatingExpenses;
  const tax = Math.round(ebit * 0.25);
  const netProfit = ebit - tax;
  const netMargin = Math.round((netProfit / totalRevenue) * 100);

  return (
    <div className="space-y-5">
      {/* P&L Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Gross Revenue", value: fmt(totalRevenue), icon: TrendingUp, color: "#6366f1" },
          { label: "Total Cost", value: fmt(totalCost), icon: TrendingDown, color: "#ef4444" },
          { label: "Gross Profit", value: fmt(grossProfit), icon: IndianRupee, color: "#22c55e" },
          { label: "Gross Margin", value: `${grossMargin}%`, icon: ArrowUpRight, color: "#06b6d4" },
          { label: "Net Profit", value: fmt(netProfit), icon: Wallet, color: "#22c55e" },
          { label: "Net Margin", value: `${netMargin}%`, icon: ArrowUpRight, color: "#06b6d4" },
        ].map(item => (
          <Card key={item.label} className="py-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                <p className="text-[10px] text-muted-foreground font-medium">{item.label}</p>
              </div>
              <p className="text-base font-bold text-foreground" style={{ color: item.label.includes("Margin") || item.label.includes("Profit") ? item.color : undefined }}>
                {item.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bar Chart + Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
        {/* Monthly Revenue vs Cost vs Gross Profit */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <CardTitle className="text-sm font-semibold">Monthly Revenue vs Cost vs Gross Profit</CardTitle>
                <CardDescription className="text-xs mt-0.5">FY 2023–24 (₹ Cr)</CardDescription>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2 rounded-sm" style={{ background: "#6366f1" }} />
                  Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2 rounded-sm" style={{ background: "#ef4444" }} />
                  Cost
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2 rounded-sm" style={{ background: "#22c55e" }} />
                  Gross Profit
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={PNL_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="color-mix(in oklch, var(--border), transparent 30%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} unit=" Cr" />
                <ChartTooltip formatter={(v) => [`₹${v} Cr`, ""]} />
                <Bar dataKey="revenue" fill="#6366f1" radius={[3, 3, 0, 0]} name="Revenue (₹Cr)" maxBarSize={24} />
                <Bar dataKey="cost" fill="#ef4444" radius={[3, 3, 0, 0]} name="Cost (₹Cr)" maxBarSize={24} />
                <Bar dataKey="gross" fill="#22c55e" radius={[3, 3, 0, 0]} name="Gross Profit (₹Cr)" maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Cost Breakdown</CardTitle>
            <CardDescription className="text-xs mt-0.5">Cumulative spend across all projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {COST_BREAKDOWN.map(item => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className="text-xs text-foreground truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-xs font-semibold text-foreground tabular-nums">{fmt(item.amount)}</span>
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{item.pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.pct}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* P&L Statement */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">P&amp;L Statement — FY 2023–24</CardTitle>
          <CardDescription className="text-xs mt-0.5">Consolidated across all projects</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-[11px] font-semibold text-muted-foreground px-4 py-2.5 w-8/12">Line Item</th>
                <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-2.5">Amount</th>
                <th className="text-right text-[11px] font-semibold text-muted-foreground px-4 py-2.5">% of Revenue</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {[
                { label: "Gross Revenue from Operations", amount: totalRevenue, pct: 100, bold: true, indent: false },
                { label: "Less: Construction Cost", amount: -8420000000, pct: -49.2, bold: false, indent: true },
                { label: "Less: Land Acquisition Cost", amount: -3680000000, pct: -21.5, bold: false, indent: true },
                { label: "Gross Profit", amount: grossProfit, pct: grossMargin, bold: true, indent: false, highlight: true },
                { label: "Less: Marketing & Sales Expenses", amount: -1840000000, pct: -10.7, bold: false, indent: true },
                { label: "Less: Admin & Overhead Expenses", amount: -1380000000, pct: -8.1, bold: false, indent: true },
                { label: "Less: Finance & Interest Costs", amount: -920000000, pct: -5.4, bold: false, indent: true },
                { label: "Less: Legal & Compliance", amount: -860000000, pct: -5.1, bold: false, indent: true },
                { label: "EBIT (Operating Profit)", amount: ebit, pct: Math.round((ebit / totalRevenue) * 100), bold: true, indent: false, highlight: true },
                { label: "Less: Tax @ 25%", amount: -tax, pct: -Math.round((tax / totalRevenue) * 100), bold: false, indent: true },
                { label: "Net Profit After Tax", amount: netProfit, pct: netMargin, bold: true, indent: false, green: true },
              ].map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-border/50 ${row.highlight ? "bg-muted/30" : ""} ${row.green ? "bg-emerald-50/50 dark:bg-emerald-950/20" : ""}`}
                >
                  <td className={`px-4 py-2.5 ${row.indent ? "pl-8 text-muted-foreground" : ""} ${row.bold ? "font-semibold text-foreground" : ""}`}>
                    {row.label}
                  </td>
                  <td className={`px-4 py-2.5 text-right tabular-nums ${row.bold ? "font-bold" : ""} ${row.amount < 0 ? "text-red-600 dark:text-red-400" : row.green ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                    {row.amount < 0 ? `(${fmt(Math.abs(row.amount))})` : fmt(row.amount)}
                  </td>
                  <td className={`px-4 py-2.5 text-right tabular-nums text-muted-foreground ${row.bold ? "font-semibold" : ""}`}>
                    {row.pct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FinancePage() {
  const [tab, setTab] = useState("overview");
  const [dateRange, setDateRange] = useState("FY 2023–24");
  const typedProjects = projects as Project[];
  const typedBookings = bookings as Booking[];

  // Suppress unused variable lint warnings — these are available for future use
  void typedBookings;

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">

        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Finance</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Revenue · Collections · Receivables · P&amp;L
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {/* Date Range Picker (text button) */}
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 h-8 text-xs"
              onClick={() =>
                setDateRange(
                  dateRange === "FY 2023–24" ? "FY 2024–25" : "FY 2023–24"
                )
              }
            >
              <Calendar className="w-3.5 h-3.5" />
              {dateRange}
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
              <Download className="w-3.5 h-3.5" />
              Export
            </Button>
          </div>
        </div>

        {/* ── KPI Row ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {KPI_ITEMS.map((kpi, i) => (
            <Card key={i} className="py-0 relative overflow-hidden">
              {/* accent stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                style={{ background: kpi.color }}
              />
              <CardContent className="p-4 pl-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-muted-foreground truncate">{kpi.title}</p>
                    <p className="text-2xl font-bold tracking-tight mt-1.5 text-foreground">{kpi.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{kpi.sub}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      {kpi.change >= 0 ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      )}
                      <span
                        className={`text-xs font-medium ${kpi.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {kpi.change > 0 ? "+" : ""}{kpi.change}%
                      </span>
                      <span className="text-[10px] text-muted-foreground">vs last FY</span>
                    </div>
                  </div>
                  <div
                    className="p-2 rounded-lg shrink-0"
                    style={{ background: kpi.color + "18" }}
                  >
                    <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="collections" className="text-xs">Collections</TabsTrigger>
            <TabsTrigger value="receivables" className="text-xs">Receivables</TabsTrigger>
            <TabsTrigger value="pnl" className="text-xs">P&amp;L</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <OverviewTab typedProjects={typedProjects} />
          </TabsContent>

          <TabsContent value="collections" className="mt-0">
            <CollectionsTab />
          </TabsContent>

          <TabsContent value="receivables" className="mt-0">
            <ReceivablesTab />
          </TabsContent>

          <TabsContent value="pnl" className="mt-0">
            <PandLTab />
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
