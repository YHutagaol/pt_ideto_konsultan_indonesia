import Link from 'next/link';
import { COMPANY, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="footer-green">
      <div className="container">
        <div className="grid-3-col-footer">
          <div className="footer-brand">
            <div className="logo-white-group">
              <div className="logo-icon-white">
                <i className="fas fa-laptop-code" aria-hidden="true"></i>
              </div>
              <div className="logo-text-white">
                <span className="fw-bold">{COMPANY.name}</span>
                <br />
                <span className="fs-small">{COMPANY.subtitle}</span>
              </div>
            </div>
            <p className="footer-desc mt-20">{COMPANY.description}</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f" aria-hidden="true"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" aria-hidden="true"></i>
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
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i> {COMPANY.address}
              </li>
              <li>
                <i className="fas fa-phone-alt" aria-hidden="true"></i> {COMPANY.phone}
              </li>
              <li>
                <i className="fas fa-envelope" aria-hidden="true"></i> {COMPANY.email}
              </li>
              <li>
                <i className="fas fa-globe" aria-hidden="true"></i> {COMPANY.website}
              </li>
              <li>
                <i className="fas fa-user" aria-hidden="true"></i> {COMPANY.contactPerson} ({COMPANY.contactPersonPhone})
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 PT IDETO Konsultan Indonesia. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
