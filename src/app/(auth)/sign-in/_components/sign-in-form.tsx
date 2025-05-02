"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SERVER_ACTION_ERROR_TYPE } from "@/lib/enums";
import { signInSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "../../../../components/password-input";
import { signIn } from "../_actions/sign-in";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSigningIn(true);

    const result = await signIn(data);

    if (!result.success && result.type === SERVER_ACTION_ERROR_TYPE.UI) {
      if (result.error.includes("credentials")) setError("Invalid email or password");
      else if (result.error.includes("confirmed")) toast.info("Please confirm your email before signing in.");
    } else {
      router.push(result.redirectUrl!);
    }

    setIsSigningIn(false);
  };

  return (
    <Form {...form}>
      {error && <span className="text-destructive text-sm">{error}</span>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" disabled={isSigningIn} className="w-full hover:cursor-pointer">
          {isSigningIn ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
