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
  blue:   { bg: "from-[#5956E9] to-[#4338ca]",  accent: "text-indigo-200/80" },
  green:  { bg: "from-emerald-600 to-teal-500",  accent: "text-emerald-100/80" },
  purple: { bg: "from-[#5956E9] to-[#7c3aed]",  accent: "text-violet-200/80" },
  rose:   { bg: "from-rose-600 to-pink-500",     accent: "text-rose-100/80" },
  orange: { bg: "from-orange-500 to-amber-400",  accent: "text-orange-100/80" },
  teal:   { bg: "from-teal-600 to-cyan-500",     accent: "text-teal-100/80" },
  slate:  { bg: "from-[#5956E9] to-[#4338ca]",  accent: "text-indigo-100/80" },
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
