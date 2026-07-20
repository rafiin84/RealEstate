import type {
  Project,
  Unit,
  Lead,
  Booking,
  LandParcel,
  ChannelPartner,
  User,
  KPICard,
  DriveItem,
  Milestone,
  ConstructionUpdate,
  BuyerProfile,
} from "@/types";

// ─── Projects ──────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "Prestige Heights",
    type: "Residential",
    status: "Under Construction",
    location: {
      line1: "Sector 75",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      country: "India",
    },
    coords: { lat: 28.5706, lng: 77.3553 },
    totalUnits: 480,
    soldUnits: 312,
    availableUnits: 128,
    blockedUnits: 40,
    totalArea: 4200000,
    reraNumber: "UPRERAPRJ23456",
    launchDate: "2023-06-15",
    completionDate: "2026-12-31",
    totalRevenue: 1840000000,
    collectedRevenue: 1180000000,
    constructionProgress: 62,
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    phases: [],
    amenities: ["Swimming Pool", "Clubhouse", "Gym", "Jogging Track", "Children's Play Area", "24x7 Security"],
    createdAt: "2023-01-01",
    updatedAt: "2024-07-15",
  },
  {
    id: "proj-002",
    name: "Skyline Villas",
    type: "Villas",
    status: "Ready to Move",
    location: {
      line1: "Golf Course Extension Road",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122018",
      country: "India",
    },
    coords: { lat: 28.4595, lng: 77.0266 },
    totalUnits: 120,
    soldUnits: 98,
    availableUnits: 22,
    blockedUnits: 0,
    totalArea: 1800000,
    reraNumber: "HARERAHO23789",
    launchDate: "2022-03-01",
    completionDate: "2024-09-30",
    totalRevenue: 2940000000,
    collectedRevenue: 2800000000,
    constructionProgress: 100,
    coverImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    phases: [],
    amenities: ["Private Pool", "Club Membership", "Concierge", "Smart Home", "EV Charging", "Landscaped Gardens"],
    createdAt: "2021-09-01",
    updatedAt: "2024-07-10",
  },
  {
    id: "proj-003",
    name: "Central Square",
    type: "Commercial",
    status: "Under Construction",
    location: {
      line1: "BKC",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      country: "India",
    },
    coords: { lat: 19.0596, lng: 72.8656 },
    totalUnits: 280,
    soldUnits: 145,
    availableUnits: 95,
    blockedUnits: 40,
    totalArea: 3200000,
    reraNumber: "MHRERP23012",
    launchDate: "2023-10-01",
    completionDate: "2027-06-30",
    totalRevenue: 3640000000,
    collectedRevenue: 1820000000,
    constructionProgress: 38,
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    phases: [],
    amenities: ["Conference Centre", "Food Court", "Parking", "24x7 Security", "High-speed Elevators"],
    createdAt: "2023-04-01",
    updatedAt: "2024-07-12",
  },
  {
    id: "proj-004",
    name: "Green Valley Plots",
    type: "Plots",
    status: "Planning",
    location: {
      line1: "Devanahalli",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "562110",
      country: "India",
    },
    coords: { lat: 13.2484, lng: 77.7135 },
    totalUnits: 340,
    soldUnits: 0,
    availableUnits: 340,
    blockedUnits: 0,
    totalArea: 2400000,
    reraNumber: "KA/RERA/1234",
    launchDate: "2025-01-15",
    completionDate: "2025-06-30",
    totalRevenue: 850000000,
    collectedRevenue: 0,
    constructionProgress: 0,
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    phases: [],
    amenities: ["Gated Community", "Underground Drainage", "Landscaped Parks", "Club House"],
    createdAt: "2024-03-01",
    updatedAt: "2024-07-01",
  },
  {
    id: "proj-005",
    name: "Pinnacle Tower",
    type: "Mixed-use",
    status: "Approved",
    location: {
      line1: "GIFT City",
      city: "Gandhinagar",
      state: "Gujarat",
      pincode: "382355",
      country: "India",
    },
    coords: { lat: 23.1515, lng: 72.6698 },
    totalUnits: 620,
    soldUnits: 0,
    availableUnits: 620,
    blockedUnits: 0,
    totalArea: 6800000,
    reraNumber: "GJ/RERA/5678",
    launchDate: "2025-03-01",
    completionDate: "2029-12-31",
    totalRevenue: 9300000000,
    collectedRevenue: 0,
    constructionProgress: 0,
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    phases: [],
    amenities: ["Helipad", "Sky Lounge", "Infinity Pool", "5-star Hotel", "Retail Promenade"],
    createdAt: "2024-06-01",
    updatedAt: "2024-07-15",
  },
];

