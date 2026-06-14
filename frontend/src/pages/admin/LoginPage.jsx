import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../store/authStore";

// Zod validation schema
const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, { message: "Email or Username is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export default function LoginPage() {
  const { login, isAuthenticated, isCheckingSession } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if redirect has a session expired state
  const queryParams = new URLSearchParams(location.search);
  const isSessionExpired = queryParams.get("expired") === "true";

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    // If user is already authenticated, redirect them
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/team/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);

    try {
      const credentials = {
        password: data.password
      };
      
      if (data.usernameOrEmail.includes("@")) {
        credentials.email = data.usernameOrEmail;
      } else {
        credentials.username = data.usernameOrEmail;
      }

      await login(credentials);
      
      const from = location.state?.from?.pathname || "/team/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login submission error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else if (err.message) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Unable to connect to the authentication server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#fbf9f4] text-[#1b1c19] overflow-hidden antialiased">
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#002045]/90 flex flex-col items-center justify-center backdrop-blur-md"
          >
            <div className="w-16 h-16 border-4 border-[#86a0cd] border-t-white rounded-full animate-spin mb-6"></div>
            <p className="text-white font-mono text-sm tracking-widest uppercase">
              Authenticating Session...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Side: Branding & Editorial Info */}
      <section className="hidden lg:flex flex-col relative w-1/2 bg-[#1a365d] overflow-hidden p-16 justify-between border-r border-[#c4c6cf]/10 text-white">
        {/* Shimmer & Glow background effects */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0)_100%)] bg-[length:200%_100%] animate-[shimmer_6s_infinite] opacity-35"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#002045] rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#86a0cd] rounded-full blur-[120px] opacity-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-24">
            <span className="material-symbols-outlined text-3xl text-white">subway</span>
            <span className="font-serif text-2xl font-bold tracking-tight">Civic Pulse</span>
          </div>
          
          <div className="max-w-lg space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-5xl font-bold leading-tight"
            >
              Team Portal Access
            </motion.h1>
            <div className="h-1.5 w-20 bg-[#ffb55c] rounded-full"></div>
            <p className="text-[#86a0cd] text-lg max-w-md leading-relaxed">
              Internal gateway for the Pune Metro Livelihood Restoration Program management and field operations.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-[#86a0cd]/80 font-mono text-xs tracking-widest uppercase">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
            Secure Infrastructure
          </div>
          <p className="text-[#86a0cd]/60 text-xs leading-relaxed max-w-sm">
            Authorized Personnel Only. This session is monitored and recorded for security and compliance. IP tracing is active for all sign-in attempts.
          </p>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full lg:w-1/2 flex flex-col bg-[#fbf9f4] relative justify-center items-center p-6 md:p-12">
        {/* Mobile Header Only */}
        <div className="lg:hidden absolute top-0 left-0 right-0 p-6 border-b border-[#c4c6cf]/30 flex items-center justify-between bg-white/65 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#002045]">subway</span>
            <span className="text-[#002045] font-serif text-lg font-bold">Civic Pulse</span>
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[440px] mt-12 lg:mt-0"
        >
          <div className="mb-10">
            <h2 className="text-[#002045] font-serif text-3xl font-bold mb-2">Secure Sign-In</h2>
            <p className="text-[#43474e] text-sm">Welcome back. Enter your credentials to access your dashboard.</p>
          </div>

          {/* Session Expired Message */}
          {isSessionExpired && (
            <div className="mb-6 p-4 rounded bg-[#ffdad6] border border-[#ba1a1a]/20 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#ba1a1a] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                info
              </span>
              <p className="text-[#93000a] text-xs font-semibold">Your session has expired. Please log in again.</p>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded bg-[#ffdad6] border border-[#ba1a1a]/20 flex items-center gap-3 animate-pulse">
              <span className="material-symbols-outlined text-[#ba1a1a] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                error
              </span>
              <p className="text-[#93000a] text-xs font-semibold">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username/Email Input Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[#1b1c19] font-semibold text-sm" htmlFor="usernameOrEmail">
                  Work Email or Username
                </label>
                {errors.usernameOrEmail && (
                  <span className="text-[#ba1a1a] text-[10px] font-mono uppercase tracking-wider">
                    {errors.usernameOrEmail.message}
                  </span>
                )}
              </div>
              <div className="relative group">
                <input
                  id="usernameOrEmail"
                  type="text"
                  placeholder="name@punemetro.gov.in"
                  className="w-full h-12 bg-white px-4 rounded border border-[#c4c6cf] focus:border-[#002045] focus:ring-1 focus:ring-[#002045]/20 transition-all outline-none text-[#1b1c19] placeholder:text-[#74777f]/40 text-sm"
                  {...register("usernameOrEmail")}
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#74777f]/40 group-focus-within:text-[#002045] transition-colors text-xl">
                  mail
                </span>
              </div>
            </div>

            {/* Password Input Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[#1b1c19] font-semibold text-sm" htmlFor="password">
                  Password
                </label>
                {errors.password && (
                  <span className="text-[#ba1a1a] text-[10px] font-mono uppercase tracking-wider">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="relative group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-12 bg-white px-4 rounded border border-[#c4c6cf] focus:border-[#002045] focus:ring-1 focus:ring-[#002045]/20 transition-all outline-none text-[#1b1c19] placeholder:text-[#74777f]/40 text-sm"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#74777f]/40 hover:text-[#002045] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#002045] text-white font-bold rounded shadow-lg shadow-[#002045]/10 hover:bg-[#1a365d] hover:shadow-xl hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-md flex items-center justify-center gap-2 overflow-hidden group cursor-pointer disabled:opacity-50"
              >
                <span>Access Portal</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>

          {/* Footer help link */}
          <div className="mt-12 pt-8 border-t border-[#c4c6cf]/30 text-center">
            <p className="text-[#43474e] text-xs">
              Need technical support? <span className="text-[#002045] font-semibold hover:underline cursor-pointer">Contact System Admin</span>
            </p>
          </div>
        </motion.div>

        {/* Blueprint decoration image in background */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
          <img
            className="w-full h-full object-contain grayscale"
            alt="Geometric blueprint"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxXQZTLiCNP_lLkjHge9-qJJPTBORni0NFuQjrMC5wfK1pjXlk0fiNJkW0FEOTPFw6m9BqGyfBOPdtLB5NfYrYm5df2VXQdA_HBchsXnEv4cecZbRWG8734OD0QeFjJ-5tOMEP0SZbesFnZfmA8ct5r5o2nb28z-uTNvRh4tvzzJBtuhyJ2MvwEK_1i49TG5okEXjwmI8y2nGmkVCeXi3ya2eH0oRFMoC3Q-wsIM_N5j5X62-wWXmtHA"
          />
        </div>
      </section>

      {/* Floating Back Navigation to Public Site */}
      <Link
        to="/"
        className="fixed top-8 left-8 lg:left-auto lg:right-8 z-20 flex items-center gap-2 px-4 py-2 bg-white border border-[#c4c6cf] rounded-full text-sm font-medium hover:bg-[#eae8e3] transition-colors shadow-sm"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Public Site
      </Link>
    </div>
  );
}
