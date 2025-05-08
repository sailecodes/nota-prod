import { createClient } from "@/lib/supabase/server";
import DangerZone from "./_components/danger-zone";
import EmailAddress from "./_components/email-address";
import Password from "./_components/password";
import UserInformation from "./_components/user-information";
import AccountLoading from "./loading";

export default async function Account() {
  const supabase = await createClient();
  const {
    data: { user: sbUser },
    error: sbClientError,
  } = await supabase.auth.getUser();

  if (sbClientError || !sbUser) throw new Error("Something went wrong. Please try again.");

  return (
    <>
      <AccountLoading />
      <div className="flex flex-col gap-3">
        {/* <UserInformation user={sbUser} /> */}
        {/* <EmailAddress user={sbUser} /> */}
        {/* <Password user={sbUser} /> */}
        <DangerZone />
      </div>
    </>
  );
}
