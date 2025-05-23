import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DueStatus, ProcessStatus } from "@/app/generated/prisma";
import { ServerActionError } from "./classes";
import { E_SERVER_ACTION_ERROR_TYPE } from "./enums";
import { TServerActionResult } from "./types";

// =======================================================================
// Tailwind CSS

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =======================================================================
// General

export function parseStatus(status: DueStatus | ProcessStatus) {
  if (status === "TBD") return status;

  return status
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function parseDate(date: Date | null) {
  return date ? date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "TBD";
}

// =======================================================================
// Meetings

export function getMeetingStatusBadgeColor(status: ProcessStatus) {
  if (status === ProcessStatus.TRANSCRIBING) return "bg-violet-100 text-violet-800";
  else if (status === ProcessStatus.SUMMARIZING) return "bg-blue-100 text-blue-800";
  else if (status === ProcessStatus.COMPLETED) return "bg-green-100 text-green-800";
  else if (status === ProcessStatus.FAILED) return "bg-red-100 text-red-800";
  else return "bg-gray-100 text-gray-800";
}

export function getMeetingSkeletonColor(status: ProcessStatus) {
  if (status === ProcessStatus.TRANSCRIBING) return "bg-violet-200/50";
  else if (status === ProcessStatus.SUMMARIZING) return "bg-blue-200/50";
  else return "bg-gray-200/50";
}

// =======================================================================
// Action Items

export function getActionItemStatusBadgeColor(status: DueStatus) {
  if (status === "NEW") return "text-teal-800 bg-teal-100";
  else if (status === "UPCOMING") return "text-violet-800 bg-violet-100";
  else if (status === "DUE_SOON") return "text-orange-800 bg-orange-100";
  else if (status === "COMPLETED") return "text-green-800 bg-green-100";
  else if (status === "OVERDUE") return "text-red-800 bg-red-100";
  else if (status === "TBD") return "text-stone-800 bg-stone-100";
  else return "text-gray-800 bg-gray-100";
}

// =======================================================================
// Server Actions

/*
_________
__USAGE__

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
      console.error("[Server Action Error -- Verbatim] ", err);

      let error = "Something went wrong. Please try again.";
      let type = E_SERVER_ACTION_ERROR_TYPE.UNKNOWN;

      if (err instanceof ServerActionError && err.metadata) {
        error = err.message;
        type = err.metadata.type;
      }

      console.error(`[Server Action Error -- Simplified] Type ${type}:`, error);

      return {
        success: false,
        error,
        type,
      } as TReturn;
    }
  };
}
