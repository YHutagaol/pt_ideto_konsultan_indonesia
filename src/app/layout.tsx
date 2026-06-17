import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import Header from "@/components/Header";
import ScrollReveal from "@/components/ScrollReveal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: COMPANY.fullName,
    template: `%s - ${COMPANY.fullName}`,
  },
  description: COMPANY.description,
  icons: {
    icon: "/assets/logo_pt_ideto_circle.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <ScrollReveal />

        {children}


        <footer className="footer-green" style={{ marginTop: 0 }}>
          <div className="container">
            <div className="grid-3-col-footer">
              <div className="footer-brand">
                <div className="logo-white-group">
                  <img
                    src="/assets/logo_pt_ideto_circle.png"
                    alt="Logo PT Ideto"
                    style={{ width: "auto", height: "42px" }}
                  />
                  <div className="logo-text-white">
                    <span className="fw-bold">{COMPANY.name}</span>
                    <br />
                    <span className="fs-small">{COMPANY.subtitle}</span>
                  </div>
                </div>
                <p className="footer-desc mt-20">{COMPANY.description}</p>
                <div className="social-links mt-20">
                  <a href="#" aria-label="Facebook">
                    <i className="fab fa-facebook-f" aria-hidden="true" />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <i className="fab fa-instagram" aria-hidden="true" />
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="footer-links">
                <h4 className="footer-heading">Tautan Cepat</h4>
                <ul>
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-contact">
                <h4 className="footer-heading">Informasi Kontak</h4>
                <ul className="contact-list">
                  <li>
                    <i className="fas fa-map-marker-alt" aria-hidden="true" />{" "}
                    {COMPANY.address}
                  </li>
                  <li>
                    <i className="fas fa-phone-alt" aria-hidden="true" />{" "}
                    {COMPANY.phone}
                  </li>
                  <li>
                    <i className="fas fa-envelope" aria-hidden="true" />{" "}
                    {COMPANY.email}
                  </li>
                  <li>
                    <i className="fas fa-globe" aria-hidden="true" />{" "}
                    {COMPANY.website}
                  </li>
                  <li className="mt-10">
                    <i className="far fa-user" aria-hidden="true" />{" "}
                    <strong>Contact Person:</strong> {COMPANY.contactPerson} (
                    {COMPANY.contactPersonPhone})
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>
                &copy; {new Date().getFullYear()} {COMPANY.fullName}. All rights
                reserved.
              </p>
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
