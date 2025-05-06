import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CustomSidebar from "./(dashboard)/_components/custom-sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="bg-sidebar-primary-foreground">
      <CustomSidebar />
      <main className="bg-muted m-2 flex-1 rounded-xl border">
        <SidebarTrigger className="my-3 px-7" />
        <Separator />
        <section className="mx-auto max-w-7xl p-5">{children}</section>
      </main>
    </SidebarProvider>
  );
}
