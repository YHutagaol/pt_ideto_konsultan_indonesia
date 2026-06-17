import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, serviceCategory } = body;

    // Validasi basic
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 },
      );
    }

    // Simpan data pesan masuk ke tabel Kontak di MySQL
    const newKontak = await prisma.kontak.create({
      data: {
        name,
        email,
        phone: phone || "",
        subject: subject || "",
        message,
        serviceCategory: serviceCategory || null,
        // Status secara otomatis diisi 'BARU' dan createdAt diisi waktu saat ini oleh Prisma
      },
    });

    // Kirim notifikasi Telegram Bot (Non-blocking)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId && botToken !== "your_telegram_bot_token" && chatId !== "your_telegram_chat_id") {
      const text = `🚨 *ADA KONTAK/KONSULTASI BARU!*

👤 *Nama:* ${name}
✉️ *Email:* ${email}
📞 *Telepon:* ${phone || "-"}
🏷️ *Kategori:* ${serviceCategory || "Umum"}
📌 *Subjek:* ${subject || "-"}

💬 *Pesan:*
${message}`;

      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }).catch((err) => {
        console.error("Telegram API Error:", err);
      });
    }

    return NextResponse.json(
      { message: "Pesan berhasil dikirim!", kontak: newKontak },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat memproses pesan." },
      { status: 500 },
    );
  }
}
