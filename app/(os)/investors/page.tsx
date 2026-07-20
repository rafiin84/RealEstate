"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { PieChart, TrendingUp, IndianRupee, Users, Download, Calendar, FileText, ExternalLink } from "lucide-react";

const stockData = [
  { month: "Jul '25", price: 412 },
  { month: "Aug '25", price: 438 },
  { month: "Sep '25", price: 421 },
  { month: "Oct '25", price: 458 },
  { month: "Nov '25", price: 484 },
  { month: "Dec '25", price: 502 },
  { month: "Jan '26", price: 518 },
  { month: "Feb '26", price: 545 },
  { month: "Mar '26", price: 532 },
  { month: "Apr '26", price: 571 },
  { month: "May '26", price: 598 },
  { month: "Jun '26", price: 624 },
  { month: "Jul '26", price: 641 },
];

const quarterlyRevenue = [
  { quarter: "Q1 FY26", revenue: 892, bookings: 1420 },
  { quarter: "Q2 FY26", revenue: 1140, bookings: 1680 },
  { quarter: "Q3 FY26", revenue: 1380, bookings: 2100 },
  { quarter: "Q4 FY26", revenue: 1806, bookings: 2480 },
];

const shareholding = [
  { category: "Godrej Industries & Associates", percentage: 58.48 },
  { category: "Foreign Institutional", percentage: 18.92 },
  { category: "Mutual Funds", percentage: 12.14 },
  { category: "Retail Investors", percentage: 7.22 },
  { category: "Other Institutions", percentage: 3.24 },
];

const filings = [
  { title: "Annual Report FY2025-26", type: "Annual Report", date: "Jun 30, 2026", size: "14.2 MB" },
  { title: "Q4 FY26 Earnings Presentation", type: "Investor Presentation", date: "May 12, 2026", size: "3.8 MB" },
  { title: "Q4 FY26 Financial Results", type: "Results", date: "May 12, 2026", size: "1.2 MB" },
  { title: "Q3 FY26 Earnings Presentation", type: "Investor Presentation", date: "Feb 10, 2026", size: "3.4 MB" },
  { title: "Q3 FY26 Financial Results", type: "Results", date: "Feb 10, 2026", size: "1.1 MB" },
  { title: "AGM Notice FY2025-26", type: "Regulatory", date: "Jul 1, 2026", size: "0.8 MB" },
  { title: "Sustainability Report 2025-26", type: "ESG", date: "Jul 10, 2026", size: "8.6 MB" },
];

const events = [
  { title: "Q1 FY27 Results", date: "Aug 12, 2026", type: "Earnings" },
  { title: "Annual General Meeting", date: "Sep 25, 2026", type: "AGM" },
  { title: "Investor Day 2026", date: "Oct 8, 2026", type: "Event" },
  { title: "Q2 FY27 Results", date: "Nov 14, 2026", type: "Earnings" },
];

const FILE_TYPE_COLOR: Record<string, string> = {
  "Annual Report": "bg-indigo-100 text-indigo-700",
  "Investor Presentation": "bg-blue-100 text-blue-700",
  Results: "bg-emerald-100 text-emerald-700",
  Regulatory: "bg-amber-100 text-amber-700",
  ESG: "bg-teal-100 text-teal-700",
};

export default function InvestorsPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Investor Relations</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Godrej Properties Ltd · NSE: GODREJPROP · BSE: 533150</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <ExternalLink className="w-3.5 h-3.5" /> NSE Live
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" /> Download AR
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Share Price", value: "₹641", sub: "+3.2% today", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
          { label: "Market Cap", value: "₹1.89L Cr", sub: "As of Jul 20, 2026", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
          { label: "FY26 Revenue", value: "₹5,218 Cr", sub: "+38% YoY", color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
          { label: "New Bookings", value: "₹22,527 Cr", sub: "FY26 record", color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
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
          <TabsTrigger value="overview" className="text-xs h-7">Stock & Financials</TabsTrigger>
          <TabsTrigger value="shareholding" className="text-xs h-7">Shareholding</TabsTrigger>
          <TabsTrigger value="filings" className="text-xs h-7">Filings & Reports</TabsTrigger>
          <TabsTrigger value="events" className="text-xs h-7">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Share Price — 12 Months (₹)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={stockData}>
                  <defs>
                    <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={[380, 680]} />
                  <Tooltip formatter={(v) => [`₹${v}`, "Price"]} />
                  <Area type="monotone" dataKey="price" stroke="#6366f1" fill="url(#stockGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Quarterly Revenue & Bookings (₹ Cr)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={quarterlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#6366f1" name="Revenue (₹Cr)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="bookings" fill="#06b6d4" name="Bookings (₹Cr)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shareholding" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Shareholding Pattern — Jun 2026</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shareholding.map((s) => (
                  <div key={s.category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{s.category}</span>
                      <span className="font-semibold">{s.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${s.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filings" className="mt-4">
          <div className="grid gap-2">
            {filings.map((f) => (
              <Card key={f.title} className="border hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{f.title}</p>
                    <p className="text-xs text-muted-foreground">{f.date} · {f.size}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${FILE_TYPE_COLOR[f.type] ?? "bg-zinc-100 text-zinc-600"}`}>{f.type}</span>
                  <Download className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <div className="grid gap-3">
            {events.map((e) => (
              <Card key={e.title} className="border">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{e.title}</p>
                    <p className="text-xs text-muted-foreground">{e.date}</p>
                  </div>
                  <Badge className="border text-[10px] bg-blue-100 text-blue-700 border-blue-200">{e.type}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
