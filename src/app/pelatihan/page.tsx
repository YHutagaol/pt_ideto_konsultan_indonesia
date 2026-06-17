import { getPrograms } from '@/lib/data';

// Read from MySQL via Prisma at request time.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pendidikan & Pelatihan',
  description:
    'Program pendidikan & pelatihan PT IDETO Konsultan Indonesia: pengendalian pencemaran, manajemen lingkungan ISO, K3 Migas, dan sertifikasi kompetensi BNSP.',
};

export default async function PelatihanPage() {
  const programs = await getPrograms();

  return (
    <>
      <section className="page-padding container align-center animate-fade-in-up">
        <h1 className="main-title">Pendidikan & Pelatihan</h1>
        <p className="main-subtitle">
          Tingkatkan kompetensi SDM perusahaan Anda melalui program pelatihan
          bersertifikasi yang dipandu oleh instruktur ahli.
        </p>
      </section>

      <section className="banner-green">
        <div className="container banner-content">
          <i className="fas fa-award banner-icon" aria-hidden="true" />
          <div className="banner-text-group">
            <h3 className="banner-title">Sertifikasi Kompetensi BNSP</h3>
            <p className="banner-desc">
              Sebagian besar program pelatihan kami terintegrasi dengan skema
              sertifikasi BNSP resmi.
            </p>
          </div>
        </div>
      </section>

      <section className="container page-padding">
        <div className="grid-3-col">
          {programs.map((program) => (
            <div
              key={program.id}
              className="card card-white shadow-hover align-left"
            >
              <div className="card-icon-wrapper green-light-bg mb-20">
                <i
                  className={`fas ${program.icon ?? 'fa-leaf'} text-green`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="card-title-center align-left">{program.title}</h3>
              <ul className="check-list mt-20">
                {program.items.map((item) => (
                  <li key={item.id}>
                    <i className="far fa-check-circle" aria-hidden="true" />{' '}
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
