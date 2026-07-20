"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Map, Building2, Layers, HardHat, Users, TrendingUp,
  Calculator, Megaphone, Handshake, Share2, HeartHandshake, KeyRound,
  ShieldCheck, Wrench, Wallet, CreditCard, Landmark, Scale, ClipboardCheck,
  Truck, PieChart, Store, BarChart3, Sparkles, HardDrive, Settings2,
  Search, Heart, FolderOpen, MapPin, FileText, Gift, User, ChevronLeft,
  ChevronRight, Building, ExternalLink, X, ChevronRight as ArrowRight,
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

interface SidebarProps {
  navGroups: NavGroup[];
  variant?: "os" | "buyer";
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ navGroups, variant = "os", mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const SidebarContent = (
    <aside className={cn(
      "flex flex-col h-full bg-white dark:bg-[#13132a]",
      "border-r border-border transition-all duration-300",
      collapsed ? "w-[72px]" : "w-[220px]"
    )}>

      {/* Logo */}
      <div className={cn(
        "flex items-center gap-2.5 px-5 h-[70px] border-b border-border shrink-0",
        collapsed && "justify-center px-0"
      )}>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Building className="w-4 h-4 text-primary" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-foreground leading-none truncate">
              {variant === "os" ? "Godrej Properties" : "Buyer Portal"}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">
              {variant === "os" ? "Enterprise" : "My Home"}
            </p>
          </div>
        )}
        <button
          onClick={onMobileClose}
          className="ml-auto lg:hidden p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-3 mb-2">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon];
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onMobileClose}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "group flex items-center rounded-xl text-[13px] font-medium transition-all duration-150",
                        collapsed
                          ? "justify-center w-10 h-10 mx-auto"
                          : "gap-3 px-3 py-2.5",
                        isActive
                          ? "bg-primary text-white shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      )}
                    >
                      {Icon && (
                        <Icon className={cn(
                          "shrink-0",
                          collapsed ? "w-[18px] h-[18px]" : "w-[17px] h-[17px]",
                          isActive ? "text-white" : "text-muted-foreground/70 group-hover:text-foreground"
                        )} />
                      )}
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                              isActive ? "bg-white/25 text-white" : "bg-primary/10 text-primary"
                            )}>
                              {item.badge}
                            </span>
                          )}
                          {isActive && <ArrowRight className="w-3.5 h-3.5 text-white/70 shrink-0" />}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User card + footer — like Jack Ryad at bottom in reference */}
      <div className="border-t border-border p-3 shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="text-[11px] font-bold bg-primary/10 text-primary">RK</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-foreground truncate leading-none">Rahul Khanna</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Sales Manager</p>
            </div>
          </div>
        )}
        <div className={cn(
          "flex gap-1",
          collapsed ? "flex-col items-center" : "flex-row"
        )}>
          <Link
            href={variant === "os" ? "/buyer/dashboard" : "/dashboard"}
            onClick={onMobileClose}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors",
              collapsed && "justify-center w-9 h-9"
            )}
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span className="truncate">{variant === "os" ? "Buyer Portal" : "Enterprise"}</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors",
              collapsed ? "justify-center w-9 h-9" : "ml-auto"
            )}
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}
      <div className="hidden lg:flex h-full shrink-0">{SidebarContent}</div>
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 lg:hidden flex h-full transition-transform duration-300 ease-in-out",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {SidebarContent}
      </div>
    </>
  );
}