// ─── Inventory ─────────────────────────────────────────────────────────────

export const units: Unit[] = [
  { id: "u001", projectId: "proj-001", phaseId: "ph-001", buildingId: "b-001", unitNumber: "A-101", floor: 1, type: "2 BHK", status: "Available", carpetArea: 780, builtUpArea: 950, superBuiltUpArea: 1150, basePrice: 7500, totalPrice: 8625000, facing: "East", features: ["Corner Unit", "Garden View"], parking: 1, media: [], createdAt: "2023-06-15", updatedAt: "2024-07-01" },
  { id: "u002", projectId: "proj-001", phaseId: "ph-001", buildingId: "b-001", unitNumber: "A-201", floor: 2, type: "3 BHK", status: "Booked", carpetArea: 1050, builtUpArea: 1280, superBuiltUpArea: 1540, basePrice: 7800, totalPrice: 12012000, facing: "North", features: ["Pool View"], parking: 2, media: [], bookedBy: "Rajesh Kumar", createdAt: "2023-06-15", updatedAt: "2024-06-10" },
  { id: "u003", projectId: "proj-001", phaseId: "ph-001", buildingId: "b-001", unitNumber: "A-301", floor: 3, type: "2 BHK", status: "Blocked", carpetArea: 780, builtUpArea: 950, superBuiltUpArea: 1150, basePrice: 7600, totalPrice: 8740000, facing: "West", features: [], parking: 1, media: [], createdAt: "2023-06-15", updatedAt: "2024-07-14" },
  { id: "u004", projectId: "proj-001", phaseId: "ph-001", buildingId: "b-002", unitNumber: "B-1501", floor: 15, type: "Penthouse", status: "Available", carpetArea: 2200, builtUpArea: 2680, superBuiltUpArea: 3200, basePrice: 12000, totalPrice: 38400000, facing: "North-East", features: ["Private Terrace", "City View", "Private Pool"], parking: 3, media: [], createdAt: "2023-06-15", updatedAt: "2024-07-10" },
  { id: "u005", projectId: "proj-001", phaseId: "ph-001", buildingId: "b-002", unitNumber: "B-801", floor: 8, type: "3 BHK", status: "Agreement", carpetArea: 1120, builtUpArea: 1360, superBuiltUpArea: 1640, basePrice: 8000, totalPrice: 13120000, facing: "South", features: ["City View"], parking: 2, media: [], bookedBy: "Priya Sharma", createdAt: "2023-06-15", updatedAt: "2024-05-20" },
  { id: "u006", projectId: "proj-002", phaseId: "ph-002", buildingId: "b-003", unitNumber: "V-012", floor: 0, type: "Villa", status: "Registered", carpetArea: 3200, builtUpArea: 4100, superBuiltUpArea: 4800, basePrice: 15000, totalPrice: 72000000, facing: "North-West", features: ["Private Pool", "Garden", "4 Car Garage"], parking: 4, media: [], bookedBy: "Amit Singhania", createdAt: "2022-03-01", updatedAt: "2024-01-15" },
  { id: "u007", projectId: "proj-003", phaseId: "ph-003", buildingId: "b-004", unitNumber: "C-401", floor: 4, type: "Office", status: "Available", carpetArea: 2500, builtUpArea: 3000, superBuiltUpArea: 3600, basePrice: 18000, totalPrice: 64800000, facing: "East", features: ["City View", "Corner Office"], parking: 5, media: [], createdAt: "2023-10-01", updatedAt: "2024-07-01" },
  { id: "u008", projectId: "proj-003", phaseId: "ph-003", buildingId: "b-004", unitNumber: "C-201", floor: 2, type: "Retail", status: "Booked", carpetArea: 1800, builtUpArea: 2100, superBuiltUpArea: 2520, basePrice: 22000, totalPrice: 55440000, facing: "South", features: ["Street Level", "High Footfall"], parking: 3, media: [], bookedBy: "Nexus Retail Ltd", createdAt: "2023-10-01", updatedAt: "2024-04-20" },
];

