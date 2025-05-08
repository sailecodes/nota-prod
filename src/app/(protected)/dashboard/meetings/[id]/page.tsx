import { Calendar, UserCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { parseDate } from "@/lib/utils";
import ActionItemSnippet from "./_components/action-item-snippet";

export default async function Meeting({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const meeting = await prisma.upload.findUnique({
    where: { id },
    include: {
      result: {
        include: {
          actionItems: {
            include: {
              assignee: true,
            },
          },
        },
      },
      uploader: true,
    },
  });

  if (!meeting) throw new Error("Something went wrong. Please refresh the page.");

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <span className="mb-2 inline-block text-2xl font-semibold">{meeting.title}</span>
        <span className="text-muted-foreground flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" /> {parseDate(meeting.createdAt)}
        </span>
        <span className="text-muted-foreground flex items-center gap-2 text-sm">
          <UserCircle2 className="h-4 w-4" />
          {meeting.uploader.firstName} {meeting.uploader.lastName.charAt(0)}
        </span>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto min-[1150px]:flex-row">
        <Card className="bg-background flex-5/10 min-[1450px]:flex-6/10">
          <CardContent>
            <Tabs
              defaultValue="summary"
              className="gap-5">
              <TabsList>
                <TabsTrigger
                  value="summary"
                  className="border-none hover:cursor-pointer">
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  value="transcript"
                  className="border-none hover:cursor-pointer">
                  Transcript
                </TabsTrigger>
              </TabsList>
              <TabsContent value="summary">
                <div className="flex flex-col gap-4">
                  <span className="text-lg font-semibold">Summary</span>
                  <span className="text-muted-foreground text-sm leading-6">{meeting.result!.summary}</span>
                </div>
              </TabsContent>
              <TabsContent value="transcript">
                <div className="flex flex-col gap-4">
                  <span className="text-lg font-semibold">Transcript</span>
                  <span className="text-muted-foreground text-sm leading-6">{meeting.result!.transcript}</span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="bg-background flex-5/10 min-[1450px]:flex-4/10">
          <CardHeader className="text-lg font-semibold">Action Items</CardHeader>
          <CardContent className="space-y-5">
            {meeting.result!.actionItems.map(({ id, action, dueDate, assignee, dueStatus }, ind) => (
              <div
                key={id}
                className="space-y-6">
                <ActionItemSnippet
                  id={id}
                  action={action}
                  dueDate={dueDate}
                  assignee={assignee}
                  dueStatus={dueStatus}
                />
                {ind < meeting.result!.actionItems.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
