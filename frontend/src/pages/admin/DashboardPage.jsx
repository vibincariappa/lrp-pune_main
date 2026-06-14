import React from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { hasPermission, PERMISSIONS } from "../../lib/rbac";

export default function DashboardPage() {
  const { user, role, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate("/team/login");
  };

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] antialiased">
      {/* Header bar */}
      <header className="bg-[#002045] text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">subway</span>
          <span className="font-serif text-lg font-bold tracking-tight">Pune Metro LRP Staff Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-[#86a0cd] font-mono">Logged in as</p>
            <p className="text-sm font-semibold">{user?.username || "Staff User"} ({role})</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-[#ba1a1a] text-white hover:bg-[#ba1a1a]/85 transition-colors rounded-lg text-xs font-bold font-mono uppercase cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-6 md:p-12 space-y-10">
        <div className="space-y-2">
          <span className="font-mono text-xs text-[#875200] uppercase tracking-[0.2em] font-bold">
            Staff Dashboard
          </span>
          <h1 className="text-4xl font-serif font-bold text-[#002045]">
            Welcome back, {user?.username || "Staff Member"}
          </h1>
          <p className="text-[#43474e] text-sm">
            Access secure tools and administrative controls. Registered email: <span className="font-mono">{user?.email}</span>
          </p>
        </div>

        {/* Tools Grid based on RBAC Permissions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Universal view dashboard */}
          {hasPermission(role, PERMISSIONS.VIEW_DASHBOARD) && (
            <div className="bg-white p-8 border border-[#c4c6cf]/30 rounded-xl shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="material-symbols-outlined text-3xl text-[#002045]">dashboard</span>
                <h3 className="text-xl font-serif font-bold text-[#002045]">View Public Landing</h3>
                <p className="text-xs text-[#43474e] leading-relaxed">
                  Navigate back to the main public portal and landing visualizations.
                </p>
              </div>
              <Link
                to="/"
                className="inline-block text-xs font-mono font-bold text-[#002045] hover:underline uppercase pt-2"
              >
                Go to Public Landing →
              </Link>
            </div>
          )}

          {/* Upload files tool */}
          {hasPermission(role, PERMISSIONS.UPLOAD_FILES) ? (
            <div className="bg-white p-8 border border-[#c4c6cf]/30 rounded-xl shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="material-symbols-outlined text-3xl text-[#002045]">cloud_upload</span>
                <h3 className="text-xl font-serif font-bold text-[#002045]">File Repository</h3>
                <p className="text-xs text-[#43474e] leading-relaxed">
                  Access official program reports, CSVs, and PDF metrics file storage.
                </p>
              </div>
              <Link
                to="/team/uploads"
                className="inline-block text-xs font-mono font-bold text-[#002045] hover:underline uppercase pt-2"
              >
                Access Repository →
              </Link>
            </div>
          ) : (
            <div className="bg-[#eae8e3]/40 p-8 border border-[#c4c6cf]/10 rounded-xl shadow-none space-y-4 opacity-50 select-none">
              <span className="material-symbols-outlined text-3xl text-[#74777f]">lock</span>
              <h3 className="text-xl font-serif font-bold text-[#74777f]">File Repository</h3>
              <p className="text-xs text-[#74777f] leading-relaxed">
                Access restricted to SuperAdmin and Admin1 roles.
              </p>
            </div>
          )}

          {/* Update metrics tool */}
          {hasPermission(role, PERMISSIONS.UPDATE_METRICS) ? (
            <div className="bg-white p-8 border border-[#c4c6cf]/30 rounded-xl shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="material-symbols-outlined text-3xl text-[#002045]">analytics</span>
                <h3 className="text-xl font-serif font-bold text-[#002045]">Metrics Control</h3>
                <p className="text-xs text-[#43474e] leading-relaxed">
                  Update targets, adjust pillar values, and modify program stats.
                </p>
              </div>
              <Link
                to="/team/metrics"
                className="inline-block text-xs font-mono font-bold text-[#002045] hover:underline uppercase pt-2"
              >
                Manage Metrics →
              </Link>
            </div>
          ) : (
            <div className="bg-[#eae8e3]/40 p-8 border border-[#c4c6cf]/10 rounded-xl shadow-none space-y-4 opacity-50 select-none">
              <span className="material-symbols-outlined text-3xl text-[#74777f]">lock</span>
              <h3 className="text-xl font-serif font-bold text-[#74777f]">Metrics Control</h3>
              <p className="text-xs text-[#74777f] leading-relaxed">
                Access restricted to SuperAdmin and Admin1 roles.
              </p>
            </div>
          )}

          {/* System user settings tool */}
          {hasPermission(role, PERMISSIONS.MANAGE_USERS) ? (
            <div className="bg-white p-8 border border-[#c4c6cf]/30 rounded-xl shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="material-symbols-outlined text-3xl text-[#002045]">admin_panel_settings</span>
                <h3 className="text-xl font-serif font-bold text-[#002045]">System Admin</h3>
                <p className="text-xs text-[#43474e] leading-relaxed">
                  Manage accounts, audit logging files, and access system security dashboards.
                </p>
              </div>
              <Link
                to="/team/settings"
                className="inline-block text-xs font-mono font-bold text-[#002045] hover:underline uppercase pt-2"
              >
                Access System Panel →
              </Link>
            </div>
          ) : (
            <div className="bg-[#eae8e3]/40 p-8 border border-[#c4c6cf]/10 rounded-xl shadow-none space-y-4 opacity-50 select-none">
              <span className="material-symbols-outlined text-3xl text-[#74777f]">lock</span>
              <h3 className="text-xl font-serif font-bold text-[#74777f]">System Admin</h3>
              <p className="text-xs text-[#74777f] leading-relaxed">
                Access restricted to SuperAdmin roles.
              </p>
            </div>
          )}

          {/* Developer tools (for DEVELOPER role) */}
          {role === "DEVELOPER" ? (
            <div className="bg-[#002526]/5 p-8 border border-[#003d3e]/20 rounded-xl shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="material-symbols-outlined text-3xl text-[#003d3e]">terminal</span>
                <h3 className="text-xl font-serif font-bold text-[#003d3e]">Developer Tools</h3>
                <p className="text-xs text-[#004f50] leading-relaxed">
                  Access system environment variables, debug tools, and query visualizers.
                </p>
              </div>
              <span className="inline-block text-xs font-mono font-bold text-[#003d3e] hover:underline uppercase pt-2 cursor-pointer">
                Launch Console →
              </span>
            </div>
          ) : (
            <div className="bg-[#eae8e3]/40 p-8 border border-[#c4c6cf]/10 rounded-xl shadow-none space-y-4 opacity-50 select-none">
              <span className="material-symbols-outlined text-3xl text-[#74777f]">lock</span>
              <h3 className="text-xl font-serif font-bold text-[#74777f]">Developer Tools</h3>
              <p className="text-xs text-[#74777f] leading-relaxed">
                Access restricted to Developer roles.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
