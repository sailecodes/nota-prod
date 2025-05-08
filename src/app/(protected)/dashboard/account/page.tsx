import { createClient } from "@/lib/supabase/server";
import DangerZone from "./_components/danger-zone";
import EmailAddress from "./_components/email-address";
import Password from "./_components/password";
import UserInformation from "./_components/user-information";

export default async function Account() {
  const supabase = await createClient();
  const {
    data: { user: sbUser },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError || !sbUser) throw new Error("🫠 Uh oh. Something went wrong.");

  return (
    <div className="space-y-3">
      <UserInformation user={sbUser} />
      <EmailAddress user={sbUser} />
      <Password user={sbUser} />
      <DangerZone />
    </div>
  );
}
