import prisma from '@/lib/prisma';
import type {
  LayananDTO,
  ProgramDTO,
  PortfolioDTO,
} from '@/types';

// ============================================================================
// Data-access layer. Server Components call these to read content from MySQL
// via Prisma. Each function returns plain DTOs (ordered) ready for rendering.
// ============================================================================

export async function getLayananList(): Promise<LayananDTO[]> {
  const list = await prisma.layanan.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    include: { items: { orderBy: { order: 'asc' } } },
  });
  return list.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    description: s.description,
    icon: s.icon,
    order: s.order,
    items: s.items.map((i) => ({ id: i.id, label: i.label, order: i.order })),
  }));
}

export async function getPrograms(): Promise<ProgramDTO[]> {
  const list = await prisma.program.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    include: { items: { orderBy: { order: 'asc' } } },
  });
  return list.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    icon: p.icon,
    isBnspCertified: p.isBnspCertified,
    order: p.order,
    items: p.items.map((i) => ({ id: i.id, label: i.label, order: i.order })),
  }));
}

export async function getPortfolios(): Promise<PortfolioDTO[]> {
  const portfolios = await prisma.portfolio.findMany();
  return portfolios.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    partner: p.partner,
    year: p.year,
    description: p.description,
    imageUrl: p.imageUrl,
    gallery: p.gallery,
  }));
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioDTO | null> {
  const p = await prisma.portfolio.findUnique({ where: { slug } });
  if (!p) return null;
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    partner: p.partner,
    year: p.year,
    description: p.description,
    imageUrl: p.imageUrl,
    gallery: p.gallery,
  };
}
