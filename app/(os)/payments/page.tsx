"use client";

import { useState } from "react";
import {
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
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  IndianRupee,
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Receipt,
  TrendingUp,
  TrendingDown,
  Banknote,
  CreditCard,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const TOOLTIP_STYLE = {
  fontSize: 12,
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--card-foreground)",
};

const KPI_DATA = [
  {
    label: "Total Collected",
    value: "₹48.2 Cr",
    sub: "FY 2026–27",
    change: +14,
    icon: IndianRupee,
    color: "#22c55e",
    positive: true,
  },
  {
    label: "Overdue Amount",
    value: "₹6.8 Cr",
    sub: "38 invoices",
    change: +8,
    icon: AlertCircle,
    color: "#ef4444",
    positive: false,
  },
  {
    label: "This Month",
    value: "₹7.4 Cr",
    sub: "vs ₹6.8 Cr last month",
    change: +9,
    icon: TrendingUp,
    color: "#6366f1",
    positive: true,
  },
  {
    label: "Pending Clearance",
    value: "₹2.1 Cr",
    sub: "12 cheques",
    change: -3,
    icon: Clock,
    color: "#f59e0b",
    positive: false,
  },
];

const MODE_STATS = [
  { mode: "NEFT", amount: 18.4, count: 214, color: "#6366f1" },
  { mode: "RTGS", amount: 22.6, count: 48, color: "#06b6d4" },
  { mode: "Cheque", amount: 4.8, count: 92, color: "#f59e0b" },
  { mode: "UPI", amount: 2.4, count: 318, color: "#22c55e" },
];

const TRANSACTIONS = [
  {
    id: "TXN-2026-001",
    date: "Jul 19, 2026",
    bookingId: "BK-1042",
    buyer: "Rajesh Kumar",
    project: "Prestige Heights",
    amount: 25_00_000,
    mode: "RTGS",
    status: "Cleared",
    receipt: "RCP-6782",
    overdue: false,
  },
  {
    id: "TXN-2026-002",
    date: "Jul 18, 2026",
    bookingId: "BK-0987",
    buyer: "Priya Sharma",
    project: "Emerald Bay",
    amount: 8_50_000,
    mode: "NEFT",
    status: "Cleared",
    receipt: "RCP-6781",
    overdue: false,
  },
  {
    id: "TXN-2026-003",
    date: "Jul 15, 2026",
    bookingId: "BK-1105",
    buyer: "Deepak Agarwal",
    project: "Skyline Residences",
    amount: 12_00_000,
    mode: "Cheque",
    status: "Pending",
    receipt: "-",
    overdue: false,
  },
  {
    id: "TXN-2026-004",
    date: "Jun 30, 2026",
    bookingId: "BK-0862",
    buyer: "Sunita Mehta",
    project: "Green Valley",
    amount: 18_75_000,
    mode: "RTGS",
    status: "Overdue",
    receipt: "-",
    overdue: true,
  },
  {
    id: "TXN-2026-005",
    date: "Jul 17, 2026",
    bookingId: "BK-1201",
    buyer: "Arjun Nair",
    project: "Marina Cove",
    amount: 5_20_000,
    mode: "UPI",
    status: "Cleared",
    receipt: "RCP-6779",
    overdue: false,
  },
  {
    id: "TXN-2026-006",
    date: "Jun 25, 2026",
    bookingId: "BK-0779",
    buyer: "Kavitha Reddy",
    project: "Lakeside Villas",
    amount: 32_00_000,
    mode: "RTGS",
    status: "Overdue",
    receipt: "-",
    overdue: true,
  },
  {
    id: "TXN-2026-007",
    date: "Jul 14, 2026",
    bookingId: "BK-1189",
    buyer: "Vikram Singh",
    project: "Prestige Heights",
    amount: 9_00_000,
    mode: "NEFT",
    status: "Cleared",
    receipt: "RCP-6777",
    overdue: false,
  },
  {
    id: "TXN-2026-008",
    date: "Jun 28, 2026",
    bookingId: "BK-0821",
    buyer: "Meera Joshi",
    project: "Emerald Bay",
    amount: 14_50_000,
    mode: "Cheque",
    status: "Overdue",
    receipt: "-",
    overdue: true,
  },
  {
    id: "TXN-2026-009",
    date: "Jul 16, 2026",
    bookingId: "BK-1175",
    buyer: "Ravi Desai",
    project: "Marina Cove",
    amount: 6_00_000,
    mode: "UPI",
    status: "Cleared",
    receipt: "RCP-6775",
    overdue: false,
  },
  {
    id: "TXN-2026-010",
    date: "Jul 13, 2026",
    bookingId: "BK-1142",
    buyer: "Neha Bhatia",
    project: "Skyline Residences",
    amount: 20_00_000,
    mode: "NEFT",
    status: "Processing",
    receipt: "-",
    overdue: false,
  },
];

