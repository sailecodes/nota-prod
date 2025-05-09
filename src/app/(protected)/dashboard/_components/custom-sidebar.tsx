import { LayoutDashboard, NotebookText, UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import CustomSidebarGroup from "./custom-sidebar-group";
import LogoutBtn from "./logout-btn";

export default async function CustomSidebar() {
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) throw new Error("Something went wrong. Please refresh the page.");

  const { firstName, lastName, username } = user.user.user_metadata;

  return (
    <Sidebar className="border-none">
      <SidebarHeader className="px-4 text-3xl font-extrabold tracking-tighter">Nota</SidebarHeader>
      <SidebarContent>
        <CustomSidebarGroup
          isPrimaryBtn={true}
          hasGroupLabel={false}
          className="mt-2"
        />
        <CustomSidebarGroup
          isPrimaryBtn={false}
          hasGroupLabel={false}
          groupItems={[{ href: "/dashboard", Icon: LayoutDashboard, heading: "Dashboard" }]}
        />
        <CustomSidebarGroup
          isPrimaryBtn={false}
          hasGroupLabel
          labelText="Workspace"
          groupItems={[{ href: "/dashboard/meetings", Icon: NotebookText, heading: "Meetings" }]}
        />
        <CustomSidebarGroup
          isPrimaryBtn={false}
          hasGroupLabel
          labelText="Preferences"
          groupItems={[{ href: "/dashboard/account", Icon: UserCircle2, heading: "Account" }]}
        />
      </SidebarContent>
      <SidebarFooter className="flex-row items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.pg"
              alt={`@${username}`}
            />
            <AvatarFallback>
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm">@{username}</p>
            <p className="text-muted-foreground text-xs">
              {firstName} {lastName.charAt(0)}.
            </p>
          </div>
        </div>
        <LogoutBtn />
      </SidebarFooter>
    </Sidebar>
  );
}
