"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Calculator,
  IndianRupee,
  TrendingUp,
  Building2,
  Info,
  Download,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type UnitType = "1 BHK" | "2 BHK" | "3 BHK" | "4 BHK" | "Penthouse";

interface FloorConfig {
  floor: number;
  label: string;
  riseCharge: number; // ₹ per sqft added over base
}

interface PriceCell {
  base: number; // ₹ per sqft
  premium?: number; // override premium %
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const UNIT_TYPES: UnitType[] = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Penthouse"];

const UNIT_SIZES: Record<UnitType, number> = {
  "1 BHK": 650,
  "2 BHK": 1050,
  "3 BHK": 1550,
  "4 BHK": 2100,
  Penthouse: 3800,
};

const FLOOR_GROUPS: FloorConfig[] = [
  { floor: 1, label: "1–3 (Lower Podium)", riseCharge: 0 },
  { floor: 4, label: "4–7 (Mid-Low)", riseCharge: 25 },
  { floor: 8, label: "8–12 (Mid)", riseCharge: 50 },
  { floor: 13, label: "13–17 (Mid-High)", riseCharge: 80 },
  { floor: 18, label: "18–22 (High)", riseCharge: 120 },
  { floor: 23, label: "23–27 (Premium High)", riseCharge: 165 },
  { floor: 28, label: "28–32 (Sky)", riseCharge: 220 },
  { floor: 33, label: "33+ (Top)", riseCharge: 300 },
];

// Base price matrix: [floorGroupIndex][unitTypeIndex]
const BASE_MATRIX: number[][] = [
  [7800, 8200, 8600, 9200, 11000],
  [7825, 8225, 8625, 9225, 11025],
  [7850, 8250, 8650, 9250, 11050],
  [7880, 8280, 8680, 9280, 11080],
  [7920, 8320, 8720, 9320, 11120],
  [7970, 8370, 8770, 9370, 11170],
  [8030, 8430, 8830, 9430, 11230],
  [8100, 8500, 8900, 9500, 11300],
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

const formatCr = (n: number) => {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(2)} L`;
  return `₹${formatINR(n)}`;
};

function heatColor(value: number, min: number, max: number) {
  const ratio = (value - min) / (max - min);
  if (ratio < 0.33) return { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-300" };
  if (ratio < 0.66) return { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-300" };
  return { bg: "bg-rose-50 dark:bg-rose-950/30", text: "text-rose-700 dark:text-rose-300" };
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PricingPage() {
  // Global controls
  const [globalPremium, setGlobalPremium] = useState(0); // % premium applied to all cells
  const [globalDiscount, setGlobalDiscount] = useState(0); // % discount applied to all cells

  // Floor-rise editable charges
  const [floorRises, setFloorRises] = useState<number[]>(
    FLOOR_GROUPS.map((f) => f.riseCharge)
  );

  // Calculator state
  const [calcFloorIdx, setCalcFloorIdx] = useState(2);
  const [calcUnitIdx, setCalcUnitIdx] = useState(1);
  const [calcArea, setCalcArea] = useState(UNIT_SIZES[UNIT_TYPES[1]]);
  const [calcParkingSlots, setCalcParkingSlots] = useState(1);
  const [calcClubhouse, setCalcClubhouse] = useState(true);

  // Computed effective price matrix
  const effectiveMatrix = useMemo(() => {
    return BASE_MATRIX.map((row, fi) =>
      row.map((base, ui) => {
        const withRise = base + floorRises[fi];
        const multiplier = 1 + (globalPremium - globalDiscount) / 100;
        return Math.round(withRise * multiplier);
      })
    );
  }, [floorRises, globalPremium, globalDiscount]);

  const allValues = effectiveMatrix.flat();
  const matrixMin = Math.min(...allValues);
  const matrixMax = Math.max(...allValues);

  // Calculator derived values
  const calcBaseRate = effectiveMatrix[calcFloorIdx][calcUnitIdx];
  const calcBaseValue = calcBaseRate * calcArea;
  const calcParking = calcParkingSlots * 500_000;
  const calcClubhouseCharge = calcClubhouse ? 200_000 : 0;
  const calcTotal = calcBaseValue + calcParking + calcClubhouseCharge;
  const calcGst = Math.round(calcTotal * 0.05);
  const calcGrand = calcTotal + calcGst;

  // Reset
  const handleReset = () => {
    setGlobalPremium(0);
    setGlobalDiscount(0);
    setFloorRises(FLOOR_GROUPS.map((f) => f.riseCharge));
  };

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">

        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Pricing Engine</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configure price matrix, floor-rise charges, and premiums · Prestige Heights
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs" onClick={handleReset}>
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </Button>
            <Button size="sm" className="gap-1.5 h-8 text-xs">
              <Download className="w-3.5 h-3.5" />
              Export Price List
            </Button>
          </div>
        </div>

        {/* ── Global Controls ───────────────────────────────────────────────── */}
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <CardTitle className="text-sm font-semibold">Global Price Adjustments</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Apply premium or discount uniformly across the entire price matrix
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Premium */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-foreground">
                    Global Premium
                  </Label>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    +{globalPremium}%
                  </span>
                </div>
                <Slider
                  min={0}
                  max={20}
                  step={0.5}
                  value={[globalPremium]}
                  onValueChange={(v) => setGlobalPremium(Array.isArray(v) ? v[0] : v)}
                  className="[&_[role=slider]]:border-emerald-500 [&_[role=slider]]:ring-emerald-200"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>0%</span>
                  <span>+20%</span>
                </div>
              </div>

              {/* Discount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-foreground">
                    Global Discount
                  </Label>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                    -{globalDiscount}%
                  </span>
                </div>
                <Slider
                  min={0}
                  max={15}
                  step={0.5}
                  value={[globalDiscount]}
                  onValueChange={(v) => setGlobalDiscount(Array.isArray(v) ? v[0] : v)}
                  className="[&_[role=slider]]:border-rose-500 [&_[role=slider]]:ring-rose-200"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>0%</span>
                  <span>-15%</span>
                </div>
              </div>
            </div>

            {(globalPremium > 0 || globalDiscount > 0) && (
              <div className="mt-4 flex items-center gap-2 text-xs bg-muted/40 border border-border rounded-lg px-3 py-2">
                <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">
                  Net adjustment:{" "}
                  <span
                    className={`font-semibold ${
                      globalPremium - globalDiscount >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {globalPremium - globalDiscount >= 0 ? "+" : ""}
                    {(globalPremium - globalDiscount).toFixed(1)}%
                  </span>{" "}
                  across all units
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Main Grid: Matrix + Calc ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">

          {/* Left: Price Matrix + Floor Rise */}
          <div className="space-y-6 min-w-0">

            {/* Price Matrix */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold">Price Matrix</CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      Effective rate per sq ft by floor group and unit type (₹/sqft)
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2 rounded bg-emerald-200 dark:bg-emerald-900" />
                      Lower
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2 rounded bg-amber-200 dark:bg-amber-900" />
                      Mid
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2 rounded bg-rose-200 dark:bg-rose-900" />
                      Higher
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 pb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-4 py-2.5 text-muted-foreground font-medium whitespace-nowrap">
                          Floor Group
                        </th>
                        {UNIT_TYPES.map((ut) => (
                          <th
                            key={ut}
                            className="text-center px-3 py-2.5 text-muted-foreground font-medium whitespace-nowrap"
                          >
                            {ut}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {FLOOR_GROUPS.map((fg, fi) => (
                        <tr
                          key={fg.floor}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-4 py-2.5">
                            <div>
                              <p className="font-medium text-foreground">{fg.label}</p>
                              <p className="text-[10px] text-muted-foreground">
                                +₹{floorRises[fi]}/sqft rise
                              </p>
                            </div>
                          </td>
                          {UNIT_TYPES.map((_, ui) => {
                            const val = effectiveMatrix[fi][ui];
                            const { bg, text } = heatColor(val, matrixMin, matrixMax);
                            return (
                              <td key={ui} className="px-3 py-2.5 text-center">
                                <span
                                  className={`inline-block px-2 py-1 rounded-md font-semibold tabular-nums ${bg} ${text}`}
                                >
                                  {formatINR(val)}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Floor Rise Config */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-sm font-semibold">Floor Rise Charges</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Additional ₹/sqft charged per floor group on top of base rate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {FLOOR_GROUPS.map((fg, fi) => (
                    <div key={fg.floor} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-[11px] text-muted-foreground font-medium leading-tight">
                          {fg.label}
                        </Label>
                        <span className="text-[11px] font-bold text-foreground tabular-nums">
                          ₹{floorRises[fi]}
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={500}
                        step={5}
                        value={[floorRises[fi]]}
                        onValueChange={(v) => {
                          const val = Array.isArray(v) ? v[0] : v;
                          setFloorRises((prev) => {
                            const next = [...prev];
                            next[fi] = val;
                            return next;
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Price Calculator */}
          <div className="xl:sticky xl:top-6 xl:self-start space-y-4">
            <Card className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-primary" />
                  <CardTitle className="text-sm font-semibold">Price Calculator</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Estimate total unit cost including all charges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Unit Type */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Unit Type</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {UNIT_TYPES.map((ut, i) => (
                      <button
                        key={ut}
                        onClick={() => {
                          setCalcUnitIdx(i);
                          setCalcArea(UNIT_SIZES[ut]);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                          calcUnitIdx === i
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {ut}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floor Group */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Floor Group</Label>
                  <div className="grid grid-cols-2 gap-1">
                    {FLOOR_GROUPS.map((fg, fi) => (
                      <button
                        key={fg.floor}
                        onClick={() => setCalcFloorIdx(fi)}
                        className={`text-[11px] px-2 py-1.5 rounded-md border text-left transition-colors ${
                          calcFloorIdx === fi
                            ? "bg-primary/10 border-primary/50 text-primary font-medium"
                            : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        }`}
                      >
                        {fg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Carpet Area */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Carpet Area (sqft)</Label>
                  <Input
                    type="number"
                    value={calcArea}
                    onChange={(e) => setCalcArea(Number(e.target.value))}
                    className="h-8 text-xs"
                  />
                </div>

                {/* Add-ons */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Add-ons</Label>
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={calcParkingSlots > 0}
                          onChange={(e) => setCalcParkingSlots(e.target.checked ? 1 : 0)}
                          className="w-3.5 h-3.5 rounded border-border"
                        />
                        <span className="text-xs text-muted-foreground">
                          Parking ({calcParkingSlots} slot)
                        </span>
                      </div>
                      <span className="text-xs font-medium text-foreground">₹5.0 L</span>
                    </label>
                    {calcParkingSlots > 0 && (
                      <div className="pl-5">
                        <Slider
                          min={1}
                          max={3}
                          step={1}
                          value={[calcParkingSlots]}
                          onValueChange={(v) => setCalcParkingSlots(Array.isArray(v) ? v[0] : v)}
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                          <span>1</span><span>2</span><span>3 slots</span>
                        </div>
                      </div>
                    )}
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={calcClubhouse}
                          onChange={(e) => setCalcClubhouse(e.target.checked)}
                          className="w-3.5 h-3.5 rounded border-border"
                        />
                        <span className="text-xs text-muted-foreground">Clubhouse membership</span>
                      </div>
                      <span className="text-xs font-medium text-foreground">₹2.0 L</span>
                    </label>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Base ({formatINR(calcArea)} sqft × ₹{formatINR(calcBaseRate)})
                    </span>
                    <span className="font-medium text-foreground">{formatCr(calcBaseValue)}</span>
                  </div>
                  {calcParkingSlots > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Parking ({calcParkingSlots} slot{calcParkingSlots > 1 ? "s" : ""})
                      </span>
                      <span className="font-medium text-foreground">{formatCr(calcParking)}</span>
                    </div>
                  )}
                  {calcClubhouse && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Clubhouse</span>
                      <span className="font-medium text-foreground">{formatCr(calcClubhouseCharge)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span className="font-medium text-foreground">{formatCr(calcGst)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">Total (incl. GST)</span>
                    <div className="flex items-center gap-1 text-primary">
                      <IndianRupee className="w-4 h-4" />
                      <span className="text-lg font-bold tabular-nums">
                        {formatCr(calcGrand).replace("₹", "")}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Effective rate: ₹{formatINR(Math.round(calcGrand / calcArea))}/sqft all-in
                  </p>
                </div>

                <Button className="w-full h-8 text-xs gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Generate Quote PDF
                </Button>
              </CardContent>
            </Card>

            {/* Quick stats */}
            <Card className="border-border">
              <CardContent className="p-3.5 space-y-2.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Matrix Summary
                </p>
                {[
                  { label: "Lowest rate", value: `₹${formatINR(matrixMin)}/sqft`, color: "text-emerald-600" },
                  { label: "Highest rate", value: `₹${formatINR(matrixMax)}/sqft`, color: "text-rose-600" },
                  {
                    label: "Avg effective rate",
                    value: `₹${formatINR(Math.round(allValues.reduce((a, b) => a + b, 0) / allValues.length))}/sqft`,
                    color: "text-foreground",
                  },
                  {
                    label: "Net adj.",
                    value: `${(globalPremium - globalDiscount) >= 0 ? "+" : ""}${(globalPremium - globalDiscount).toFixed(1)}%`,
                    color: globalPremium - globalDiscount >= 0 ? "text-emerald-600" : "text-rose-600",
                  },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className={`font-semibold tabular-nums ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