const MONTHLY_COLLECTION = [
  { month: "Jan", collected: 5.2 },
  { month: "Feb", collected: 4.8 },
  { month: "Mar", collected: 7.1 },
  { month: "Apr", collected: 6.3 },
  { month: "May", collected: 5.9 },
  { month: "Jun", collected: 6.8 },
  { month: "Jul", collected: 7.4 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtAmount(amount: number) {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
  return `₹${(amount / 1_00_000).toFixed(2)} L`;
}

function statusStyle(status: string, overdue: boolean) {
  if (overdue || status === "Overdue")
    return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
  if (status === "Cleared")
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (status === "Processing")
    return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";
  return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
}

function modeStyle(mode: string) {
  const map: Record<string, string> = {
    RTGS: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    NEFT: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    Cheque: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    UPI: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  };
  return map[mode] ?? "bg-muted text-muted-foreground";
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PaymentsPage() {
  const [tab, setTab] = useState("transactions");
  const [filter, setFilter] = useState<"all" | "overdue">("all");

  const displayed =
    filter === "overdue"
      ? TRANSACTIONS.filter((t) => t.overdue || t.status === "Overdue")
      : TRANSACTIONS;

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Payments</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Transaction register, overdue tracking &amp; collection analytics
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
          </div>
        </div>

        {/* ── KPI Row ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {KPI_DATA.map((kpi) => {
            const Icon = kpi.icon;
            const good = kpi.positive ? kpi.change > 0 : kpi.change < 0;
            return (
              <Card key={kpi.label} className="py-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground truncate">{kpi.label}</p>
                      <p className="text-2xl font-bold tracking-tight mt-1">{kpi.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{kpi.sub}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        {good ? (
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-rose-500" />
                        )}
                        <span
                          className={`text-[10px] font-medium ${
                            good
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {kpi.change > 0 ? "+" : ""}
                          {kpi.change}%
                        </span>
                      </div>
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
            <TabsTrigger value="transactions" className="text-xs">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">
              Collection Analytics
            </TabsTrigger>
          </TabsList>

          {/* ── Transactions Table ── */}
          <TabsContent value="transactions" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <CardTitle className="text-sm font-semibold">
                      Payment Transactions
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      All payment records with mode, status &amp; receipt
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={filter === "all" ? "secondary" : "ghost"}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setFilter("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={filter === "overdue" ? "secondary" : "ghost"}
                      size="sm"
                      className="h-7 text-xs gap-1"
                      onClick={() => setFilter("overdue")}
                    >
                      <AlertCircle className="w-3 h-3 text-rose-500" />
                      Overdue Only
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {[
                          "Date",
                          "Txn ID",
                          "Booking ID",
                          "Buyer",
                          "Project",
                          "Amount",
                          "Mode",
                          "Status",
                          "Receipt",
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
                      {displayed.map((txn) => (
                        <tr
                          key={txn.id}
                          className={`border-b border-border/50 transition-colors ${
                            txn.overdue || txn.status === "Overdue"
                              ? "bg-rose-500/5 hover:bg-rose-500/10"
                              : "hover:bg-muted/40"
                          }`}
                        >
                          <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                            {txn.date}
                          </td>
                          <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground whitespace-nowrap">
                            {txn.id}
                          </td>
                          <td className="px-4 py-2.5 text-xs font-mono text-foreground whitespace-nowrap">
                            {txn.bookingId}
                          </td>
                          <td className="px-4 py-2.5 text-xs font-medium text-foreground whitespace-nowrap">
                            {txn.buyer}
                          </td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                            {txn.project}
                          </td>
                          <td className="px-4 py-2.5 text-xs font-semibold text-foreground whitespace-nowrap">
                            {fmtAmount(txn.amount)}
                          </td>
                          <td className="px-4 py-2.5">
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${modeStyle(
                                txn.mode
                              )}`}
                            >
                              {txn.mode}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-1.5">
                              {(txn.overdue || txn.status === "Overdue") && (
                                <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                              )}
                              <span
                                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusStyle(
                                  txn.status,
                                  txn.overdue
                                )}`}
                              >
                                {txn.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5">
                            {txn.receipt !== "-" ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-[11px] gap-1 text-indigo-600 dark:text-indigo-400"
                              >
                                <Receipt className="w-3 h-3" />
                                {txn.receipt}
                              </Button>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Analytics ── */}
          <TabsContent value="analytics" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Monthly Collection Bar Chart */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Monthly Collection</CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Amount collected per month (₹ Cr)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                      data={MONTHLY_COLLECTION}
                      margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="color-mix(in oklch, var(--border), transparent 30%)"
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                      <Bar
                        dataKey="collected"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                        name="Collected (₹Cr)"
                      >
                        {MONTHLY_COLLECTION.map((_e, i) => (
                          <Cell
                            key={`bar-${i}`}
                            fill={i === MONTHLY_COLLECTION.length - 1 ? "#6366f1" : "#6366f155"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Mode Breakdown */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Collection by Payment Mode
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Amount (₹ Cr) and transaction count per mode
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {MODE_STATS.map((m) => {
                    const total = MODE_STATS.reduce((s, x) => s + x.amount, 0);
                    const pct = Math.round((m.amount / total) * 100);
                    return (
                      <div key={m.mode} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            {m.mode === "UPI" || m.mode === "NEFT" ? (
                              <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                            ) : (
                              <Banknote className="w-3.5 h-3.5 text-muted-foreground" />
                            )}
                            <span className="font-medium text-foreground">{m.mode}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-muted-foreground">{m.count} txns</span>
                            <span className="font-semibold text-foreground">
                              ₹{m.amount} Cr
                            </span>
                            <span className="text-muted-foreground w-7 text-right">{pct}%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${pct}%`, background: m.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Overdue Summary */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <CardTitle className="text-sm font-semibold">Overdue Summary</CardTitle>
                </div>
                <CardDescription className="text-xs mt-0.5">
                  Payments past due date — immediate follow-up required
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {["Buyer", "Project", "Amount", "Mode", "Days Overdue"].map((h) => (
                          <th
                            key={h}
                            className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TRANSACTIONS.filter(
                        (t) => t.overdue || t.status === "Overdue"
                      ).map((txn) => {
                        const txnDate = new Date(txn.date);
                        const today = new Date("2026-07-20");
                        const days = Math.round(
                          (today.getTime() - txnDate.getTime()) / 86400000
                        );
                        return (
                          <tr
                            key={txn.id}
                            className="border-b border-border/50 bg-rose-500/5 hover:bg-rose-500/10 transition-colors"
                          >
                            <td className="px-4 py-2.5 text-xs font-medium text-foreground">
                              {txn.buyer}
                            </td>
                            <td className="px-4 py-2.5 text-xs text-muted-foreground">
                              {txn.project}
                            </td>
                            <td className="px-4 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
                              {fmtAmount(txn.amount)}
                            </td>
                            <td className="px-4 py-2.5">
                              <span
                                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${modeStyle(
                                  txn.mode
                                )}`}
                              >
                                {txn.mode}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                                {days}d overdue
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
