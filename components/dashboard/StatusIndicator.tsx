
import { cn } from "@/lib/utils";

export type ResourceStatus = 'available' | 'busy' | 'unavailable' | 'maintenance';

interface StatusIndicatorProps {
  status: ResourceStatus;
  className?: string;
  withText?: boolean;
}

const statusText = {
  available: "Available",
  busy: "Busy",
  unavailable: "Unavailable",
  maintenance: "Under Maintenance"
};

export function StatusIndicator({ status, className, withText = true }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn(`status-indicator status-${status}`, className)} />
      {withText && <span className="text-sm font-medium">{statusText[status]}</span>}
    </div>
  );
}
