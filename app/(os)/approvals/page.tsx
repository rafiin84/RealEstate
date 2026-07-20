"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  Filter,
  Calendar,
  User,
  FileText,
  Percent,
  BanknoteIcon,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ApprovalType = "Discount" | "Cancellation" | "Document" | "Payment";
type ApprovalStatus = "Pending" | "Approved" | "Rejected";

interface Approval {
  id: string;
  title: string;
  requester: string;
  requesterInitials: string;
  requesterRole: string;
  date: string;
  type: ApprovalType;
  description: string;
  amount?: string;
  urgency: "High" | "Medium" | "Low";
  project: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const APPROVALS: Approval[] = [
  {
    id: "ap1",
    title: "5% Discount for Rohit Bajaj — Unit B-802",
    requester: "Vikram Singh",
    requesterInitials: "VS",
    requesterRole: "Sales Manager",
    date: "Today, 10:15 AM",
    type: "Discount",
    description:
      "Customer Rohit Bajaj is requesting a 5% discount (₹6.8 L) on Unit B-802, Prestige Heights citing competing offer from Godrej Properties. The unit has been blocked for 8 days. Sales team recommends approval to prevent loss of booking.",
    amount: "₹6.8 L",
    urgency: "High",
    project: "Prestige Heights",
  },
  {
    id: "ap2",
    title: "Booking Cancellation — Meera Krishnan, Unit 3A-402",
    requester: "Riya Kapoor",
    requesterInitials: "RK",
    requesterRole: "CRM Executive",
    date: "Today, 8:40 AM",
    type: "Cancellation",
    description:
      "Meera Krishnan has submitted a formal cancellation request for Unit 3A-402, Skyline Villas due to personal financial constraints. Token amount of ₹2.5 L received. Per cancellation policy, 25% deduction applies. Please approve to initiate refund.",
    amount: "₹1.875 L refund",
    urgency: "Medium",
    project: "Skyline Villas",
  },
  {
    id: "ap3",
    title: "Sale Agreement — Ankit Sharma, Unit C-101",
    requester: "Nikhil Joshi",
    requesterInitials: "NJ",
    requesterRole: "Legal Executive",
    date: "Yesterday, 4:20 PM",
    type: "Document",
    description:
      "Sale agreement draft for Ankit Sharma (Unit C-101, Central Square) is ready for final sign-off. Legal team has reviewed all clauses. Stamp duty and registration charges of ₹3.2 L collected. Agreement date to be set as today.",
    urgency: "High",
    project: "Central Square",
  },
  {
    id: "ap4",
    title: "Extended Payment Plan — Deepak Agarwal",
    requester: "Rahul Khanna",
    requesterInitials: "RH",
    requesterRole: "Finance Manager",
    date: "Yesterday, 11:00 AM",
    type: "Payment",
    description:
      "Deepak Agarwal (Unit A-501, Prestige Heights) has requested a 60-day extension on the ₹18 L installment due on Jul 15. He has paid 70% of total cost. Finance recommends approval with 2% late payment surcharge.",
    amount: "₹18 L (due)",
    urgency: "Medium",
    project: "Prestige Heights",
  },
  {
    id: "ap5",
    title: "Additional 2% Discount — Sunita Rao, Plot 34",
    requester: "Arun Mehta",
    requesterInitials: "AM",
    requesterRole: "Channel Partner Manager",
    date: "Jul 18, 3:30 PM",
    type: "Discount",
    description:
      "Channel partner PropConnect is requesting an additional 2% discount for Sunita Rao on Plot 34, Green Valley Plots. Customer is a first-time buyer and PropConnect promises 3 more referrals in Q3. This will reduce margin by ₹1.2 L.",
    amount: "₹1.2 L",
    urgency: "Low",
    project: "Green Valley Plots",
  },
];

// ─── Config ───────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  ApprovalType,
  { label: string; bgColor: string; textColor: string; icon: React.ComponentType<{ className?: string }> }
> = {
  Discount: {
    label: "Discount",
    bgColor: "bg-purple-100 dark:bg-purple-950/40",
    textColor: "text-purple-700 dark:text-purple-300",
    icon: Percent,
  },
  Cancellation: {
    label: "Cancellation",
    bgColor: "bg-rose-100 dark:bg-rose-950/40",
    textColor: "text-rose-700 dark:text-rose-300",
    icon: XCircle,
  },
  Document: {
    label: "Document",
    bgColor: "bg-blue-100 dark:bg-blue-950/40",
    textColor: "text-blue-700 dark:text-blue-300",
    icon: FileText,
  },
  Payment: {
    label: "Payment",
    bgColor: "bg-amber-100 dark:bg-amber-950/40",
    textColor: "text-amber-700 dark:text-amber-300",
    icon: BanknoteIcon,
  },
};

const URGENCY_CONFIG: Record<
  "High" | "Medium" | "Low",
  { dot: string; label: string }
> = {
  High: { dot: "bg-rose-500", label: "High Priority" },
  Medium: { dot: "bg-amber-500", label: "Medium Priority" },
  Low: { dot: "bg-emerald-500", label: "Low Priority" },
};

const STATS = [
  { label: "Pending", value: 5, icon: Clock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30" },
  { label: "Approved this week", value: 12, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { label: "Rejected", value: 3, icon: XCircle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/30" },
];

const TYPE_FILTERS: Array<ApprovalType | "All"> = ["All", "Discount", "Cancellation", "Document", "Payment"];

// ─── Approval Card ────────────────────────────────────────────────────────────

function ApprovalCard({
  approval,
  onApprove,
  onReject,
}: {
  approval: Approval;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const typeConf = TYPE_CONFIG[approval.type];
  const urgencyConf = URGENCY_CONFIG[approval.urgency];
  const TypeIcon = typeConf.icon;

  return (
    <Card className="border-border hover:shadow-sm transition-shadow">
      <CardHeader className="pb-0 pt-4 px-4">
        <div className="flex items-start gap-3">
          {/* Requester Avatar */}
          <Avatar className="w-9 h-9 shrink-0 mt-0.5">
            <AvatarFallback
              className="text-xs font-semibold bg-primary/10 text-primary"
            >
              {approval.requesterInitials}
            </AvatarFallback>
          </Avatar>

          {/* Header info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-foreground leading-tight pr-2">
                {approval.title}
              </h3>
              {/* Type badge */}
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${typeConf.bgColor} ${typeConf.textColor}`}
              >
                <TypeIcon className="w-3 h-3" />
                {typeConf.label}
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <User className="w-3 h-3" />
                {approval.requester} · {approval.requesterRole}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {approval.date}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <span className={`w-1.5 h-1.5 rounded-full ${urgencyConf.dot}`} />
                {urgencyConf.label}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pt-3 pb-4">
        {/* Project tag */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="text-[11px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
            {approval.project}
          </span>
          {approval.amount && (
            <span className="text-[11px] font-semibold text-foreground bg-muted/50 px-2 py-0.5 rounded-md">
              {approval.amount}
            </span>
          )}
        </div>

        {/* Description */}
        <p className={`text-xs text-muted-foreground leading-relaxed ${!expanded ? "line-clamp-2" : ""}`}>
          {approval.description}
        </p>
        {approval.description.length > 120 && (
          <button
            className="text-[11px] text-primary mt-1 hover:underline flex items-center gap-0.5"
            onClick={() => setExpanded((p) => !p)}
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronDown
              className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-3.5">
          <Button
            size="sm"
            className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 flex-1"
            onClick={() => onApprove(approval.id)}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-900 dark:hover:bg-rose-950/50 gap-1.5 flex-1"
            onClick={() => onReject(approval.id)}
          >
            <XCircle className="w-3.5 h-3.5" />
            Reject
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs gap-1.5 shrink-0"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ApprovalsPage() {
  const [activeFilter, setActiveFilter] = useState<ApprovalType | "All">("All");
  const [approvals, setApprovals] = useState<Approval[]>(APPROVALS);
  const [processed, setProcessed] = useState<Record<string, ApprovalStatus>>({});

  const filtered = approvals.filter(
    (a) => activeFilter === "All" || a.type === activeFilter
  );

  const handleApprove = (id: string) => {
    setProcessed((p) => ({ ...p, [id]: "Approved" }));
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReject = (id: string) => {
    setProcessed((p) => ({ ...p, [id]: "Rejected" }));
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const pendingCount = approvals.length;
  const approvedCount = 12 + Object.values(processed).filter((s) => s === "Approved").length;
  const rejectedCount = 3 + Object.values(processed).filter((s) => s === "Rejected").length;

  const dynamicStats = [
    { label: "Pending", value: pendingCount, icon: Clock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30" },
    { label: "Approved this week", value: approvedCount, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
    { label: "Rejected", value: rejectedCount, icon: XCircle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/30" },
  ];

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Approvals</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Review and action pending approval requests
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs shrink-0">
            <Filter className="w-3.5 h-3.5" />
            More Filters
          </Button>
        </div>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {dynamicStats.map((stat) => (
            <Card key={stat.label} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                    <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground leading-tight">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Filters ──────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 flex-wrap">
          {TYPE_FILTERS.map((type) => {
            const count =
              type === "All"
                ? approvals.length
                : approvals.filter((a) => a.type === type).length;
            return (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  activeFilter === type
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {type}
                <span
                  className={`text-[10px] font-medium px-1.5 py-0 rounded-full ${
                    activeFilter === type
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Approval Cards ───────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">All caught up!</p>
            <p className="text-xs text-muted-foreground mt-1">
              No pending approvals
              {activeFilter !== "All" ? ` for ${activeFilter}` : ""}.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((approval) => (
              <ApprovalCard
                key={approval.id}
                approval={approval}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}

        {/* ── Info Banner ──────────────────────────────────────────────────── */}
        <div className="flex items-start gap-2.5 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            All approvals are logged and auditable. Approved discounts above 5% require
            secondary sign-off from the VP of Sales per company policy.
          </p>
        </div>
      </div>
    </div>
  );
}
