import type { Route } from "./+types/wallet";
import { auth } from "../firebase.config";
import { useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wallet - Moving Co." },
    { name: "description", content: "Manage your payment methods and billing" },
  ];
}

export default function Wallet() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="bg-[#0B131A] text-[#E6E8EA] font-display min-h-screen">
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-[#22303B] bg-[#0F1A22] px-4 lg:px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4 text-[#E6E8EA]">
          <div className="size-6 text-[#C9A24D]">
            <span className="material-symbols-outlined text-3xl">local_shipping</span>
          </div>
          <h2 className="text-[#E6E8EA] text-lg font-bold leading-tight tracking-[-0.015em]">
            Moving Co.
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            <Link
              to="/dashboard"
              className="text-[#9BA7B0] text-sm font-medium leading-normal hover:text-[#C9A24D] transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/moves"
              className="text-[#9BA7B0] text-sm font-medium leading-normal hover:text-[#C9A24D] transition-colors"
            >
              My Moves
            </Link>
            <Link
              to="/wallet"
              className="text-[#C9A24D] text-sm font-bold leading-normal"
            >
              Wallet
            </Link>
            <a
              href="#"
              className="text-[#9BA7B0] text-sm font-medium leading-normal hover:text-[#C9A24D] transition-colors"
            >
              Profile
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#C9A24D] text-[#0B131A] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#9E7C2F] transition-colors shadow-md shadow-[#C9A24D]/20"
            >
              <span className="truncate">Book a Move</span>
            </Link>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#22303B] shadow-sm cursor-pointer"
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

      {/* Main Content Area */}
      <div className="flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
          <div className="flex flex-col w-full max-w-[960px] flex-1 gap-6">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 px-4">
              <Link
                to="/dashboard"
                className="text-[#9BA7B0] text-sm font-medium leading-normal hover:text-[#C9A24D]"
              >
                Home
              </Link>
              <span className="text-[#9BA7B0] text-sm font-medium leading-normal">/</span>
              <a
                href="#"
                className="text-[#9BA7B0] text-sm font-medium leading-normal hover:text-[#C9A24D]"
              >
                Account
              </a>
              <span className="text-[#9BA7B0] text-sm font-medium leading-normal">/</span>
              <span className="text-[#E6E8EA] text-sm font-medium leading-normal">Wallet</span>
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 px-4">
              <div className="flex min-w-72 flex-col gap-2">
                <h1 className="text-[#E6E8EA] text-4xl font-black leading-tight tracking-[-0.033em]">
                  Wallet & Billing
                </h1>
                <p className="text-[#9BA7B0] text-base font-normal leading-normal">
                  Manage your payment methods, credits, and view transaction history.
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
              <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#22303B] bg-[#0F1A22] shadow-sm">
                <div className="flex items-center gap-2 text-[#9BA7B0]">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                  <p className="text-sm font-medium leading-normal">Current Balance Due</p>
                </div>
                <p className="text-[#E6E8EA] tracking-tight text-3xl font-bold leading-tight">$0.00</p>
                <p className="text-xs text-green-400 font-medium mt-1">No payments due</p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#22303B] bg-[#0F1A22] shadow-sm">
                <div className="flex items-center gap-2 text-[#9BA7B0]">
                  <span className="material-symbols-outlined text-[20px]">loyalty</span>
                  <p className="text-sm font-medium leading-normal">Store Credit</p>
                </div>
                <p className="text-[#C9A24D] tracking-tight text-3xl font-bold leading-tight">$150.00</p>
                <p className="text-xs text-[#9BA7B0] mt-1">Available for next move</p>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-4 pb-2 pt-4">
                <h2 className="text-[#E6E8EA] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Payment Methods
                </h2>
                <div className="flex items-center gap-1 text-green-400 text-xs font-medium bg-green-500/20 px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Secured by Stripe
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {/* Existing Card 1 */}
                <div className="group relative flex flex-col justify-between gap-4 rounded-xl border border-[#22303B] bg-[#0F1A22] p-5 shadow-sm transition hover:border-[#C9A24D]/50">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-14 items-center justify-center rounded bg-[#0B131A]">
                      {/* Visa Logo placeholder */}
                      <svg className="h-4" fill="none" viewBox="0 0 48 16" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18.423 0.635986H21.503L19.583 15.352H16.503L18.423 0.635986Z"
                          fill="#C9A24D"
                        ></path>
                        <path
                          d="M30.767 0.635986C29.743 0.635986 28.143 1.14799 27.503 2.61999L23.471 15.352H26.735L27.375 13.432H31.535L31.919 15.352H34.863L32.239 0.635986H30.767ZM28.271 10.936L29.615 4.34799L30.959 10.936H28.271Z"
                          fill="#C9A24D"
                        ></path>
                        <path
                          d="M40.9419 2.684C41.7739 2.684 43.1179 2.748 44.5899 3.26L43.8219 0.892C42.7339 0.444 41.3899 0.252 39.8539 0.252C36.0139 0.252 33.2619 2.236 33.2619 5.372C33.2619 7.612 35.3099 8.892 36.8459 9.66C38.4459 10.428 38.9579 10.94 38.9579 11.708C38.9579 12.86 37.5499 13.372 36.2059 13.372C34.5419 13.372 33.5179 12.924 32.7499 12.54L32.0459 15.036C32.8779 15.42 34.6059 15.868 36.3979 15.868C40.4299 15.868 43.0539 13.884 43.0539 10.684C43.0539 8.252 41.5179 7.036 39.6619 6.14C37.9339 5.244 37.2939 4.668 37.2939 3.9C37.2939 2.94 38.3819 2.684 40.9419 2.684Z"
                          fill="#C9A24D"
                        ></path>
                        <path
                          d="M12.915 0.635986H9.20298C8.17898 0.635986 7.28298 1.21199 6.89898 2.17199L0.11499 15.352H3.50699L4.21098 13.432C5.10698 13.432 10.803 13.432 12.275 13.432C12.083 14.264 11.251 15.352 11.251 15.352H14.579L12.915 0.635986ZM7.34698 4.79599L9.13898 9.97999H5.29898L7.34698 4.79599Z"
                          fill="#C9A24D"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-[#9BA7B0] hover:text-[#C9A24D] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="text-[#9BA7B0] hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#E6E8EA] tracking-widest">•••• •••• •••• 4242</p>
                    <p className="mt-1 text-sm text-[#9BA7B0]">Expires 12/25</p>
                  </div>
                  <div className="mt-2 border-t border-[#22303B] pt-3">
                    <span className="inline-flex items-center rounded-full bg-[#C9A24D]/20 px-2 py-1 text-xs font-medium text-[#C9A24D]">
                      Default Method
                    </span>
                  </div>
                </div>

                {/* Existing Card 2 */}
                <div className="group relative flex flex-col justify-between gap-4 rounded-xl border border-[#22303B] bg-[#0F1A22] p-5 shadow-sm transition hover:border-[#C9A24D]/50">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-14 items-center justify-center rounded bg-[#0B131A]">
                      {/* Mastercard Circles Placeholder */}
                      <div className="flex relative">
                        <div className="w-4 h-4 rounded-full bg-red-500/80 -mr-2"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-500/80"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-[#9BA7B0] hover:text-[#C9A24D] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="text-[#9BA7B0] hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#E6E8EA] tracking-widest">•••• •••• •••• 8888</p>
                    <p className="mt-1 text-sm text-[#9BA7B0]">Expires 08/24</p>
                  </div>
                  <div className="mt-2 border-t border-[#22303B] pt-3">
                    <button className="text-xs font-medium text-[#9BA7B0] hover:text-[#C9A24D]">
                      Set as Default
                    </button>
                  </div>
                </div>

                {/* Add New Card */}
                <button className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#22303B] bg-transparent p-5 text-center transition hover:border-[#C9A24D] hover:bg-[#0F1A22] min-h-[200px] md:min-h-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A24D]/20 text-[#C9A24D] transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined">add</span>
                  </div>
                  <span className="text-sm font-bold text-[#E6E8EA]">Add Payment Method</span>
                </button>
              </div>
            </div>

            {/* Billing Address */}
            <div className="px-4">
              <div className="flex items-center justify-between rounded-xl border border-[#22303B] bg-[#0F1A22] p-5 shadow-sm">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-[#E6E8EA]">Billing Address</h3>
                  <p className="text-sm text-[#9BA7B0]">
                    1234 Maple Avenue, Apt 4B, Springfield, IL 62704
                  </p>
                </div>
                <button className="rounded-lg border border-[#22303B] px-4 py-2 text-sm font-bold text-[#E6E8EA] hover:bg-[#0B131A] transition-colors">
                  Edit
                </button>
              </div>
            </div>

            {/* Transaction History */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-4 pb-2 pt-4">
                <h2 className="text-[#E6E8EA] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Transaction History
                </h2>
                <button className="flex items-center gap-2 text-sm font-medium text-[#C9A24D] hover:text-[#9E7C2F]">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Export CSV
                </button>
              </div>
              <div className="px-4">
                <div className="overflow-x-auto rounded-xl border border-[#22303B] bg-[#0F1A22] shadow-sm">
                  <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-[#0B131A] text-[#9BA7B0]">
                      <tr>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Description</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Amount</th>
                        <th className="px-6 py-4 font-medium text-center">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#22303B] text-[#E6E8EA]">
                      {/* Row 1 */}
                      <tr className="hover:bg-[#0B131A] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">Oct 24, 2023</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">Local Move - #1023</span>
                            <span className="text-xs text-[#9BA7B0]">Visa ending in 4242</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-400">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">$450.00</td>
                        <td className="px-6 py-4 text-center">
                          <button className="text-[#9BA7B0] hover:text-[#C9A24D] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">description</span>
                          </button>
                        </td>
                      </tr>
                      {/* Row 2 */}
                      <tr className="hover:bg-[#0B131A] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">Oct 10, 2023</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">Packing Supplies</span>
                            <span className="text-xs text-[#9BA7B0]">Visa ending in 4242</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-400">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">$85.50</td>
                        <td className="px-6 py-4 text-center">
                          <button className="text-[#9BA7B0] hover:text-[#C9A24D] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">description</span>
                          </button>
                        </td>
                      </tr>
                      {/* Row 3 */}
                      <tr className="hover:bg-[#0B131A] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">Sep 28, 2023</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">Moving Deposit</span>
                            <span className="text-xs text-[#9BA7B0]">Mastercard ending in 8888</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-[#111C26] px-2.5 py-0.5 text-xs font-medium text-[#9BA7B0]">
                            Refunded
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-[#9BA7B0]">-$100.00</td>
                        <td className="px-6 py-4 text-center">
                          <button className="text-[#9BA7B0] hover:text-[#C9A24D] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">description</span>
                          </button>
                        </td>
                      </tr>
                      {/* Row 4 */}
                      <tr className="hover:bg-[#0B131A] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">Sep 15, 2023</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">Long Distance Move - #9921</span>
                            <span className="text-xs text-[#9BA7B0]">Wallet Credit</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-400">
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium">$1,200.00</td>
                        <td className="px-6 py-4 text-center">
                          <button className="text-[#9BA7B0] hover:text-[#C9A24D] transition-colors">
                            <span className="material-symbols-outlined text-[20px]">description</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-center">
                  <button className="text-sm font-medium text-[#9BA7B0] hover:text-[#E6E8EA] transition-colors">
                    View all transactions
                  </button>
                </div>
              </div>
            </div>

            {/* Spacer for bottom padding */}
            <div className="h-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

