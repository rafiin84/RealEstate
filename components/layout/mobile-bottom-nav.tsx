"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Map, Building2, Layers, HardHat, Users, TrendingUp,
  Calculator, Megaphone, Handshake, Share2, HeartHandshake, KeyRound,
  ShieldCheck, Wrench, Wallet, CreditCard, Landmark, Scale, ClipboardCheck,
  Truck, PieChart, Store, BarChart3, Sparkles, HardDrive, Settings2,
  Search, Heart, FolderOpen, MapPin, FileText, Gift, User, Building,
  MoreHorizontal, X, ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { NavGroup } from "./nav-config";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Map, Building2, Layers, HardHat, Users, TrendingUp,
  Calculator, Megaphone, Handshake, Share2, HeartHandshake, KeyRound,
  ShieldCheck, Wrench, Wallet, CreditCard, Landmark, Scale, ClipboardCheck,
  Truck, PieChart, Store, BarChart3, Sparkles, HardDrive, Settings2,
  Search, Heart, FolderOpen, MapPin, FileText, Gift, User, Building,
};

interface PinnedItem {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const osPinnedItems: PinnedItem[] = [
  { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
  { label: "Projects", href: "/projects", Icon: Building2 },
  { label: "CRM", href: "/crm", Icon: Users },
  { label: "Analytics", href: "/analytics", Icon: BarChart3 },
];

const buyerPinnedItems: PinnedItem[] = [
  { label: "Home", href: "/buyer/dashboard", Icon: LayoutDashboard },
  { label: "Discover", href: "/buyer/discover", Icon: Search },
  { label: "Bookings", href: "/buyer/bookings", Icon: FileText },
  { label: "Loans", href: "/buyer/loans", Icon: Landmark },
];

interface MobileBottomNavProps {
  navGroups: NavGroup[];
  variant: "os" | "buyer";
}

export function MobileBottomNav({ navGroups, variant }: MobileBottomNavProps) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const pinnedItems = variant === "os" ? osPinnedItems : buyerPinnedItems;

  return (
    <>
      {/* More sheet backdrop */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMoreOpen(false)}
        />
      )}

      {/* More bottom sheet */}
      <div className={cn(
        "fixed left-0 right-0 z-50 lg:hidden bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-in-out",
        moreOpen ? "translate-y-0" : "translate-y-full",
        "bottom-[65px]"
      )}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-2 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Building className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-foreground leading-none">
                {variant === "os" ? "Godrej Properties" : "Buyer Portal"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">All Sections</p>
            </div>
          </div>
          <button
            onClick={() => setMoreOpen(false)}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav groups — scrollable grid */}
        <div className="overflow-y-auto max-h-[55vh] px-4 py-3 space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-1 mb-2">
                {group.label}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon];
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-colors",
                        isActive
                          ? "bg-primary text-white"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {Icon && <Icon className="w-5 h-5 shrink-0" />}
                      <span className="text-[9px] font-medium leading-tight text-center line-clamp-2">
                        {item.label}
                      </span>
                      {item.badge && !isActive && (
                        <span className="text-[8px] font-bold bg-primary/10 text-primary px-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User card */}
        <div className="border-t border-border mx-4 my-3 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="text-[11px] font-bold bg-primary/10 text-primary">RK</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[12px] font-semibold text-foreground leading-none">Rahul Khanna</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Sales Manager</p>
            </div>
          </div>
          <Link
            href={variant === "os" ? "/buyer/dashboard" : "/dashboard"}
            onClick={() => setMoreOpen(false)}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            {variant === "os" ? "Buyer Portal" : "Enterprise"}
          </Link>
        </div>
      </div>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
        {/* Frosted glass pill container */}
        <div className="mx-3 mb-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_-2px_20px_rgba(0,0,0,0.08),0_4px_24px_rgba(0,0,0,0.12)] border border-white/60">
          <div className="flex items-center px-1 py-1">
            {pinnedItems.map(({ label, href, Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex flex-col items-center gap-1 flex-1 py-2 px-1 rounded-xl transition-all duration-200",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <div className={cn(
                    "w-10 h-7 rounded-xl flex items-center justify-center transition-all duration-200",
                    isActive ? "bg-primary/10" : ""
                  )}>
                    <Icon className={cn("w-[18px] h-[18px]", isActive && "text-primary")} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive ? "text-primary font-semibold" : "text-muted-foreground"
                  )}>
                    {label}
                  </span>
                </Link>
              );
            })}

            {/* More button */}
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={cn(
                "flex flex-col items-center gap-1 flex-1 py-2 px-1 rounded-xl transition-all duration-200",
                moreOpen ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "w-10 h-7 rounded-xl flex items-center justify-center transition-all duration-200",
                moreOpen ? "bg-primary/10" : ""
              )}>
                <MoreHorizontal className={cn("w-[18px] h-[18px]", moreOpen && "text-primary")} />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-colors",
                moreOpen ? "text-primary font-semibold" : "text-muted-foreground"
              )}>
                More
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
