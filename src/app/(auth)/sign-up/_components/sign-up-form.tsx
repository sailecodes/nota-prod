"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signUp } from "@/actions/auth";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { E_SERVER_ACTION_ERROR_TYPE } from "@/lib/enums";
import { signUpSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
    },
  });

  const [error, setError] = useState<string | undefined>(undefined);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

  const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    setIsSigningUp(true);

    const result = await signUp(data);

    if (!result.success) {
      if (result.error.includes("exists")) setError(result.error);
      else toast.error("🫠 Uh oh. Something went wrong.", { description: "Please try again or refresh the page." });
    } else {
      toast.info(`✉️ Sent email verification`, {
        description: () => (
          <p>
            Please check <span className="underline">{result.metadata!.email}</span> for the confirmation link.
          </p>
        ),
      });
    }

    setIsSigningUp(false);
  };

  return (
    <Form {...form}>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <form
        onSubmit={form.handleSubmit(handleSignUp)}
        className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  className="bg-background text-sm"
                  onInput={() => setError(undefined)}
                />
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
                <PasswordInput
                  {...field}
                  autoComplete="new-password"
                  className="bg-background text-sm"
                  onInput={() => setError(undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="username"
                  className="bg-background text-sm"
                  onInput={() => setError(undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="given-name"
                  className="bg-background text-sm"
                  onInput={() => setError(undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="family-name"
                  className="bg-background text-sm"
                  onInput={() => setError(undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={isSigningUp}
          className="w-full hover:cursor-pointer">
          {isSigningUp ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </Form>
  );
}
