import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import ResetPasswordForm from "./_components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset the password of your Nota account",
};

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Link
        href="/"
        className="mb-6 text-2xl font-bold tracking-tighter">
        Nota
      </Link>
      <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tighter">Reset your password.</h2>
      <Card className="bg-muted mx-auto mb-4 h-fit px-6 py-8 sm:w-[30rem]">
        <ResetPasswordForm />
      </Card>
    </div>
  );
}
