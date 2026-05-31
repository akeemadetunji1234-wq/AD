// @ts-nocheck
"use client";

import React, { useState, useEffect, useReducer, useMemo, useRef } from "react";
import {
  Home as HouseIcon,
  Search,
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  X,
  Plus,
  Edit,
  Trash2,
  Users,
  Settings,
  LayoutDashboard,
  Building2,
  Share2,
  LogOut,
  Calendar,
  Check,
  Eye,
  Lock,
  Mail,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Bookmark,
  Bell,
  User,
  SlidersHorizontal,
  TrendingUp,
  Star,
  Phone,
  MessageCircle,
  Filter,
  Grid3X3,
  List,
  Flame,
  Sparkles,
  BarChart3,
  DollarSign,
  Activity,
  RefreshCw,
  Info
} from "lucide-react";

// ============================================================
// 📦 Mock Data
// ============================================================

const INITIAL_LISTINGS = [
  {
    id: 1,
    title: "Cozy Studio in Yaba",
    type: "Studio",
    state: "Lagos",
    address: "Yaba, Lagos",
    price: 85000,
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    furnished: "Yes",
    description: "A cozy and charming studio apartment located in the lively academic and tech hub of Yaba, Lagos. Perfectly designed for students, developers, or young professionals, this self-contained space features modern fittings, neat finishes, and easy access to both the Mainland and Island. Enjoy 24/7 security, reliable water supply, and close proximity to major transport nodes.",
    amenities: ["Parking", "Security", "Water"],
    agentName: "Adebayo Alao",
    agentPhone: "+234 803 123 4567",
    status: "Active",
    datePosted: "2026-05-28",
    savesCount: 8,
    rating: 4.78,
    reviewsCount: 32,
    gradient: "from-blue-500 to-cyan-600",
    color: "#3B82F6",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    title: "3-Bed Flat in Lekki Phase 1",
    type: "Apartment",
    state: "Lagos",
    address: "Lekki Phase 1, Lagos",
    price: 250000,
    bedrooms: 3,
    bathrooms: 2,
    area: 130,
    furnished: "Yes",
    description: "Stunning and spacious 3-bedroom flat nestled in the highly sought-after Lekki Phase 1 residential district. This luxury home comes with a fully fitted kitchen, all ensuite bedrooms, gorgeous POP ceilings, and premium tiled floors. The property offers 24-hour estate security, constant power with a backup generator, and dedicated parking space.",
    amenities: ["Parking", "Security", "Water", "Generator"],
    agentName: "Chioma Nze",
    agentPhone: "+234 812 345 6789",
    status: "Active",
    datePosted: "2026-05-29",
    savesCount: 12,
    rating: 4.92,
    reviewsCount: 45,
    gradient: "from-violet-500 to-purple-700",
    color: "#8B5CF6",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    title: "Spacious Duplex in Asokoro",
    type: "Duplex",
    state: "Abuja",
    address: "Asokoro, Abuja",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    furnished: "No",
    description: "An elegant, massive 4-bedroom duplex situated in the prestigious Asokoro district of Abuja. Boasting expansive living spaces, double-volume high ceilings, premium woodwork, and master bedrooms with walk-in closets. Features a sprawling compound, beautifully manicured gardens, secure gatehouse, a swimming pool, and an automated backup generator system.",
    amenities: ["Parking", "Security", "Water", "Generator", "Pool"],
    agentName: "Musa Ibrahim",
    agentPhone: "+234 809 987 6543",
    status: "Active",
    datePosted: "2026-05-20",
    savesCount: 15,
    rating: 4.97,
    reviewsCount: 18,
    gradient: "from-rose-500 to-pink-600",
    color: "#F43F5E",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    title: "2-Bed Apartment in GRA",
    type: "Apartment",
    state: "Port Harcourt",
    address: "GRA Phase 2, Port Harcourt",
    price: 120000,
    bedrooms: 2,
    bathrooms: 2,
    area: 90,
    furnished: "No",
    description: "Modern and secure 2-bedroom apartment located in the calm and secure GRA Phase 2, Port Harcourt. This property has clean bathrooms, a large dining and lounge area, and fully tiled floors. The apartment block provides dedicated secure parking, prepaid meter, water treatment plant, and a highly responsive estate management team.",
    amenities: ["Parking", "Security", "Water"],
    agentName: "Ken Saro",
    agentPhone: "+234 805 111 2222",
    status: "Active",
    datePosted: "2026-05-22",
    savesCount: 4,
    rating: 4.65,
    reviewsCount: 12,
    gradient: "from-emerald-500 to-teal-600",
    color: "#10B981",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-fc1b2d812ca5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 5,
    title: "Self-Contain in Bodija",
    type: "Studio",
    state: "Ibadan",
    address: "Bodija, Ibadan",
    price: 55000,
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    furnished: "No",
    description: "Highly budget-friendly, neat self-contained studio flat situated in the popular Bodija residential area, Ibadan. Features standard room dimensions, simple kitchenette with cabinets, and clean tiled restroom. Extremely close to retail shops, cafes, and academic institutions, making it ideal for budget-conscious individuals or students.",
    amenities: ["Security", "Water"],
    agentName: "Oluwole Adebayo",
    agentPhone: "+234 802 333 4444",
    status: "Active",
    datePosted: "2026-05-29",
    savesCount: 11,
    rating: 4.42,
    reviewsCount: 29,
    gradient: "from-orange-500 to-amber-600",
    color: "#F59E0B",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 6,
    title: "4-Bed Detached House in Jabi",
    type: "House",
    state: "Abuja",
    address: "Jabi, Abuja",
    price: 380000,
    bedrooms: 4,
    bathrooms: 3,
    area: 260,
    furnished: "Yes",
    description: "Exquisite 4-bedroom detached house for rent in the serene neighbourhood of Jabi, Abuja. Features spacious ante-room, luxurious main lounge, high-end marble floors, and fully fitted kitchen with double-door refrigerator. The compound is spacious, featuring parking spaces for 4 cars, a standby gen, and access to Jabi lake views nearby.",
    amenities: ["Parking", "Security", "Water", "Generator"],
    agentName: "Musa Ibrahim",
    agentPhone: "+234 809 987 6543",
    status: "Active",
    datePosted: "2026-05-18",
    savesCount: 6,
    rating: 4.88,
    reviewsCount: 22,
    gradient: "from-sky-500 to-blue-600",
    color: "#0EA5E9",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 7,
    title: "Mini Flat in Surulere",
    type: "Apartment",
    state: "Lagos",
    address: "Surulere, Lagos",
    price: 95000,
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    furnished: "No",
    description: "Renovated 1-bedroom mini flat located in the heart of Surulere, Lagos. The apartment has a spacious living room, compact bedroom, clean bathroom, and fully tiled floors. Centrally located with close proximity to Adeniran Ogunsanya Mall and quick links to the Island via the Eko Bridge.",
    amenities: ["Parking", "Security", "Water"],
    agentName: "Adebayo Alao",
    agentPhone: "+234 803 123 4567",
    status: "Active",
    datePosted: "2026-05-27",
    savesCount: 2,
    rating: 4.56,
    reviewsCount: 14,
    gradient: "from-indigo-500 to-blue-700",
    color: "#6366F1",
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 8,
    title: "3-Bed Terrace in Ikeja GRA",
    type: "House",
    state: "Lagos",
    address: "Ikeja GRA, Lagos",
    price: 310000,
    bedrooms: 3,
    bathrooms: 3,
    area: 175,
    furnished: "Yes",
    description: "Fabulous and stylish 3-bedroom terrace house within a quiet gated community in Ikeja GRA, Lagos. Comes with all bedrooms ensuite, modern fitted wardrobes, spacious kitchen with smoke extractor, and highly polished floors. Amenities include dedicated parking, 24/7 armed patrol guards, central clean water, a swimming pool, and fully equipped gym.",
    amenities: ["Parking", "Security", "Water", "Generator", "Pool", "Gym"],
    agentName: "Chioma Nze",
    agentPhone: "+234 812 345 6789",
    status: "Active",
    datePosted: "2026-05-15",
    savesCount: 9,
    rating: 4.89,
    reviewsCount: 38,
    gradient: "from-fuchsia-500 to-pink-600",
    color: "#D946EF",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 9,
    title: "1-Bed Flat in Wuse 2",
    type: "Apartment",
    state: "Abuja",
    address: "Wuse 2, Abuja",
    price: 140000,
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    furnished: "Yes",
    description: "Fully furnished 1-bedroom apartment in the bustling heart of Wuse 2, Abuja. Impeccably decorated, it features a smart flat-screen TV, high-speed internet capability, comfortable leather sofas, and a modern dining area. Suitable for short stays or corporate rentals. Outstanding central location close to restaurants, malls, and active hubs.",
    amenities: ["Parking", "Security", "Water", "Generator"],
    agentName: "Musa Ibrahim",
    agentPhone: "+234 809 987 6543",
    status: "Active",
    datePosted: "2026-05-26",
    savesCount: 14,
    rating: 4.70,
    reviewsCount: 26,
    gradient: "from-blue-600 to-violet-700",
    color: "#2563EB",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 10,
    title: "Bungalow in New GRA",
    type: "House",
    state: "Kano",
    address: "New GRA, Kano",
    price: 75000,
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    furnished: "No",
    description: "Charming 3-bedroom detached bungalow located in the elite New GRA residential zone of Kano. Possesses large airy rooms, standard bathrooms, a large kitchen, and wide windows for natural ventilation. Perfect for families seeking a secure and spacious yard, ample water supply, and private compound privacy.",
    amenities: ["Parking", "Security", "Water"],
    agentName: "Aliyu Kano",
    agentPhone: "+234 806 777 8888",
    status: "Active",
    datePosted: "2026-05-10",
    savesCount: 1,
    rating: 4.35,
    reviewsCount: 9,
    gradient: "from-teal-500 to-cyan-600",
    color: "#14B8A6",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const INITIAL_CUSTOMERS = [
  { id: "c1", name: "Jane Doe", email: "customer@affordahome.com", avatar: "JD", joinDate: "2026-05-01", savedCount: 3, lastActive: "Active 5m ago" },
  { id: "c2", name: "Jane Smith", email: "jane@gmail.com", avatar: "JS", joinDate: "2026-05-12", savedCount: 1, lastActive: "Active 2h ago" },
  { id: "c3", name: "Tunde Alao", email: "tunde@outlook.com", avatar: "TA", joinDate: "2026-04-20", savedCount: 0, lastActive: "Active 3 days ago" }
];

// ============================================================
// ⚙️ Reducer & Utility Functions
// ============================================================

const listingsReducer = (state: any[], action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "ADD_LISTING":     return [action.payload, ...state];
    case "EDIT_LISTING":    return state.map(i => i.id === action.payload.id ? action.payload : i);
    case "DELETE_LISTING":  return state.filter(i => i.id !== action.payload);
    case "BULK_DELETE":     return state.filter(i => !action.payload.includes(i.id));
    case "TOGGLE_SAVE_COUNT": {
      const { id, increment } = action.payload;
      return state.map(i => i.id === id ? { ...i, savesCount: Math.max(0, i.savesCount + (increment ? 1 : -1)) } : i);
    }
    default: return state;
  }
};

const getGreeting = (name: string) => {
  const hr = new Date().getHours();
  if (hr < 12) return `Good morning, ${name.split(" ")[0]} ☀️`;
  if (hr < 17) return `Good afternoon, ${name.split(" ")[0]} 🌤`;
  return `Good evening, ${name.split(" ")[0]} 🌙`;
};

// ============================================================
// ⏳ Custom hooks & animations
// ============================================================

function useCountUp(endVal: number, durationMs = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(String(endVal)) || 0;
    if (end === 0) {
      setCount(0);
      return;
    }
    const incrementTime = 20; // 50 FPS
    const steps = durationMs / incrementTime;
    const stepValue = end / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(current));
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [endVal, durationMs]);
  
  return count;
}

