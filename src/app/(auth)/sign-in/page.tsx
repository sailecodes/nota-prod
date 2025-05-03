import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import SignInForm from "./_components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Nota account",
};

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-6 lg:p-8">
      <Link href="/" className="mb-6 text-2xl font-bold tracking-tighter">
        Nota
      </Link>
      <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tighter">Access your dashboard.</h2>
      <Card className="bg-muted mx-auto mb-4 h-fit p-8 sm:w-[30rem]">
        <SignInForm />
      </Card>
      <div className="text-sm">
        <span>Don&apos;t have an account? </span>
        <Link href="/sign-up" className="hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
