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
  Legend,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Megaphone,
  Plus,
  Users,
  TrendingUp,
  Wallet,
  IndianRupee,
  Globe2,
  MonitorPlay,
  Tv,
  Mail,
  MousePointerClick,
  ThumbsUp,
  MessageCircle,
  Share2,
  Eye,
  CalendarDays,
  BarChart2,
  Globe,
  Target,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type CampaignStatus = "Active" | "Paused" | "Completed" | "Draft";

interface Campaign {
  name: string;
  channel: string;
  status: CampaignStatus;
  budget: number;
  spent: number;
  leads: number;
  cpl: number;
  startDate: string;
  endDate: string;
  performance: number;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const campaigns: Campaign[] = [
  {
    name: "Prestige Heights Launch",
    channel: "Facebook",
    status: "Active",
    budget: 800000,
    spent: 520000,
    leads: 312,
    cpl: 1667,
    startDate: "01 Jun 2026",
    endDate: "31 Jul 2026",
    performance: 78,
  },
  {
    name: "Skyline Villas Premium",
    channel: "Google",
    status: "Active",
    budget: 1200000,
    spent: 890000,
    leads: 487,
    cpl: 1828,
    startDate: "15 May 2026",
    endDate: "15 Aug 2026",
    performance: 86,
  },
  {
    name: "Digital India Drive",
    channel: "Instagram",
    status: "Active",
    budget: 500000,
    spent: 210000,
    leads: 149,
    cpl: 1409,
    startDate: "10 Jul 2026",
    endDate: "10 Sep 2026",
    performance: 62,
  },
  {
    name: "Luxury Residences Q3",
    channel: "Google",
    status: "Paused",
    budget: 600000,
    spent: 430000,
    leads: 198,
    cpl: 2172,
    startDate: "01 Apr 2026",
    endDate: "30 Jun 2026",
    performance: 54,
  },
  {
    name: "First Home Buyers Fest",
    channel: "Facebook",
    status: "Completed",
    budget: 350000,
    spent: 347000,
    leads: 224,
    cpl: 1549,
    startDate: "01 Mar 2026",
    endDate: "31 Mar 2026",
    performance: 91,
  },
  {
    name: "Affordable Homes Blitz",
    channel: "Instagram",
    status: "Draft",
    budget: 400000,
    spent: 0,
    leads: 0,
    cpl: 0,
    startDate: "01 Aug 2026",
    endDate: "31 Aug 2026",
    performance: 0,
  },
];

const socialPlatforms = [
  {
    name: "Facebook",
    icon: Globe2,
    color: "#1877F2",
    followers: "2.4K",
    reach: "48K",
    engagement: "3.2%",
    posts: 24,
  },
  {
    name: "Instagram",
    icon: MonitorPlay,
    color: "#E1306C",
    followers: "8.2K",
    reach: "120K",
    engagement: "5.7%",
    posts: 48,
  },
  {
    name: "YouTube",
    icon: Tv,
    color: "#FF0000",
    followers: "1.2K",
    reach: "32K",
    engagement: "4.1%",
    posts: 12,
  },
];

const recentPosts = [
  {
    platform: "Instagram",
    content: "Introducing Prestige Heights — luxury living redefined. 🏙️",
    date: "18 Jul 2026",
    likes: 842,
    comments: 63,
    shares: 118,
    reach: 12400,
  },
  {
    platform: "Facebook",
    content: "Walk through the show flat at Skyline Villas this weekend!",
    date: "16 Jul 2026",
    likes: 512,
    comments: 41,
    shares: 87,
    reach: 8900,
  },
  {
    platform: "YouTube",
    content: "Tour: Skyline Villas 3BHK Show Apartment Walkthrough",
    date: "14 Jul 2026",
    likes: 329,
    comments: 28,
    shares: 54,
    reach: 6100,
  },
  {
    platform: "Instagram",
    content: "What your dream home looks like — explore our 2BHK floor plans.",
    date: "12 Jul 2026",
    likes: 693,
    comments: 49,
    shares: 94,
    reach: 10200,
  },
];

const emailCampaigns = [
  {
    name: "June Launch Invite",
    sent: 18400,
    openRate: 28.4,
    clickRate: 7.2,
    unsubscribes: 34,
    date: "01 Jun 2026",
  },
  {
    name: "Skyline Villas Newsletter",
    sent: 21600,
    openRate: 31.1,
    clickRate: 9.8,
    unsubscribes: 27,
    date: "10 Jun 2026",
  },
  {
    name: "First Home Buyer Tips",
    sent: 15200,
    openRate: 42.6,
    clickRate: 14.3,
    unsubscribes: 18,
    date: "25 Jun 2026",
  },
  {
    name: "Q3 Offer — Early Bird",
    sent: 24800,
    openRate: 24.9,
    clickRate: 6.1,
    unsubscribes: 52,
    date: "05 Jul 2026",
  },
  {
    name: "Possession Update — Block A",
    sent: 3200,
    openRate: 68.2,
    clickRate: 22.4,
    unsubscribes: 4,
    date: "15 Jul 2026",
  },
];

const budgetData = [
  { channel: "Facebook", allocated: 12, spent: 8.7 },
  { channel: "Google", allocated: 18, spent: 13.2 },
  { channel: "Instagram", allocated: 9, spent: 3.5 },
  { channel: "Email", allocated: 2, spent: 1.4 },
  { channel: "Events", allocated: 5, spent: 2.8 },
  { channel: "OOH", allocated: 3, spent: 3.0 },
  { channel: "Print", allocated: 1.5, spent: 0.7 },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatINR(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

function statusColor(status: CampaignStatus) {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Paused":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Completed":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Draft":
      return "bg-zinc-100 text-zinc-600 border-zinc-200";
  }
}

function channelIcon(channel: string) {
  switch (channel) {
    case "Facebook":
      return <Globe2 className="h-4 w-4 text-[#1877F2]" />;
    case "Instagram":
      return <MonitorPlay className="h-4 w-4 text-[#E1306C]" />;
    case "YouTube":
      return <Tv className="h-4 w-4 text-[#FF0000]" />;
    default:
      return <Globe className="h-4 w-4 text-indigo-500" />;
  }
}

function platformIcon(platform: string) {
  switch (platform) {
    case "Facebook":
      return <Globe2 className="h-4 w-4 text-[#1877F2]" />;
    case "Instagram":
      return <MonitorPlay className="h-4 w-4 text-[#E1306C]" />;
    case "YouTube":
      return <Tv className="h-4 w-4 text-[#FF0000]" />;
    default:
      return <Globe className="h-4 w-4 text-zinc-500" />;
  }
}

// ── KPI Card ───────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  accent: string;
}

function KpiCard({ label, value, sub, icon, accent }: KpiCardProps) {
  return (
    <Card className="border border-zinc-200 shadow-sm">
      <CardContent className="p-5 flex items-start gap-4">
        <div className={`p-2.5 rounded-lg ${accent}`}>{icon}</div>
        <div>
          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
            {label}
          </p>
          <p className="text-2xl font-bold text-zinc-900 leading-tight mt-0.5">
            {value}
          </p>
          {sub && <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Campaign Card ──────────────────────────────────────────────────────────────

function CampaignCard({ c }: { c: Campaign }) {
  const budgetPct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0;

  return (
    <Card className="border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {channelIcon(c.channel)}
            <CardTitle className="text-sm font-semibold text-zinc-900 leading-snug">
              {c.name}
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className={`text-[11px] shrink-0 ${statusColor(c.status)}`}
          >
            {c.status}
          </Badge>
        </div>
        <CardDescription className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {c.startDate} — {c.endDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wide">
              Budget
            </p>
            <p className="text-sm font-semibold text-zinc-800">
              {formatINR(c.budget)}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wide">
              Leads
            </p>
            <p className="text-sm font-semibold text-zinc-800">
              {c.leads > 0 ? c.leads : "—"}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wide">
              CPL
            </p>
            <p className="text-sm font-semibold text-zinc-800">
              {c.cpl > 0 ? `₹${c.cpl.toLocaleString()}` : "—"}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Budget spent</span>
            <span>
              {formatINR(c.spent)} / {formatINR(c.budget)}
            </span>
          </div>
          <Progress value={budgetPct} className="h-1.5" />
        </div>

        {c.status !== "Draft" && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <BarChart2 className="h-3.5 w-3.5" /> Performance
              </span>
              <span>{c.performance}%</span>
            </div>
            <Progress value={c.performance} className="h-1.5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("campaigns");

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-100">
            <Megaphone className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-900">Marketing</h1>
            <p className="text-sm text-zinc-500">
              Campaigns, channels &amp; performance
            </p>
          </div>
        </div>
        <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="Active Campaigns"
          value="8"
          sub="3 channels running"
          icon={<Target className="h-5 w-5 text-violet-600" />}
          accent="bg-violet-100"
        />
        <KpiCard
          label="Total Leads Generated"
          value="1,248"
          sub="+14.3% vs last month"
          icon={<Users className="h-5 w-5 text-emerald-600" />}
          accent="bg-emerald-100"
        />
        <KpiCard
          label="Cost per Lead"
          value="₹1,840"
          sub="↓ ₹210 vs last month"
          icon={<IndianRupee className="h-5 w-5 text-amber-600" />}
          accent="bg-amber-100"
        />
        <KpiCard
          label="Budget Spent"
          value="₹23L"
          sub="of ₹40L total budget"
          icon={<Wallet className="h-5 w-5 text-blue-600" />}
          accent="bg-blue-100"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => v && setActiveTab(v)}>
        <TabsList className="bg-zinc-100 border border-zinc-200">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        {/* ── Campaigns Tab ── */}
        <TabsContent value="campaigns" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {campaigns.map((c) => (
              <CampaignCard key={c.name} c={c} />
            ))}
          </div>
        </TabsContent>

        {/* ── Social Media Tab ── */}
        <TabsContent value="social" className="mt-4 space-y-6">
          {/* Platform Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialPlatforms.map((p) => (
              <Card
                key={p.name}
                className="border border-zinc-200 shadow-sm"
              >
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${p.color}18` }}
                    >
                      <p.icon
                        className="h-5 w-5"
                        style={{ color: p.color }}
                      />
                    </div>
                    <span className="font-semibold text-zinc-900">
                      {p.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[11px] text-zinc-400 uppercase tracking-wide">
                        Followers
                      </p>
                      <p className="text-lg font-bold text-zinc-900">
                        {p.followers}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-zinc-400 uppercase tracking-wide">
                        Reach
                      </p>
                      <p className="text-lg font-bold text-zinc-900">
                        {p.reach}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-zinc-400 uppercase tracking-wide">
                        Engagement
                      </p>
                      <p className="text-lg font-bold text-emerald-600">
                        {p.engagement}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-zinc-400 uppercase tracking-wide">
                        Posts
                      </p>
                      <p className="text-lg font-bold text-zinc-900">
                        {p.posts}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Posts */}
          <Card className="border border-zinc-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Recent Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-100">
                {recentPosts.map((post, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 px-5 py-4"
                  >
                    <div className="mt-0.5">
                      {platformIcon(post.platform)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-800 font-medium truncate">
                        {post.content}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {post.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-zinc-500 shrink-0">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {post.reach.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="h-3.5 w-3.5" />
                        {post.shares}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Email Tab ── */}
        <TabsContent value="email" className="mt-4">
          <Card className="border border-zinc-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 text-violet-500" />
                Email Campaigns
              </CardTitle>
              <CardDescription className="text-xs">
                Performance metrics for all email campaigns
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50">
                      <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                        Campaign
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                        Sent
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                        Open Rate
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                        Click Rate
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                        Unsubs
                      </th>
                      <th className="text-right px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {emailCampaigns.map((ec, i) => (
                      <tr
                        key={i}
                        className="hover:bg-zinc-50 transition-colors"
                      >
                        <td className="px-5 py-3.5 font-medium text-zinc-900">
                          {ec.name}
                        </td>
                        <td className="px-4 py-3.5 text-right text-zinc-600">
                          {ec.sent.toLocaleString()}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <span
                            className={`font-semibold ${
                              ec.openRate >= 40
                                ? "text-emerald-600"
                                : ec.openRate >= 25
                                ? "text-amber-600"
                                : "text-red-500"
                            }`}
                          >
                            {ec.openRate}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <span className="flex items-center justify-end gap-1 text-zinc-700">
                            <MousePointerClick className="h-3.5 w-3.5 text-violet-400" />
                            {ec.clickRate}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right text-zinc-500">
                          {ec.unsubscribes}
                        </td>
                        <td className="px-5 py-3.5 text-right text-zinc-400 text-xs">
                          {ec.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Events Tab ── */}
        <TabsContent value="events" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Prestige Heights Site Visit Day",
                date: "27 Jul 2026",
                location: "Whitefield, Bengaluru",
                registrations: 148,
                capacity: 200,
                status: "Upcoming",
              },
              {
                name: "Home Buyer's Workshop — Q3",
                date: "02 Aug 2026",
                location: "Koramangala Community Hall",
                registrations: 92,
                capacity: 150,
                status: "Upcoming",
              },
              {
                name: "Skyline Villas Launch Event",
                date: "15 Jun 2026",
                location: "ITC Windsor, Bengaluru",
                registrations: 320,
                capacity: 300,
                status: "Completed",
              },
              {
                name: "NRI Investment Webinar",
                date: "30 Jun 2026",
                location: "Online — Zoom",
                registrations: 214,
                capacity: 500,
                status: "Completed",
              },
            ].map((ev, i) => (
              <Card key={i} className="border border-zinc-200 shadow-sm">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-zinc-900 text-sm leading-snug">
                      {ev.name}
                    </p>
                    <Badge
                      variant="outline"
                      className={
                        ev.status === "Upcoming"
                          ? "text-violet-700 bg-violet-50 border-violet-200 text-[11px]"
                          : "text-blue-700 bg-blue-50 border-blue-200 text-[11px]"
                      }
                    >
                      {ev.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {ev.date}
                    </span>
                    <span>{ev.location}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Registrations</span>
                      <span>
                        {ev.registrations} / {ev.capacity}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(
                        100,
                        Math.round((ev.registrations / ev.capacity) * 100)
                      )}
                      className="h-1.5"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Budget Tab ── */}
        <TabsContent value="budget" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Chart */}
            <Card className="xl:col-span-2 border border-zinc-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-violet-500" />
                  Budget Allocation by Channel (₹L)
                </CardTitle>
                <CardDescription className="text-xs">
                  Allocated vs Spent across all active channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={budgetData}
                    barCategoryGap="30%"
                    barGap={4}
                    margin={{ top: 4, right: 8, bottom: 0, left: -10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="channel"
                      tick={{ fontSize: 11, fill: "#71717a" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#71717a" }}
                      axisLine={false}
                      tickLine={false}
                      unit="L"
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: 12,
                        borderRadius: 8,
                        border: "1px solid #e4e4e7",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                      formatter={(v, name) => [
                        `₹${v}L`,
                        name === "allocated" ? "Allocated" : "Spent",
                      ]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                      formatter={(v) =>
                        v === "allocated" ? "Allocated" : "Spent"
                      }
                    />
                    <Bar
                      dataKey="allocated"
                      fill="#ddd6fe"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="spent"
                      fill="#7c3aed"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Remaining Budget */}
            <Card className="border border-zinc-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-violet-500" />
                  Remaining Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {budgetData.map((d) => {
                  const remaining = d.allocated - d.spent;
                  const pct = Math.round((d.spent / d.allocated) * 100);
                  return (
                    <div key={d.channel} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-700 font-medium">
                          {d.channel}
                        </span>
                        <span className="text-zinc-400">
                          ₹{remaining.toFixed(1)}L left
                        </span>
                      </div>
                      <Progress value={pct} className="h-1.5" />
                    </div>
                  );
                })}
                <div className="pt-3 border-t border-zinc-100 flex justify-between text-sm">
                  <span className="font-medium text-zinc-700">
                    Total Remaining
                  </span>
                  <span className="font-bold text-emerald-600">
                    ₹{(
                      budgetData.reduce(
                        (acc, d) => acc + (d.allocated - d.spent),
                        0
                      )
                    ).toFixed(1)}
                    L
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
