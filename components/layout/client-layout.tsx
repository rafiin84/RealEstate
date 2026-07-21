"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { osNavGroups, buyerNavGroups } from "./nav-config";

interface ClientLayoutProps {
  children: React.ReactNode;
  variant: "os" | "buyer";
}

export function ClientLayout({ children, variant }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navGroups = variant === "os" ? osNavGroups : buyerNavGroups;

  return (
    <div className="flex h-full">
      <Sidebar
        navGroups={navGroups}
        variant={variant}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          variant={variant}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-background pb-24 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav navGroups={navGroups} variant={variant} />
    </div>
  );
}
