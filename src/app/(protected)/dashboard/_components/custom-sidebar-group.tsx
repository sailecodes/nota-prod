import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
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

export default function CustomSidebarGroup({
  isPrimaryBtn,
  BtnIcon,
  btnText,
  hasGroupLabel,
  labelText,
  groupItems,
  className,
}: ICustomSidebarGroupProps) {
  return (
    <SidebarGroup className={cn(className)}>
      {hasGroupLabel && <SidebarGroupLabel>{labelText}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {isPrimaryBtn ? (
            <SidebarMenuItem>
              <Button size="lg" className="w-full">
                {BtnIcon && <BtnIcon />}
                {btnText}
              </Button>
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
