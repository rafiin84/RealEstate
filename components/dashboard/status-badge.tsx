"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusVariant =
  | "available"
  | "blocked"
  | "booked"
  | "agreement"
  | "registered"
  | "cancelled"
  | "under-construction"
  | "ready"
  | "planning"
  | "approved"
  | "completed"
  | "hot"
  | "new"
  | "contacted"
  | "site-visit"
  | "negotiation"
  | "lost"
  | "active"
  | "inactive"
  | "pending";

const variantConfig: Record<StatusVariant, { label: string; className: string }> = {
  available: { label: "Available", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-0" },
  blocked: { label: "Blocked", className: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-0" },
  booked: { label: "Booked", className: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border-0" },
  agreement: { label: "Agreement", className: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400 border-0" },
  registered: { label: "Registered", className: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400 border-0" },
  cancelled: { label: "Cancelled", className: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border-0" },
  "under-construction": { label: "Under Construction", className: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border-0" },
  ready: { label: "Ready to Move", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-0" },
  planning: { label: "Planning", className: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-400 border-0" },
  approved: { label: "Approved", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400 border-0" },
  completed: { label: "Completed", className: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400 border-0" },
  hot: { label: "Hot", className: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border-0" },
  new: { label: "New", className: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border-0" },
  contacted: { label: "Contacted", className: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400 border-0" },
  "site-visit": { label: "Site Visit", className: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400 border-0" },
  negotiation: { label: "Negotiation", className: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400 border-0" },
  lost: { label: "Lost", className: "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400 border-0" },
  active: { label: "Active", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-0" },
  inactive: { label: "Inactive", className: "bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400 border-0" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-0" },
};

interface StatusBadgeProps {
  status: StatusVariant | string;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const key = status.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-") as StatusVariant;
  const config = variantConfig[key];
  const displayLabel = label || config?.label || status;
  const displayClass = config?.className || "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-400 border-0";

  return (
    <Badge className={cn("text-xs font-medium px-2 py-0.5 rounded-full", displayClass, className)}>
      {displayLabel}
    </Badge>
  );
}
