"use client";

import { useState, useMemo } from "react";
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
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Plus,
  TrendingUp,
  IndianRupee,
  FileText,
  XCircle,
  Calendar,
  ArrowUpRight,
  Download,
  AlertTriangle,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  TrendingDown,
  CheckCircle2,
  Clock,
  Building2,
  User,
  PhoneCall,
  FileCheck,
  RefreshCw,
  Eye,
  Edit,
  Send,
} from "lucide-react";
import { bookings, projects, revenueChartData, salesPipelineData } from "@/lib/mock-data";
import { KPICard } from "@/components/dashboard/kpi-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import type { Booking, BookingStatus } from "@/types";

// ─── Status Config ─────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<BookingStatus, { bg: string; text: string; dot: string }> = {
  "Registration Done": {
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  "Agreement Done": {
    bg: "bg-blue-100 dark:bg-blue-500/15",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  "Agreement Pending": {
    bg: "bg-violet-100 dark:bg-violet-500/15",
    text: "text-violet-700 dark:text-violet-400",
    dot: "bg-violet-500",
  },
  "Booking Done": {
    bg: "bg-teal-100 dark:bg-teal-500/15",
    text: "text-teal-700 dark:text-teal-400",
    dot: "bg-teal-500",
  },
  "Reserved": {
    bg: "bg-slate-100 dark:bg-slate-500/15",
    text: "text-slate-600 dark:text-slate-400",
    dot: "bg-slate-400",
  },
  "Cancelled": {
    bg: "bg-rose-100 dark:bg-rose-500/15",
    text: "text-rose-700 dark:text-rose-400",
    dot: "bg-rose-500",
  },
};

function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const colors = STATUS_COLORS[status] ?? {
    bg: "bg-slate-100 dark:bg-slate-500/15",
    text: "text-slate-600 dark:text-slate-400",
    dot: "bg-slate-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${colors.bg} ${colors.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`} />
      {status}
    </span>
  );
}

// ─── Mock upcoming dues (30-day horizon) ───────────────────────────────────────

const upcomingDues = [
  {
    id: "d1",
    bookingId: "BK-001",
    buyer: "Rajesh Kumar",
    phone: "+91 98765 11111",
    project: "Prestige Heights",
    unit: "A-201",
    milestone: "Slab Casting – Floor 8",
    dueDate: "2024-08-01",
    amount: 1500000,
    status: "Upcoming" as const,
  },
  {
    id: "d2",
    bookingId: "BK-002",
    buyer: "Priya Sharma",
    phone: "+91 87654 22222",
    project: "Prestige Heights",
    unit: "B-801",
    milestone: "30% Demand Note",
    dueDate: "2024-08-15",
    amount: 6000000,
    status: "Upcoming" as const,
  },
  {
    id: "d3",
    bookingId: "BK-003",
    buyer: "Mohan Das",
    phone: "+91 76543 99900",
    project: "Skyline Villas",
    unit: "V-007",
    milestone: "Registration Balance",
    dueDate: "2024-07-18",
    amount: 2000000,
    status: "Overdue" as const,
  },
  {
    id: "d4",
    bookingId: "BK-004",
    buyer: "Seema Jain",
    phone: "+91 65432 00011",
    project: "Central Square",
    unit: "C-301",
    milestone: "Agreement Amount",
    dueDate: "2024-07-25",
    amount: 4500000,
    status: "Due Soon" as const,
  },
  {
    id: "d5",
    bookingId: "BK-005",
    buyer: "Anand Verma",
    phone: "+91 90123 44455",
    project: "Prestige Heights",
    unit: "A-501",
    milestone: "Foundation Milestone",
    dueDate: "2024-08-10",
    amount: 875000,
    status: "Upcoming" as const,
  },
  {
    id: "d6",
    bookingId: "BK-006",
    buyer: "Nalini Bose",
    phone: "+91 88001 23456",
    project: "Skyline Villas",
    unit: "V-019",
    milestone: "Possession Charges",
    dueDate: "2024-07-15",
    amount: 3200000,
    status: "Overdue" as const,
  },
];

