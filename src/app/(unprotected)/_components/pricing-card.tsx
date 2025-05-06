import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IPricingCardProps } from "@/lib/interfaces";
import PricingCardFeature from "./pricing-card-feature";

export default function PricingCard({ title, description, pricing, btnText, features }: IPricingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between gap-2">
          <p className="text-lg">{title}</p>
          {title === "Individuals" && <Badge>Most popular</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="relative flex gap-1">
            <p className="text-3xl font-bold md:text-4xl">{pricing}</p>
            {pricing.includes("$") && <p className="text-muted-foreground relative bottom-1 self-end text-xs">per month</p>}
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
          <Link
            href="/sign-up"
            className={buttonVariants({
              size: "lg",
              className: `${title !== "Individuals" ? "pointer-events-none opacity-50" : ""}`,
            })}
          >
            {btnText}
          </Link>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-3">
          {features.map((feature) => (
            <PricingCardFeature key={feature} feature={feature} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
