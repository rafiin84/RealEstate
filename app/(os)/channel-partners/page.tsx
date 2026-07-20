"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  UserCheck,
  TrendingUp,
  IndianRupee,
  Clock,
  Plus,
  Search,
  MapPin,
  Star,
  Building2,
  Phone,
  Mail,
  Eye,
  Wallet,
  Award,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  BarChart3,
  Trophy,
  CreditCard,
  AlertCircle,
  ChevronUp,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { channelPartners } from "@/lib/mock-data";
import { KPICard } from "@/components/dashboard/kpi-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { cn } from "@/lib/utils";

// ─── Extended mock data for leaderboard & brokerage ────────────────────────

const extendedPartners = [
  ...channelPartners,
  {
    id: "cp005",
    name: "Ravi Shetty",
    company: "NRI Homes Global",
    email: "ravi@nrihomes.com",
    phone: "+91 55432 99999",
    reraNumber: "CPRERA567890",
    city: "Pune",
    status: "Active" as const,
    totalLeads: 189,
    conversions: 36,
    totalRevenue: 360000000,
    pendingBrokerage: 5400000,
    rating: 4.7,
    joinedAt: "2022-02-20",
  },
  {
    id: "cp006",
    name: "Nandini Shah",
    company: "Urban Nest Realty",
    email: "nandini@urbannest.in",
    phone: "+91 44321 88888",
    reraNumber: "CPRERA678901",
    city: "Mumbai",
    status: "Active" as const,
    totalLeads: 76,
    conversions: 14,
    totalRevenue: 140000000,
    pendingBrokerage: 2100000,
    rating: 4.3,
    joinedAt: "2023-07-12",
  },
  {
    id: "cp007",
    name: "Karthik Pillai",
    company: "South Realty Partners",
    email: "karthik@southrealty.in",
    phone: "+91 33210 77777",
    reraNumber: "CPRERA789012",
    city: "Hyderabad",
    status: "Inactive" as const,
    totalLeads: 22,
    conversions: 3,
    totalRevenue: 30000000,
    pendingBrokerage: 0,
    rating: 3.4,
    joinedAt: "2023-11-01",
  },
  {
    id: "cp008",
    name: "Preethi Naidu",
    company: "Capital Connect Realty",
    email: "preethi@capitalconnect.in",
    phone: "+91 22109 66666",
    reraNumber: "CPRERA890123",
    city: "Delhi NCR",
    status: "Active" as const,
    totalLeads: 134,
    conversions: 22,
    totalRevenue: 220000000,
    pendingBrokerage: 3300000,
    rating: 4.6,
    joinedAt: "2022-08-15",
  },
];

const brokerageHistory = [
  {
    id: "br001",
    partner: "Manish Tiwari",
    company: "City Property Hub",
    units: 3,
    amount: 4500000,
    paidOn: "2024-06-15",
    project: "Prestige Heights",
    status: "Paid",
    txnId: "TXN-24061501",
  },
  {
    id: "br002",
    partner: "Suresh Nair",
    company: "Prime Realty Consultants",
    units: 2,
    amount: 3200000,
    paidOn: "2024-06-10",
    project: "Skyline Villas",
    status: "Paid",
    txnId: "TXN-24061002",
  },
  {
    id: "br003",
    partner: "Ravi Shetty",
    company: "NRI Homes Global",
    units: 4,
    amount: 5800000,
    paidOn: "2024-05-28",
    project: "Central Square",
    status: "Paid",
    txnId: "TXN-24052803",
  },
  {
    id: "br004",
    partner: "Anjali Varma",
    company: "Homes & Beyond",
    units: 2,
    amount: 2200000,
    paidOn: "2024-05-15",
    project: "Prestige Heights",
    status: "Paid",
    txnId: "TXN-24051504",
  },
  {
    id: "br005",
    partner: "Preethi Naidu",
    company: "Capital Connect Realty",
    units: 1,
    amount: 1800000,
    paidOn: "2024-05-05",
    project: "Skyline Villas",
    status: "Paid",
    txnId: "TXN-24050505",
  },
];

