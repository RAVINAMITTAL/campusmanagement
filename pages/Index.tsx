import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ResourceCard } from "@/components/dashboard/ResourceCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CampusMap } from "@/components/map/CampusMap";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();

  // Mock quick access resources
  const quickAccessResources = [
    { id: 1, name: "Computer Lab 2", description: "Programming Laboratory", status: "available", details: "30 workstations" },
    { id: 2, name: "Library Study Room 1", description: "Group study space", status: "available" },
    { id: 3, name: "Lecture Hall 101", description: "Large classroom", status: "busy", details: "In use until 2 PM" },
    { id: 4, name: "Physics Lab", description: "Experimental lab", status: "maintenance", details: "Under renovation" }
  ];

  // Mock upcoming events
  const upcomingEvents = [
    { id: 1, name: "Technical Symposium", date: "Apr 26, 2025", location: "Main Auditorium" },
    { id: 2, name: "Library Book Fair", date: "Apr 28, 2025", location: "Central Library" },
    { id: 3, name: "Campus Cleaning Drive", date: "May 2, 2025", location: "Campus Grounds" }
  ];

  const handleBookResource = (resourceName: string) => {
    toast({
      title: "Resource Booked",
      description: `You have successfully booked ${resourceName}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 pl-64">
          <main className="container py-6">
            <h1 className="text-3xl font-bold mb-6">Campus Resource Dashboard</h1>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Resources</CardTitle>
                  <CardDescription>Campus-wide resource count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">128</div>
                  <p className="text-sm text-muted-foreground mt-2">24 labs, 35 classrooms, 15 library spaces, 54 hostel units</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Currently Available</CardTitle>
                  <CardDescription>Resources ready for booking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-available">47</div>
                  <p className="text-sm text-muted-foreground mt-2">37% of all resources are currently available</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Your Bookings</CardTitle>
                  <CardDescription>Your active resource bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-accent">2</div>
                  <p className="text-sm text-muted-foreground mt-2">Library study room, Chemistry lab equipment</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <div className="md:col-span-2">
                <CampusMap />
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Events happening on campus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {upcomingEvents.map(event => (
                        <li key={event.id} className="border-b border-border pb-2 last:border-0 last:pb-0">
                          <p className="font-medium">{event.name}</p>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{event.date}</span>
                            <span>{event.location}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance Notice</CardTitle>
                    <CardDescription>Upcoming facility maintenance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">
                      Central Library will be closed for system upgrades on Saturday, April 27th. 
                      The Computer Science building will undergo electrical maintenance from April 29-30.
                      Please plan accordingly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Quick Access Resources</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {quickAccessResources.map(resource => (
                <ResourceCard 
                  key={resource.id}
                  title={resource.name}
                  description={resource.description}
                  status={resource.status as any}
                  details={resource.details}
                  actionLabel="Book Now"
                  onAction={() => handleBookResource(resource.name)}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button className="mr-4" onClick={() => navigate('/availability')}>
                View All Resources
              </Button>
              <Button variant="outline" onClick={() => navigate('/booking')}>
                My Bookings
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
