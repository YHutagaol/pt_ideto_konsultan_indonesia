"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageUploader from "@/components/ImageUploader";

interface Portfolio {
  id: number;
  slug: string;
  title: string;
  partner: string;
  year: string;
  description: string;
  imageUrl: string | null;
  gallery: string | null;
}

export default function AdminPortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [partner, setPartner] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [newGalleryImg, setNewGalleryImg] = useState("");

  const [message, setMessage] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });

  const fetchPortfolios = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const json = await res.json();
      if (json.ok) {
        setPortfolios(json.data);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Gagal memuat portofolio dari database." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setPartner("");
    setYear(new Date().getFullYear().toString());
    setDescription("");
    setImageUrl("");
    setGallery([]);
    setNewGalleryImg("");
    setShowModal(true);
  };

  const openEditModal = (item: Portfolio) => {
    setEditingItem(item);
    setTitle(item.title);
    setPartner(item.partner);
    setYear(item.year);
    setDescription(item.description);
    setImageUrl(item.imageUrl || "");
    
    // Parse gallery photos JSON
    let parsedGallery: string[] = [];
    try {
      if (item.gallery) {
        const parsed = JSON.parse(item.gallery);
        if (Array.isArray(parsed)) {
          parsedGallery = parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse gallery", e);
    }
    setGallery(parsedGallery);
    setNewGalleryImg("");
    setShowModal(true);
  };

  const handleAddGalleryImage = (url: string) => {
    if (!url) return;
    setGallery((prev) => [...prev, url]);
    setNewGalleryImg(""); // Reset temp uploader value
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setGallery((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleMoveGalleryImage = (index: number, direction: "left" | "right") => {
    if (direction === "left" && index === 0) return;
    if (direction === "right" && index === gallery.length - 1) return;

    const targetIndex = direction === "left" ? index - 1 : index + 1;
    const updated = [...gallery];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setGallery(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: null, text: "" });

    const payload = {
      id: editingItem?.id,
      title,
      partner,
      year,
      description,
      imageUrl: imageUrl || null,
      gallery: gallery.length > 0 ? JSON.stringify(gallery) : null,
    };

    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/portfolio", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setMessage({
          type: "success",
          text: editingItem ? "Portofolio berhasil diperbarui." : "Portofolio berhasil ditambahkan.",
        });
        setShowModal(false);
        fetchPortfolios();
      } else {
        setMessage({ type: "error", text: data.error || "Gagal menyimpan data." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan koneksi sistem." });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus portofolio ini?")) return;
    setMessage({ type: null, text: "" });

    try {
      const res = await fetch(`/api/portfolio?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok && data.ok) {
        setMessage({ type: "success", text: "Portofolio berhasil dihapus." });
        fetchPortfolios();
      } else {
        setMessage({ type: "error", text: data.error || "Gagal menghapus item." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan koneksi sistem." });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <i className="fas fa-spinner fa-spin text-green text-3xl"></i>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola Portofolio & Galeri</h1>
          <p className="text-gray-500 mt-1">
            Kelola rekam jejak kerja sama proyek (mitra, tahun, deskripsi, dan galeri foto).
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={openAddModal} className="admin-btn-action primary">
            <i className="fas fa-plus"></i> Tambah Portofolio
          </button>
          <Link href="/portofolio" target="_blank" className="admin-btn-action secondary border border-gray-300">
            <i className="fas fa-external-link-alt"></i> Lihat Portofolio
          </Link>
        </div>
      </div>

      {message.text && (
        <div
          style={{
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
            padding: "14px",
            borderRadius: "8px",
          }}
        >
          <i className={message.type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-triangle"} style={{ marginRight: "8px" }}></i>
          {message.text}
        </div>
      )}

      {/* Grid of portfolios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((item) => {
          let count = 0;
          try {
            if (item.gallery) {
              const arr = JSON.parse(item.gallery);
              if (Array.isArray(arr)) count = arr.length;
            }
          } catch (e) {}

          return (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-emerald-600 uppercase bg-emerald-50 px-2.5 py-1 rounded">
                    Tahun {item.year}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded font-mono">
                    {count} Foto Galeri
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg leading-snug">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Mitra:</strong> {item.partner}
                  </p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">{item.description}</p>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button onClick={() => openEditModal(item)} className="admin-btn-action secondary text-xs" style={{ padding: "6px 10px" }}>
                  <i className="fas fa-edit"></i> Edit / Galeri
                </button>
                <button onClick={() => handleDelete(item.id)} className="admin-btn-action danger text-xs" style={{ padding: "6px 10px" }}>
                  <i className="fas fa-trash"></i> Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-2xl w-full my-8 overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-xl font-bold text-gray-800">
                {editingItem ? "Edit Portofolio & Galeri" : "Tambah Portofolio Baru"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
              <div>
                <label className="form-label block text-sm font-semibold text-gray-700 mb-1">Nama Proyek / Kerja Sama</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Misal: Pembangunan Sistem Registrasi Event"
                  className="form-input"
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "8px" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label block text-sm font-semibold text-gray-700 mb-1">Nama Mitra / Klien</label>
                  <input
                    type="text"
                    required
                    value={partner}
                    onChange={(e) => setPartner(e.target.value)}
                    placeholder="Misal: PT Pertamina (Persero)"
                    className="form-input"
                    style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "8px" }}
                  />
                </div>

                <div>
                  <label className="form-label block text-sm font-semibold text-gray-700 mb-1">Tahun Kerja Sama</label>
                  <input
                    type="text"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Misal: 2024"
                    className="form-input"
                    style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "8px" }}
                  />
                </div>
              </div>

              <div>
                <label className="form-label block text-sm font-semibold text-gray-700 mb-1">Deskripsi Proyek</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan detail lingkup kerja sama proyek..."
                  className="form-input form-textarea"
                  rows={4}
                  style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "8px" }}
                />
              </div>

              <div>
                <label className="form-label block text-sm font-semibold text-gray-700 mb-1">Foto Sampul Utama (Opsional)</label>
                <ImageUploader value={imageUrl} onChange={setImageUrl} recommendedRatio="1:1" />
              </div>

              {/* Gallery Manager Section */}
              <div className="border-t border-gray-200 pt-5 space-y-4">
                <div>
                  <h3 className="text-md font-bold text-gray-800">Galeri Foto Kegiatan</h3>
                  <p className="text-xs text-gray-500">
                    Foto-foto kegiatan yang akan tampil dalam format slide Instagram pada detail portfolio.
                  </p>
                </div>

                {/* Gallery Items Grid List */}
                {gallery.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {gallery.map((url, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-lg border border-gray-200 overflow-hidden bg-white">
                        <img src={url} alt={`Gallery index ${idx}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-1.5 z-10">
                          {/* Top Actions: Remove */}
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
                              title="Hapus foto ini"
                            >
                              <i className="fas fa-trash text-[10px]" />
                            </button>
                          </div>
                          {/* Bottom Actions: Move Left/Right */}
                          <div className="flex justify-between w-full">
                            <button
                              type="button"
                              onClick={() => handleMoveGalleryImage(idx, "left")}
                              disabled={idx === 0}
                              className={`bg-white/90 hover:bg-white text-gray-800 w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${
                                idx === 0 ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              title="Geser Kiri"
                            >
                              <i className="fas fa-chevron-left text-[10px]" />
                            </button>
                            <span className="text-[10px] text-white font-bold self-center bg-black/40 px-1.5 rounded-full">
                              {idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleMoveGalleryImage(idx, "right")}
                              disabled={idx === gallery.length - 1}
                              className={`bg-white/90 hover:bg-white text-gray-800 w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${
                                idx === gallery.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              title="Geser Kanan"
                            >
                              <i className="fas fa-chevron-right text-[10px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">Belum ada foto galeri pendukung untuk portfolio ini.</p>
                )}

                {/* Upload New Image to Gallery */}
                <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/80 space-y-3">
                  <span className="text-xs font-bold text-gray-700 block">Tambah Foto ke Galeri</span>
                  <ImageUploader value={newGalleryImg} onChange={handleAddGalleryImage} recommendedRatio="1:1" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-gray-100 bg-white sticky bottom-0 z-10">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn-action secondary">
                  Batal
                </button>
                <button type="submit" className="admin-btn-action primary">
                  <i className="fas fa-save"></i> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
