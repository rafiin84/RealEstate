// ─── Common ────────────────────────────────────────────────────────────────

export type ID = string;

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface GeoCoords {
  lat: number;
  lng: number;
}

export interface MediaItem {
  id: ID;
  type: "image" | "video" | "document" | "360" | "floor_plan";
  url: string;
  thumbnail?: string;
  title: string;
  createdAt: string;
}

export interface ActivityItem {
  id: ID;
  type: string;
  description: string;
  user: string;
  avatar?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export type StatusColor = "default" | "primary" | "success" | "warning" | "destructive" | "secondary";

// ─── Land Bank ─────────────────────────────────────────────────────────────

export type LandParcelStatus =
  | "Prospecting"
  | "Due Diligence"
  | "Negotiation"
  | "LOI Signed"
  | "Agreement"
  | "Acquired"
  | "Rejected";

export interface LandParcel {
  id: ID;
  name: string;
  location: Address;
  coords: GeoCoords;
  totalArea: number; // sq ft
  fsiFar: number;
  zoning: string;
  status: LandParcelStatus;
  estimatedValue: number;
  acquisitionCost?: number;
  owner: string;
  suitabilityScore: number; // 0-100 AI score
  projectType: ProjectType[];
  documents: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Projects ──────────────────────────────────────────────────────────────

export type ProjectType =
  | "Residential"
  | "Commercial"
  | "Plots"
  | "Villas"
  | "Township"
  | "Mixed-use"
  | "Retail"
  | "Office"
  | "Warehouse"
  | "Industrial";

export type ProjectStatus =
  | "Planning"
  | "Approved"
  | "Under Construction"
  | "Ready to Move"
  | "Completed"
  | "On Hold";

export interface Project {
  id: ID;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  location: Address;
  coords: GeoCoords;
  totalUnits: number;
  soldUnits: number;
  availableUnits: number;
  blockedUnits: number;
  totalArea: number; // sq ft
  reraNumber: string;
  launchDate: string;
  completionDate: string;
  totalRevenue: number;
  collectedRevenue: number;
  constructionProgress: number; // %
  coverImage: string;
  phases: Phase[];
  amenities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Phase {
  id: ID;
  projectId: ID;
  name: string;
  status: ProjectStatus;
  launchDate: string;
  completionDate: string;
  totalUnits: number;
  soldUnits: number;
  buildings: Building[];
}

export interface Building {
  id: ID;
  phaseId: ID;
  name: string;
  floors: number;
  unitsPerFloor: number;
  totalUnits: number;
  status: ProjectStatus;
}

// ─── Inventory ─────────────────────────────────────────────────────────────

export type InventoryStatus =
  | "Available"
  | "Blocked"
  | "Booked"
  | "Agreement"
  | "Registered"
  | "Cancelled"
  | "Sold";

export type UnitType =
  | "1 BHK"
  | "2 BHK"
  | "3 BHK"
  | "4 BHK"
  | "Penthouse"
  | "Villa"
  | "Studio"
  | "Office"
  | "Retail"
  | "Showroom"
  | "Warehouse"
  | "Plot";

export interface Unit {
  id: ID;
  projectId: ID;
  phaseId: ID;
  buildingId: ID;
  unitNumber: string;
  floor: number;
  type: UnitType;
  status: InventoryStatus;
  carpetArea: number; // sq ft
  builtUpArea: number;
  superBuiltUpArea: number;
  basePrice: number; // per sq ft
  totalPrice: number;
  facing: string;
  features: string[];
  parking: number;
  media: MediaItem[];
  bookedBy?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── CRM ───────────────────────────────────────────────────────────────────

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Site Visit Scheduled"
  | "Site Visit Done"
  | "Negotiation"
  | "Hot"
  | "Booked"
  | "Lost"
  | "On Hold";

export type LeadSource =
  | "Website"
  | "Walk-in"
  | "Referral"
  | "Channel Partner"
  | "Social Media"
  | "Facebook Ads"
  | "Google Ads"
  | "IVR"
  | "Event"
  | "Billboard"
  | "WhatsApp";

export interface Lead {
  id: ID;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  interestedIn: string; // project name
  budget: number;
  assignedTo: string;
  assignedToAvatar?: string;
  nextFollowUp: string;
  score: number; // 0-100 AI lead score
  visits: number;
  lastActivity: string;
  tags: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Sales ─────────────────────────────────────────────────────────────────

export type BookingStatus =
  | "Reserved"
  | "Booking Done"
  | "Agreement Pending"
  | "Agreement Done"
  | "Registration Done"
  | "Cancelled";

export interface Booking {
  id: ID;
  unitId: ID;
  projectId: ID;
  leadId: ID;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  status: BookingStatus;
  bookingDate: string;
  agreedPrice: number;
  discount: number;
  netPrice: number;
  paymentPlan: string;
  totalCollected: number;
  pendingAmount: number;
  nextDueDate: string;
  nextDueAmount: number;
  loanAmount?: number;
  loanBank?: string;
  assignedTo: string;
  documents: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Finance ───────────────────────────────────────────────────────────────

export interface PaymentSchedule {
  id: ID;
  bookingId: ID;
  milestone: string;
  dueDate: string;
  amount: number;
  status: "Pending" | "Partial" | "Paid" | "Overdue";
  paidAmount: number;
  paidDate?: string;
}

// ─── Channel Partners ──────────────────────────────────────────────────────

export interface ChannelPartner {
  id: ID;
  name: string;
  company: string;
  email: string;
  phone: string;
  reraNumber: string;
  city: string;
  status: "Active" | "Inactive" | "Pending";
  totalLeads: number;
  conversions: number;
  totalRevenue: number;
  pendingBrokerage: number;
  rating: number;
  joinedAt: string;
}

// ─── Users / RBAC ──────────────────────────────────────────────────────────

export type UserRole =
  | "Super Admin"
  | "Admin"
  | "Sales Manager"
  | "Sales Executive"
  | "CRM Manager"
  | "Finance Manager"
  | "Construction Manager"
  | "Legal Manager"
  | "Marketing Manager"
  | "Channel Partner"
  | "Buyer";

export interface User {
  id: ID;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  department: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

// ─── Dashboard KPIs ────────────────────────────────────────────────────────

export interface KPICard {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  change: number; // % change
  changeLabel: string;
  icon: string;
  color: "blue" | "green" | "orange" | "purple" | "rose" | "teal";
}

// ─── Drive ─────────────────────────────────────────────────────────────────

export type DriveItemType =
  | "folder"
  | "document"
  | "image"
  | "video"
  | "pdf"
  | "cad"
  | "spreadsheet"
  | "task"
  | "checklist"
  | "voice";

export interface DriveItem {
  id: ID;
  parentId?: ID;
  name: string;
  type: DriveItemType;
  size?: number; // bytes
  url?: string;
  thumbnailUrl?: string;
  version?: number;
  sharedWith?: string[];
  tags?: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  comments?: number;
  approvalStatus?: "pending" | "approved" | "rejected";
}

// ─── Buyer OS ──────────────────────────────────────────────────────────────

export type BuyerType =
  | "Residential"
  | "Commercial"
  | "Plot"
  | "Investor"
  | "Corporate"
  | "NRI";

export interface BuyerProfile {
  id: ID;
  name: string;
  email: string;
  phone: string;
  buyerType: BuyerType;
  budget: number;
  monthlyEMI?: number;
  timeline: string;
  locations: string[];
  lifestyle: string[];
  investmentGoal?: string;
  aiPersona?: string;
  savedProperties: ID[];
  createdAt: string;
}

// ─── Construction ──────────────────────────────────────────────────────────

export interface Milestone {
  id: ID;
  projectId: ID;
  name: string;
  plannedDate: string;
  actualDate?: string;
  status: "Pending" | "In Progress" | "Completed" | "Delayed";
  progress: number; // %
  description: string;
}

export interface ConstructionUpdate {
  id: ID;
  projectId: ID;
  date: string;
  title: string;
  description: string;
  media: MediaItem[];
  postedBy: string;
  milestone?: string;
}
