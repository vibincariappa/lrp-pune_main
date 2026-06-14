import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { hasPermission } from "../lib/rbac";

export default function ProtectedRoute({ children, requiredPermission }) {
  const { isAuthenticated, isCheckingSession, checkSession, user, role } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Check session on mount to resolve HTTP-Only cookie state
    checkSession();
  }, [checkSession]);

  // Render premium government-grade loading overlay while authenticating session
  if (isCheckingSession) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#002045]/90 flex flex-col items-center justify-center backdrop-blur-md transition-opacity duration-300">
        <div className="w-16 h-16 border-4 border-[#86a0cd] border-t-white rounded-full animate-spin mb-6"></div>
        <p className="text-white font-mono text-sm tracking-widest uppercase loading-dots after:content-['.'] after:animate-pulse">
          Authenticating Session
        </p>
      </div>
    );
  }

  // Redirect to login if user session is unauthenticated
  if (!isAuthenticated) {
    return <Navigate to="/team/login" state={{ from: location }} replace />;
  }

  // Perform RBAC permission check if a permission is required for the route
  if (requiredPermission && !hasPermission(role, requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbf9f4] p-6">
        <div className="bg-white p-8 rounded-xl border border-[#c4c6cf]/30 shadow-md max-w-md w-full text-center space-y-6">
          <span className="material-symbols-outlined text-[#ba1a1a] text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            error
          </span>
          <h2 className="text-2xl font-bold text-[#002045] font-serif">Access Denied</h2>
          <p className="text-[#43474e] text-sm leading-relaxed">
            Your account role <strong>({role})</strong> does not possess the permissions required to access this resource. Please contact your system administrator if you require authorization.
          </p>
          <div className="pt-4">
            <Navigate to="/team/dashboard" replace />
          </div>
        </div>
      </div>
    );
  }

  return children;
}