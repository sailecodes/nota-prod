import { Card } from "@/components/ui/card";
import SignInForm from "./_components/sign-in-form";

export default function SignIn() {
  return (
    <div className="flex h-screen flex-col items-center pt-15">
      <h1 className="mb-6 text-2xl font-bold tracking-tighter">Nota</h1>
      <h2 className="mb-4 text-3xl font-extrabold tracking-tighter">
        Welcome back!
      </h2>
      <Card className="bg-muted mx-auto h-[30rem] w-[30rem]">
        <SignInForm />
      </Card>
    </div>
  );
}
