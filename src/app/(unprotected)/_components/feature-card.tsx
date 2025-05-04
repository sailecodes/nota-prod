import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IFeatureCardProps } from "@/lib/interfaces";

export default function FeatureCard({ number, title, description }: IFeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="space-y-2">
          <div className="bg-muted text-muted-foreground w-fit rounded-sm px-[0.375rem] py-1 text-xs leading-none">{number}</div>
          <p className="text-lg leading-[1.25rem]">{title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">{description}</CardContent>
    </Card>
  );
}
