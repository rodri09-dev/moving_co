import type { Route } from "./+types/moves";
import { auth } from "../firebase.config";
import { useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Moves - Moving Co." },
    { name: "description", content: "View and manage your moves" },
  ];
}

export default function Moves() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B131A]">
        <div className="text-[#E6E8EA]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = user.displayName || "User";

  return (
    <div className="bg-[#0B131A] text-[#E6E8EA] font-display min-h-screen">
      {/* Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-[#22303B] bg-[#0F1A22] px-4 lg:px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4 text-[#E6E8EA]">
          <div className="size-8 bg-[#C9A24D]/20 rounded-lg flex items-center justify-center text-[#C9A24D]">
            <span className="material-symbols-outlined text-[24px]">local_shipping</span>
          </div>
          <h2 className="text-[#E6E8EA] text-lg font-bold leading-tight tracking-[-0.015em]">
            Moving Co.
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-[#9BA7B0] hover:text-[#C9A24D] text-sm font-medium leading-normal transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/moves"
              className="text-[#C9A24D] text-sm font-bold leading-normal"
            >
              My Moves
            </Link>
            <Link
              to="/wallet"
              className="text-[#9BA7B0] hover:text-[#C9A24D] text-sm font-medium leading-normal transition-colors"
            >
              Wallet
            </Link>
            <a
              href="#"
              className="text-[#9BA7B0] hover:text-[#C9A24D] text-sm font-medium leading-normal transition-colors"
            >
              Profile
            </a>
            <a
              href="#"
              className="text-[#9BA7B0] hover:text-[#C9A24D] text-sm font-medium leading-normal transition-colors"
            >
              Support
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button className="md:hidden text-[#E6E8EA]">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-[#22303B] cursor-pointer"
              style={{
                backgroundImage: user.photoURL ? `url("${user.photoURL}")` : "none",
                backgroundColor: user.photoURL ? "transparent" : "#C9A24D",
              }}
            >
              {!user.photoURL && (
                <span className="material-symbols-outlined text-[#0B131A] flex items-center justify-center h-full">
                  person
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center py-6 px-4 md:px-8">
        <div className="flex flex-col max-w-[960px] w-full gap-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/dashboard"
              className="text-[#9BA7B0] font-medium hover:text-[#C9A24D] transition-colors"
            >
              Dashboard
            </Link>
            <span className="material-symbols-outlined text-[#9BA7B0] text-[16px]">
              chevron_right
            </span>
            <span className="text-[#E6E8EA] font-semibold">My Moves</span>
          </div>

          {/* Page Heading & Actions */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-[#E6E8EA] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
              My Moves
            </h1>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 cursor-pointer overflow-hidden rounded-lg h-10 px-5 bg-[#C9A24D] hover:bg-[#9E7C2F] text-[#0B131A] text-sm font-bold leading-normal tracking-[0.015em] transition-all shadow-sm hover:shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="truncate">Book a New Move</span>
            </Link>
          </div>

          {/* Tabs */}
          <div className="border-b border-[#22303B]">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("upcoming")}
                className="relative flex flex-col items-center justify-center pb-3 pt-2 group"
              >
                <p
                  className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                    activeTab === "upcoming" ? "text-[#C9A24D]" : "text-[#9BA7B0]"
                  }`}
                >
                  Upcoming Moves
                </p>
                {activeTab === "upcoming" && (
                  <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#C9A24D] rounded-t-sm"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className="relative flex flex-col items-center justify-center pb-3 pt-2 group"
              >
                <p
                  className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                    activeTab === "past" ? "text-[#C9A24D]" : "text-[#9BA7B0] hover:text-[#E6E8EA]"
                  } transition-colors`}
                >
                  Past Moves
                </p>
                {activeTab === "past" && (
                  <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#C9A24D] rounded-t-sm"></div>
                )}
                {activeTab !== "past" && (
                  <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-transparent group-hover:bg-[#22303B] rounded-t-sm transition-colors"></div>
                )}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex h-8 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
                activeFilter === "all"
                  ? "bg-[#C9A24D] text-[#0B131A]"
                  : "bg-[#111C26] border border-[#22303B] hover:bg-[#0F1A22] text-[#E6E8EA]"
              }`}
            >
              <p className="text-sm font-medium leading-normal">All</p>
            </button>
            <button
              onClick={() => setActiveFilter("confirmed")}
              className={`flex h-8 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
                activeFilter === "confirmed"
                  ? "bg-[#C9A24D] text-[#0B131A]"
                  : "bg-[#111C26] border border-[#22303B] hover:bg-[#0F1A22] text-[#E6E8EA]"
              }`}
            >
              <div className="size-2 rounded-full bg-green-500"></div>
              <p className="text-sm font-medium leading-normal">Confirmed</p>
            </button>
            <button
              onClick={() => setActiveFilter("pending")}
              className={`flex h-8 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
                activeFilter === "pending"
                  ? "bg-[#C9A24D] text-[#0B131A]"
                  : "bg-[#111C26] border border-[#22303B] hover:bg-[#0F1A22] text-[#E6E8EA]"
              }`}
            >
              <div className="size-2 rounded-full bg-yellow-500"></div>
              <p className="text-sm font-medium leading-normal">Pending</p>
            </button>
            <button
              onClick={() => setActiveFilter("cancelled")}
              className={`flex h-8 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
                activeFilter === "cancelled"
                  ? "bg-[#C9A24D] text-[#0B131A]"
                  : "bg-[#111C26] border border-[#22303B] hover:bg-[#0F1A22] text-[#E6E8EA]"
              }`}
            >
              <div className="size-2 rounded-full bg-red-500"></div>
              <p className="text-sm font-medium leading-normal">Cancelled</p>
            </button>
          </div>

          {/* Moves List */}
          {activeTab === "upcoming" && (
            <div className="flex flex-col gap-4">
              {/* Card 1: Upcoming Confirmed */}
              <div className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-5 rounded-xl border border-[#22303B] bg-[#0F1A22] shadow-sm hover:shadow-md hover:border-[#C9A24D]/30 transition-all">
                {/* Date Badge */}
                <div className="flex md:flex-col flex-row items-center justify-center h-full w-full md:w-24 gap-3 md:gap-0 bg-[#0B131A] rounded-lg p-4 shrink-0 border border-transparent group-hover:border-[#C9A24D]/10 transition-colors">
                  <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-widest">Jul</span>
                  <span className="text-3xl font-black text-[#E6E8EA] leading-none md:mt-1">15</span>
                  <span className="text-xs text-[#9BA7B0] font-medium md:mt-2 bg-[#111C26] px-2 py-0.5 rounded-full">
                    10:00 AM
                  </span>
                </div>
                {/* Route & Info */}
                <div className="flex-1 flex flex-col gap-3 w-full">
                  {/* Route Visualization */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-[#E6E8EA]">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D] shrink-0">
                        <span className="material-symbols-outlined text-[18px]">my_location</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-[#9BA7B0] font-medium">Origin</span>
                        <span className="font-bold text-base">San Francisco, CA</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-1 items-center justify-center px-4">
                      <div className="h-[2px] w-full bg-[#22303B] relative flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#9BA7B0] absolute bg-[#0F1A22] px-1">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                    <div className="block sm:hidden ml-3 border-l-2 border-[#22303B] h-6"></div>
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D] shrink-0">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-[#9BA7B0] font-medium">Destination</span>
                        <span className="font-bold text-base">Austin, TX</span>
                      </div>
                    </div>
                  </div>
                  {/* Meta Details */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#9BA7B0] mt-1 pl-11 sm:pl-0">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">inventory_2</span> 3 Bedroom Home
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">local_shipping</span> 26 ft Truck
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">straighten</span> 1,200 mi
                    </span>
                  </div>
                </div>
                {/* Status & Action */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 mt-2 md:mt-0 pl-11 md:pl-0">
                  <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span> Confirmed
                  </div>
                  <button className="flex items-center justify-center gap-1 px-4 py-2 bg-transparent hover:bg-[#0B131A] rounded-lg text-[#C9A24D] text-sm font-bold transition-colors group/btn">
                    View Details
                    <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>

              {/* Card 2: Upcoming Pending */}
              <div className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-5 rounded-xl border border-[#22303B] bg-[#0F1A22] shadow-sm hover:shadow-md hover:border-yellow-400/50 transition-all">
                <div className="flex md:flex-col flex-row items-center justify-center h-full w-full md:w-24 gap-3 md:gap-0 bg-[#0B131A] rounded-lg p-4 shrink-0 border border-transparent group-hover:border-yellow-400/20 transition-colors">
                  <span className="text-xs font-bold text-[#9BA7B0] uppercase tracking-widest">Aug</span>
                  <span className="text-3xl font-black text-[#E6E8EA] leading-none md:mt-1">02</span>
                  <span className="text-xs text-[#9BA7B0] font-medium md:mt-2 bg-[#111C26] px-2 py-0.5 rounded-full">
                    TBD
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-3 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-[#E6E8EA]">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-[#111C26] flex items-center justify-center text-[#9BA7B0] shrink-0">
                        <span className="material-symbols-outlined text-[18px]">my_location</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-[#9BA7B0] font-medium">Origin</span>
                        <span className="font-bold text-base">Seattle, WA</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-1 items-center justify-center px-4">
                      <div className="h-[2px] w-full bg-[#22303B] relative flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#9BA7B0] absolute bg-[#0F1A22] px-1">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                    <div className="block sm:hidden ml-3 border-l-2 border-[#22303B] h-6"></div>
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-[#111C26] flex items-center justify-center text-[#9BA7B0] shrink-0">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-[#9BA7B0] font-medium">Destination</span>
                        <span className="font-bold text-base">Portland, OR</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#9BA7B0] mt-1 pl-11 sm:pl-0">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">inventory_2</span> Studio Apt
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">local_shipping</span> Sprinter Van
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">straighten</span> 175 mi
                    </span>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 mt-2 md:mt-0 pl-11 md:pl-0">
                  <div className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wide">
                    Pending Review
                  </div>
                  <button className="flex items-center justify-center gap-1 px-4 py-2 bg-transparent hover:bg-[#0B131A] rounded-lg text-[#C9A24D] text-sm font-bold transition-colors group/btn">
                    View Quote
                    <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>

              {/* Card 3: Upcoming In Transit */}
              <div className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-5 rounded-xl border border-[#22303B] bg-[#0F1A22] shadow-sm hover:shadow-md hover:border-[#C9A24D]/30 transition-all">
                <div className="flex md:flex-col flex-row items-center justify-center h-full w-full md:w-24 gap-3 md:gap-0 bg-[#0B131A] rounded-lg p-4 shrink-0 border border-transparent group-hover:border-[#C9A24D]/10 transition-colors">
                  <span className="text-xs font-bold text-[#C9A24D] uppercase tracking-widest">Sep</span>
                  <span className="text-3xl font-black text-[#E6E8EA] leading-none md:mt-1">21</span>
                  <span className="text-xs text-[#9BA7B0] font-medium md:mt-2 bg-[#111C26] px-2 py-0.5 rounded-full">
                    08:00 AM
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-3 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-[#E6E8EA]">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D] shrink-0">
                        <span className="material-symbols-outlined text-[18px]">my_location</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-[#9BA7B0] font-medium">Origin</span>
                        <span className="font-bold text-base">Chicago, IL</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-1 items-center justify-center px-4">
                      <div className="h-[2px] w-full bg-[#22303B] relative flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#9BA7B0] absolute bg-[#0F1A22] px-1">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                    <div className="block sm:hidden ml-3 border-l-2 border-[#22303B] h-6"></div>
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D] shrink-0">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-[#9BA7B0] font-medium">Destination</span>
                        <span className="font-bold text-base">Denver, CO</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#9BA7B0] mt-1 pl-11 sm:pl-0">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">inventory_2</span> 2 Bedroom Apt
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">local_shipping</span> 20 ft Truck
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">straighten</span> 1,000 mi
                    </span>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 mt-2 md:mt-0 pl-11 md:pl-0">
                  <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wide">
                    In Transit
                  </div>
                  <button className="flex items-center justify-center gap-1 px-4 py-2 bg-transparent hover:bg-[#0B131A] rounded-lg text-[#C9A24D] text-sm font-bold transition-colors group/btn">
                    Track Move
                    <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-0.5 transition-transform">
                      location_searching
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination / Empty Space */}
          {activeTab === "upcoming" && (
            <div className="flex justify-center py-6">
              <p className="text-sm text-[#9BA7B0]">Showing 3 of 3 upcoming moves</p>
            </div>
          )}

          {activeTab === "past" && (
            <div className="flex justify-center py-12">
              <p className="text-sm text-[#9BA7B0]">No past moves found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