// ─── Leads ─────────────────────────────────────────────────────────────────

export const leads: Lead[] = [
  { id: "l001", name: "Arjun Mehta", email: "arjun.mehta@gmail.com", phone: "+91 98765 43210", status: "Hot", source: "Website", interestedIn: "Prestige Heights", budget: 12000000, assignedTo: "Vikram Singh", nextFollowUp: "2024-07-22", score: 88, visits: 2, lastActivity: "2 hours ago", tags: ["HNI", "Urgent"], notes: "Looking for 3 BHK, top floor preferred. Ready to book.", createdAt: "2024-07-10", updatedAt: "2024-07-20" },
  { id: "l002", name: "Sunita Patel", email: "sunita.patel@yahoo.com", phone: "+91 87654 32109", status: "Site Visit Scheduled", source: "Channel Partner", interestedIn: "Skyline Villas", budget: 75000000, assignedTo: "Riya Kapoor", nextFollowUp: "2024-07-21", score: 72, visits: 0, lastActivity: "1 day ago", tags: ["Villa Buyer", "NRI"], notes: "NRI based in Dubai. Interested in investment + vacation home.", createdAt: "2024-07-05", updatedAt: "2024-07-19" },
  { id: "l003", name: "Deepak Agarwal", email: "deepak@agarwalgroup.com", phone: "+91 76543 21098", status: "Negotiation", source: "Referral", interestedIn: "Central Square", budget: 80000000, assignedTo: "Nikhil Joshi", nextFollowUp: "2024-07-23", score: 91, visits: 3, lastActivity: "3 hours ago", tags: ["Corporate", "Bulk"], notes: "Looking for 3 office units on same floor. Serious buyer.", createdAt: "2024-06-28", updatedAt: "2024-07-20" },
  { id: "l004", name: "Meera Krishnan", email: "meera.k@techcorp.in", phone: "+91 65432 10987", status: "Contacted", source: "Facebook Ads", interestedIn: "Prestige Heights", budget: 8500000, assignedTo: "Priya Sharma", nextFollowUp: "2024-07-24", score: 45, visits: 0, lastActivity: "5 hours ago", tags: ["First-time Buyer"], notes: "Young professional. First home purchase.", createdAt: "2024-07-15", updatedAt: "2024-07-20" },
  { id: "l005", name: "Sanjay Gupta", email: "sanjay@guptainfra.com", phone: "+91 54321 09876", status: "New", source: "Walk-in", interestedIn: "Green Valley Plots", budget: 6000000, assignedTo: "Unassigned", nextFollowUp: "2024-07-21", score: 55, visits: 1, lastActivity: "30 mins ago", tags: ["Investor"], notes: "Looking for plot for future construction.", createdAt: "2024-07-20", updatedAt: "2024-07-20" },
  { id: "l006", name: "Kavitha Reddy", email: "kavitha.r@redmail.com", phone: "+91 43210 98765", status: "Lost", source: "Google Ads", interestedIn: "Prestige Heights", budget: 9000000, assignedTo: "Vikram Singh", nextFollowUp: "-", score: 12, visits: 1, lastActivity: "1 week ago", tags: ["Lost"], notes: "Went with competitor. Budget mismatch.", createdAt: "2024-06-01", updatedAt: "2024-07-10" },
  { id: "l007", name: "Rohit Bajaj", email: "rohit.bajaj@startupx.io", phone: "+91 32109 87654", status: "Site Visit Done", source: "Social Media", interestedIn: "Central Square", budget: 25000000, assignedTo: "Nikhil Joshi", nextFollowUp: "2024-07-22", score: 78, visits: 2, lastActivity: "4 hours ago", tags: ["Startup", "Office"], notes: "Startup founder. Needs flexible payment plan.", createdAt: "2024-07-01", updatedAt: "2024-07-20" },
  { id: "l008", name: "Fatima Sheikh", email: "fatima.s@globaltraders.com", phone: "+91 21098 76543", status: "Booked", source: "IVR", interestedIn: "Skyline Villas", budget: 90000000, assignedTo: "Riya Kapoor", nextFollowUp: "-", score: 95, visits: 4, lastActivity: "2 days ago", tags: ["HNI", "Confirmed"], notes: "Booking done. Agreement in progress.", createdAt: "2024-06-15", updatedAt: "2024-07-18" },
];

