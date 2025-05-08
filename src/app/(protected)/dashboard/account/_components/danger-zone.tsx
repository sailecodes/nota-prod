"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteAccount } from "@/actions/account";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DangerZone() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    const result = await deleteAccount();

    if (!result.success) {
      toast.error("🫠 Uh oh. Something went wrong.", { description: "Please try again or refresh the page." });
      setIsDeleting(false);
    } else {
      router.push("/");
    }
  };

  return (
    <Card className="border-red-400">
      <CardHeader>
        <CardTitle className="text-red-400">Danger Zone</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <span className="text-muted-foreground text-sm">Permanently delete your account and all associated data.</span>
        <AlertDialog open={isDeleting}>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-[150px] hover:cursor-pointer">
              Delete account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. To reiterate, this will permanently delete your account and remove your data from our
                databases.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="hover:cursor-pointer"
                disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="hover:cursor-pointer"
                onClick={handleDeleteAccount}
                disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Continue"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
