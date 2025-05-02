"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function PasswordInput({ className, type, ...props }: React.ComponentProps<"input">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input type={isPasswordVisible ? "text" : "password"} className={cn("pr-10", className)} {...props} />
      <button
        type="button"
        className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 hover:cursor-pointer"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
      >
        {isPasswordVisible ? <EyeClosed /> : <Eye />}
      </button>
    </div>
  );
}

export { PasswordInput };