// ─── Bookings ──────────────────────────────────────────────────────────────

export const bookings: Booking[] = [
  { id: "bk001", unitId: "u002", projectId: "proj-001", leadId: "l001", buyerName: "Rajesh Kumar", buyerEmail: "rajesh.k@gmail.com", buyerPhone: "+91 98765 11111", status: "Agreement Done", bookingDate: "2024-05-15", agreedPrice: 12000000, discount: 200000, netPrice: 11800000, paymentPlan: "Construction Linked", totalCollected: 5900000, pendingAmount: 5900000, nextDueDate: "2024-09-01", nextDueAmount: 1500000, assignedTo: "Vikram Singh", documents: 8, createdAt: "2024-05-15", updatedAt: "2024-07-10" },
  { id: "bk002", unitId: "u005", projectId: "proj-001", leadId: "l002", buyerName: "Priya Sharma", buyerEmail: "priya.s@yahoo.com", buyerPhone: "+91 87654 22222", status: "Booking Done", bookingDate: "2024-06-20", agreedPrice: 13000000, discount: 0, netPrice: 13000000, paymentPlan: "Down Payment", totalCollected: 1300000, pendingAmount: 11700000, nextDueDate: "2024-08-15", nextDueAmount: 6000000, assignedTo: "Riya Kapoor", documents: 3, createdAt: "2024-06-20", updatedAt: "2024-07-05" },
  { id: "bk003", unitId: "u006", projectId: "proj-002", leadId: "l008", buyerName: "Fatima Sheikh", buyerEmail: "fatima.s@globaltraders.com", buyerPhone: "+91 21098 76543", status: "Registration Done", bookingDate: "2024-04-10", agreedPrice: 72000000, discount: 2000000, netPrice: 70000000, paymentPlan: "Full Payment", totalCollected: 70000000, pendingAmount: 0, nextDueDate: "-", nextDueAmount: 0, loanAmount: 20000000, loanBank: "HDFC Bank", assignedTo: "Riya Kapoor", documents: 14, createdAt: "2024-04-10", updatedAt: "2024-07-01" },
];

// ─── Land Bank ─────────────────────────────────────────────────────────────

