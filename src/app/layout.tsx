import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Nota",
    template: "%s - Nota",
  },
  description:
    "An AI Platform with a mission to deliver structured, actionable meeting summaries for individuals, teams, and organizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-muted antialiased`}>
        {children}
        <Toaster
          richColors
          duration={3000}
        />
      </body>
    </html>
  );
}
