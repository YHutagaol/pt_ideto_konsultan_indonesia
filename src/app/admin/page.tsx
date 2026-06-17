import prisma from "@/lib/prisma";
import Link from "next/link";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    totalKontak,
    baruKontak,
    totalServices,
    totalTrainings,
    latestKontak,
  ] = await Promise.all([
    prisma.kontak.count(),
    prisma.kontak.count({ where: { status: "BARU" } }),
    prisma.layanan.count(),
    prisma.program.count(),
    prisma.kontak.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "BARU":
        return "badge-status baru";
      case "DIPROSES":
        return "badge-status diproses";
      case "SELESAI":
        return "badge-status selesai";
      default:
        return "badge-status";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Overview dan ringkasan performa website PT IDETO KONSULTAN INDONESIA.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/pesan"
            className="admin-btn-action primary"
          >
            <i className="fas fa-inbox"></i> Kelola Pesan
          </Link>
          <Link
            href="/"
            target="_blank"
            className="admin-btn-action secondary border border-gray-300"
          >
            <i className="fas fa-external-link-alt"></i> Buka Website
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="admin-card-stats">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Pesan Baru
            </p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">
              {baruKontak}
            </h3>
            <p className="text-xs text-blue-600 mt-2 font-medium">
              <i className="fas fa-envelope"></i> Perlu Tindak Lanjut
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
            <i className="fas fa-inbox"></i>
          </div>
        </div>

        <div className="admin-card-stats">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Total Pesan
            </p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">
              {totalKontak}
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              <i className="fas fa-history"></i> Riwayat Masuk
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
            <i className="fas fa-comments"></i>
          </div>
        </div>

        <div className="admin-card-stats">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Layanan Aktif
            </p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">
              {totalServices}
            </h3>
            <p className="text-xs text-emerald-600 mt-2 font-medium">
              <i className="fas fa-check-circle"></i> Ditampilkan Publik
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
            <i className="fas fa-file-signature"></i>
          </div>
        </div>

        <div className="admin-card-stats">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Program Pelatihan
            </p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">
              {totalTrainings}
            </h3>
            <p className="text-xs text-amber-600 mt-2 font-medium">
              <i className="fas fa-award"></i> Bersertifikasi BNSP
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-xl">
            <i className="fas fa-graduation-cap"></i>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table of Latest Submissions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Pesan Masuk Terbaru
            </h2>
            <Link
              href="/admin/pesan"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
            >
              Lihat Semua <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>

          <div className="admin-table-wrapper">
            {latestKontak.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <i className="fas fa-envelope-open text-4xl mb-3 text-gray-300"></i>
                <p>Belum ada pesan masuk dari pengunjung.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Pengirim</th>
                      <th>Kategori Layanan</th>
                      <th>Tanggal</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestKontak.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <div className="font-semibold">{lead.name}</div>
                          <div className="text-xs text-gray-500">
                            {lead.email}
                          </div>
                        </td>
                        <td>
                          <span className="px-2.5 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
                            {lead.serviceCategory || "Umum"}
                          </span>
                        </td>
                        <td className="text-gray-500 text-sm">
                          {formatDate(lead.createdAt)}
                        </td>
                        <td>
                          <span className={getStatusClass(lead.status)}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Quick Insights/Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Info Sistem</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Status Server</span>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>{" "}
                  ONLINE
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Database Engine</span>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-800">
                  MySQL
                </span>
              </div>
            </div>
          </div>

          <ChangePasswordForm />

          <div className="bg-emerald-900 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute right-[-20px] bottom-[-20px] text-emerald-800 text-9xl opacity-20 pointer-events-none">
              <i className="fas fa-laptop-code"></i>
            </div>
            <h3 className="font-bold text-lg mb-2 relative z-10">Bantuan</h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed mb-4 relative z-10">
              Panel Admin ini berfungsi untuk mengawasi pesan yang dikirimkan oleh
              calon klien melalui formulir kontak.
            </p>
            <Link
              href="/admin/pesan"
              className="px-4 py-2 bg-white text-emerald-900 rounded-lg text-xs font-bold hover:bg-emerald-50 transition-colors inline-block relative z-10"
            >
              Kelola Pesan Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
