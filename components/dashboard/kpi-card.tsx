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

const gradients = {
  blue:   "from-blue-500 to-blue-700",
  green:  "from-emerald-500 to-teal-600",
  purple: "from-violet-500 to-purple-700",
  orange: "from-orange-500 to-amber-600",
  rose:   "from-rose-500 to-pink-600",
  teal:   "from-cyan-500 to-teal-600",
};

const decorColors = {
  blue:   "bg-blue-400/20",
  green:  "bg-emerald-400/20",
  purple: "bg-violet-400/20",
  orange: "bg-orange-400/20",
  rose:   "bg-rose-400/20",
  teal:   "bg-cyan-400/20",
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

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-5 text-white shadow-lg shadow-black/10",
      "bg-gradient-to-br",
      gradients[color],
      className
    )}>
      {/* Decorative circles */}
      <div className={cn("absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-50", decorColors[color])} />
      <div className={cn("absolute -bottom-6 -right-2 w-32 h-32 rounded-full opacity-30", decorColors[color])} />

      {/* Icon */}
      <div className="relative flex items-start justify-between gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
          <div className="w-5 h-5 text-white">{icon}</div>
        </div>
        {/* Change badge */}
        <div className={cn(
          "flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-sm",
          isNeutral
            ? "bg-white/15 text-white/80"
            : isPositive
            ? "bg-white/20 text-white"
            : "bg-black/20 text-white/90"
        )}>
          {isNeutral ? (
            <Minus className="w-3 h-3" />
          ) : isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{isNeutral ? "—" : `${isPositive ? "+" : ""}${change}%`}</span>
        </div>
      </div>

      {/* Value */}
      <div className="relative">
        <p className="text-2xl font-bold tracking-tight leading-none">{value}</p>
        <p className="text-xs font-medium text-white/70 mt-1">{title}</p>
        {subtitle && (
          <p className="text-[11px] text-white/50 mt-0.5 truncate">{subtitle}</p>
        )}
        <p className="text-[10px] text-white/40 mt-2">{changeLabel}</p>
      </div>
    </div>
  );
}
