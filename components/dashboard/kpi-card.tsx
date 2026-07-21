"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "orange" | "purple" | "rose" | "teal";
  sparkData?: number[];
  className?: string;
}

/* Inline mini sparkline data fallback */
const defaultSpark = [3, 5, 4, 6, 5, 8, 7, 9, 8, 10, 9, 12];

export function KPICard({
  title,
  value,
  subtitle,
  change,
  changeLabel = "vs last month",
  icon,
  sparkData,
  className,
}: KPICardProps) {
  const isPositive = change >= 0;
  const data = (sparkData ?? defaultSpark).map((v) => ({ v }));

  return (
    <div className={cn(
      "bg-white dark:bg-card rounded-2xl p-5 border border-border",
      "shadow-[0_1px_4px_rgba(0,0,0,0.04),0_4px_16px_rgba(123,113,245,0.05)]",
      "hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(123,113,245,0.08)] transition-shadow duration-200",
      "flex items-center justify-between gap-4",
      className
    )}>
      {/* Left: icon + value */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Dark circle icon — like the reference */}
        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <div className="w-5 h-5 text-primary">{icon}</div>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-muted-foreground truncate">{title}</p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <p className="text-2xl font-extrabold text-foreground tracking-tight leading-none">{value}</p>
            <span className={cn(
              "flex items-center gap-0.5 text-[11px] font-semibold",
              isPositive ? "text-emerald-500" : "text-rose-500"
            )}>
              {isPositive
                ? <TrendingUp className="w-3 h-3" />
                : <TrendingDown className="w-3 h-3" />
              }
              {isPositive ? "+" : ""}{change}%
            </span>
          </div>
          {subtitle && <p className="text-[10px] text-muted-foreground/60 mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>

      {/* Right: sparkline bars */}
      <div className="w-20 h-10 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={4} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Bar
              dataKey="v"
              radius={[2, 2, 0, 0]}
              fill="#c4beff"
              /* last bar gets darker purple like reference */
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
