import { Check } from "lucide-react";

export default function PricingCardFeature({ feature }: { feature: string }) {
  return (
    <div className="flex gap-2">
      <Check className="shrink-0" />
      <p>{feature}</p>
    </div>
  );
}
