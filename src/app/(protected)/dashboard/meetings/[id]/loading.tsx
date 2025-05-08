import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function MeetingLoading() {
  return (
    <section className="space-y-10">
      <div className="space-y-1">
        <Skeleton className="bg-background mb-2 h-[32px] w-[250px]" />
        <Skeleton className="bg-background h-[20px] w-[110px]" />
        <Skeleton className="bg-background h-[20px] w-[110px]" />
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto min-[1150px]:flex-row">
        <Card className="bg-background flex-5/10 min-[1450px]:flex-6/10">
          <CardContent className="space-y-5">
            <Skeleton className="h-[36px] w-[163px]" />
            <Skeleton className="h-[28px] w-[85px]" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[20px] w-full" />
              <Skeleton className="h-[20px] w-[80%]" />
              <Skeleton className="h-[20px] w-[95%]" />
              <Skeleton className="h-[20px] w-full" />
              <Skeleton className="h-[20px] w-full" />
              <Skeleton className="h-[20px] w-[88%]" />
              <Skeleton className="h-[20px] w-full" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background flex-5/10 min-[1450px]:flex-4/10">
          <CardHeader>
            <Skeleton className="h-[24px] w-[105px]" />
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <Skeleton className="h-[24px] w-[100px]" />
              <Skeleton className="size-[24px] self-start justify-self-end" />
              <div className="space-y-1">
                <Skeleton className="h-[20px] w-[115px]" />
                <Skeleton className="h-[20px] w-[115px]" />
              </div>
              <Skeleton className="h-[36px] w-[165px] max-[475px]:col-start-1 max-[475px]:row-start-3 min-[475px]:self-end min-[475px]:justify-self-end" />
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <Skeleton className="h-[24px] w-[100px]" />
              <Skeleton className="size-[24px] self-start justify-self-end" />
              <div className="space-y-1">
                <Skeleton className="h-[20px] w-[115px]" />
                <Skeleton className="h-[20px] w-[115px]" />
              </div>
              <Skeleton className="h-[36px] w-[165px] max-[475px]:col-start-1 max-[475px]:row-start-3 min-[475px]:self-end min-[475px]:justify-self-end" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
