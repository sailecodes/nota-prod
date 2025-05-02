import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ServerActionError } from "./classes";
import { SERVER_ACTION_ERROR_TYPE } from "./enums";
import { TServerActionResult } from "./types";

// =======================================================================
// Tailwind CSS

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =======================================================================
// Server Actions

/*
__ USAGE:

export const serverAction = createServerAction<[string, string, number], number>(
  async function (a: string, b: string, c: number): Promise<number> {
    try { ... return 1; }
    catch (err) { ... return -1; }
  });
*/
export function createServerAction<TArgs extends any[], TReturn extends TServerActionResult<any, any>>(
  fn: (...args: TArgs) => Promise<TReturn>,
) {
  return async (...args: TArgs): Promise<TReturn> => {
    try {
      const result = await fn(...args);

      return result;
    } catch (err) {
      console.error("[Server action -- verbatim] ", err);

      let error = "Something went wrong. Please try again.";
      let type = SERVER_ACTION_ERROR_TYPE.UNKNOWN;

      if (err instanceof ServerActionError && err.metadata) {
        error = err.message;
        type = err.metadata.type;
      }

      console.error(`[Server action -- simplified] Type ${type}:`, error);

      return {
        success: false,
        error,
        type,
      } as TReturn;
    }
  };
}
