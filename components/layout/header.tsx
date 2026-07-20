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
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 z-20 gap-3 shadow-sm">
        {/* Left — hamburger (mobile) + page title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-foreground">
              {variant === "os" ? "Godrej Properties" : "Buyer Portal"}
            </span>
          </div>
        </div>

        {/* Center — search bar */}
        <button
          onClick={() => setCommandOpen(true)}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border text-sm text-muted-foreground hover:border-primary/40 transition-all w-56 md:w-80"
        >
          <Search className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
          <span className="flex-1 text-left text-xs">Search anything...</span>
          <kbd className="hidden md:inline text-[10px] bg-card border border-border rounded px-1.5 py-0.5 font-mono text-muted-foreground">⌘K</kbd>
        </button>

        {/* Right — actions */}
        <div className="flex items-center gap-1">
          {/* Mobile search */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden h-8 w-8 text-muted-foreground"
            onClick={() => setCommandOpen(true)}
          >
            <Search className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={toggleDark}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <div className="relative">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted">
              <Bell className="w-4 h-4" />
            </Button>
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-card" />
          </div>

          <div className="w-px h-5 bg-border mx-1" />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-muted transition-colors cursor-pointer border-0 bg-transparent">
              <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                <AvatarFallback className="text-[11px] font-bold bg-gradient-to-br from-[#5956E9] to-[#7c3aed] text-white">RK</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start leading-none">
                <span className="text-[12px] font-semibold text-foreground">Rahul Khanna</span>
                <span className="text-[10px] text-muted-foreground">Sales Manager</span>
              </div>
              <ChevronDown className="w-3 h-3 text-muted-foreground hidden md:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <div className="px-3 py-2.5 bg-gradient-to-r from-primary/8 to-violet-500/8 rounded-t-md border-b border-border">
                <p className="text-sm font-semibold">Rahul Khanna</p>
                <p className="text-xs text-muted-foreground">rahul.khanna@godrejproperties.com</p>
              </div>
              <DropdownMenuItem className="gap-2 mt-1 text-sm"><User className="w-3.5 h-3.5" />Profile</DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-sm"><Settings className="w-3.5 h-3.5" />Settings</DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-sm"><HelpCircle className="w-3.5 h-3.5" />Help &amp; Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-sm text-destructive"><LogOut className="w-3.5 h-3.5" />Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
