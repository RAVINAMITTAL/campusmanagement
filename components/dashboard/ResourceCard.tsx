
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusIndicator, ResourceStatus } from "./StatusIndicator";
import { toast } from "@/hooks/use-toast";

interface ResourceCardProps {
  title: string;
  description: string;
  status: ResourceStatus;
  details?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ResourceCard({ 
  title, 
  description, 
  status, 
  details, 
  actionLabel = "Book Now", 
  onAction 
}: ResourceCardProps) {
  const handleBooking = () => {
    if (onAction) {
      onAction();
    } else {
      toast({
        title: "Resource Booked",
        description: `You have successfully booked ${title}`,
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <StatusIndicator status={status} withText={false} />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {details && <p className="text-sm text-muted-foreground">{details}</p>}
      </CardContent>
      <CardFooter className="border-t pt-2 flex items-center justify-between">
        <StatusIndicator status={status} />
        <Button 
          size="sm" 
          variant={status === "available" ? "default" : "secondary"}
          disabled={status !== "available"}
          onClick={handleBooking}
        >
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
