import Link from "next/link";
import LogoSlider from "@/components/LogoSlider";
import { getLayananList } from "@/lib/data";

// Read from MySQL via Prisma at request time.
export const dynamic = "force-dynamic";

const HOME_SERVICE_LINKS: Record<string, string> = {
  "konsultasi-dokumen-lingkungan": "/konsultasi",
  "konsultasi-limbah-b3": "/konsultasi",
  "pelatihan-k3-lingkungan": "/pelatihan",
  "sertifikasi-personel-perusahaan": "/pelatihan",
};

export default async function HomePage() {
  const services = await getLayananList();
  const featured = services.slice(0, 4);

  return (
    <>
      <section className="hero-home">
        <div className="hero-overlay" />
        <div className="container hero-content-home align-center">
          <div className="badge-outline">PT IDETO KONSULTAN INDONESIA</div>
          <h1 className="hero-title-large mt-20">
            Konsultan Higiene Industri
            <br />
            & Lingkungan Hidup
            <br />
            Terpercaya & Berpengalaman
          </h1>
          <p className="hero-subtitle-home mt-20">
            Membantu kepatuhan regulasi lingkungan hidup (AMDAL, UKL-UPL, RKL-RPL, PROPER),
            pengelolaan limbah B3, pelatihan K3 bersertifikasi BNSP, serta sertifikasi kompetensi profesi.
          </p>
          <div className="hero-buttons mt-40">
            <Link href="/kontak" className="btn-primary-white">
              Hubungi Kami{" "}
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
            <Link href="/portofolio" className="btn-outline-white">
              Lihat Rekam Jejak
            </Link>
          </div>
        </div>
      </section>

      <section className="container stats-section pull-up">
        <div className="card card-white shadow-hover grid-3-col stats-grid align-center">
          <div className="stat-item">
            <i
              className="far fa-calendar-alt text-green stat-icon"
              aria-hidden="true"
            />
            <h3 className="stat-number">Sejak 2015</h3>
            <p className="text-gray">Berpengalaman</p>
          </div>
          <div className="stat-item stat-border">
            <i
              className="fas fa-check-circle text-green stat-icon"
              aria-hidden="true"
            />
            <h3 className="stat-number">100+</h3>
            <p className="text-gray">Proyek Sukses</p>
          </div>
          <div className="stat-item">
            <i
              className="fas fa-user-shield text-green stat-icon"
              aria-hidden="true"
            />
            <h3 className="stat-number">BNSP</h3>
            <p className="text-gray">Sertifikasi Resmi</p>
          </div>
        </div>
      </section>

      <section className="container page-padding">
        <div className="align-center mb-50">
          <h2 className="section-title">Layanan Utama Kami</h2>
          <p className="section-subtitle">
            Kami menghadirkan layanan profesional berkualitas untuk memastikan kepatuhan regulasi lingkungan dan keselamatan kerja industri Anda.
          </p>
        </div>

        <div className="grid-4-col">
          {featured.map((service) => (
            <div
              key={service.id}
              className="card card-white shadow-hover outline-card align-left"
            >
              <div className="card-icon-wrapper green-light-bg mb-20">
                <i
                  className={`fas ${service.icon ?? "fa-leaf"} text-green`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="card-sub-heading mb-10" style={{ fontSize: "16px" }}>{service.title}</h3>
              <p className="text-gray fs-small mb-20" style={{ minHeight: "80px" }}>{service.description}</p>
              <div className="mb-20">
                <ul className="check-list" style={{ marginTop: 0 }}>
                  {service.items.slice(0, 3).map((item) => (
                    <li key={item.id} style={{ marginBottom: '8px', fontSize: '13px' }}>
                      <i className="fas fa-check" style={{ fontSize: '12px' }} /> {item.label}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={HOME_SERVICE_LINKS[service.slug] ?? "/konsultasi"}
                className="card-link"
              >
                Lihat Detail{" "}
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section align-center">
        <div className="container">
          <h2 className="hero-title-large text-white mb-20">
            Butuh Solusi Kepatuhan Lingkungan
            <br />
            & Keselamatan Kerja?
          </h2>
          <p className="hero-subtitle-home mb-40 text-white opacity-80">
            Diskusikan kebutuhan penyusunan AMDAL, UKL-UPL, pengelolaan limbah B3, pendampingan PROPER, atau program pelatihan K3 perusahaan Anda bersama tim ahli kami.
          </p>
          <Link href="/kontak" className="btn-primary-white">
            Mulai Konsultasi Gratis
          </Link>
        </div>
      </section>

      <LogoSlider />
    </>
  );
}
