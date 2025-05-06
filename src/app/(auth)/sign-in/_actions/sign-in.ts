"use server";

import { z } from "zod";
import { ServerActionError } from "@/lib/classes";
import { E_SERVER_ACTION_ERROR_TYPE } from "@/lib/enums";
import { signInSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { TServerActionResult } from "@/lib/types";
import { createServerAction } from "@/lib/utils";
import { User as SbUser } from "@supabase/supabase-js";

export const signIn = createServerAction(async function (
  data: z.infer<typeof signInSchema>,
): Promise<TServerActionResult<{ user: SbUser }, { redirectUrl: string }>> {
  try {
    const { data: parsedData, error: parseError } = signInSchema.safeParse(data);

    if (parseError) throw new ServerActionError(parseError.issues[0].message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const supabase = await createClient();
    const { data: user, error: signInError } = await supabase.auth.signInWithPassword({ ...parsedData });

    if (signInError) throw new ServerActionError(signInError.message, { type: E_SERVER_ACTION_ERROR_TYPE.UI });
    else if (!user || !user.user) throw new ServerActionError();

    return { success: true, data: { user: user.user }, metadata: { redirectUrl: "/dashboard" } };
  } catch (err) {
    throw err;
  }
});
