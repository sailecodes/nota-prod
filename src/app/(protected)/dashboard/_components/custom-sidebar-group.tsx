import Link from "next/link";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ICustomSidebarGroupProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import UploadButton from "./upload-btn";

export default function CustomSidebarGroup({ isPrimaryBtn, hasGroupLabel, labelText, groupItems, className }: ICustomSidebarGroupProps) {
  return (
    <SidebarGroup className={cn("md:pr-0", className)}>
      {hasGroupLabel && <SidebarGroupLabel>{labelText}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {isPrimaryBtn ? (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <UploadButton />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            groupItems!.map((item) => (
              <SidebarMenuItem key={item.heading}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.Icon />
                    {item.heading}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
