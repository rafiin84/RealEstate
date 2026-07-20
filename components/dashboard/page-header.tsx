"use client";

import { cn } from "@/lib/utils";

type PageHeaderColor =
  | "blue" | "green" | "purple" | "rose" | "orange" | "teal" | "slate";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: PageHeaderColor;
  actions?: React.ReactNode;
  badge?: string;
  className?: string;
}

const colorMap: Record<PageHeaderColor, { bg: string; accent: string }> = {
  blue:   { bg: "from-blue-700 to-indigo-600",   accent: "text-blue-200/80" },
  green:  { bg: "from-emerald-700 to-teal-600",  accent: "text-emerald-200/80" },
  purple: { bg: "from-violet-700 to-purple-600", accent: "text-violet-200/80" },
  rose:   { bg: "from-rose-700 to-pink-600",     accent: "text-rose-200/80" },
  orange: { bg: "from-orange-600 to-amber-500",  accent: "text-orange-200/80" },
  teal:   { bg: "from-teal-700 to-cyan-600",     accent: "text-teal-200/80" },
  slate:  { bg: "from-slate-800 to-slate-600",   accent: "text-slate-200/80" },
};

export function PageHeader({
  title,
  subtitle,
  icon,
  color = "blue",
  actions,
  badge,
  className,
}: PageHeaderProps) {
  const c = colorMap[color];

  return (
    <div className={cn(
      "relative rounded-2xl overflow-hidden bg-gradient-to-br text-white p-5 md:p-6",
      c.bg,
      className
    )}>
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 90% 30%, rgba(255,255,255,0.9) 0%, transparent 55%)" }}
      />
      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-white/15 items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            {badge && (
              <div className={cn("text-[10px] font-bold uppercase tracking-wider mb-0.5", c.accent)}>
                {badge}
              </div>
            )}
            <h1 className="text-lg md:text-xl font-bold leading-tight">{title}</h1>
            {subtitle && (
              <p className={cn("text-sm mt-0.5", c.accent)}>{subtitle}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
    </div>
  );
}
