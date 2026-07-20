"use client";

import { useState } from "react";
import { Bell, Search, Moon, Sun, MessageSquare, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut, User, HelpCircle, ChevronDown } from "lucide-react";
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
      <header className="h-[70px] border-b border-border bg-card flex items-center px-6 shrink-0 z-20 gap-4">

        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Welcome text */}
        <div className="hidden md:block min-w-0">
          <p className="text-[16px] font-bold text-foreground leading-tight">
            {variant === "os" ? "Welcome back, Rahul!" : "Welcome back, Ramesh!"}
          </p>
          <p className="text-[12px] text-muted-foreground">
            {variant === "os"
              ? "You have 3 new leads assigned today."
              : "Your site visit is scheduled for tomorrow."}
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Icon buttons — dark circles like reference */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCommandOpen(true)}
            className="w-10 h-10 rounded-full bg-foreground/90 dark:bg-foreground/10 flex items-center justify-center text-white dark:text-foreground hover:opacity-80 transition-opacity"
          >
            <Search className="w-4 h-4" />
          </button>

          <div className="relative">
            <button className="w-10 h-10 rounded-full bg-foreground/90 dark:bg-foreground/10 flex items-center justify-center text-white dark:text-foreground hover:opacity-80 transition-opacity">
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-card" />
          </div>

          <button
            onClick={toggleDark}
            className="w-10 h-10 rounded-full bg-foreground/90 dark:bg-foreground/10 flex items-center justify-center text-white dark:text-foreground hover:opacity-80 transition-opacity"
          >
            {dark ? <Sun className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
          </button>

          {/* Purple CTA — "Create Report" like "Create new order" */}
          <Button
            className="h-10 px-5 rounded-full bg-primary text-white font-semibold text-[13px] hover:bg-primary/90 hidden sm:flex gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">
              {variant === "os" ? "Add Project" : "Schedule Visit"}
            </span>
          </Button>

          <div className="w-px h-7 bg-border mx-1" />

          {/* User avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer border-0 bg-transparent rounded-2xl hover:bg-muted/50 px-1 py-1 transition-colors">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="text-[12px] font-bold bg-primary/10 text-primary">RK</AvatarFallback>
              </Avatar>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
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
