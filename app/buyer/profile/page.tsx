"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Building2, FileText, Shield, Bell, ChevronRight, CheckCircle2, Edit, Download } from "lucide-react";

interface ProfileField {
  label: string;
  value: string;
  editable?: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploaded: string;
  status: "Verified" | "Pending" | "Required";
}

const personalInfo: ProfileField[] = [
  { label: "Full Name", value: "Ramesh Srinivasan", editable: true },
  { label: "Email Address", value: "ramesh.s@gmail.com", editable: true },
  { label: "Mobile", value: "+91 98765 12345", editable: true },
  { label: "Date of Birth", value: "12 March 1985" },
  { label: "PAN Number", value: "BXZPS1234R" },
  { label: "Aadhaar (last 4)", value: "****  ****  8732" },
  { label: "Current Address", value: "204, Prestige Towers, Whitefield, Bengaluru — 560066", editable: true },
  { label: "Occupation", value: "Senior Software Engineer" },
  { label: "Annual Income", value: "₹32 Lakhs" },
];

const coApplicants: ProfileField[] = [
  { label: "Co-applicant Name", value: "Latha Srinivasan" },
  { label: "Relation", value: "Spouse" },
  { label: "PAN", value: "CYZLT5678A" },
  { label: "Income", value: "₹18 Lakhs" },
];

const documents: Document[] = [
  { id: "d001", name: "PAN Card", type: "KYC", uploaded: "Jan 10, 2026", status: "Verified" },
  { id: "d002", name: "Aadhaar Card", type: "KYC", uploaded: "Jan 10, 2026", status: "Verified" },
  { id: "d003", name: "Salary Slips (3 months)", type: "Income", uploaded: "Jan 12, 2026", status: "Verified" },
  { id: "d004", name: "ITR FY 2024-25", type: "Income", uploaded: "Jan 12, 2026", status: "Verified" },
  { id: "d005", name: "Bank Statement (6 months)", type: "Financial", uploaded: "Jan 12, 2026", status: "Verified" },
  { id: "d006", name: "Allotment Letter", type: "Property", uploaded: "Feb 2, 2026", status: "Verified" },
  { id: "d007", name: "Agreement for Sale", type: "Property", uploaded: "Mar 5, 2026", status: "Verified" },
  { id: "d008", name: "NOC from Society", type: "Property", uploaded: "—", status: "Required" },
];

const myProperty = {
  project: "Godrej Meridien",
  unit: "Tower A, Unit A-1208",
  type: "3 BHK + 3 Bath",
  floor: "12th Floor",
  carpet: "1,124 sq ft",
  super: "1,580 sq ft",
  possession: "December 2028",
  rera: "HARERAGT23890",
  status: "Under Construction",
};

const notifications = [
  { label: "Payment Due Reminders", enabled: true },
  { label: "Construction Milestone Updates", enabled: true },
  { label: "Document Requests", enabled: true },
  { label: "Promotional Offers", enabled: false },
  { label: "Site Visit Confirmations", enabled: true },
];

const STATUS_CONFIG: Record<Document["status"], { color: string }> = {
  Verified: { color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  Pending: { color: "bg-amber-100 text-amber-700 border-amber-200" },
  Required: { color: "bg-red-100 text-red-700 border-red-200" },
};

export default function BuyerProfilePage() {
  const [tab, setTab] = useState("profile");
  const [notifs, setNotifs] = useState(notifications);

  const toggleNotif = (i: number) => {
    setNotifs((prev) => prev.map((n, idx) => idx === i ? { ...n, enabled: !n.enabled } : n));
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">My Profile</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your account, documents, and preferences</p>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Edit className="w-3.5 h-3.5" /> Edit Profile
        </Button>
      </div>

      {/* Profile card */}
      <Card className="border">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 shrink-0">
              <AvatarFallback className="text-lg font-bold bg-primary text-primary-foreground">RS</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold">Ramesh Srinivasan</p>
              <p className="text-sm text-muted-foreground">ramesh.s@gmail.com · +91 98765 12345</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge className="border text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200 gap-1">
                  <CheckCircle2 className="w-3 h-3" />KYC Verified
                </Badge>
                <Badge className="border text-[10px] bg-indigo-100 text-indigo-700 border-indigo-200">Home Buyer</Badge>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-muted-foreground">Customer since</p>
              <p className="font-semibold text-sm">Jan 2026</p>
            </div>
          </div>

          {/* My Property strip */}
          <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{myProperty.project} — {myProperty.unit}</p>
                  <p className="text-xs text-muted-foreground">{myProperty.type} · {myProperty.carpet} carpet · {myProperty.floor} · Possession: {myProperty.possession}</p>
                </div>
              </div>
              <Badge className="border text-[10px] bg-blue-100 text-blue-700 border-blue-200">{myProperty.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={(v) => v && setTab(v)}>
        <TabsList className="h-8">
          <TabsTrigger value="profile" className="text-xs h-7">Personal Info</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs h-7">Documents</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs h-7">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="text-xs h-7">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-4">
          <Card className="border">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Personal Details</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalInfo.map((f) => (
                  <div key={f.label} className="flex flex-col gap-0.5">
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                    <p className="text-sm font-medium">{f.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Co-Applicant</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {coApplicants.map((f) => (
                  <div key={f.label} className="flex flex-col gap-0.5">
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                    <p className="text-sm font-medium">{f.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <div className="grid gap-2">
            {documents.map((d) => (
              <Card key={d.id} className="border hover:shadow-sm transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.type} · {d.uploaded !== "—" ? `Uploaded ${d.uploaded}` : "Not uploaded"}</p>
                  </div>
                  <Badge className={`border text-[10px] ${STATUS_CONFIG[d.status].color}`}>{d.status}</Badge>
                  {d.status !== "Required" && <Download className="w-3.5 h-3.5 text-muted-foreground shrink-0 cursor-pointer" />}
                  {d.status === "Required" && <Button size="sm" variant="outline" className="h-7 text-xs">Upload</Button>}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="border">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {notifs.map((n, i) => (
                <div key={n.label} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{n.label}</p>
                  </div>
                  <button
                    onClick={() => toggleNotif(i)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${n.enabled ? "bg-primary" : "bg-muted"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${n.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <div className="grid gap-3">
            {[
              { label: "Change Password", desc: "Last changed 3 months ago", icon: <Shield className="w-4 h-4 text-primary" /> },
              { label: "Two-Factor Authentication", desc: "Enabled via SMS OTP", icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
              { label: "Linked Devices", desc: "2 active devices", icon: <User className="w-4 h-4 text-blue-500" /> },
              { label: "Login Activity", desc: "Last login: Today 9:32 AM", icon: <Shield className="w-4 h-4 text-muted-foreground" /> },
            ].map((item) => (
              <Card key={item.label} className="border hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  {item.icon}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
