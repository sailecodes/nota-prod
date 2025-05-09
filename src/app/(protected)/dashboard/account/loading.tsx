import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountLoading() {
  return (
    <div className="space-y-3">
      {/* User Information */}
      <Card>
        <CardHeader>
          <Skeleton className="h-[20px] w-[140px]" />
        </CardHeader>
        <CardContent>
          <div className="xs:flex-row flex flex-col gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-[15px] w-[70px]" />
              <Skeleton className="h-[35px] w-full" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-[15px] w-[70px]" />
              <Skeleton className="h-[35px] w-full" />
            </div>
            <Skeleton className="xs:self-end h-[35px] w-[130px]" />
          </div>
        </CardContent>
      </Card>
      {/* Email Address */}
      <Card>
        <CardHeader>
          <Skeleton className="h-[20px] w-[140px]" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="xs:flex-row flex flex-col gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-[15px] w-[70px]" />
              <Skeleton className="h-[35px] w-full" />
            </div>
            <Skeleton className="xs:self-end h-[35px] w-[130px]" />
          </div>
          <Skeleton className="h-[10px] w-[200px]" />
        </CardContent>
      </Card>
      {/* Password */}
      <Card>
        <CardHeader>
          <Skeleton className="h-[20px] w-[140px]" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-[35px] w-[130px]" />
          <Skeleton className="h-[10px] w-[200px]" />
        </CardContent>
      </Card>
      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <Skeleton className="h-[20px] w-[140px]" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-[15px] w-[200px]" />
          <Skeleton className="h-[35px] w-[130px]" />
        </CardContent>
      </Card>
    </div>
  );
}
