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
      <header className="h-13 border-b border-border bg-white/80 dark:bg-background/80 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-20 gap-3">
        {/* Left — hamburger (mobile) + breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="w-4.5 h-4.5" />
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-sm">
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              {variant === "os" ? "Godrej Properties" : "Buyer Portal"}
            </span>
          </div>
        </div>

        {/* Center — search */}
        <button
          onClick={() => setCommandOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60 border border-border/60 text-sm text-muted-foreground hover:bg-muted hover:border-border transition-all w-52 md:w-72"
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span className="flex-1 text-left text-xs">Search anything...</span>
          <kbd className="hidden md:inline text-[10px] bg-background border border-border rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
        </button>

        {/* Right — actions */}
        <div className="flex items-center gap-1">
          {/* Mobile search */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden h-8 w-8"
            onClick={() => setCommandOpen(true)}
          >
            <Search className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={toggleDark}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 relative text-muted-foreground hover:text-foreground">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full ring-2 ring-background" />
          </Button>

          <div className="w-px h-5 bg-border mx-0.5" />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-xl hover:bg-muted transition-colors ml-0.5 border-0 bg-transparent cursor-pointer">
              <Avatar className="w-7 h-7 ring-2 ring-indigo-500/30">
                <AvatarFallback className="text-[11px] font-bold bg-gradient-to-br from-indigo-500 to-violet-600 text-white">RK</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start leading-none">
                <span className="text-[12px] font-semibold">Rahul Khanna</span>
                <span className="text-[10px] text-muted-foreground">Sales Manager</span>
              </div>
              <ChevronDown className="w-3 h-3 text-muted-foreground hidden md:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <div className="px-3 py-2 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-t-md border-b border-border">
                <p className="text-sm font-semibold">Rahul Khanna</p>
                <p className="text-xs text-muted-foreground">rahul.khanna@godrejproperties.com</p>
              </div>
              <DropdownMenuItem className="gap-2 mt-1"><User className="w-3.5 h-3.5" />Profile</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Settings className="w-3.5 h-3.5" />Settings</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><HelpCircle className="w-3.5 h-3.5" />Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive"><LogOut className="w-3.5 h-3.5" />Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