// ─── Mock quotations ────────────────────────────────────────────────────────────

const quotations = [
  {
    id: "Q-2024-0041",
    buyer: "Deepak Agarwal",
    phone: "+91 76543 21098",
    project: "Central Square",
    unit: "C-401 (Office)",
    quotedPrice: 64800000,
    discount: 2000000,
    netPrice: 62800000,
    expiresOn: "2024-07-28",
    status: "Pending Approval" as const,
    createdBy: "Nikhil Joshi",
  },
  {
    id: "Q-2024-0040",
    buyer: "Rohit Bajaj",
    phone: "+91 32109 87654",
    project: "Central Square",
    unit: "C-201 (Retail)",
    quotedPrice: 55440000,
    discount: 0,
    netPrice: 55440000,
    expiresOn: "2024-07-30",
    status: "Sent" as const,
    createdBy: "Nikhil Joshi",
  },
  {
    id: "Q-2024-0039",
    buyer: "Sunita Patel",
    phone: "+91 87654 32109",
    project: "Skyline Villas",
    unit: "V-023",
    quotedPrice: 72000000,
    discount: 3500000,
    netPrice: 68500000,
    expiresOn: "2024-08-05",
    status: "Under Review" as const,
    createdBy: "Riya Kapoor",
  },
  {
    id: "Q-2024-0038",
    buyer: "Arjun Mehta",
    phone: "+91 98765 43210",
    project: "Prestige Heights",
    unit: "B-1501 (Penthouse)",
    quotedPrice: 38400000,
    discount: 1000000,
    netPrice: 37400000,
    expiresOn: "2024-07-22",
    status: "Expired" as const,
    createdBy: "Vikram Singh",
  },
];

const QUOTATION_STATUS_COLORS: Record<string, string> = {
  "Pending Approval": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  "Sent": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  "Under Review": "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
  "Expired": "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400",
  "Converted": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
};

// ─── Helper ────────────────────────────────────────────────────────────────────

function formatCr(value: number) {
  return (value / 10000000).toFixed(2);
}

function formatL(value: number) {
  return (value / 100000).toFixed(0);
}

