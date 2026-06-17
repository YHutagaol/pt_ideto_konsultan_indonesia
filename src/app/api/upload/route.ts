import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: 'Tidak ada file yang diunggah' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save path inside public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Ensure uploads directory exists
    await mkdir(uploadDir, { recursive: true });

    // Generate unique name
    const timestamp = Date.now();
    const cleanFilename = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filename = `${timestamp}_${cleanFilename}`;
    const filePath = join(uploadDir, filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      ok: true,
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error('[POST /api/upload] Error:', error);
    return NextResponse.json({ ok: false, error: 'Gagal mengunggah file' }, { status: 500 });
  }
}
