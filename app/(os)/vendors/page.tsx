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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Building2,
  HardHat,
  Leaf,
  Zap,
  Sofa,
  Star,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
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
    label: "Active Vendors",
    value: "47",
    sub: "Across all projects",
    change: +5,
    icon: Building2,
    color: "#6366f1",
    good: true,
  },
  {
    label: "Total Contract Value",
    value: "₹84.6 Cr",
    sub: "FY 2026–27",
    change: +12,
    icon: FileText,
    color: "#22c55e",
    good: true,
  },
  {
    label: "On-Time Delivery",
    value: "78%",
    sub: "Last 6 months",
    change: +3,
    icon: CheckCircle2,
    color: "#06b6d4",
    good: true,
  },
  {
    label: "Expiring Contracts",
    value: "6",
    sub: "Within 30 days",
    change: +2,
    icon: Clock,
    color: "#f59e0b",
    good: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Civil: "#6366f1",
  MEP: "#06b6d4",
  Interior: "#ec4899",
  Landscaping: "#22c55e",
  "IT & Safety": "#f59e0b",
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Civil: HardHat,
  MEP: Zap,
  Interior: Sofa,
  Landscaping: Leaf,
  "IT & Safety": Building2,
};

const VENDORS = [
  {
    id: "VND-001",
    name: "Apex Constructions",
    category: "Civil",
    project: "Prestige Heights",
    contractValue: 18_00_00_000,
    status: "Active",
    rating: 4.5,
    completionPct: 68,
    contractEnd: "Dec 2026",
  },
  {
    id: "VND-002",
    name: "TechBuild MEP",
    category: "MEP",
    project: "Emerald Bay",
    contractValue: 9_50_00_000,
    status: "Active",
    rating: 4.2,
    completionPct: 45,
    contractEnd: "Mar 2027",
  },
  {
    id: "VND-003",
    name: "Elite Interiors",
    category: "Interior",
    project: "Skyline Residences",
    contractValue: 6_20_00_000,
    status: "Active",
    rating: 4.7,
    completionPct: 82,
    contractEnd: "Sep 2026",
  },
  {
    id: "VND-004",
    name: "GreenScape Pvt Ltd",
    category: "Landscaping",
    project: "Green Valley",
    contractValue: 2_40_00_000,
    status: "Active",
    rating: 3.9,
    completionPct: 55,
    contractEnd: "Nov 2026",
  },
  {
    id: "VND-005",
    name: "CoreStruct Engineers",
    category: "Civil",
    project: "Marina Cove",
    contractValue: 22_00_00_000,
    status: "Active",
    rating: 4.1,
    completionPct: 30,
    contractEnd: "Jun 2027",
  },
  {
    id: "VND-006",
    name: "LightWave Electrical",
    category: "MEP",
    project: "Lakeside Villas",
    contractValue: 4_80_00_000,
    status: "On Hold",
    rating: 3.6,
    completionPct: 40,
    contractEnd: "Jan 2027",
  },
  {
    id: "VND-007",
    name: "Artisan Homes",
    category: "Interior",
    project: "Prestige Heights",
    contractValue: 8_10_00_000,
    status: "Active",
    rating: 4.8,
    completionPct: 90,
    contractEnd: "Aug 2026",
  },
  {
    id: "VND-008",
    name: "Urban Greens",
    category: "Landscaping",
    project: "Skyline Residences",
    contractValue: 1_60_00_000,
    status: "Closed",
    rating: 4.0,
    completionPct: 100,
    contractEnd: "Apr 2026",
  },
];

