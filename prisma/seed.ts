import { PrismaClient, KontakStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.layananItem.deleteMany({});
  await prisma.programItem.deleteMany({});
  await prisma.layanan.deleteMany({});
  await prisma.program.deleteMany({});
  await prisma.portfolio.deleteMany({});
  await prisma.kontak.deleteMany({});
  await prisma.admin.deleteMany({});

  // 1. Seed Layanan (Services)
  const layananDokumen = await prisma.layanan.create({
    data: {
      slug: 'konsultasi-dokumen-lingkungan',
      title: 'Konsultasi Penyusunan Dokumen Lingkungan',
      description:
        'Solusi komprehensif untuk penyusunan dokumen lingkungan sesuai regulasi yang berlaku, mulai dari AMDAL hingga pendampingan PROPER.',
      icon: 'fa-file-signature',
      order: 1,
      isActive: true,
      items: {
        create: [
          { label: 'Penyusunan AMDAL / DELH / DPLH / UKL-UPL', order: 1 },
          { label: 'Environmental Baseline Assessment (EBA)', order: 2 },
          { label: 'Penyusunan Laporan RKL RPL', order: 3 },
          { label: 'Studi Kelayakan Lingkungan', order: 4 },
          { label: 'Pendampingan PROPER', order: 5 },
          { label: 'Verifikasi Data Lingkungan', order: 6 },
          { label: 'Kajian Pembuangan Limbah Cair', order: 7 },
          { label: 'Health Risk Assessment', order: 8 },
          { label: 'Pengelolaan Kesehatan Kerja', order: 9 },
        ],
      },
    },
  });

  const layananLimbah = await prisma.layanan.create({
    data: {
      slug: 'konsultasi-limbah-b3',
      title: 'Konsultasi Pengelolaan Limbah B3',
      description:
        'Pendampingan menyeluruh untuk pengelolaan Limbah Bahan Berbahaya dan Beracun (B3) sesuai ketentuan perizinan yang berlaku.',
      icon: 'fa-trash-alt',
      order: 2,
      isActive: true,
      items: {
        create: [
          { label: 'Identifikasi Karakteristik Limbah B3', order: 1 },
          { label: 'Perancangan Sistem Pengelolaan Limbah B3', order: 2 },
          {
            label: 'Desain Tempat Penyimpanan Sementara (TPS) Limbah B3',
            order: 3,
          },
          { label: 'Pengurusan Izin Pengelolaan Limbah B3', order: 4 },
        ],
      },
    },
  });

  const layananPelatihan = await prisma.layanan.create({
    data: {
      slug: 'pelatihan-k3-lingkungan',
      title: 'Pelatihan K3 & Lingkungan Hidup',
      description:
        'Program peningkatan kapasitas SDM untuk pengelolaan pencemaran air, udara, CEMS, pemadaman kebakaran, dan Higiene Industri.',
      icon: 'fa-graduation-cap',
      order: 3,
      isActive: true,
      items: {
        create: [
          { label: 'Pelatihan Higiene Industri (HIMU/HIMA) sertifikasi BNSP', order: 1 },
          { label: 'Pelatihan Pengendalian Pencemaran Air (PPA) & Udara (PPU)', order: 2 },
          { label: 'Pelatihan Manajemen Pengelolaan Limbah B3', order: 3 },
          { label: 'Pelatihan Pengetahuan Dasar AMDAL & K3 Migas', order: 4 },
        ],
      },
    },
  });

  const layananSertifikasi = await prisma.layanan.create({
    data: {
      slug: 'sertifikasi-personel-perusahaan',
      title: 'Sertifikasi Personel & Perusahaan',
      description:
        'Uji kompetensi dan sertifikasi nasional BNSP/KAN untuk Penyusun AMDAL, Auditor Lingkungan, dan Operator IPAL/PPU/PPA.',
      icon: 'fa-certificate',
      order: 4,
      isActive: true,
      items: {
        create: [
          { label: 'Sertifikasi Ahli Higiene Industri (LSP Higiene Industri BNSP)', order: 1 },
          { label: 'Sertifikasi Penyusun AMDAL (ATPA & KTPA) oleh LSP LHI', order: 2 },
          { label: 'Sertifikasi Operator IPAL, PPA, PPU oleh LSP TLIP', order: 3 },
          { label: 'Sertifikasi Auditor & Petugas Pengambil Contoh Uji', order: 4 },
        ],
      },
    },
  });

  // 2. Seed Program (Training Programs)
  const programPencemaran = await prisma.program.create({
    data: {
      slug: 'pelatihan-pengendalian-pencemaran',
      title: 'Pelatihan Pengendalian Pencemaran',
      description:
        'Program pelatihan kompetensi penanggung jawab pengendalian pencemaran air dan udara serta teknologi pengolahan limbah.',
      icon: 'fa-shield-alt',
      isBnspCertified: true,
      order: 1,
      isActive: true,
      items: {
        create: [
          {
            label: 'Penanggung Jawab Pengendalian Pencemaran Air (PPA)',
            order: 1,
          },
          {
            label: 'Penanggung Jawab Pengendalian Pencemaran Udara (PPU)',
            order: 2,
          },
          {
            label: 'Continuous Emission Monitoring System (CEMS)',
            order: 3,
          },
          {
            label: 'Teknologi Plasma dan Ozon untuk Pengolahan Limbah',
            order: 4,
          },
        ],
      },
    },
  });

  const programManajemen = await prisma.program.create({
    data: {
      slug: 'pelatihan-manajemen-lingkungan',
      title: 'Pelatihan Manajemen Lingkungan',
      description:
        'Program pelatihan sistem manajemen lingkungan, pengelolaan sampah dan limbah B3, serta sertifikasi ISO terkait.',
      icon: 'fa-cog',
      isBnspCertified: true,
      order: 2,
      isActive: true,
      items: {
        create: [
          { label: 'Manajemen Pengelolaan Sampah', order: 1 },
          { label: 'Manajemen Pengelolaan Limbah B3', order: 2 },
          { label: 'Sistem Manajemen Lingkungan ISO 14001', order: 3 },
          { label: 'Sistem Manajemen Laboratorium ISO 17025', order: 4 },
          { label: 'Pendampingan dan Persiapan PROPER', order: 5 },
          {
            label: 'Operator Instalasi Pengolahan Air Limbah (IPAL)',
            order: 6,
          },
          {
            label: 'Petugas Pengambil Contoh (PPC) Air dan Udara',
            order: 7,
          },
        ],
      },
    },
  });

  const programKhusus = await prisma.program.create({
    data: {
      slug: 'pelatihan-khusus-k3',
      title: 'Pelatihan Khusus & K3',
      description:
        'Program pelatihan keselamatan dan kesehatan kerja (K3), K3 Migas, serta kompetensi teknis khusus lainnya.',
      icon: 'fa-book-open',
      isBnspCertified: true,
      order: 3,
      isActive: true,
      items: {
        create: [
          { label: 'Operator Pesawat Uap dan Bejana Tekan', order: 1 },
          { label: 'Dasar-dasar Pengetahuan AMDAL', order: 2 },
          { label: 'K3 Minyak dan Gas Bumi (Migas)', order: 3 },
          { label: 'Sertifikasi S1 Migas', order: 4 },
          { label: 'Teknik Penanggulangan Kebakaran', order: 5 },
          { label: 'Higiene Industri (Industrial Hygiene)', order: 6 },
        ],
      },
    },
  });

  // 3. Portfolios
  await prisma.portfolio.create({
    data: {
      slug: 'amdal-apartemen-cikunir-2',
      title: 'AMDAL Pembangunan Apartemen Cikunir 2',
      partner: 'PT Adhi Persada Properti',
      year: '2019',
      description: 'Studi Analisis Mengenai Dampak Lingkungan Hidup (AMDAL) untuk proyek Pembangunan Apartemen Cikunir 2 di Bekasi.',
      imageUrl: null,
      gallery: JSON.stringify([
        '/assets/logo-beta-pramesti-asia.jpg',
        '/assets/logo-bnsp.png',
        '/assets/logo-citra-baru-steel.png'
      ]),
    },
  });

  await prisma.portfolio.create({
    data: {
      slug: 'amdal-pertambangan-stone-crusher',
      title: 'AMDAL Kegiatan Pertambangan & Stone Crusher',
      partner: 'PT Gayo Quama Indonesia',
      year: '2018',
      description: 'Studi Analisis Mengenai Dampak Lingkungan Hidup (AMDAL) untuk kegiatan pertambangan batuan dan stone crusher di Aceh Tengah.',
      imageUrl: null,
      gallery: JSON.stringify([
        '/assets/logo-cmp.jpg',
        '/assets/logo-eagleburgmann.png',
        '/assets/logo-grand-galaxy-park.png'
      ]),
    },
  });

  await prisma.portfolio.create({
    data: {
      slug: 'ukl-upl-dppu-kertajati',
      title: 'UKL-UPL Kegiatan Depo Pengisian Bahan Bakar Udara (DPPU) Kertajati',
      partner: 'PT Pertamina MO III Kertajati',
      year: '2019',
      description: 'Penyusunan Dokumen Upaya Pengelolaan dan Upaya Pemantauan Lingkungan Hidup (UKL-UPL) untuk kegiatan DPPU Kertajati di Majalengka.',
      imageUrl: null,
      gallery: JSON.stringify([
        '/assets/logo-grobest.jpg',
        '/assets/logo-jembo-cable.png'
      ]),
    },
  });

  await prisma.portfolio.create({
    data: {
      slug: 'rkl-rpl-corridor-storage-tanker',
      title: 'Laporan Implementasi RKL-RPL Kegiatan Corridor Storage Tanker (CST)',
      partner: 'ConocoPhillips (Grissik) Ltd.',
      year: '2019',
      description: 'Penyusunan Laporan Implementasi RKL-RPL untuk kegiatan Corridor Storage Tanker (CST) di wilayah Bangka.',
      imageUrl: null,
      gallery: JSON.stringify([
        '/assets/logo-john-crane.png',
        '/assets/logo-kobelco.png'
      ]),
    },
  });

  await prisma.portfolio.create({
    data: {
      slug: 'pendampingan-proper-biru',
      title: 'Pendampingan PROPER BIRU',
      partner: 'PT Cabot Indonesia',
      year: '2016',
      description: 'Pendampingan penilaian PROPER tingkat Biru guna memastikan pemenuhan seluruh regulasi lingkungan hidup oleh industri.',
      imageUrl: null,
      gallery: JSON.stringify([
        '/assets/logo-kyodo-yushi.jpg',
        '/assets/logo-lixil.png'
      ]),
    },
  });

  // 4. Kontak
  await prisma.kontak.create({
    data: {
      name: 'Contoh Pengunjung',
      email: 'contoh@example.com',
      phone: '+62812-0000-0000',
      subject: 'Permintaan Informasi Layanan',
      message:
        'Halo, ini adalah data contoh (sample). Kami tertarik dengan layanan konsultasi dokumen lingkungan dan ingin mengetahui informasi lebih lanjut.',
      serviceCategory: 'Konsultasi',
      status: KontakStatus.BARU,
    },
  });

  // 5. Admin
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: 'adminideto',
    },
  });

  console.log('Seed selesai.');
  void layananDokumen;
  void layananLimbah;
  void layananPelatihan;
  void layananSertifikasi;
  void programPencemaran;
  void programManajemen;
  void programKhusus;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