const CountUp = ({ val, duration = 1000 }: { val: number; duration?: number }) => {
  const count = useCountUp(val, duration);
  return <span>{count.toLocaleString()}</span>;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <div className="animate-fade-in-up duration-300">
    {children}
  </div>
);

// ============================================================
// 🎨 Gradient placeholder
// ============================================================
const PropertyGradient = ({ gradient, icon: Icon = Building2, className = "h-48" }: any) => (
  <div className={`relative w-full ${className} bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px]" />
    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    <Icon className="w-12 h-12 text-white/20 relative z-10" />
  </div>
);

// ============================================================
// ⏳ Skeleton Loader
// ============================================================
const SkeletonLoader = () => (
  <div className="flex flex-col h-screen bg-[#F0F4FF] dot-grid">
    <div className="h-16 bg-white/80 border-b border-blue-100 flex items-center px-12 gap-3 justify-between">
      <div className="flex items-center gap-3">
        <div className="skeleton w-8 h-8 rounded-xl" />
        <div className="skeleton h-5 w-32 rounded-lg" />
      </div>
      <div className="flex gap-4">
        <div className="skeleton h-8 w-24 rounded-lg" />
        <div className="skeleton h-8 w-24 rounded-lg" />
      </div>
    </div>
    <div className="max-w-7xl mx-auto w-full p-8 space-y-6 flex-1">
      <div className="skeleton h-44 w-full rounded-3xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="skeleton h-[360px] w-full rounded-2xl" />)}
      </div>
    </div>
  </div>
);

// ============================================================
// 🔔 Toast System Component
// ============================================================
const ToastList = ({ toasts, onClose }: { toasts: any[]; onClose: (id: number) => void }) => (
  <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
    {toasts.map(toast => (
      <div
        key={toast.id}
        className={`animate-slide-right flex items-center gap-3 px-4.5 py-4 rounded-2xl shadow-xl border text-sm font-semibold pointer-events-auto transition-all ${
          toast.type === "success" ? "bg-white border-emerald-100 text-slate-800"
          : toast.type === "error" ? "bg-white border-rose-100 text-slate-800 animate-shake"
          : toast.type === "warning" ? "bg-white border-amber-100 text-slate-800"
          : "bg-white border-blue-100 text-slate-800"
        }`}
        style={{ backdropFilter: "blur(20px)" }}
      >
        <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          toast.type === "success" ? "bg-emerald-500" 
          : toast.type === "error" ? "bg-rose-500" 
          : toast.type === "warning" ? "bg-amber-500" 
          : "bg-blue-500"
        }`}>
          {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-white" />}
          {toast.type === "error" && <XCircle className="w-4 h-4 text-white" />}
          {toast.type === "warning" && <AlertCircle className="w-4 h-4 text-white" />}
          {toast.type === "info" && <Info className="w-4 h-4 text-white" />}
        </span>
        <span className="flex-1 text-slate-700 leading-tight">{toast.message}</span>
        <button
          onClick={() => onClose(toast.id)}
          className="text-slate-400 hover:text-slate-600 w-6 h-6 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    ))}
  </div>
);




// ============================================================
// 🏠 Property Card (Airbnb-Style Flat Grid Friendly)
// ============================================================
const PropertyCard = ({ property, isSaved, onSave, onView }: any) => {
  const isNew = (Date.now() - new Date(property.datePosted).getTime()) / (1000 * 60 * 60 * 24) <= 7;
  const isHot = property.savesCount >= 10;
  const [clicked, setClicked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = property.images && property.images.length > 0 
    ? property.images 
    : [property.gradient || "from-slate-400 to-slate-600"];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="flex flex-col h-full cursor-pointer group focus-ring relative"
      onClick={() => onView(property.id)}
    >
      {/* Image Area with Carousel */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all duration-300">
        
        {/* Carousel Slide container */}
        <div className="w-full h-full relative overflow-hidden">
          {images[activeImageIndex].startsWith("http") ? (
            <img 
              src={images[activeImageIndex]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <PropertyGradient gradient={images[activeImageIndex]} className="w-full h-full" />
          )}
        </div>

        {/* Carousel Navigation Arrows (visible on hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white hover:scale-105 shadow-md flex items-center justify-center text-slate-700 transition-all opacity-0 group-hover:opacity-100 z-10 focus-ring"
            >
              <ChevronLeft className="w-4 h-4 text-slate-800" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white hover:scale-105 shadow-md flex items-center justify-center text-slate-700 transition-all opacity-0 group-hover:opacity-100 z-10 focus-ring"
            >
              <ChevronRight className="w-4 h-4 text-slate-800" />
            </button>
          </>
        )}

        {/* Carousel Indicator Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_: any, idx: number) => (
              <div 
                key={idx} 
                className={`carousel-dot ${activeImageIndex === idx ? 'active' : ''}`}
              />
            ))}
          </div>
        )}

        {/* Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10 pointer-events-none">
          {isNew && (
            <span className="bg-white text-slate-900 text-[10px] font-extrabold uppercase tracking-widest py-1 px-2.5 rounded-full shadow-sm">
              NEW ✨
            </span>
          )}
          {isHot && (
            <span className="bg-[#FF385C] text-white text-[10px] font-extrabold uppercase tracking-widest py-1 px-2.5 rounded-full shadow-sm flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" /> POPULAR
            </span>
          )}
        </div>
        
        {/* Save (Heart) Button (Top Right) */}
        <button
          onClick={e => { 
            e.stopPropagation(); 
            setClicked(true);
            setTimeout(() => setClicked(false), 400);
            onSave(property.id); 
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all duration-200 focus-ring ${
            clicked ? "animate-shake scale-110" : "hover:scale-105"
          } ${
            isSaved ? "bg-[#FF385C] text-white" : "bg-white/80 backdrop-blur-md text-slate-750 hover:bg-white"
          }`}
        >
          <Heart className={`w-4 h-4 transition-all ${isSaved ? "fill-white text-white" : "text-slate-800"}`} />
        </button>
      </div>

      {/* Card Body */}
      <div className="pt-3 pb-1 flex flex-col justify-between flex-1 text-left">
        <div>
          {/* First row: State & Star Rating */}
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-[#222222] font-bold text-sm tracking-tight">{property.address}</span>
            <span className="flex items-center gap-1 text-[#222222] text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-[#FF385C] text-[#FF385C]" />
              <span>{property.rating ? property.rating.toFixed(2) : "4.80"}</span>
            </span>
          </div>

          {/* Second row: Subtitle details */}
          <p className="text-slate-400 text-xs mt-0.5 font-medium flex items-center gap-1">
            <span>{property.bedrooms} Bed · {property.bathrooms} Bath · {property.area} m²</span>
            <span>·</span>
            <span className="uppercase text-[9px] font-black tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              {property.type}
            </span>
          </p>

          {/* Third row: Rent details */}
          <p className="text-xs text-slate-400 mt-1 font-medium truncate">
            {property.furnished === "Yes" ? "Fully Furnished" : "Unfurnished"} · Vetted stay
          </p>
        </div>

        {/* Pricing tag */}
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-[16px] font-black text-[#222222] font-mono">₦{property.price.toLocaleString()}</span>
          <span className="text-xs text-slate-400 font-medium">/ month</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 🏠 MAIN COMPONENT WITH CUSTOM ROUTER & WEB APP LAYOUT
// ============================================================
export default function Home() {

  // Core state
  const [initialLoading, setInitialLoading] = useState(true);
  const [listings, dispatchListings] = useReducer(listingsReducer, INITIAL_LISTINGS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);

  // Router State
  const [currentPath, setCurrentPath] = useState("/");

  // Auth
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [shakeLogin, setShakeLogin] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Customer state & preferences
  const [savedProperties, setSavedProperties] = useState<Set<any>>(new Set());
  const [viewedProperties, setViewedProperties] = useState<Set<any>>(new Set());

  // Search / filters
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTypeFilter, setActiveTypeFilter] = useState("All");
  const [filterBedrooms, setFilterBedrooms] = useState("Any");
  const [filterPrice, setFilterPrice] = useState(500000);
  const [filterState, setFilterState] = useState("All");
  const [gridLoading, setGridLoading] = useState(false);
  const [activeSearch, setActiveSearch] = useState({ query: "", type: "All", bedrooms: "Any", priceRange: 500000, state: "All" });
  const [searchDropdownOpen, setSearchDropdownOpen] = useState<string | null>(null);
  const [rentDuration, setRentDuration] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("June 2026");

  // Admin view (dashboard | manage | customers | settings)
  const [adminView, setAdminView] = useState("dashboard");
  const [adminSearch, setAdminSearch] = useState("");
  const [adminFilterType, setAdminFilterType] = useState("All");
  const [adminFilterStatus, setAdminFilterStatus] = useState("All");
  const [adminCurrentPage, setAdminCurrentPage] = useState(1);
  const [selectedListings, setSelectedListings] = useState<any[]>([]);

  // Form Modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formListing, setFormListing] = useState<any>({
    id: null, title: "", type: "House", state: "Lagos", address: "", price: "",
    bedrooms: 1, bathrooms: 1, area: "", furnished: "No", description: "",
    amenities: [], agentName: "", agentPhone: "", status: "Active"
  });
  const [formErrors, setFormErrors] = useState<any>({});

  // Toasts
  const [toasts, setToasts] = useState<any[]>([]);

  // ============================================================
  // Router Engine & Popstate Listener
  // ============================================================
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
      const handlePopState = () => {
        setCurrentPath(window.location.pathname);
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, []);

  const navigate = (to: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", to);
      setCurrentPath(to);
    }
  };

  // Helper dynamic matching for /property/:id
  const dynamicPropertyId = useMemo(() => {
    const match = currentPath.match(/^\/property\/([a-zA-Z0-9_-]+)$/);
    return match ? Number(match[1]) : null;
  }, [currentPath]);

  // Protected Routes & Auth Redirect Engine
  useEffect(() => {
    if (initialLoading) return;

    // Check auth guards
    if (!currentUser) {
      if (currentPath !== "/") {
        navigate("/");
        showToast("Please sign in first 🔐", "info");
      }
    } else {
      // Authenticated guards
      if (currentUser.role === "customer") {
        const isCustomerRoute = currentPath === "/browse" || currentPath === "/saved" || currentPath === "/account" || currentPath.startsWith("/property/");
        if (!isCustomerRoute) {
          navigate("/browse");
          showToast("Redirected to browse listings 🏘", "info");
        }
      } else if (currentUser.role === "admin") {
        const isAdminRoute = currentPath === "/admin" || currentPath === "/admin/listings" || currentPath === "/admin/new" || currentPath === "/admin/customers" || currentPath === "/admin/settings";
        if (!isAdminRoute) {
          navigate("/admin");
          showToast("Redirected to admin dashboard 🛠", "info");
        }
      }
    }
  }, [currentUser, currentPath, initialLoading]);

  // Toast Helpers
  const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => {
      setToasts(p => p.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts(p => p.filter(t => t.id !== id));
  };

  useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // ============================================================
  // Property Actions
  // ============================================================
  const toggleSaveProperty = (propertyId: any) => {
    const isSaved = savedProperties.has(propertyId);
    const ns = new Set(savedProperties);
    if (isSaved) {
      ns.delete(propertyId);
      dispatchListings({ type: "TOGGLE_SAVE_COUNT", payload: { id: propertyId, increment: false } });
      showToast("Removed from Saved properties", "warning");
    } else {
      ns.add(propertyId);
      dispatchListings({ type: "TOGGLE_SAVE_COUNT", payload: { id: propertyId, increment: true } });
      showToast("Property saved to collection ❤️", "success");
    }
    setSavedProperties(ns);
    if (currentUser) {
      setCustomers(p => p.map(c => c.email === currentUser.email ? { ...c, savedCount: ns.size } : c));
    }
  };

  const handleShareProperty = (property: any) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/property/${property.id}`);
      showToast("Listing URL copied to clipboard! 📋", "success");
    }
  };

  // ============================================================
  // Auth Submit Handlers
  // ============================================================
  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) { 
      setLoginError("Please enter both email and password."); 
      triggerShake();
      return; 
    }

    if (loginRole === "admin") {
      if (loginEmail === "admin@affordahome.com" && loginPassword === "admin123") {
        setSuccessAnimation(true);
        setTimeout(() => {
          setCurrentUser({ name: "Admin Chief", email: loginEmail, role: "admin", avatar: "AD" });
          setLoginError("");
          setSuccessAnimation(false);
          showToast("Authorized as Portal Administrator 🛠️", "success");
          navigate("/admin");
        }, 1200);
      } else {
        setLoginError("Invalid administrator credentials.");
        triggerShake();
      }
    } else {
      if (loginEmail === "customer@affordahome.com" && loginPassword === "home2024") {
        setSuccessAnimation(true);
        setTimeout(() => {
          setCurrentUser({ name: "Jane Doe", email: loginEmail, role: "customer", avatar: "JD" });
          setSavedProperties(new Set([2, 5, 9]));
          setLoginError("");
          setSuccessAnimation(false);
          showToast("Welcome back to AffordaHome, Jane! 👋", "success");
          navigate("/browse");
        }, 1200);
      } else if (loginEmail === "jane@gmail.com" && loginPassword === "pass1234") {
        setSuccessAnimation(true);
        setTimeout(() => {
          setCurrentUser({ name: "Jane Smith", email: loginEmail, role: "customer", avatar: "JS" });
          setSavedProperties(new Set([3]));
          setLoginError("");
          setSuccessAnimation(false);
          showToast("Logged in successfully. Welcome Jane! 👋", "success");
          navigate("/browse");
        }, 1200);
      } else {
        setLoginError("Incorrect password or username. Please check your spelling.");
        triggerShake();
      }
    }
  };

  const triggerShake = () => {
    setShakeLogin(true);
    showToast("Login authentication failed", "error");
    setTimeout(() => setShakeLogin(false), 500);
  };

  const quickFill = (email: string, pass: string, role: string) => {
    setLoginEmail(email); 
    setLoginPassword(pass); 
    setLoginRole(role); 
    setLoginError("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSavedProperties(new Set());
    setViewedProperties(new Set());
    setSearchQuery(""); 
    setActiveTypeFilter("All"); 
    setFilterBedrooms("Any");
    setFilterPrice(500000); 
    setFilterState("All");
    setActiveSearch({ query: "", type: "All", bedrooms: "Any", priceRange: 500000, state: "All" });
    showToast("Signed out of your session. Goodbye! 👋", "info");
    navigate("/");
  };

  // ============================================================
  // Search & Filter Handler
  // ============================================================
  const handleSearch = () => {
    setGridLoading(true);
    setTimeout(() => {
      setActiveSearch({ query: searchQuery, type: activeTypeFilter, bedrooms: filterBedrooms, priceRange: filterPrice, state: filterState });
      setGridLoading(false);
      showToast(`Filter update completed. Showing matches 🔍`, "success");
    }, 350);
  };

  const resetFilters = () => {
    setSearchQuery(""); 
    setActiveTypeFilter("All"); 
    setFilterBedrooms("Any");
    setFilterPrice(500000); 
    setFilterState("All");
    setActiveSearch({ query: "", type: "All", bedrooms: "Any", priceRange: 500000, state: "All" });
    showToast("Filters reset to default states ✨", "info");
  };

  // Memoized Filtered Lists
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      if (item.status !== "Active") return false;
      const q = activeSearch.query.toLowerCase();
      const matchesText = !q || item.title.toLowerCase().includes(q) || item.address.toLowerCase().includes(q) || item.state.toLowerCase().includes(q);
      const matchesType = activeSearch.type === "All" || item.type === activeSearch.type;
      let matchesBeds = true;
      if (activeSearch.bedrooms !== "Any") {
        const v = parseInt(activeSearch.bedrooms);
        matchesBeds = activeSearch.bedrooms.includes("+") ? item.bedrooms >= v : item.bedrooms === v;
      }
      const matchesPrice = item.price <= activeSearch.priceRange;
      const matchesState = activeSearch.state === "All" || item.state === activeSearch.state;
      return matchesText && matchesType && matchesBeds && matchesPrice && matchesState;
    });
  }, [listings, activeSearch]);

  const selectedProperty = useMemo(() =>
    dynamicPropertyId ? listings.find(i => i.id === dynamicPropertyId) : null,
    [listings, dynamicPropertyId]
  );

  const savedPropertiesList = useMemo(() =>
    listings.filter(i => savedProperties.has(i.id)),
    [listings, savedProperties]
  );

  // ============================================================
  // Admin Dashboard Calculators
  // ============================================================
  const adminFilteredListings = useMemo(() => {
    return listings.filter(item => {
      const q = adminSearch.toLowerCase();
      const matchesText = !q || item.title.toLowerCase().includes(q) || item.address.toLowerCase().includes(q);
      const matchesType = adminFilterType === "All" || item.type === adminFilterType;
      const matchesStatus = adminFilterStatus === "All" || item.status === adminFilterStatus;
      return matchesText && matchesType && matchesStatus;
    });
  }, [listings, adminSearch, adminFilterType, adminFilterStatus]);

  const LISTINGS_PER_PAGE = 5;
  const totalAdminPages = Math.ceil(adminFilteredListings.length / LISTINGS_PER_PAGE);
  const paginatedAdminListings = useMemo(() => {
    const start = (adminCurrentPage - 1) * LISTINGS_PER_PAGE;
    return adminFilteredListings.slice(start, start + LISTINGS_PER_PAGE);
  }, [adminFilteredListings, adminCurrentPage]);

  useEffect(() => { setAdminCurrentPage(1); }, [adminSearch, adminFilterType, adminFilterStatus]);

  const mostSavedProperties = useMemo(() =>
    [...listings].sort((a, b) => b.savesCount - a.savesCount).slice(0, 3),
    [listings]
  );

  const dashboardStats = useMemo(() => ({
    total: listings.length,
    active: listings.filter(l => l.status === "Active").length,
    saves: listings.reduce((s, l) => s + (l.savesCount || 0), 0),
    customers: customers.length
  }), [listings, customers]);

  const toggleSelectListing = (id: any) =>
    setSelectedListings(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);

  const toggleSelectAll = (pageListings: any[]) => {
    const ids = pageListings.map(l => l.id);
    const allSelected = ids.every(id => selectedListings.includes(id));
    if (allSelected) setSelectedListings(p => p.filter(id => !ids.includes(id)));
    else setSelectedListings(p => Array.from(new Set([...p, ...ids])));
  };

  const executeBulkDelete = () => {
    if (!selectedListings.length) return;
    dispatchListings({ type: "BULK_DELETE", payload: selectedListings });
    showToast(`Deleted ${selectedListings.length} properties from records 🗑️`, "success");
    setSelectedListings([]);
    setAdminCurrentPage(1);
  };

  const executeDeleteListing = (id: any, title: string) => {
    dispatchListings({ type: "DELETE_LISTING", payload: id });
    setSelectedListings(p => p.filter(i => i !== id));
    showToast(`"${title}" deleted successfully 🗑️`, "success");
  };

  // ============================================================
  // Form modal controller
  // ============================================================
  const GRADIENTS = [
    "from-blue-500 to-cyan-600", "from-violet-500 to-purple-700",
    "from-rose-500 to-pink-600", "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600", "from-sky-500 to-blue-600",
    "from-indigo-500 to-blue-700", "from-fuchsia-500 to-pink-600"
  ];

  const handleOpenFormModal = (listingToEdit: any = null) => {
    if (listingToEdit) {
      setFormListing({ ...listingToEdit, amenities: listingToEdit.amenities || [] });
    } else {
      const rg = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
      setFormListing({
        id: null, title: "", type: "House", state: "Lagos", address: "", price: "",
        bedrooms: 1, bathrooms: 1, area: "", furnished: "No", description: "",
        amenities: [], agentName: "", agentPhone: "", status: "Active",
        gradient: rg, images: [rg], datePosted: new Date().toISOString().split("T")[0]
      });
    }
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const errors: any = {};
    if (!formListing.title.trim()) errors.title = "Title is required";
    if (!formListing.address.trim()) errors.address = "Address is required";
    if (!formListing.price || isNaN(formListing.price) || Number(formListing.price) <= 0) errors.price = "Enter a valid rent amount";
    if (!formListing.area || isNaN(formListing.area) || Number(formListing.area) <= 0) errors.area = "Enter a valid floor area";
    if (!formListing.description.trim()) errors.description = "Description is required";
    else if (formListing.description.trim().length < 100) errors.description = `Min 100 characters (${formListing.description.length} currently)`;
    if (!formListing.agentName.trim()) errors.agentName = "Agent name is required";
    if (!formListing.agentPhone.trim()) errors.agentPhone = "Agent phone is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast("Check highlighted validation errors", "warning");
      return;
    }

    const payload = { ...formListing, price: Number(formListing.price), area: Number(formListing.area),
      savesCount: formListing.id ? listings.find(l => l.id === formListing.id)?.savesCount ?? 0 : 0 };

    if (formListing.id) {
      dispatchListings({ type: "EDIT_LISTING", payload });
      showToast("Property listing modified successfully ✏️", "success");
    } else {
      payload.id = Date.now();
      dispatchListings({ type: "ADD_LISTING", payload });
      showToast("Successfully posted new property listing! 🏡", "success");
    }
    setIsFormOpen(false);
  };

  const toggleFormAmenity = (name: string) => {
    setFormListing((p: any) => ({
      ...p,
      amenities: p.amenities.includes(name) ? p.amenities.filter((a: string) => a !== name) : [...p.amenities, name]
    }));
  };

  if (initialLoading) return <SkeletonLoader />;

  // ============================================================
  // 1. PUBLIC ROUTE: Login Page (Wide Web App Split View)
  // ============================================================
  if (!currentUser) {
    return (
      <div className="flex min-h-screen bg-slate-900 overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
        
        {/* Left Branding Panel: Immersive Unsplash Photo Background */}
        <div className="hidden lg:flex lg:w-7/12 relative items-center justify-center p-16 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85')" }}>
          {/* Elegant Dark Glass Overlay */}
          <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] z-0" />
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] dot-grid z-1" />
          
          <div className="relative z-10 max-w-lg text-white">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl animate-fade-in-up">
              <HouseIcon className="w-6.5 h-6.5 text-white" />
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-none mb-4 animate-fade-in-up font-display">
              AffordaHome
            </h1>
            <p className="text-white/90 text-lg font-medium mb-8 leading-relaxed animate-fade-in-up">
              Find verified premium homes at local rates across Nigeria. Experience luxury within your budget.
            </p>
            
            {/* Active Listing counters */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/15 animate-fade-in-up">
              {[
                { count: listings.length, label: "Verified Stays" },
                { count: "5", label: "Inspected Cities" },
                { count: "100%", label: "KYC Verified" }
              ].map(({ count, label }) => (
                <div key={label}>
                  <p className="text-2.5xl font-black text-white">{count}</p>
                  <p className="text-white/70 text-xs mt-1.5 leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form Card Panel */}
        <div className={`w-full lg:w-5/12 bg-white flex flex-col justify-center px-8 sm:px-16 py-12 relative ${shakeLogin ? "animate-shake" : ""}`}>
          <div className="max-w-md mx-auto w-full">
            
            {/* Mobile Branding (only shows on mobile screens) */}
            <div className="lg:hidden flex items-center gap-3.5 mb-8 animate-fade-in-up">
              <div className="w-11 h-11 bg-[#FF385C] rounded-2xl flex items-center justify-center shadow-md">
                <HouseIcon className="w-5.5 h-5.5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#222222] tracking-tight">AffordaHome</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Premium Portal</p>
              </div>
            </div>

            {/* Title */}
            <div className="mb-8 animate-fade-in-up">
              <h2 className="text-3xl font-black text-[#222222] tracking-tight">Welcome Back</h2>
              <p className="text-slate-400 text-sm mt-1">Please authenticate your portal credentials below.</p>
            </div>

            {/* Success Checkmark Sequence */}
            {successAnimation ? (
              <div className="p-8 text-center bg-emerald-50 rounded-3xl border border-emerald-100 animate-scale-in my-6">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-in">
                  <Check className="w-8 h-8 stroke-3" />
                </div>
                <h3 className="font-black text-emerald-800 text-[17px]">Authentication Successful!</h3>
                <p className="text-emerald-500 text-xs mt-1">Establishing portal route session...</p>
              </div>
            ) : (
              <>
                {/* Login Role Toggle */}
                <div className="bg-slate-100 p-1 rounded-2xl flex gap-1 mb-6 animate-fade-in-up">
                  {[["customer", "👤 Customer Portal"], ["admin", "🛠️ Administrator"]].map(([role, label]) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => { setLoginRole(role); setLoginError(""); }}
                      className={`flex-1 py-3 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-300 ${
                        loginRole === role
                          ? "bg-white text-[#222222] shadow-sm border border-slate-200/50"
                          : "text-slate-500 hover:text-[#222222]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {loginError && (
                  <div className="animate-fade-in flex items-center gap-3 bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-2xl mb-6 text-xs sm:text-sm font-semibold">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-5 animate-fade-in-up">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Portal Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-[17px] w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        placeholder="e.g. customer@affordahome.com"
                        className="input-field pl-12 focus-ring"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Access Password</label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-[17px] w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="input-field pl-12 pr-12 focus-ring"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(s => !s)}
                        className="absolute right-4 top-[17px] text-slate-400 hover:text-[#222222] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full py-4 text-center mt-3 text-[15px]">
                    Sign In to Portal
                  </button>
                </form>

                {/* Quick Demo Accounts */}
                <div className="mt-8 pt-6 border-t border-slate-100 animate-fade-in-up">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Quick Demo Accounts</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { label: "Jane Doe (Customer)", email: "customer@affordahome.com", pass: "home2024", role: "customer" },
                      { label: "Portal Admin", email: "admin@affordahome.com", pass: "admin123", role: "admin" }
                    ].map(acc => (
                      <button
                        key={acc.email}
                        type="button"
                        onClick={() => quickFill(acc.email, acc.pass, acc.role)}
                        className="text-left p-3.5 rounded-xl border border-slate-150 bg-slate-50/70 hover:border-slate-350 hover:bg-slate-50 transition-all flex items-center justify-between gap-2 focus-ring"
                      >
                        <div className="min-w-0">
                          <span className="font-extrabold text-[#222222] text-xs truncate block">{acc.label}</span>
                          <span className="text-[10px] text-slate-450 truncate block mt-0.5">{acc.email}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-450 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <ToastList toasts={toasts} onClose={removeToast} />
      </div>
    );
  }

  // ============================================================
  // 2. CLIENT ROUTE: CUSTOMER PORTAL (Responsive Full-Width Web App)
  // ============================================================
  if (currentUser.role === "customer") {
    const TYPE_FILTERS = ["All", "House", "Apartment", "Studio", "Duplex"];
    
    return (
      <div className="min-h-screen bg-[#F8FAFF] dot-grid flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

        {/* ── Top Header Navigation (Desktop Friendly Glassmorphism) ── */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-blue-50/50 shadow-sm transition-all duration-300 h-20">
          <div className="max-w-7xl mx-auto w-full h-full px-6 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/browse")}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-md">
                <HouseIcon className="w-5.5 h-5.5 text-white" />
              </div>
              <div>
                <h1 className="font-black text-slate-800 text-[18px] tracking-tight leading-none">AffordaHome</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Web Platform</p>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="flex items-center gap-1.5 md:gap-3">
              {[
                { path: "/browse", icon: HouseIcon, label: "Browse Listings" },
                { path: "/saved",  icon: Bookmark, label: "Saved Collection", badge: savedProperties.size },
                { path: "/account", icon: User, label: "My Profile" }
              ].map(({ path, icon: Icon, label, badge }) => {
                const isActive = currentPath === path;
                return (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all focus-ring relative ${
                      isActive 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-150" 
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">{label}</span>
                    {badge > 0 && (
                      <span className={`text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center ${
                        isActive ? "bg-white text-blue-600" : "bg-blue-100 text-blue-700"
                      }`}>
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="w-[1px] h-6 bg-slate-200 mx-2 hidden sm:block" />

              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center justify-center border border-slate-100 hover:border-rose-100 shadow-sm transition-all focus-ring"
                title="Sign Out"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </nav>
          </div>
        </header>

        {/* ── Main Responsive Content Area ── */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 relative">
          
            <PageTransition>
              <div className="space-y-8 relative">
                
                {/* Click-away backdrop for search dropdowns */}
                {searchDropdownOpen && (
                  <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setSearchDropdownOpen(null)} />
                )}

                {/* Airbnb Expandable Floating Search Pill */}
                <div className="max-w-3xl mx-auto relative z-40">
                  <div className="bg-white border border-slate-200 rounded-full py-2.5 pl-8 pr-3 flex items-center justify-between shadow-airbnb-search hover:shadow-airbnb-search-hover transition-all duration-300 cursor-pointer relative">
                    <div className="flex-1 grid grid-cols-3 divide-x divide-slate-150 text-left">
                      {/* Where section */}
                      <div className="px-4 py-1 cursor-pointer hover:bg-slate-50 rounded-full transition-colors" onClick={(e) => { e.stopPropagation(); setSearchDropdownOpen(searchDropdownOpen === 'location' ? null : 'location'); }}>
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-800">Where</p>
                        <p className="text-[13px] text-slate-500 font-medium truncate mt-0.5">{filterState === 'All' ? 'All regions' : filterState}</p>
                      </div>
                      {/* Price Limit section */}
                      <div className="px-5 py-1 cursor-pointer hover:bg-slate-50 rounded-full transition-colors" onClick={(e) => { e.stopPropagation(); setSearchDropdownOpen(searchDropdownOpen === 'price' ? null : 'price'); }}>
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-800">Max Rent</p>
                        <p className="text-[13px] text-slate-500 font-medium truncate mt-0.5">₦{(filterPrice/1000).toFixed(0)}k/mo</p>
                      </div>
                      {/* Bedrooms section */}
                      <div className="px-5 py-1 cursor-pointer hover:bg-slate-50 rounded-full transition-colors" onClick={(e) => { e.stopPropagation(); setSearchDropdownOpen(searchDropdownOpen === 'bedrooms' ? null : 'bedrooms'); }}>
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-800">Bedrooms</p>
                        <p className="text-[13px] text-slate-500 font-medium truncate mt-0.5">{filterBedrooms === 'Any' ? 'Any Beds' : `${filterBedrooms} Bedrooms`}</p>
                      </div>
                    </div>
                    
                    {/* Action Search button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSearch(); setSearchDropdownOpen(null); }} 
                      className="w-12 h-12 rounded-full bg-[#FF385C] hover:bg-[#E61E4D] text-white flex items-center justify-center transition-colors shadow-md ml-2 flex-shrink-0 focus-ring"
                      title="Search Listings"
                    >
                      <Search className="w-4.5 h-4.5 stroke-[3]" />
                    </button>

                    {/* Dropdown 1: Location */}
                    {searchDropdownOpen === 'location' && (
                      <div className="absolute top-20 left-0 w-80 bg-white border border-slate-100 rounded-3xl p-5 shadow-airbnb-dialog animate-scale-in text-left">
                        <h4 className="font-extrabold text-sm mb-3.5 text-slate-800 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#FF385C]" /> Nigeria Regions
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {["All", "Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"].map(state => (
                            <button 
                              key={state} 
                              type="button" 
                              onClick={() => { setFilterState(state); }} 
                              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-between ${filterState === state ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-transparent'}`}
                            >
                              <span>{state === 'All' ? 'All regions' : state}</span>
                              {filterState === state && <Check className="w-3.5 h-3.5 text-white" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dropdown 2: Price Limit */}
                    {searchDropdownOpen === 'price' && (
                      <div className="absolute top-20 left-[25%] md:left-[33%] w-80 bg-white border border-slate-100 rounded-3xl p-5 shadow-airbnb-dialog animate-scale-in text-left">
                        <div className="flex justify-between items-center mb-3.5">
                          <h4 className="font-extrabold text-sm text-slate-800">Maximum Budget</h4>
                          <span className="text-[#FF385C] font-extrabold text-sm">₦{filterPrice.toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min="50000" max="500000" step="10000"
                          value={filterPrice}
                          onChange={e => setFilterPrice(Number(e.target.value))}
                          className="w-full accent-[#FF385C] cursor-pointer mb-2.5"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>₦50k</span><span>₦500k</span>
                        </div>
                      </div>
                    )}

                    {/* Dropdown 3: Bedrooms */}
                    {searchDropdownOpen === 'bedrooms' && (
                      <div className="absolute top-20 right-0 w-80 bg-white border border-slate-100 rounded-3xl p-5 shadow-airbnb-dialog animate-scale-in text-left">
                        <h4 className="font-extrabold text-sm mb-3.5 text-slate-800 flex items-center gap-1.5">
                          <Bed className="w-4 h-4 text-[#FF385C]" /> Bedroom Size
                        </h4>
                        <div className="grid grid-cols-4 gap-2">
                          {["Any", "1", "2+", "3+"].map(b => (
                            <button 
                              key={b} 
                              type="button" 
                              onClick={() => setFilterBedrooms(b)} 
                              className={`py-3 rounded-xl text-xs font-bold transition-all border text-center ${filterBedrooms === b ? 'bg-slate-900 border-slate-900 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-transparent'}`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Airbnb-style Horizontal Icon Category Bar */}
                <div className="flex items-center justify-center gap-8 overflow-x-auto no-scrollbar py-2 border-b border-slate-100 mb-2 z-10 relative">
                  {[
                    { value: "All", label: "All Homes", icon: "🏡" },
                    { value: "House", label: "Houses", icon: "🏠" },
                    { value: "Apartment", label: "Apartments", icon: "🏢" },
                    { value: "Studio", label: "Cozy Studios", icon: "🛋️" },
                    { value: "Duplex", label: "Luxury Villas", icon: "🏰" }
                  ].map(({ value, label, icon }) => {
                    const isActive = activeTypeFilter === value;
                    return (
                      <button
                        key={value}
                        onClick={() => {
                          setActiveTypeFilter(value);
                          setActiveSearch(prev => ({ ...prev, type: value }));
                          showToast(`Filtered by ${label} category ✨`, "info");
                        }}
                        className={`flex flex-col items-center gap-1.5 pb-3 px-3 border-b-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                          isActive 
                            ? "border-[#222222] text-[#222222] font-black" 
                            : "border-transparent text-slate-400 hover:text-slate-800 hover:border-slate-200"
                        }`}
                      >
                        <span className="text-2xl leading-none">{icon}</span>
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
                
                {/* Hero Host-style Banner */}
                <div className="p-10 bg-gradient-to-r from-[#FF385C] to-[#E61E4D] rounded-[24px] text-white relative overflow-hidden shadow-lg">
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] dot-grid" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
                  <div className="relative z-10 max-w-2xl">
                    <p className="text-white/80 text-xs font-extrabold uppercase tracking-widest mb-2.5">{getGreeting(currentUser.name)}</p>
                    <h2 className="text-3xl md:text-4.5xl font-black leading-tight mb-4 tracking-tight">Verified Stays.<br />Affordable Premium Homes.</h2>
                    <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed max-w-lg mb-6">
                      Explore our handpicked selection of inspected properties in Lagos, Abuja, and Port Harcourt. No hidden fees, instant scheduling.
                    </p>
                    <div className="flex gap-3">
                      <button onClick={resetFilters} className="px-5 py-3 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors shadow flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5" /> Clear active filters
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section Title */}
                <div className="flex items-center justify-between mt-10">
                  <div>
                    <h2 className="font-extrabold text-[#222222] text-xl md:text-2xl tracking-tight">
                      {activeSearch.query || activeSearch.type !== "All" || activeSearch.state !== "All"
                        ? `Found ${filteredListings.length} Premium Options`
                        : "Recommended Properties Across Nigeria"}
                    </h2>
                    <p className="text-slate-400 text-xs mt-1 font-medium">Fully vetted structures, certified by AffordaHome Inspectors</p>
                  </div>
                </div>

                {/* Listings Grid (Full Width, 4-Column Desktop) */}
                {gridLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[1,2,3,4,5,6,7,8].map(n => <div key={n} className="skeleton h-[380px] w-full rounded-2xl" />)}
                  </div>
                ) : filteredListings.length === 0 ? (
                  <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-5 animate-float border border-rose-100">
                      <Building2 className="w-10 h-10 text-[#FF385C]" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg mb-2">No Matching Stays Found</h3>
                    <p className="text-slate-450 text-sm max-w-sm mb-6 leading-relaxed">
                      We couldn't find any verified rentals matching those search criteria. Reset your search boundaries to explore more.
                    </p>
                    <button onClick={resetFilters} className="btn-primary text-sm px-8 py-3.5">
                      Clear Search Boundaries
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredListings.map((property, idx) => (
                      <div key={property.id} className={`animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}>
                        <PropertyCard
                          property={property}
                          isSaved={savedProperties.has(property.id)}
                          onSave={toggleSaveProperty}
                          onView={(id) => navigate(`/property/${id}`)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PageTransition>
          )}

          {/* ===== ROUTE: /saved ===== */}
          {currentPath === "/saved" && (
            <PageTransition>
              <div className="max-w-4xl mx-auto space-y-6">
                <div>
                  <h2 className="font-black text-slate-800 text-3xl tracking-tight">Saved Listings Collection</h2>
                  <p className="text-slate-400 text-sm mt-1.5">
                    {savedPropertiesList.length > 0
                      ? `You have saved ${savedPropertiesList.length} properties to view later`
                      : "Save your favorite properties for easy access here"}
                  </p>
                </div>

                {savedPropertiesList.length === 0 ? (
                  <div className="bg-white rounded-3xl p-16 text-center border border-blue-50 shadow-sm mt-6 flex flex-col items-center">
                    <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6 animate-float border border-rose-100">
                      <Heart className="w-10 h-10 text-rose-500 fill-rose-500/20" />
                    </div>
                    <h3 className="font-black text-slate-800 text-lg mb-2">No saved properties yet</h3>
                    <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-8">
                      Tap the ❤️ button on any listing card while browsing to save verified properties directly to this personal page.
                    </p>
                    <button onClick={() => navigate("/browse")} className="btn-primary px-10 py-4 text-sm shadow-lg">
                      Start Browsing Homes
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {savedPropertiesList.map((property, idx) => (
                      <div key={property.id} className={`animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}>
                        <PropertyCard
                          property={property}
                          isSaved={true}
                          onSave={toggleSaveProperty}
                          onView={handleViewProperty => navigate(`/property/${property.id}`)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PageTransition>
          )}

          {/* ===== ROUTE: /account ===== */}
          {currentPath === "/account" && (
            <PageTransition>
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Profile Card */}
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-gradient-to-b from-blue-600 to-indigo-850 rounded-[32px] p-8 text-white text-center shadow-xl shadow-blue-100 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] dot-grid" />
                    <div className="relative z-10">
                      <div className="w-24 h-24 mx-auto mb-4 bg-white/15 rounded-[28px] border border-white/25 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                        {currentUser.avatar}
                      </div>
                      <h2 className="text-2xl font-black tracking-tight">{currentUser.name}</h2>
                      <p className="text-blue-200 text-sm mt-1">{currentUser.email}</p>
                      
                      <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mt-4 border border-white/10">
                        <Sparkles className="w-3.5 h-3.5" /> Premium Searcher
                      </span>
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="bg-white rounded-3xl p-6 border border-blue-50 shadow-sm space-y-4">
                    {[
                      { icon: Heart, label: "Saved Properties", val: savedProperties.size, color: "text-rose-500", bg: "bg-rose-50" },
                      { icon: Eye, label: "Properties Viewed", val: viewedProperties.size + 3, color: "text-blue-500", bg: "bg-blue-50" }
                    ].map(({ icon: Icon, label, val, color, bg }) => (
                      <div key={label} className="flex items-center gap-4">
                        <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5.5 h-5.5 ${color}`} />
                        </div>
                        <div>
                          <p className="text-xl font-black text-slate-800 leading-none">{val}</p>
                          <p className="text-slate-400 text-xs mt-1">{label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Account Details & Management */}
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-white rounded-[28px] border border-blue-50 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="font-black text-slate-800 text-base">Account Configuration</h3>
                      <p className="text-slate-400 text-xs mt-0.5">Your personal verification details</p>
                    </div>
                    
                    <div className="p-6 divide-y divide-slate-100 space-y-5">
                      {[
                        { label: "Verified Member Since", value: "May 28, 2026" },
                        { label: "Search Access Tier", value: "Premium Unlimited Access" },
                        { label: "Preferred Location", value: "Lagos / Abuja / Port Harcourt" },
                        { label: "ID Verification Status", value: "✅ KYC Verified (Government ID Checked)" }
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                          <span className="text-slate-400 text-sm font-semibold">{label}</span>
                          <span className="font-bold text-slate-800 text-sm">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Settings Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => showToast("Contacted customer support team 📞", "info")}
                      className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm focus-ring text-sm"
                    >
                      Help & Support
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 bg-rose-50 border border-rose-100 text-rose-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-100/50 transition-all shadow-sm focus-ring text-sm"
                    >
                      <LogOut className="w-4 h-4" /> Logout Session
                    </button>
                  </div>
                </div>

              </div>
            </PageTransition>
          )}

          {/* ===== ROUTE: /property/:id ===== */}
          {dynamicPropertyId && selectedProperty && (
              <div className="max-w-6xl mx-auto space-y-6 text-left">
                
                {/* Back Link Nav */}
                <button
                  onClick={() => navigate("/browse")}
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-800 font-extrabold text-sm transition-colors focus-ring"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[3]" /> Back to all listings
                </button>

                {/* ── 1. Page Header ── */}
                <div className="space-y-3">
                  <h2 className="text-2.5xl md:text-3.5xl font-black text-[#222222] tracking-tight leading-snug">{selectedProperty.title}</h2>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-slate-500 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-1 text-[#222222]">
                        <Star className="w-4 h-4 fill-[#FF385C] text-[#FF385C]" />
                        <span>{selectedProperty.rating?.toFixed(2) || "4.80"}</span>
                      </span>
                      <span>·</span>
                      <span className="text-slate-700 underline font-bold">{selectedProperty.reviewsCount || 24} reviews</span>
                      <span>·</span>
                      <span className="text-slate-700 underline flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FF385C]" /> {selectedProperty.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleShareProperty(selectedProperty)} 
                        className="flex items-center gap-1.5 hover:bg-slate-50 py-1.5 px-3 rounded-lg transition-colors cursor-pointer text-slate-700 focus-ring"
                      >
                        <Share2 className="w-4.5 h-4.5" /> Share
                      </button>
                      <button 
                        onClick={() => toggleSaveProperty(selectedProperty.id)} 
                        className="flex items-center gap-1.5 hover:bg-slate-50 py-1.5 px-3 rounded-lg transition-colors cursor-pointer text-slate-700 focus-ring"
                      >
                        <Heart className={`w-4.5 h-4.5 ${savedProperties.has(selectedProperty.id) ? "fill-[#FF385C] text-[#FF385C]" : ""}`} /> 
                        {savedProperties.has(selectedProperty.id) ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── 2. Airbnb Iconic 5-Photo Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 rounded-2xl overflow-hidden h-[300px] md:h-[420px] relative z-10 shadow-sm">
                  {/* Left Column: Massive Main Photo */}
                  <div className="md:col-span-2 md:row-span-2 overflow-hidden bg-slate-100 relative group h-full">
                    {selectedProperty.images?.[0]?.startsWith("http") ? (
                      <img 
                        src={selectedProperty.images[0]} 
                        alt="Living space main" 
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      />
                    ) : (
                      <PropertyGradient gradient={selectedProperty.gradient} className="w-full h-full" />
                    )}
                  </div>
                  {/* Right Column: 4 Small Grid Images */}
                  <div className="hidden md:block overflow-hidden bg-slate-100 relative group h-full">
                    {selectedProperty.images?.[1]?.startsWith("http") ? (
                      <img 
                        src={selectedProperty.images[1]} 
                        alt="Bedroom setup" 
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      />
                    ) : (
                      <PropertyGradient gradient={selectedProperty.gradient} className="w-full h-full" />
                    )}
                  </div>
                  <div className="hidden md:block overflow-hidden bg-slate-100 relative group h-full">
                    {selectedProperty.images?.[2]?.startsWith("http") ? (
                      <img 
                        src={selectedProperty.images[2]} 
                        alt="Kitchen space" 
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                      />
                    ) : (
                      <PropertyGradient gradient={selectedProperty.gradient} className="w-full h-full" />
                    )}
                  </div>
                  <div className="hidden md:block overflow-hidden bg-slate-100 relative group h-full">
                    {selectedProperty.images?.[0]?.startsWith("http") ? (
                      <img 
                        src={selectedProperty.images[0]} 
                        alt="Additional interior 1" 
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300 brightness-[0.9]"
                      />
                    ) : (
                      <PropertyGradient gradient={selectedProperty.gradient} className="w-full h-full" />
                    )}
                  </div>
                  <div className="hidden md:block overflow-hidden bg-slate-100 relative group h-full">
                    {selectedProperty.images?.[1]?.startsWith("http") ? (
                      <img 
                        src={selectedProperty.images[1]} 
                        alt="Additional interior 2" 
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300 brightness-[0.9]"
                      />
                    ) : (
                      <PropertyGradient gradient={selectedProperty.gradient} className="w-full h-full" />
                    )}
                  </div>
                </div>

                {/* ── 3. Columns Section: Left details, Right booking widget ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
                  
                  {/* Left Column (7/12 width) */}
                  <div className="lg:col-span-7 space-y-8">
                    
                    {/* Host Profile Info */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                      <div>
                        <h3 className="text-xl font-bold text-[#222222] tracking-tight">
                          Verified {selectedProperty.type} hosted by {selectedProperty.agentName}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1 font-semibold">
                          {selectedProperty.bedrooms} Bedroom{selectedProperty.bedrooms > 1 ? "s" : ""} · {selectedProperty.bathrooms} Bathroom{selectedProperty.bathrooms > 1 ? "s" : ""} · {selectedProperty.area}m² Area
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm shadow-md border border-slate-100">
                        {selectedProperty.agentName.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                    </div>

                    {/* Vetted Highlights */}
                    <div className="space-y-6 pb-6 border-b border-slate-100">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-[#222222] text-sm">Inspected Stay Quality</h4>
                          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                            This rental structure has passed all structural, plumbing, and electrical verification checks.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                          <MapPin className="w-5 h-5 text-[#FF385C]" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-[#222222] text-sm">Great Region Spot</h4>
                          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                            Centered in {selectedProperty.state}, offering secure gated entrance and reliable electricity bounds.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                          <Lock className="w-5 h-5 text-slate-800" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-[#222222] text-sm">Secure Portal Confirmed</h4>
                          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                            Direct connection link to verified managing agents. Secure transactions guaranteed.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Specifications Description */}
                    <div className="pb-6 border-b border-slate-100">
                      <h3 className="font-black text-[#222222] text-base uppercase tracking-wider mb-3">About this rental</h3>
                      <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line">{selectedProperty.description}</p>
                    </div>

                    {/* Verified Amenities */}
                    <div>
                      <h3 className="font-black text-[#222222] text-base uppercase tracking-wider mb-4.5">Verified Utilities</h3>
                      <div className="grid grid-cols-2 gap-3.5">
                        {["Parking", "Security", "Water", "Generator", "Pool", "Gym"].map(am => {
                          const has = selectedProperty.amenities?.includes(am);
                          return (
                            <div
                              key={am}
                              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-xs font-bold ${
                                has 
                                  ? "bg-emerald-50/20 border-emerald-100 text-emerald-800" 
                                  : "bg-slate-50/50 border-slate-150 text-slate-400"
                              }`}
                            >
                              {has ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 stroke-[2.5]" />
                              ) : (
                                <XCircle className="w-4 h-4 text-slate-350 flex-shrink-0" />
                              )}
                              <span>{am} Vetted</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Right Column (5/12 width) Sticky Reservation widget */}
                  <div className="lg:col-span-5 relative">
                    <div className="sticky-widget-container">
                      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-airbnb-dialog space-y-5 text-left">
                        
                        {/* Booking Header Price */}
                        <div className="flex justify-between items-end pb-3 border-b border-slate-100">
                          <div>
                            <span className="text-2xl font-black text-[#222222] font-mono">₦{selectedProperty.price.toLocaleString()}</span>
                            <span className="text-xs text-slate-500 font-semibold"> / month</span>
                          </div>
                          <span className="flex items-center gap-1 text-[#222222] text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-[#FF385C] text-[#FF385C]" />
                            <span>{selectedProperty.rating?.toFixed(2) || "4.80"}</span>
                          </span>
                        </div>

                        {/* Interactive Booking parameters */}
                        <div className="grid grid-cols-2 border border-slate-200 rounded-2xl overflow-hidden divide-x divide-slate-200">
                          <div className="p-3 text-left hover:bg-slate-50 transition-colors">
                            <label className="block text-[8px] font-black uppercase tracking-wider text-slate-450">Check-in</label>
                            <select 
                              value={selectedMonth} 
                              onChange={e => setSelectedMonth(e.target.value)} 
                              className="w-full bg-transparent text-xs font-bold text-slate-800 mt-0.5 focus:outline-none cursor-pointer"
                            >
                              <option>June 2026</option>
                              <option>July 2026</option>
                              <option>August 2026</option>
                              <option>September 2026</option>
                            </select>
                          </div>
                          <div className="p-3 text-left hover:bg-slate-50 transition-colors">
                            <label className="block text-[8px] font-black uppercase tracking-wider text-slate-450">Duration</label>
                            <select 
                              value={rentDuration} 
                              onChange={e => setRentDuration(Number(e.target.value))} 
                              className="w-full bg-transparent text-xs font-bold text-slate-800 mt-0.5 focus:outline-none cursor-pointer"
                            >
                              <option value={1}>1 Month</option>
                              <option value={3}>3 Months</option>
                              <option value={6}>6 Months</option>
                              <option value={12}>1 Year</option>
                            </select>
                          </div>
                        </div>

                        {/* Reserve CTA */}
                        <a
                          href={`https://wa.me/2348031234567?text=Hi%20${encodeURIComponent(selectedProperty.agentName)},%20I'm%20interested%20in%20reserving%20\"${encodeURIComponent(selectedProperty.title)}\"%20located%20at%20${encodeURIComponent(selectedProperty.address)}%20for%20${rentDuration}%20month(s)%20starting%20${selectedMonth}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary w-full py-4 text-center text-sm block"
                        >
                          Reserve Listing Instantly
                        </a>
                        <p className="text-[11px] text-slate-450 text-center font-medium">You won't be charged yet · Links to Agent</p>

                        {/* Price Calculations */}
                        <div className="space-y-3 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600">
                          <div className="flex justify-between">
                            <span className="underline">₦{selectedProperty.price.toLocaleString()} x {rentDuration} Month{rentDuration > 1 ? "s" : ""}</span>
                            <span className="font-mono text-slate-800">₦{(selectedProperty.price * rentDuration).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="underline">Cleaning / Service Vetting (5%)</span>
                            <span className="font-mono text-slate-800">₦{Math.round(selectedProperty.price * rentDuration * 0.05).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="underline">AffordaHome Platform Fee (2.5%)</span>
                            <span className="font-mono text-slate-800">₦{Math.round(selectedProperty.price * rentDuration * 0.025).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between pt-3 border-t border-slate-100 text-sm font-black text-[#222222]">
                            <span>Total Estimated Rent</span>
                            <span className="font-mono">₦{Math.round(selectedProperty.price * rentDuration * 1.075).toLocaleString()}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

              </div>
          )}

          {/* ===== Dynamic 404 Route Catch ===== */}
          {currentPath !== "/" && currentPath !== "/browse" && currentPath !== "/saved" && currentPath !== "/account" && !dynamicPropertyId && (
            <PageTransition>
              <div className="max-w-md mx-auto text-center py-20 bg-white border border-blue-50 rounded-3xl shadow-sm p-8 flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mb-6 animate-float">
                  <AlertCircle className="w-11 h-11 text-blue-500" />
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Page Not Found</h2>
                <p className="text-slate-400 text-sm max-w-xs mt-2.5 leading-relaxed">
                  The route folder or dynamic ID `/property/...` you are attempting to visit does not exist.
                </p>
                <button onClick={() => navigate("/browse")} className="btn-primary py-3.5 px-8 text-sm mt-8 shadow-md">
                  Back to Safe Browse Home
                </button>
              </div>
            </PageTransition>
          )}

        </main>

        {/* ── Footer ── */}
        <footer className="bg-white border-t border-blue-50/50 py-8 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto w-full px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-bold text-slate-500">AffordaHome Premium Real Estate App © 2026</span>
            <div className="flex gap-4">
              <a onClick={() => navigate("/browse")} className="cursor-pointer hover:underline">Find Rentals</a>
              <a onClick={() => navigate("/saved")} className="cursor-pointer hover:underline">Saved Listings</a>
              <a onClick={() => navigate("/account")} className="cursor-pointer hover:underline">My Account</a>
            </div>
          </div>
        </footer>

        <ToastList toasts={toasts} onClose={removeToast} />
      </div>
    );
  }

  // ============================================================
  // 3. ADMIN PORTAL (Wide Left Navigation Panel Layout)
  // ============================================================
  if (currentUser.role === "admin") {
    return (
      <div className="min-h-screen bg-slate-50 flex dot-grid" style={{ fontFamily: "'Inter', sans-serif" }}>

        {/* ── Sidebar Nav ── */}
        <aside className="admin-sidebar flex flex-col justify-between overflow-hidden">
          <div>
            {/* Logo */}
            <div className="h-20 px-6 border-b border-white/10 flex items-center gap-3 cursor-pointer" onClick={() => navigate("/admin")}>
              <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
                <HouseIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black text-white text-[17px] tracking-tight block">AffordaHome</span>
                <span className="text-[10px] text-blue-200 uppercase tracking-widest leading-none font-bold">Admin Portal</span>
              </div>
            </div>

            {/* Nav links */}
            <nav className="p-3.5 space-y-1 mt-2.5">
              {[
                { view: "dashboard", icon: LayoutDashboard, label: "Analytics Dashboard" },
                { view: "manage",    icon: Building2,       label: "Property Listings" },
                { view: "customers", icon: Users,           label: "Customer Activity" },
                { view: "settings",  icon: Settings,        label: "Portal Settings" },
              ].map(({ view, icon: Icon, label }) => {
                const isActive = adminView === view;
                return (
                  <button
                    key={view}
                    onClick={() => {
                      setAdminView(view);
                      navigate("/admin");
                    }}
                    className={`admin-nav-item w-full focus-ring relative ${isActive ? "active text-white" : ""}`}
                  >
                    {isActive && <div className="sidebar-indicator" />}
                    <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                    <span>{label}</span>
                  </button>
                );
              })}

              <div className="pt-3.5 border-t border-white/10 mt-3.5">
                <button
                  onClick={() => handleOpenFormModal(null)}
                  className="admin-nav-item w-full bg-blue-500 hover:bg-blue-600 text-white font-bold border border-blue-400 shadow-md focus-ring flex items-center justify-center gap-2"
                >
                  <Plus className="w-4.5 h-4.5 flex-shrink-0 stroke-2" />
                  Post New Property
                </button>
              </div>
            </nav>
          </div>

          {/* Admin profile card */}
          <div className="p-4 border-t border-white/10 bg-black/10">
            <div className="flex items-center gap-3.5 mb-4 px-2">
              <div className="w-11 h-11 bg-white/20 text-white font-black text-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                {currentUser.avatar}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-white text-sm truncate leading-tight">{currentUser.name}</p>
                <p className="text-blue-200 text-[10px] truncate mt-0.5 font-mono">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-white/10 hover:bg-rose-600 text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow focus-ring"
            >
              <LogOut className="w-4 h-4" /> Sign Out Portal
            </button>
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <div className="flex-1 ml-[260px] flex flex-col min-h-screen overflow-x-hidden">

          {/* Top Bar Header */}
          <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-blue-50 h-20 flex items-center justify-between px-8 shadow-sm">
            <div>
              <h1 className="font-black text-slate-800 text-[19px] tracking-tight leading-none">
                {adminView === "dashboard" && "Analytics Overview"}
                {adminView === "manage" && "Property Inventory"}
                {adminView === "customers" && "Customer Directory Log"}
                {adminView === "settings" && "Portal Configurations"}
              </h1>
              <p className="text-slate-400 text-xs mt-1.5 font-medium">
                {adminView === "dashboard" && "Platform metrics, activity logging, and counters"}
                {adminView === "manage" && "Perform inventory creation, deletion, and updates"}
                {adminView === "customers" && "Monitor saved counts and customer logins"}
                {adminView === "settings" && "portal preferences"}
              </p>
            </div>
            
            {adminView === "manage" && (
              <button
                onClick={() => handleOpenFormModal(null)}
                className="btn-primary flex items-center gap-2 py-3 px-6 text-sm"
              >
                <Plus className="w-4 h-4 stroke-2" /> Post Listing
              </button>
            )}
          </header>

          <main className="flex-1 p-8 space-y-8 max-w-7xl w-full mx-auto">

            {/* ===== ADMIN: DASHBOARD ===== */}
            {adminView === "dashboard" && (
              <div className="page-view space-y-8">
                
                {/* Stat cards (Animated Count-Up) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Total Inventory", value: dashboardStats.total, icon: Building2, color: "text-blue-600", bg: "bg-blue-50 border-blue-100/50" },
                    { label: "Active Listings", value: dashboardStats.active, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100/50" },
                    { label: "Registered Users", value: dashboardStats.customers, icon: Users, color: "text-purple-600", bg: "bg-purple-50 border-purple-100/50" },
                    { label: "Total Saves ❤️", value: dashboardStats.saves, icon: Heart, color: "text-rose-600", bg: "bg-rose-50 border-rose-100/50" },
                  ].map(({ label, value, icon: Icon, color, bg }, idx) => (
                    <div key={label} className={`bg-white rounded-3xl p-6 border ${bg} shadow-sm stat-card flex items-center justify-between`}>
                      <div>
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-2">{label}</span>
                        <span className="text-3.5xl font-black text-slate-800">
                          <CountUp val={value} />
                        </span>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-slate-100/50 flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Staggered lists & recent items */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Recent table */}
                  <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
                        <h3 className="font-bold text-slate-800 text-[15px] uppercase tracking-wider">Recently Added Listings</h3>
                        <button
                          onClick={() => setAdminView("manage")}
                          className="text-blue-600 text-xs font-black flex items-center gap-1 hover:text-blue-800 transition-colors"
                        >
                          Manage Inventory <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                              <th className="py-3 px-6 text-left">Property Title</th>
                              <th className="py-3 px-3 text-left">Category</th>
                              <th className="py-3 px-3 text-left">Rent</th>
                              <th className="py-3 px-4 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {listings.slice(0, 5).map((p, idx) => (
                              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-3.5 px-6">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${p.gradient} flex-shrink-0 shadow-sm`} />
                                    <span className="font-bold text-slate-700 text-xs truncate max-w-[170px]">{p.title}</span>
                                  </div>
                                </td>
                                <td className="py-3.5 px-3 text-slate-500 text-xs">{p.type}</td>
                                <td className="py-3.5 px-3 font-bold text-slate-800 text-xs">₦{p.price.toLocaleString()}</td>
                                <td className="py-3.5 px-4 text-center">
                                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[9px] font-bold ${
                                    p.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                                  }`}>
                                    {p.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <footer className="p-4 bg-slate-50/50 border-t border-slate-100 text-center text-xs text-slate-400">
                      Showing latest 5 properties posted
                    </footer>
                  </div>

                  {/* Top saved */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-50">
                      <h3 className="font-bold text-slate-800 text-[15px] uppercase tracking-wider">Top Saved Collections</h3>
                      <p className="text-slate-400 text-xs mt-1">Tenant demand metrics</p>
                    </div>
                    <div className="p-5 space-y-3.5">
                      {mostSavedProperties.map((p, idx) => (
                        <div key={p.id} className="flex items-center gap-3.5 p-3.5 bg-slate-50/70 rounded-2xl hover:bg-blue-50/50 border border-slate-100 transition-colors">
                          <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0 ${
                            idx === 0 ? "bg-amber-100 text-amber-700" : idx === 1 ? "bg-slate-200 text-slate-700" : "bg-orange-100 text-orange-700"
                          }`}>
                            {idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-700 text-xs truncate">{p.title}</p>
                            <p className="text-slate-400 text-[11px] font-mono mt-0.5">₦{p.price.toLocaleString()}/mo</p>
                          </div>
                          <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 text-[10px] font-black px-2.5 py-1.5 rounded-xl flex-shrink-0">
                            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />{p.savesCount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ===== ADMIN: MANAGE LISTINGS ===== */}
            {adminView === "manage" && (
              <div className="page-view space-y-6">

                {/* Toolbar */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
                    <div className="relative flex-1 sm:max-w-xs">
                      <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search title, state, street..."
                        value={adminSearch}
                        onChange={e => setAdminSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-400 focus:outline-none rounded-xl text-sm transition-all focus-ring"
                      />
                    </div>
                    <select
                      value={adminFilterType}
                      onChange={e => setAdminFilterType(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-400 focus:outline-none rounded-xl text-sm transition-all focus-ring"
                    >
                      <option value="All">All Categories</option>
                      <option value="House">Houses</option>
                      <option value="Apartment">Apartments</option>
                      <option value="Studio">Studios</option>
                      <option value="Duplex">Duplexes</option>
                    </select>
                    <select
                      value={adminFilterStatus}
                      onChange={e => setAdminFilterStatus(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-400 focus:outline-none rounded-xl text-sm transition-all focus-ring"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active (Public)</option>
                      <option value="Inactive">Inactive (Draft)</option>
                    </select>
                  </div>

                  {selectedListings.length > 0 && (
                    <button
                      onClick={executeBulkDelete}
                      className="btn-danger flex items-center gap-2 py-3 px-6 text-sm animate-scale-in"
                    >
                      <Trash2 className="w-4 h-4" /> Bulk Delete ({selectedListings.length})
                    </button>
                  )}
                </div>

                {/* Table list */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm whitespace-nowrap">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-wider font-bold border-b border-slate-100">
                          <th className="py-4 px-6 text-center w-12">
                            <input
                              type="checkbox"
                              checked={paginatedAdminListings.length > 0 && paginatedAdminListings.every(l => selectedListings.includes(l.id))}
                              onChange={() => toggleSelectAll(paginatedAdminListings)}
                              className="w-4 h-4 cursor-pointer rounded"
                              style={{ accentColor: "#2563EB" }}
                            />
                          </th>
                          <th className="py-4 px-4 text-left">Property Card</th>
                          <th className="py-4 px-3 text-left">Category</th>
                          <th className="py-4 px-3 text-left">Location Address</th>
                          <th className="py-4 px-3 text-left">Monthly Rent</th>
                          <th className="py-4 px-3 text-center">Status</th>
                          <th className="py-4 px-3 text-left">Date Posted</th>
                          <th className="py-4 px-6 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {paginatedAdminListings.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="py-20 text-center text-slate-400">
                              <Building2 className="w-12 h-12 text-slate-200 mx-auto mb-4 animate-float" />
                              No property entries found matching filters.
                            </td>
                          </tr>
                        ) : paginatedAdminListings.map((p, idx) => (
                          <tr key={p.id} className={`hover:bg-slate-50/40 transition-colors ${selectedListings.includes(p.id) ? "bg-blue-50/30" : ""} animate-fade-in-up stagger-${idx+1}`}>
                            <td className="py-4 px-6 text-center">
                              <input
                                type="checkbox"
                                checked={selectedListings.includes(p.id)}
                                onChange={() => toggleSelectListing(p.id)}
                                className="w-4 h-4 cursor-pointer rounded"
                                style={{ accentColor: "#2563EB" }}
                              />
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex-shrink-0 shadow-sm`} />
                                <span className="font-bold text-slate-700 truncate max-w-[180px] block">{p.title}</span>
                              </div>
                            </td>
                            <td className="py-4 px-3 text-slate-500 text-xs font-semibold uppercase">{p.type}</td>
                            <td className="py-4 px-3 text-slate-400 text-xs truncate max-w-[140px]">{p.address}</td>
                            <td className="py-4 px-3 font-black text-slate-800 text-sm">₦{p.price.toLocaleString()}</td>
                            <td className="py-4 px-3 text-center">
                              <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-bold ${
                                p.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-500"
                              }`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="py-4 px-3 text-slate-450 text-xs font-mono">{p.datePosted}</td>
                            <td className="py-4 px-6 text-center">
                              <div className="inline-flex gap-2">
                                <button
                                  onClick={() => handleOpenFormModal(p)}
                                  className="w-8.5 h-8.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all flex items-center justify-center focus-ring"
                                  title="Edit Property"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => executeDeleteListing(p.id, p.title)}
                                  className="w-8.5 h-8.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-all flex items-center justify-center focus-ring"
                                  title="Delete Property"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalAdminPages > 1 && (
                    <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-450">
                        Showing page {adminCurrentPage} of {totalAdminPages} pages · {adminFilteredListings.length} total listings
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAdminCurrentPage(p => Math.max(1, p - 1))}
                          disabled={adminCurrentPage === 1}
                          className="w-8 h-8 rounded-lg border border-slate-200 hover:border-blue-400 disabled:opacity-40 flex items-center justify-center transition-all focus-ring bg-white"
                        >
                          <ChevronLeft className="w-4 h-4 text-slate-500" />
                        </button>
                        {Array.from({ length: totalAdminPages }, (_, i) => i + 1).map(n => (
                          <button
                            key={n}
                            onClick={() => setAdminCurrentPage(n)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                              n === adminCurrentPage ? "bg-blue-600 text-white shadow-sm" : "border border-slate-200 text-slate-500 hover:border-blue-300 bg-white"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                        <button
                          onClick={() => setAdminCurrentPage(p => Math.min(totalAdminPages, p + 1))}
                          disabled={adminCurrentPage === totalAdminPages}
                          className="w-8 h-8 rounded-lg border border-slate-200 hover:border-blue-400 disabled:opacity-40 flex items-center justify-center transition-all focus-ring bg-white"
                        >
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ===== ADMIN: CUSTOMERS ===== */}
            {adminView === "customers" && (
              <div className="page-view bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-50 flex items-center gap-3">
                  <h3 className="font-bold text-slate-800 text-[15px] uppercase tracking-wider flex-1">Registered Active Customers</h3>
                  <span className="bg-blue-100 text-blue-700 text-xs font-black px-3.5 py-1.5 rounded-xl border border-blue-200/50">{customers.length} Accounts</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-wider font-bold border-b border-slate-100">
                        <th className="py-4 px-6 text-left">Customer Profile</th>
                        <th className="py-4 px-3 text-left">Registered Email</th>
                        <th className="py-4 px-3 text-left">Created Date</th>
                        <th className="py-4 px-3 text-center">Saved Items</th>
                        <th className="py-4 px-6 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {customers.map((c, idx) => (
                        <tr key={c.id} className={`hover:bg-slate-50/60 transition-colors animate-fade-in-up stagger-${idx+1}`}>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3.5">
                              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-650 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-sm">
                                {c.avatar}
                              </div>
                              <span className="font-bold text-slate-700">{c.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-3 text-slate-500 font-mono text-xs">{c.email}</td>
                          <td className="py-4 px-3 text-slate-400 text-xs font-mono">{c.joinDate}</td>
                          <td className="py-4 px-3 text-center font-black text-slate-800">{c.savedCount} properties</td>
                          <td className="py-4 px-6 text-center">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                              {c.lastActive}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===== ADMIN: SETTINGS ===== */}
            {adminView === "settings" && (
              <div className="page-view grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Profile */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 text-[15px] uppercase tracking-wider">Admin Profile Settings</h3>
                    <p className="text-slate-450 text-xs mt-0.5">Your portal identity configurations</p>
                  </div>
                  <div className="p-6 space-y-5">
                    {[
                      { label: "Username / Name", value: "Admin Chief", type: "text" },
                      { label: "Superuser Email", value: "admin@affordahome.com", type: "email" },
                    ].map(({ label, value, type }) => (
                      <div key={label}>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">{label}</label>
                        <input
                          type={type}
                          defaultValue={value}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-400 focus:outline-none rounded-xl text-sm transition-all focus-ring"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Superadmin Clearance</label>
                      <input
                        defaultValue="Level 5 Administrator (Root Clearance)"
                        disabled
                        className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <button
                      onClick={() => showToast("Admin profile configurations updated successfully! ✅", "success")}
                      className="btn-primary w-full py-4 text-sm mt-3"
                    >
                      Save Configurations
                    </button>
                  </div>
                </div>

                {/* Platform preferences */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 text-[15px] uppercase tracking-wider">Platform Preferences</h3>
                    <p className="text-slate-450 text-xs mt-0.5">Adjust platform parameters dynamically</p>
                  </div>
                  <div className="p-6 divide-y divide-slate-100 space-y-5">
                    {/* Currency */}
                    <div className="flex items-center justify-between py-4 first:pt-0">
                      <div>
                        <p className="font-bold text-slate-700 text-sm">Currency Notation Symbol</p>
                        <p className="text-slate-400 text-xs mt-1">Select displayed currency</p>
                      </div>
                      <select className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-400 focus:outline-none rounded-xl text-sm text-slate-700 transition-all focus-ring">
                        <option>₦ Nigerian Naira (NGN)</option>
                        <option>$ US Dollar (USD)</option>
                      </select>
                    </div>
                    
                    {/* Size */}
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-bold text-slate-700 text-sm">Inventory Page Size</p>
                        <p className="text-slate-400 text-xs mt-1">Row count per datatable page</p>
                      </div>
                      <select className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-400 focus:outline-none rounded-xl text-sm text-slate-700 transition-all focus-ring">
                        <option>5 items per page</option>
                        <option>10 items per page</option>
                      </select>
                    </div>

                    {/* Toggle logging */}
                    <div className="flex items-center justify-between py-4 last:pb-0">
                      <div>
                        <p className="font-bold text-slate-700 text-sm">Real-time Activity Logs</p>
                        <p className="text-slate-400 text-xs mt-1">Broadcast user activity events to console</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </main>

          <footer className="h-16 border-t border-slate-200 bg-white flex items-center justify-center text-xs text-slate-400 px-8">
            AffordaHome Administrator Portal Dashboard · Verified Secure Session 🔒
          </footer>
        </div>

        {/* ── Post / Edit Form Modal ── */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsFormOpen(false)} />
            <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] flex flex-col border border-slate-100 z-55">

              {/* Modal header */}
              <div className="flex items-center justify-between px-8 py-5.5 bg-gradient-to-r from-blue-600 to-indigo-750 text-white flex-shrink-0">
                <h2 className="font-black text-[17px] uppercase tracking-wide">
                  {formListing.id ? "✏️ Modify Property Listing" : "➕ Post New Property"}
                </h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="w-10 h-10 bg-white/15 hover:bg-white/25 rounded-2xl flex items-center justify-center transition-all focus-ring"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleFormSubmit} className="overflow-y-auto flex-1 p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5.5">

                  {/* Title */}
                  <div className="sm:col-span-2">
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${formErrors.title ? "text-rose-500" : "text-slate-400"}`}>Property Title *</label>
                    <input
                      type="text"
                      value={formListing.title}
                      onChange={e => setFormListing((p: any) => ({ ...p, title: e.target.value }))}
                      placeholder="e.g. Spacious 3-Bedroom Flat in Lekki Phase 1"
                      className={`input-field focus-ring ${formErrors.title ? "border-rose-450 focus:border-rose-500" : ""}`}
                    />
                    {formErrors.title && <p className="text-rose-500 text-xs mt-2 font-semibold">{formErrors.title}</p>}
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Category *</label>
                    <select value={formListing.type} onChange={e => setFormListing((p: any) => ({ ...p, type: e.target.value }))} className="input-field focus-ring">
                      {["House", "Apartment", "Studio", "Duplex"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">State *</label>
                    <select value={formListing.state} onChange={e => setFormListing((p: any) => ({ ...p, state: e.target.value }))} className="input-field focus-ring">
                      {["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${formErrors.address ? "text-rose-500" : "text-slate-400"}`}>Full Physical Address *</label>
                    <input
                      type="text"
                      value={formListing.address}
                      onChange={e => setFormListing((p: any) => ({ ...p, address: e.target.value }))}
                      placeholder="e.g. Plot 15, Admiralty Way, Lekki Phase 1, Lagos"
                      className={`input-field focus-ring ${formErrors.address ? "border-rose-450 focus:border-rose-500" : ""}`}
                    />
                    {formErrors.address && <p className="text-rose-500 text-xs mt-2 font-semibold">{formErrors.address}</p>}
                  </div>

                  {/* Price */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${formErrors.price ? "text-rose-500" : "text-slate-400"}`}>Monthly Rent (₦) *</label>
                    <input type="number" value={formListing.price} onChange={e => setFormListing((p: any) => ({ ...p, price: e.target.value }))} placeholder="e.g. 150000" className={`input-field focus-ring ${formErrors.price ? "border-rose-450 focus:border-rose-500" : ""}`} />
                    {formErrors.price && <p className="text-rose-500 text-xs mt-2 font-semibold">{formErrors.price}</p>}
                  </div>

                  {/* Area */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${formErrors.area ? "text-rose-500" : "text-slate-400"}`}>Floor Area Size (m²) *</label>
                    <input type="number" value={formListing.area} onChange={e => setFormListing((p: any) => ({ ...p, area: e.target.value }))} placeholder="e.g. 120" className={`input-field focus-ring ${formErrors.area ? "border-rose-450 focus:border-rose-500" : ""}`} />
                    {formErrors.area && <p className="text-rose-500 text-xs mt-2 font-semibold">{formErrors.area}</p>}
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Bedrooms Count</label>
                    <select value={formListing.bedrooms} onChange={e => setFormListing((p: any) => ({ ...p, bedrooms: Number(e.target.value) }))} className="input-field focus-ring">
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Bedroom{n > 1 ? "s" : ""}</option>)}
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Bathrooms Count</label>
                    <select value={formListing.bathrooms} onChange={e => setFormListing((p: any) => ({ ...p, bathrooms: Number(e.target.value) }))} className="input-field focus-ring">
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Bathroom{n > 1 ? "s" : ""}</option>)}
                    </select>
                  </div>

                  {/* Furnished */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Furnished Status</label>
                    <select value={formListing.furnished} onChange={e => setFormListing((p: any) => ({ ...p, furnished: e.target.value }))} className="input-field focus-ring">
                      <option value="Yes">Yes (Furnished)</option>
                      <option value="No">No (Unfurnished)</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Portal Status</label>
                    <select value={formListing.status} onChange={e => setFormListing((p: any) => ({ ...p, status: e.target.value }))} className="input-field focus-ring">
                      <option value="Active">Active (Public View)</option>
                      <option value="Inactive">Inactive (Portal Draft)</option>
                    </select>
                  </div>

                  {/* Agent Name */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${formErrors.agentName ? "text-rose-500" : "text-slate-400"}`}>Managing Agent Name *</label>
                    <input type="text" value={formListing.agentName} onChange={e => setFormListing((p: any) => ({ ...p, agentName: e.target.value }))} placeholder="e.g. Musa Ibrahim" className={`input-field focus-ring ${formErrors.agentName ? "border-rose-450 focus:border-rose-500" : ""}`} />
                    {formErrors.agentName && <p className="text-rose-500 text-xs mt-2 font-semibold">{formErrors.agentName}</p>}
                  </div>

                  {/* Agent Phone */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${formErrors.agentPhone ? "text-rose-500" : "text-slate-400"}`}>Agent Contact Phone *</label>
                    <input type="text" value={formListing.agentPhone} onChange={e => setFormListing((p: any) => ({ ...p, agentPhone: e.target.value }))} placeholder="e.g. +234 809 000 0000" className={`input-field focus-ring ${formErrors.agentPhone ? "border-rose-450 focus:border-rose-500" : ""}`} />
                    {formErrors.agentPhone && <p className="text-rose-500 text-xs mt-2 font-semibold">{formErrors.agentPhone}</p>}
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${formErrors.description ? "text-rose-500" : "text-slate-400"}`}>Public Specifications Description * (Minimum 100 Characters)</label>
                    <textarea
                      rows={4}
                      value={formListing.description}
                      onChange={e => setFormListing((p: any) => ({ ...p, description: e.target.value }))}
                      placeholder="Enter verified description details for prospective tenants..."
                      className={`input-field focus-ring resize-none ${formErrors.description ? "border-rose-450 focus:border-rose-500" : ""}`}
                    />
                    <div className="flex justify-between mt-2 text-xs font-semibold">
                      <span className={`${formListing.description.length < 100 ? "text-amber-600" : "text-emerald-600"}`}>
                        {formListing.description.length} / 100 character minimum
                      </span>
                      {formErrors.description && <span className="text-rose-500">{formErrors.description}</span>}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Include Amenities</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {["Parking", "Security", "Water", "Generator", "Pool", "Gym"].map(am => {
                        const checked = formListing.amenities.includes(am);
                        return (
                          <button
                            key={am}
                            type="button"
                            onClick={() => toggleFormAmenity(am)}
                            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs font-bold transition-all focus-ring ${
                              checked 
                                ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                                : "bg-slate-50/50 border-slate-200 text-slate-600 hover:border-blue-300"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${checked ? "bg-white/20 border-white/40" : "border-slate-350"}`}>
                              {checked && <Check className="w-2.5 h-2.5 text-white stroke-3" />}
                            </div>
                            <span>{am}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex justify-end gap-3.5 pt-5 border-t border-slate-100 mt-4 flex-shrink-0">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3.5 rounded-2xl hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold transition-colors focus-ring text-sm">
                    Cancel Action
                  </button>
                  <button type="submit" className="btn-primary py-3.5 px-8 text-sm">
                    {formListing.id ? "Apply Modifications" : "Publish Property"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ToastList toasts={toasts} onClose={removeToast} />
      </div>
    );
  }

  return null;
}
