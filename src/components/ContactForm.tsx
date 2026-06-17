"use client";

import { useState } from "react";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus({
          type: "error",
          message: result.error || "Gagal mengirim pesan.",
        });
      } else {
        setStatus({
          type: "success",
          message: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
        });
        (e.target as HTMLFormElement).reset(); // Kosongkan form setelah sukses
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Terjadi kesalahan pada sistem.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {status.type === "success" && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
          }}
        >
          <i className="fas fa-check-circle" style={{ marginRight: "8px" }}></i>
          {status.message}
        </div>
      )}
      {status.type === "error" && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
          }}
        >
          <i
            className="fas fa-exclamation-triangle"
            style={{ marginRight: "8px" }}
          ></i>
          {status.message}
        </div>
      )}

      <div className="form-group full-width">
        <label className="form-label">Nama Lengkap</label>
        <input
          type="text"
          name="name"
          className="form-input"
          placeholder="Masukkan nama Anda"
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="email@domain.com"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Nomor Telepon</label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            placeholder="+62 8xx xxxx xxxx"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label className="form-label">Subjek</label>
        <input
          type="text"
          name="subject"
          className="form-input"
          placeholder="Subjek pesan"
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group full-width">
        <label className="form-label">Pesan</label>
        <textarea
          name="message"
          className="form-input form-textarea"
          placeholder="Tulis pesan Anda di sini..."
          rows={5}
          required
          disabled={isLoading}
        ></textarea>
      </div>

      <div className="form-group full-width mt-10">
        <button
          type="submit"
          className="btn-submit"
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.7 : 1 }}
        >
          <i
            className={
              isLoading ? "fas fa-spinner fa-spin" : "far fa-paper-plane"
            }
          ></i>{" "}
          {isLoading ? "Mengirim..." : "Kirim Pesan via Sistem"}
        </button>
      </div>
    </form>
  );
}
