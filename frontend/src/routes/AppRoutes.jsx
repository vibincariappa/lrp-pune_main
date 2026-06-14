import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/admin/LoginPage";
import DashboardPage from "../pages/admin/DashboardPage";
import ProtectedRoute from "./Protectedroute";
import { PERMISSIONS } from "../lib/rbac";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/team/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/team"
          element={<Navigate to="/team/dashboard" replace />}
        />
        
        <Route
          path="/team/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team/uploads"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.UPLOAD_FILES}>
              <div className="min-h-screen bg-[#fbf9f4] p-12 text-[#002045] flex flex-col justify-center items-center">
                <div className="bg-white p-8 rounded-xl border border-[#c4c6cf]/30 shadow-md max-w-md w-full text-center">
                  <span className="material-symbols-outlined text-4xl text-[#002045] mb-4">folder_shared</span>
                  <h1 className="text-2xl font-serif font-bold mb-2">File Repositories</h1>
                  <p className="text-[#43474e] text-sm mb-6">Authorized view for document storage and LRP uploads.</p>
                  <Navigate to="/team/dashboard" replace />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/team/metrics"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.UPDATE_METRICS}>
              <div className="min-h-screen bg-[#fbf9f4] p-12 text-[#002045] flex flex-col justify-center items-center">
                <div className="bg-white p-8 rounded-xl border border-[#c4c6cf]/30 shadow-md max-w-md w-full text-center">
                  <span className="material-symbols-outlined text-4xl text-[#002045] mb-4">analytics</span>
                  <h1 className="text-2xl font-serif font-bold mb-2">Performance Metrics</h1>
                  <p className="text-[#43474e] text-sm mb-6">Authorized view for LRP pillar values and metrics updates.</p>
                  <Navigate to="/team/dashboard" replace />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/team/settings"
          element={
            <ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_USERS}>
              <div className="min-h-screen bg-[#fbf9f4] p-12 text-[#002045] flex flex-col justify-center items-center">
                <div className="bg-white p-8 rounded-xl border border-[#c4c6cf]/30 shadow-md max-w-md w-full text-center">
                  <span className="material-symbols-outlined text-4xl text-[#002045] mb-4">admin_panel_settings</span>
                  <h1 className="text-2xl font-serif font-bold mb-2">Portal Settings</h1>
                  <p className="text-[#43474e] text-sm mb-6">Authorized view for user management and audit logging control.</p>
                  <Navigate to="/team/dashboard" replace />
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}