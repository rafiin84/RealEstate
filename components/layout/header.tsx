"use client";

import { useState } from "react";
import { Bell, Search, Moon, Sun, ChevronDown, Settings, LogOut, User, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
}

export function Header({ variant = "os" }: HeaderProps) {
  const [dark, setDark] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <header className="h-12 border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 z-20">
        {/* Left - Breadcrumb / Page title injected via layout */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-muted-foreground">
            {variant === "os" ? "Real Estate OS" : "Buyer OS"}
          </span>
        </div>

        {/* Center - Search trigger */}
        <button
          onClick={() => setCommandOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 border border-border text-sm text-muted-foreground hover:bg-muted transition-colors w-64"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 text-left text-xs">Search anything...</span>
          <kbd className="text-[10px] bg-background border border-border rounded px-1">⌘K</kbd>
        </button>

        {/* Right - Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleDark}>
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-md hover:bg-muted transition-colors ml-1 border-0 bg-transparent cursor-pointer">
              <Avatar className="w-7 h-7">
                <AvatarFallback className="text-[11px] font-semibold bg-primary text-primary-foreground">RK</AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium">Rahul Khanna</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">Rahul Khanna</p>
                <p className="text-xs text-muted-foreground">Sales Manager</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User className="w-4 h-4 mr-2" />Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="w-4 h-4 mr-2" />Settings</DropdownMenuItem>
              <DropdownMenuItem><HelpCircle className="w-4 h-4 mr-2" />Help</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive"><LogOut className="w-4 h-4 mr-2" />Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
