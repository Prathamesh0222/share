import { LucideIcon } from "lucide-react";

interface FeaturesCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FeaturesCard = ({
  title,
  description,
  icon: Icon,
}: FeaturesCardProps) => {
  return (
    <div className="p-1.5 rounded-xl border border-border hover:border-green-500/50 transition-colors">
      <div className="space-y-2 p-6 border border-border/75 rounded-lg bg-card">
        <div className="w-12 h-12 rounded-lg border border-border bg-green-500/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-green-600 dark:text-green-500" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};
