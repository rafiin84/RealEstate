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
        "flex flex-col h-full transition-all duration-300 sidebar-gradient",
        collapsed ? "w-14" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-2.5 px-4 py-5 shrink-0",
        collapsed && "justify-center px-0"
      )}>
        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
          <Building className="w-4 h-4 text-[#5956E9]" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-bold text-white truncate leading-none">
              {variant === "os" ? "Godrej Properties" : "Buyer Portal"}
            </span>
            <span className="text-[10px] text-white/50 leading-none mt-0.5">
              {variant === "os" ? "Enterprise OS" : "My Home Journey"}
            </span>
          </div>
        )}
        {/* Mobile close */}
        <button
          onClick={onMobileClose}
          className="ml-auto lg:hidden p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 space-y-1 pb-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            {!collapsed && (
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/35 px-2 py-2">
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
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group",
                        isActive
                          ? "bg-white text-[#5956E9] shadow-sm"
                          : "text-white/65 hover:text-white hover:bg-white/12",
                        collapsed && "justify-center px-0 w-10 mx-auto"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {Icon && (
                        <Icon className={cn(
                          "w-4 h-4 shrink-0",
                          isActive ? "text-[#5956E9]" : "text-white/55 group-hover:text-white"
                        )} />
                      )}
                      {!collapsed && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}
                      {!collapsed && item.badge && (
                        <span className={cn(
                          "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                          isActive
                            ? "bg-[#5956E9]/15 text-[#5956E9]"
                            : "bg-white/20 text-white"
                        )}>
                          {item.badge}
                        </span>
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
      <div className={cn(
        "border-t border-white/10 p-3 space-y-0.5 shrink-0",
        collapsed && "px-2"
      )}>
        {variant === "os" && (
          <Link
            href="/buyer/dashboard"
            onClick={onMobileClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors",
              collapsed && "justify-center px-0 w-10 mx-auto"
            )}
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>Switch to Buyer Portal</span>}
          </Link>
        )}
        {variant === "buyer" && (
          <Link
            href="/dashboard"
            onClick={onMobileClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors",
              collapsed && "justify-center px-0 w-10 mx-auto"
            )}
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>Switch to Enterprise OS</span>}
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors",
            collapsed && "justify-center px-0 w-10 mx-auto"
          )}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Desktop sidebar — always visible */}
      <div className="hidden lg:flex h-full shrink-0">
        {SidebarContent}
      </div>

      {/* Mobile sidebar — slide-in drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 lg:hidden flex h-full transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {SidebarContent}
      </div>
    </>
  );
}
