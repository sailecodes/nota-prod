import { createClient } from "@/lib/supabase/server";
import NavbarClient from "./navbar-client";

export default async function Navbar() {
  // Can ignore potential error from getUser() because an error will be thrown if the user is not
  // authenticated, which we want to handle in the UI with the user variable
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return <NavbarClient isAuthenticated={!!user} />;
}
