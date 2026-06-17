import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { id: 'desc' }
    });
    return NextResponse.json({
      ok: true,
      data: portfolios,
    });
  } catch (error) {
    console.error('[GET /api/portfolio] Failed to load portfolios:', error);
    return NextResponse.json({ ok: false, error: 'Gagal memuat data portofolio.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, partner, year, description, imageUrl, gallery } = body;

    if (!title || !partner || !year || !description) {
      return NextResponse.json({ ok: false, error: 'Judul, Mitra, Tahun, dan Deskripsi wajib diisi.' }, { status: 400 });
    }

    // Helper to generate simple slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    const existing = await prisma.portfolio.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const newPortfolio = await prisma.portfolio.create({
      data: {
        slug: finalSlug,
        title,
        partner,
        year,
        description,
        imageUrl: imageUrl || null,
        gallery: gallery || null,
      },
    });

    return NextResponse.json({ ok: true, data: newPortfolio });
  } catch (error) {
    console.error('[POST /api/portfolio] Error:', error);
    return NextResponse.json({ ok: false, error: 'Gagal menambahkan portofolio.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, partner, year, description, imageUrl, gallery } = body;

    if (!id || !title || !partner || !year || !description) {
      return NextResponse.json({ ok: false, error: 'ID, Judul, Mitra, Tahun, dan Deskripsi wajib diisi.' }, { status: 400 });
    }

    // Generate new slug in case title changed
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const existing = await prisma.portfolio.findFirst({
      where: { slug, id: { not: Number(id) } }
    });
    const finalSlug = existing ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: Number(id) },
      data: {
        slug: finalSlug,
        title,
        partner,
        year,
        description,
        imageUrl: imageUrl || null,
        gallery: gallery || null,
      },
    });

    return NextResponse.json({ ok: true, data: updatedPortfolio });
  } catch (error) {
    console.error('[PUT /api/portfolio] Error:', error);
    return NextResponse.json({ ok: false, error: 'Gagal memperbarui portofolio.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ ok: false, error: 'ID wajib disertakan.' }, { status: 400 });
    }

    await prisma.portfolio.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ ok: true, message: 'Portofolio berhasil dihapus.' });
  } catch (error) {
    console.error('[DELETE /api/portfolio] Error:', error);
    return NextResponse.json({ ok: false, error: 'Gagal menghapus portofolio.' }, { status: 500 });
  }
}
