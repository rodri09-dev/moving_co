import type { Route } from "./+types/signup";
import Signup from "../components/signup";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tun Tavern Moving Co. Sign Up" },
    { name: "description", content: "Create an account" },
  ];
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side: Hero Image */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80"
          data-alt="Cardboard boxes stacked in a modern bright living room"
          style={{
            backgroundImage:
              'url("/images/wallpaper.png")',
          }}
        />
        {/* Dark overlay filter */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Overlay Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-16 w-full text-white">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              {/* <div className="flex items-center justify-center size-10 rounded-lg bg-primary/20 backdrop-blur-sm">
                <img
                  src="/images/icon.png"
                  alt="Tun Tavern Moving Co."
                  className="h-6 w-auto object-contain"
                />
              </div>
              <span className="text-2xl font-medium tracking-tight">Tun Tavern Moving Co.</span> */}
            </div>
            <div className="max-w-lg">
              {/* <blockquote className="text-sm font-medium leading-relaxed mb-4">
                "Founded on the same values that have guided service members since Tun Tavern, 1775"
              </blockquote> */}
              <p className="text-lg  italic">
                — Mission Driven. Veteran Owned & Operated.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 xl:p-24 bg-[#0B131A]">
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          {/* Mobile Logo (Only visible on small screens) */}
          <div className="flex lg:hidden items-center gap-2 mb-4 self-center">
            <span
              className="material-symbols-outlined text-[#C9A24D]"
              style={{ fontSize: "32px" }}
            >
              local_shipping
            </span>
            <h2 className="text-2xl font-bold text-[#E6E8EA]">
              Tun Tavern Moving Co.
            </h2>
          </div>
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-[#E6E8EA] mb-2">
              Create Account
            </h1>
            <p className="text-[#9BA7B0] text-base">
              Join Tun Tavern Moving Co. and start managing your move today.
            </p>
          </div>
          <Signup />
        </div>
      </div>
    </div>
  );
}

