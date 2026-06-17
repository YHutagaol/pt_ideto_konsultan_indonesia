import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    // Ambil kredensial admin dari database (Admin)
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (admin && admin.password === password) {
      return NextResponse.json({
        success: true,
        token: "authenticated",
      });
    }

    return NextResponse.json(
      { error: "Username atau password salah." },
      { status: 401 }
    );
  } catch (error) {
    console.error("[POST /api/admin/login] Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat memproses login." },
      { status: 500 }
    );
  }
}
