"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Share2, Gift, Users, TrendingUp, IndianRupee, Copy, Plus } from "lucide-react";

interface ReferralRecord {
  id: string;
  referrer: string;
  referrerUnit: string;
  project: string;
  referee: string;
  refereePhone: string;
  status: "Registered" | "Site Visit" | "Booked" | "Registered Deed" | "Paid Out";
  referredOn: string;
  bookingValue?: number;
  reward: number;
  paidOut: boolean;
}

interface RewardTier {
  tier: string;
  condition: string;
  reward: string;
  minBookings: number;
}

const referrals: ReferralRecord[] = [
  { id: "REF-0041", referrer: "Amit Verma", referrerUnit: "Godrej Meridien A-1204", project: "Godrej Meridien", referee: "Rohit Kapoor", refereePhone: "+91 98765 11111", status: "Booked", referredOn: "Jun 5, 2026", bookingValue: 18500000, reward: 100000, paidOut: false },
  { id: "REF-0040", referrer: "Sunita Rao", referrerUnit: "Godrej Meridien B-0802", project: "Godrej Reserve", referee: "Kavya Nair", refereePhone: "+91 87654 22222", status: "Registered Deed", referredOn: "May 20, 2026", bookingValue: 28000000, reward: 150000, paidOut: true },
  { id: "REF-0039", referrer: "Meena Iyer", referrerUnit: "Godrej Nest D-0601", project: "Godrej Nest", referee: "Priya Srinivasan", refereePhone: "+91 76543 33333", status: "Site Visit", referredOn: "Jul 1, 2026", reward: 50000, paidOut: false },
  { id: "REF-0038", referrer: "Rajan Pillai", referrerUnit: "Godrej Reserve C-1501", project: "Godrej Splendour", referee: "Anil Sharma", refereePhone: "+91 65432 44444", status: "Registered", referredOn: "Jul 10, 2026", reward: 50000, paidOut: false },
  { id: "REF-0037", referrer: "Fatima Sheikh", referrerUnit: "Godrej South Estate E-0901", project: "Godrej South Estate", referee: "Vikram Singhania", refereePhone: "+91 54321 55555", status: "Booked", referredOn: "Jun 15, 2026", bookingValue: 75000000, reward: 200000, paidOut: false },
  { id: "REF-0036", referrer: "Sanjay Kulkarni", referrerUnit: "Godrej Nest A-2001", project: "Godrej Infinity", referee: "Deepa Krishnan", refereePhone: "+91 43210 66666", status: "Paid Out", referredOn: "Apr 28, 2026", bookingValue: 12000000, reward: 75000, paidOut: true },
  { id: "REF-0035", referrer: "Pradeep Joshi", referrerUnit: "Godrej Emerald B-1001", project: "Godrej Nest", referee: "Rohan Mehta", refereePhone: "+91 32109 77777", status: "Paid Out", referredOn: "Mar 15, 2026", bookingValue: 9500000, reward: 60000, paidOut: true },
];

const tiers: RewardTier[] = [
  { tier: "Silver", condition: "1 successful referral", reward: "₹50,000 Amazon voucher", minBookings: 1 },
  { tier: "Gold", condition: "2-3 successful referrals", reward: "₹1.5L cash + Gold coin", minBookings: 2 },
  { tier: "Platinum", condition: "4+ successful referrals", reward: "₹3L cash + Free club membership", minBookings: 4 },
];

const monthlyData = [
  { month: "Apr", referrals: 8, conversions: 3 },
  { month: "May", referrals: 12, conversions: 5 },
  { month: "Jun", referrals: 18, conversions: 7 },
  { month: "Jul", referrals: 14, conversions: 4 },
];

const STATUS_COLOR: Record<ReferralRecord["status"], string> = {
  Registered: "bg-zinc-100 text-zinc-600 border-zinc-200",
  "Site Visit": "bg-blue-100 text-blue-700 border-blue-200",
  Booked: "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Registered Deed": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Paid Out": "bg-green-100 text-green-700 border-green-200",
};

function fmt(v: number) { return `₹${(v / 100000).toFixed(0)}L`; }

export default function ReferralsPage() {
  const [tab, setTab] = useState("referrals");

  const totalReferred = referrals.length;
  const converted = referrals.filter((r) => ["Booked", "Registered Deed", "Paid Out"].includes(r.status)).length;
  const totalRewards = referrals.reduce((s, r) => s + r.reward, 0);
  const paidRewards = referrals.filter((r) => r.paidOut).reduce((s, r) => s + r.reward, 0);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Referrals & Rewards</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track resident referrals, conversion pipeline, and reward payouts</p>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" /> Add Referral
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Referrals", value: totalReferred.toString(), sub: "This FY", color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
          { label: "Converted", value: converted.toString(), sub: `${Math.round((converted / totalReferred) * 100)}% rate`, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { label: "Rewards Committed", value: fmt(totalRewards), sub: "Total liability", color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
          { label: "Rewards Paid", value: fmt(paidRewards), sub: "Disbursed", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
        ].map((k) => (
          <Card key={k.label} className={`border ${k.bg}`}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className={`text-2xl font-bold mt-1 ${k.color}`}>{k.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
        <TabsList className="h-8">
          <TabsTrigger value="referrals" className="text-xs h-7">Referral Tracker</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs h-7">Analytics</TabsTrigger>
          <TabsTrigger value="program" className="text-xs h-7">Reward Tiers</TabsTrigger>
        </TabsList>

        <TabsContent value="referrals" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Ref ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Referred By</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Referee</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Project</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Referred On</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-medium">{r.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium">{r.referrer}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[140px]">{r.referrerUnit}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium">{r.referee}</p>
                        <p className="text-xs text-muted-foreground">{r.refereePhone}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{r.project}</td>
                      <td className="px-4 py-3">
                        <Badge className={`border text-[10px] ${STATUS_COLOR[r.status]}`}>{r.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{r.referredOn}</td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-semibold">{fmt(r.reward)}</p>
                        <p className={`text-[10px] ${r.paidOut ? "text-emerald-600" : "text-muted-foreground"}`}>
                          {r.paidOut ? "Paid" : "Pending"}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Monthly Referrals vs Conversions</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="referrals" fill="#6366f1" name="Referrals" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversions" fill="#22c55e" name="Conversions" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="program" className="mt-4">
          <div className="grid gap-3">
            {tiers.map((t) => (
              <Card key={t.tier} className="border">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-primary" />
                      <p className="font-semibold text-sm">{t.tier} Tier</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t.condition}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{t.reward}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
