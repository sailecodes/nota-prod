"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "../_actions/logout";

export default function LogoutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();

    if (!result.success) toast.error("Something went wrong. Please try again.");
    else router.push(result.metadata!.redirectUrl);
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:cursor-pointer">
      <LogOut className="size-4" />
    </button>
  );
}
