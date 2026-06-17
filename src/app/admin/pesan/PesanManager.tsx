"use client";

import { useState } from "react";
import { Kontak, KontakStatus } from "@prisma/client";

const formatWhatsAppUrl = (phone: string, name: string, subject: string) => {
  let cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "62" + cleanPhone.slice(1);
  }
  if (cleanPhone.length >= 9 && cleanPhone.length <= 14 && !cleanPhone.startsWith("62")) {
    cleanPhone = "62" + cleanPhone;
  }
  const text = encodeURIComponent(
    `Halo ${name}, saya admin PT IDETO Konsultan Indonesia. Menindaklanjuti konsultasi/pesan Anda mengenai "${subject}".`
  );
  return `https://wa.me/${cleanPhone}?text=${text}`;
};

interface PesanManagerProps {
  initialKontak: Kontak[];
}

export default function PesanManager({ initialKontak }: PesanManagerProps) {
  const [kontakList, setKontakList] = useState<Kontak[]>(initialKontak);
  const [filter, setFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedKontak, setSelectedKontak] = useState<Kontak | null>(null);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdateStatus = async (id: number, newStatus: KontakStatus) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memperbarui status");

      setKontakList((prev) =>
        prev.map((k) => (k.id === id ? { ...k, status: newStatus } : k))
      );
      if (selectedKontak && selectedKontak.id === id) {
        setSelectedKontak((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      showToast("Status pesan berhasil diperbarui!");
    } catch (err: any) {
      showToast(err.message || "Gagal memperbarui status", "error");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDeleteKontak = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus pesan");

      setKontakList((prev) => prev.filter((k) => k.id !== id));
      if (selectedKontak && selectedKontak.id === id) {
        setSelectedKontak(null);
      }
      showToast("Pesan berhasil dihapus!");
    } catch (err: any) {
      showToast(err.message || "Gagal menghapus pesan", "error");
    } finally {
      setIsDeleting(null);
    }
  };

  // Filter and Search logic
  const filteredKontak = kontakList.filter((k) => {
    const matchesStatus = filter === "ALL" || k.status === filter;
    const matchesSearch =
      k.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case "BARU":
        return "badge-status baru";
      case "DIPROSES":
        return "badge-status diproses";
      case "SELESAI":
        return "badge-status selesai";
      default:
        return "badge-status";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Count kontak by status
  const counts = {
    ALL: kontakList.length,
    BARU: kontakList.filter((l) => l.status === "BARU").length,
    DIPROSES: kontakList.filter((l) => l.status === "DIPROSES").length,
    SELESAI: kontakList.filter((l) => l.status === "SELESAI").length,
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3 rounded-lg shadow-xl text-white flex items-center gap-2 transform transition-all duration-300 ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          <i className={toast.type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle"}></i>
          <span className="font-semibold text-sm">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pesan Masuk (Kontak)</h1>
          <p className="text-gray-500 mt-1">
            Lihat, kelola status tindak lanjut, dan respons pesan dari formulir kontak/konsultasi.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {(["ALL", "BARU", "DIPROSES", "SELESAI"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${
                filter === status
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{status === "ALL" ? "Semua" : status}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  filter === status
                    ? "bg-white/25 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {counts[status]}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <i className="fas fa-search text-sm"></i>
          </span>
          <input
            type="text"
            placeholder="Cari nama, email, pesan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="admin-table-wrapper">
        {filteredKontak.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <i className="fas fa-envelope-open text-5xl mb-4 text-gray-300"></i>
            <p className="text-lg font-semibold text-gray-600">Tidak ada pesan ditemukan</p>
            <p className="text-sm mt-1">Coba sesuaikan kata kunci pencarian atau filter status Anda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Pengirim</th>
                  <th>Kategori</th>
                  <th>Subjek & Pesan</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th className="text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredKontak.map((k) => (
                  <tr key={k.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedKontak(k)}>
                    <td className="max-w-[200px]" onClick={(e) => e.stopPropagation()}>
                      <div className="font-semibold text-gray-800 break-words">{k.name}</div>
                      <div className="text-xs text-gray-500 break-all">{k.email}</div>
                      {k.phone && <div className="text-xs text-gray-400 mt-0.5">{k.phone}</div>}
                    </td>
                    <td>
                      <span className="px-2.5 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
                        {k.serviceCategory || "Umum"}
                      </span>
                    </td>
                    <td className="max-w-xs md:max-w-md">
                      <div className="font-medium text-gray-800 truncate">{k.subject}</div>
                      <div className="text-xs text-gray-500 truncate mt-0.5">{k.message}</div>
                    </td>
                    <td className="text-gray-500 text-sm whitespace-nowrap">
                      {formatDate(k.createdAt)}
                    </td>
                    <td>
                      <span className={getStatusClass(k.status)}>
                        {k.status}
                      </span>
                    </td>
                    <td className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        {k.phone && (
                          <a
                            href={formatWhatsAppUrl(k.phone, k.name, k.subject)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-btn-action success bg-green-600 hover:bg-green-700 text-white flex items-center gap-1.5"
                            style={{ padding: "6px 12px", borderRadius: "8px", textDecoration: "none", fontSize: "12px", fontWeight: "bold" }}
                            title="Hubungi via WhatsApp"
                          >
                            <i className="fab fa-whatsapp"></i> WhatsApp
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedKontak(k)}
                          className="admin-btn-action secondary"
                          title="Detail Pesan"
                        >
                          <i className="fas fa-eye"></i> Detail
                        </button>
                        <button
                          disabled={isDeleting === k.id}
                          onClick={() => handleDeleteKontak(k.id)}
                          className="admin-btn-action danger"
                          title="Hapus Pesan"
                        >
                          {isDeleting === k.id ? (
                            <i className="fas fa-circle-notch fa-spin"></i>
                          ) : (
                            <i className="fas fa-trash-alt"></i>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedKontak && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all animate-fade-in-up duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-emerald-900 text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope-open text-xl"></i>
                <span className="font-bold text-lg">Detail Pesan</span>
              </div>
              <button
                onClick={() => setSelectedKontak(null)}
                className="text-white/80 hover:text-white transition-colors text-xl bg-transparent border-none cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Pengirim</span>
                  <span className="font-bold text-gray-800 text-base">{selectedKontak.name}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Email</span>
                  <a href={`mailto:${selectedKontak.email}`} className="text-emerald-600 hover:underline font-medium text-sm break-all">
                    {selectedKontak.email}
                  </a>
                </div>
                {selectedKontak.phone && (
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Telepon / WhatsApp</span>
                    <div className="flex items-center gap-2 mt-1">
                      <a href={`tel:${selectedKontak.phone}`} className="text-gray-700 hover:text-emerald-600 font-medium text-sm">
                        {selectedKontak.phone}
                      </a>
                      <a
                        href={formatWhatsAppUrl(selectedKontak.phone, selectedKontak.name, selectedKontak.subject)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="fab fa-whatsapp"></i> Hubungi WA
                      </a>
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Kategori Layanan</span>
                  <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded bg-gray-100 text-gray-800 mt-1">
                    {selectedKontak.serviceCategory || "Umum"}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Tanggal Diterima</span>
                  <span className="text-sm text-gray-700 font-medium">{formatDate(selectedKontak.createdAt)}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Status Saat Ini</span>
                  <span className={`mt-1 inline-flex ${getStatusClass(selectedKontak.status)}`}>
                    {selectedKontak.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Subjek</span>
                <span className="font-bold text-gray-800 text-base">{selectedKontak.subject}</span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Pesan</span>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-gray-700 text-sm whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                  {selectedKontak.message}
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-3">
                  Ubah Status Tindak Lanjut
                </span>
                <div className="flex flex-wrap gap-2">
                  {(["BARU", "DIPROSES", "SELESAI"] as const).map((status) => (
                    <button
                      key={status}
                      disabled={isUpdating === selectedKontak.id || selectedKontak.status === status}
                      onClick={() => handleUpdateStatus(selectedKontak.id, status)}
                      className={`admin-btn-action ${
                        status === "BARU"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          : status === "DIPROSES"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      } ${selectedKontak.status === status ? "ring-2 ring-emerald-500 opacity-60 cursor-not-allowed" : ""}`}
                    >
                      {isUpdating === selectedKontak.id && selectedKontak.status !== status ? (
                        <i className="fas fa-circle-notch fa-spin"></i>
                      ) : (
                        <i
                          className={`fas ${
                            status === "BARU"
                              ? "fa-envelope"
                              : status === "DIPROSES"
                              ? "fa-spinner"
                              : "fa-check-circle"
                          }`}
                        ></i>
                      )}
                      <span>Tandai sebagai {status}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between gap-3 border-t border-gray-100">
              <button
                disabled={isDeleting === selectedKontak.id}
                onClick={() => handleDeleteKontak(selectedKontak.id)}
                className="admin-btn-action danger"
              >
                {isDeleting === selectedKontak.id ? (
                  <i className="fas fa-circle-notch fa-spin"></i>
                ) : (
                  <i className="fas fa-trash-alt"></i>
                )}
                <span>Hapus Pesan</span>
              </button>
              <button
                onClick={() => setSelectedKontak(null)}
                className="admin-btn-action secondary border border-gray-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
