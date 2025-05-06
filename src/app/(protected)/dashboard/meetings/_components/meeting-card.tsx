import { Calendar, CircleAlert, ListTodo } from "lucide-react";
import Link from "next/link";
import { ProcessStatus } from "@/app/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IMeetingCardProps } from "@/lib/interfaces";
import { getMeetingSkeletonColor, getMeetingStatusBadgeColor, parseDate, parseStatus } from "@/lib/utils";

// export default function MeetingCard({ title, processStatus, uploader, createdAt, summary, actionItemsNum, meetingId }: IMeetingCardProps) {
export default function MeetingCard({ title, processStatus, createdAt, meetingId }: IMeetingCardProps) {
  const summary =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ab blanditiis optio, itaque mollitia, facilis cumque, necessitatibus beatae expedita voluptas quasi nisi dolorem officiis? Nulla ab autem quia minus repellat.";
  const numActionItems = 1;
  return (
    <Card className="justify-between">
      <CardHeader>
        <div className="flex items-center justify-between gap-6">
          <CardTitle className="line-clamp-2 leading-5">{title}</CardTitle>
          <Badge className={getMeetingStatusBadgeColor(processStatus)}>{parseStatus(processStatus)}</Badge>
        </div>
        <CardDescription>Uploaded by Elias R.</CardDescription>
        {/* <CardDescription>Uploaded by {uploader}</CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span>{parseDate(createdAt)}</span>
        </div>
        {processStatus === ProcessStatus.COMPLETED ? (
          <>
            <p className="text-muted-foreground line-clamp-2 text-sm">{summary}</p>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <ListTodo className="h-4 w-4" />
              <Link
                href="/dashboard/action-items"
                className="hover:underline">
                {numActionItems} {numActionItems !== 1 ? " action items" : " action item"}
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-1">
              <Skeleton className={`h-[20px] w-full ${getMeetingSkeletonColor(processStatus)}`} />
              <Skeleton className={`h-[20px] w-[80%] ${getMeetingSkeletonColor(processStatus)}`} />
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <ListTodo className="h-4 w-4" />
              <Skeleton className={`h-[20px] w-[125px] ${getMeetingSkeletonColor(processStatus)}`} />
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        {processStatus === ProcessStatus.COMPLETED ? (
          <Link
            href={`/dashboard/meetings/${meetingId}`}
            className={buttonVariants({ variant: "secondary", className: "w-full" })}>
            View details
          </Link>
        ) : processStatus === ProcessStatus.FAILED ? (
          <div className="flex items-center gap-2 text-sm font-medium text-red-400">
            <CircleAlert className="size-4 stroke-red-400" /> Please retry uploading the file.
          </div>
        ) : (
          <Button
            disabled
            variant="secondary"
            className="w-full">
            View details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
