import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MeetingsLoading() {
  return (
    <section className="mx-auto max-w-7xl space-y-[25px] p-6">
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(0,375px))] justify-center gap-3">
        {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((ind) => (
          <Card
            key={ind}
            className="justify-between">
            <CardHeader>
              <div className="flex items-center justify-between gap-6">
                <Skeleton className="h-[25px] w-[100px]" />
                <Skeleton className="size-[24px]" />
              </div>
              <CardDescription>
                <Skeleton className="h-[20px] w-[140px]" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-[20px] w-[125px]" />
              <div className="space-y-1">
                <Skeleton className="h-[20px] w-full" />
                <Skeleton className="h-[20px] w-[80%]" />
              </div>
              <Skeleton className="h-[20px] w-[125px]" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-[36px] w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
