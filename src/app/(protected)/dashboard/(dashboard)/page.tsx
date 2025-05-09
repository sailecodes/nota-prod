import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import ActionItemsCard from "./_components/action-items-card";
import MonthlyUsageCard from "./_components/monthly-usage-card";
import TotalUploadsCard from "./_components/total-uploads-card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "See high-level details of your meetings, action items, and usage.",
};

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user: sbUser },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError || !sbUser) throw new Error("🫠 Uh oh. Something went wrong.");

  const pUser = await prisma.user.findUnique({
    where: { sbId: sbUser!.id },
    include: { uploads: true, actionItems: true },
  });

  if (!pUser) throw new Error("🫠 Uh oh. Something went wrong.");

  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(0,375px))] justify-center gap-3">
      <TotalUploadsCard user={pUser} />
      <ActionItemsCard user={pUser} />
      <MonthlyUsageCard user={pUser} />
    </div>
  );
}
