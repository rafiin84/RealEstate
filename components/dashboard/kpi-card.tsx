"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

const colorMap = {
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    icon: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200/50 dark:border-blue-500/20",
  },
  green: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    icon: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200/50 dark:border-emerald-500/20",
  },
  orange: {
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    icon: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200/50 dark:border-orange-500/20",
  },
  purple: {
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    icon: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200/50 dark:border-violet-500/20",
  },
  rose: {
    bg: "bg-rose-500/10 dark:bg-rose-500/15",
    icon: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200/50 dark:border-rose-500/20",
  },
  teal: {
    bg: "bg-teal-500/10 dark:bg-teal-500/15",
    icon: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200/50 dark:border-teal-500/20",
  },
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
  const colors = colorMap[color];
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-2xl font-bold tracking-tight mt-1 text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>
            )}
            <div className="flex items-center gap-1 mt-2">
              {isNeutral ? (
                <Minus className="w-3 h-3 text-muted-foreground" />
              ) : isPositive ? (
                <TrendingUp className="w-3 h-3 text-emerald-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-rose-500" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  isNeutral
                    ? "text-muted-foreground"
                    : isPositive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                )}
              >
                {isNeutral ? "—" : `${isPositive ? "+" : ""}${change}%`}
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          </div>
          <div className={cn("p-2.5 rounded-lg shrink-0", colors.bg)}>
            <div className={cn("w-5 h-5", colors.icon)}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
