"use client";

import { CalendarClock, UserCheck2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateDueStatus } from "@/actions/action-items";
import { DueStatus } from "@/app/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActionItemSnippetProps } from "@/lib/interfaces";
import { getActionItemStatusBadgeColor, parseDate, parseStatus } from "@/lib/utils";

export default function ActionItemSnippet({ id, action, dueDate, assignee, dueStatus }: ActionItemSnippetProps) {
  const [status, setStatus] = useState<DueStatus>(dueStatus);
  const [isUpdatingDueStatus, setIsUpdatingDueStatus] = useState<boolean>(false);

  const handleUpdateDueStatus = async () => {
    setIsUpdatingDueStatus(true);

    const res = await updateDueStatus(id);

    if (res) toast.error("Something went wrong. Please try again");
    else {
      if (status !== "COMPLETED") setStatus("COMPLETED");
      else setStatus(dueStatus);
    }

    setIsUpdatingDueStatus(false);
  };

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      <span className="line-clamp-3 font-semibold">{action}</span>
      <Badge className={`self-start justify-self-end ${getActionItemStatusBadgeColor(status)}`}>{parseStatus(status)}</Badge>
      <div className="space-y-1">
        <span className="text-muted-foreground flex items-center gap-2 text-sm">
          <CalendarClock className="h-4 w-4" /> {parseDate(dueDate)}
        </span>
        <span className="text-muted-foreground flex items-center gap-2 text-sm">
          <UserCheck2Icon className="h-4 w-4" />
          {assignee ? `${assignee.firstName} ${assignee.lastName.charAt(0)}` : "None"}
        </span>
      </div>
      <Button
        className="w-[165px] hover:cursor-pointer max-[475px]:col-start-1 max-[475px]:row-start-3 min-[475px]:self-end min-[475px]:justify-self-end"
        variant="secondary"
        disabled={isUpdatingDueStatus}
        onClick={handleUpdateDueStatus}>
        {isUpdatingDueStatus ? "Marking..." : status === "COMPLETED" ? "Unmark as complete" : "Mark as complete"}
      </Button>
    </div>
  );
}
