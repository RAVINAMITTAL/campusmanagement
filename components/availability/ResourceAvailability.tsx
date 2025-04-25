
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceCard } from "@/components/dashboard/ResourceCard";
import { StatusIndicator, ResourceStatus } from "@/components/dashboard/StatusIndicator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

interface Resource {
  id: string;
  name: string;
  description: string;
  status: ResourceStatus;
  details?: string;
}

export function ResourceAvailability() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<ResourceStatus | 'all'>('all');

  // Mock resource data
  const labResources: Resource[] = [
    { id: "lab1", name: "Physics Lab 1", description: "General Physics Laboratory", status: "busy", details: "Currently in use for PHY101" },
    { id: "lab2", name: "Physics Lab 2", description: "Advanced Physics Laboratory", status: "available", details: "All equipment operational" },
    { id: "lab3", name: "Chemistry Lab 1", description: "General Chemistry Laboratory", status: "maintenance", details: "Under renovation until May 5th" },
    { id: "lab4", name: "Chemistry Lab 2", description: "Organic Chemistry Laboratory", status: "available" },
    { id: "lab5", name: "Computer Lab 1", description: "Programming Laboratory", status: "busy", details: "CS301 session in progress" },
    { id: "lab6", name: "Computer Lab 2", description: "Networking Laboratory", status: "available" },
  ];
  
  const libraryResources: Resource[] = [
    { id: "lib1", name: "Main Reading Hall", description: "Quiet study space", status: "busy", details: "80% occupied" },
    { id: "lib2", name: "Group Study Room 1", description: "Collaborative work space", status: "available" },
    { id: "lib3", name: "Group Study Room 2", description: "Collaborative work space", status: "unavailable", details: "Reserved until 5 PM" },
    { id: "lib4", name: "Computer Terminal Section", description: "Digital resources access", status: "available", details: "15 computers available" },
    { id: "lib5", name: "Periodicals Section", description: "Journals and magazines", status: "available" },
    { id: "lib6", name: "Reference Section", description: "Non-borrowable resources", status: "available" },
  ];
  
  const classroomResources: Resource[] = [
    { id: "class1", name: "Classroom 101", description: "Large lecture hall", status: "busy", details: "In use until 2 PM" },
    { id: "class2", name: "Classroom 102", description: "Medium lecture room", status: "available" },
    { id: "class3", name: "Classroom 201", description: "Small tutorial room", status: "available" },
    { id: "class4", name: "Classroom 202", description: "Medium lecture room", status: "maintenance", details: "Projector repair" },
    { id: "class5", name: "Seminar Hall", description: "Large presentation room", status: "unavailable", details: "Reserved for conference" },
    { id: "class6", name: "Tutorial Room 301", description: "Small discussion room", status: "available" },
  ];
  
  const hostelResources: Resource[] = [
    { id: "hostel1", name: "Boys Hostel A", description: "Undergraduate hostel", status: "busy", details: "95% occupied" },
    { id: "hostel2", name: "Boys Hostel B", description: "Postgraduate hostel", status: "available", details: "Rooms available on 2nd floor" },
    { id: "hostel3", name: "Girls Hostel A", description: "Undergraduate hostel", status: "busy", details: "98% occupied" },
    { id: "hostel4", name: "Girls Hostel B", description: "Postgraduate hostel", status: "available", details: "Limited rooms available" },
    { id: "hostel5", name: "Guest House", description: "Visitor accommodation", status: "available" },
    { id: "hostel6", name: "Married Student Housing", description: "Family accommodation", status: "unavailable", details: "Waiting list active" },
  ];
  
  const filterResources = (resources: Resource[]) => {
    return resources
      .filter(resource => 
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(resource => filter === 'all' || resource.status === filter);
  };
  
  const handleBookResource = (resource: Resource) => {
    toast({
      title: "Booking Request Sent",
      description: `Your request to book ${resource.name} has been submitted.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="search">Search Resources</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name or description..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-[180px]">
          <Label htmlFor="filter">Filter by Status</Label>
          <Select value={filter} onValueChange={(value) => setFilter(value as ResourceStatus | 'all')}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center gap-3 mt-4">
        <h3 className="text-sm font-medium">Status Key:</h3>
        <div className="flex items-center gap-1">
          <span className="status-indicator status-available"></span>
          <span className="text-xs">Available</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="status-indicator status-busy"></span>
          <span className="text-xs">Busy</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="status-indicator status-unavailable"></span>
          <span className="text-xs">Unavailable</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="status-indicator status-maintenance"></span>
          <span className="text-xs">Maintenance</span>
        </div>
      </div>
      
      <Tabs defaultValue="labs" className="mt-6">
        <TabsList className="grid grid-cols-4 max-w-[600px]">
          <TabsTrigger value="labs">Labs</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
          <TabsTrigger value="hostel">Hostel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="labs" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterResources(labResources).map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.name}
                description={resource.description}
                status={resource.status}
                details={resource.details}
                onAction={() => handleBookResource(resource)}
              />
            ))}
            
            {filterResources(labResources).length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No laboratories found matching your criteria.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="library" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterResources(libraryResources).map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.name}
                description={resource.description}
                status={resource.status}
                details={resource.details}
                onAction={() => handleBookResource(resource)}
              />
            ))}
            
            {filterResources(libraryResources).length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No library resources found matching your criteria.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="classrooms" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterResources(classroomResources).map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.name}
                description={resource.description}
                status={resource.status}
                details={resource.details}
                onAction={() => handleBookResource(resource)}
              />
            ))}
            
            {filterResources(classroomResources).length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No classrooms found matching your criteria.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="hostel" className="pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterResources(hostelResources).map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.name}
                description={resource.description}
                status={resource.status}
                details={resource.details}
                onAction={() => handleBookResource(resource)}
                actionLabel="Check Availability"
              />
            ))}
            
            {filterResources(hostelResources).length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No hostel resources found matching your criteria.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