export const landParcels: LandParcel[] = [
  { id: "lnd-001", name: "Sector 45 Land", location: { line1: "Sector 45", city: "Noida", state: "UP", pincode: "201303", country: "India" }, coords: { lat: 28.5700, lng: 77.3600 }, totalArea: 180000, fsiFar: 3.5, zoning: "Residential-High Rise", status: "Due Diligence", estimatedValue: 720000000, owner: "Mr. Harbhajan Singh", suitabilityScore: 82, projectType: ["Residential"], documents: 12, createdAt: "2024-03-01", updatedAt: "2024-07-15" },
  { id: "lnd-002", name: "Whitefield Plot", location: { line1: "Near ITPL", city: "Bengaluru", state: "Karnataka", pincode: "560066", country: "India" }, coords: { lat: 12.9716, lng: 77.7499 }, totalArea: 240000, fsiFar: 2.75, zoning: "Commercial-IT Park", status: "Negotiation", estimatedValue: 1200000000, owner: "ABC Land Holdings", suitabilityScore: 91, projectType: ["Commercial", "Mixed-use"], documents: 8, createdAt: "2024-01-15", updatedAt: "2024-07-10" },
  { id: "lnd-003", name: "Aerocity Parcel", location: { line1: "Near Airport", city: "New Delhi", state: "Delhi", pincode: "110037", country: "India" }, coords: { lat: 28.5562, lng: 77.1000 }, totalArea: 320000, fsiFar: 4.0, zoning: "Commercial-Mixed", status: "LOI Signed", estimatedValue: 2880000000, owner: "DDA Auction", suitabilityScore: 95, projectType: ["Commercial", "Office", "Retail"], documents: 20, createdAt: "2023-11-01", updatedAt: "2024-07-18" },
  { id: "lnd-004", name: "Outer Ring Road Land", location: { line1: "ORR near Hebbal", city: "Bengaluru", state: "Karnataka", pincode: "560024", country: "India" }, coords: { lat: 13.0450, lng: 77.5963 }, totalArea: 96000, fsiFar: 3.0, zoning: "Residential-Villa", status: "Acquired", acquisitionCost: 480000000, estimatedValue: 620000000, owner: "Own (Company)", suitabilityScore: 78, projectType: ["Villas"], documents: 32, createdAt: "2023-06-01", updatedAt: "2024-06-15" },
  { id: "lnd-005", name: "Bandra East Parcel", location: { line1: "Bandra East", city: "Mumbai", state: "Maharashtra", pincode: "400051", country: "India" }, coords: { lat: 19.0544, lng: 72.8406 }, totalArea: 42000, fsiFar: 5.5, zoning: "Residential-Luxury", status: "Prospecting", estimatedValue: 1680000000, owner: "Private Trust", suitabilityScore: 88, projectType: ["Residential"], documents: 4, createdAt: "2024-06-15", updatedAt: "2024-07-12" },
];

// ─── Channel Partners ──────────────────────────────────────────────────────

export const channelPartners: ChannelPartner[] = [
  { id: "cp001", name: "Suresh Nair", company: "Prime Realty Consultants", email: "suresh@primerealty.in", phone: "+91 98765 55555", reraNumber: "CPRERA123456", city: "Mumbai", status: "Active", totalLeads: 142, conversions: 28, totalRevenue: 280000000, pendingBrokerage: 4200000, rating: 4.8, joinedAt: "2022-01-15" },
  { id: "cp002", name: "Anjali Varma", company: "Homes & Beyond", email: "anjali@homesbeyond.com", phone: "+91 87654 66666", reraNumber: "CPRERA234567", city: "Bengaluru", status: "Active", totalLeads: 98, conversions: 19, totalRevenue: 190000000, pendingBrokerage: 2850000, rating: 4.5, joinedAt: "2022-06-01" },
  { id: "cp003", name: "Manish Tiwari", company: "City Property Hub", email: "manish@cityhub.in", phone: "+91 76543 77777", reraNumber: "CPRERA345678", city: "Delhi NCR", status: "Active", totalLeads: 215, conversions: 41, totalRevenue: 410000000, pendingBrokerage: 6150000, rating: 4.9, joinedAt: "2021-09-10" },
  { id: "cp004", name: "Deepa Krishnan", company: "Luxe Spaces", email: "deepa@luxespaces.com", phone: "+91 65432 88888", reraNumber: "CPRERA456789", city: "Hyderabad", status: "Inactive", totalLeads: 34, conversions: 5, totalRevenue: 50000000, pendingBrokerage: 0, rating: 3.8, joinedAt: "2023-03-01" },
];

