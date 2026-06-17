PRODUCT REQUIREMENT DOCUMENT (PRD) - VERSION 2.0
Proyek: Migrasi & Redesain Modern Website Full-Stack Company Profile PT Ideto Konsultan Indonesia
Teknologi Utama: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, MySQL, Prisma ORM
--------------------------------------------------------------------------------

1. LATAR BELAKANG & TUJUAN PROYEK
Proyek ini bertujuan untuk merombak total arsitektur frontend website statis menjadi aplikasi web full-stack modern berbasis Next.js, TypeScript, dan basis data MySQL menggunakan Prisma ORM. Langkah ini diambil untuk meningkatkan performa kecepatan (SEO & Core Web Vitals), memastikan kode yang type-safe, serta menyediakan sistem manajemen konten (CMS) internal berupa Admin Dashboard mandiri agar pihak PT Ideto dapat mengelola visi misi, galeri kegiatan, serta memantau pesan masuk secara real-time.

2. STRUKTUR PROYEK & ARSITEKTUR FILE (Next.js App Router + Prisma)
Untuk menjaga kerapian dan pemisahan logika antara frontend, backend API, dan database, struktur folder diatur sebagai berikut:

pt-ideto-nextjs/
├── prisma/
│   └── schema.prisma         # Skema Database & Model ORM (MySQL)
├── src/
│   ├── app/                  # App Router (Pages & Routing)
│   │   ├── page.tsx          # Halaman Home
│   │   ├── profile/          # Halaman Profil Perusahaan
│   │   │   └── page.tsx
│   │   ├── konsultasi/       # Halaman Layanan Konsultasi
│   │   │   └── page.tsx
│   │   ├── pelatihan/        # Halaman Pendidikan & Pelatihan
│   │   │   └── page.tsx
│   │   ├── galeri/           # Halaman Galeri Kegiatan
│   │   │   └── page.tsx
│   │   ├── kontak/           # Halaman Kontak Kami
│   │   │   └── page.tsx
│   │   ├── admin/            # Proteksi Halaman Admin Dashboard
│   │   │   ├── page.tsx      # Halaman Utama Dashboard Admin
│   │   │   ├── visi-misi/    # Halaman Kelola Visi & Misi
│   │   │   │   └── page.tsx
│   │   │   ├── galeri/       # Halaman Kelola Galeri Kegiatan
│   │   │   │   └── page.tsx
│   │   │   └── pesan/        # Halaman Kelola Pesan Masuk
│   │   │       └── page.tsx
│   │   ├── api/              # API Routes (Backend Handlers)
│   │   │   ├── visi-misi/
│   │   │   │   └── route.ts  # CRUD API Visi Misi
│   │   │   ├── galeri/
│   │   │   │   └── route.ts  # CRUD API Galeri
│   │   │   └── pesan/
│   │   │       └── route.ts  # CRUD API Pesan & Validasi
│   │   ├── layout.tsx        # Global Layout (Navbar & Footer)
│   │   └── globals.css       # Global Styles & Tailwind Directives
│   ├── components/           # Reusable UI Components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ReusableCard.tsx
│   │   └── WhatsAppForm.tsx
│   ├── lib/
│   │   └── prisma.ts         # Prisma Client Instance (Singleton Connection)
│   ├── types/                # TypeScript Interfaces & Types
│   │   └── index.ts
│   └── assets/               # Media (Logo, Images, Icons)
├── public/                   # Static Assets
├── tailwind.config.ts        # Konfigurasi Tema Warna & Font
├── tsconfig.json             # Konfigurasi TypeScript
└── package.json

3. PANDUAN VISUAL, WARNA, & ELEMEN UI
Desain mengadopsi gaya High-End Corporate Eco-Friendly dengan memanfaatkan kombinasi ruang putih yang luas (white space) dan aksen hijau premium yang tegas.

