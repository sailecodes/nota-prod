import { Calendar, ListTodo } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IMeetingCardSkeletonProps } from "@/lib/interfaces";
import { cn, getMeetingSkeletonColor, getMeetingStatusBadgeColor, parseStatus } from "@/lib/utils";

export default function MeetingCardSkeleton({ title, processStatus, uploader, createdAt, className }: IMeetingCardSkeletonProps) {
  return (
    <Card className={cn("h-[350px] w-full justify-between", className)}>
      <CardHeader>
        <div className="xs:flex-row xs:items-center xs:gap-6 flex flex-col justify-between gap-2">
          <CardTitle className="xs:order-first order-last line-clamp-2 leading-5">{title}</CardTitle>
          <Badge className={cn(getMeetingStatusBadgeColor(processStatus), "xs:order-last order-first")}>{parseStatus(processStatus)}</Badge>
        </div>
        <CardDescription>Uploaded by {uploader}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          <span>
            {createdAt.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="mb-3 space-y-2">
          <Skeleton className={`h-[18px] w-full ${getMeetingSkeletonColor(processStatus)}`} />
          <Skeleton className={`h-[18px] w-full ${getMeetingSkeletonColor(processStatus)}`} />
        </div>
        <div className="text-muted-foreground flex items-center gap-2">
          <ListTodo className="h-4 w-4" />
          <Skeleton className={`h-[18px] w-[100px] ${getMeetingSkeletonColor(processStatus)}`} />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled
          variant="secondary"
          className="w-full">
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
