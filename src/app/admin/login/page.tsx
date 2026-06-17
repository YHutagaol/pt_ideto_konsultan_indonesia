"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("admin_token", data.token);
        router.push("/admin");
      } else {
        setError(data.error || "Username atau password salah.");
      }
    } catch (err) {
      setError("Gagal menghubungi server. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-12 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(13, 59, 32, 0.85), rgba(26, 122, 67, 0.95)), url('/assets/hero_bg.jpg')",
        backgroundColor: "#0d3b20",
      }}
    >
      {/* Background abstract shapes for premium look */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-green-500 opacity-20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-emerald-600 opacity-20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 z-10 transition-all duration-300">
        <div className="text-center mb-8">
          <img
            src="/assets/logo_pt_ideto_circle.png"
            alt="Logo PT Ideto"
            className="mx-auto h-16 w-auto object-contain mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            PT IDETO KONSULTAN INDONESIA
          </h2>
          <p className="text-sm text-gray-500 mt-1">Admin Portal Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-user"></i>
              </span>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-key"></i>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-600 transition-colors"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                <i className="fas fa-exclamation-circle"></i> {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-all duration-300 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i> Memvalidasi...
              </>
            ) : (
              <>
                Masuk <i className="fas fa-sign-in-alt"></i>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <i className="fas fa-arrow-left"></i> Kembali ke Website
          </Link>
        </div>
      </div>
    </div>
  );
}