// ─── Team Members ──────────────────────────────────────────────────────────

export const teamMembers: User[] = [
  { id: "u001", name: "Rahul Khanna", email: "rahul.khanna@realestateos.com", phone: "+91 98765 00001", role: "Sales Manager", avatar: "RK", department: "Sales", isActive: true, lastLogin: "2024-07-20 09:30", createdAt: "2023-01-01" },
  { id: "u002", name: "Vikram Singh", email: "vikram.singh@realestateos.com", phone: "+91 98765 00002", role: "Sales Executive", avatar: "VS", department: "Sales", isActive: true, lastLogin: "2024-07-20 10:15", createdAt: "2023-03-01" },
  { id: "u003", name: "Riya Kapoor", email: "riya.kapoor@realestateos.com", phone: "+91 98765 00003", role: "Sales Executive", avatar: "RK", department: "Sales", isActive: true, lastLogin: "2024-07-20 08:45", createdAt: "2023-03-01" },
  { id: "u004", name: "Nikhil Joshi", email: "nikhil.joshi@realestateos.com", phone: "+91 98765 00004", role: "CRM Manager", avatar: "NJ", department: "CRM", isActive: true, lastLogin: "2024-07-19 17:00", createdAt: "2023-02-01" },
  { id: "u005", name: "Priya Sharma", email: "priya.sharma@realestateos.com", phone: "+91 98765 00005", role: "Sales Executive", avatar: "PS", department: "Sales", isActive: false, lastLogin: "2024-07-15 14:30", createdAt: "2023-05-01" },
];

// ─── Drive Items ────────────────────────────────────────────────────────────

export const driveItems: DriveItem[] = [
  { id: "d001", name: "Prestige Heights", type: "folder", createdBy: "Rahul Khanna", createdAt: "2023-06-15", updatedAt: "2024-07-15", comments: 0 },
  { id: "d002", parentId: "d001", name: "Project Approvals", type: "folder", createdBy: "Rahul Khanna", createdAt: "2023-06-15", updatedAt: "2024-06-10", comments: 0 },
  { id: "d003", parentId: "d001", name: "Marketing Materials", type: "folder", createdBy: "Marketing Team", createdAt: "2023-07-01", updatedAt: "2024-07-10", comments: 0 },
  { id: "d004", parentId: "d001", name: "Legal Documents", type: "folder", createdBy: "Legal Team", createdAt: "2023-06-15", updatedAt: "2024-07-05", comments: 0 },
  { id: "d005", parentId: "d002", name: "RERA Certificate.pdf", type: "pdf", size: 2400000, url: "#", createdBy: "Rahul Khanna", createdAt: "2023-09-01", updatedAt: "2023-09-01", approvalStatus: "approved", comments: 2 },
  { id: "d006", parentId: "d003", name: "Master Brochure.pdf", type: "pdf", size: 18500000, url: "#", createdBy: "Marketing Team", createdAt: "2024-01-10", updatedAt: "2024-06-15", version: 3, comments: 8, approvalStatus: "approved" },
  { id: "d007", parentId: "d003", name: "Floor Plans - Tower A", type: "cad", size: 45000000, url: "#", createdBy: "Architecture Team", createdAt: "2024-02-01", updatedAt: "2024-07-01", version: 2, comments: 5 },
  { id: "d008", parentId: "d004", name: "Sale Agreement Template v4.docx", type: "document", size: 850000, url: "#", createdBy: "Legal Team", createdAt: "2024-05-01", updatedAt: "2024-07-10", version: 4, comments: 12, approvalStatus: "approved" },
  { id: "d009", parentId: "d001", name: "Construction Progress - July 2024.mp4", type: "video", size: 320000000, url: "#", thumbnailUrl: "#", createdBy: "Site Team", createdAt: "2024-07-15", updatedAt: "2024-07-15", comments: 4 },
];

