"use server";

import { ServerActionError } from "@/lib/classes";
import { SERVER_ACTION_ERROR_TYPE } from "@/lib/enums";
import { createClient } from "@/lib/supabase/server";
import { TServerActionResult } from "@/lib/types";
import { createServerAction } from "@/lib/utils";

export const logout = createServerAction(async function (): Promise<TServerActionResult<undefined, { redirectUrl: string }>> {
  try {
    const supabase = await createClient();
    const {
      data: { user: sbUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw new ServerActionError(authError.message, { type: SERVER_ACTION_ERROR_TYPE.KNOWN });
    else if (!sbUser) throw new ServerActionError();

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) throw new ServerActionError(signOutError.message, { type: SERVER_ACTION_ERROR_TYPE.KNOWN });

    return { success: true, metadata: { redirectUrl: "/" } };
  } catch (err) {
    throw err;
  }
});
