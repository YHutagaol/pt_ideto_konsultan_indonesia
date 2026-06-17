import prisma from "@/lib/prisma";
import PesanManager from "./PesanManager";

export const dynamic = "force-dynamic";

export default async function PesanPage() {
  const kontakList = await prisma.kontak.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <PesanManager initialKontak={kontakList} />;
}
