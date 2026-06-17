import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { KontakStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID tidak valid." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!status || !Object.values(KontakStatus).includes(status as KontakStatus)) {
      return NextResponse.json(
        { error: "Status tidak valid." },
        { status: 400 }
      );
    }

    const updatedKontak = await prisma.kontak.update({
      where: { id },
      data: { status: status as KontakStatus },
    });

    return NextResponse.json({
      message: "Status kontak berhasil diperbarui.",
      kontak: updatedKontak,
    });
  } catch (error) {
    console.error("[PATCH /api/contact/[id]] Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat memperbarui status kontak." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID tidak valid." },
        { status: 400 }
      );
    }

    await prisma.kontak.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Kontak berhasil dihapus.",
    });
  } catch (error) {
    console.error("[DELETE /api/contact/[id]] Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat menghapus kontak." },
      { status: 500 }
    );
  }
}
