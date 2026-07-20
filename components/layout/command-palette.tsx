"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard, Building2, Layers, Users, TrendingUp, Map, BarChart3,
  Sparkles, HardDrive, Wallet, CreditCard, HardHat, Settings2, Search,
} from "lucide-react";

const commands = [
  { group: "Navigation", label: "Executive Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { group: "Navigation", label: "Projects", href: "/projects", icon: Building2 },
  { group: "Navigation", label: "Inventory", href: "/inventory", icon: Layers },
  { group: "Navigation", label: "CRM & Leads", href: "/crm", icon: Users },
  { group: "Navigation", label: "Sales", href: "/sales", icon: TrendingUp },
  { group: "Navigation", label: "Land Bank", href: "/land-bank", icon: Map },
  { group: "Navigation", label: "Construction", href: "/construction", icon: HardHat },
  { group: "Navigation", label: "Finance", href: "/finance", icon: Wallet },
  { group: "Navigation", label: "Payments", href: "/payments", icon: CreditCard },
  { group: "Navigation", label: "Analytics", href: "/analytics", icon: BarChart3 },
  { group: "Navigation", label: "AI Copilot", href: "/ai-copilot", icon: Sparkles },
  { group: "Navigation", label: "Drive", href: "/drive", icon: HardDrive },
  { group: "Navigation", label: "Administration", href: "/administration", icon: Settings2 },
  { group: "Quick Actions", label: "Add New Lead", href: "/crm?action=new", icon: Users },
  { group: "Quick Actions", label: "Create Project", href: "/projects?action=new", icon: Building2 },
  { group: "Quick Actions", label: "View AI Insights", href: "/ai-copilot", icon: Sparkles },
  { group: "Apps", label: "Switch to Buyer OS", href: "/buyer/dashboard", icon: Search },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  const groups = [...new Set(commands.map((c) => c.group))];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="p-0 max-w-lg overflow-hidden">
        <Command>
          <CommandInput placeholder="Search pages, actions, people..." />
          <CommandList className="max-h-96">
            <CommandEmpty>No results found.</CommandEmpty>
            {groups.map((group, i) => (
              <div key={group}>
                {i > 0 && <CommandSeparator />}
                <CommandGroup heading={group}>
                  {commands
                    .filter((c) => c.group === group)
                    .map((cmd) => (
                      <CommandItem
                        key={cmd.href}
                        onSelect={() => handleSelect(cmd.href)}
                        className="gap-2"
                      >
                        <cmd.icon className="w-4 h-4 text-muted-foreground" />
                        {cmd.label}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </div>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
