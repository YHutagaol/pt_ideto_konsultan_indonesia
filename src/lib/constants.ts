// Static site-wide constants: navigation, company contact info, and brand
// strings shared across layout, header, and footer. Keeping these here avoids
// the 6x duplication of header/footer that existed in the static HTML site.

export const COMPANY = {
  name: 'PT IDETO KONSULTAN INDONESIA',
  subtitle: 'KONSULTAN IH & LINGKUNGAN HIDUP',
  fullName: 'PT IDETO KONSULTAN INDONESIA',
  description:
    'Mitra strategis terpercaya untuk jasa Konsultasi Higiene Industri (IH) & Lingkungan Hidup, Pendidikan dan Pelatihan K3, serta Sertifikasi Profesi.',
  address:
    'Ruko GIS Blok E1 No 20, Jl Raya Pahlawan Gunungsindur, Kec. Gunungsindur, Kab. Bogor, Jawa Barat 16340',
  phone: '+6221-75673754',
  email: 'admin@idetokonsultan.co.id',
  website: 'www.idetokonsultan.co.id',
  contactPerson: 'Irwan Mulyadi',
  contactPersonPhone: '+62822-9880-4710',
  // E.164 digits (no +, no leading 0) for wa.me links.
  whatsappNumber: '6282298804710',
} as const;

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/konsultasi', label: 'Konsultasi' },
  { href: '/pelatihan', label: 'Pendidikan & Pelatihan' },
  { href: '/portofolio', label: 'Portofolio' },
  { href: '/kontak', label: 'Kontak' },
];
