// Shared TypeScript types for PT IDETO Konsultan Indonesia.
// These mirror the Prisma models but are decoupled so client components
// can import types without pulling in the Prisma client.

export type KontakStatus = 'BARU' | 'DIPROSES' | 'SELESAI' | 'SPAM';

export interface LayananItemDTO {
  id: number;
  label: string;
  order: number;
}

export interface LayananDTO {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string | null;
  order: number;
  items: LayananItemDTO[];
}

export interface ProgramItemDTO {
  id: number;
  label: string;
  order: number;
}

export interface ProgramDTO {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  icon: string | null;
  isBnspCertified: boolean;
  order: number;
  items: ProgramItemDTO[];
}

export interface PortfolioDTO {
  id: number;
  slug: string;
  title: string;
  partner: string;
  year: string;
  description: string;
  imageUrl: string | null;
  gallery?: string | null;
}

// Payload accepted by POST /api/contact.
export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  serviceCategory?: string;
}
