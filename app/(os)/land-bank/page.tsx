"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Map,
  Plus,
  Search,
  MapPin,
  FileText,
  ArrowRight,
  TrendingUp,
  Maximize2,
  Sparkles,
  CheckCircle2,
  IndianRupee,
  Layers,
  Eye,
  LayoutGrid,
  Building2,
} from "lucide-react";
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
import { landParcels } from "@/lib/mock-data";
import type { LandParcel, LandParcelStatus } from "@/types";

// ─── Pipeline Stage Configuration ───────────────────────────────────────────

type StageConfig = {
  label: string;
  status: LandParcelStatus;
  color: string;
  order: number;
};

const PIPELINE_STAGES: StageConfig[] = [
  { label: "Prospecting",   status: "Prospecting",   color: "#94a3b8", order: 0 },
  { label: "Due Diligence", status: "Due Diligence", color: "#6366f1", order: 1 },
  { label: "Negotiation",   status: "Negotiation",   color: "#f59e0b", order: 2 },
  { label: "LOI Signed",    status: "LOI Signed",    color: "#a855f7", order: 3 },
  { label: "Agreement",     status: "Agreement",     color: "#06b6d4", order: 4 },
  { label: "Acquired",      status: "Acquired",      color: "#22c55e", order: 5 },
];

const STATUS_COLOR: Record<string, string> = Object.fromEntries(
  PIPELINE_STAGES.map(s => [s.status, s.color])
);
STATUS_COLOR["Rejected"] = "#ef4444";

