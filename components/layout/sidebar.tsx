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
  ChevronRight, Building, ExternalLink, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
    <aside
      className={cn(
        "flex flex-col h-full sidebar-surface bg-white dark:bg-[#17172a] transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[220px]"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-2.5 px-5 h-16 border-b border-border shrink-0",
        collapsed && "justify-center px-0"
      )}>
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Building className="w-4 h-4 text-primary" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-foreground truncate leading-none">
              {variant === "os" ? "Godrej Properties" : "Buyer Portal"}
            </p>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
              {variant === "os" ? "Enterprise OS" : "My Home"}
            </p>
          </div>
        )}
        {/* Mobile close */}
        <button
          onClick={onMobileClose}
          className="ml-auto lg:hidden p-1 rounded-lg text-muted-foreground hover:bg-muted"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60 px-2 mb-1.5">
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
                        "flex items-center gap-3 rounded-xl text-[13px] font-medium transition-all duration-150 group",
                        collapsed
                          ? "justify-center w-10 h-10 mx-auto"
                          : "px-3 py-2.5",
                        isActive
                          ? "bg-primary text-white shadow-sm shadow-primary/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {Icon && (
                        <Icon className={cn(
                          "shrink-0 transition-colors",
                          collapsed ? "w-[18px] h-[18px]" : "w-4 h-4",
                          isActive
                            ? "text-white"
                            : "text-muted-foreground group-hover:text-foreground"
                        )} />
                      )}
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center",
                              isActive
                                ? "bg-white/25 text-white"
                                : "bg-primary/10 text-primary"
                            )}>
                              {item.badge}
                            </span>
                          )}
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

      {/* Footer */}
      <div className={cn("border-t border-border p-3 space-y-0.5 shrink-0", collapsed && "px-2 flex flex-col items-center")}>
        <Link
          href={variant === "os" ? "/buyer/dashboard" : "/dashboard"}
          onClick={onMobileClose}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            collapsed && "justify-center px-0 w-10"
          )}
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          {!collapsed && (
            <span>{variant === "os" ? "Switch to Buyer Portal" : "Switch to Enterprise OS"}</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            collapsed && "justify-center px-0 w-10"
          )}
        >
          {collapsed
            ? <ChevronRight className="w-3.5 h-3.5" />
            : <ChevronLeft className="w-3.5 h-3.5" />
          }
          {!collapsed && <span>Collapse sidebar</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-full shrink-0">
        {SidebarContent}
      </div>

      {/* Mobile drawer */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 lg:hidden flex h-full transition-transform duration-300 ease-in-out",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {SidebarContent}
      </div>
    </>
  );
}
