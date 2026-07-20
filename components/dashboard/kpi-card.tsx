"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "orange" | "purple" | "rose" | "teal";
  className?: string;
}

/* Light-tinted card style — matches Dropify reference */
const colorTokens = {
  blue:   { icon: "bg-primary/10 text-primary",           change: "text-primary",          dot: "bg-primary" },
  green:  { icon: "bg-emerald-100 text-emerald-600",       change: "text-emerald-600",      dot: "bg-emerald-500" },
  purple: { icon: "bg-violet-100 text-violet-600",         change: "text-violet-600",       dot: "bg-violet-500" },
  orange: { icon: "bg-orange-100 text-orange-600",         change: "text-orange-600",       dot: "bg-orange-500" },
  rose:   { icon: "bg-rose-100 text-rose-600",             change: "text-rose-600",         dot: "bg-rose-500" },
  teal:   { icon: "bg-cyan-100 text-cyan-600",             change: "text-cyan-600",         dot: "bg-cyan-500" },
};

export function KPICard({
  title,
  value,
  subtitle,
  change,
  changeLabel = "vs last period",
  icon,
  color = "blue",
  className,
}: KPICardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;
  const t = colorTokens[color];

  return (
    <div className={cn(
      "bg-card rounded-2xl p-5 border border-border",
      "shadow-[0_2px_8px_rgba(124,111,247,0.06)]",
      "hover:shadow-[0_4px_16px_rgba(124,111,247,0.10)] transition-shadow duration-200",
      className
    )}>
      {/* Top row: icon + change */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", t.icon)}>
          <div className="w-5 h-5">{icon}</div>
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full",
          isNeutral
            ? "bg-muted text-muted-foreground"
            : isPositive
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-600"
        )}>
          {isNeutral
            ? <Minus className="w-3 h-3" />
            : isPositive
            ? <TrendingUp className="w-3 h-3" />
            : <TrendingDown className="w-3 h-3" />
          }
          <span>{isNeutral ? "—" : `${isPositive ? "+" : ""}${change}%`}</span>
        </div>
      </div>

      {/* Value */}
      <p className="text-2xl font-extrabold text-foreground tracking-tight leading-none">{value}</p>
      <p className="text-xs font-medium text-muted-foreground mt-1.5">{title}</p>
      {subtitle && <p className="text-[11px] text-muted-foreground/60 mt-0.5 truncate">{subtitle}</p>}
      <p className="text-[10px] text-muted-foreground/50 mt-2">{changeLabel}</p>
    </div>
  );
}
