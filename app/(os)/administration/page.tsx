"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Users,
  ShieldCheck,
  Settings,
  Activity,
  Plus,
  Download,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  Unlock,
  Globe,
  Bell,
  Database,
  Mail,
  Key,
  UserCog,
  Trash2,
  Edit,
  LogIn,
  LogOut,
  RefreshCw,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role =
  | "Super Admin"
  | "Admin"
  | "Sales Manager"
  | "Sales Executive"
  | "Finance Manager"
  | "CRM Manager"
  | "View Only";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  status: "Active" | "Inactive" | "Suspended";
  lastLogin: string;
  mfaEnabled: boolean;
}

interface ActivityLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ip: string;
  status: "Success" | "Failed" | "Warning";
}

// ─── Constants ────────────────────────────────────────────────────────────────

const KPI_DATA = [
  { label: "Total Users", value: "48", sub: "Across all roles", icon: Users, color: "#6366f1" },
  { label: "Active Sessions", value: "12", sub: "Right now", icon: Activity, color: "#22c55e" },
  { label: "Roles Defined", value: "7", sub: "With RBAC policies", icon: ShieldCheck, color: "#06b6d4" },
  { label: "Pending Invites", value: "3", sub: "Awaiting acceptance", icon: Clock, color: "#f59e0b" },
];

const USERS: User[] = [
  {
    id: "USR-001",
    name: "Rahul Khanna",
    email: "rahul.k@company.com",
    role: "Super Admin",
    department: "Technology",
    status: "Active",
    lastLogin: "2h ago",
    mfaEnabled: true,
  },
  {
    id: "USR-002",
    name: "Vikram Singh",
    email: "vikram.s@company.com",
    role: "Sales Manager",
    department: "Sales",
    status: "Active",
    lastLogin: "4h ago",
    mfaEnabled: true,
  },
  {
    id: "USR-003",
    name: "Riya Kapoor",
    email: "riya.k@company.com",
    role: "CRM Manager",
    department: "CRM",
    status: "Active",
    lastLogin: "1d ago",
    mfaEnabled: false,
  },
  {
    id: "USR-004",
    name: "Nikhil Joshi",
    email: "nikhil.j@company.com",
    role: "Sales Executive",
    department: "Sales",
    status: "Active",
    lastLogin: "3h ago",
    mfaEnabled: false,
  },
  {
    id: "USR-005",
    name: "Priya Sharma",
    email: "priya.s@company.com",
    role: "Finance Manager",
    department: "Finance",
    status: "Active",
    lastLogin: "6h ago",
    mfaEnabled: true,
  },
  {
    id: "USR-006",
    name: "Deepak Verma",
    email: "deepak.v@company.com",
    role: "Admin",
    department: "Operations",
    status: "Inactive",
    lastLogin: "7d ago",
    mfaEnabled: false,
  },
  {
    id: "USR-007",
    name: "Ananya Rao",
    email: "ananya.r@company.com",
    role: "View Only",
    department: "Investor Relations",
    status: "Active",
    lastLogin: "2d ago",
    mfaEnabled: false,
  },
  {
    id: "USR-008",
    name: "Suresh Babu",
    email: "suresh.b@company.com",
    role: "Sales Executive",
    department: "Sales",
    status: "Suspended",
    lastLogin: "14d ago",
    mfaEnabled: false,
  },
];

