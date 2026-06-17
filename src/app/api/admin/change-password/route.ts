import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { ok: false, error: "Password saat ini dan password baru wajib diisi." },
        { status: 400 }
      );
    }

    // Ambil password lama dari database
    const admin = await prisma.admin.findUnique({
      where: { username: "admin" },
    });
    const expectedPassword = admin?.password || "adminideto";

    // Validasi password lama
    if (currentPassword !== expectedPassword) {
      return NextResponse.json(
        { ok: false, error: "Password saat ini salah." },
        { status: 400 }
      );
    }

    // Update password baru di database
    await prisma.admin.update({
      where: { username: "admin" },
      data: { password: newPassword },
    });

    return NextResponse.json({
      ok: true,
      message: "Password berhasil diperbarui.",
    });
  } catch (error) {
    console.error("[POST /api/admin/change-password] Error:", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
