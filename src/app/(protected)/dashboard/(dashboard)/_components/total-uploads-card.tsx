import { Check } from "lucide-react";
import Link from "next/link";
import { Prisma } from "@/app/generated/prisma";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TotalUploadsCard({ user }: { user: Prisma.UserGetPayload<{ include: { uploads: true } }> }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <Check className="h-5 w-5" />
          <span>Total uploads</span>
        </CardDescription>
        <CardTitle>
          <span className="text-4xl">
            {user.uploads.length}
            <span className="text-muted-foreground text-xs"> completed</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-muted-foreground text-sm">View latest uploads in Meetings page</span>
      </CardContent>
      <CardFooter>
        <Link
          href="/dashboard/meetings"
          className={buttonVariants({ variant: "secondary", className: "w-full" })}>
          Read summaries
        </Link>
      </CardFooter>
    </Card>
  );
}
