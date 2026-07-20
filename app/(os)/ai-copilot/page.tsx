"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sparkles,
  Send,
  Plus,
  TrendingUp,
  Users,
  AlertTriangle,
  Building2,
  MessageSquare,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "ai";
  content: React.ReactNode;
  timestamp: string;
}

interface ConversationItem {
  id: string;
  title: string;
  time: string;
  isActive?: boolean;
}

interface InsightCard {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  body: string;
  action: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  "Forecast revenue next quarter",
  "Find hot leads",
  "Construction delay risk?",
  "Best performing channel partner",
];

const CONVERSATION_HISTORY: ConversationItem[] = [
  { id: "h1", title: "Revenue Q2 analysis", time: "Today, 9:30 AM", isActive: true },
  { id: "h2", title: "Overdue collections", time: "Yesterday" },
  { id: "h3", title: "Lead scoring model", time: "Jul 18" },
  { id: "h4", title: "Central Square pricing", time: "Jul 15" },
  { id: "h5", title: "Channel partner report", time: "Jul 12" },
];

const AI_INSIGHTS: InsightCard[] = [
  {
    id: 1,
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    title: "Revenue Acceleration",
    body: "Sales velocity increased 22% vs last month. Prestige Heights is driving 68% of new bookings. Consider launching early-bird pricing for remaining inventory.",
    action: "View Revenue Report",
  },
  {
    id: 2,
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    title: "Overdue Collections Alert",
    body: "₹8.2 Cr in collections overdue by 30+ days across 6 buyers. Proactive outreach recommended before month-end to avoid revenue recognition impact.",
    action: "View Overdue List",
  },
  {
    id: 3,
    icon: Users,
    iconColor: "text-blue-500",
    title: "Lead Follow-up Gap",
    body: "14 hot leads (score >80) haven't been contacted in 3+ days. Vikram Singh has the highest open pipeline at ₹12 Cr. Auto-follow-up can be enabled.",
    action: "View Hot Leads",
  },
];

const OVERDUE_LEADS = [
  { name: "Meera Krishnan", project: "Prestige Heights", days: 5, score: 45, phone: "+91 98200 11234" },
  { name: "Sanjay Gupta", project: "Green Valley Plots", days: 3, score: 55, phone: "+91 98200 22345" },
  { name: "Rohit Bajaj", project: "Central Square", days: 4, score: 78, phone: "+91 98200 33456" },
  { name: "Priya Nambiar", project: "Skyline Villas", days: 6, score: 62, phone: "+91 98200 44567" },
  { name: "Ankit Sharma", project: "Prestige Heights", days: 3, score: 88, phone: "+91 98200 55678" },
];

