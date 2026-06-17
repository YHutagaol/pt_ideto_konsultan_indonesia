import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";

export const metadata = {
  title: "Admin Panel - PT IDETO KONSULTAN INDONESIA",
  description: "Dashboard pengelolaan website PT IDETO KONSULTAN INDONESIA.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
