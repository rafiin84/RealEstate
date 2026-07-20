"use client";

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Heart,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Circle,
  TrendingUp,
  Landmark,
  Phone,
  Clock,
  Building2,
  ChevronRight,
  User,
  Star,
  BadgeCheck,
  Home,
  TreePine,
  Layers,
  Pencil,
  BellRing,
  IndianRupee,
  Target,
  Wallet,
  Timer,
} from "lucide-react";
import { buyerProfiles, projects } from "@/lib/mock-data";

// ─── Static data ────────────────────────────────────────────────────────────

const matchedProperties = [
  {
    id: "proj-001",
    name: "Prestige Heights",
    type: "3 BHK Apartment",
    city: "Noida",
    price: "₹1.2 Cr",
    matchScore: 92,
    gradientFrom: "from-violet-600/30",
    gradientTo: "to-blue-500/20",
    icon: Building2,
    iconColor: "text-violet-400",
    bgColor: "bg-violet-500/10",
    accentColor: "text-violet-600 dark:text-violet-400",
    features: ["Metro 800m", "Top Schools Nearby", "Green Spaces"],
    status: "Under Construction",
    statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    coverAccent: "bg-gradient-to-br from-violet-500/25 via-blue-500/15 to-indigo-500/10",
  },
  {
    id: "proj-004",
    name: "Green Valley Plots",
    type: "Residential Plot",
    city: "Bengaluru",
    price: "₹60 L",
    matchScore: 78,
    gradientFrom: "from-emerald-600/30",
    gradientTo: "to-teal-500/20",
    icon: TreePine,
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    features: ["Gated Community", "RERA Approved", "Airport 12 km"],
    status: "Planning",
    statusColor: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    coverAccent: "bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-green-500/10",
  },
  {
    id: "proj-002",
    name: "Skyline Villas",
    type: "4 BHK Villa",
    city: "Gurugram",
    price: "₹6.5 Cr",
    matchScore: 65,
    gradientFrom: "from-amber-600/30",
    gradientTo: "to-orange-500/20",
    icon: Home,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
    accentColor: "text-amber-600 dark:text-amber-400",
    features: ["Private Pool", "Golf View", "Smart Home"],
    status: "Ready to Move",
    statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    coverAccent: "bg-gradient-to-br from-amber-500/25 via-orange-500/15 to-yellow-500/10",
  },
];

const journeySteps = [
  { id: 1, label: "Profile Created", sublabel: "Jul 1, 2024", done: true },
  { id: 2, label: "Properties Shortlisted", sublabel: "3 properties matched", done: true },
  { id: 3, label: "Site Visit Scheduled", sublabel: "Jul 22, 2024 · 11 AM", done: false, active: true },
  { id: 4, label: "Negotiation", sublabel: "Upcoming", done: false },
  { id: 5, label: "Home Loan Approval", sublabel: "Upcoming", done: false },
  { id: 6, label: "Booking & Agreement", sublabel: "Upcoming", done: false },
];

const upcomingVisits = [
  {
    id: 1,
    project: "Prestige Heights",
    date: "Jul 22, 2024",
    time: "11:00 AM",
    agent: "Vikram Singh",
    agentRole: "Senior Sales Manager",
    phone: "+91 98765 00002",
    address: "Sector 75, Noida",
    type: "In-person Tour",
  },
];

const matchRadialData = [
  { name: "Prestige Heights", score: 92, fill: "#8b5cf6" },
  { name: "Green Valley", score: 78, fill: "#10b981" },
  { name: "Skyline Villas", score: 65, fill: "#f59e0b" },
];