* Palet Warna Utama (Tailwind Theme Config):
    - primary-green: #1a7a43 (Hijau Zamrud - melambangkan alam, lingkungan hidup, dan kepatuhan hukum).
    - light-green: #e9f5ed (Aksen latar belakang penanda halaman aktif/ikon).
    - clean-white: #ffffff (Warna dominan latar belakang halaman).
    - charcoal-dark: #1f2937 (Teks judul utama untuk keterbacaan premium).
    - slate-gray: #4b5563 (Teks paragraf/deskripsi).
* Tipografi: Menggunakan font Inter atau Poppins yang di-import langsung secara optimal via next/font/google.
* Elemen Interaktif: Efek Glassmorphism pada navigasi atas, transisi antar-halaman yang mulus, serta bayangan lembut (soft depth shadows) pada kartu komponen.

4. MODEL BASIS DATA MYSQL (Prisma Schema Model)

A. Model VisiMisi (Tabel: `visi_misi`)
* id (Int, Autoincrement, Primary Key)
* tipe (String, contoh: "visi" atau "misi")
* konten (Text / Long Text)
* updatedAt (DateTime, Auto-update)

B. Model Galeri (Tabel: `galeri`)
* id (Int, Autoincrement, Primary Key)
* judul (String)
* kategori (String, contoh: "pelatihan", "observasi", "dokumen")
* imageUrl (String, path lokasi penyimpanan gambar)
* createdAt (DateTime, Auto-now)

C. Model Pesan (Tabel: `pesan`)
* id (Int, Autoincrement, Primary Key)
* nama (String)
* email (String)
* telepon (String)
* perusahaan (String)
* pesan (Text)
* status (String, default: "belum_dibaca")
* createdAt (DateTime, Auto-now)

5. RUANG LINGKUP FITUR DASHBOARD ADMIN & BACKEND

A. Panel Utama Dashboard Admin
* Ringkasan Statistik Beranda: Menampilkan jumlah total pesan masuk, jumlah pesan yang belum dibaca, dan indikator status koneksi ke database MySQL.
* UI Sistem Navigasi Sidebar: Memisahkan menu Dashboard Utama, Manajemen Visi Misi, Manajemen Galeri, dan Kotak Masuk Pesan.

B. Modul Kelola Visi & Misi
* Sinkronisasi Dinamis: Mengambil teks visi misi langsung dari MySQL melalui API Route GET, dan menampilkannya pada form isian halaman depan.
* Operasi Update: Menyediakan tombol simpan perubahan (API PUT) untuk mematangkan pembaruan teks secara instan tanpa menyentuh kode program.

C. Modul Kelola Galeri Kegiatan
* Manajemen Data (CRUD): Admin dapat menambahkan foto kegiatan baru (mengisi nama, mengunggah/menentukan path gambar, dan memilih kategori), mengubah data, atau menghapus foto lama dari basis data.

D. Modul Kelola Pesan Masuk (Inbox Management)
* Monitoring Real-time: List data tabel responsif menampilkan semua pesan yang masuk dari formulir kontak client di halaman depan.
* Update Status: Fitur interaktif untuk menandai status pesan dari "Belum Dibaca" menjadi "Sudah Dibaca".

6. KEBUTUHAN NON-FUNGSIONAL (Performance, Security, & SEO)
1. Image Optimization: Penggunaan komponen <Image /> dari next/image untuk kompresi otomatis format WebP dan lazy loading gambar galeri.
2. Type Safety & Validation: TypeScript wajib digunakan secara ketat untuk mendefinisikan interface data model Prisma, melarang keras penggunaan tipe data `any`.
3. Secure API Handling: Proteksi API routes di folder /api/admin menggunakan pengecekan session/token keamanan sederhana agar tidak dapat diakses secara ilegal oleh publik.
4. SEO Metadata: Konfigurasi metadata statis maupun dinamis untuk menunjang indeks pencarian Google yang maksimal bagi profil perusahaan PT Ideto.