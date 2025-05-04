"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { INavbarClientProps } from "@/lib/interfaces";

export default function NavbarClient({ isAuthenticated }: INavbarClientProps) {
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(scrollY, [0, 100], ["#f5f5f5", "#fff"]);
  const boxShadow = useTransform(scrollY, [0, 100], ["0 0 #0000", "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"]);
  const borderColor = useTransform(scrollY, [0, 100], ["transparent", "#e5e5e5"]);

  return (
    <motion.nav
      style={{ backgroundColor, boxShadow, borderColor }}
      className="sticky top-4 z-50 mx-8 mb-10 flex flex-row justify-between rounded-xl border px-6 py-6 shadow-sm"
    >
      <span className="text-3xl font-extrabold tracking-tighter">Nota</span>
      <div>
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
    </motion.nav>
  );
}