// ─── Construction Milestones ────────────────────────────────────────────────

export const milestones: Milestone[] = [
  { id: "m001", projectId: "proj-001", name: "Foundation Completion", plannedDate: "2023-12-31", actualDate: "2024-01-15", status: "Completed", progress: 100, description: "Full excavation and foundation work for all 3 towers." },
  { id: "m002", projectId: "proj-001", name: "Structure - Floors 1-5", plannedDate: "2024-03-31", actualDate: "2024-04-10", status: "Completed", progress: 100, description: "Column and slab work for floors 1 to 5." },
  { id: "m003", projectId: "proj-001", name: "Structure - Floors 6-10", plannedDate: "2024-06-30", actualDate: "2024-07-05", status: "Completed", progress: 100, description: "Column and slab work for floors 6 to 10." },
  { id: "m004", projectId: "proj-001", name: "Structure - Floors 11-15", plannedDate: "2024-09-30", status: "In Progress", progress: 45, description: "Column and slab work for floors 11 to 15." },
  { id: "m005", projectId: "proj-001", name: "Brick Work - Phase 1", plannedDate: "2024-11-30", status: "Pending", progress: 0, description: "Internal brick work and partitions." },
  { id: "m006", projectId: "proj-001", name: "Plaster & Tiling", plannedDate: "2025-03-31", status: "Pending", progress: 0, description: "Internal plaster, waterproofing and tiling." },
  { id: "m007", projectId: "proj-001", name: "Handover - Phase 1", plannedDate: "2026-12-31", status: "Pending", progress: 0, description: "Final handover of units in Phase 1." },
];

export const constructionUpdates: ConstructionUpdate[] = [
  { id: "cu001", projectId: "proj-001", date: "2024-07-15", title: "Floor 12 slab casting complete", description: "Tower A & B floor 12 slabs have been cast. Curing is underway. Progress is on track with revised schedule.", media: [], postedBy: "Arun Kumar (Site Engineer)", milestone: "Structure - Floors 11-15" },
  { id: "cu002", projectId: "proj-001", date: "2024-07-08", title: "Drone survey completed", description: "Monthly drone survey has been conducted. 3D model updated. Structure inspection passed.", media: [], postedBy: "Drone Survey Team", milestone: "Structure - Floors 11-15" },
  { id: "cu003", projectId: "proj-001", date: "2024-07-01", title: "Elevator shaft work begins", description: "Elevator shaft construction has commenced for all 4 elevators in Tower A. Expected to complete by October.", media: [], postedBy: "Arun Kumar (Site Engineer)" },
];

// ─── Dashboard KPIs ─────────────────────────────────────────────────────────

export const executiveDashboardKPIs: KPICard[] = [
  { id: "kpi-01", title: "Total Revenue", value: "₹184 Cr", subtitle: "Across all active projects", change: 12.4, changeLabel: "vs last quarter", icon: "IndianRupee", color: "blue" },
  { id: "kpi-02", title: "Units Sold", value: "555", subtitle: "This financial year", change: 8.2, changeLabel: "vs last FY", icon: "Home", color: "green" },
  { id: "kpi-03", title: "Active Leads", value: "1,248", subtitle: "Across all projects", change: 18.7, changeLabel: "vs last month", icon: "Users", color: "purple" },
  { id: "kpi-04", title: "Collections", value: "₹118 Cr", subtitle: "Received this FY", change: -3.1, changeLabel: "vs last FY", icon: "TrendingUp", color: "teal" },
  { id: "kpi-05", title: "Active Projects", value: "5", subtitle: "Across 4 cities", change: 0, changeLabel: "No change", icon: "Building2", color: "orange" },
  { id: "kpi-06", title: "Site Visits", value: "142", subtitle: "This month", change: 22.5, changeLabel: "vs last month", icon: "MapPin", color: "rose" },
];

