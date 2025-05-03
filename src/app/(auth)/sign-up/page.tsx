import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import SignUpForm from "./_components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to register with Nota",
};

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-6 lg:p-8">
      <Link href="/" className="mb-6 text-2xl font-bold tracking-tighter">
        Nota
      </Link>
      <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tighter">Get started, for free.</h2>
      <Card className="bg-muted mx-auto mb-4 h-fit p-8 sm:w-[30rem]">
        <SignUpForm />
      </Card>
      <div className="text-sm">
        <span>Already have an account? </span>
        <Link href="/sign-in" className="hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
