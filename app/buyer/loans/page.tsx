"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Calculator,
  Building2,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Star,
  TrendingUp,
  Shield,
  IndianRupee,
  Percent,
  Calendar,
  User,
  CreditCard,
  BadgeCheck,
  CircleDot,
} from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

function formatINRMonthly(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

function calcEMI(principal: number, ratePercent: number, tenureYears: number) {
  const r = ratePercent / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return { emi: principal / n, totalInterest: 0, totalAmount: principal };
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = totalAmount - principal;
  return { emi, totalInterest, totalAmount };
}

// ─── Pie Chart (SVG, no external lib) ────────────────────────────────────────

function PieChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  const principalPct = (principal / total) * 100;
  const interestPct = (interest / total) * 100;

  const cx = 60;
  const cy = 60;
  const r = 50;

  const principalAngle = (principalPct / 100) * 360;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const x1 = cx + r * Math.sin(toRad(0));
  const y1 = cy - r * Math.cos(toRad(0));
  const x2 = cx + r * Math.sin(toRad(principalAngle));
  const y2 = cy - r * Math.cos(toRad(principalAngle));

  const largeArc = principalAngle > 180 ? 1 : 0;

  const principalPath = [
    `M ${cx} ${cy}`,
    `L ${x1} ${y1}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
    "Z",
  ].join(" ");

  const interestLargeArc = principalAngle <= 180 ? 1 : 0;
  const interestPath = [
    `M ${cx} ${cy}`,
    `L ${x2} ${y2}`,
    `A ${r} ${r} 0 ${interestLargeArc} 1 ${x1} ${y1}`,
    "Z",
  ].join(" ");

  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <path d={principalPath} fill="#2563eb" />
        <path d={interestPath} fill="#f59e0b" />
        <circle cx={cx} cy={cy} r={30} fill="white" />
      </svg>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
          <span className="text-muted-foreground">Principal</span>
          <span className="font-semibold ml-1">{principalPct.toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
          <span className="text-muted-foreground">Interest</span>
          <span className="font-semibold ml-1">{interestPct.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Bank Comparison Data ─────────────────────────────────────────────────────

const banks = [
  {
    name: "HDFC Bank",
    rate: 8.7,
    processingFee: "0.5%",
    maxTenure: "30 yr",
    rating: 4.5,
    tag: "Popular",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    name: "SBI",
    rate: 8.5,
    processingFee: "Nil",
    maxTenure: "30 yr",
    rating: 4.2,
    tag: "Lowest Rate",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    name: "ICICI Bank",
    rate: 8.8,
    processingFee: "0.25%",
    maxTenure: "25 yr",
    rating: 4.3,
    tag: null,
    tagColor: "",
  },
  {
    name: "Kotak",
    rate: 8.95,
    processingFee: "₹10,000",
    maxTenure: "25 yr",
    rating: 4.1,
    tag: null,
    tagColor: "",
  },
  {
    name: "Axis Bank",
    rate: 8.85,
    processingFee: "1%",
    maxTenure: "30 yr",
    rating: 4.0,
    tag: null,
    tagColor: "",
  },
];

// ─── Application Timeline ─────────────────────────────────────────────────────

const applicationSteps = [
  {
    step: "Application Submitted",
    date: "12 Jul 2026",
    status: "done",
    note: "HDFC Bank — ₹96L pre-approval request",
  },
  {
    step: "Document Verification",
    date: "14 Jul 2026",
    status: "done",
    note: "KYC, income proof, and ITR verified",
  },
  {
    step: "Credit Assessment",
    date: "16 Jul 2026",
    status: "active",
    note: "Credit score & FOIR check in progress",
  },
  {
    step: "Sanction Letter",
    date: "Est. 22 Jul 2026",
    status: "pending",
    note: "Awaiting credit team approval",
  },
  {
    step: "Disbursement",
    date: "Est. 30 Jul 2026",
    status: "pending",
    note: "Upon property registration",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LoanCentrePage() {
  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState(9600000); // ₹96L
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState("8.75");

  // Eligibility state
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [existingEMI, setExistingEMI] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState<null | number>(null);
  const [eligibilityChecked, setEligibilityChecked] = useState(false);

  const rate = parseFloat(interestRate) || 0;
  const { emi, totalInterest, totalAmount } = calcEMI(loanAmount, rate, tenure);

  const handleCheckEligibility = useCallback(() => {
    const income = parseFloat(monthlyIncome.replace(/,/g, "")) || 0;
    const existing = parseFloat(existingEMI.replace(/,/g, "")) || 0;
    const score = parseInt(creditScore) || 0;

    if (!income) return;

    // FOIR-based calculation (max 50% of income to EMIs)
    const maxEMI = income * 0.5 - existing;
    // Reverse-calculate max loan at 8.75% for 20 years
    const r = 8.75 / 12 / 100;
    const n = 20 * 12;
    const maxLoan = (maxEMI * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    // Credit score multiplier
    const multiplier = score >= 750 ? 1 : score >= 650 ? 0.85 : 0.7;

    setEligibilityResult(Math.max(0, maxLoan * multiplier));
    setEligibilityChecked(true);
  }, [monthlyIncome, existingEMI, creditScore]);

  const loanAmountLakh = loanAmount / 100000;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <IndianRupee className="w-6 h-6 text-blue-600" />
            Loan Centre
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Get the best home loan for your dream property
          </p>
        </div>
        <Badge className="bg-green-100 text-green-700 border-green-200 gap-1 px-3 py-1">
          <Shield className="w-3 h-3" />
          RBI Compliant
        </Badge>
      </div>

      {/* ── Trust Strip ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: TrendingUp, label: "Rates from", value: "8.50% p.a." },
          { icon: Clock, label: "Approval in", value: "48 hours" },
          { icon: BadgeCheck, label: "Partner banks", value: "12+" },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label} className="border-0 shadow-sm bg-white">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold text-gray-900">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── EMI Calculator ── */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calculator className="w-5 h-5 text-blue-600" />
            EMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
              {/* Loan Amount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Loan Amount</Label>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {formatINR(loanAmount)}
                  </span>
                </div>
                <Slider
                  min={1000000}
                  max={50000000}
                  step={100000}
                  value={[loanAmount]}
                  onValueChange={(v) => setLoanAmount(Array.isArray(v) ? v[0] : v)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹10 L</span>
                  <span>₹5 Cr</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Tenure
                    </span>
                  </Label>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {tenure} years
                  </span>
                </div>
                <Slider
                  min={5}
                  max={30}
                  step={1}
                  value={[tenure]}
                  onValueChange={(v) => setTenure(Array.isArray(v) ? v[0] : v)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 yr</span>
                  <span>30 yr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" /> Interest Rate (% p.a.)
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    step="0.05"
                    min="5"
                    max="20"
                    className="pr-8 text-sm h-9 border-gray-200 focus:border-blue-400"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-between gap-4">
              {/* EMI Highlight */}
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-white">
                <p className="text-blue-100 text-xs font-medium uppercase tracking-wide mb-1">
                  Monthly EMI
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {formatINRMonthly(Math.round(emi))}
                </p>
                <p className="text-blue-200 text-xs mt-1">
                  {loanAmountLakh.toFixed(0)}L · {tenure} yrs · {interestRate}%
                </p>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-sm font-bold text-amber-600">
                    {formatINR(Math.round(totalInterest))}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-sm font-bold text-gray-900">
                    {formatINR(Math.round(totalAmount))}
                  </p>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-medium text-muted-foreground mb-3">
                  Principal vs Interest Breakup
                </p>
                <PieChart principal={loanAmount} interest={Math.round(totalInterest)} />
              </div>

              {/* Repayment Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Principal</span>
                  <span>Interest</span>
                </div>
                <div className="h-2 rounded-full bg-amber-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{
                      width: `${(loanAmount / (loanAmount + totalInterest)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Tabs ── */}
      <Tabs defaultValue="eligibility" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-white border shadow-sm h-10">
          <TabsTrigger value="eligibility" className="text-xs sm:text-sm">
            <User className="w-3.5 h-3.5 mr-1" />
            Eligibility
          </TabsTrigger>
          <TabsTrigger value="banks" className="text-xs sm:text-sm">
            <Building2 className="w-3.5 h-3.5 mr-1" />
            Banks
          </TabsTrigger>
          <TabsTrigger value="applications" className="text-xs sm:text-sm">
            <FileText className="w-3.5 h-3.5 mr-1" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-xs sm:text-sm">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Documents
          </TabsTrigger>
        </TabsList>

        {/* ── Eligibility Tab ── */}
        <TabsContent value="eligibility">
          <Card className="border-0 shadow-md bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Check Loan Eligibility
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Based on FOIR (Fixed Obligation to Income Ratio) norms
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    Monthly Income (Net)
                  </Label>
                  <Input
                    placeholder="e.g. 1,50,000"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="text-sm border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    Existing Monthly EMIs
                  </Label>
                  <Input
                    placeholder="e.g. 15,000"
                    value={existingEMI}
                    onChange={(e) => setExistingEMI(e.target.value)}
                    className="text-sm border-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    Credit Score (CIBIL)
                  </Label>
                  <Input
                    placeholder="e.g. 750"
                    value={creditScore}
                    onChange={(e) => setCreditScore(e.target.value)}
                    className="text-sm border-gray-200"
                    type="number"
                    min={300}
                    max={900}
                  />
                </div>
              </div>

              <Button
                onClick={handleCheckEligibility}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Check Eligibility
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

              {eligibilityChecked && (
                <div
                  className={`rounded-xl p-5 border ${
                    (eligibilityResult ?? 0) > 0
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  {(eligibilityResult ?? 0) > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">You are eligible!</span>
                      </div>
                      <div>
                        <p className="text-xs text-green-700 mb-1">Maximum Loan Amount</p>
                        <p className="text-2xl font-bold text-green-700">
                          {formatINR(Math.round(eligibilityResult ?? 0))}
                        </p>
                      </div>
                      <Progress
                        value={Math.min(100, ((eligibilityResult ?? 0) / 50000000) * 100)}
                        className="h-2"
                      />
                      <p className="text-xs text-green-600">
                        Based on 50% FOIR norm at 8.75% p.a. for 20 years
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-700">Eligibility not met</p>
                        <p className="text-xs text-red-600 mt-1">
                          Your existing EMIs may exceed the permissible FOIR limit. Consider
                          closing existing loans before applying.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Credit Score Guide */}
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-4">
                <p className="text-xs font-semibold text-gray-700 mb-3">
                  CIBIL Score Guide
                </p>
                <div className="space-y-2">
                  {[
                    { range: "750 – 900", label: "Excellent", color: "bg-green-500", w: "100%" },
                    { range: "650 – 749", label: "Good", color: "bg-yellow-400", w: "75%" },
                    { range: "550 – 649", label: "Fair", color: "bg-orange-400", w: "50%" },
                    { range: "Below 550", label: "Poor", color: "bg-red-500", w: "25%" },
                  ].map(({ range, label, color, w }) => (
                    <div key={range} className="flex items-center gap-3">
                      <div className="w-24 flex-shrink-0">
                        <Progress value={parseInt(w)} className="h-1.5" />
                      </div>
                      <span className="text-xs text-gray-500 w-20">{range}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs px-2 py-0 ${
                          label === "Excellent"
                            ? "border-green-300 text-green-700"
                            : label === "Good"
                            ? "border-yellow-300 text-yellow-700"
                            : label === "Fair"
                            ? "border-orange-300 text-orange-700"
                            : "border-red-300 text-red-700"
                        }`}
                      >
                        {label}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Bank Comparison Tab ── */}
        <TabsContent value="banks">
          <Card className="border-0 shadow-md bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Bank Comparison
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Rates as on July 2026 · Subject to change · T&amp;C apply
              </p>
            </CardHeader>
            <CardContent>
              {/* Mobile-friendly card layout */}
              <div className="space-y-3">
                {banks.map((bank) => (
                  <div
                    key={bank.name}
                    className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 flex items-center gap-4 hover:bg-blue-50/40 hover:border-blue-200 transition-colors"
                  >
                    {/* Bank Initial */}
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-blue-700 text-sm flex-shrink-0 shadow-sm">
                      {bank.name.slice(0, 2)}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">{bank.name}</span>
                        {bank.tag && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${bank.tagColor}`}
                          >
                            {bank.tag}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-semibold text-blue-600">
                          <Percent className="w-3 h-3" />
                          {bank.rate}% p.a.
                        </span>
                        <span>Processing: {bank.processingFee}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Max {bank.maxTenure}
                        </span>
                        <span className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {bank.rating}
                        </span>
                      </div>
                    </div>

                    {/* Apply */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-xs flex-shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground mt-4 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                Interest rates are indicative and may vary based on applicant profile, loan
                amount, and lender discretion. Always verify directly with the bank.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── My Applications Tab ── */}
        <TabsContent value="applications">
          <Card className="border-0 shadow-md bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  My Applications
                </CardTitle>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                  1 Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Application Card */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-4">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">HDFC Bank — Pre-Approval</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      App ID: HDFC2026071201 · Submitted 12 Jul 2026
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-700">₹96 L</p>
                    <p className="text-xs text-muted-foreground">Requested</p>
                  </div>
                </div>

                {/* Overall Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium text-blue-600">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>

                {/* Timeline */}
                <div className="space-y-0">
                  {applicationSteps.map((step, idx) => (
                    <div key={step.step} className="flex gap-3">
                      {/* Connector */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.status === "done"
                              ? "bg-green-100 text-green-600"
                              : step.status === "active"
                              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {step.status === "done" ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : step.status === "active" ? (
                            <CircleDot className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                        </div>
                        {idx < applicationSteps.length - 1 && (
                          <div
                            className={`w-0.5 h-8 ${
                              step.status === "done" ? "bg-green-200" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-3 pt-1">
                        <p
                          className={`text-sm font-medium ${
                            step.status === "active"
                              ? "text-blue-700"
                              : step.status === "done"
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {step.step}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.note}</p>
                        <p
                          className={`text-xs mt-0.5 font-medium ${
                            step.status === "done"
                              ? "text-green-600"
                              : step.status === "active"
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        >
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Start New Application
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Documents Tab ── */}
        <TabsContent value="documents">
          <Card className="border-0 shadow-md bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Document Checklist
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Keep these ready to speed up your loan approval
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    category: "Identity & Address",
                    icon: User,
                    items: [
                      { name: "Aadhaar Card", status: "uploaded" },
                      { name: "PAN Card", status: "uploaded" },
                      { name: "Passport / Voter ID", status: "pending" },
                    ],
                  },
                  {
                    category: "Income Proof",
                    icon: TrendingUp,
                    items: [
                      { name: "Last 3 months Salary Slips", status: "uploaded" },
                      { name: "Form 16 (last 2 years)", status: "uploaded" },
                      { name: "ITR (last 2 years)", status: "pending" },
                    ],
                  },
                  {
                    category: "Bank Statements",
                    icon: CreditCard,
                    items: [
                      { name: "6 months bank statements", status: "uploaded" },
                      { name: "Existing loan statements", status: "not-required" },
                    ],
                  },
                  {
                    category: "Property Documents",
                    icon: Building2,
                    items: [
                      { name: "Sale Agreement / Allotment Letter", status: "pending" },
                      { name: "NOC from Society / Builder", status: "pending" },
                      { name: "Title Deed / Chain of Documents", status: "pending" },
                    ],
                  },
                ].map(({ category, icon: Icon, items }) => (
                  <div key={category} className="rounded-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2.5 flex items-center gap-2 border-b border-gray-100">
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-xs font-semibold text-gray-700">{category}</span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {items.map(({ name, status }) => (
                        <div
                          key={name}
                          className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50/50"
                        >
                          <span className="text-sm text-gray-700">{name}</span>
                          <div className="flex items-center gap-2">
                            {status === "uploaded" ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-0">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Uploaded
                              </Badge>
                            ) : status === "not-required" ? (
                              <Badge
                                variant="outline"
                                className="text-gray-400 border-gray-200 text-xs px-2 py-0"
                              >
                                N/A
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 text-xs px-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                              >
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Completion */}
              <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">
                    Document Completion
                  </span>
                  <span className="text-sm font-bold text-blue-700">5 / 10</span>
                </div>
                <Progress value={50} className="h-2" />
                <p className="text-xs text-blue-600 mt-2">
                  Upload 5 more documents to complete your profile and speed up approval.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
