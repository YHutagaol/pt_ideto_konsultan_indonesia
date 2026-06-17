"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Otomatis menutup menu mobile jika rute/halaman berpindah
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="header-light">
      <div className="container header-container">
        <Link href="/" className="logo">
          <img
            src="/assets/logo_pt_ideto_circle.png"
            alt="Logo PT Ideto"
            className="logo-img"
            style={{ width: "auto", height: "42px", objectFit: "contain" }}
          />
          <div className="logo-text">
            <span className="logo-title">{COMPANY.name}</span>
            <span className="logo-subtitle">{COMPANY.subtitle}</span>
          </div>
        </Link>

        <nav
          className={`nav-links ${isMenuOpen ? "active" : ""}`}
          id="nav-links"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="hamburger"
          id="hamburger"
          aria-label="Buka menu navigasi"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i
            className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}
