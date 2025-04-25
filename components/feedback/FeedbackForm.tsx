
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resourceType, setResourceType] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your valuable feedback!",
      });
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
      setResourceType("");
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Feedback</CardTitle>
        <CardDescription>Help us improve campus resources by sharing your experience</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resource-type">Resource Type</Label>
            <Select 
              value={resourceType} 
              onValueChange={setResourceType}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lab">Laboratory</SelectItem>
                <SelectItem value="library">Library</SelectItem>
                <SelectItem value="classroom">Classroom</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
                <SelectItem value="sports">Sports Facility</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resource-name">Resource Name/Number</Label>
            <Input id="resource-name" placeholder="e.g., Physics Lab 2, Classroom 101" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                <SelectItem value="2">⭐⭐ Below Average</SelectItem>
                <SelectItem value="1">⭐ Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea 
              id="feedback" 
              placeholder="Please share your experience with this resource"
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suggestions">Suggestions for Improvement (Optional)</Label>
            <Textarea 
              id="suggestions" 
              placeholder="How can we make this resource better?"
              className="min-h-[100px]"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <p>All feedback is anonymous by default</p>
        <p>Campus Resource Team</p>
      </CardFooter>
    </Card>
  );
}
