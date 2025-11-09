import { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

interface BenefitItemProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export const BenefitItem = ({
  title,
  description,
  icon: Icon = Check,
}: BenefitItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-4 w-4 text-green-600 dark:text-green-500" />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};
