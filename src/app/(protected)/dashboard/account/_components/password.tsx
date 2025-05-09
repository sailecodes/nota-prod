"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { sendPasswordResetLink } from '@/actions/account';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@supabase/supabase-js';

export default function Password({ user }: { user: User }) {
  const [isSending, setIsSending] = useState<boolean>(false);

  const handlePasswordReset = async () => {
    setIsSending(true);

    const result = await sendPasswordResetLink();

    if (!result.success) {
      if (result.error.includes("For security purposes"))
        toast.error("⌛ Database is overloaded.", { description: "Please try again after 1 minute." });
      else toast.error("🫠 Uh oh. Something went wrong.", { description: "Please try again or refresh the page." });
    } else {
      toast.info("🔒 Sent password reset link", {
        description: () => (
          <p>
            Please check <span className="underline">{user.email}</span> for the reset link.
          </p>
        ),
      });
    }

    setIsSending(false);
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
          className="w-[150px] hover:cursor-pointer">
          {isSending ? "Sending link..." : "Reset password"}
        </Button>
        <p className="text-muted-foreground text-xs">
          You&apos;ll receive a secure link to reset your password. Note that resetting your password will log you out of your account.
        </p>
      </CardContent>
    </Card>
  );
}