const pendingPayouts = [
  {
    id: "pp001",
    partner: "Manish Tiwari",
    company: "City Property Hub",
    city: "Delhi NCR",
    units: 4,
    amount: 6150000,
    dueDate: "2024-07-31",
    project: "Prestige Heights",
    overdue: false,
  },
  {
    id: "pp002",
    partner: "Ravi Shetty",
    company: "NRI Homes Global",
    city: "Pune",
    units: 3,
    amount: 5400000,
    dueDate: "2024-07-25",
    project: "Central Square",
    overdue: false,
  },
  {
    id: "pp003",
    partner: "Suresh Nair",
    company: "Prime Realty Consultants",
    city: "Mumbai",
    units: 2,
    amount: 4200000,
    dueDate: "2024-07-20",
    project: "Skyline Villas",
    overdue: true,
  },
  {
    id: "pp004",
    partner: "Anjali Varma",
    company: "Homes & Beyond",
    city: "Bengaluru",
    units: 2,
    amount: 2850000,
    dueDate: "2024-08-05",
    project: "Prestige Heights",
    overdue: false,
  },
  {
    id: "pp005",
    partner: "Preethi Naidu",
    company: "Capital Connect Realty",
    city: "Delhi NCR",
    units: 1,
    amount: 3300000,
    dueDate: "2024-07-18",
    project: "Green Valley Plots",
    overdue: true,
  },
  {
    id: "pp006",
    partner: "Nandini Shah",
    company: "Urban Nest Realty",
    city: "Mumbai",
    units: 1,
    amount: 2100000,
    dueDate: "2024-08-12",
    project: "Skyline Villas",
    overdue: false,
  },
];

const monthlyPerformanceData = [
  { month: "Feb", leads: 142, conversions: 12 },
  { month: "Mar", leads: 168, conversions: 15 },
  { month: "Apr", leads: 195, conversions: 18 },
  { month: "May", leads: 210, conversions: 22 },
  { month: "Jun", leads: 248, conversions: 26 },
  { month: "Jul", leads: 276, conversions: 31 },
];

const cityBreakdownData = [
  { city: "Delhi NCR", partners: 2, leads: 349, conversions: 63 },
  { city: "Mumbai", partners: 2, leads: 218, conversions: 42 },
  { city: "Pune", partners: 1, leads: 189, conversions: 36 },
  { city: "Bengaluru", partners: 1, leads: 98, conversions: 19 },
  { city: "Hyderabad", partners: 2, leads: 56, conversions: 8 },
];

const pieColors = ["#6366f1", "#06b6d4", "#22c55e", "#f59e0b", "#ec4899"];

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCrore(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val.toLocaleString("en-IN")}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i - rating < 1
              ? "fill-amber-200 text-amber-400"
              : "text-muted-foreground/30"
          )}
        />
      ))}
      <span className="text-xs font-medium text-muted-foreground ml-0.5">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

const cities = ["All Cities", "Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Pune"];

// ─── Partner Card ───────────────────────────────────────────────────────────

