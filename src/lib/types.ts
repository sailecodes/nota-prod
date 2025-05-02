import { redirect } from "next/navigation";
import { z } from "zod";
import { SERVER_ACTION_ERROR_TYPE } from "./enums";
import { signInSchema, signUpSchema } from "./schemas";

// =======================================================================
// Commons

export type TMetadata = Record<string, any>;

export type TRedirectUrl = string;

// =======================================================================
// Server actions

export type TSignIn = z.infer<typeof signInSchema>;

export type TSignUp = z.infer<typeof signUpSchema>;

export type TServerActionSuccess<T, TMetadata> = {
  success: true;
  data: T;
  metadata?: TMetadata | Record<string, any>;
  redirectUrl?: TRedirectUrl;
} & TRedirectUrl;

export type TServerActionFailure = {
  success: false;
  error: string;
  type: SERVER_ACTION_ERROR_TYPE;
} & TMetadata<undefined> &
  TRedirectUrl;

export type TServerActionResult<T, M = undefined> = TServerActionSuccess<T, M> | TServerActionFailure;

export type TServerActionErrorMetadata = {
  type: SERVER_ACTION_ERROR_TYPE;
  origin?: string;
} & TMetadata<undefined>;
