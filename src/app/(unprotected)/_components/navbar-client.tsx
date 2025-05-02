"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { INavbarClientProps } from "@/lib/interfaces";

export default function NavbarClient({ isAuthenticated }: INavbarClientProps) {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(scrollY, [0, 100], ["#f5f5f5", "#fff"]);
  const boxShadow = useTransform(scrollY, [0, 100], ["0 0 #0000", "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"]);

  return (
    <motion.nav
      style={{ backgroundColor, boxShadow }}
      className="sticky top-4 mb-10 flex flex-row justify-between rounded-xl px-6 py-6 shadow-sm"
    >
      <span className="text-3xl font-extrabold tracking-tighter">Nota</span>
      <div>
        {isAuthenticated ? (
          <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
            Dashboard
          </Link>
        ) : (
          <div className="flex flex-row gap-2">
            <Link href="/sign-in" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Sign in
            </Link>
            <Link href="/sign-up" className={buttonVariants({ size: "lg" })}>
              Register
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
