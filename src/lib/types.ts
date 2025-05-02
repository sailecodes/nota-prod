import { z } from "zod";
import { SERVER_ACTION_ERROR_TYPE } from "./enums";
import { signInSchema, signUpSchema } from "./schemas";

// =======================================================================
// Commons

// =======================================================================
// Server actions

export type TSignIn = z.infer<typeof signInSchema>;

export type TSignUp = z.infer<typeof signUpSchema>;

export type TServerActionSuccess<TData = undefined, TMetadata = undefined> = {
  success: true;
  data?: TData;
  metadata?: TMetadata & { redirectUrl?: string };
};

export type TServerActionFailure<TMetadata = undefined> = {
  success: false;
  error: string;
  type: SERVER_ACTION_ERROR_TYPE;
  metadata?: TMetadata & { redirectUrl?: string };
};

export type TServerActionResult<TData = undefined, TMetadata = undefined> =
  | TServerActionSuccess<TData, TMetadata>
  | TServerActionFailure<TMetadata>;

export type TServerActionErrorMetadata<TMetadata = undefined> = {
  type: SERVER_ACTION_ERROR_TYPE;
  origin?: string;
  metadata?: TMetadata;
};
