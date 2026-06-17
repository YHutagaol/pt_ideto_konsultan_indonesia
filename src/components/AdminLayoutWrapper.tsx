"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const ADMIN_NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "fa-tachometer-alt" },
  { href: "/admin/pesan", label: "Pesan Masuk", icon: "fa-inbox" },
  { href: "/admin/portofolio", label: "Kelola Portofolio", icon: "fa-briefcase" },
];

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Menyembunyikan header/footer web publik saat sedang membuka halaman admin
  useEffect(() => {
    const header = document.querySelector("header.header-light");
    const footer = document.querySelector("footer.footer-green");
    if (header) (header as HTMLElement).style.display = "none";
    if (footer) (footer as HTMLElement).style.display = "none";

    return () => {
      if (header) (header as HTMLElement).style.display = "flex";
      if (footer) (footer as HTMLElement).style.display = "block";
    };
  }, [pathname]);

  // Auth guard check client-side
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <div className="bg-gray-light min-h-screen">{children}</div>;
  }

  // Prevent flash of unauthorized content
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-light flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-green text-3xl mb-4"></i>
          <p className="text-gray">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout bg-gray-light" style={{ minHeight: "100vh" }}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/assets/logo_pt_ideto_circle.png"
            alt="Logo PT Ideto"
            style={{ width: "auto", height: "30px" }}
          />
          <span>Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {ADMIN_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? "active" : ""}
              >
                <i className={`fas ${link.icon}`}></i>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar-footer" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link href="/" target="_blank">
            <i className="fas fa-globe"></i> Lihat Website
          </Link>
          <button
            onClick={() => {
              if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
                localStorage.removeItem("admin_token");
                window.location.href = "/admin/login";
              }
            }}
            style={{
              background: "none",
              border: "none",
              color: "#f87171",
              padding: "8px 0",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#ef4444")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#f87171")}
          >
            <i className="fas fa-sign-out-alt"></i> Keluar (Logout)
          </button>
        </div>
      </aside>
      <main className="admin-main-content">{children}</main>
    </div>
  );
}
