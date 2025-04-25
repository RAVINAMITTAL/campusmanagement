
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, ThumbsUp } from "lucide-react";

interface Grievance {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "pending" | "inProgress" | "resolved";
  date: Date;
  upvotes: number;
  comments: number;
}

export function GrievancePortal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  
  // Mock grievances data
  const [grievances, setGrievances] = useState<Grievance[]>([
    {
      id: 1,
      title: "Insufficient lighting in Science Block",
      description: "The lighting in Science Block corridors is very dim, making it difficult to navigate during evening classes.",
      category: "facilities",
      status: "inProgress",
      date: new Date(2025, 3, 10),
      upvotes: 15,
      comments: 3
    },
    {
      id: 2,
      title: "Outdated equipment in Computer Lab 3",
      description: "The computers in Lab 3 are extremely slow and some have non-functional peripherals.",
      category: "labs",
      status: "pending",
      date: new Date(2025, 3, 15),
      upvotes: 24,
      comments: 7
    },
    {
      id: 3,
      title: "Library noise issues during exams",
      description: "There's too much noise in the library during exam period. Need better enforcement of silence rules.",
      category: "library",
      status: "resolved",
      date: new Date(2025, 3, 5),
      upvotes: 32,
      comments: 5
    }
  ]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Create new grievance
      const newGrievance: Grievance = {
        id: grievances.length + 1,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        status: "pending",
        date: new Date(),
        upvotes: 0,
        comments: 0
      };
      
      setGrievances(prev => [newGrievance, ...prev]);
      setIsSubmitting(false);
      
      toast({
        title: "Grievance Submitted",
        description: "Your grievance has been submitted successfully."
      });
      
      form.reset();
    }, 1500);
  };
  
  const handleUpvote = (id: number) => {
    setGrievances(prev =>
      prev.map(grievance =>
        grievance.id === id
          ? { ...grievance, upvotes: grievance.upvotes + 1 }
          : grievance
      )
    );
  };
  
  const filteredGrievances = filter === "all" 
    ? grievances 
    : grievances.filter(g => g.category === filter || g.status === filter);
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-accent text-accent-foreground";
      case "inProgress":
        return "bg-primary text-primary-foreground";
      case "resolved":
        return "bg-available text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  
  return (
    <Tabs defaultValue="view">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="view">View Grievances</TabsTrigger>
        <TabsTrigger value="submit">Submit Grievance</TabsTrigger>
      </TabsList>
      
      <TabsContent value="view">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Campus Grievances</h2>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grievances</SelectItem>
                <SelectItem value="facilities">Facilities</SelectItem>
                <SelectItem value="labs">Laboratories</SelectItem>
                <SelectItem value="library">Library</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-4">
            {filteredGrievances.map(grievance => (
              <Card key={grievance.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle>{grievance.title}</CardTitle>
                    <div className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(grievance.status)}`}>
                      {grievance.status === "inProgress" ? "In Progress" : 
                        grievance.status.charAt(0).toUpperCase() + grievance.status.slice(1)}
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <span>
                      {grievance.date.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span>|</span>
                    <span className="capitalize">{grievance.category}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground">{grievance.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-3 border-t">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleUpvote(grievance.id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{grievance.upvotes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{grievance.comments}</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            {filteredGrievances.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No grievances found for this filter.
              </div>
            )}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="submit">
        <Card>
          <CardHeader>
            <CardTitle>Submit a Grievance</CardTitle>
            <CardDescription>
              Use this form to report issues related to campus facilities or resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} id="grievance-form" className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="font-medium">Title</label>
                <Input id="title" name="title" placeholder="Brief title of your grievance" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="font-medium">Category</label>
                <Select name="category" required defaultValue="facilities">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facilities">Facilities</SelectItem>
                    <SelectItem value="labs">Laboratories</SelectItem>
                    <SelectItem value="library">Library</SelectItem>
                    <SelectItem value="classroom">Classrooms</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="font-medium">Description</label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Describe the issue in detail"
                  className="min-h-[150px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="font-medium">Specific Location</label>
                <Input id="location" name="location" placeholder="e.g., Room number, Building, etc." required />
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-between">
            <p className="text-sm text-muted-foreground">Your identity will be kept confidential</p>
            <Button type="submit" form="grievance-form" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Grievance"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
