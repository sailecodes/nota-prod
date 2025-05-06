import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "./_components/custom-sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <CustomSidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