// Permissions matrix: role -> module -> [read, write, delete, approve]
const ROLES_PERMISSIONS: {
  role: Role;
  color: string;
  perms: Record<string, [boolean, boolean, boolean, boolean]>;
}[] = [
  {
    role: "Super Admin",
    color: "#6366f1",
    perms: {
      Dashboard: [true, true, true, true],
      CRM: [true, true, true, true],
      Sales: [true, true, true, true],
      Finance: [true, true, true, true],
      Inventory: [true, true, true, true],
      "User Mgmt": [true, true, true, true],
    },
  },
  {
    role: "Admin",
    color: "#06b6d4",
    perms: {
      Dashboard: [true, true, false, true],
      CRM: [true, true, true, true],
      Sales: [true, true, true, true],
      Finance: [true, true, false, true],
      Inventory: [true, true, true, false],
      "User Mgmt": [true, true, false, false],
    },
  },
  {
    role: "Sales Manager",
    color: "#22c55e",
    perms: {
      Dashboard: [true, false, false, false],
      CRM: [true, true, false, true],
      Sales: [true, true, true, true],
      Finance: [true, false, false, false],
      Inventory: [true, false, false, false],
      "User Mgmt": [false, false, false, false],
    },
  },
  {
    role: "Sales Executive",
    color: "#a78bfa",
    perms: {
      Dashboard: [true, false, false, false],
      CRM: [true, true, false, false],
      Sales: [true, true, false, false],
      Finance: [false, false, false, false],
      Inventory: [true, false, false, false],
      "User Mgmt": [false, false, false, false],
    },
  },
  {
    role: "Finance Manager",
    color: "#f59e0b",
    perms: {
      Dashboard: [true, false, false, false],
      CRM: [true, false, false, false],
      Sales: [true, false, false, false],
      Finance: [true, true, true, true],
      Inventory: [true, false, false, false],
      "User Mgmt": [false, false, false, false],
    },
  },
  {
    role: "View Only",
    color: "#94a3b8",
    perms: {
      Dashboard: [true, false, false, false],
      CRM: [true, false, false, false],
      Sales: [true, false, false, false],
      Finance: [false, false, false, false],
      Inventory: [true, false, false, false],
      "User Mgmt": [false, false, false, false],
    },
  },
];

const MODULES = ["Dashboard", "CRM", "Sales", "Finance", "Inventory", "User Mgmt"];
const PERM_LABELS = ["Read", "Write", "Delete", "Approve"];

const ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "LOG-001",
    user: "Rahul Khanna",
    action: "User Created",
    resource: "USR-008 (Suresh Babu)",
    timestamp: "Jul 20, 2026 10:42 AM",
    ip: "192.168.1.12",
    status: "Success",
  },
  {
    id: "LOG-002",
    user: "Vikram Singh",
    action: "Login",
    resource: "Portal",
    timestamp: "Jul 20, 2026 09:15 AM",
    ip: "103.81.44.9",
    status: "Success",
  },
  {
    id: "LOG-003",
    user: "Suresh Babu",
    action: "Login Attempt",
    resource: "Portal",
    timestamp: "Jul 20, 2026 08:30 AM",
    ip: "49.36.112.5",
    status: "Failed",
  },
  {
    id: "LOG-004",
    user: "Priya Sharma",
    action: "Export",
    resource: "Payments Report Q1",
    timestamp: "Jul 19, 2026 05:20 PM",
    ip: "192.168.1.18",
    status: "Success",
  },
  {
    id: "LOG-005",
    user: "Rahul Khanna",
    action: "Role Modified",
    resource: "Deepak Verma → Inactive",
    timestamp: "Jul 19, 2026 03:10 PM",
    ip: "192.168.1.12",
    status: "Warning",
  },
  {
    id: "LOG-006",
    user: "Riya Kapoor",
    action: "Logout",
    resource: "Portal",
    timestamp: "Jul 19, 2026 06:45 PM",
    ip: "192.168.1.21",
    status: "Success",
  },
  {
    id: "LOG-007",
    user: "Nikhil Joshi",
    action: "Data Export",
    resource: "Lead List — Prestige Heights",
    timestamp: "Jul 19, 2026 11:00 AM",
    ip: "192.168.1.34",
    status: "Success",
  },
];

