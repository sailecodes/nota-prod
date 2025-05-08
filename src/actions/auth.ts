"use server";

import { z } from "zod";
import { ServerActionError } from "@/lib/classes";
import { E_SERVER_ACTION_ERROR_TYPE } from "@/lib/enums";
import prisma from "@/lib/prisma";
import { passwordSchema, signInSchema, signUpSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { TServerActionResult } from "@/lib/types";
import { createServerAction } from "@/lib/utils";
import { User as SbUser } from "@supabase/supabase-js";

export const signUp = createServerAction(async function (
  data: z.infer<typeof signUpSchema>,
): Promise<TServerActionResult<undefined, { email: string }>> {
  try {
    const { data: parsedData, error: parseError } = signUpSchema.safeParse(data);

    if (parseError) throw new ServerActionError(parseError.issues[0].message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const userWithExistingField = await prisma.user.findFirst({
      where: { OR: [{ email: parsedData.email }, { username: parsedData.username }] },
    });

    if (userWithExistingField) throw new ServerActionError("Email or username already exists", { type: E_SERVER_ACTION_ERROR_TYPE.UI });

    const supabase = await createClient();
    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email: parsedData.email,
      password: parsedData.password,
      options: { data: { ...parsedData }, emailRedirectTo: `${process.env.LOCAL_URL}/sign-in` },
    });

    if (signUpError) throw new ServerActionError(signUpError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });
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

export const resetPassword = createServerAction(async function (
  data: z.infer<typeof passwordSchema>,
): Promise<TServerActionResult<undefined, undefined>> {
  try {
    const supabase = await createClient();
    const {
      data: { user: sbUser },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError) throw new ServerActionError(getUserError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });
    else if (!sbUser) throw new ServerActionError("Unauthorized access", { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const { data: parsedData, error: parsedError } = passwordSchema.safeParse(data);

    if (parsedError) throw new ServerActionError(parsedError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const { error: updateUserError } = await supabase.auth.updateUser({
      ...parsedData,
    });

    if (updateUserError) throw new ServerActionError(updateUserError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) throw new ServerActionError(signOutError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    return { success: true };
  } catch (err) {
    throw err;
  }
});
