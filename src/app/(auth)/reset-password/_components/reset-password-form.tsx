"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { resetPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { passwordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "../../../../components/password-input";

export default function ResetPasswordForm() {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);

    const result = await resetPassword(data);

    if (!result.success) toast.error("Uh oh. Something went wrong.", { description: "Please try again or refresh the page." });

    setIsLoading(false);
    router.push("/sign-in");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  className="bg-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full hover:cursor-pointer">
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
