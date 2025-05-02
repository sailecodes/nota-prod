import { z } from "zod";
import { SERVER_ACTION_ERROR_TYPE } from "./enums";
import { signInSchema, signUpSchema } from "./schemas";

export type TSignIn = z.infer<typeof signInSchema>;

export type TSignUp = z.infer<typeof signUpSchema>;

// =======================================================================
// Server actions

export type TServerActionSuccess<T> = {
  success: true;
  data: T;
  redirectUrl?: string;
};

export type TServerActionFailure = {
  success: false;
  error: string;
  type: SERVER_ACTION_ERROR_TYPE;
  redirectUrl?: string;
};

export type TServerActionResult<T> = TServerActionSuccess<T> | TServerActionFailure;

export type TServerActionErrorMetadata = {
  type: SERVER_ACTION_ERROR_TYPE;
  origin?: string;
  metadata?: Record<string, any>;
};
