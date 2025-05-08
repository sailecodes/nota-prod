"use client";

import { toast } from "sonner";
import { sendPasswordResetLink } from "@/actions/account";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";

export default function Password({ user }: { user: User }) {
  const handlePasswordReset = async () => {
    const result = await sendPasswordResetLink();

    if (!result.success) {
      if (result.error.includes("For security purposes"))
        toast.error("Database is overloaded.", { description: "Please try again after 1 minute." });
      else toast.error("🫠 Uh oh. Something went wrong.", { description: "Please try again or refresh the page." });
    } else {
      toast.success("🔒 Sent password reset link!", {
        description: () => (
          <p>
            Please check <span className="underline">{user.email}</span>.
          </p>
        ),
        duration: 4000,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          variant="secondary"
          onClick={handlePasswordReset}
          className="w-[158px] hover:cursor-pointer">
          Reset password
        </Button>
        <p className="text-muted-foreground text-xs">
          You&apos;ll receive a secure link to reset your password. Note that resetting your password will log you out of your account.
        </p>
      </CardContent>
    </Card>
  );
}
