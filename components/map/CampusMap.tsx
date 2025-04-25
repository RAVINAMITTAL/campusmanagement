
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CampusMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real implementation, this would use a mapping library like Leaflet or Google Maps
    // For now, we'll just create a placeholder with a mockup
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Campus Map</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="status-indicator status-available"></span>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="status-indicator status-busy"></span>
            <span className="text-sm">Busy</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="status-indicator status-unavailable"></span>
            <span className="text-sm">Unavailable</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="status-indicator status-maintenance"></span>
            <span className="text-sm">Maintenance</span>
          </div>
        </div>
      </div>
      
      <Card className="overflow-hidden border">
        <div className="relative">
          <div className="h-[500px] bg-muted relative" ref={mapRef}>
            <div className="absolute w-full h-full bg-gray-200">
              {/* This is a mockup map - would be replaced with real map library */}
              <div className="w-full h-full p-4 relative">
                <div className="absolute top-1/4 left-1/4 bg-card shadow-md p-2 rounded-md border">
                  <p className="font-medium">Main Building</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="status-indicator status-busy"></span>
                    <span className="text-xs">High Activity</span>
                  </div>
                </div>
                
                <div className="absolute top-1/2 left-1/3 bg-card shadow-md p-2 rounded-md border">
                  <p className="font-medium">Science Lab</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="status-indicator status-available"></span>
                    <span className="text-xs">Available</span>
                  </div>
                </div>
                
                <div className="absolute top-1/3 right-1/4 bg-card shadow-md p-2 rounded-md border">
                  <p className="font-medium">Library</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="status-indicator status-busy"></span>
                    <span className="text-xs">Moderately Busy</span>
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 right-1/3 bg-card shadow-md p-2 rounded-md border">
                  <p className="font-medium">Sports Complex</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="status-indicator status-maintenance"></span>
                    <span className="text-xs">Under Maintenance</span>
                  </div>
                  <Badge className="mt-1 bg-destructive text-xs">Construction Zone</Badge>
                </div>
                
                <div className="absolute bottom-1/3 left-1/2 bg-card shadow-md p-2 rounded-md border">
                  <p className="font-medium">Computer Lab</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="status-indicator status-available"></span>
                    <span className="text-xs">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
