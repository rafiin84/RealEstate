"use client";

import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  ArrowUpRight,
  Download,
  SlidersHorizontal,
  Building2,
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck2,
  Ban,
} from "lucide-react";
import { units, projects } from "@/lib/mock-data";
import type { Unit, InventoryStatus } from "@/types";

// ─── Status config ────────────────────────────────────────────────────────────

type StatusCfg = {
  label: string;
  color: string;
  bg: string;
  ring: string;
  icon: React.ElementType;
};

const STATUS_CONFIG: Record<InventoryStatus, StatusCfg> = {
  Available:  { label: "Available",  color: "#16a34a", bg: "#f0fdf4", ring: "#bbf7d0", icon: CheckCircle2 },
  Blocked:    { label: "Blocked",    color: "#d97706", bg: "#fffbeb", ring: "#fde68a", icon: Clock },
  Booked:     { label: "Booked",     color: "#2563eb", bg: "#eff6ff", ring: "#bfdbfe", icon: Building2 },
  Agreement:  { label: "Agreement",  color: "#7c3aed", bg: "#f5f3ff", ring: "#ddd6fe", icon: FileCheck2 },
  Registered: { label: "Registered", color: "#0891b2", bg: "#ecfeff", ring: "#a5f3fc", icon: CheckCircle2 },
  Cancelled:  { label: "Cancelled",  color: "#dc2626", bg: "#fef2f2", ring: "#fecaca", icon: XCircle },
  Sold:       { label: "Sold",       color: "#0891b2", bg: "#ecfeff", ring: "#a5f3fc", icon: CheckCircle2 },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const UNIT_TYPES = [
  "1 BHK", "2 BHK", "3 BHK", "4 BHK", "Penthouse",
  "Villa", "Studio", "Office", "Retail", "Showroom", "Warehouse", "Plot",
];

// Fixed portfolio KPIs per spec
const KPI_STATS: { status: InventoryStatus; count: number }[] = [
  { status: "Available",  count: 128 },
  { status: "Blocked",    count: 40  },
  { status: "Booked",     count: 312 },
  { status: "Agreement",  count: 75  },
  { status: "Registered", count: 75  },
  { status: "Cancelled",  count: 5   },
];

const TOTAL_UNITS = KPI_STATS.reduce((s, k) => s + k.count, 0);

// ─── Floor-plan grid  (Tower A, 10 floors × 8 wings) ─────────────────────────

const FLOOR_STATUSES: InventoryStatus[] = [
  "Available", "Booked", "Agreement", "Blocked",
  "Available", "Booked", "Available", "Registered",
];

const FLOOR_PLAN = Array.from({ length: 10 }, (_, fi) => {
  const floor = 10 - fi;
  return {
    floor,
    units: ["A", "B", "C", "D", "E", "F", "G", "H"].map((wing, wi) => ({
      label: `${wing}${floor < 10 ? "0" : ""}${floor}`,
      status: FLOOR_STATUSES[(floor * 3 + wi) % FLOOR_STATUSES.length],
    })),
  };
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  if (price >= 10_000_000) return `₹${(price / 10_000_000).toFixed(2)} Cr`;
  if (price >= 100_000)    return `₹${(price / 100_000).toFixed(2)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

function StatusPill({ status }: { status: InventoryStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Available;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold border whitespace-nowrap"
      style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.ring }}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InventoryPage() {
  const [search, setSearch]               = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter]   = useState("all");
  const [typeFilter, setTypeFilter]       = useState("all");
  const [activeKpi, setActiveKpi]         = useState<InventoryStatus | "all">("all");

  // KPI chip overrides status dropdown
  const effectiveStatus: InventoryStatus | null =
    activeKpi !== "all" ? activeKpi :
    statusFilter !== "all" ? (statusFilter as InventoryStatus) : null;

  const filtered = units.filter((u: Unit) => {
    const q = search.toLowerCase();
    const projectName = projects.find(p => p.id === u.projectId)?.name ?? "";
    const matchSearch   = u.unitNumber.toLowerCase().includes(q) ||
                          u.type.toLowerCase().includes(q) ||
                          projectName.toLowerCase().includes(q);
    const matchProject  = projectFilter === "all" || u.projectId === projectFilter;
    const matchStatus   = !effectiveStatus || u.status === effectiveStatus;
    const matchType     = typeFilter === "all" || u.type === typeFilter;
    return matchSearch && matchProject && matchStatus && matchType;
  });

  function clearAll() {
    setActiveKpi("all");
    setStatusFilter("all");
    setTypeFilter("all");
    setProjectFilter("all");
    setSearch("");
  }

  function toggleKpi(s: InventoryStatus) {
    setActiveKpi(prev => (prev === s ? "all" : s));
    setStatusFilter("all");
  }

  const hasActiveFilter =
    activeKpi !== "all" || statusFilter !== "all" ||
    typeFilter !== "all" || projectFilter !== "all" || search !== "";

  return (
    <div className="p-4 md:p-6 space-y-5">

      {/* ── Page header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Inventory</h1>
            <p className="text-xs text-muted-foreground">{TOTAL_UNITS} units across all projects</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search unit, type, project…"
              className="pl-8 h-8 w-52 text-xs"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Project */}
          <Select value={projectFilter} onValueChange={(v) => v && setProjectFilter(v)}>
            <SelectTrigger className="h-8 w-40 text-xs">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={statusFilter}
            onValueChange={v => { if (v) { setStatusFilter(v); setActiveKpi("all"); } }}
          >
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {(["Available", "Blocked", "Booked", "Agreement", "Registered", "Cancelled"] as InventoryStatus[]).map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Unit type */}
          <Select value={typeFilter} onValueChange={(v) => v && setTypeFilter(v)}>
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {UNIT_TYPES.map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />
            Add Unit
          </Button>
        </div>
      </div>

      {/* ── KPI row ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {KPI_STATS.map(({ status, count }) => {
          const cfg    = STATUS_CONFIG[status];
          const Icon   = cfg.icon;
          const active = activeKpi === status;
          return (
            <button
              key={status}
              onClick={() => toggleKpi(status)}
              className={`rounded-xl border p-3 text-left transition-all hover:shadow-sm focus:outline-none ${
                active ? "ring-2 shadow-sm" : ""
              }`}
              style={{
                background:   cfg.bg,
                borderColor:  active ? cfg.color : cfg.ring,
                // @ts-ignore
                "--tw-ring-color": cfg.color,
              }}
            >
              <div className="flex items-start justify-between gap-1">
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground leading-tight">{cfg.label}</p>
                  <p className="text-2xl font-bold mt-1 leading-none" style={{ color: cfg.color }}>{count}</p>
                  <p className="text-[9px] text-muted-foreground mt-1">
                    {((count / TOTAL_UNITS) * 100).toFixed(0)}% of total
                  </p>
                </div>
                <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: cfg.color }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Quick status chip filters ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground font-medium">Quick filter:</span>

        {(["Available", "Blocked", "Booked", "Agreement", "Registered", "Cancelled"] as InventoryStatus[]).map(s => {
          const cfg    = STATUS_CONFIG[s];
          const active = activeKpi === s;
          return (
            <button
              key={s}
              onClick={() => toggleKpi(s)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-all ${
                active ? "ring-2 shadow-sm" : "hover:opacity-80"
              }`}
              style={{
                color:       cfg.color,
                background:  active ? cfg.bg : "transparent",
                borderColor: cfg.ring,
                // @ts-ignore
                "--tw-ring-color": cfg.color,
              }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: cfg.color }} />
              {cfg.label}
            </button>
          );
        })}

        {hasActiveFilter && (
          <button
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1"
            onClick={clearAll}
          >
            Clear all
          </button>
        )}

        <span className="ml-auto text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{filtered.length}</span>
          {" "}of {units.length} loaded
        </span>
      </div>

      {/* ── Main content tabs ─────────────────────────────────────────────────── */}
      <Tabs defaultValue="table">
        <TabsList className="h-8">
          <TabsTrigger value="table" className="text-xs h-7 px-3">Table View</TabsTrigger>
          <TabsTrigger value="heatmap" className="text-xs h-7 px-3">Availability Heatmap</TabsTrigger>
        </TabsList>

        {/* ── Table tab ──────────────────────────────────────────────────────── */}
        <TabsContent value="table" className="mt-3">
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="text-[11px] font-semibold text-muted-foreground py-2.5 pl-4 w-[100px]">
                    Unit No.
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground py-2.5">
                    Project
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground py-2.5 text-center w-16">
                    Floor
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground py-2.5 w-24">
                    Type
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground py-2.5 text-right">
                    Area (sqft)
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground py-2.5 text-right">
                    Total Price
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground py-2.5 w-28">
                    Status
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground py-2.5">
                    Facing
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground py-2.5 text-center w-20">
                    Parking
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-muted-foreground py-2.5 text-right pr-4 w-28">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="py-14 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <SlidersHorizontal className="w-8 h-8 text-muted-foreground/40" />
                        <p className="text-sm text-muted-foreground">No units match your filters</p>
                        <Button variant="ghost" size="sm" className="text-xs h-7" onClick={clearAll}>
                          Clear filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((unit: Unit) => {
                    const project = projects.find(p => p.id === unit.projectId);
                    const status  = unit.status as InventoryStatus;
                    const cfg     = STATUS_CONFIG[status] ?? STATUS_CONFIG.Available;
                    return (
                      <TableRow
                        key={unit.id}
                        className="group hover:bg-muted/30 transition-colors border-b border-border/40"
                      >
                        <TableCell className="py-2.5 pl-4">
                          <span className="font-mono text-xs font-semibold text-foreground tracking-wide">
                            {unit.unitNumber}
                          </span>
                        </TableCell>

                        <TableCell className="py-2.5">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3 h-3 text-muted-foreground shrink-0" />
                            <span className="text-xs text-foreground/80 whitespace-nowrap">
                              {project?.name ?? "—"}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="py-2.5 text-center">
                          <span className="text-xs text-muted-foreground">
                            {unit.floor === 0 ? "G" : unit.floor}
                          </span>
                        </TableCell>

                        <TableCell className="py-2.5">
                          <Badge variant="secondary" className="text-[10px] font-medium px-1.5 py-0 h-4">
                            {unit.type}
                          </Badge>
                        </TableCell>

                        <TableCell className="py-2.5 text-right">
                          <span className="text-xs text-foreground/80">
                            {unit.superBuiltUpArea.toLocaleString("en-IN")}
                          </span>
                        </TableCell>

                        <TableCell className="py-2.5 text-right">
                          <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                            {formatPrice(unit.totalPrice)}
                          </span>
                        </TableCell>

                        <TableCell className="py-2.5">
                          <StatusPill status={status} />
                        </TableCell>

                        <TableCell className="py-2.5">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{unit.facing}</span>
                        </TableCell>

                        <TableCell className="py-2.5 text-center">
                          <span className="text-xs text-muted-foreground">{unit.parking}</span>
                        </TableCell>

                        <TableCell className="py-2.5 pr-4">
                          <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 gap-1">
                              View <ArrowUpRight className="w-3 h-3" />
                            </Button>
                            {unit.status === "Available" && (
                              <Button
                                size="sm"
                                className="h-6 text-[10px] px-2 text-white"
                                style={{ background: cfg.color }}
                              >
                                Block
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>

            {/* Table footer */}
            {filtered.length > 0 && (
              <div className="px-4 py-2.5 border-t border-border/40 flex items-center justify-between bg-muted/20">
                <p className="text-xs text-muted-foreground">
                  {filtered.length} {filtered.length === 1 ? "unit" : "units"} shown
                </p>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" className="h-6 text-[10px] px-2.5" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="h-6 text-[10px] px-2.5" disabled>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* ── Heatmap tab ────────────────────────────────────────────────────── */}
        <TabsContent value="heatmap" className="mt-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Floor plan grid — spans 2 cols on large screens */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3 border-b border-border/40">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <CardTitle className="text-sm font-semibold">Tower A — Availability Heatmap</CardTitle>
                    <Badge variant="secondary" className="text-[10px]">Prestige Heights</Badge>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  {(["Available", "Blocked", "Booked", "Agreement", "Registered", "Cancelled"] as InventoryStatus[]).map(s => {
                    const cfg = STATUS_CONFIG[s];
                    return (
                      <span key={s} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span
                          className="w-3 h-3 rounded-sm border inline-block"
                          style={{ background: cfg.bg, borderColor: cfg.ring }}
                        />
                        {cfg.label}
                      </span>
                    );
                  })}
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                {/* Wing column headers */}
                <div className="flex items-center gap-1 mb-1 ml-14">
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map(w => (
                    <div key={w} className="flex-1 text-center text-[10px] font-semibold text-muted-foreground">
                      {w}
                    </div>
                  ))}
                </div>

                {/* Floor rows */}
                <div className="space-y-1">
                  {FLOOR_PLAN.map(({ floor, units: floorUnits }) => (
                    <div key={floor} className="flex items-center gap-1">
                      {/* Floor label */}
                      <div className="w-12 shrink-0 text-[10px] font-medium text-muted-foreground text-right pr-2">
                        {floor < 10 ? `0${floor}` : floor}F
                      </div>

                      {/* Unit cells */}
                      {floorUnits.map(cell => {
                        const cfg = STATUS_CONFIG[cell.status];
                        return (
                          <button
                            key={cell.label}
                            className="flex-1 h-9 rounded border text-[9px] font-semibold transition-all hover:scale-105 hover:shadow-md hover:z-10 relative"
                            style={{
                              background:  cfg.bg,
                              borderColor: cfg.ring,
                              color:       cfg.color,
                            }}
                            title={`Unit ${cell.label} — ${cell.status}`}
                          >
                            {cell.label}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-muted-foreground text-center mt-4">
                  Click any unit cell to view details and take action
                </p>
              </CardContent>
            </Card>

            {/* Side panel */}
            <div className="space-y-3">
              {/* Tower A breakdown */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Tower A Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  {(["Available", "Blocked", "Booked", "Agreement", "Registered", "Cancelled"] as InventoryStatus[]).map(s => {
                    const cfg       = STATUS_CONFIG[s];
                    const cellCount = FLOOR_PLAN.flatMap(f => f.units).filter(u => u.status === s).length;
                    const total     = FLOOR_PLAN.flatMap(f => f.units).length;
                    const pct       = Math.round((cellCount / total) * 100);
                    return (
                      <div key={s} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: cfg.color }} />
                        <span className="text-xs text-foreground/80 flex-1">{cfg.label}</span>
                        <span className="text-xs font-semibold w-5 text-right" style={{ color: cfg.color }}>
                          {cellCount}
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${pct}%`, background: cfg.color }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground w-7 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Portfolio KPIs */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Portfolio KPIs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Total Units</span>
                    <span className="text-xs font-bold text-foreground">{TOTAL_UNITS}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Absorption Rate</span>
                    <span className="text-xs font-bold text-emerald-600">
                      {(((TOTAL_UNITS - 128) / TOTAL_UNITS) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Avg. Price / sqft</span>
                    <span className="text-xs font-bold text-foreground">₹9,200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Revenue Potential</span>
                    <span className="text-xs font-bold text-primary">₹184 Cr</span>
                  </div>

                  {/* Status stacked bar */}
                  <div className="pt-1">
                    <p className="text-[10px] text-muted-foreground mb-1.5">Portfolio status split</p>
                    <div className="flex h-2.5 rounded-full overflow-hidden gap-px">
                      {KPI_STATS.map(({ status, count }) => {
                        const cfg = STATUS_CONFIG[status];
                        const pct = (count / TOTAL_UNITS) * 100;
                        return (
                          <div
                            key={status}
                            className="h-full transition-all"
                            style={{ width: `${pct}%`, background: cfg.color }}
                            title={`${cfg.label}: ${count} (${pct.toFixed(0)}%)`}
                          />
                        );
                      })}
                    </div>
                    <div className="flex mt-1">
                      {KPI_STATS.map(({ status, count }) => {
                        const pct = (count / TOTAL_UNITS) * 100;
                        return (
                          <div
                            key={status}
                            className="overflow-hidden"
                            style={{ width: `${pct}%` }}
                          >
                            {pct >= 12 && (
                              <p
                                className="text-[8px] font-semibold text-center truncate"
                                style={{ color: STATUS_CONFIG[status].color }}
                              >
                                {pct.toFixed(0)}%
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action nudge */}
              <Card className="border-amber-200 bg-amber-50/60 dark:bg-amber-950/20 dark:border-amber-900">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-2">
                    <div className="p-1.5 rounded-md bg-amber-100 dark:bg-amber-900/40 shrink-0 mt-0.5">
                      <Ban className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Blocked Expiring Soon</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        12 units have blocking expiry within 48 hours. Convert or release to free up inventory.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 text-[10px] mt-2 px-2 border-amber-300 hover:bg-amber-100"
                      >
                        Review Blocks
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
