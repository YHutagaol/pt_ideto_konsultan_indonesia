import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioBySlug } from "@/lib/data";
import PortfolioGallerySlider from "@/components/PortfolioGallerySlider";

interface Props {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const project = await getPortfolioBySlug(params.slug);
  if (!project) {
    return {
      title: "Proyek Tidak Ditemukan",
    };
  }
  return {
    title: `${project.title} - PT IDETO`,
    description: project.description.substring(0, 150),
  };
}

export default async function PortofolioDetailPage({ params }: Props) {
  const project = await getPortfolioBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="pb-80">
      <section className="page-padding container align-center animate-fade-in-up">
        <div className="mb-20">
          <Link href="/portofolio" className="text-green fs-small fw-semibold" style={{ fontWeight: 600 }}>
            <i className="fas fa-arrow-left" style={{ marginRight: "8px" }} /> Kembali ke Rekam Jejak
          </Link>
        </div>
        <h1 className="main-title">{project.title}</h1>
        <div className="badge-outline text-green" style={{ borderColor: "var(--primary-green)", color: "var(--primary-green)" }}>
          Detail Kerja Sama
        </div>
      </section>

      <section className="container space-y-8">
        <div className="card card-white shadow-hover">
          <div className="grid-2-col gap-50 align-start">
            <div className="project-media">
              {project.imageUrl ? (
                <div className="gallery-img-wrapper" style={{ aspectRatio: "1 / 1" }}>
                  <img src={project.imageUrl} alt={project.title} className="gallery-img" />
                </div>
              ) : (
                <div className="gallery-placeholder" style={{ minHeight: "300px", aspectRatio: "1 / 1" }}>
                  <i className="fas fa-briefcase" style={{ fontSize: "64px" }} aria-hidden="true" />
                  <span className="mt-10" style={{ fontSize: "18px", fontWeight: "bold" }}>{project.partner}</span>
                </div>
              )}
            </div>

            <div className="project-info">
              <h2 className="section-title mb-20" style={{ fontSize: "24px" }}>Tentang Kerja Sama</h2>
              <p className="text-gray mb-30" style={{ lineHeight: "1.8", whiteSpace: "pre-line" }}>
                {project.description}
              </p>

              <div className="card-white outline-card" style={{ padding: "20px" }}>
                <h3 className="card-sub-heading mb-10" style={{ fontSize: "16px" }}>Rincian Kolaborasi</h3>
                <table style={{ width: "100%", fontSize: "14px", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "10px 0", color: "#6b7280", fontWeight: "600" }}>Nama Mitra / Klien</td>
                      <td style={{ padding: "10px 0", textAlign: "right", color: "var(--text-dark)", fontWeight: "700" }}>{project.partner}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 0", color: "#6b7280", fontWeight: "600" }}>Tahun Pelaksanaan</td>
                      <td style={{ padding: "10px 0", textAlign: "right", color: "var(--text-dark)", fontWeight: "700" }}>{project.year}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Carousel Section */}
        <PortfolioGallerySlider galleryJson={project.gallery} partnerName={project.partner} />
      </section>
    </main>
  );
}
