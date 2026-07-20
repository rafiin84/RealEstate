"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Folder,
  FileText,
  Image,
  Video,
  Music,
  FileCode,
  FileArchive,
  File,
  Upload,
  Plus,
  Search,
  Grid,
  List,
  Star,
  Clock,
  Share2,
  MoreHorizontal,
  ChevronRight,
  Home,
  CheckCircle2,
  MessageSquare,
  Download,
  Building2,
  Users,
  Trash2,
  X,
  History,
  Send,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { driveItems } from "@/lib/mock-data";
import type { DriveItem, DriveItemType } from "@/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

const fileTypeIcon: Record<DriveItemType, React.ComponentType<{ className?: string }>> = {
  folder: Folder,
  document: FileText,
  image: Image,
  video: Video,
  pdf: FileText,
  cad: FileCode,
  spreadsheet: FileText,
  task: CheckCircle2,
  checklist: CheckCircle2,
  voice: Music,
};

const fileTypeColor: Record<DriveItemType, string> = {
  folder: "text-amber-500",
  document: "text-blue-500",
  image: "text-teal-500",
  video: "text-purple-500",
  pdf: "text-rose-500",
  cad: "text-orange-500",
  spreadsheet: "text-emerald-500",
  task: "text-indigo-500",
  checklist: "text-indigo-500",
  voice: "text-pink-500",
};

const fileTypeBg: Record<DriveItemType, string> = {
  folder: "bg-amber-50 dark:bg-amber-500/10",
  document: "bg-blue-50 dark:bg-blue-500/10",
  image: "bg-teal-50 dark:bg-teal-500/10",
  video: "bg-purple-50 dark:bg-purple-500/10",
  pdf: "bg-rose-50 dark:bg-rose-500/10",
  cad: "bg-orange-50 dark:bg-orange-500/10",
  spreadsheet: "bg-emerald-50 dark:bg-emerald-500/10",
  task: "bg-indigo-50 dark:bg-indigo-500/10",
  checklist: "bg-indigo-50 dark:bg-indigo-500/10",
  voice: "bg-pink-50 dark:bg-pink-500/10",
};

function formatSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`;
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  return `${(bytes / 1_000).toFixed(0)} KB`;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ─── Mock version history & comments ────────────────────────────────────────

const mockComments: Record<string, { id: string; author: string; avatar: string; text: string; time: string }[]> = {
  d006: [
    { id: "c1", author: "Rahul Khanna", avatar: "RK", text: "Updated hero images on page 3. Please review.", time: "2 days ago" },
    { id: "c2", author: "Priya Sharma", avatar: "PS", text: "Looks great! Minor typo on page 7 — 'ameniteis'.", time: "1 day ago" },
    { id: "c3", author: "Marketing Team", avatar: "MT", text: "Fixed. Uploading v3 now.", time: "18 hours ago" },
  ],
  d008: [
    { id: "c1", author: "Legal Team", avatar: "LT", text: "Clause 14 updated per RERA 2024 amendments.", time: "3 days ago" },
    { id: "c2", author: "Rahul Khanna", avatar: "RK", text: "Approved. Stamp duty clause needs a revisit.", time: "2 days ago" },
  ],
};

const mockVersions: Record<string, { version: number; date: string; author: string; note: string }[]> = {
  d006: [
    { version: 3, date: "15 Jun 2024", author: "Marketing Team", note: "Hero images updated, typos fixed" },
    { version: 2, date: "10 Apr 2024", author: "Marketing Team", note: "Q2 pricing revised" },
    { version: 1, date: "10 Jan 2024", author: "Marketing Team", note: "Initial release" },
  ],
  d007: [
    { version: 2, date: "1 Jul 2024", author: "Architecture Team", note: "Staircase dimensions revised" },
    { version: 1, date: "1 Feb 2024", author: "Architecture Team", note: "Initial CAD export" },
  ],
  d008: [
    { version: 4, date: "10 Jul 2024", author: "Legal Team", note: "RERA 2024 amendments incorporated" },
    { version: 3, date: "15 May 2024", author: "Legal Team", note: "Stamp duty clause added" },
    { version: 2, date: "1 Mar 2024", author: "Legal Team", note: "Force majeure updated" },
    { version: 1, date: "1 May 2023", author: "Legal Team", note: "Initial draft" },
  ],
};

// ─── Sidebar config ──────────────────────────────────────────────────────────

const navItems = [
  { id: "my-drive", label: "My Drive", icon: Home },
  { id: "shared", label: "Shared with me", icon: Users },
  { id: "recent", label: "Recent", icon: Clock },
  { id: "starred", label: "Starred", icon: Star },
  { id: "trash", label: "Trash", icon: Trash2 },
];

const projectDrives = [
  { id: "proj-001", folderId: "d001", name: "Prestige Heights", count: 9 },
  { id: "proj-002", folderId: null, name: "Skyline Villas", count: 28 },
  { id: "proj-003", folderId: null, name: "Central Square", count: 15 },
];

// ─── Breadcrumb helper ───────────────────────────────────────────────────────

function buildBreadcrumb(folderId: string | null): { id: string | null; name: string }[] {
  const crumbs: { id: string | null; name: string }[] = [{ id: null, name: "Home" }];
  if (!folderId) return crumbs;

  const path: DriveItem[] = [];
  let current: DriveItem | undefined = driveItems.find((i) => i.id === folderId);
  while (current) {
    path.unshift(current);
    current = current.parentId ? driveItems.find((i) => i.id === current!.parentId) : undefined;
  }
  path.forEach((item) => crumbs.push({ id: item.id, name: item.name }));
  return crumbs;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function DrivePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [nav, setNav] = useState("my-drive");
  const [activeProject, setActiveProject] = useState<string | null>("proj-001");
  const [searchQuery, setSearchQuery] = useState("");
  const [shareInput, setShareInput] = useState("");
  const [detailTab, setDetailTab] = useState<"info" | "comments" | "history">("info");

  const topLevel = driveItems.filter((i) => !i.parentId);

  const currentItems = useMemo(() => {
    let items: DriveItem[] = currentFolder
      ? driveItems.filter((i) => i.parentId === currentFolder)
      : topLevel;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = driveItems.filter((i) => i.name.toLowerCase().includes(q));
    }
    return items;
  }, [currentFolder, searchQuery, topLevel]);

  const selectedItem = selectedId ? driveItems.find((i) => i.id === selectedId) ?? null : null;
  const breadcrumb = buildBreadcrumb(currentFolder);

  const childCount = (folderId: string) =>
    driveItems.filter((i) => i.parentId === folderId).length;

  function navigateToFolder(id: string) {
    setCurrentFolder(id);
    setSelectedId(null);
    setSearchQuery("");
  }

  function selectFile(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
    setDetailTab("info");
  }

  function handleNavClick(id: string) {
    setNav(id);
    setActiveProject(null);
    setCurrentFolder(null);
    setSelectedId(null);
  }

  function handleProjectClick(proj: (typeof projectDrives)[0]) {
    setActiveProject(proj.id);
    setNav("");
    setCurrentFolder(proj.folderId);
    setSelectedId(null);
  }

  const approvalBadge = (status?: DriveItem["approvalStatus"]) => {
    if (!status) return null;
    if (status === "approved")
      return (
        <Badge className="text-[9px] px-1 py-0 h-3.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-0 gap-0.5">
          <CheckCircle2 className="w-2.5 h-2.5" />
          Approved
        </Badge>
      );
    if (status === "pending")
      return (
        <Badge className="text-[9px] px-1 py-0 h-3.5 bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-0 gap-0.5">
          <AlertCircle className="w-2.5 h-2.5" />
          Pending
        </Badge>
      );
    return (
      <Badge className="text-[9px] px-1 py-0 h-3.5 bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border-0 gap-0.5">
        <XCircle className="w-2.5 h-2.5" />
        Rejected
      </Badge>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-border shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Drive</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Central document hub for all your projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Upload className="w-3.5 h-3.5" />
            Upload
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 h-8 gap-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              <Plus className="w-3.5 h-3.5" />
              New
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem className="text-xs gap-2">
                <Folder className="w-3.5 h-3.5 text-amber-500" />
                Folder
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                Document
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                Task
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs gap-2">
                <FileArchive className="w-3.5 h-3.5 text-orange-500" />
                Checklist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Body: sidebar + main + detail */}
      <div className="flex flex-1 min-h-0">
        {/* Left sidebar */}
        <aside className="w-52 border-r border-border flex flex-col shrink-0 bg-sidebar/40">
          <ScrollArea className="flex-1">
            <div className="p-2.5 space-y-4">
              {/* Nav items */}
              <div className="space-y-0.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs transition-colors text-left ${
                      nav === item.id && !activeProject
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5 shrink-0" />
                    {item.label}
                  </button>
                ))}
              </div>

              <Separator />

              {/* Project Drives */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 px-2 mb-1.5">
                  Project Drives
                </p>
                <div className="space-y-0.5">
                  {projectDrives.map((pd) => (
                    <button
                      key={pd.id}
                      onClick={() => handleProjectClick(pd)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs transition-colors text-left ${
                        activeProject === pd.id
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                      <span className="truncate flex-1">{pd.name}</span>
                      <span className="text-[10px] text-muted-foreground tabular-nums">{pd.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Storage indicator */}
              <div className="px-2 pb-2">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
                  <span>Storage</span>
                  <span>4.2 GB / 10 GB</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary/60 rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main content */}
        <div className={`flex flex-col flex-1 min-w-0 transition-all ${selectedItem ? "mr-[300px]" : ""}`}>
          {/* Toolbar row */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border shrink-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 flex-1 min-w-0" aria-label="breadcrumb">
              {breadcrumb.map((crumb, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  {idx > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />}
                  <button
                    onClick={() => {
                      setCurrentFolder(crumb.id);
                      setSelectedId(null);
                    }}
                    className={`flex items-center gap-1 text-xs rounded px-1 py-0.5 transition-colors ${
                      idx === breadcrumb.length - 1
                        ? "text-foreground font-medium cursor-default"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                    disabled={idx === breadcrumb.length - 1}
                  >
                    {idx === 0 && <Home className="w-3 h-3" />}
                    {idx > 0 && crumb.name}
                    {idx === 0 && breadcrumb.length === 1 && <span>Home</span>}
                  </button>
                </span>
              ))}
            </nav>

            {/* Search + view toggles */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="AI semantic search..."
                  className="h-7 pl-7 pr-3 text-xs w-52"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex items-center border border-border rounded-md overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={`h-7 w-7 flex items-center justify-center transition-colors ${
                    view === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`h-7 w-7 flex items-center justify-center transition-colors ${
                    view === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* File area */}
          <ScrollArea className="flex-1">
            <div className="p-4">
              {currentItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Folder className="w-12 h-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-muted-foreground">
                    {searchQuery ? "No files match your search" : "This folder is empty"}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {searchQuery ? "Try a different query" : "Upload files or create new ones"}
                  </p>
                </div>
              ) : view === "grid" ? (
                /* Grid view */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {currentItems.map((item) => {
                    const Icon = fileTypeIcon[item.type] ?? File;
                    const color = fileTypeColor[item.type] ?? "text-muted-foreground";
                    const bg = fileTypeBg[item.type] ?? "bg-muted/30";
                    const isFolder = item.type === "folder";
                    const isSelected = selectedId === item.id;

                    return (
                      <button
                        key={item.id}
                        className={`group relative flex flex-col items-start p-3 rounded-xl border transition-all text-left ${
                          isSelected
                            ? "border-primary/60 bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/30 hover:shadow-sm bg-card"
                        }`}
                        onClick={() => {
                          if (isFolder) {
                            navigateToFolder(item.id);
                          } else {
                            selectFile(item.id);
                          }
                        }}
                      >
                        {/* Icon */}
                        <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-2.5 shrink-0`}>
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>

                        {/* Name */}
                        <p className="text-xs font-medium text-foreground leading-tight line-clamp-2 w-full mb-1">
                          {item.name}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-1 mt-auto w-full">
                          {isFolder ? (
                            <span className="text-[10px] text-muted-foreground">
                              {childCount(item.id)} items
                            </span>
                          ) : (
                            item.size && (
                              <span className="text-[10px] text-muted-foreground">{formatSize(item.size)}</span>
                            )
                          )}
                          {item.version && (
                            <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3.5 font-medium">
                              v{item.version}
                            </Badge>
                          )}
                        </div>

                        {/* Last modified */}
                        <p className="text-[10px] text-muted-foreground/60 mt-1 w-full">
                          {formatDate(item.updatedAt)}
                        </p>

                        {/* Top-right: approval */}
                        {item.approvalStatus === "approved" && (
                          <CheckCircle2 className="absolute top-2 right-2 w-3.5 h-3.5 text-emerald-500" />
                        )}
                        {item.approvalStatus === "pending" && (
                          <AlertCircle className="absolute top-2 right-2 w-3.5 h-3.5 text-amber-500" />
                        )}

                        {/* Bottom-right: comments */}
                        {(item.comments ?? 0) > 0 && (
                          <span className="absolute bottom-2.5 right-2.5 flex items-center gap-0.5 text-[10px] text-muted-foreground">
                            <MessageSquare className="w-3 h-3" />
                            {item.comments}
                          </span>
                        )}

                        {/* Hover actions */}
                        <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              className="h-5 w-5 flex items-center justify-center rounded hover:bg-muted transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="w-3 h-3 text-muted-foreground" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                              <DropdownMenuItem className="text-xs gap-2">
                                <Download className="w-3.5 h-3.5" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs gap-2">
                                <Share2 className="w-3.5 h-3.5" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs gap-2">
                                <Star className="w-3.5 h-3.5" />
                                Star
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-xs gap-2 text-destructive">
                                <Trash2 className="w-3.5 h-3.5" />
                                Move to Trash
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* List view */
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border">
                        {["Name", "Modified", "Size", "Version", "Status", "Comments", ""].map((h) => (
                          <th
                            key={h}
                            className="text-left text-[11px] font-semibold text-muted-foreground py-2 px-3 uppercase tracking-wide"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => {
                        const Icon = fileTypeIcon[item.type] ?? File;
                        const color = fileTypeColor[item.type] ?? "text-muted-foreground";
                        const isSelected = selectedId === item.id;

                        return (
                          <tr
                            key={item.id}
                            className={`group border-b border-border/50 transition-colors cursor-pointer ${
                              isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                            }`}
                            onClick={() =>
                              item.type === "folder"
                                ? navigateToFolder(item.id)
                                : selectFile(item.id)
                            }
                          >
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2.5">
                                <Icon className={`w-4 h-4 ${color} shrink-0`} />
                                <span className="text-xs font-medium text-foreground truncate max-w-[220px]">
                                  {item.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-2 px-3 text-xs text-muted-foreground whitespace-nowrap">
                              {formatDate(item.updatedAt)}
                            </td>
                            <td className="py-2 px-3 text-xs text-muted-foreground whitespace-nowrap">
                              {item.type === "folder"
                                ? `${childCount(item.id)} items`
                                : formatSize(item.size)}
                            </td>
                            <td className="py-2 px-3">
                              {item.version && (
                                <Badge variant="secondary" className="text-[10px] px-1.5">
                                  v{item.version}
                                </Badge>
                              )}
                            </td>
                            <td className="py-2 px-3">{approvalBadge(item.approvalStatus)}</td>
                            <td className="py-2 px-3 text-xs text-muted-foreground">
                              {(item.comments ?? 0) > 0 && (
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="w-3 h-3" />
                                  {item.comments}
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-muted transition-colors">
                                  <Download className="w-3 h-3 text-muted-foreground" />
                                </button>
                                <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-muted transition-colors">
                                  <Share2 className="w-3 h-3 text-muted-foreground" />
                                </button>
                                <button className="h-6 w-6 flex items-center justify-center rounded hover:bg-muted transition-colors">
                                  <MoreHorizontal className="w-3 h-3 text-muted-foreground" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Detail panel */}
        {selectedItem && (
          <div className="fixed right-0 top-[var(--header-height,49px)] bottom-0 w-[300px] border-l border-border bg-card z-20 flex flex-col shadow-xl">
            {/* Detail header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
              <p className="text-sm font-semibold text-foreground truncate pr-2">{selectedItem.name}</p>
              <button
                onClick={() => setSelectedId(null)}
                className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-muted transition-colors shrink-0 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* File preview area */}
            <div className="px-4 py-5 bg-muted/20 border-b border-border shrink-0">
              {(() => {
                const Icon = fileTypeIcon[selectedItem.type] ?? File;
                const color = fileTypeColor[selectedItem.type] ?? "text-muted-foreground";
                const bg = fileTypeBg[selectedItem.type] ?? "bg-muted/30";
                return (
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center`}>
                      <Icon className={`w-9 h-9 ${color}`} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-foreground">{selectedItem.name}</p>
                      {selectedItem.size && (
                        <p className="text-[11px] text-muted-foreground mt-0.5">{formatSize(selectedItem.size)}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="h-7 text-xs gap-1.5">
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                        <Share2 className="w-3 h-3" />
                        Share
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border shrink-0">
              {(["info", "comments", "history"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDetailTab(tab)}
                  className={`flex-1 py-2 text-xs font-medium transition-colors capitalize ${
                    detailTab === tab
                      ? "text-foreground border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "info" ? "Info" : tab === "comments" ? `Comments (${selectedItem.comments ?? 0})` : "History"}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <ScrollArea className="flex-1">
              <div className="p-4">
                {detailTab === "info" && (
                  <div className="space-y-3">
                    {/* Approval status */}
                    {selectedItem.approvalStatus && (
                      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                        <span className="text-xs text-muted-foreground">Approval</span>
                        {approvalBadge(selectedItem.approvalStatus)}
                      </div>
                    )}

                    {/* Metadata rows */}
                    <div className="space-y-2.5">
                      {[
                        { label: "Type", value: selectedItem.type.toUpperCase() },
                        { label: "Created by", value: selectedItem.createdBy },
                        { label: "Created", value: formatDate(selectedItem.createdAt) },
                        { label: "Modified", value: formatDate(selectedItem.updatedAt) },
                        ...(selectedItem.version
                          ? [{ label: "Version", value: `v${selectedItem.version} (latest)` }]
                          : []),
                        ...(selectedItem.size
                          ? [{ label: "Size", value: formatSize(selectedItem.size) }]
                          : []),
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium text-foreground text-right max-w-[160px] break-words">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Share with */}
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-2">Share with</p>
                      <div className="flex gap-1.5">
                        <Input
                          placeholder="Enter email or name..."
                          className="h-7 text-xs flex-1"
                          value={shareInput}
                          onChange={(e) => setShareInput(e.target.value)}
                        />
                        <Button size="sm" className="h-7 px-2.5 text-xs" disabled={!shareInput.trim()}>
                          <Send className="w-3 h-3" />
                        </Button>
                      </div>
                      {selectedItem.sharedWith && selectedItem.sharedWith.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {selectedItem.sharedWith.map((person) => (
                            <div key={person} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-semibold text-primary">
                                {person[0]}
                              </div>
                              {person}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {selectedItem.tags && selectedItem.tags.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-2">Tags</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedItem.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-[10px] px-1.5">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {detailTab === "comments" && (
                  <div className="space-y-3">
                    {(mockComments[selectedItem.id] ?? []).length === 0 ? (
                      <div className="flex flex-col items-center py-8 text-center">
                        <MessageSquare className="w-8 h-8 text-muted-foreground/30 mb-2" />
                        <p className="text-xs text-muted-foreground">No comments yet</p>
                        <p className="text-[11px] text-muted-foreground/60 mt-0.5">Be the first to add a comment</p>
                      </div>
                    ) : (
                      (mockComments[selectedItem.id] ?? []).map((comment) => (
                        <div key={comment.id} className="flex gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-[9px] font-bold text-primary shrink-0 mt-0.5">
                            {comment.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-[11px] font-semibold text-foreground">{comment.author}</span>
                              <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{comment.text}</p>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Comment input */}
                    <div className="flex gap-1.5 pt-1">
                      <Input placeholder="Add a comment..." className="h-7 text-xs flex-1" />
                      <Button size="sm" className="h-7 px-2.5">
                        <Send className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}

                {detailTab === "history" && (
                  <div className="space-y-1">
                    {(mockVersions[selectedItem.id] ?? []).length === 0 ? (
                      <div className="flex flex-col items-center py-8 text-center">
                        <History className="w-8 h-8 text-muted-foreground/30 mb-2" />
                        <p className="text-xs text-muted-foreground">No version history</p>
                      </div>
                    ) : (
                      (mockVersions[selectedItem.id] ?? []).map((ver, idx) => (
                        <div
                          key={ver.version}
                          className={`flex gap-3 pb-3 ${
                            idx < (mockVersions[selectedItem.id] ?? []).length - 1
                              ? "border-b border-border/50"
                              : ""
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                idx === 0
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              v{ver.version}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-medium text-foreground">{ver.note}</span>
                              {idx === 0 && (
                                <Badge className="text-[9px] px-1 py-0 h-3.5 bg-primary/10 text-primary border-0">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {ver.author} · {ver.date}
                            </p>
                          </div>
                          {idx > 0 && (
                            <button className="text-[10px] text-primary hover:underline shrink-0 mt-1">
                              Restore
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
