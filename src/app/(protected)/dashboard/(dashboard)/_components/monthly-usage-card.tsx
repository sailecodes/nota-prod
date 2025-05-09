import { Gauge } from "lucide-react";
import { User } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MonthlyUsageCard({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <CardDescription className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            <span>Monthly usage</span>
          </CardDescription>
        </CardDescription>
        <CardTitle>
          <span className="text-4xl">
            {user.totalMonthlyUploads}
            <span className="text-muted-foreground text-xs"> / 5 uploads</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-muted-foreground text-sm">Keep an eye on your upload count</span>
      </CardContent>
      <CardFooter>
        <Button
          disabled
          variant="secondary"
          className="w-full">
          Tier upgrade coming soon
        </Button>
      </CardFooter>
    </Card>
  );
}