function getSuitabilityColor(score: number) {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

// ─── Parcel Card ─────────────────────────────────────────────────────────────

function ParcelCard({ parcel }: { parcel: LandParcel }) {
  const stage = PIPELINE_STAGES.find(s => s.status === parcel.status);
  const color = stage?.color ?? "#94a3b8";
  const stageOrder = stage?.order ?? -1;
  const sColor = getSuitabilityColor(parcel.suitabilityScore);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      {/* Stage color bar */}
      <div className="h-1 w-full" style={{ background: color }} />

      <CardContent className="p-4 space-y-3">
        {/* Name + City + Status Badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm text-foreground leading-snug truncate">
              {parcel.name}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              {parcel.location.city}, {parcel.location.state}
            </p>
          </div>
          <span
            className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border"
            style={{
              color,
              background: `${color}18`,
              borderColor: `${color}40`,
            }}
          >
            {parcel.status}
          </span>
        </div>

        {/* Inline pipeline progress dots */}
        <div className="flex items-center gap-0.5">
          {PIPELINE_STAGES.map((s, i) => (
            <div key={s.status} className="flex items-center gap-0.5">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: i <= stageOrder ? s.color : "#e2e8f0" }}
              />
              {i < PIPELINE_STAGES.length - 1 && (
                <div
                  className="h-px w-3"
                  style={{ background: i < stageOrder ? color : "#e2e8f0" }}
                />
              )}
            </div>
          ))}
          <span className="ml-1.5 text-[9px] text-muted-foreground">
            Stage {stageOrder + 1} / {PIPELINE_STAGES.length}
          </span>
        </div>

        {/* Stats: Area / Acres / FSI */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-muted/50 rounded-md p-2 text-center">
            <p className="text-[11px] font-semibold text-foreground leading-none">
              {parcel.totalArea.toLocaleString("en-IN")}
            </p>
            <p className="text-[9px] text-muted-foreground mt-0.5">sq ft</p>
          </div>
          <div className="bg-muted/50 rounded-md p-2 text-center">
            <p className="text-[11px] font-semibold text-foreground leading-none">
              {(parcel.totalArea / 43560).toFixed(1)}
            </p>
            <p className="text-[9px] text-muted-foreground mt-0.5">acres</p>
          </div>
          <div className="bg-muted/50 rounded-md p-2 text-center">
            <p className="text-[11px] font-semibold text-foreground leading-none">
              {parcel.fsiFar}
            </p>
            <p className="text-[9px] text-muted-foreground mt-0.5">FSI/FAR</p>
          </div>
        </div>

        {/* Zoning + Value */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground truncate max-w-[55%]">
            <span className="text-foreground font-medium">Zone: </span>
            {parcel.zoning}
          </p>
          <p className="text-[11px] font-bold text-foreground flex items-center gap-0.5 shrink-0">
            <IndianRupee className="w-3 h-3" />
            {(parcel.estimatedValue / 10_000_000).toFixed(0)} Cr
          </p>
        </div>

        {/* AI Suitability Score */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              AI Suitability Score
            </span>
            <span
              className="text-[11px] font-bold"
              style={{ color: sColor }}
            >
              {parcel.suitabilityScore}/100
            </span>
          </div>
          <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all"
              style={{
                width: `${parcel.suitabilityScore}%`,
                background: sColor,
              }}
            />
          </div>
        </div>

        {/* Project Type Badges */}
        <div className="flex flex-wrap gap-1">
          {parcel.projectType.map(t => (
            <Badge
              key={t}
              variant="secondary"
              className="text-[10px] px-1.5 py-0 h-4 font-normal"
            >
              {t}
            </Badge>
          ))}
        </div>

        {/* Footer: Docs count + View Details */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {parcel.documents} documents
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-[11px] gap-1 px-2 group-hover:text-primary"
          >
            <Eye className="w-3 h-3" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Acquisition Pipeline Stepper ────────────────────────────────────────────

function PipelineStepper({ parcels }: { parcels: LandParcel[] }) {
  return (
    <div className="space-y-1">
      {PIPELINE_STAGES.map((stage, idx) => {
        const stageParcels = parcels.filter(p => p.status === stage.status);
        const count = stageParcels.length;
        const isLast = idx === PIPELINE_STAGES.length - 1;
        const active = count > 0;

        return (
          <div key={stage.status} className="flex items-start gap-3">
            {/* Connector column */}
            <div className="flex flex-col items-center pt-0.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border-2 transition-colors"
                style={{
                  borderColor: active ? stage.color : "#e2e8f0",
                  background: active ? `${stage.color}1a` : "transparent",
                  color: active ? stage.color : "#cbd5e1",
                }}
              >
                {stage.status === "Acquired" && active ? "✓" : idx + 1}
              </div>
              {!isLast && (
                <div
                  className="w-px flex-1 min-h-[16px]"
                  style={{ background: active ? `${stage.color}50` : "#e2e8f0" }}
                />
              )}
            </div>

            {/* Stage info */}
            <div className={`flex-1 pb-3 ${isLast ? "" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <p
                  className="text-xs font-semibold leading-none"
                  style={{ color: active ? stage.color : "#94a3b8" }}
                >
                  {stage.label}
                </p>
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
                  style={
                    active
                      ? { background: `${stage.color}1a`, color: stage.color }
                      : { background: "#f1f5f9", color: "#94a3b8" }
                  }
                >
                  {count} parcel{count !== 1 ? "s" : ""}
                </span>
              </div>
              {stageParcels.length > 0 && (
                <div className="mt-1 space-y-0.5">
                  {stageParcels.map(p => (
                    <p key={p.id} className="text-[10px] text-muted-foreground truncate leading-4">
                      • {p.name}
                      <span className="text-muted-foreground/60"> — {p.location.city}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Value Bar Chart (Recharts) ───────────────────────────────────────────────

function ValueBarChart({ parcels }: { parcels: LandParcel[] }) {
  const data = parcels.map(p => ({
    name: p.name.replace(" Land", "").replace(" Plot", "").replace(" Parcel", "").split(" ").slice(0, 2).join(" "),
    value: Math.round(p.estimatedValue / 10_000_000),
    color: STATUS_COLOR[p.status] ?? "#94a3b8",
    full: p.name,
  }));

  return (
    <ResponsiveContainer width="100%" height={170}>
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 2, left: -14 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 9, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          interval={0}
        />
        <YAxis
          tick={{ fontSize: 9, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `₹${v}Cr`}
        />
        <Tooltip
          cursor={{ fill: "#f8fafc" }}
          formatter={(val) => [`₹${val} Cr`, "Est. Value"]}
          labelFormatter={(_: unknown, payload) =>
            payload?.[0]?.payload?.full ?? ""
          }
          contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KPI({
  label,
  value,
  sub,
  icon,
  iconBg,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBg}`}>
            {icon}
          </div>
        </div>
        <p className="text-xl font-bold text-foreground leading-none">{value}</p>
        {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandBankPage() {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const cities = useMemo(
    () => Array.from(new Set(landParcels.map(p => p.location.city))).sort(),
    []
  );

  const filtered = useMemo(
    () =>
      landParcels.filter(p => {
        const q = search.toLowerCase();
        const matchSearch =
          !search ||
          p.name.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.zoning.toLowerCase().includes(q);
        const matchCity = cityFilter === "all" || p.location.city === cityFilter;
        const matchStatus = statusFilter === "all" || p.status === statusFilter;
        return matchSearch && matchCity && matchStatus;
      }),
    [search, cityFilter, statusFilter]
  );

  const totalArea = landParcels.reduce((s, p) => s + p.totalArea, 0);
  const totalValue = landParcels.reduce((s, p) => s + p.estimatedValue, 0);
  const acquired = landParcels.filter(p => p.status === "Acquired").length;
  const inPipeline = landParcels.filter(
    p => p.status !== "Acquired" && p.status !== "Rejected"
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">Land Bank</h1>
            <Badge variant="secondary" className="text-xs">
              {landParcels.length} parcels
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track and manage your land acquisition pipeline
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search parcels, cities…"
              className="pl-8 h-8 text-xs w-52"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <Select value={cityFilter} onValueChange={(v) => v && setCityFilter(v)}>
            <SelectTrigger className="h-8 text-xs w-36">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(v) => v && setStatusFilter(v)}>
            <SelectTrigger className="h-8 text-xs w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {PIPELINE_STAGES.map(s => (
                <SelectItem key={s.status} value={s.status}>{s.label}</SelectItem>
              ))}
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Map className="w-3.5 h-3.5" />
            Map View
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />
            Add Parcel
          </Button>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KPI
          label="Total Land"
          value={landParcels.length}
          sub="parcels in portfolio"
          icon={<Map className="w-3.5 h-3.5 text-blue-600" />}
          iconBg="bg-blue-500/10"
        />
        <KPI
          label="Total Area"
          value={`${(totalArea / 1_000).toFixed(0)}K sqft`}
          sub={`${(totalArea / 43_560).toFixed(0)} acres total`}
          icon={<Maximize2 className="w-3.5 h-3.5 text-green-600" />}
          iconBg="bg-green-500/10"
        />
        <KPI
          label="Total Value"
          value={`₹${(totalValue / 10_000_000).toFixed(0)} Cr`}
          sub="estimated portfolio value"
          icon={<TrendingUp className="w-3.5 h-3.5 text-purple-600" />}
          iconBg="bg-purple-500/10"
        />
        <KPI
          label="Acquired"
          value={acquired}
          sub="parcels owned outright"
          icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          iconBg="bg-emerald-500/10"
        />
        <KPI
          label="In Pipeline"
          value={inPipeline}
          sub="active negotiations"
          icon={<Layers className="w-3.5 h-3.5 text-amber-600" />}
          iconBg="bg-amber-500/10"
        />
      </div>

      {/* ── Two-column body ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* Left 60% — Parcel Cards */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-muted-foreground" />
              Land Parcels
              {filtered.length !== landParcels.length && (
                <span className="font-normal text-muted-foreground text-xs">
                  ({filtered.length} of {landParcels.length})
                </span>
              )}
            </h2>
            {(search || cityFilter !== "all" || statusFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-muted-foreground"
                onClick={() => {
                  setSearch("");
                  setCityFilter("all");
                  setStatusFilter("all");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          {filtered.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center">
                <Map className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium text-muted-foreground">No parcels match your filters</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Try adjusting the city or status filter</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filtered.map(parcel => (
                <ParcelCard key={parcel.id} parcel={parcel} />
              ))}
            </div>
          )}
        </div>

        {/* Right 40% — Pipeline + Chart + Suitability */}
        <div className="lg:col-span-2 space-y-4 sticky top-6">

          {/* Acquisition Pipeline Stepper */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                Acquisition Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Compact horizontal stage summary bar */}
              <div className="flex items-center gap-0.5 mb-4 overflow-x-auto pb-1">
                {PIPELINE_STAGES.map((stage, i) => {
                  const cnt = landParcels.filter(p => p.status === stage.status).length;
                  const isLast = i === PIPELINE_STAGES.length - 1;
                  return (
                    <div key={stage.status} className="flex items-center gap-0.5 shrink-0">
                      <div
                        className="flex flex-col items-center px-2 py-1.5 rounded-md min-w-[64px] text-center"
                        style={{
                          background: cnt > 0 ? `${stage.color}12` : "#f8fafc",
                          border: `1px solid ${cnt > 0 ? `${stage.color}30` : "#e2e8f0"}`,
                        }}
                      >
                        <span
                          className="text-sm font-bold leading-none"
                          style={{ color: cnt > 0 ? stage.color : "#cbd5e1" }}
                        >
                          {cnt}
                        </span>
                        <span className="text-[8px] text-muted-foreground mt-0.5 leading-tight">
                          {stage.label}
                        </span>
                      </div>
                      {!isLast && (
                        <ArrowRight className="w-3 h-3 text-muted-foreground/40 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Vertical detailed stepper */}
              <PipelineStepper parcels={landParcels} />
            </CardContent>
          </Card>

          {/* Estimated Value Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-muted-foreground" />
                Estimated Value by Parcel
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ValueBarChart parcels={landParcels} />
              {/* Legend */}
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {PIPELINE_STAGES.filter(s =>
                  landParcels.some(p => p.status === s.status)
                ).map(s => (
                  <div key={s.status} className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-sm shrink-0"
                      style={{ background: s.color }}
                    />
                    <span className="text-[9px] text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Suitability Ranking */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                AI Suitability Ranking
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2.5">
              {[...landParcels]
                .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
                .map((p, rank) => {
                  const sc = getSuitabilityColor(p.suitabilityScore);
                  return (
                    <div key={p.id} className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground w-4 shrink-0 text-center font-semibold">
                        #{rank + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate leading-none">
                          {p.name}
                        </p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">
                          {p.location.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${p.suitabilityScore}%`, background: sc }}
                          />
                        </div>
                        <span
                          className="text-[11px] font-bold w-7 text-right"
                          style={{ color: sc }}
                        >
                          {p.suitabilityScore}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          {/* Portfolio Summary */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                Portfolio Summary
              </p>
              <div className="space-y-2">
                {PIPELINE_STAGES.map(stage => {
                  const cnt = landParcels.filter(p => p.status === stage.status).length;
                  if (cnt === 0) return null;
                  const val = landParcels
                    .filter(p => p.status === stage.status)
                    .reduce((s, p) => s + p.estimatedValue, 0);
                  return (
                    <div key={stage.status} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: stage.color }}
                        />
                        <span className="text-[11px] text-muted-foreground">{stage.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-muted-foreground">
                          {cnt} parcel{cnt !== 1 ? "s" : ""}
                        </span>
                        <span
                          className="text-[11px] font-semibold"
                          style={{ color: stage.color }}
                        >
                          ₹{(val / 10_000_000).toFixed(0)} Cr
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">Total</span>
                  <span className="text-xs font-bold text-foreground">
                    ₹{(totalValue / 10_000_000).toFixed(0)} Cr
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
