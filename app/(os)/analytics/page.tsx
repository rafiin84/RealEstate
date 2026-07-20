"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Users,
  Building2,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  revenueChartData,
  salesPipelineData,
  inventoryMixData,
  leadSourceData,
  cityPerformanceData,
  projects,
  channelPartners,
} from "@/lib/mock-data";

// ─── Color Palette ────────────────────────────────────────────────────────────

const COLORS = {
  indigo: "#6366f1",
  cyan: "#06b6d4",
  emerald: "#22c55e",
  amber: "#f59e0b",
  rose: "#f43f5e",
  violet: "#a78bfa",
  sky: "#38bdf8",
  orange: "#fb923c",
};

const CHART_COLORS = Object.values(COLORS);

const TOOLTIP_STYLE = {
  fontSize: 12,
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--card-foreground)",
};

// ─── Supplemental Chart Data ──────────────────────────────────────────────────

const monthlyBookingsData = [
  { month: "Apr", bookings: 28, value: 33.6 },
  { month: "May", bookings: 35, value: 44.1 },
  { month: "Jun", bookings: 31, value: 38.9 },
  { month: "Jul", bookings: 42, value: 54.6 },
  { month: "Aug", bookings: 38, value: 49.2 },
  { month: "Sep", bookings: 51, value: 66.3 },
  { month: "Oct", bookings: 44, value: 57.2 },
  { month: "Nov", bookings: 62, value: 80.6 },
  { month: "Dec", bookings: 57, value: 74.1 },
  { month: "Jan", bookings: 68, value: 88.4 },
  { month: "Feb", bookings: 64, value: 83.2 },
  { month: "Mar", bookings: 79, value: 102.7 },
];

const unitTypeMixData = [
  { name: "2 BHK", value: 182, fill: COLORS.indigo },
  { name: "3 BHK", value: 143, fill: COLORS.cyan },
  { name: "4 BHK", value: 89, fill: COLORS.emerald },
  { name: "Villa", value: 74, fill: COLORS.amber },
  { name: "Office", fill: COLORS.rose, value: 48 },
  { name: "Retail", value: 19, fill: COLORS.violet },
];

const channelPartnerPerfData = channelPartners.map((cp) => ({
  name: cp.name.split(" ")[0],
  company: cp.company,
  leads: cp.totalLeads,
  conversions: cp.conversions,
  revenue: Math.round(cp.totalRevenue / 10000000),
  conversionRate: Math.round((cp.conversions / cp.totalLeads) * 100 * 10) / 10,
}));

const leadVolumeTrendData = [
  { month: "Feb", website: 48, channelPartner: 38, facebook: 29, referral: 18, google: 24 },
  { month: "Mar", website: 55, channelPartner: 44, facebook: 35, referral: 22, google: 28 },
  { month: "Apr", website: 62, channelPartner: 52, facebook: 38, referral: 28, google: 32 },
  { month: "May", website: 58, channelPartner: 49, facebook: 41, referral: 26, google: 30 },
  { month: "Jun", website: 71, channelPartner: 58, facebook: 44, referral: 31, google: 36 },
  { month: "Jul", website: 78, channelPartner: 64, facebook: 48, referral: 38, google: 42 },
];

const projectRevenueVsTargetData = projects
  .filter((p) => p.totalRevenue > 0)
  .map((p) => ({
    name: p.name.split(" ").slice(0, 2).join(" "),
    revenue: Math.round(p.collectedRevenue / 10000000),
    target: Math.round(p.totalRevenue / 10000000),
  }));

const collectionsData = revenueChartData.map((d) => ({
  month: d.month,
  collections: d.collections,
  target: d.target,
  outstanding: Math.round((d.target - d.collections + Math.random() * 3) * 10) / 10,
}));

const revenueByProjectData = projects
  .filter((p) => p.collectedRevenue > 0)
  .map((p) => ({
    name: p.name.split(" ").slice(0, 2).join(" "),
    revenue: Math.round(p.collectedRevenue / 10000000),
    city: p.location.city,
  }));

// ─── KPI Tile ─────────────────────────────────────────────────────────────────

