import type { Route } from "./+types/dashboard";
import { auth } from "../firebase.config";
import { useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Moving Company Dashboard" },
    { name: "description", content: "Manage your moves" },
  ];
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("small-van");
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
  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="bg-[#0B131A] text-[#E6E8EA] font-display h-screen overflow-hidden flex">
      {/* Navigation Rail */}
      <nav className="w-20 md:w-64 flex-shrink-0 bg-[#0F1A22] border-r border-[#22303B] flex flex-col h-full z-20 transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#C9A24D] aspect-square rounded-lg size-8 flex items-center justify-center text-[#0B131A] shrink-0">
            <span className="material-symbols-outlined text-xl">local_shipping</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight hidden md:block text-[#E6E8EA]">Moving Co.</h1>
        </div>
        <div className="flex-1 flex flex-col gap-2 px-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-3 rounded-lg bg-[#C9A24D]/20 text-[#C9A24D] group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">dashboard</span>
            <p className="text-sm font-medium hidden md:block">Dashboard</p>
          </Link>
          <Link
            to="/moves"
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#0B131A] text-[#9BA7B0] transition-colors group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">history</span>
            <p className="text-sm font-medium hidden md:block">My Moves</p>
          </Link>
          <Link
            to="/wallet"
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#0B131A] text-[#9BA7B0] transition-colors group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">account_balance_wallet</span>
            <p className="text-sm font-medium hidden md:block">Wallet</p>
          </Link>
          <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#0B131A] text-[#9BA7B0] transition-colors group" href="#">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">chat</span>
            <p className="text-sm font-medium hidden md:block">Messages</p>
          </a>
          <a className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#0B131A] text-[#9BA7B0] transition-colors group" href="#">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">settings</span>
            <p className="text-sm font-medium hidden md:block">Settings</p>
          </a>
        </div>
        <div className="p-4 border-t border-[#22303B]">
          <div className="flex items-center gap-3">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0 border-2 border-[#22303B]" 
              style={{
                backgroundImage: user.photoURL ? `url("${user.photoURL}")` : 'none',
                backgroundColor: user.photoURL ? 'transparent' : '#C9A24D'
              }}
            >
              {!user.photoURL && (
                <span className="material-symbols-outlined text-[#0B131A] flex items-center justify-center h-full">person</span>
              )}
            </div>
            <div className="hidden md:flex flex-col overflow-hidden">
              <p className="text-sm font-bold truncate text-[#E6E8EA]">{displayName}</p>
              <p className="text-xs text-[#9BA7B0] truncate">Premium Member</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area: Split View */}
      <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden relative">
        {/* Left Panel: Booking Widget */}
        <aside className="w-full lg:w-[480px] bg-[#0F1A22] shadow-xl z-10 flex flex-col h-full overflow-y-auto border-r border-[#22303B]">
          {/* Header */}
          <div className="px-6 pt-8 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-[#E6E8EA]">{greeting}, {displayName.split(' ')[0]}</h2>
            <p className="text-[#9BA7B0] mt-1">Ready for your next move?</p>
          </div>

          {/* Route Inputs */}
          <div className="px-6 py-2">
            <div className="relative flex flex-col gap-0">
              {/* Decorator Line */}
              <div className="absolute left-[26px] top-[40px] bottom-[40px] w-0.5 bg-[#22303B] z-10"></div>
              
              {/* From Input */}
              <div className="flex items-start gap-3 relative z-20 group">
                <div className="mt-4 text-[#9BA7B0]">
                  <span className="material-symbols-outlined text-[20px] bg-[#0F1A22]">trip_origin</span>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-[#9BA7B0] mb-1.5 ml-1">PICK-UP LOCATION</label>
                  <div className="flex w-full items-center rounded-xl bg-[#0B131A] border-2 border-transparent focus-within:border-[#C9A24D]/50 transition-colors">
                    <input 
                      className="w-full bg-transparent border-none focus:ring-0 text-[#E6E8EA] placeholder:text-[#9BA7B0] h-12 px-4 text-sm font-medium" 
                      placeholder="Current Address" 
                      defaultValue="500 Terry Francois Street"
                    />
                    <div className="pr-3 text-[#9BA7B0] cursor-pointer hover:text-[#C9A24D]">
                      <span className="material-symbols-outlined text-[20px]">my_location</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* To Input */}
              <div className="flex items-start gap-3 relative z-20 mt-4 group">
                <div className="mt-4 text-[#C9A24D]">
                  <span className="material-symbols-outlined text-[20px] bg-[#0F1A22] filled">location_on</span>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-[#9BA7B0] mb-1.5 ml-1">DROP-OFF LOCATION</label>
                  <div className="flex w-full items-center rounded-xl bg-[#0B131A] border-2 border-transparent focus-within:border-[#C9A24D]/50 transition-colors">
                    <input 
                      className="w-full bg-transparent border-none focus:ring-0 text-[#E6E8EA] placeholder:text-[#9BA7B0] h-12 px-4 text-sm font-medium" 
                      placeholder="Where to?"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#22303B] mx-6 my-6"></div>

          {/* Vehicle Selection */}
          <div className="px-6 flex-1">
            <h3 className="text-sm font-bold text-[#E6E8EA] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#C9A24D] text-lg">directions_car</span>
              Choose your vehicle
            </h3>
            <div className="flex flex-col gap-3">
              {/* Option 1 - Small Van */}
              <button 
                onClick={() => setSelectedVehicle("small-van")}
                className={`flex items-center gap-4 p-3 rounded-xl relative overflow-hidden text-left transition-all ${
                  selectedVehicle === "small-van"
                    ? "border-2 border-[#C9A24D] bg-[#C9A24D]/20"
                    : "border border-[#22303B] hover:border-[#C9A24D]/50 hover:bg-[#0B131A]"
                }`}
              >
                <div className={`rounded-lg p-2 shrink-0 ${selectedVehicle === "small-van" ? "bg-[#0B131A] shadow-sm" : "bg-[#0B131A]"}`}>
                  <span className={`material-symbols-outlined text-3xl ${selectedVehicle === "small-van" ? "text-[#E6E8EA]" : "text-[#9BA7B0]"}`}>
                    local_shipping
                  </span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-center w-full">
                    <p className={`text-base ${selectedVehicle === "small-van" ? "text-[#E6E8EA] font-bold" : "text-[#E6E8EA] font-semibold"}`}>
                      Small Van
                    </p>
                    <p className={`text-base ${selectedVehicle === "small-van" ? "text-[#E6E8EA] font-bold" : "text-[#E6E8EA] font-semibold"}`}>
                      $85.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-[#9BA7B0] text-xs truncate">Studio apartments & small items</p>
                    <p className="text-[#9BA7B0] text-xs">3 min away</p>
                  </div>
                </div>
                {/* Active Indicator */}
                {selectedVehicle === "small-van" && (
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#C9A24D] rounded-r-xl"></div>
                )}
              </button>

              {/* Option 2 - Medium Truck */}
              <button 
                onClick={() => setSelectedVehicle("medium-truck")}
                className={`flex items-center gap-4 p-3 rounded-xl relative overflow-hidden text-left transition-all ${
                  selectedVehicle === "medium-truck"
                    ? "border-2 border-[#C9A24D] bg-[#C9A24D]/20"
                    : "border border-[#22303B] hover:border-[#C9A24D]/50 hover:bg-[#0B131A]"
                }`}
              >
                <div className={`rounded-lg p-2 shrink-0 ${selectedVehicle === "medium-truck" ? "bg-[#0B131A] shadow-sm" : "bg-[#0B131A]"}`}>
                  <span className={`material-symbols-outlined text-3xl ${selectedVehicle === "medium-truck" ? "text-[#E6E8EA]" : "text-[#9BA7B0]"}`}>
                    airport_shuttle
                  </span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-center w-full">
                    <p className={`text-base ${selectedVehicle === "medium-truck" ? "text-[#E6E8EA] font-bold" : "text-[#E6E8EA] font-semibold"}`}>
                      Medium Truck
                    </p>
                    <p className={`text-base ${selectedVehicle === "medium-truck" ? "text-[#E6E8EA] font-bold" : "text-[#E6E8EA] font-semibold"}`}>
                      $145.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-[#9BA7B0] text-xs truncate">1-2 Bedroom apartments</p>
                    <p className="text-[#9BA7B0] text-xs">12 min away</p>
                  </div>
                </div>
                {/* Active Indicator */}
                {selectedVehicle === "medium-truck" && (
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#C9A24D] rounded-r-xl"></div>
                )}
              </button>

              {/* Option 3 - XL Mover */}
              <button 
                onClick={() => setSelectedVehicle("xl-mover")}
                className={`flex items-center gap-4 p-3 rounded-xl relative overflow-hidden text-left transition-all ${
                  selectedVehicle === "xl-mover"
                    ? "border-2 border-[#C9A24D] bg-[#C9A24D]/20"
                    : "border border-[#22303B] hover:border-[#C9A24D]/50 hover:bg-[#0B131A]"
                }`}
              >
                <div className={`rounded-lg p-2 shrink-0 ${selectedVehicle === "xl-mover" ? "bg-[#0B131A] shadow-sm" : "bg-[#0B131A]"}`}>
                  <span className={`material-symbols-outlined text-3xl ${selectedVehicle === "xl-mover" ? "text-[#E6E8EA]" : "text-[#9BA7B0]"}`}>
                    fire_truck
                  </span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-center w-full">
                    <p className={`text-base ${selectedVehicle === "xl-mover" ? "text-[#E6E8EA] font-bold" : "text-[#E6E8EA] font-semibold"}`}>
                      XL Mover
                    </p>
                    <p className={`text-base ${selectedVehicle === "xl-mover" ? "text-[#E6E8EA] font-bold" : "text-[#E6E8EA] font-semibold"}`}>
                      $220.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-[#9BA7B0] text-xs truncate">Entire homes & large furniture</p>
                    <p className="text-[#9BA7B0] text-xs">25 min away</p>
                  </div>
                </div>
                {/* Active Indicator */}
                {selectedVehicle === "xl-mover" && (
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#C9A24D] rounded-r-xl"></div>
                )}
              </button>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 mt-auto bg-[#0F1A22] border-t border-[#22303B]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#9BA7B0]">
                <span className="material-symbols-outlined text-lg">credit_card</span>
                <span className="text-sm font-medium">Personal •••• 4242</span>
              </div>
              <button className="text-[#C9A24D] text-sm font-medium hover:underline">Change</button>
            </div>
            <button className="w-full bg-[#C9A24D] hover:bg-[#9E7C2F] text-[#0B131A] font-bold text-lg h-14 rounded-xl shadow-lg shadow-[#C9A24D]/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              Request Move
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </aside>

        {/* Right Panel: Interactive Map */}
        <main className="flex-1 relative bg-[#0B131A] overflow-hidden">
          {/* Map Background */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center" 
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnhcanzJmgWF670fgKdfoHqeMRisc3EHqoKlp1XpF4U3qtLLb_Gj9sbM8xgLJPv7n2yA0AdoMioN2PN7y5ZRfauvp9TvWDCmtqrGE4KqhnKT5kVkeb6aCsH81Jedmp82WIoT6o3hiU7vi_EbS1dEXgmhD8hjJTapJyY_3xfyKN1WeTdzs68F7RN_klVQJrw3LPRxyzbzEWwJzgmu7lIjQ-Ynwh2ofLchZ8KGY_4Unh8l5L41bMN58zJcZYlPGX-4fbYOP4c64MGtU")',
              opacity: 0.8
            }}
          >
            {/* Dark mode overlay for map */}
            <div className="absolute inset-0 bg-[#0B131A]/80 mix-blend-multiply"></div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
            <button className="bg-[#0F1A22] text-[#E6E8EA] p-2.5 rounded-lg shadow-md hover:bg-[#0B131A] transition-colors border border-[#22303B]">
              <span className="material-symbols-outlined block">my_location</span>
            </button>
            <button className="bg-[#0F1A22] text-[#E6E8EA] p-2.5 rounded-lg shadow-md hover:bg-[#0B131A] transition-colors border border-[#22303B]">
              <span className="material-symbols-outlined block">add</span>
            </button>
            <button className="bg-[#0F1A22] text-[#E6E8EA] p-2.5 rounded-lg shadow-md hover:bg-[#0B131A] transition-colors border border-[#22303B]">
              <span className="material-symbols-outlined block">remove</span>
            </button>
          </div>

          {/* Floating Status Card */}
          <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-96 bg-[#0F1A22] rounded-xl shadow-2xl border border-[#22303B] p-0 overflow-hidden z-10">
            <div className="bg-[#C9A24D] px-4 py-3 flex justify-between items-center">
              <p className="text-[#0B131A] font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">event</span>
                Upcoming Schedule
              </p>
              <button className="text-[#0B131A]/80 hover:text-[#0B131A]">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>

            {/* Mini Calendar Integration */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <button className="p-1 hover:bg-[#0B131A] rounded-full transition">
                  <span className="material-symbols-outlined text-sm text-[#9BA7B0]">chevron_left</span>
                </button>
                <p className="text-sm font-bold text-[#E6E8EA]">October 2023</p>
                <button className="p-1 hover:bg-[#0B131A] rounded-full transition">
                  <span className="material-symbols-outlined text-sm text-[#9BA7B0]">chevron_right</span>
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                <span className="text-[10px] font-bold text-[#9BA7B0]">S</span>
                <span className="text-[10px] font-bold text-[#9BA7B0]">M</span>
                <span className="text-[10px] font-bold text-[#9BA7B0]">T</span>
                <span className="text-[10px] font-bold text-[#9BA7B0]">W</span>
                <span className="text-[10px] font-bold text-[#9BA7B0]">T</span>
                <span className="text-[10px] font-bold text-[#9BA7B0]">F</span>
                <span className="text-[10px] font-bold text-[#9BA7B0]">S</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* Empty days */}
                <div className="h-8"></div>
                <div className="h-8"></div>
                <div className="h-8"></div>
                {/* Days */}
                <button className="h-8 w-8 text-xs rounded-full hover:bg-[#0B131A] text-[#9BA7B0] flex items-center justify-center">1</button>
                <button className="h-8 w-8 text-xs rounded-full hover:bg-[#0B131A] text-[#9BA7B0] flex items-center justify-center">2</button>
                <button className="h-8 w-8 text-xs rounded-full hover:bg-[#0B131A] text-[#9BA7B0] flex items-center justify-center">3</button>
                <button className="h-8 w-8 text-xs rounded-full hover:bg-[#0B131A] text-[#9BA7B0] flex items-center justify-center">4</button>
                <button className="h-8 w-8 text-xs rounded-full bg-[#C9A24D] text-[#0B131A] font-bold shadow-md flex items-center justify-center">5</button>
                <button className="h-8 w-8 text-xs rounded-full hover:bg-[#0B131A] text-[#9BA7B0] flex items-center justify-center">6</button>
                <button className="h-8 w-8 text-xs rounded-full hover:bg-[#0B131A] text-[#9BA7B0] flex items-center justify-center">7</button>
              </div>
              <div className="mt-4 pt-3 border-t border-[#22303B]">
                <div className="flex items-start gap-3">
                  <div className="bg-[#C9A24D]/20 p-1.5 rounded-lg mt-0.5">
                    <span className="material-symbols-outlined text-[#C9A24D] text-sm">check_circle</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#E6E8EA]">Scheduled: Full House Move</p>
                    <p className="text-[10px] text-[#9BA7B0]">Oct 5, 2023 • 9:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fake Map Elements (Pins/Routes) */}
          {/* Current Location Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#C9A24D]/20 rounded-full animate-ping"></div>
              <div className="bg-[#0F1A22] p-1 rounded-full shadow-lg relative z-10 border border-[#22303B]">
                <div className="bg-[#C9A24D] size-4 rounded-full border-2 border-[#0F1A22]"></div>
              </div>
              {/* Label */}
              <div className="absolute left-1/2 -translate-x-1/2 top-8 bg-[#0F1A22] px-3 py-1 rounded-full shadow-lg whitespace-nowrap border border-[#22303B]">
                <p className="text-xs font-bold text-[#E6E8EA]">Your Location</p>
              </div>
            </div>
          </div>

          {/* Vehicle on map */}
          <div className="absolute top-[40%] left-[40%] z-0 transition-all duration-[5000ms] ease-linear">
            <div className="bg-[#0F1A22] p-1.5 rounded-lg shadow-lg rotate-12 border border-[#22303B]">
              <span className="material-symbols-outlined text-[#C9A24D] text-lg">local_shipping</span>
            </div>
          </div>

          {/* Vehicle on map 2 */}
          <div className="absolute top-[60%] left-[65%] z-0">
            <div className="bg-[#0F1A22] p-1.5 rounded-lg shadow-lg -rotate-45 border border-[#22303B]">
              <span className="material-symbols-outlined text-[#C9A24D] text-lg">airport_shuttle</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