const PERFORMANCE_DATA = [
  { vendor: "Apex", onTime: 72, quality: 85, safety: 90 },
  { vendor: "TechBuild", onTime: 68, quality: 78, safety: 88 },
  { vendor: "Elite Int.", onTime: 91, quality: 94, safety: 96 },
  { vendor: "GreenScape", onTime: 80, quality: 76, safety: 85 },
  { vendor: "CoreStruct", onTime: 65, quality: 80, safety: 91 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtCrore(val: number) {
  return `₹${(val / 1_00_00_000).toFixed(2)} Cr`;
}

function statusStyle(status: string) {
  if (status === "Active")
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (status === "On Hold")
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  return "bg-slate-500/10 text-slate-600 dark:text-slate-400";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Active") return <CheckCircle2 className="w-3 h-3" />;
  if (status === "On Hold") return <Clock className="w-3 h-3" />;
  return <XCircle className="w-3 h-3" />;
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="w-3 h-3"
            style={{
              fill: i < full ? "#f59e0b" : "none",
              color: i < full ? "#f59e0b" : "var(--muted-foreground)",
            }}
          />
        ))}
      </div>
      <span className="text-[11px] text-muted-foreground">{rating}</span>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2);
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function VendorsPage() {
  const [tab, setTab] = useState("vendors");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...Object.keys(CATEGORY_COLORS)];

  const filteredVendors =
    categoryFilter === "All"
      ? VENDORS
      : VENDORS.filter((v) => v.category === categoryFilter);

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Vendors</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Vendor registry, active contracts &amp; performance metrics
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
            <Button size="sm" className="gap-1.5 h-8 text-xs">
              <Plus className="w-3.5 h-3.5" />
              Add Vendor
            </Button>
          </div>
        </div>

        {/* ── KPI Row ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {KPI_DATA.map((kpi) => {
            const Icon = kpi.icon;
            const trending = kpi.good ? kpi.change > 0 : kpi.change < 0;
            return (
              <Card key={kpi.label} className="py-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground truncate">{kpi.label}</p>
                      <p className="text-2xl font-bold tracking-tight mt-1">{kpi.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{kpi.sub}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        {trending ? (
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-rose-500" />
                        )}
                        <span
                          className={`text-[10px] font-medium ${
                            trending
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
            <TabsTrigger value="vendors" className="text-xs">
              Vendor List
            </TabsTrigger>
            <TabsTrigger value="contracts" className="text-xs">
              Active Contracts
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">
              Performance
            </TabsTrigger>
          </TabsList>

          {/* ── Vendor List ── */}
          <TabsContent value="vendors" className="mt-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {categories.map((cat) => {
                const color =
                  cat === "All" ? "#6366f1" : CATEGORY_COLORS[cat] ?? "#6366f1";
                const active = categoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all font-medium ${
                      active
                        ? "text-white border-transparent"
                        : "text-muted-foreground border-border hover:border-foreground/30"
                    }`}
                    style={active ? { background: color, borderColor: color } : {}}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {[
                          "Vendor",
                          "Category",
                          "Project",
                          "Contract Value",
                          "Completion",
                          "Contract End",
                          "Status",
                          "Rating",
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
                      {filteredVendors.map((v) => {
                        const CatIcon = CATEGORY_ICONS[v.category] ?? Building2;
                        const catColor = CATEGORY_COLORS[v.category] ?? "#6366f1";
                        return (
                          <tr
                            key={v.id}
                            className="border-b border-border/50 hover:bg-muted/40 transition-colors"
                          >
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2.5">
                                <Avatar className="w-7 h-7 shrink-0">
                                  <AvatarFallback
                                    className="text-[10px] font-semibold"
                                    style={{
                                      background: catColor + "18",
                                      color: catColor,
                                    }}
                                  >
                                    {initials(v.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-xs font-medium text-foreground">
                                    {v.name}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground">{v.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-1.5">
                                <CatIcon
                                  className="w-3.5 h-3.5"
                                  style={{ color: catColor }}
                                />
                                <span className="text-xs text-foreground">{v.category}</span>
                              </div>
                            </td>
                            <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                              {v.project}
                            </td>
                            <td className="px-4 py-2.5 text-xs font-semibold text-foreground whitespace-nowrap">
                              {fmtCrore(v.contractValue)}
                            </td>
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      width: `${v.completionPct}%`,
                                      background:
                                        v.completionPct >= 80
                                          ? "#22c55e"
                                          : v.completionPct >= 50
                                          ? "#f59e0b"
                                          : "#6366f1",
                                    }}
                                  />
                                </div>
                                <span className="text-[11px] text-muted-foreground tabular-nums">
                                  {v.completionPct}%
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                              {v.contractEnd}
                            </td>
                            <td className="px-4 py-2.5">
                              <span
                                className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full w-fit ${statusStyle(
                                  v.status
                                )}`}
                              >
                                <StatusIcon status={v.status} />
                                {v.status}
                              </span>
                            </td>
                            <td className="px-4 py-2.5">
                              <RatingStars rating={v.rating} />
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

          {/* ── Active Contracts ── */}
          <TabsContent value="contracts" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {VENDORS.filter((v) => v.status === "Active").map((v) => {
                const catColor = CATEGORY_COLORS[v.category] ?? "#6366f1";
                const CatIcon = CATEGORY_ICONS[v.category] ?? Building2;
                return (
                  <Card key={v.id} className="py-0">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="p-2 rounded-lg shrink-0"
                            style={{ background: catColor + "18" }}
                          >
                            <CatIcon className="w-4 h-4" style={{ color: catColor }} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-foreground">{v.name}</p>
                            <p className="text-[10px] text-muted-foreground">{v.category}</p>
                          </div>
                        </div>
                        <RatingStars rating={v.rating} />
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Project</span>
                          <span className="font-medium text-foreground">{v.project}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Contract Value</span>
                          <span className="font-semibold text-foreground">
                            {fmtCrore(v.contractValue)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Contract End</span>
                          <span className="text-foreground">{v.contractEnd}</span>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>Completion</span>
                          <span>{v.completionPct}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${v.completionPct}%`,
                              background: catColor,
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* ── Performance ── */}
          <TabsContent value="performance" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Vendor Performance Metrics
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  On-time delivery, quality score &amp; safety compliance (%)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={PERFORMANCE_DATA}
                    margin={{ top: 5, right: 5, left: -16, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="color-mix(in oklch, var(--border), transparent 30%)"
                    />
                    <XAxis
                      dataKey="vendor"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 100]}
                      unit="%"
                    />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    <Bar
                      dataKey="onTime"
                      fill="#6366f1"
                      radius={[3, 3, 0, 0]}
                      name="On-Time %"
                      maxBarSize={20}
                    />
                    <Bar
                      dataKey="quality"
                      fill="#22c55e"
                      radius={[3, 3, 0, 0]}
                      name="Quality %"
                      maxBarSize={20}
                    />
                    <Bar
                      dataKey="safety"
                      fill="#06b6d4"
                      radius={[3, 3, 0, 0]}
                      name="Safety %"
                      maxBarSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-5 mt-2 text-xs text-muted-foreground">
                  {[
                    { label: "On-Time", color: "#6366f1" },
                    { label: "Quality", color: "#22c55e" },
                    { label: "Safety", color: "#06b6d4" },
                  ].map((l) => (
                    <span key={l.label} className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-2 rounded-sm"
                        style={{ background: l.color }}
                      />
                      {l.label}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Table */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Detailed Scores</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {["Vendor", "On-Time %", "Quality %", "Safety %", "Overall"].map(
                          (h) => (
                            <th
                              key={h}
                              className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5 whitespace-nowrap"
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {PERFORMANCE_DATA.map((p) => {
                        const overall = Math.round(
                          (p.onTime + p.quality + p.safety) / 3
                        );
                        return (
                          <tr
                            key={p.vendor}
                            className="border-b border-border/50 hover:bg-muted/40 transition-colors"
                          >
                            <td className="px-4 py-2.5 text-xs font-medium text-foreground">
                              {p.vendor}
                            </td>
                            {[p.onTime, p.quality, p.safety].map((score, i) => (
                              <td key={i} className="px-4 py-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className="h-full rounded-full"
                                      style={{
                                        width: `${score}%`,
                                        background:
                                          score >= 85
                                            ? "#22c55e"
                                            : score >= 70
                                            ? "#f59e0b"
                                            : "#ef4444",
                                      }}
                                    />
                                  </div>
                                  <span className="text-[11px] text-muted-foreground">
                                    {score}%
                                  </span>
                                </div>
                              </td>
                            ))}
                            <td className="px-4 py-2.5">
                              <span
                                className={`text-xs font-bold ${
                                  overall >= 85
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : overall >= 70
                                    ? "text-amber-600 dark:text-amber-400"
                                    : "text-rose-600 dark:text-rose-400"
                                }`}
                              >
                                {overall}%
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