const ROI_DATA = [
  { name: "Prestige Heights", roi: "28.4%", rev: "₹68 Cr", color: "#22c55e" },
  { name: "Skyline Villas", roi: "22.1%", rev: "₹118 Cr", color: "#6366f1" },
  { name: "Central Square", roi: "14.8%", rev: "₹41 Cr", color: "#f59e0b" },
  { name: "Green Valley Plots", roi: "11.2%", rev: "₹29 Cr", color: "#06b6d4" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function LeadsTable() {
  return (
    <div className="bg-muted/30 rounded-lg overflow-hidden mt-2 border border-border/50">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border bg-muted/20">
            <th className="text-left px-3 py-2 text-muted-foreground font-medium">Lead</th>
            <th className="text-left px-3 py-2 text-muted-foreground font-medium">Project</th>
            <th className="text-left px-3 py-2 text-muted-foreground font-medium">Phone</th>
            <th className="text-left px-3 py-2 text-muted-foreground font-medium">Idle</th>
            <th className="text-left px-3 py-2 text-muted-foreground font-medium">Score</th>
            <th className="text-left px-3 py-2 text-muted-foreground font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {OVERDUE_LEADS.map((l) => (
            <tr key={l.name} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
              <td className="px-3 py-2 font-medium text-foreground">{l.name}</td>
              <td className="px-3 py-2 text-muted-foreground">{l.project}</td>
              <td className="px-3 py-2 text-muted-foreground">{l.phone}</td>
              <td className="px-3 py-2">
                <span className="text-rose-500 font-medium">{l.days}d</span>
              </td>
              <td className="px-3 py-2">
                <span
                  className="font-semibold"
                  style={{ color: l.score >= 75 ? "#22c55e" : l.score >= 55 ? "#f59e0b" : "#6b7280" }}
                >
                  {l.score}
                </span>
              </td>
              <td className="px-3 py-2">
                <button className="text-primary text-[11px] hover:underline font-medium">
                  Follow up
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ROITable() {
  return (
    <div className="space-y-2 mt-2">
      {ROI_DATA.map((p, i) => (
        <div
          key={p.name}
          className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2.5 border border-border/40"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              style={{ background: p.color }}
            >
              {i + 1}
            </span>
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{p.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">{p.rev}</span>
            <span className="text-sm font-bold" style={{ color: p.color }}>
              {p.roi}
            </span>
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
        Prestige Heights benefits from a lower land-cost basis and higher floor-rise premiums.
        Consider replicating this pricing model for Phase 2.
      </p>
    </div>
  );
}

// ─── Initial conversation ─────────────────────────────────────────────────────

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Show me all leads that haven't been followed up in 3 days",
    timestamp: "9:28 AM",
  },
  {
    id: "2",
    role: "ai",
    content: (
      <div>
        <p className="mb-1">
          Found <strong>14 leads</strong> with no follow-up activity in 3+ days. Here are the 5
          highest-priority ones ranked by lead score:
        </p>
        <LeadsTable />
        <p className="mt-2.5 text-muted-foreground text-[11px] leading-relaxed">
          Tip: Enable auto-WhatsApp reminders for leads idle &gt;2 days from{" "}
          <span className="text-primary">Settings → CRM Automation</span>.
        </p>
      </div>
    ),
    timestamp: "9:28 AM",
  },
  {
    id: "3",
    role: "user",
    content: "Which project has the highest return on investment this quarter?",
    timestamp: "9:30 AM",
  },
  {
    id: "4",
    role: "ai",
    content: (
      <div>
        <p className="mb-1">
          Based on Q2 FY 2024–25 data, <strong>Prestige Heights</strong> leads with{" "}
          <strong className="text-emerald-500">28% ROI</strong> — the highest across your
          portfolio:
        </p>
        <ROITable />
      </div>
    ),
    timestamp: "9:30 AM",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AICopilotPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [activeConv, setActiveConv] = useState("h1");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text?: string) => {
    const query = (text ?? input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content: (
        <div>
          <p className="mb-1">Analyzing your query across live project data...</p>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            In production this connects to your real-time data pipeline and generates
            AI-powered insights. Results would appear here within a few seconds.
          </p>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="flex h-full overflow-hidden bg-background">
      {/* ── Left: Conversation history ──────────────────────────────────── */}
      <aside className="w-56 border-r border-border flex flex-col shrink-0 bg-background">
        <div className="p-3 border-b border-border">
          <Button size="sm" className="w-full gap-1.5 h-8 text-xs">
            <Plus className="w-3.5 h-3.5" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-2 pb-1.5">
            Recent
          </p>
          {CONVERSATION_HISTORY.map((h) => (
            <button
              key={h.id}
              onClick={() => setActiveConv(h.id)}
              className={`w-full text-left px-2 py-2 rounded-md text-xs transition-colors group ${
                activeConv === h.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare
                  className={`w-3 h-3 mt-0.5 shrink-0 ${
                    activeConv === h.id ? "text-primary" : "text-muted-foreground/50"
                  }`}
                />
                <div className="min-w-0">
                  <p className="truncate leading-tight">{h.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{h.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* ── Main chat ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">AI Copilot</p>
              <p className="text-[10px] text-emerald-500 leading-tight">
                ● Online — Connected to live data
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "ai" && (
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card border border-border text-foreground rounded-tl-sm"
                }`}
              >
                <div className="text-[13px] leading-relaxed">{msg.content}</div>
                <p
                  className={`text-[10px] mt-1.5 ${
                    msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>

              {msg.role === "user" && (
                <Avatar className="w-7 h-7 shrink-0 mt-0.5">
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
                    RK
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts */}
        <div className="px-5 pb-2.5 flex flex-wrap gap-1.5 shrink-0">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 pb-5 shrink-0">
          <div className="flex items-center gap-2 bg-muted/30 border border-border rounded-xl px-3.5 py-2 focus-within:border-primary/40 focus-within:bg-background transition-colors">
            <Sparkles className="w-4 h-4 text-muted-foreground shrink-0" />
            <Input
              placeholder="Ask AI..."
              className="border-0 bg-transparent h-7 text-sm focus-visible:ring-0 px-0 placeholder:text-muted-foreground"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={() => send()}
              disabled={!input.trim()}
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-1.5">
            AI Copilot can make mistakes. Verify critical data before taking action.
          </p>
        </div>
      </div>

      {/* ── Right: AI Insights ──────────────────────────────────────────────── */}
      <aside className="w-72 border-l border-border flex flex-col shrink-0 overflow-y-auto bg-background">
        <div className="px-4 py-3.5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">AI Insights</p>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Auto-generated from your live data
          </p>
        </div>

        <div className="flex-1 p-3 space-y-3">
          {AI_INSIGHTS.map((insight) => (
            <Card key={insight.id} className="border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-3.5 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-muted">
                    <insight.icon className={`w-3.5 h-3.5 ${insight.iconColor}`} />
                  </div>
                  <p className="text-xs font-semibold text-foreground">{insight.title}</p>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{insight.body}</p>
                <button className="flex items-center gap-1 text-[11px] text-primary font-medium hover:underline">
                  {insight.action}
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </aside>
    </div>
  );
}
