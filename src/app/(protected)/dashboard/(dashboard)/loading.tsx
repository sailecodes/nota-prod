import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(0,375px))] justify-center gap-3">
      {Array.from([1, 2, 3]).map((ind) => (
        <Card key={ind}>
          <CardHeader>
            <CardDescription>
              <Skeleton className="h-[20px] w-[120px]" />
            </CardDescription>
            <CardTitle>
              <Skeleton className="h-[40px] w-[85px]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[25px] w-[200px]" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-[35px] w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
