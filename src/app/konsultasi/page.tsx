import { getLayananList } from "@/lib/data";

// Read from MySQL via Prisma at request time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Layanan Konsultasi",
  description:
    "Solusi komprehensif untuk penyusunan dokumen lingkungan (AMDAL, UKL-UPL, RKL-RPL) dan manajemen limbah B3 sesuai regulasi yang berlaku.",
};

const STATIC_PROJECTS = [
  { id: 1, name: "Apartemen Cikunir 2" },
  { id: 2, name: "Pertambangan PT Gayo Quama" },
  { id: 3, name: "Apartemen The Conexio City" },
  { id: 4, name: "Rumah Sakit Hermina" },
  { id: 5, name: "DPPU Kertajati" },
];

export default async function KonsultasiPage() {
  const services = await getLayananList();
  const projects = STATIC_PROJECTS;

  return (
    <>
      <section className="page-padding container align-center animate-fade-in-up">
        <h1 className="main-title">Layanan Konsultasi</h1>
        <p className="main-subtitle">
          Solusi komprehensif untuk penyusunan dokumen lingkungan dan manajemen
          limbah B3 sesuai regulasi yang berlaku.
        </p>
      </section>

      <section className="container pb-80">
        <div className="grid-2-col">
          {services.map((service) => (
            <div
              key={service.id}
              className="card card-white shadow-hover align-left"
            >
              <div className="card-icon-wrapper green-bg">
                <i
                  className={`fas ${service.icon ?? "fa-leaf"} text-green`}
                  aria-hidden="true"
                />
              </div>
              <h2 className="card-heading mb-20">{service.title}</h2>

              <ul className="check-list">
                {service.items.map((item) => (
                  <li key={item.id}>
                    <i className="far fa-check-circle" aria-hidden="true" />{" "}
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-section">
        <div className="container">
          <div className="align-center mb-50">
            <h2 className="section-title text-white">Pengalaman Proyek</h2>
            <p className="section-subtitle text-white opacity-80">
              Kepercayaan klien adalah bukti nyata dari kualitas layanan kami.
            </p>
          </div>

          <div className="grid-3-col">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <i className="far fa-building" aria-hidden="true" />
                <h4>{project.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
