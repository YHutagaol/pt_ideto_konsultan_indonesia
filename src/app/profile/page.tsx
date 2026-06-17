export const metadata = {
  title: 'Profil',
  description:
    'Profil PT IDETO Konsultan Indonesia — visi, misi, nilai perusahaan, legalitas, dan struktur organisasi.',
};

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const visi = "Menjadi Perusahaan Nasional di Bidang Jasa Konsultasi, Pendidikan dan Pelatihan K3 Lingkungan Kerja (Higiene Industri) dan Lingkungan Hidup yang Terpercaya dengan Tekad Memenuhi Kepuasan Pelanggan.";
  const misi = "Memberikan Jasa Konsultasi, Training dan Sertifikasi melalui Profesionalisme, Teknologi Tepat Guna dan Standar Mutu yang diakui untuk Tercapainya Kepuasan Pelanggan.";

  return (
    <div className="page-padding">
      <section className="page-header container align-center animate-fade-in-up">
        <h1 className="main-title">Profil Perusahaan</h1>
        <p className="main-subtitle">
          Mengenal lebih dekat PT IDETO Konsultan Indonesia, dedikasi kami, dan
          komitmen terhadap keunggulan layanan.
        </p>
      </section>

      <section className="visi-misi-section container">
        <div className="grid-2-col">
          <div className="card card-green relative-overflow animate-on-scroll">
            <div className="card-icon-wrapper light">
              <i className="far fa-compass" aria-hidden="true" />
            </div>
            <h2 className="card-heading text-white">Visi Kami</h2>
            <p className="card-text-large text-white">
              &quot;{visi}&quot;
            </p>
            <div className="watermark-shape" />
          </div>

          <div className="card card-white relative-overflow animate-on-scroll delay-1">
            <div className="card-icon-wrapper green-bg">
              <i className="fas fa-bullseye text-green" aria-hidden="true" />
            </div>
            <h2 className="card-heading">Misi Kami</h2>
            <p className="card-text-large text-gray">
              &quot;{misi}&quot;
            </p>
            <div className="watermark-shape circle" />
          </div>
        </div>
      </section>

      <section className="values-section container text-center">
        <h2 className="section-title">Nilai-Nilai Perusahaan</h2>
        <p className="section-subtitle">
          Fondasi yang membentuk budaya kerja dan standar layanan kami.
        </p>

        <div className="grid-3-col mt-40">
          <div className="card card-white shadow-hover animate-on-scroll">
            <div className="card-icon-wrapper center-icon green-light-bg">
              <i className="fas fa-award text-green" aria-hidden="true" />
            </div>
            <h3 className="card-title-center">Profesionalisme</h3>
            <p className="card-text-center text-gray">
              Menjunjung tinggi etika kerja, kompetensi, dan tanggung jawab dalam
              setiap layanan yang diberikan.
            </p>
          </div>

          <div className="card card-white shadow-hover animate-on-scroll delay-1">
            <div className="card-icon-wrapper center-icon green-light-bg">
              <i className="fas fa-cogs text-green" aria-hidden="true" />
            </div>
            <h3 className="card-title-center">Teknologi Tepat Guna</h3>
            <p className="card-text-center text-gray">
              Mengaplikasikan solusi teknologi yang relevan, efisien, dan efektif
              sesuai kebutuhan spesifik klien.
            </p>
          </div>

          <div className="card card-white shadow-hover animate-on-scroll delay-2">
            <div className="card-icon-wrapper center-icon green-light-bg">
              <i className="fas fa-shield-alt text-green" aria-hidden="true" />
            </div>
            <h3 className="card-title-center">Standar Mutu</h3>
            <p className="card-text-center text-gray">
              Berkomitmen pada kualitas layanan yang diakui dan memenuhi standar
              regulasi nasional maupun internasional.
            </p>
          </div>
        </div>
      </section>

      <section className="legal-structure-section container">
        <div className="grid-2-col-gap50">
          <div className="animate-on-scroll">
            <div className="section-title-with-icon">
              <div className="small-icon-bg">
                <i className="far fa-file-alt text-green" aria-hidden="true" />
              </div>
              <h2>Legalitas Perusahaan</h2>
            </div>

            <div className="card card-white outline-card mt-20">
              <h4 className="card-sub-heading">Akte Pendirian</h4>
              <p className="text-gray mt-5">No. 25 Tanggal 22 April 2015</p>
            </div>

            <div className="card card-white outline-card mt-20">
              <h4 className="card-sub-heading">Akte Perubahan</h4>
              <p className="text-gray mt-5">No. 15 Tanggal 20 Mei 2016</p>
            </div>
          </div>

          <div className="animate-on-scroll delay-1">
            <div className="section-title-with-icon">
              <div className="small-icon-bg">
                <i className="fas fa-sitemap text-green" aria-hidden="true" />
              </div>
              <h2>Struktur Organisasi</h2>
            </div>

            <div className="card card-white outline-card mt-20 org-card">
              <div className="org-chart">
                <div className="org-node box-green">Komisaris</div>
                <div className="org-line-vertical" />
                <div className="org-node box-green">Direktur</div>
                <div className="org-line-vertical" />

                <div className="org-branches">
                  <div className="org-line-horizontal" />
                  <div className="branch-container">
                    <div className="org-line-vertical-small" />
                    <div className="org-node box-outline">Divisi Konsultasi</div>
                  </div>
                  <div className="branch-container">
                    <div className="org-line-vertical-small" />
                    <div className="org-node box-outline">Divisi Training</div>
                  </div>
                  <div className="branch-container">
                    <div className="org-line-vertical-small" />
                    <div className="org-node box-outline">Divisi Sertifikasi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
