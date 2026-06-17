import { getPortfolios } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: "Rekam Jejak Kerjasama - PT IDETO",
  description: "Daftar rekam jejak kerjasama proyek profesional PT Ideto Konsultan Indonesia bersama berbagai mitra.",
};

export const dynamic = "force-dynamic";

export default async function PortofolioPage() {
  const portfolios = await getPortfolios();

  return (
    <main className="pb-80 bg-gradient-to-b from-white to-gray-50/50 min-h-screen">
      <section className="page-padding container align-center animate-fade-in-up">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block mb-4">
          PORTFOLIO KAMI
        </span>
        <h1 className="main-title text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Rekam Jejak Kerjasama
        </h1>
        <p className="main-subtitle text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          Daftar lengkap proyek kolaboratif dan kemitraan strategis kami di bidang Higiene Industri, K3, dan pengelolaan lingkungan hidup.
        </p>
      </section>

      <section className="container">
        {portfolios.length === 0 ? (
          <div className="text-center text-gray-500 py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto">
            <i className="fas fa-handshake text-5xl mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-700">Belum ada rekam jejak kerjasama</p>
            <p className="text-sm text-gray-500 mt-1">Silakan periksa kembali beberapa saat lagi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-100">
            {portfolios.map((project) => (
              <Link
                key={project.id}
                href={`/portofolio/${project.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-emerald-500/30 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {project.imageUrl ? (
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-xs font-semibold backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <i className="fas fa-search-plus" /> Detail Kerjasama & Galeri
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-video w-full bg-gradient-to-br from-emerald-50 to-teal-50/50 flex flex-col items-center justify-center p-6 border-b border-gray-50">
                      <i className="fas fa-handshake text-emerald-600 text-4xl mb-3 opacity-80" />
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full text-center max-w-[90%] truncate">
                        {project.partner}
                      </span>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-md">
                        Tahun {project.year}
                      </span>
                      <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                        <i className="far fa-user text-gray-400" /> {project.partner}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-gray-50/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white px-3 py-1.5 rounded-full transition-all duration-300">
                    Detail Kerjasama
                  </span>
                  <i className="fas fa-arrow-right text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1.5 transition-all duration-300 text-xs" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