const budgetTrendData = [
  { month: "Jan", market: 98, budget: 120 },
  { month: "Feb", market: 100, budget: 120 },
  { month: "Mar", market: 105, budget: 120 },
  { month: "Apr", market: 108, budget: 120 },
  { month: "May", market: 112, budget: 120 },
  { month: "Jun", market: 115, budget: 120 },
  { month: "Jul", market: 118, budget: 120 },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function BuyerDashboardPage() {
  const buyer = buyerProfiles[0];
  const proj001 = projects.find(p => p.id === "proj-001");

  return (
    <div className="p-5 md:p-6 space-y-6 max-w-7xl mx-auto">

      {/* ── Greeting ───────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Good morning, Ramesh
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sunday, July 20, 2024 &nbsp;·&nbsp; Your dream home is closer than you think
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
          <Phone className="w-3.5 h-3.5" />
          Talk to Advisor
        </Button>
      </div>

      {/* ── AI Buyer Persona ────────────────────────────────────────── */}
      <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent p-[1px]">
        <div className="rounded-2xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 ring-1 ring-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-sm font-semibold text-foreground">Your Buyer Profile</span>
                  <Badge className="bg-primary/15 text-primary border-0 text-[10px] font-medium gap-1">
                    <BadgeCheck className="w-2.5 h-2.5" />
                    Residential Buyer
                  </Badge>
                  <Badge variant="outline" className="text-[10px] text-muted-foreground">AI Generated</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {buyer?.aiPersona}
                </p>
                <div className="flex flex-wrap gap-5 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Wallet className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Budget</p>
                      <p className="text-xs font-bold text-foreground">₹1.2 Cr</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">EMI</p>
                      <p className="text-xs font-bold text-foreground">₹80K/month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <Timer className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Timeline</p>
                      <p className="text-xs font-bold text-foreground">6 months</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 shrink-0">
                <Pencil className="w-3 h-3" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </div>
      </div>

      {/* ── Main grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left / center — 2 cols */}
        <div className="lg:col-span-2 space-y-6">

          {/* Matched Properties */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Your Matched Properties</h2>
                <p className="text-xs text-muted-foreground">Based on your AI buyer profile</p>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary">
                Explore all <ChevronRight className="w-3 h-3" />
              </Button>
            </div>

            <div className="space-y-3">
              {matchedProperties.map(prop => {
                const Icon = prop.icon;
                return (
                  <Card key={prop.id} className="overflow-hidden hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-0">
                      <div className="flex">
                        {/* Cover image area */}
                        <div className={`w-32 md:w-40 shrink-0 ${prop.coverAccent} flex flex-col items-center justify-center gap-2 relative min-h-[120px]`}>
                          <div className={`w-12 h-12 rounded-2xl ${prop.bgColor} flex items-center justify-center ring-1 ring-white/10`}>
                            <Icon className={`w-6 h-6 ${prop.iconColor}`} />
                          </div>
                          <Badge className={`text-[9px] px-1.5 py-0 h-4 border-0 ${prop.statusColor}`}>
                            {prop.status}
                          </Badge>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                {prop.name}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                <span>{prop.type}</span>
                                <span>·</span>
                                <MapPin className="w-3 h-3" />
                                <span>{prop.city}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-bold text-foreground">{prop.price}</p>
                              <div className="flex items-center gap-1 justify-end mt-1">
                                <Target className="w-3 h-3 text-amber-500" />
                                <span className={`text-[11px] font-bold ${prop.accentColor}`}>
                                  {prop.matchScore}% Match
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-muted-foreground">Match Score</span>
                              <span className="text-[10px] font-medium text-foreground">{prop.matchScore}%</span>
                            </div>
                            <Progress value={prop.matchScore} className="h-1.5" />
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {prop.features.map(f => (
                              <Badge key={f} variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-normal">
                                {f}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2 pt-0.5">
                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                              <Heart className="w-3 h-3" />
                              Save
                            </Button>
                            <Button size="sm" className="h-7 text-xs gap-1.5">
                              <ArrowRight className="w-3 h-3" />
                              Explore
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Budget vs Market chart */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">Budget vs Market Trend</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Noida 3 BHK avg. price (in Lakhs)</p>
                </div>
                <Badge variant="outline" className="text-[10px] gap-1 text-emerald-600 border-emerald-200 dark:border-emerald-800">
                  <TrendingUp className="w-2.5 h-2.5" />
                  Good time to buy
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={budgetTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="marketGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="budgetGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                      formatter={(val, name) => [
                        `₹${val}L`,
                        name === "market" ? "Avg Market Price" : "Your Budget",
                      ]}
                    />
                    <Area type="monotone" dataKey="market" stroke="#6366f1" strokeWidth={2} fill="url(#marketGrad)" dot={false} name="market" />
                    <Area type="monotone" dataKey="budget" stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" fill="url(#budgetGrad)" dot={false} name="budget" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="w-3 h-0.5 bg-indigo-500 inline-block rounded" />
                  Avg Market Price
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="w-3 h-0.5 bg-emerald-500 inline-block rounded border-t border-dashed border-emerald-500" />
                  Your Budget
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Site Visits */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Upcoming Site Visits</CardTitle>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary">
                  Schedule new <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingVisits.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No visits scheduled yet.</p>
              ) : (
                <div className="space-y-4">
                  {upcomingVisits.map(visit => (
                    <div key={visit.id} className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{visit.project}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {visit.address}
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-0 text-[10px]">
                          {visit.type}
                        </Badge>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{visit.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>{visit.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-foreground">
                            VS
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground">{visit.agent}</p>
                            <p className="text-[10px] text-muted-foreground">{visit.agentRole}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                          <Phone className="w-3 h-3" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column — 1 col */}
        <div className="space-y-5">

          {/* Match score radial chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Property Match Scores</CardTitle>
              <p className="text-xs text-muted-foreground">How well each property fits your profile</p>
            </CardHeader>
            <CardContent>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="20%"
                    outerRadius="90%"
                    data={matchRadialData}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar
                      dataKey="score"
                      cornerRadius={4}
                      background={{ fill: "hsl(var(--muted))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                      formatter={(val) => [`${val}%`, "Match Score"]}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-1">
                {matchRadialData.map(item => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.fill }} />
                    <span className="text-[11px] text-muted-foreground flex-1 truncate">{item.name}</span>
                    <span className="text-[11px] font-semibold text-foreground">{item.score}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Buying Journey */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">My Buying Journey</CardTitle>
              <p className="text-xs text-muted-foreground">Step 3 of 6 in progress</p>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-[9px] top-3 bottom-3 w-px bg-border" />

                <div className="space-y-4">
                  {journeySteps.map(step => (
                    <div key={step.id} className="flex items-start gap-3 relative">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 mt-0.5 ring-2 ${
                        step.done
                          ? "bg-emerald-500 ring-emerald-500/20"
                          : step.active
                          ? "bg-primary ring-primary/20"
                          : "bg-background ring-border border border-border"
                      }`}>
                        {step.done ? (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        ) : step.active ? (
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        ) : (
                          <Circle className="w-3 h-3 text-muted-foreground/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${
                          step.done
                            ? "text-muted-foreground line-through"
                            : step.active
                            ? "text-foreground"
                            : "text-muted-foreground/60"
                        }`}>
                          {step.label}
                        </p>
                        <p className={`text-[10px] mt-0.5 ${
                          step.active ? "text-primary font-medium" : "text-muted-foreground/50"
                        }`}>
                          {step.sublabel}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Pre-approval CTA */}
          <Card className="border-emerald-500/25 bg-gradient-to-br from-emerald-500/8 via-teal-500/4 to-transparent overflow-hidden relative">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
            <CardContent className="p-5 space-y-4 relative">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center ring-1 ring-emerald-500/20">
                  <Landmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Loan Pre-Approval</p>
                  <p className="text-[10px] text-muted-foreground">Get approved in 5 minutes</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Know your exact buying power before visiting properties. No impact on your credit score.
              </p>

              <div className="space-y-1.5">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Partner banks</p>
                <div className="flex flex-wrap gap-1.5">
                  {["HDFC Bank", "SBI", "ICICI", "Kotak", "Axis"].map(bank => (
                    <span key={bank} className="text-[10px] font-medium bg-background border border-border rounded-md px-2 py-0.5 text-foreground">
                      {bank}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  Eligible for up to ₹90L home loan
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  Best rates from 8.4% p.a.
                </div>
              </div>

              <Button size="sm" className="w-full h-9 text-xs gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                Check Eligibility — Free
              </Button>
            </CardContent>
          </Card>

          {/* Referral nudge */}
          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/6 to-transparent">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">Refer a friend</p>
                <p className="text-[10px] text-muted-foreground">Earn ₹10,000 cashback on each booking</p>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs shrink-0">Share</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
