import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ServerActionError } from "./classes";
import { SERVER_ACTION_ERROR_TYPE } from "./enums";
import { TServerActionFailure, TServerActionResult, TServerActionSuccess } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =======================================================================
// Server actions

export function createServerAction<TArgs extends any[], TReturn>(fn: (...args: TArgs) => Promise<TReturn>) {
  return async (...args: TArgs): Promise<TServerActionResult<TReturn>> => {
    try {
      const result = (await fn(...args)) as TServerActionSuccess<TReturn>;

      return result as TServerActionSuccess<TReturn, typeof result.metadata>;
    } catch (err) {
      console.error("[Server action verb.] ", err);

      let error = "Something went wrong. Please try again.";
      let type = SERVER_ACTION_ERROR_TYPE.UNKNOWN;

      if (err instanceof ServerActionError && err.metadata) {
        error = err.message;
        type = err.metadata.type;
      }

      console.error(`[Server action mod.] Type ${type}:`, error);

      return {
        success: false,
        error,
        type,
      } as TServerActionFailure;
    }
  };
}
