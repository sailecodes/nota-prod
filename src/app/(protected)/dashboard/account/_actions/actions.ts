"use server";

import { z } from "zod";
import { ServerActionError } from "@/lib/classes";
import { SERVER_ACTION_ERROR_TYPE } from "@/lib/enums";
import prisma from "@/lib/prisma";
import { userInformationSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { createServerAction } from "@/lib/utils";

export const updateUserInformation = createServerAction(async function (data: z.infer<typeof userInformationSchema>) {
  try {
    const supabase = await createClient();
    const {
      data: { user: sbUser },
      error: sbClientError,
    } = await supabase.auth.getUser();

    if (sbClientError) throw new ServerActionError(sbClientError.message, { type: SERVER_ACTION_ERROR_TYPE.KNOWN });
    else if (!sbUser) throw new ServerActionError();

    const { data: parsedData, error: parseError } = userInformationSchema.safeParse(data);

    if (parseError) throw new ServerActionError(parseError.message, { type: SERVER_ACTION_ERROR_TYPE.KNOWN });

    const { error: updateUserError } = await supabase.auth.updateUser({
      data: { ...parsedData },
    });

    if (updateUserError) throw new ServerActionError(updateUserError.message, { type: SERVER_ACTION_ERROR_TYPE.KNOWN });

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