// ─── Chart Data ─────────────────────────────────────────────────────────────

export const revenueChartData = [
  { month: "Apr", revenue: 12.4, target: 15.0, collections: 10.2 },
  { month: "May", revenue: 18.2, target: 15.0, collections: 14.8 },
  { month: "Jun", revenue: 15.8, target: 16.0, collections: 16.4 },
  { month: "Jul", revenue: 22.1, target: 18.0, collections: 18.9 },
  { month: "Aug", revenue: 19.5, target: 18.0, collections: 17.2 },
  { month: "Sep", revenue: 24.8, target: 20.0, collections: 22.1 },
  { month: "Oct", revenue: 21.3, target: 20.0, collections: 19.8 },
  { month: "Nov", revenue: 28.6, target: 22.0, collections: 24.3 },
  { month: "Dec", revenue: 26.4, target: 22.0, collections: 25.1 },
  { month: "Jan", revenue: 31.2, target: 25.0, collections: 28.4 },
  { month: "Feb", revenue: 29.8, target: 25.0, collections: 26.9 },
  { month: "Mar", revenue: 35.6, target: 30.0, collections: 32.1 },
];

export const salesPipelineData = [
  { stage: "New Leads", count: 420, value: 84 },
  { stage: "Contacted", count: 285, value: 57 },
  { stage: "Site Visit", count: 142, value: 28 },
  { stage: "Negotiation", count: 78, value: 15 },
  { stage: "Booking", count: 34, value: 6 },
  { stage: "Registered", count: 18, value: 3.5 },
];

export const inventoryMixData = [
  { name: "2 BHK", value: 38, fill: "#6366f1" },
  { name: "3 BHK", value: 29, fill: "#06b6d4" },
  { name: "Villa", value: 15, fill: "#22c55e" },
  { name: "Commercial", value: 10, fill: "#f59e0b" },
  { name: "Plots", value: 8, fill: "#ec4899" },
];

export const leadSourceData = [
  { source: "Website", leads: 312, conversion: 8.2 },
  { source: "Channel Partners", leads: 285, conversion: 12.4 },
  { source: "Facebook Ads", leads: 198, conversion: 5.8 },
  { source: "Referrals", leads: 142, conversion: 18.9 },
  { source: "Google Ads", leads: 168, conversion: 6.1 },
  { source: "Walk-in", leads: 98, conversion: 22.4 },
  { source: "Events", leads: 45, conversion: 15.6 },
];

export const cityPerformanceData = [
  { city: "Mumbai", revenue: 68, units: 145, leads: 380 },
  { city: "Delhi NCR", revenue: 54, units: 198, leads: 420 },
  { city: "Bengaluru", revenue: 41, units: 112, leads: 290 },
  { city: "Gurugram", revenue: 38, units: 98, leads: 185 },
  { city: "Hyderabad", revenue: 22, units: 67, leads: 160 },
];

// ─── Buyer OS Mock Data ──────────────────────────────────────────────────────

export const buyerProfiles: BuyerProfile[] = [
  {
    id: "bp001",
    name: "Ramesh Srinivasan",
    email: "ramesh.s@gmail.com",
    phone: "+91 98765 12345",
    buyerType: "Residential",
    budget: 12000000,
    monthlyEMI: 80000,
    timeline: "Within 6 months",
    locations: ["Noida", "Greater Noida"],
    lifestyle: ["Good Schools Nearby", "Green Spaces", "Metro Connectivity"],
    investmentGoal: "Self-use + Appreciation",
    aiPersona: "End-user focused family buyer looking for 3 BHK in Noida/Greater Noida corridor. High intent to purchase within 6 months. Prioritizes school proximity and green surroundings over luxury amenities. Loan pre-approval likely at ₹80K/month EMI.",
    savedProperties: ["proj-001", "proj-004"],
    createdAt: "2024-07-01",
  },
];
