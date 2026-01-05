import React, { useState } from 'react'
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update user profile with full name
            if (fullName && userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: fullName
                });
            }
            
            navigate("/dashboard"); // Redirect after successful signup
        } catch (error: any) {
            setError(error.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setError("");
        setLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/dashboard"); // Redirect after successful signup
        } catch (error: any) {
            setError(error.message || "Failed to sign up with Google.");
        } finally {
            setLoading(false);
        }
    };

    return (
         <form
            className="flex flex-col gap-5"
            onSubmit={handleEmailSignUp}
          >
            {/* Full Name Field */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-[#E6E8EA]"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  className="block w-full rounded-lg border border-[#22303B] bg-[#0F1A22] text-[#E6E8EA] px-4 py-3 text-base placeholder:text-[#9BA7B0] focus:border-[#C9A24D] focus:outline-none transition-all"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-[#E6E8EA]"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  className="block w-full rounded-lg border border-[#22303B] bg-[#0F1A22] text-[#E6E8EA] px-4 py-3 text-base placeholder:text-[#9BA7B0] focus:border-[#C9A24D] focus:outline-none transition-all"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-[#E6E8EA]"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="block w-full rounded-lg border border-[#22303B] bg-[#0F1A22] text-[#E6E8EA] px-4 py-3 text-base placeholder:text-[#9BA7B0] focus:border-[#C9A24D] focus:outline-none transition-all pr-10"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9BA7B0] hover:text-[#E6E8EA] cursor-pointer"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
            {/* Confirm Password Field */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-[#E6E8EA]"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="block w-full rounded-lg border border-[#22303B] bg-[#0F1A22] text-[#E6E8EA] px-4 py-3 text-base placeholder:text-[#9BA7B0] focus:border-[#C9A24D] focus:outline-none transition-all pr-10"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9BA7B0] hover:text-[#E6E8EA] cursor-pointer"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                className="rounded border-[#22303B] bg-[#0F1A22] text-[#C9A24D] focus:ring-[#C9A24D] focus:ring-1 size-4 mt-0.5"
                type="checkbox"
                required
              />
              <span className="text-sm text-[#9BA7B0]">
                I agree to the{" "}
                <a
                  className="text-[#C9A24D] hover:text-[#9E7C2F] hover:underline transition-colors"
                  href="#"
                >
                  Terms & Conditions
                </a>
              </span>
            </div>
            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
            {/* Actions */}
            <div className="flex flex-col gap-4 mt-2">
              <button
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(180deg, #C9A24D, #9E7C2F)",
                  color: "#0B131A",
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-[#1F2A33]" />
                <span className="flex-shrink-0 mx-4 text-[#9BA7B0] text-sm">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-[#1F2A33]" />
              </div>
              <button
                className="flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-lg h-12 px-4 bg-[#111C26] border border-[#1F2A33] hover:bg-[#0F1A22] text-[#E6E8EA] text-base font-medium leading-normal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading}
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.2812H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.50253 14.2818C5.00397 12.7864 5.00397 11.1724 5.50253 9.67698V6.56696H1.51649C-0.18551 9.97486 -0.18551 13.9839 1.51649 17.3918L5.50253 14.2818Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8439 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61049L5.50264 9.72051C6.4551 6.86183 9.10952 4.74966 12.2401 4.74966Z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
            </div>
            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-sm text-[#9BA7B0]">
                Already have an account?{" "}
                <Link
                  className="font-bold text-[#C9A24D] hover:text-[#9E7C2F] hover:underline transition-colors"
                  to="/"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
  )
}

export default Signup

