"use server";

import { z } from "zod";
import { ServerActionError } from "@/lib/classes";
import { SERVER_ACTION_ERROR_TYPE } from "@/lib/enums";
import prisma from "@/lib/prisma";
import { signUpSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { TServerActionResult } from "@/lib/types";
import { createServerAction } from "@/lib/utils";

export const signUp = createServerAction(async function (
  data: z.infer<typeof signUpSchema>,
): Promise<TServerActionResult<undefined, { email: string }>> {
  try {
    const { data: parsedData, error: parseError } = signUpSchema.safeParse(data);

    if (parseError) throw new ServerActionError(parseError.issues[0].message, { type: SERVER_ACTION_ERROR_TYPE.KNOWN });

    const userWithExistingField = await prisma.user.findFirst({
      where: { OR: [{ email: parsedData.email }, { username: parsedData.username }] },
    });

    if (userWithExistingField) throw new ServerActionError("Email or username already exists", { type: SERVER_ACTION_ERROR_TYPE.UI });

    const supabase = await createClient();
    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email: parsedData.email,
      password: parsedData.password,
      options: { data: { ...parsedData }, emailRedirectTo: `${process.env.LOCAL_URL}/sign-in` },
    });

    if (signUpError) throw new ServerActionError(signUpError.message, { type: SERVER_ACTION_ERROR_TYPE.KNOWN });
    else if (!user || !user.user) throw new ServerActionError();

    await prisma.user.create({
      data: {
        sbId: user.user.id,
        email: parsedData.email,
        username: parsedData.username,
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
      },
    });

    return { success: true, metadata: { email: parsedData.email } };
  } catch (err) {
    // TODO: Implement rollback
    throw err;
  }
});
