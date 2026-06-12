import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="bg-white p-8 rounded-xl border border-outline-variant/30 shadow-md max-w-sm w-full text-left space-y-6">
        <h2 className="text-2xl font-bold text-primary font-display-lg">Admin Login</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-label-caps text-on-surface-variant mb-1">Email Address</label>
            <input type="email" placeholder="admin@lrppune.org" className="w-full p-3 border border-outline-variant/50 rounded-lg focus:outline-primary bg-white text-on-background text-sm" />
          </div>
          <div>
            <label className="block text-xs font-label-caps text-on-surface-variant mb-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full p-3 border border-outline-variant/50 rounded-lg focus:outline-primary bg-white text-on-background text-sm" />
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-caps text-label-caps hover:opacity-90 active:scale-95 transition-all cursor-pointer">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
