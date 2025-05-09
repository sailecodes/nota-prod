import { ListTodo } from "lucide-react";
import { DueStatus, Prisma } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ActionItemsCard({ user }: { user: Prisma.UserGetPayload<{ include: { actionItems: true } }> }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <ListTodo className="h-5 w-5" />
          <span>Action items</span>
        </CardDescription>
        <CardTitle>
          <span className="text-4xl">
            {user.actionItems.filter((actionItem) => actionItem.dueStatus !== DueStatus.COMPLETED).length}
            <span className="text-muted-foreground text-xs"> due soon</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-muted-foreground text-sm">Tasks from recent meetings need attention</span>
      </CardContent>
      <CardFooter>
        <Button
          disabled
          variant="secondary"
          className="w-full">
          Actions page coming soon
        </Button>
      </CardFooter>
    </Card>
  );
}
