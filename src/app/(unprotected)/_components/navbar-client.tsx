"use client";

import { Menu } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIsLG } from "@/hooks/use-is-lg";
import { INavbarClientProps } from "@/lib/interfaces";

export default function NavbarClient({ isAuthenticated }: INavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const isLG = useIsLG();

  const { scrollY } = useScroll();

  const backgroundColor = useTransform(scrollY, [0, 100], ["#f5f5f5", "#fff"]);
  const boxShadow = useTransform(scrollY, [0, 100], ["0 0 #0000", "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"]);
  const borderColor = useTransform(scrollY, [0, 100], ["transparent", "#e5e5e5"]);

  useEffect(() => {
    if (isMenuOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  useEffect(() => {
    if (isLG) setIsMenuOpen(false);
  }, [isLG]);

  return (
    <motion.nav
      style={{ backgroundColor, boxShadow, borderColor }}
      className="sticky top-0 z-50 mb-10 flex flex-row justify-between border px-4 py-6 shadow-sm md:px-6 lg:top-4 lg:mx-8 lg:rounded-xl"
    >
      <span className="text-3xl font-extrabold tracking-tighter">Nota</span>
      <button className="grid h-[2.5rem] place-items-center hover:cursor-pointer lg:hidden" onClick={() => setIsMenuOpen((prev) => !prev)}>
        <Menu className="size-7" />
      </button>
      <div className="max-lg:hidden">
        {isAuthenticated ? (
          <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
            Dashboard
          </Link>
        ) : (
          <div className="flex flex-row items-center gap-8">
            <Link href="/sign-in" className="text-sm font-medium">
              Sign in
            </Link>
            <Link href="/sign-up" className={buttonVariants({ size: "lg", className: "w-[106px]" })}>
              Register
            </Link>
          </div>
        )}
      </div>
      <div className={`absolute top-[100%] right-0 left-0 z-40 h-[calc(100vh-100%)] lg:hidden ${isMenuOpen ? "" : "hidden"}`}>
        <div className="bg-muted flex h-full flex-col pb-4">
          {isAuthenticated ? (
            <Link href="/dashboard" className="border-t-2">
              Dashboard
            </Link>
          ) : (
            <div className="flex flex-col">
              <Link href="/sign-in" className="border-t-muted-foreground border-t-2 px-6 py-4 text-xl font-medium">
                Sign in
              </Link>
              <Separator />
              <Link href="/sign-up" className="px-6 py-4 text-xl font-medium">
                Register
              </Link>
              <Separator />
            </div>
          )}
          <aside className="text-muted-foreground mx-6 mt-auto space-y-1 text-center text-xs">
            <p>© 2025 Elias IV Roman. All rights reserved.</p>
            <p>
              Design inspired by{" "}
              <a href="https://cal.com" className="hover:underline">
                Cal.com
              </a>
              .
            </p>
          </aside>
        </div>
      </div>
    </motion.nav>
  );
}
