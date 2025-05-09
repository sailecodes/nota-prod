"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { changeEmailAddress } from "@/actions/account";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailAddressSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";

export default function EmailAddress({ user }: { user: User }) {
  const form = useForm<z.infer<typeof emailAddressSchema>>({
    resolver: zodResolver(emailAddressSchema),
    defaultValues: {
      email: user.email,
    },
  });
  const formVals = form.watch();

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleEmailChange = async (data: z.infer<typeof emailAddressSchema>) => {
    setIsUpdating(true);

    const result = await changeEmailAddress(data);

    if (!result.success) {
      if (result.error.includes("exists")) setError(result.error);
      else toast.error("🫠 Uh oh. Something went wrong.", { description: "Please try again or refresh the page." });
    } else {
      toast.info("✉️ Sent email verification", {
        description: () => (
          <p>
            Please check <span className="underline">{formVals.email}</span> for the confirmation link.
          </p>
        ),
      });
    }

    setIsUpdating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEmailChange)}
            className="xs:flex-row flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Primary</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-muted text-sm"
                    />
                  </FormControl>
                  <FormMessage>{error}</FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={isUpdating || formVals.email === user.email}
              className="xs:ml-auto xs:self-end w-[130px]">
              {isUpdating ? "Changing..." : "Change"}
            </Button>
          </form>
        </Form>
        <p className="text-muted-foreground text-xs">
          You'll receive a verification email to confirm before any permanent change is shown.
        </p>
      </CardContent>
    </Card>
  );
}
