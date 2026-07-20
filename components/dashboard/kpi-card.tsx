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
  blue:   "from-[#5956E9] to-[#4338ca]",
  green:  "from-emerald-500 to-teal-600",
  purple: "from-violet-500 to-purple-600",
  orange: "from-orange-500 to-amber-500",
  rose:   "from-rose-500 to-pink-600",
  teal:   "from-cyan-500 to-teal-500",
};

const glows = {
  blue:   "shadow-[#5956E9]/25",
  green:  "shadow-emerald-500/20",
  purple: "shadow-violet-500/20",
  orange: "shadow-orange-500/20",
  rose:   "shadow-rose-500/20",
  teal:   "shadow-cyan-500/20",
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
      "relative overflow-hidden rounded-2xl p-5 text-white shadow-lg",
      "bg-gradient-to-br",
      gradients[color],
      glows[color],
      className
    )}>
      {/* Decorative circle top-right */}
      <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -right-4 w-32 h-32 rounded-full bg-white/8" />

      {/* Top row: icon + change badge */}
      <div className="relative flex items-start justify-between gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <div className="w-5 h-5 text-white">{icon}</div>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold",
          isNeutral
            ? "bg-white/15 text-white/80"
            : isPositive
            ? "bg-white/25 text-white"
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

      {/* Value + label */}
      <div className="relative">
        <p className="text-2xl font-extrabold tracking-tight leading-none">{value}</p>
        <p className="text-xs font-semibold text-white/75 mt-1.5">{title}</p>
        {subtitle && <p className="text-[11px] text-white/50 mt-0.5 truncate">{subtitle}</p>}
        <p className="text-[10px] text-white/40 mt-2">{changeLabel}</p>
      </div>
    </div>
  );
}
