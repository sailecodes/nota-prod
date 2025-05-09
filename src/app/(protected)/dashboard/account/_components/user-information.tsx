"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateUserInformation } from "@/actions/account";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userInformationSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";

export default function ProfileInformation({ user }: { user: User }) {
  const { firstName, lastName } = user.user_metadata;

  const form = useForm<z.infer<typeof userInformationSchema>>({
    resolver: zodResolver(userInformationSchema),
    defaultValues: {
      firstName,
      lastName,
    },
  });
  const formVals = form.watch();

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleInformationUpdate = async (data: z.infer<typeof userInformationSchema>) => {
    setIsUpdating(true);

    const result = await updateUserInformation(data);

    if (!result.success) toast.error("🫠 Uh oh. Something went wrong", { description: "Please try again or refresh the page." });
    else toast.success("🫡 Updated user information", { description: "See changes in the Account page." });

    setIsUpdating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleInformationUpdate)}
            className="xs:flex-row flex flex-col gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-muted text-sm"
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
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-muted text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={isUpdating || (formVals.firstName === firstName && formVals.lastName === lastName)}
              className="xs:ml-auto xs:self-end w-[130px]">
              {isUpdating ? "Submitting..." : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
