"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  IndianRupee,
  Home,
  Users,
  TrendingUp,
  Building2,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Activity,
  DollarSign,
} from "lucide-react";
import {
  executiveDashboardKPIs,
  revenueChartData,
  salesPipelineData,
  inventoryMixData,
  leadSourceData,
  cityPerformanceData,
  leads,
  projects,
} from "@/lib/mock-data";
import type { KPICard as KPICardType, Lead, Project } from "@/types";
import { KPICard } from "@/components/dashboard/kpi-card";
import { StatusBadge } from "@/components/dashboard/status-badge";

// ─── Constants ────────────────────────────────────────────────────────────────

const CHART_COLORS = ["#6366f1", "#06b6d4", "#22c55e", "#f59e0b", "#ec4899", "#a78bfa"];

const TOOLTIP_STYLE = {
  fontSize: 12,
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--card-foreground)",
};

const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  IndianRupee,
  Home,
  Users,
  TrendingUp,
  Building2,
  MapPin,
};


const RECENT_ACTIVITIES = [
  {
    id: 1,
    user: "Vikram Singh",
    initials: "VS",
    action: "added a new lead",
    target: "Arjun Mehta",
    time: "2m ago",
    dotColor: "#6366f1",
  },
  {
    id: 2,
    user: "Riya Kapoor",
    initials: "RK",
    action: "booked unit",
    target: "A-201, Prestige Heights",
    time: "1h ago",
    dotColor: "#22c55e",
  },
  {
    id: 3,
    user: "Nikhil Joshi",
    initials: "NJ",
    action: "scheduled site visit for",
    target: "Rohit Bajaj",
    time: "2h ago",
    dotColor: "#06b6d4",
  },
  {
    id: 4,
    user: "System",
    initials: "SY",
    action: "collected payment",
    target: "₹15L from Rajesh Kumar",
    time: "4h ago",
    dotColor: "#f59e0b",
  },
  {
    id: 5,
    user: "Rahul Khanna",
    initials: "RH",
    action: "approved discount for",
    target: "Deepak Agarwal",
    time: "6h ago",
    dotColor: "#ec4899",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
      {children}
    </h2>
  );
}

function ChartTooltip(props: React.ComponentProps<typeof Tooltip>) {
  return (
    <Tooltip
      contentStyle={TOOLTIP_STYLE}
      labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
      {...props}
    />
  );
}

