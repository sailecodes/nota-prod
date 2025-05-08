"use server";

import { z } from "zod";
import { ServerActionError } from "@/lib/classes";
import { E_SERVER_ACTION_ERROR_TYPE } from "@/lib/enums";
import prisma from "@/lib/prisma";
import { emailAddressSchema, userInformationSchema } from "@/lib/schemas";
import { sbAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { TServerActionResult } from "@/lib/types";
import { createServerAction } from "@/lib/utils";

export const updateUserInformation = createServerAction(async function (
  data: z.infer<typeof userInformationSchema>,
): Promise<TServerActionResult<undefined, undefined>> {
  try {
    const supabase = await createClient();
    const {
      data: { user: sbUser },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError) throw new ServerActionError(getUserError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });
    else if (!sbUser) throw new ServerActionError("Unauthorized access", { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const { data: parsedData, error: parseError } = userInformationSchema.safeParse(data);

    if (parseError) throw new ServerActionError(parseError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const { error: updateUserError } = await supabase.auth.updateUser({
      data: { ...parsedData },
    });

    if (updateUserError) throw new ServerActionError(updateUserError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    await prisma.user.update({
      where: { sbId: sbUser.id },
      data: { ...parsedData },
    });

    return { success: true };
  } catch (err) {
    // TODO: Implement rollback
    throw err;
  }
});

export const changeEmailAddress = createServerAction(async function (
  data: z.infer<typeof emailAddressSchema>,
): Promise<TServerActionResult<undefined, undefined>> {
  try {
    const supabase = await createClient();
    const {
      data: { user: sbUser },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError) throw new ServerActionError(getUserError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });
    else if (!sbUser) throw new ServerActionError("Unauthorized access", { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const { data: parsedData, error: parseError } = emailAddressSchema.safeParse(data);

    if (parseError) throw new ServerActionError(parseError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const userWithEmail = await prisma.user.findFirst({
      where: { ...parsedData },
    });

    if (userWithEmail) throw new ServerActionError("Email already exists", { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const { error: updateUserError } = await supabase.auth.updateUser(
      { ...parsedData },
      { emailRedirectTo: `${process.env.LOCAL_URL}/dashboard/account` },
    );

    if (updateUserError) throw new ServerActionError(updateUserError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    await prisma.user.update({
      where: { sbId: sbUser.id },
      data: { ...parsedData },
    });

    return { success: true };
  } catch (err) {
    // TODO: Implement rollback
    throw err;
  }
});

export const sendPasswordResetLink = createServerAction(async function (): Promise<TServerActionResult<undefined, undefined>> {
  try {
    const supabase = await createClient();
    const {
      data: { user: sbUser },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError) throw new ServerActionError(getUserError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });
    else if (!sbUser) throw new ServerActionError("Unauthorized access", { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const { error: resetPasswordError } = await supabase.auth.resetPasswordForEmail(sbUser.email!, {
      redirectTo: `${process.env.LOCAL_URL}/reset-password`,
    });

    if (resetPasswordError) throw new ServerActionError(resetPasswordError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    return { success: true };
  } catch (err) {
    throw err;
  }
});

export const deleteAccount = createServerAction(async function (): Promise<TServerActionResult<undefined, undefined>> {
  try {
    const supabase = await createClient();
    const {
      data: { user: sbUser },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError) throw new ServerActionError(getUserError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });
    else if (!sbUser) throw new ServerActionError("Unauthorized access", { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    const { error: deleteUserError } = await sbAdmin.deleteUser(sbUser.id);

    if (deleteUserError) throw new ServerActionError(deleteUserError.message, { type: E_SERVER_ACTION_ERROR_TYPE.KNOWN });

    await prisma.user.delete({
      where: { sbId: sbUser.id },
    });

    return { success: true };
  } catch (err) {
    throw err;
  }
});
