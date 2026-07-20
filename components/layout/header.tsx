"use client";

import { useState } from "react";
import { Bell, Search, Moon, Sun, ChevronDown, Settings, LogOut, User, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CommandPalette } from "./command-palette";

interface HeaderProps {
  variant?: "os" | "buyer";
  onMenuClick?: () => void;
}

export function Header({ variant = "os", onMenuClick }: HeaderProps) {
  const [dark, setDark] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <header className="h-16 border-b border-border bg-card flex items-center px-5 shrink-0 z-20 gap-4">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Welcome text */}
        <div className="hidden md:block min-w-0">
          <p className="text-base font-bold text-foreground leading-none">
            {variant === "os" ? "Welcome back, Rahul!" : "Welcome back, Ramesh!"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {variant === "os" ? "Godrej Properties Enterprise" : "Buyer Portal"}
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search bar */}
        <button
          onClick={() => setCommandOpen(true)}
          className="hidden sm:flex items-center gap-2.5 px-4 h-9 rounded-2xl bg-muted border border-border text-xs text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all w-56 lg:w-72"
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span className="flex-1 text-left">Search anything...</span>
          <kbd className="hidden lg:inline text-[10px] bg-card border border-border rounded-md px-1.5 py-0.5 font-mono">⌘K</kbd>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* Mobile search */}
          <button
            onClick={() => setCommandOpen(true)}
            className="sm:hidden w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Dark mode */}
          <button
            onClick={toggleDark}
            className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-card" />
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-border mx-1" />

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-2xl hover:bg-muted transition-colors cursor-pointer border-0 bg-transparent">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-[11px] font-bold bg-primary/15 text-primary">RK</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start leading-none">
                <span className="text-[12px] font-semibold text-foreground">Rahul Khanna</span>
                <span className="text-[10px] text-muted-foreground">Sales Manager</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <div className="px-3 py-2.5 border-b border-border">
                <p className="text-sm font-semibold">Rahul Khanna</p>
                <p className="text-xs text-muted-foreground">rahul.khanna@godrejproperties.com</p>
              </div>
              <DropdownMenuItem className="gap-2 text-sm mt-1">
                <User className="w-3.5 h-3.5 text-muted-foreground" />Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-sm">
                <Settings className="w-3.5 h-3.5 text-muted-foreground" />Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-sm">
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />Help &amp; Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-sm text-destructive">
                <LogOut className="w-3.5 h-3.5" />Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
