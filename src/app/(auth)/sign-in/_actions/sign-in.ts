"use server";

import { z } from "zod";
import { ServerActionError } from "@/lib/classes";
import { SERVER_ACTION_ERROR_TYPE } from "@/lib/enums";
import { signInSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { TServerActionResult } from "@/lib/types";
import { createServerAction } from "@/lib/utils";

export const signIn = createServerAction(async function (data: z.infer<typeof signInSchema>): Promise<TServerActionResult<null>> {
  try {
    const { data: parsedData, error: parseError } = signInSchema.safeParse(data);

    if (parseError) throw new ServerActionError(parseError.issues[0].message, { type: SERVER_ACTION_ERROR_TYPE.KNOWN });

    const supabase = await createClient();
    const { data: user, error: sbError } = await supabase.auth.signInWithPassword({ ...parsedData });

    if (sbError) throw new ServerActionError(sbError.message, { type: SERVER_ACTION_ERROR_TYPE.UI });
    else if (!user || !user.user) throw new ServerActionError();

    return { success: true, data: null, redirectUrl: "/dashboard" };
  } catch (err) {
    throw err;
  }
});
