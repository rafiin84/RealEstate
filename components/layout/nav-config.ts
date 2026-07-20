"use client";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const osNavGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Executive Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    ],
  },
  {
    label: "Land & Projects",
    items: [
      { label: "Land Bank", href: "/land-bank", icon: "Map" },
      { label: "Projects", href: "/projects", icon: "Building2" },
      { label: "Inventory", href: "/inventory", icon: "Layers" },
      { label: "Construction", href: "/construction", icon: "HardHat" },
    ],
  },
  {
    label: "Revenue",
    items: [
      { label: "CRM", href: "/crm", icon: "Users", badge: "12" },
      { label: "Sales", href: "/sales", icon: "TrendingUp" },
      { label: "Pricing Engine", href: "/pricing", icon: "Calculator" },
      { label: "Marketing", href: "/marketing", icon: "Megaphone" },
      { label: "Channel Partners", href: "/channel-partners", icon: "Handshake" },
      { label: "Referrals", href: "/referrals", icon: "Share2" },
    ],
  },
  {
    label: "Customer",
    items: [
      { label: "Customer Success", href: "/customer-success", icon: "HeartHandshake" },
      { label: "Possession", href: "/possession", icon: "KeyRound" },
      { label: "Warranty", href: "/warranty", icon: "ShieldCheck" },
      { label: "Facility Management", href: "/facility", icon: "Wrench" },
    ],
  },
  {
    label: "Finance & Legal",
    items: [
      { label: "Finance", href: "/finance", icon: "Wallet" },
      { label: "Payments", href: "/payments", icon: "CreditCard" },
      { label: "Loans", href: "/loans", icon: "Landmark" },
      { label: "Legal", href: "/legal", icon: "Scale" },
      { label: "Approvals", href: "/approvals", icon: "ClipboardCheck", badge: "5" },
    ],
  },
  {
    label: "Partners & Investors",
    items: [
      { label: "Vendors", href: "/vendors", icon: "Truck" },
      { label: "Investor Relations", href: "/investors", icon: "PieChart" },
      { label: "Commercial Leasing", href: "/leasing", icon: "Store" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { label: "Analytics", href: "/analytics", icon: "BarChart3" },
      { label: "AI Copilot", href: "/ai-copilot", icon: "Sparkles" },
      { label: "Drive", href: "/drive", icon: "HardDrive" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Administration", href: "/administration", icon: "Settings2" },
    ],
  },
];

export const buyerNavGroups: NavGroup[] = [
  {
    label: "Home",
    items: [
      { label: "My Dashboard", href: "/buyer/dashboard", icon: "LayoutDashboard" },
      { label: "Discover", href: "/buyer/discover", icon: "Search" },
    ],
  },
  {
    label: "My Properties",
    items: [
      { label: "Saved Properties", href: "/buyer/saved", icon: "Heart" },
      { label: "My Drive", href: "/buyer/drive", icon: "FolderOpen" },
      { label: "Site Visits", href: "/buyer/visits", icon: "MapPin" },
    ],
  },
  {
    label: "Buying Journey",
    items: [
      { label: "Loan Centre", href: "/buyer/loans", icon: "Landmark" },
      { label: "Bookings", href: "/buyer/bookings", icon: "FileText" },
      { label: "Payments", href: "/buyer/payments", icon: "CreditCard" },
    ],
  },
  {
    label: "Perks",
    items: [
      { label: "Referrals & Rewards", href: "/buyer/referrals", icon: "Gift" },
      { label: "My Profile", href: "/buyer/profile", icon: "User" },
    ],
  },
];
