"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "../../../../components/password-input";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formEmail = form.watch(["email"]);

  const router = useRouter();

  const [error, setError] = useState<string | undefined>(undefined);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const handleSignIn = async (data: z.infer<typeof signInSchema>) => {
    setIsSigningIn(true);

    const result = await signIn(data);

    if (!result.success) {
      if (result.error.includes("credentials")) setError("Invalid email or password");
      else if (result.error.includes("confirmed"))
        toast.info("❌ Email not verified", {
          description: () => (
            <p>
              Please check <span className="underline">{formEmail}</span> for the confirmation link.
            </p>
          ),
        });
      else toast.error("🫠 Uh oh. Something went wrong.", { description: "Please try again or refresh the page." });

      setIsSigningIn(false);
    } else {
      toast.success(`Welcome ${result.data!.user.user_metadata.firstName}! 👋🏻`);
      router.push(result.metadata!.redirectUrl);
    }
  };

  return (
    <Form {...form}>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <form
        onSubmit={form.handleSubmit(handleSignIn)}
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
          disabled={isSigningIn}
          className="w-full hover:cursor-pointer">
          {isSigningIn ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
