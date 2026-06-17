PROMPT UNTUK AGEN ANTIGRAVITY (NEXT.JS TELEGRAM NOTIFICATION)
--------------------------------------------------------------------------------

Tolong bertindak sebagai Senior Full-Stack Next.js Developer. Saya ingin memperbarui API Route untuk form kontak klien di `src/app/api/pesan/route.ts` agar memiliki fitur push notification via Telegram Bot.

**Konteks Saat Ini:**
API saat ini menerima request POST berupa `nama`, `email`, `telepon`, `perusahaan`, dan `pesan`, lalu menyimpannya ke MySQL menggunakan Prisma ORM.

**Tugas Anda:**
1. Tambahkan logika `fetch` ke API Telegram (`https://api.telegram.org/bot<TOKEN>/sendMessage`) tepat setelah data berhasil di-`create` oleh Prisma.
2. Format pesan Telegram harus rapi, menampilkan teks peringatan (misal: "🚨 ADA LEAD KONSULTASI BARU!"), beserta detail data pengirim.
3. Gunakan Environment Variables (`process.env.TELEGRAM_BOT_TOKEN` and `process.env.TELEGRAM_CHAT_ID`) agar kredensial aman.
4. Bungkus proses fetch Telegram ini dengan error handling (`try...catch`) tersendiri yang bersifat non-blocking. Jika pengiriman Telegram gagal, proses API harus tetap mengembalikan respons sukses (201) ke client karena data sudah berhasil masuk ke database.
5. Beritahu saya juga kode apa yang harus saya tambahkan di file `.env`.

Tolong berikan kode utuh untuk file `route.ts` tersebut beserta penjelasannya.