interface KPITileProps {
  title: string;
  value: string;
  sub: string;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

function KPITile({ title, value, sub, change, icon, color }: KPITileProps) {
  const isPositive = change !== undefined && change >= 0;
  const hasChange = change !== undefined;
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground truncate">{title}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground truncate">{sub}</p>
            {hasChange && (
              <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {Math.abs(change)}% vs last FY
              </div>
            )}
          </div>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Funnel Bar ───────────────────────────────────────────────────────────────

function FunnelVisualization() {
  const maxCount = salesPipelineData[0].count;
  const funnelColors = [COLORS.indigo, COLORS.cyan, COLORS.emerald, COLORS.amber, COLORS.orange, COLORS.rose];

  return (
    <div className="space-y-3">
      {salesPipelineData.map((stage, i) => {
        const pct = Math.round((stage.count / maxCount) * 100);
        const convRate = i > 0
          ? Math.round((stage.count / salesPipelineData[i - 1].count) * 100)
          : 100;
        return (
          <div key={stage.stage} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{stage.stage}</span>
              <div className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {convRate}% conv.
                  </span>
                )}
                <span className="font-semibold tabular-nums">{stage.count.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground w-16 text-right">
                  ₹{stage.value} Cr
                </span>
              </div>
            </div>
            <div className="relative h-8 rounded-md overflow-hidden bg-muted/50">
              <div
                className="h-full rounded-md transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  backgroundColor: funnelColors[i],
                  opacity: 0.85,
                }}
              />
              <span
                className="absolute inset-0 flex items-center px-3 text-xs font-medium text-white"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
              >
                {pct}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Project Progress Card ────────────────────────────────────────────────────

function ProjectProgressCard() {
  return (
    <div className="space-y-4">
      {projects.map((project) => {
        const salesPct = project.totalUnits > 0
          ? Math.round((project.soldUnits / project.totalUnits) * 100)
          : 0;
        return (
          <div key={project.id} className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold truncate">{project.name}</p>
                <p className="text-xs text-muted-foreground">{project.location.city} &middot; {project.type}</p>
              </div>
              <Badge
                variant="outline"
                className={
                  project.status === "Ready to Move"
                    ? "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
                    : project.status === "Under Construction"
                    ? "border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/30"
                    : "border-sky-500 text-sky-600 bg-sky-50 dark:bg-sky-950/30"
                }
              >
                {project.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Construction</span>
                <span className="font-medium text-foreground">{project.constructionProgress}%</span>
              </div>
              <Progress value={project.constructionProgress} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Sales ({project.soldUnits}/{project.totalUnits} units)</span>
                <span className="font-medium text-foreground">{salesPct}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-cyan-500 transition-all"
                  style={{ width: `${salesPct}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
              <span>
                Revenue:{" "}
                <span className="font-medium text-foreground">
                  ₹{Math.round(project.collectedRevenue / 10000000)} Cr
                </span>
                {" / "}
                <span>₹{Math.round(project.totalRevenue / 10000000)} Cr</span>
              </span>
              <span className="ml-auto">
                Available:{" "}
                <span className="font-medium text-foreground">{project.availableUnits}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("this-fy");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Business intelligence across all projects and channels
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={(v) => v && setPeriod(v)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-fy">This FY</SelectItem>
              <SelectItem value="last-fy">Last FY</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="h-9">
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="leads">Lead Analytics</TabsTrigger>
          <TabsTrigger value="projects">Project Performance</TabsTrigger>
          <TabsTrigger value="financial">Financial Analytics</TabsTrigger>
        </TabsList>

        {/* ════════════════════════════════════════════════════
            TAB 1 — SALES ANALYTICS
        ════════════════════════════════════════════════════ */}
        <TabsContent value="sales" className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KPITile
              title="Total Bookings"
              value="599"
              sub="Units booked this FY"
              change={8.2}
              icon={<Building2 className="h-5 w-5 text-white" />}
              color="bg-indigo-500"
            />
            <KPITile
              title="Booking Value"
              value="₹773 Cr"
              sub="Gross booking value"
              change={14.6}
              icon={<IndianRupee className="h-5 w-5 text-white" />}
              color="bg-cyan-500"
            />
            <KPITile
              title="Avg. Ticket Size"
              value="₹1.29 Cr"
              sub="Per unit average"
              change={5.9}
              icon={<TrendingUp className="h-5 w-5 text-white" />}
              color="bg-emerald-500"
            />
            <KPITile
              title="Channel Revenue"
              value="₹93 Cr"
              sub="Via channel partners"
              change={11.3}
              icon={<Users className="h-5 w-5 text-white" />}
              color="bg-amber-500"
            />
          </div>

          {/* Monthly bookings trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monthly Bookings Trend</CardTitle>
              <CardDescription>Bookings and booking value across 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlyBookingsData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.indigo} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={COLORS.indigo} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} unit=" Cr" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="bookings"
                    name="Units Booked"
                    stroke={COLORS.indigo}
                    strokeWidth={2}
                    fill="url(#bookGrad)"
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="value"
                    name="Value (₹ Cr)"
                    stroke={COLORS.cyan}
                    strokeWidth={2}
                    fill="url(#valGrad)"
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* City-wise + Unit Mix */}
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">City-wise Sales Performance</CardTitle>
                <CardDescription>Revenue (₹ Cr) and units sold by city</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={cityPerformanceData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="city" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="rev" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="units" orientation="right" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar yAxisId="rev" dataKey="revenue" name="Revenue (₹ Cr)" fill={COLORS.indigo} radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="units" dataKey="units" name="Units Sold" fill={COLORS.cyan} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Unit Type Mix Sold</CardTitle>
                <CardDescription>Distribution by unit configuration</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={unitTypeMixData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {unitTypeMixData.map((entry, i) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(val) => [`${val} units`, ""]} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Channel Partner Performance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Channel Partner Performance</CardTitle>
              <CardDescription>Leads, conversions and revenue from top partners</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={channelPartnerPerfData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="count" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="rev" orientation="right" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} unit=" Cr" />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(val, name) => {
                      if (name === "Revenue (₹ Cr)") return [`₹${val} Cr`, name];
                      return [val, name];
                    }}
                    labelFormatter={(label) => {
                      const cp = channelPartnerPerfData.find((c) => c.name === label);
                      return cp ? cp.company : label;
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar yAxisId="count" dataKey="leads" name="Total Leads" fill={COLORS.indigo} radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="count" dataKey="conversions" name="Conversions" fill={COLORS.emerald} radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="rev" dataKey="revenue" name="Revenue (₹ Cr)" fill={COLORS.amber} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ════════════════════════════════════════════════════
            TAB 2 — LEAD ANALYTICS
        ════════════════════════════════════════════════════ */}
        <TabsContent value="leads" className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KPITile
              title="Total Leads"
              value="1,248"
              sub="Active in pipeline"
              change={18.7}
              icon={<Users className="h-5 w-5 text-white" />}
              color="bg-violet-500"
            />
            <KPITile
              title="Avg. Conversion"
              value="12.8%"
              sub="Lead to booking rate"
              change={2.1}
              icon={<TrendingUp className="h-5 w-5 text-white" />}
              color="bg-sky-500"
            />
            <KPITile
              title="Site Visits"
              value="142"
              sub="This month"
              change={22.5}
              icon={<Building2 className="h-5 w-5 text-white" />}
              color="bg-emerald-500"
            />
            <KPITile
              title="Cost Per Lead"
              value="₹4,820"
              sub="Blended average"
              change={-6.4}
              icon={<IndianRupee className="h-5 w-5 text-white" />}
              color="bg-rose-500"
            />
          </div>

          {/* Lead Source + Funnel */}
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Lead Source Performance</CardTitle>
                <CardDescription>Volume vs conversion rate by source</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={leadSourceData} margin={{ top: 4, right: 24, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="source" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="leads" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis
                      yAxisId="conv"
                      orientation="right"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      unit="%"
                      domain={[0, 30]}
                    />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar
                      yAxisId="leads"
                      dataKey="leads"
                      name="Leads"
                      fill={COLORS.indigo}
                      radius={[4, 4, 0, 0]}
                    >
                      {leadSourceData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                    <Line
                      yAxisId="conv"
                      type="monotone"
                      dataKey="conversion"
                      name="Conversion %"
                      stroke={COLORS.rose}
                      strokeWidth={2.5}
                      dot={{ fill: COLORS.rose, r: 4 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Sales Funnel</CardTitle>
                <CardDescription>Lead to booking conversion funnel</CardDescription>
              </CardHeader>
              <CardContent>
                <FunnelVisualization />
              </CardContent>
            </Card>
          </div>

          {/* Lead Volume Trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Lead Volume Trend — Last 6 Months</CardTitle>
              <CardDescription>Monthly new leads by acquisition channel</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={leadVolumeTrendData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="website" name="Website" stroke={COLORS.indigo} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="channelPartner" name="Channel Partner" stroke={COLORS.cyan} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="facebook" name="Facebook Ads" stroke={COLORS.rose} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="referral" name="Referrals" stroke={COLORS.emerald} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="google" name="Google Ads" stroke={COLORS.amber} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Source quality table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Source Quality Matrix</CardTitle>
              <CardDescription>Ranked by conversion rate effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 font-medium">Source</th>
                      <th className="pb-3 font-medium text-right">Leads</th>
                      <th className="pb-3 font-medium text-right">Conversion</th>
                      <th className="pb-3 font-medium text-right">Bookings</th>
                      <th className="pb-3 font-medium">Quality</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[...leadSourceData]
                      .sort((a, b) => b.conversion - a.conversion)
                      .map((row, i) => {
                        const bookings = Math.round((row.leads * row.conversion) / 100);
                        const quality =
                          row.conversion >= 18 ? "Excellent" :
                          row.conversion >= 12 ? "Good" :
                          row.conversion >= 7 ? "Average" : "Low";
                        const qColor =
                          quality === "Excellent" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" :
                          quality === "Good" ? "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400" :
                          quality === "Average" ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" :
                          "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400";
                        return (
                          <tr key={row.source} className="py-2">
                            <td className="py-2.5 font-medium">{row.source}</td>
                            <td className="py-2.5 text-right tabular-nums">{row.leads}</td>
                            <td className="py-2.5 text-right tabular-nums font-medium">{row.conversion}%</td>
                            <td className="py-2.5 text-right tabular-nums">{bookings}</td>
                            <td className="py-2.5">
                              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${qColor}`}>
                                {quality}
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

        {/* ════════════════════════════════════════════════════
            TAB 3 — PROJECT PERFORMANCE
        ════════════════════════════════════════════════════ */}
        <TabsContent value="projects" className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KPITile
              title="Active Projects"
              value="5"
              sub="Across 4 cities"
              icon={<Building2 className="h-5 w-5 text-white" />}
              color="bg-indigo-500"
            />
            <KPITile
              title="Total Units"
              value="1,840"
              sub="Across all projects"
              icon={<BarChart2 className="h-5 w-5 text-white" />}
              color="bg-cyan-500"
            />
            <KPITile
              title="Units Sold"
              value="555"
              sub="30.2% of inventory"
              change={8.2}
              icon={<TrendingUp className="h-5 w-5 text-white" />}
              color="bg-emerald-500"
            />
            <KPITile
              title="Portfolio Value"
              value="₹1,857 Cr"
              sub="Total projected revenue"
              change={22.4}
              icon={<IndianRupee className="h-5 w-5 text-white" />}
              color="bg-amber-500"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Project Progress */}
            <Card className="lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Project Progress Overview</CardTitle>
                <CardDescription>Construction and sales completion per project</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectProgressCard />
              </CardContent>
            </Card>

            {/* Revenue vs Target per project */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Revenue vs Target</CardTitle>
                <CardDescription>Collected revenue vs total target (₹ Cr)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart
                    data={projectRevenueVsTargetData}
                    layout="vertical"
                    margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
                    barGap={3}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} unit=" Cr" />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={100} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(val) => [`₹${val} Cr`, ""]} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="target" name="Target" fill={COLORS.indigo} fillOpacity={0.25} radius={[0, 4, 4, 0]} />
                    <Bar dataKey="revenue" name="Collected" fill={COLORS.indigo} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Project summary table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Project Scorecard</CardTitle>
              <CardDescription>Key metrics for all active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 font-medium">Project</th>
                      <th className="pb-3 font-medium">City</th>
                      <th className="pb-3 font-medium text-right">Units</th>
                      <th className="pb-3 font-medium text-right">Sold %</th>
                      <th className="pb-3 font-medium text-right">Construction</th>
                      <th className="pb-3 font-medium text-right">Target (₹ Cr)</th>
                      <th className="pb-3 font-medium text-right">Collected (₹ Cr)</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {projects.map((p) => {
                      const soldPct = p.totalUnits > 0 ? Math.round((p.soldUnits / p.totalUnits) * 100) : 0;
                      return (
                        <tr key={p.id}>
                          <td className="py-3 font-medium">{p.name}</td>
                          <td className="py-3 text-muted-foreground">{p.location.city}</td>
                          <td className="py-3 text-right tabular-nums">{p.totalUnits}</td>
                          <td className="py-3 text-right tabular-nums font-medium">{soldPct}%</td>
                          <td className="py-3 text-right tabular-nums">{p.constructionProgress}%</td>
                          <td className="py-3 text-right tabular-nums">{Math.round(p.totalRevenue / 10000000)}</td>
                          <td className="py-3 text-right tabular-nums">{Math.round(p.collectedRevenue / 10000000)}</td>
                          <td className="py-3">
                            <Badge
                              variant="outline"
                              className={
                                p.status === "Ready to Move"
                                  ? "border-emerald-500 text-emerald-600"
                                  : p.status === "Under Construction"
                                  ? "border-amber-500 text-amber-600"
                                  : "border-sky-500 text-sky-600"
                              }
                            >
                              {p.status}
                            </Badge>
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

        {/* ════════════════════════════════════════════════════
            TAB 4 — FINANCIAL ANALYTICS
        ════════════════════════════════════════════════════ */}
        <TabsContent value="financial" className="space-y-6">
          {/* Financial KPI Tiles */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KPITile
              title="EBITDA"
              value="₹38.4 Cr"
              sub="This FY (21% margin)"
              change={6.8}
              icon={<TrendingUp className="h-5 w-5 text-white" />}
              color="bg-emerald-600"
            />
            <KPITile
              title="Gross Margin"
              value="34.2%"
              sub="Blended across projects"
              change={1.4}
              icon={<BarChart2 className="h-5 w-5 text-white" />}
              color="bg-indigo-500"
            />
            <KPITile
              title="Total Collections"
              value="₹256 Cr"
              sub="Year to date"
              change={-3.1}
              icon={<IndianRupee className="h-5 w-5 text-white" />}
              color="bg-cyan-500"
            />
            <KPITile
              title="Receivables"
              value="₹117 Cr"
              sub="Outstanding balance"
              change={4.2}
              icon={<TrendingDown className="h-5 w-5 text-white" />}
              color="bg-amber-500"
            />
          </div>

          {/* Collections Trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Collections Trend</CardTitle>
              <CardDescription>Monthly collections vs target and outstanding (₹ Cr)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={collectionsData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="collGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.indigo} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.indigo} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="outGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.rose} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={COLORS.rose} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} unit=" Cr" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(val) => [`₹${val} Cr`, ""]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="target"
                    name="Target"
                    stroke={COLORS.violet}
                    strokeDasharray="5 4"
                    strokeWidth={2}
                    fill="none"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="collections"
                    name="Collections"
                    stroke={COLORS.indigo}
                    strokeWidth={2}
                    fill="url(#collGrad)"
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="outstanding"
                    name="Outstanding"
                    stroke={COLORS.rose}
                    strokeWidth={2}
                    fill="url(#outGrad)"
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue by Project + Receivables Aging */}
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Revenue by Project</CardTitle>
                <CardDescription>Collected revenue per project (₹ Cr)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={revenueByProjectData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} unit=" Cr" />
                    <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(val) => [`₹${val} Cr`, "Revenue"]} />
                    <Bar dataKey="revenue" name="Revenue" radius={[4, 4, 0, 0]}>
                      {revenueByProjectData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Receivables Aging</CardTitle>
                <CardDescription>Outstanding amounts by overdue bucket</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-2">
                {[
                  { label: "Current (0–30 days)", value: 48.2, pct: 41, color: "bg-emerald-500" },
                  { label: "31–60 days", value: 29.6, pct: 25, color: "bg-amber-400" },
                  { label: "61–90 days", value: 22.4, pct: 19, color: "bg-orange-500" },
                  { label: "90+ days", value: 17.1, pct: 15, color: "bg-rose-600" },
                ].map((bucket) => (
                  <div key={bucket.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{bucket.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold tabular-nums">₹{bucket.value} Cr</span>
                        <span className="text-xs text-muted-foreground w-9 text-right">{bucket.pct}%</span>
                      </div>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${bucket.color}`}
                        style={{ width: `${bucket.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="mt-4 rounded-lg border bg-muted/40 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Receivables</span>
                    <span className="text-lg font-bold">₹117.3 Cr</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    34% overdue &gt;60 days — review collections schedule
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Revenue vs Target — FY Trend</CardTitle>
              <CardDescription>Monthly revenue achievement across the financial year (₹ Cr)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={revenueChartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} unit=" Cr" />
                  <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(val) => [`₹${val} Cr`, ""]} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="revenue" name="Revenue" fill={COLORS.indigo} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill={COLORS.indigo} fillOpacity={0.25} radius={[4, 4, 0, 0]} />
                  <Line
                    type="monotone"
                    dataKey="collections"
                    name="Collections"
                    stroke={COLORS.emerald}
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: COLORS.emerald }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