const SYSTEM_SETTINGS = [
  {
    icon: Globe,
    title: "Domain & SSL",
    desc: "Manage custom domain and SSL certificates",
    color: "#6366f1",
    status: "Configured",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Email, SMS & push notification preferences",
    color: "#f59e0b",
    status: "Active",
  },
  {
    icon: Database,
    title: "Data Backup",
    desc: "Automated backups every 24h — last: 2h ago",
    color: "#22c55e",
    status: "Running",
  },
  {
    icon: Mail,
    title: "SMTP Config",
    desc: "Outbound email server settings",
    color: "#06b6d4",
    status: "Configured",
  },
  {
    icon: Key,
    title: "API Keys",
    desc: "Manage integrations and third-party access",
    color: "#a78bfa",
    status: "3 Active",
  },
  {
    icon: Lock,
    title: "MFA Policy",
    desc: "Enforce multi-factor auth for admin roles",
    color: "#ec4899",
    status: "Enforced",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function userStatusStyle(status: string) {
  if (status === "Active")
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (status === "Inactive")
    return "bg-slate-500/10 text-slate-500 dark:text-slate-400";
  return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
}

function roleColor(role: Role) {
  const map: Record<Role, string> = {
    "Super Admin": "#6366f1",
    Admin: "#06b6d4",
    "Sales Manager": "#22c55e",
    "Sales Executive": "#a78bfa",
    "Finance Manager": "#f59e0b",
    "CRM Manager": "#ec4899",
    "View Only": "#94a3b8",
  };
  return map[role] ?? "#6366f1";
}

function logStatusStyle(status: string) {
  if (status === "Success")
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (status === "Failed")
    return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
  return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
}

function LogActionIcon({ action }: { action: string }) {
  if (action.toLowerCase().includes("login attempt"))
    return <XCircle className="w-3.5 h-3.5 text-rose-500" />;
  if (action.toLowerCase().includes("login"))
    return <LogIn className="w-3.5 h-3.5 text-emerald-500" />;
  if (action.toLowerCase().includes("logout"))
    return <LogOut className="w-3.5 h-3.5 text-muted-foreground" />;
  if (action.toLowerCase().includes("export"))
    return <Download className="w-3.5 h-3.5 text-indigo-500" />;
  if (action.toLowerCase().includes("role"))
    return <UserCog className="w-3.5 h-3.5 text-amber-500" />;
  return <Activity className="w-3.5 h-3.5 text-muted-foreground" />;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2);
}

function PermCell({ enabled }: { enabled: boolean }) {
  return enabled ? (
    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
  ) : (
    <XCircle className="w-3.5 h-3.5 text-muted-foreground/30" />
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdministrationPage() {
  const [tab, setTab] = useState("users");
  const [search, setSearch] = useState("");

  const filteredUsers = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Administration</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              User management, RBAC, activity logs &amp; system settings
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
              <Download className="w-3.5 h-3.5" />
              Export
            </Button>
            <Button size="sm" className="gap-1.5 h-8 text-xs">
              <Plus className="w-3.5 h-3.5" />
              Invite User
            </Button>
          </div>
        </div>

        {/* ── KPI Row ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {KPI_DATA.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} className="py-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground truncate">{kpi.label}</p>
                      <p className="text-2xl font-bold tracking-tight mt-1">{kpi.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{kpi.sub}</p>
                    </div>
                    <div
                      className="p-2.5 rounded-lg shrink-0"
                      style={{ background: kpi.color + "18" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
          <TabsList>
            <TabsTrigger value="users" className="text-xs">
              Users
            </TabsTrigger>
            <TabsTrigger value="roles" className="text-xs">
              Role Permissions
            </TabsTrigger>
            <TabsTrigger value="logs" className="text-xs">
              Activity Logs
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              System Settings
            </TabsTrigger>
          </TabsList>

          {/* ── Users ── */}
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <CardTitle className="text-sm font-semibold">User Management</CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      All platform users with roles &amp; access status
                    </CardDescription>
                  </div>
                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-8 pl-8 pr-3 text-xs bg-muted border border-border rounded-md outline-none focus:ring-1 focus:ring-ring w-48"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {[
                          "User",
                          "Role",
                          "Department",
                          "Status",
                          "Last Login",
                          "MFA",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => {
                        const rc = roleColor(user.role);
                        return (
                          <tr
                            key={user.id}
                            className="border-b border-border/50 hover:bg-muted/40 transition-colors"
                          >
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2.5">
                                <Avatar className="w-7 h-7 shrink-0">
                                  <AvatarFallback
                                    className="text-[10px] font-semibold"
                                    style={{
                                      background: rc + "18",
                                      color: rc,
                                    }}
                                  >
                                    {initials(user.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-xs font-medium text-foreground">
                                    {user.name}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-2.5">
                              <span
                                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                                style={{
                                  background: rc + "18",
                                  color: rc,
                                }}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                              {user.department}
                            </td>
                            <td className="px-4 py-2.5">
                              <span
                                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${userStatusStyle(
                                  user.status
                                )}`}
                              >
                                {user.status}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                              {user.lastLogin}
                            </td>
                            <td className="px-4 py-2.5">
                              {user.mfaEnabled ? (
                                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                  <Lock className="w-3 h-3" />
                                  <span className="text-[11px] font-medium">On</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Unlock className="w-3 h-3" />
                                  <span className="text-[11px]">Off</span>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-muted-foreground hover:text-rose-500"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Role Permissions Matrix ── */}
          <TabsContent value="roles" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Role Permissions Matrix
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Read / Write / Delete / Approve per module per role
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5 whitespace-nowrap">
                          Role
                        </th>
                        {MODULES.map((mod) => (
                          <th
                            key={mod}
                            className="text-center text-[11px] font-medium text-muted-foreground px-3 py-2.5 whitespace-nowrap"
                            colSpan={4}
                          >
                            {mod}
                          </th>
                        ))}
                      </tr>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-4 py-1.5" />
                        {MODULES.flatMap((mod) =>
                          PERM_LABELS.map((p) => (
                            <th
                              key={`${mod}-${p}`}
                              className="text-center text-[10px] text-muted-foreground px-1.5 py-1.5 font-normal"
                            >
                              {p}
                            </th>
                          ))
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {ROLES_PERMISSIONS.map((rp) => (
                        <tr
                          key={rp.role}
                          className="border-b border-border/50 hover:bg-muted/40 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ background: rp.color }}
                              />
                              <span className="text-xs font-medium text-foreground whitespace-nowrap">
                                {rp.role}
                              </span>
                            </div>
                          </td>
                          {MODULES.flatMap((mod) => {
                            const [r, w, d, a] = rp.perms[mod] ?? [
                              false,
                              false,
                              false,
                              false,
                            ];
                            return [r, w, d, a].map((v, i) => (
                              <td
                                key={`${mod}-${i}`}
                                className="text-center px-1.5 py-3"
                              >
                                <PermCell enabled={v} />
                              </td>
                            ));
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Activity Logs ── */}
          <TabsContent value="logs" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold">Activity Logs</CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      Audit trail of all user actions across the platform
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {["User", "Action", "Resource", "Timestamp", "IP Address", "Status"].map(
                          (h) => (
                            <th
                              key={h}
                              className="text-left text-[11px] font-medium text-muted-foreground px-4 py-2.5 whitespace-nowrap"
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {ACTIVITY_LOGS.map((log) => (
                        <tr
                          key={log.id}
                          className="border-b border-border/50 hover:bg-muted/40 transition-colors"
                        >
                          <td className="px-4 py-2.5 text-xs font-medium text-foreground whitespace-nowrap">
                            {log.user}
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-1.5">
                              <LogActionIcon action={log.action} />
                              <span className="text-xs text-foreground whitespace-nowrap">
                                {log.action}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground max-w-[200px] truncate">
                            {log.resource}
                          </td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                            {log.timestamp}
                          </td>
                          <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground whitespace-nowrap">
                            {log.ip}
                          </td>
                          <td className="px-4 py-2.5">
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${logStatusStyle(
                                log.status
                              )}`}
                            >
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── System Settings ── */}
          <TabsContent value="settings" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {SYSTEM_SETTINGS.map((s) => {
                const Icon = s.icon;
                return (
                  <Card key={s.title} className="py-0 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className="p-2.5 rounded-lg shrink-0"
                            style={{ background: s.color + "18" }}
                          >
                            <Icon className="w-5 h-5" style={{ color: s.color }} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{s.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {s.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span
                          className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                          style={{
                            background: s.color + "18",
                            color: s.color,
                          }}
                        >
                          {s.status}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs gap-1 text-muted-foreground"
                        >
                          <Settings className="w-3 h-3" />
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Danger Zone */}
            <Card className="mt-4 border-rose-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Irreversible actions — proceed with caution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    label: "Purge Audit Logs",
                    desc: "Delete all activity logs older than 90 days",
                  },
                  {
                    label: "Reset All Sessions",
                    desc: "Force logout all active users immediately",
                  },
                  {
                    label: "Export & Wipe Test Data",
                    desc: "Remove all seeded demo data from the system",
                  },
                ].map((action) => (
                  <div
                    key={action.label}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-rose-500/5 border border-rose-500/20"
                  >
                    <div>
                      <p className="text-xs font-medium text-foreground">{action.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{action.desc}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 shrink-0"
                    >
                      Proceed
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
