"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  BookOpen,
  Building2,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Grid3X3,
  ImageIcon,
  Landmark,
  List,
  Lock,
  MessageCircle,
  Mic,
  MoreHorizontal,
  PenLine,
  Plus,
  Scale,
  Search,
  Send,
  Shield,
  Star,
  Upload,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type FolderKey =
  | "brochures"
  | "floorPlans"
  | "priceSheets"
  | "myNotes"
  | "siteVisit"
  | "loanDocuments"
  | "legal"
  | "booking"
  | "familyFolder";

interface DriveFile {
  id: string;
  name: string;
  size: string;
  source: string;
  type: "pdf" | "image" | "doc" | "note";
  date: string;
  starred?: boolean;
}

interface NoteItem {
  id: string;
  type: "text" | "voice" | "photo";
  content: string;
  date: string;
  duration?: string;
  imageAlt?: string;
}

interface FamilyMember {
  name: string;
  role: string;
  status: "invited" | "add";
  email?: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const FOLDERS: { key: FolderKey; label: string; icon: React.ReactNode; count?: number; private?: boolean }[] = [
  { key: "brochures", label: "Brochures", icon: <BookOpen className="h-4 w-4" />, count: 3 },
  { key: "floorPlans", label: "Floor Plans", icon: <Grid3X3 className="h-4 w-4" />, count: 2 },
  { key: "priceSheets", label: "Price Sheets", icon: <FileText className="h-4 w-4" />, count: 1 },
  { key: "myNotes", label: "My Notes", icon: <PenLine className="h-4 w-4" />, count: 3 },
  { key: "siteVisit", label: "Site Visit", icon: <ImageIcon className="h-4 w-4" />, count: 8 },
  { key: "loanDocuments", label: "Loan Documents", icon: <Landmark className="h-4 w-4" />, count: 0 },
  { key: "legal", label: "Legal", icon: <Scale className="h-4 w-4" />, count: 0 },
  { key: "booking", label: "Booking", icon: <Building2 className="h-4 w-4" />, count: 0 },
  { key: "familyFolder", label: "Family Folder", icon: <Lock className="h-4 w-4 text-amber-500" />, count: 2, private: true },
];

const BROCHURE_FILES: DriveFile[] = [
  { id: "1", name: "Master Brochure.pdf", size: "18.5 MB", source: "From Builder", type: "pdf", date: "Jul 12, 2024", starred: true },
  { id: "2", name: "Price Sheet July 2024.pdf", size: "2.1 MB", source: "From Builder", type: "pdf", date: "Jul 15, 2024" },
  { id: "3", name: "Floor Plan - 3BHK.pdf", size: "5.8 MB", source: "From Builder", type: "pdf", date: "Jul 10, 2024" },
];

const NOTES: NoteItem[] = [
  {
    id: "n1",
    type: "text",
    content:
      "Visited 3BHK show flat on July 14th. The east-facing unit on floor 12 has great ventilation. Corner unit pricing is ~8% more but worth it for the extra windows. Ask builder about possession timeline — they said Q4 2026 but contract says Q2 2027.",
    date: "Jul 14, 2024",
  },
  {
    id: "n2",
    type: "voice",
    content: "Voice note from site visit",
    duration: "1:42",
    date: "Jul 14, 2024",
  },
  {
    id: "n3",
    type: "photo",
    content: "Photo of lobby & amenities",
    imageAlt: "Site visit photo",
    date: "Jul 14, 2024",
  },
];

const FAMILY_MEMBERS: FamilyMember[] = [
  { name: "Priya", role: "Spouse", status: "invited", email: "priya@example.com" },
  { name: "Rajesh Kumar", role: "CA", status: "invited", email: "rajesh.ca@example.com" },
  { name: "Adv. Mehta", role: "Lawyer", status: "add" },
];

const CHAT_MESSAGES = [
  { id: 1, from: "builder", name: "Prestige Sales Team", text: "Hello! How can we help you with Prestige Heights today?", time: "10:32 AM" },
  { id: 2, from: "me", name: "You", text: "Hi! I wanted to know about the possession timeline for Tower B.", time: "10:34 AM" },
  { id: 3, from: "builder", name: "Prestige Sales Team", text: "Tower B is on track for Q4 2026. We can schedule a detailed update call with our project manager.", time: "10:35 AM" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FileTypeIcon({ type }: { type: DriveFile["type"] }) {
  const base = "h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold";
  if (type === "pdf") return <div className={cn(base, "bg-red-50 text-red-600")}>PDF</div>;
  if (type === "image") return <div className={cn(base, "bg-blue-50 text-blue-600")}>IMG</div>;
  if (type === "doc") return <div className={cn(base, "bg-indigo-50 text-indigo-600")}>DOC</div>;
  return <div className={cn(base, "bg-zinc-100 text-zinc-500")}>TXT</div>;
}

function FileCard({ file }: { file: DriveFile }) {
  const [starred, setStarred] = useState(file.starred ?? false);
  return (
    <div className="group relative rounded-xl border border-zinc-100 bg-white p-4 hover:shadow-md hover:border-zinc-200 transition-all duration-200 cursor-pointer">
      <div className="flex items-start gap-3">
        <FileTypeIcon type={file.type} />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-zinc-800 truncate">{file.name}</p>
          <p className="text-xs text-zinc-400 mt-0.5">{file.size} · {file.date}</p>
          <Badge variant="secondary" className="mt-1.5 text-xs px-1.5 py-0 h-4 font-normal bg-zinc-50 text-zinc-500 border-zinc-100">
            {file.source}
          </Badge>
        </div>
        <div className="flex flex-col items-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); setStarred((s) => !s); }}
            className="text-zinc-300 hover:text-amber-400 transition-colors"
          >
            <Star className={cn("h-3.5 w-3.5", starred && "fill-amber-400 text-amber-400")} />
          </button>
          <button className="text-zinc-300 hover:text-zinc-600 transition-colors">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function BrochuresContent() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-zinc-800">Brochures</h3>
          <p className="text-xs text-zinc-400 mt-0.5">3 files · 26.4 MB total</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-zinc-100 p-0.5 bg-zinc-50">
            <button
              onClick={() => setView("grid")}
              className={cn("rounded-md p-1.5 transition-colors", view === "grid" ? "bg-white shadow-sm text-zinc-800" : "text-zinc-400")}
            >
              <Grid3X3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn("rounded-md p-1.5 transition-colors", view === "list" ? "bg-white shadow-sm text-zinc-800" : "text-zinc-400")}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
          <Button size="sm" className="h-8 gap-1.5 text-xs bg-zinc-900 hover:bg-zinc-700">
            <Upload className="h-3 w-3" /> Upload
          </Button>
        </div>
      </div>
      <div className={cn("gap-3", view === "grid" ? "grid grid-cols-1 sm:grid-cols-2" : "flex flex-col")}>
        {BROCHURE_FILES.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}

function MyNotesContent() {
  const [newNote, setNewNote] = useState("");
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-zinc-800">My Notes</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Private · only visible to you</p>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 h-8 gap-1.5 text-xs font-medium hover:bg-accent transition-colors">
                <Mic className="h-3 w-3" /> Voice Note
              </TooltipTrigger>
              <TooltipContent>Record a voice note</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button size="sm" className="h-8 gap-1.5 text-xs bg-zinc-900 hover:bg-zinc-700">
            <Plus className="h-3 w-3" /> New Note
          </Button>
        </div>
      </div>

      {/* Quick compose */}
      <div className="rounded-xl border border-zinc-100 bg-white p-3 space-y-2">
        <Textarea
          placeholder="Jot down a thought, question, or observation..."
          className="resize-none border-0 p-0 shadow-none focus-visible:ring-0 text-sm text-zinc-700 min-h-[60px]"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="flex items-center justify-between pt-1 border-t border-zinc-50">
          <div className="flex items-center gap-2">
            <button className="text-zinc-300 hover:text-zinc-500 transition-colors">
              <ImageIcon className="h-4 w-4" />
            </button>
            <button className="text-zinc-300 hover:text-zinc-500 transition-colors">
              <Mic className="h-4 w-4" />
            </button>
          </div>
          <Button size="sm" className="h-7 text-xs bg-zinc-900 hover:bg-zinc-700" disabled={!newNote.trim()}>
            Save Note
          </Button>
        </div>
      </div>

      {/* Existing notes */}
      <div className="space-y-3">
        {NOTES.map((note) => (
          <div key={note.id} className="rounded-xl border border-zinc-100 bg-white p-4 hover:border-zinc-200 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                {note.type === "text" && <PenLine className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />}
                {note.type === "voice" && <Mic className="h-3.5 w-3.5 text-rose-400 flex-shrink-0 mt-0.5" />}
                {note.type === "photo" && <ImageIcon className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />}
                <span className="text-xs font-medium text-zinc-400 capitalize">{note.type} note</span>
              </div>
              <span className="text-xs text-zinc-300">{note.date}</span>
            </div>
            {note.type === "text" && (
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{note.content}</p>
            )}
            {note.type === "voice" && (
              <div className="mt-2 flex items-center gap-3 bg-rose-50 rounded-lg px-3 py-2">
                <button className="h-7 w-7 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0 hover:bg-rose-600 transition-colors">
                  <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white ml-0.5" />
                </button>
                <div className="flex-1">
                  <div className="flex gap-0.5 items-center h-5">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 rounded-full bg-rose-300"
                        style={{ height: `${Math.random() * 14 + 4}px` }}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs font-mono text-rose-400 flex-shrink-0">{note.duration}</span>
              </div>
            )}
            {note.type === "photo" && (
              <div className="mt-2 rounded-lg bg-zinc-50 border border-dashed border-zinc-200 h-28 flex items-center justify-center text-zinc-300 text-xs gap-2">
                <ImageIcon className="h-5 w-5" />
                <span>{note.imageAlt}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FamilyFolderContent() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [members, setMembers] = useState<FamilyMember[]>(FAMILY_MEMBERS);
  return (
    <div className="space-y-5">
      {/* Header banner */}
      <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 flex items-start gap-3">
        <div className="h-9 w-9 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
          <Shield className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <p className="font-semibold text-amber-900 text-sm">Private Family Folder</p>
          <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
            This folder is private — only visible to you and people you personally invite. Documents here are not shared with the builder.
          </p>
        </div>
      </div>

      {/* Files placeholder */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-zinc-700">Files (2)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: "Family Budget.xlsx", size: "45 KB", date: "Jul 11, 2024", type: "doc" as const, source: "Added by me" },
            { name: "Loan Pre-approval.pdf", size: "1.2 MB", date: "Jul 9, 2024", type: "pdf" as const, source: "Added by me" },
          ].map((f, i) => (
            <FileCard key={i} file={{ id: String(i), starred: false, ...f }} />
          ))}
        </div>
        <Button variant="outline" className="w-full h-9 text-sm border-dashed text-zinc-400 hover:text-zinc-600">
          <Upload className="h-4 w-4 mr-2" /> Upload to Family Folder
        </Button>
      </div>

      <Separator />

      {/* Invite panel */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-zinc-500" />
          <h4 className="text-sm font-semibold text-zinc-700">Invite Family Members</h4>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Enter email address..."
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="h-9 text-sm"
          />
          <Button
            size="sm"
            className="h-9 gap-1.5 text-xs bg-zinc-900 hover:bg-zinc-700 flex-shrink-0"
            disabled={!inviteEmail.trim()}
            onClick={() => {
              if (inviteEmail.trim()) {
                setMembers((prev) => [...prev, { name: inviteEmail.split("@")[0], role: "Guest", status: "invited", email: inviteEmail }]);
                setInviteEmail("");
              }
            }}
          >
            <UserPlus className="h-3 w-3" /> Invite
          </Button>
        </div>

        {/* Members list */}
        <div className="space-y-2">
          {members.map((m, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-100 bg-white px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-800">{m.name}</p>
                  <p className="text-xs text-zinc-400">{m.role}{m.email ? ` · ${m.email}` : ""}</p>
                </div>
              </div>
              {m.status === "invited" ? (
                <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-600 border-emerald-100">
                  Invited
                </Badge>
              ) : (
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                  <Plus className="h-3 w-3" /> Add
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyFolderContent({ folderLabel }: { folderLabel: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
      <div className="h-14 w-14 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 flex items-center justify-center">
        <FolderOpen className="h-6 w-6 text-zinc-300" />
      </div>
      <p className="text-sm font-medium text-zinc-500">{folderLabel} is empty</p>
      <p className="text-xs text-zinc-400">Upload documents or add files to get started</p>
      <Button size="sm" variant="outline" className="mt-1 gap-1.5 text-xs h-8">
        <Upload className="h-3 w-3" /> Upload Files
      </Button>
    </div>
  );
}

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const send = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", name: "You", text: message.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setMessage("");
  };
  return (
    <div className="fixed bottom-6 right-6 w-80 rounded-2xl border border-zinc-200 bg-white shadow-2xl flex flex-col z-50" style={{ maxHeight: "460px" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-zinc-900 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">P</div>
          <div>
            <p className="text-xs font-semibold text-white">Prestige Sales Team</p>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <p className="text-xs text-zinc-400">Online now</p>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
      {/* Messages */}
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-2", msg.from === "me" ? "flex-row-reverse" : "flex-row")}>
              <div className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 mt-0.5",
                msg.from === "me" ? "bg-indigo-500" : "bg-amber-500"
              )}>
                {msg.from === "me" ? "Y" : "P"}
              </div>
              <div className={cn("max-w-[200px]")}>
                <div className={cn(
                  "rounded-xl px-3 py-2 text-xs leading-relaxed",
                  msg.from === "me" ? "bg-indigo-500 text-white rounded-tr-sm" : "bg-zinc-50 text-zinc-700 border border-zinc-100 rounded-tl-sm"
                )}>
                  {msg.text}
                </div>
                <p className={cn("text-xs text-zinc-300 mt-0.5 px-1", msg.from === "me" ? "text-right" : "text-left")}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      {/* Input */}
      <div className="p-2 border-t border-zinc-100">
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-100 bg-zinc-50 px-2 py-1">
          <input
            className="flex-1 bg-transparent text-xs text-zinc-700 placeholder:text-zinc-300 outline-none"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
          />
          <button
            onClick={send}
            className="h-6 w-6 rounded-lg bg-zinc-900 flex items-center justify-center hover:bg-zinc-700 transition-colors disabled:opacity-40"
            disabled={!message.trim()}
          >
            <Send className="h-3 w-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Drive Panel (for one property) ──────────────────────────────────────────

function PropertyDrive() {
  const [activeFolder, setActiveFolder] = useState<FolderKey>("brochures");
  const [search, setSearch] = useState("");

  const activeFolderMeta = FOLDERS.find((f) => f.key === activeFolder)!;

  const renderContent = () => {
    if (activeFolder === "brochures") return <BrochuresContent />;
    if (activeFolder === "myNotes") return <MyNotesContent />;
    if (activeFolder === "familyFolder") return <FamilyFolderContent />;
    return <EmptyFolderContent folderLabel={activeFolderMeta.label} />;
  };

  return (
    <div className="flex gap-0 rounded-2xl border border-zinc-100 bg-white overflow-hidden shadow-sm" style={{ minHeight: "580px" }}>
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 bg-zinc-50 border-r border-zinc-100 flex flex-col">
        {/* Search */}
        <div className="p-3 border-b border-zinc-100">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-300" />
            <input
              className="w-full bg-white rounded-lg border border-zinc-100 pl-7 pr-3 py-1.5 text-xs text-zinc-600 placeholder:text-zinc-300 outline-none focus:border-zinc-300 transition-colors"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* Folder tree */}
        <ScrollArea className="flex-1 py-2">
          <div className="px-2 space-y-0.5">
            <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider px-2 pb-1 pt-1">Folders</p>
            {FOLDERS.map((folder) => {
              const isActive = activeFolder === folder.key;
              return (
                <button
                  key={folder.key}
                  onClick={() => setActiveFolder(folder.key)}
                  className={cn(
                    "w-full flex items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-all duration-150 group",
                    isActive
                      ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                      : "text-zinc-500 hover:bg-white hover:text-zinc-700 hover:shadow-sm hover:border hover:border-zinc-50"
                  )}
                >
                  <span className={cn(isActive ? "text-indigo-500" : "text-zinc-400 group-hover:text-zinc-500")}>
                    {folder.private && !isActive ? <Lock className="h-4 w-4 text-amber-400" /> : folder.icon}
                  </span>
                  <span className="flex-1 text-xs font-medium truncate">{folder.label}</span>
                  <div className="flex items-center gap-1">
                    {folder.private && (
                      <Lock className={cn("h-3 w-3", isActive ? "text-amber-400" : "text-amber-300")} />
                    )}
                    {typeof folder.count === "number" && folder.count > 0 && (
                      <span className={cn(
                        "text-xs rounded-full px-1.5 py-0",
                        isActive ? "bg-indigo-50 text-indigo-500" : "bg-zinc-100 text-zinc-400"
                      )}>
                        {folder.count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
        {/* Storage */}
        <div className="p-3 border-t border-zinc-100">
          <p className="text-xs text-zinc-400 mb-1.5">Storage used</p>
          <div className="w-full h-1.5 rounded-full bg-zinc-200 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" style={{ width: "28%" }} />
          </div>
          <p className="text-xs text-zinc-400 mt-1">28.4 MB of 100 MB</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-5">
          <Folder className="h-3.5 w-3.5" />
          <span>My Drive</span>
          <ChevronRight className="h-3 w-3" />
          <span className={cn(activeFolderMeta.private ? "text-amber-500" : "text-zinc-700", "font-medium")}>
            {activeFolderMeta.label}
          </span>
          {activeFolderMeta.private && <Lock className="h-3 w-3 text-amber-400" />}
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BuyerDrivePage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-zinc-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Page header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">My Property Drive</h1>
              <p className="text-sm text-zinc-500 mt-1">
                All your property documents, notes, and conversations in one place
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="gap-2 text-sm flex-shrink-0"
              onClick={() => setChatOpen((o) => !o)}
            >
              <MessageCircle className="h-4 w-4 text-indigo-500" />
              Chat with Builder
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Properties Tracked", value: "2", icon: <Building2 className="h-4 w-4 text-indigo-400" /> },
              { label: "Total Files", value: "15", icon: <FileText className="h-4 w-4 text-emerald-400" /> },
              { label: "Notes Saved", value: "3", icon: <PenLine className="h-4 w-4 text-amber-400" /> },
              { label: "Shared With", value: "2 people", icon: <Users className="h-4 w-4 text-rose-400" /> },
            ].map((stat) => (
              <Card key={stat.label} className="border-zinc-100 shadow-none">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-zinc-50 flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-zinc-900 leading-none">{stat.value}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Property tabs */}
          <Tabs defaultValue="prestige">
            <TabsList className="bg-white border border-zinc-100 shadow-none h-10 p-1 gap-1">
              <TabsTrigger
                value="prestige"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white rounded-md text-sm h-8 px-4 gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-indigo-400 flex-shrink-0" />
                Prestige Heights
              </TabsTrigger>
              <TabsTrigger
                value="greenvalley"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white rounded-md text-sm h-8 px-4 gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                Green Valley Plots
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prestige" className="mt-4">
              {/* Property context bar */}
              <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-indigo-900">Prestige Heights — Tower B, 3BHK</p>
                  <p className="text-xs text-indigo-600">Whitefield, Bengaluru · ₹1.2 Cr · Under Consideration</p>
                </div>
                <Badge className="bg-indigo-100 text-indigo-600 border-indigo-200 text-xs">Shortlisted</Badge>
              </div>
              <PropertyDrive />
            </TabsContent>

            <TabsContent value="greenvalley" className="mt-4">
              {/* Property context bar */}
              <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-emerald-900">Green Valley Plots — Plot No. 42</p>
                  <p className="text-xs text-emerald-700">Sarjapur Road, Bengaluru · ₹45 L · Under Consideration</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-600 border-emerald-200 text-xs">Exploring</Badge>
              </div>
              <PropertyDrive />
            </TabsContent>
          </Tabs>

        </div>
      </div>

      {/* Floating chat button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-zinc-900 shadow-lg flex items-center justify-center hover:bg-zinc-700 transition-all duration-200 hover:scale-105 z-40"
        >
          <MessageCircle className="h-5 w-5 text-white" />
        </button>
      )}

      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </TooltipProvider>
  );
}