function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
            <RefreshCw className="w-3 h-3" />
          </Button>
        </div>
        <CardDescription className="text-xs">Latest updates across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {RECENT_ACTIVITIES.map((activity, idx) => (
            <div key={activity.id} className="relative flex items-start gap-3">
              {/* Timeline connector */}
              {idx < RECENT_ACTIVITIES.length - 1 && (
                <span
                  className="absolute left-3 top-7 bottom-0 w-px bg-border"
                  aria-hidden="true"
                />
              )}
              <Avatar className="w-6 h-6 shrink-0 ring-2 ring-background">
                <AvatarFallback
                  className="text-[9px] font-semibold"
                  style={{ background: activity.dotColor + "22", color: activity.dotColor }}
                >
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs text-foreground leading-relaxed">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [tab, setTab] = useState("revenue");

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">

        {/* ── Page Header — clean white like reference ─────────────────────── */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-primary" />
              Executive Dashboard
            </p>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mt-0.5">Godrej Properties</h1>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">July 21, 2026 · FY 2026–27</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5 h-9 text-xs rounded-full">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm" className="gap-1.5 h-9 text-xs rounded-full bg-primary hover:bg-primary/90">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Report</span>
            </Button>
          </div>
        </div>

        {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(executiveDashboardKPIs as KPICardType[]).map((kpi) => {
              const Icon = ICON_MAP[kpi.icon];
              return (
                <KPICard
                  key={kpi.id}
                  title={kpi.title}
                  value={kpi.value}
                  subtitle={kpi.subtitle}
                  change={kpi.change}
                  changeLabel={kpi.changeLabel}
                  color={kpi.color}
                  icon={Icon ? <Icon className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                />
              );
            })}
          </div>
        </section>

        {/* ── Tabs + Activity Feed ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">

          {/* Left: Tabs */}
          <div className="min-w-0">
            <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="revenue" className="text-xs">Revenue &amp; Sales</TabsTrigger>
                  <TabsTrigger value="inventory" className="text-xs">Inventory</TabsTrigger>
                  <TabsTrigger value="leads" className="text-xs">Leads</TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground">
                  <Filter className="w-3 h-3" />
                  Filters
                </Button>
              </div>

              {/* ── Revenue & Sales ── */}
              <TabsContent value="revenue" className="space-y-4 mt-0">
                <SectionHeading>Revenue &amp; Collections</SectionHeading>

                {/* Full-width Area Chart */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-sm font-semibold">Revenue vs Target vs Collections</CardTitle>
                        <CardDescription className="text-xs mt-0.5">FY 2023–24 monthly performance (₹ Cr)</CardDescription>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#6366f1" }} />
                          Revenue
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
                          Collections
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full border-2 border-dashed" style={{ borderColor: "#f59e0b", background: "transparent" }} />
                          Target
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart
                        data={revenueChartData}
                        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
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
                        <ChartTooltip />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#6366f1"
                          strokeWidth={2}
                          fill="url(#gradRevenue)"
                          name="Revenue (₹Cr)"
                        />
                        <Area
                          type="monotone"
                          dataKey="collections"
                          stroke="#22c55e"
                          strokeWidth={2}
                          fill="url(#gradCollections)"
                          name="Collections (₹Cr)"
                        />
                        <Area
                          type="monotone"
                          dataKey="target"
                          stroke="#f59e0b"
                          strokeWidth={1.5}
                          strokeDasharray="5 4"
                          fill="none"
                          name="Target (₹Cr)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* City Performance + Funnel */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* City Performance Bar Chart */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold">City Performance</CardTitle>
                      <CardDescription className="text-xs">Revenue by city (₹ Cr)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart
                          data={cityPerformanceData}
                          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="color-mix(in oklch, var(--border), transparent 30%)"
                          />
                          <XAxis
                            dataKey="city"
                            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <ChartTooltip />
                          <Bar
                            dataKey="revenue"
                            radius={[4, 4, 0, 0]}
                            name="Revenue (₹Cr)"
                          >
                            {cityPerformanceData.map((_entry, index) => (
                              <Cell
                                key={`city-bar-${index}`}
                                fill={CHART_COLORS[index % CHART_COLORS.length]}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Sales Pipeline FunnelChart */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold">Sales Pipeline</CardTitle>
                      <CardDescription className="text-xs">Lead-to-booking conversion funnel</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={220}>
                        <FunnelChart>
                          <ChartTooltip formatter={(value) => [`${value} leads`, ""]} />
                          <Funnel
                            dataKey="count"
                            nameKey="stage"
                            data={salesPipelineData.map((d, i) => ({
                              ...d,
                              fill: CHART_COLORS[i % CHART_COLORS.length],
                            }))}
                            isAnimationActive
                          >
                            <LabelList
                              position="right"
                              content={({ value, name }) => (
                                <text
                                  x={0}
                                  y={0}
                                  fill="var(--muted-foreground)"
                                  fontSize={10}
                                >
                                  {name}: {value}
                                </text>
                              )}
                            />
                          </Funnel>
                        </FunnelChart>
                      </ResponsiveContainer>
                      {/* Inline legend for funnel */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3">
                        {salesPipelineData.map((item, i) => (
                          <div key={item.stage} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span
                              className="w-2 h-2 rounded-sm shrink-0"
                              style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                            />
                            <span className="truncate">{item.stage}</span>
                            <span className="ml-auto font-medium text-foreground">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* ── Inventory ── */}
              <TabsContent value="inventory" className="space-y-4 mt-0">
                <SectionHeading>Inventory Overview</SectionHeading>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Pie Chart */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold">Inventory Mix</CardTitle>
                      <CardDescription className="text-xs">Unit type distribution across all projects</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={inventoryMixData}
                            cx="50%"
                            cy="50%"
                            innerRadius={52}
                            outerRadius={78}
                            paddingAngle={3}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            {inventoryMixData.map((entry) => (
                              <Cell key={entry.name} fill={entry.fill} />
                            ))}
                          </Pie>
                          <ChartTooltip formatter={(v) => [`${v}%`, "Share"] as [string, string]} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 mt-1">
                        {inventoryMixData.map((item) => (
                          <span
                            key={item.name}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground"
                          >
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ background: item.fill }}
                            />
                            {item.name}
                            <span className="font-medium text-foreground">{item.value}%</span>
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Stats */}
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold">Project Inventory Status</CardTitle>
                      <CardDescription className="text-xs">Available · Booked · Registered per project</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-5">
                        {(projects as Project[]).map((p) => {
                          const soldPct = Math.round((p.soldUnits / p.totalUnits) * 100);
                          const blockedPct = Math.round((p.blockedUnits / p.totalUnits) * 100);
                          const availPct = 100 - soldPct - blockedPct;
                          return (
                            <div key={p.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-xs font-medium text-foreground truncate">{p.name}</span>
                                  <Badge variant="secondary" className="text-[10px] h-4 px-1.5 py-0 shrink-0">
                                    {p.type}
                                  </Badge>
                                </div>
                                <span className="text-xs text-muted-foreground shrink-0 ml-2">
                                  {p.soldUnits}/{p.totalUnits} sold
                                </span>
                              </div>
                              {/* Stacked progress bar */}
                              <div className="flex h-2 rounded-full overflow-hidden bg-muted gap-px">
                                <div
                                  className="bg-emerald-500 transition-all"
                                  style={{ width: `${soldPct}%` }}
                                  title={`Sold: ${p.soldUnits}`}
                                />
                                <div
                                  className="bg-amber-400 transition-all"
                                  style={{ width: `${blockedPct}%` }}
                                  title={`Blocked: ${p.blockedUnits}`}
                                />
                                <div
                                  className="bg-muted-foreground/20 flex-1"
                                  title={`Available: ${p.availableUnits}`}
                                />
                              </div>
                              {/* Stat pills */}
                              <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  Sold {p.soldUnits}
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                  Blocked {p.blockedUnits}
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                                  Available {p.availableUnits}
                                </span>
                                <span className="ml-auto font-medium text-foreground">
                                  {soldPct}% sold
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* ── Leads ── */}
              <TabsContent value="leads" className="space-y-4 mt-0">
                <SectionHeading>Lead Intelligence</SectionHeading>

                {/* Lead Source Bar Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Lead Source Performance</CardTitle>
                    <CardDescription className="text-xs">
                      Total leads (left axis) and conversion rate % (right axis) by acquisition channel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart
                        data={leadSourceData}
                        margin={{ top: 5, right: 8, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="color-mix(in oklch, var(--border), transparent 30%)"
                        />
                        <XAxis
                          dataKey="source"
                          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          yAxisId="left"
                          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                          axisLine={false}
                          tickLine={false}
                          unit="%"
                        />
                        <ChartTooltip />
                        <Bar
                          yAxisId="left"
                          dataKey="leads"
                          fill="#6366f1"
                          radius={[4, 4, 0, 0]}
                          name="Total Leads"
                          maxBarSize={32}
                        />
                        <Bar
                          yAxisId="right"
                          dataKey="conversion"
                          fill="#22c55e"
                          radius={[4, 4, 0, 0]}
                          name="Conversion %"
                          maxBarSize={32}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-2 rounded-sm" style={{ background: "#6366f1" }} />
                        Total Leads
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-2 rounded-sm" style={{ background: "#22c55e" }} />
                        Conversion %
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Leads Table */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-sm font-semibold">Recent Leads</CardTitle>
                        <CardDescription className="text-xs mt-0.5">
                          Latest leads across all projects with AI lead scores
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground gap-1">
                        View all
                        <ArrowUpRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5">
                              Lead
                            </th>
                            <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5">
                              Project
                            </th>
                            <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5">
                              Budget
                            </th>
                            <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5">
                              Status
                            </th>
                            <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5">
                              Score
                            </th>
                            <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5">
                              Assigned To
                            </th>
                            <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5">
                              Last Activity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(leads as Lead[]).slice(0, 6).map((lead) => {
                            const scoreColor =
                              lead.score >= 80
                                ? "#22c55e"
                                : lead.score >= 60
                                ? "#f59e0b"
                                : "#ef4444";
                            const initials = lead.name
                              .split(" ")
                              .map((w) => w[0])
                              .join("")
                              .substring(0, 2);
                            return (
                              <tr
                                key={lead.id}
                                className="border-b border-border/50 hover:bg-muted/40 transition-colors"
                              >
                                <td className="px-4 py-2.5">
                                  <div className="flex items-center gap-2.5">
                                    <Avatar className="w-7 h-7 shrink-0">
                                      <AvatarFallback
                                        className="text-[10px] font-semibold"
                                        style={{
                                          background: "#6366f115",
                                          color: "#6366f1",
                                        }}
                                      >
                                        {initials}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                      <p className="text-xs font-medium text-foreground truncate">
                                        {lead.name}
                                      </p>
                                      <p className="text-[10px] text-muted-foreground truncate">
                                        {lead.phone}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-2.5 text-xs text-muted-foreground max-w-[120px] truncate">
                                  {lead.interestedIn}
                                </td>
                                <td className="px-4 py-2.5 text-xs font-medium text-foreground whitespace-nowrap">
                                  ₹{(lead.budget / 10_000_000).toFixed(1)}Cr
                                </td>
                                <td className="px-4 py-2.5">
                                  <StatusBadge
                                    status={lead.status
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}
                                    label={lead.status}
                                  />
                                </td>
                                <td className="px-4 py-2.5">
                                  <div className="flex items-center gap-2">
                                    <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden shrink-0">
                                      <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                          width: `${lead.score}%`,
                                          background: scoreColor,
                                        }}
                                      />
                                    </div>
                                    <span
                                      className="text-[11px] font-semibold tabular-nums"
                                      style={{ color: scoreColor }}
                                    >
                                      {lead.score}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                                  {lead.assignedTo}
                                </td>
                                <td className="px-4 py-2.5 text-[11px] text-muted-foreground whitespace-nowrap">
                                  {lead.lastActivity}
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

          {/* Right: Activity Feed */}
          <div className="xl:sticky xl:top-6 xl:self-start">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
