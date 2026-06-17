"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: null, text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Konfirmasi password baru tidak cocok." });
      return;
    }

    if (newPassword.length < 5) {
      setMessage({ type: "error", text: "Password baru minimal 5 karakter." });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setMessage({ type: "success", text: "Password berhasil diperbarui!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: data.error || "Gagal mengubah password." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan koneksi sistem." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="font-bold text-gray-800 text-lg mb-4">
        <i className="fas fa-key text-emerald-600 mr-2"></i> Ubah Password Admin
      </h3>

      {message.text && (
        <div
          className="mb-4 text-xs p-3 rounded-lg"
          style={{
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            border: message.type === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
          }}
        >
          <i
            className={message.type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle"}
            style={{ marginRight: "6px" }}
          >
          </i>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Password Saat Ini</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Password Baru</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Konfirmasi Password Baru</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPass}
              onChange={() => setShowPass(!showPass)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            Tampilkan Password
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all duration-300 disabled:opacity-75 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-emerald-500 shadow-sm"
        >
          {isLoading ? (
            <>
              <i className="fas fa-circle-notch fa-spin mr-1"></i> Menyimpan...
            </>
          ) : (
            <>
              <i className="fas fa-save mr-1"></i> Simpan Password Baru
            </>
          )}
        </button>
      </form>
    </div>
  );
}