function PartnerCard({ partner }: { partner: (typeof extendedPartners)[0] }) {
  const conversionRate =
    partner.totalLeads > 0
      ? ((partner.conversions / partner.totalLeads) * 100).toFixed(1)
      : "0";

  return (
    <Card className="flex flex-col hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Card header stripe */}
      <div
        className={cn(
          "h-1 w-full",
          partner.status === "Active" ? "bg-emerald-500" : "bg-rose-400"
        )}
      />
      <CardContent className="p-5 flex flex-col gap-4 flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-foreground truncate">
                {partner.name}
              </h3>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] px-1.5 py-0 shrink-0",
                  partner.status === "Active"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                )}
              >
                {partner.status === "Active" ? (
                  <CheckCircle2 className="w-2.5 h-2.5 mr-0.5 inline" />
                ) : (
                  <XCircle className="w-2.5 h-2.5 mr-0.5 inline" />
                )}
                {partner.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <Building2 className="w-3 h-3 shrink-0" />
              {partner.company}
            </p>
          </div>
        </div>

        {/* RERA + City */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className="text-[10px] px-2 py-0.5 font-mono"
          >
            RERA: {partner.reraNumber}
          </Badge>
          <Badge
            variant="outline"
            className="text-[10px] px-2 py-0.5 gap-0.5"
          >
            <MapPin className="w-2.5 h-2.5" />
            {partner.city}
          </Badge>
        </div>

        {/* Rating */}
        <StarRating rating={partner.rating} />

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-muted/40 rounded-lg p-2">
            <p className="text-base font-bold text-foreground">
              {partner.totalLeads}
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Total Leads
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg p-2">
            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
              {partner.conversions}
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Conversions
            </p>
          </div>
          <div className="bg-muted/40 rounded-lg p-2">
            <p className="text-base font-bold text-foreground">
              {conversionRate}%
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Conv. Rate
            </p>
          </div>
        </div>

        {/* Revenue row */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Total Revenue</span>
          <span className="font-semibold text-foreground">
            {formatCrore(partner.totalRevenue)}
          </span>
        </div>

        {/* Pending brokerage highlight */}
        <div
          className={cn(
            "rounded-lg px-3 py-2 flex items-center justify-between",
            partner.pendingBrokerage > 0
              ? "bg-amber-50 dark:bg-amber-500/10 border border-amber-200/70 dark:border-amber-500/20"
              : "bg-muted/40"
          )}
        >
          <div className="flex items-center gap-1.5">
            <Wallet
              className={cn(
                "w-3.5 h-3.5",
                partner.pendingBrokerage > 0
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-muted-foreground"
              )}
            />
            <span className="text-xs text-muted-foreground">
              Pending Brokerage
            </span>
          </div>
          <span
            className={cn(
              "text-sm font-bold",
              partner.pendingBrokerage > 0
                ? "text-amber-700 dark:text-amber-400"
                : "text-muted-foreground"
            )}
          >
            {partner.pendingBrokerage > 0
              ? formatCrore(partner.pendingBrokerage)
              : "₹0"}
          </span>
        </div>

        {/* Contact row */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="w-3 h-3 shrink-0" />
          <span className="truncate">{partner.phone}</span>
          <span className="text-border">·</span>
          <Mail className="w-3 h-3 shrink-0" />
          <span className="truncate">{partner.email}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            View Profile
          </Button>
          <Button
            size="sm"
            className={cn(
              "flex-1 text-xs h-8",
              partner.pendingBrokerage > 0
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
            disabled={partner.pendingBrokerage === 0}
          >
            <IndianRupee className="w-3.5 h-3.5 mr-1.5" />
            Pay Brokerage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function ChannelPartnersPage() {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [activeTab, setActiveTab] = useState("partners");

  const filteredPartners = useMemo(() => {
    return extendedPartners.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.company.toLowerCase().includes(search.toLowerCase()) ||
        p.reraNumber.toLowerCase().includes(search.toLowerCase());
      const matchCity =
        cityFilter === "All Cities" || p.city === cityFilter;
      return matchSearch && matchCity;
    });
  }, [search, cityFilter]);

  const leaderboard = useMemo(
    () =>
      [...extendedPartners]
        .filter((p) => p.status === "Active")
        .sort((a, b) => b.conversions - a.conversions),
    []
  );

  const totalPending = pendingPayouts.reduce((s, p) => s + p.amount, 0);
  const overdueCount = pendingPayouts.filter((p) => p.overdue).length;

  return (
    <div className="flex flex-col h-full">
      {/* ── Page Header ── */}
      <PageHeader
        title="Channel Partners"
        subtitle="Manage your broker network, leads, and brokerage payouts"
        actions={
          <>
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-8 text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Onboard Partner
            </Button>
          </>
        }
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* ── Search + Filter Bar ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search by name, company, RERA..."
              className="pl-8 h-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={cityFilter} onValueChange={(v) => v && setCityFilter(v)}>
            <SelectTrigger className="h-9 w-[180px] text-sm">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c} value={c} className="text-sm">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ── KPI Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          <KPICard
            title="Total Partners"
            value="38"
            subtitle="Across 5 cities"
            change={5.6}
            changeLabel="vs last quarter"
            icon={<Users className="w-full h-full" />}
            color="blue"
          />
          <KPICard
            title="Active Partners"
            value="31"
            subtitle="81.6% active rate"
            change={2.8}
            changeLabel="vs last quarter"
            icon={<UserCheck className="w-full h-full" />}
            color="green"
          />
          <KPICard
            title="Total Leads"
            value="1,842"
            subtitle="All-time referrals"
            change={14.2}
            changeLabel="vs last quarter"
            icon={<TrendingUp className="w-full h-full" />}
            color="purple"
          />
          <KPICard
            title="Conversions"
            value="186"
            subtitle="10.1% conversion rate"
            change={8.9}
            changeLabel="vs last quarter"
            icon={<Award className="w-full h-full" />}
            color="teal"
          />
          <KPICard
            title="Brokerage Paid"
            value="₹2.8 Cr"
            subtitle="This financial year"
            change={18.4}
            changeLabel="vs last FY"
            icon={<IndianRupee className="w-full h-full" />}
            color="orange"
          />
          <KPICard
            title="Pending Brokerage"
            value="₹1.3 Cr"
            subtitle={`${overdueCount} overdue`}
            change={-3.1}
            changeLabel="vs last month"
            icon={<Clock className="w-full h-full" />}
            color="rose"
          />
        </div>

        {/* ── Tabs ── */}
        <Tabs value={activeTab} onValueChange={(v) => v && setActiveTab(v)}>
          <TabsList className="h-9 text-sm">
            <TabsTrigger value="partners" className="text-xs px-4">
              <Users className="w-3.5 h-3.5 mr-1.5" />
              Partner Directory
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-xs px-4">
              <Trophy className="w-3.5 h-3.5 mr-1.5" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="brokerage" className="text-xs px-4">
              <CreditCard className="w-3.5 h-3.5 mr-1.5" />
              Brokerage Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs px-4">
              <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* ── PARTNER DIRECTORY TAB ── */}
          <TabsContent value="partners" className="mt-4">
            {filteredPartners.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Users className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium text-muted-foreground">
                  No partners found
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Try adjusting your search or filter
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredPartners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── LEADERBOARD TAB ── */}
          <TabsContent value="leaderboard" className="mt-4">
            <Card>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    Performance Leaderboard
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    This Quarter
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="w-12 text-xs pl-4">Rank</TableHead>
                      <TableHead className="text-xs">Partner</TableHead>
                      <TableHead className="text-xs">City</TableHead>
                      <TableHead className="text-xs text-right">
                        Conversions
                      </TableHead>
                      <TableHead className="text-xs text-right">
                        Revenue
                      </TableHead>
                      <TableHead className="text-xs text-right">
                        Conv. Rate
                      </TableHead>
                      <TableHead className="text-xs text-right">
                        Rating
                      </TableHead>
                      <TableHead className="text-xs text-right pr-4">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboard.map((partner, idx) => {
                      const convRate = (
                        (partner.conversions / partner.totalLeads) *
                        100
                      ).toFixed(1);
                      const rankColors = [
                        "text-amber-500",
                        "text-slate-400",
                        "text-amber-700",
                      ];
                      const rankIcons = ["🥇", "🥈", "🥉"];
                      return (
                        <TableRow
                          key={partner.id}
                          className={cn(
                            "hover:bg-muted/30 transition-colors",
                            idx === 0 &&
                              "bg-amber-50/50 dark:bg-amber-500/5"
                          )}
                        >
                          <TableCell className="pl-4 font-bold text-sm">
                            <span
                              className={cn(
                                idx < 3
                                  ? rankColors[idx]
                                  : "text-muted-foreground"
                              )}
                            >
                              {idx < 3 ? rankIcons[idx] : `#${idx + 1}`}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {partner.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {partner.company}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 gap-0.5"
                            >
                              <MapPin className="w-2.5 h-2.5" />
                              {partner.city}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                              {partner.conversions}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              / {partner.totalLeads} leads
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-sm font-medium">
                            {formatCrore(partner.totalRevenue)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Progress
                                value={parseFloat(convRate)}
                                className="w-16 h-1.5"
                              />
                              <span className="text-xs font-medium w-9">
                                {convRate}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <StarRating rating={partner.rating} />
                          </TableCell>
                          <TableCell className="text-right pr-4">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[10px]",
                                partner.status === "Active"
                                  ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                  : "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                              )}
                            >
                              {partner.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── BROKERAGE MANAGEMENT TAB ── */}
          <TabsContent value="brokerage" className="mt-4 space-y-5">
            {/* Summary row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card className="border-amber-200/60 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-500/15 rounded-lg">
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Total Pending
                      </p>
                      <p className="text-xl font-bold text-amber-700 dark:text-amber-400">
                        {formatCrore(totalPending)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-rose-200/60 dark:border-rose-500/20 bg-rose-50/50 dark:bg-rose-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-100 dark:bg-rose-500/15 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Overdue Payouts
                      </p>
                      <p className="text-xl font-bold text-rose-700 dark:text-rose-400">
                        {overdueCount} Partners
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-emerald-200/60 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-500/15 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Paid This FY
                      </p>
                      <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                        ₹2.8 Cr
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Payouts */}
            <Card>
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    Pending Payouts
                    <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-0 text-xs">
                      {pendingPayouts.length}
                    </Badge>
                  </CardTitle>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Pay All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="text-xs pl-4">Partner</TableHead>
                      <TableHead className="text-xs">Project</TableHead>
                      <TableHead className="text-xs text-right">
                        Units
                      </TableHead>
                      <TableHead className="text-xs text-right">
                        Amount
                      </TableHead>
                      <TableHead className="text-xs text-right">
                        Due Date
                      </TableHead>
                      <TableHead className="text-xs text-right pr-4">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingPayouts.map((payout) => (
                      <TableRow
                        key={payout.id}
                        className={cn(
                          "hover:bg-muted/30 transition-colors",
                          payout.overdue &&
                            "bg-rose-50/30 dark:bg-rose-500/5"
                        )}
                      >
                        <TableCell className="pl-4">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {payout.partner}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" />
                              {payout.city}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {payout.project}
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {payout.units}
                        </TableCell>
                        <TableCell className="text-right text-sm font-semibold">
                          {formatCrore(payout.amount)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {payout.overdue && (
                              <Badge
                                variant="outline"
                                className="text-[10px] border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                              >
                                Overdue
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {payout.dueDate}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-4">
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-amber-500 hover:bg-amber-600 text-white"
                          >
                            <IndianRupee className="w-3 h-3 mr-1" />
                            Pay Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="text-xs pl-4">Txn ID</TableHead>
                      <TableHead className="text-xs">Partner</TableHead>
                      <TableHead className="text-xs">Project</TableHead>
                      <TableHead className="text-xs text-right">
                        Units
                      </TableHead>
                      <TableHead className="text-xs text-right">
                        Amount
                      </TableHead>
                      <TableHead className="text-xs text-right pr-4">
                        Paid On
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brokerageHistory.map((record) => (
                      <TableRow
                        key={record.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="pl-4">
                          <span className="font-mono text-xs text-muted-foreground">
                            {record.txnId}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">
                              {record.partner}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {record.company}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {record.project}
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          {record.units}
                        </TableCell>
                        <TableCell className="text-right text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          {formatCrore(record.amount)}
                        </TableCell>
                        <TableCell className="text-right pr-4">
                          <div className="flex items-center justify-end gap-1.5">
                            <Badge
                              variant="outline"
                              className="text-[10px] border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            >
                              <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
                              Paid
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {record.paidOn}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── ANALYTICS TAB ── */}
          <TabsContent value="analytics" className="mt-4 space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Monthly Performance */}
              <Card>
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-500" />
                    Monthly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 pb-2">
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart
                      data={monthlyPerformanceData}
                      margin={{ top: 4, right: 16, left: -16, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        strokeOpacity={0.5}
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
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: 12,
                          color: "hsl(var(--foreground))",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: 11 }}
                        iconType="circle"
                        iconSize={8}
                      />
                      <Line
                        type="monotone"
                        dataKey="leads"
                        name="Leads"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#6366f1" }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="conversions"
                        name="Conversions"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#22c55e" }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* City Breakdown Bar */}
              <Card>
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-cyan-500" />
                    City-wise Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 pb-2">
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                      data={cityBreakdownData}
                      margin={{ top: 4, right: 16, left: -16, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        strokeOpacity={0.5}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="city"
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
                        contentStyle={{
                          background: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: 12,
                          color: "hsl(var(--foreground))",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: 11 }}
                        iconType="circle"
                        iconSize={8}
                      />
                      <Bar
                        dataKey="leads"
                        name="Leads"
                        fill="#6366f1"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={28}
                      />
                      <Bar
                        dataKey="conversions"
                        name="Conversions"
                        fill="#22c55e"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={28}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* City breakdown with pie + stat rows */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <Card className="lg:col-span-1">
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm font-semibold">
                    Partner Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center pt-4">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={cityBreakdownData}
                        dataKey="partners"
                        nameKey="city"
                        cx="50%"
                        cy="50%"
                        outerRadius={72}
                        innerRadius={44}
                        paddingAngle={3}
                      >
                        {cityBreakdownData.map((_, idx) => (
                          <Cell
                            key={idx}
                            fill={pieColors[idx % pieColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: 12,
                          color: "hsl(var(--foreground))",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="w-full space-y-1.5 mt-2">
                    {cityBreakdownData.map((item, idx) => (
                      <div
                        key={item.city}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                              background: pieColors[idx % pieColors.length],
                            }}
                          />
                          <span className="text-muted-foreground">
                            {item.city}
                          </span>
                        </div>
                        <span className="font-medium">
                          {item.partners} partner{item.partners !== 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top performers summary */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    Top Performers Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  {leaderboard.slice(0, 5).map((p, idx) => {
                    const maxConv = leaderboard[0].conversions;
                    const pct = Math.round((p.conversions / maxConv) * 100);
                    return (
                      <div key={p.id} className="flex items-center gap-3">
                        <span className="text-sm font-bold w-5 text-muted-foreground">
                          #{idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-medium text-foreground truncate">
                              {p.name}
                              <span className="text-muted-foreground ml-1 font-normal">
                                · {p.company}
                              </span>
                            </p>
                            <div className="flex items-center gap-1 ml-2 shrink-0">
                              <ChevronUp className="w-3 h-3 text-emerald-500" />
                              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                {p.conversions}
                              </span>
                            </div>
                          </div>
                          <Progress
                            value={pct}
                            className="h-1.5"
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