const TOOLTIP_STYLE = {
  fontSize: 12,
  borderRadius: 8,
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
  color: "hsl(var(--card-foreground))",
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SalesPage() {
  const [tab, setTab] = useState("bookings");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const allStatuses = ["All", ...Array.from(new Set(bookings.map((b) => b.status)))];

  const filteredBookings = useMemo<Booking[]>(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        !search ||
        b.buyerName.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase()) ||
        b.buyerPhone.includes(search);
      const matchesStatus = statusFilter === "All" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const sortedDues = [...upcomingDues].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const pipelineBarData = salesPipelineData.map((s) => ({
    ...s,
    fill: s.stage === "New Leads"
      ? "#6366f1"
      : s.stage === "Contacted"
      ? "#8b5cf6"
      : s.stage === "Site Visit"
      ? "#06b6d4"
      : s.stage === "Negotiation"
      ? "#f59e0b"
      : s.stage === "Booking"
      ? "#22c55e"
      : "#14b8a6",
  }));

  return (
    <div className="p-6 space-y-5 min-h-screen">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Sales</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Bookings, pipeline, and collections — FY 2024–25
            </p>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            48 bookings
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            Jul 2024
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button size="sm" className="gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />
            New Booking
          </Button>
        </div>
      </div>

      {/* ── KPI Row ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        <KPICard
          title="Total Bookings"
          value="48"
          subtitle="This financial year"
          change={12.5}
          changeLabel="vs last month"
          icon={<FileText className="w-5 h-5" />}
          color="blue"
        />
        <KPICard
          title="Revenue"
          value="₹184 Cr"
          subtitle="Agreed value booked"
          change={12.4}
          changeLabel="vs last FY"
          icon={<IndianRupee className="w-5 h-5" />}
          color="green"
        />
        <KPICard
          title="Collections"
          value="₹118 Cr"
          subtitle="Received to date"
          change={8.7}
          changeLabel="vs last FY"
          icon={<TrendingUp className="w-5 h-5" />}
          color="teal"
        />
        <KPICard
          title="Pending"
          value="₹66 Cr"
          subtitle="Outstanding receivable"
          change={-4.2}
          changeLabel="vs last month"
          icon={<Clock className="w-5 h-5" />}
          color="orange"
        />
        <KPICard
          title="Cancellations"
          value="3"
          subtitle="This quarter"
          change={-33}
          changeLabel="vs last quarter"
          icon={<XCircle className="w-5 h-5" />}
          color="rose"
        />
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <TabsList className="h-8 w-fit">
            <TabsTrigger value="bookings" className="text-xs h-7 px-3">
              Bookings ({bookings.length})
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="text-xs h-7 px-3">
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="collections" className="text-xs h-7 px-3">
              Collections
            </TabsTrigger>
            <TabsTrigger value="quotations" className="text-xs h-7 px-3">
              Quotations ({quotations.length})
            </TabsTrigger>
          </TabsList>

          {/* Inline search + filter (Bookings tab only) */}
          {tab === "bookings" && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search buyer, ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-8 pr-3 text-xs w-52"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {allStatuses.slice(0, 4).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors whitespace-nowrap ${
                      statusFilter === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Bookings Tab ─────────────────────────────────────────────────── */}
        <TabsContent value="bookings" className="mt-4">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap w-[90px]">
                      Booking ID
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap">
                      Buyer
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap">
                      Unit / Project
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap">
                      Booking Date
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap text-right">
                      Agreed Price
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap min-w-[110px]">
                      Collected
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap">
                      Next Due
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap">
                      Status
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap">
                      Assigned To
                    </TableHead>
                    <TableHead className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap text-center">
                      Docs
                    </TableHead>
                    <TableHead className="w-[50px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-12 text-muted-foreground text-sm">
                        No bookings match your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking: Booking) => {
                      const project = projects.find((p) => p.id === booking.projectId);
                      const collectedPct =
                        booking.netPrice > 0
                          ? Math.min((booking.totalCollected / booking.netPrice) * 100, 100)
                          : 0;

                      return (
                        <TableRow
                          key={booking.id}
                          className="group hover:bg-muted/30 transition-colors"
                        >
                          {/* Booking ID */}
                          <TableCell className="py-3 px-4">
                            <span className="font-mono text-[11px] font-semibold text-primary">
                              {booking.id.toUpperCase()}
                            </span>
                          </TableCell>

                          {/* Buyer */}
                          <TableCell className="py-3 px-4">
                            <div className="flex items-start gap-2">
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                                {booking.buyerName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join("")}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                                  {booking.buyerName}
                                </p>
                                <p className="text-[10px] text-muted-foreground">{booking.buyerPhone}</p>
                              </div>
                            </div>
                          </TableCell>

                          {/* Unit / Project */}
                          <TableCell className="py-3 px-4">
                            <div>
                              <p className="text-xs font-medium text-foreground whitespace-nowrap flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-muted-foreground" />
                                {project?.name ?? "—"}
                              </p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                Unit #{booking.unitId.replace(/^u0*/, "")}
                              </p>
                            </div>
                          </TableCell>

                          {/* Booking Date */}
                          <TableCell className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
                            {booking.bookingDate}
                          </TableCell>

                          {/* Agreed Price */}
                          <TableCell className="py-3 px-4 text-right">
                            <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                              ₹{formatCr(booking.netPrice)} Cr
                            </p>
                            {booking.discount > 0 && (
                              <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                                −₹{formatL(booking.discount)}L off
                              </p>
                            )}
                          </TableCell>

                          {/* Collected + progress */}
                          <TableCell className="py-3 px-4">
                            <div className="space-y-1 min-w-[100px]">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                                  ₹{formatCr(booking.totalCollected)} Cr
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  {collectedPct.toFixed(0)}%
                                </span>
                              </div>
                              <Progress
                                value={collectedPct}
                                className="h-1.5 bg-muted [&>div]:bg-emerald-500 [&>div]:rounded-full"
                              />
                            </div>
                          </TableCell>

                          {/* Next Due */}
                          <TableCell className="py-3 px-4">
                            {booking.nextDueDate !== "-" ? (
                              <div>
                                <p className="text-xs font-medium text-foreground whitespace-nowrap">
                                  {booking.nextDueDate}
                                </p>
                                <p className="text-[10px] text-amber-600 dark:text-amber-400">
                                  ₹{formatL(booking.nextDueAmount)}L due
                                </p>
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-3 h-3" />
                                Fully paid
                              </span>
                            )}
                          </TableCell>

                          {/* Status */}
                          <TableCell className="py-3 px-4">
                            <BookingStatusBadge status={booking.status as BookingStatus} />
                          </TableCell>

                          {/* Assigned To */}
                          <TableCell className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <User className="w-3 h-3" />
                              {booking.assignedTo}
                            </div>
                          </TableCell>

                          {/* Docs */}
                          <TableCell className="py-3 px-4 text-center">
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-5 tabular-nums"
                            >
                              {booking.documents}
                            </Badge>
                          </TableCell>

                          {/* Actions */}
                          <TableCell className="py-3 px-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/20">
              <p className="text-xs text-muted-foreground">
                Showing {filteredBookings.length} of {bookings.length} bookings
              </p>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-7">
                <RefreshCw className="w-3 h-3" />
                Refresh
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ── Pipeline Tab ─────────────────────────────────────────────────── */}
        <TabsContent value="pipeline" className="mt-4 space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {salesPipelineData.slice(3).map((stage) => (
              <Card key={stage.stage} className="p-4">
                <p className="text-xs text-muted-foreground">{stage.stage}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stage.count}</p>
                <p className="text-xs text-muted-foreground mt-0.5">₹{stage.value} Cr potential</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Monthly Bookings & Collections area chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Monthly Bookings vs Collections</CardTitle>
                <CardDescription className="text-xs">FY 2023–24 (₹ Cr)</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={230}>
                  <AreaChart
                    data={revenueChartData}
                    margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradCollections" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend
                      wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
                      iconType="circle"
                      iconSize={8}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#gradRevenue)"
                      name="Revenue (₹ Cr)"
                      dot={false}
                    />
                    <Area
                      type="monotone"
                      dataKey="collections"
                      stroke="#22c55e"
                      strokeWidth={2}
                      fill="url(#gradCollections)"
                      name="Collections (₹ Cr)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sales Pipeline Funnel (BarChart as horizontal funnel approximation) */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Sales Pipeline</CardTitle>
                <CardDescription className="text-xs">Lead-to-booking conversion stages</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart
                    layout="vertical"
                    data={pipelineBarData}
                    margin={{ top: 5, right: 40, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="stage"
                      width={80}
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(v) => [v, "Count"]}
                    />
                    <Bar
                      dataKey="count"
                      radius={[0, 4, 4, 0]}
                      label={{ position: "right", fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    >
                      {pipelineBarData.map((entry) => (
                        <rect key={entry.stage} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Revenue by project */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Revenue by Project</CardTitle>
              <CardDescription className="text-xs">Collected vs total target (₹ Cr)</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={projects.map((p) => ({
                    name: p.name.replace(/\s+/g, " ").slice(0, 16),
                    collected: +(p.collectedRevenue / 10000000).toFixed(1),
                    target: +(p.totalRevenue / 10000000).toFixed(1),
                  }))}
                  margin={{ top: 5, right: 10, left: -15, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(v) => [`₹${v} Cr`]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={8} />
                  <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Target (₹ Cr)" />
                  <Bar dataKey="collected" fill="#6366f1" radius={[4, 4, 0, 0]} name="Collected (₹ Cr)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Collections Tab ──────────────────────────────────────────────── */}
        <TabsContent value="collections" className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-foreground">
              Upcoming &amp; Overdue Dues — Next 30 Days
            </span>
            <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border-0 text-[10px]">
              {upcomingDues.filter((d) => d.status === "Overdue").length} overdue
            </Badge>
          </div>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Booking ID</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Buyer</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Project / Unit</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Milestone</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Due Date</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground text-right">Amount</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Status</TableHead>
                  <TableHead className="w-[100px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedDues.map((due) => (
                  <TableRow
                    key={due.id}
                    className={`transition-colors ${
                      due.status === "Overdue"
                        ? "bg-rose-50/60 dark:bg-rose-500/5 hover:bg-rose-50/80 dark:hover:bg-rose-500/8"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <TableCell className="py-3 px-4">
                      <span className="font-mono text-[11px] font-semibold text-primary">
                        {due.bookingId}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                        {due.buyer}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{due.phone}</p>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <p className="text-xs text-foreground font-medium">{due.project}</p>
                      <p className="text-[10px] text-muted-foreground">{due.unit}</p>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
                      {due.milestone}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span
                        className={`text-xs font-medium whitespace-nowrap ${
                          due.status === "Overdue"
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-foreground"
                        }`}
                      >
                        {due.dueDate}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right">
                      <span className="text-xs font-bold text-foreground whitespace-nowrap">
                        ₹{formatL(due.amount)}L
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          due.status === "Overdue"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"
                            : due.status === "Due Soon"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400"
                        }`}
                      >
                        {due.status === "Overdue" && (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {due.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Call buyer">
                          <PhoneCall className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Send reminder">
                          <Send className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/20">
              <p className="text-xs text-muted-foreground">
                Total outstanding:{" "}
                <span className="font-semibold text-foreground">
                  ₹{(upcomingDues.reduce((acc, d) => acc + d.amount, 0) / 10000000).toFixed(2)} Cr
                </span>
              </p>
              <Button variant="outline" size="sm" className="text-xs h-7 gap-1.5">
                <Download className="w-3 h-3" />
                Export Dues
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ── Quotations Tab ────────────────────────────────────────────────── */}
        <TabsContent value="quotations" className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground">
              {quotations.length} quotations · {quotations.filter((q) => q.status === "Pending Approval").length} pending approval
            </p>
            <Button size="sm" className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" />
              New Quotation
            </Button>
          </div>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Quote ID</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Buyer</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Unit / Project</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground text-right">
                    Quoted Price
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground text-right">
                    Discount
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground text-right">
                    Net Price
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Expires</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Status</TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground">Created By</TableHead>
                  <TableHead className="w-[80px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotations.map((q) => (
                  <TableRow key={q.id} className="group hover:bg-muted/30 transition-colors">
                    <TableCell className="py-3 px-4">
                      <span className="font-mono text-[11px] font-semibold text-primary">{q.id}</span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <p className="text-xs font-semibold text-foreground whitespace-nowrap">{q.buyer}</p>
                      <p className="text-[10px] text-muted-foreground">{q.phone}</p>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <p className="text-xs font-medium text-foreground whitespace-nowrap">{q.unit}</p>
                      <p className="text-[10px] text-muted-foreground">{q.project}</p>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right">
                      <span className="text-xs font-medium text-foreground">
                        ₹{formatCr(q.quotedPrice)} Cr
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right">
                      {q.discount > 0 ? (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400">
                          −₹{formatL(q.discount)}L
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right">
                      <span className="text-xs font-bold text-foreground">
                        ₹{formatCr(q.netPrice)} Cr
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
                      {q.expiresOn}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          QUOTATION_STATUS_COLORS[q.status] ??
                          "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400"
                        }`}
                      >
                        {q.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3" />
                        {q.createdBy}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="View">
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Edit">
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/20">
              <p className="text-xs text-muted-foreground">
                Total quoted value:{" "}
                <span className="font-semibold text-foreground">
                  ₹{(quotations.reduce((acc, q) => acc + q.netPrice, 0) / 10000000).toFixed(2)} Cr
                </span>
              </p>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-7">
                <Download className="w-3 h-3" />
                Export
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
