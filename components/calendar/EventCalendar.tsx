
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: number;
  title: string;
  date: Date;
  type: "academic" | "cultural" | "sports" | "maintenance";
}

export function EventCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock events data
  const events: Event[] = [
    { id: 1, title: "Technical Symposium", date: new Date(2025, 3, 26), type: "academic" },
    { id: 2, title: "Annual Sports Meet", date: new Date(2025, 3, 28), type: "sports" },
    { id: 3, title: "Library Maintenance", date: new Date(2025, 3, 30), type: "maintenance" },
    { id: 4, title: "Cultural Festival", date: new Date(2025, 4, 5), type: "cultural" },
    { id: 5, title: "Research Conference", date: new Date(2025, 4, 10), type: "academic" }
  ];
  
  const selectedDateEvents = events.filter(event => 
    date && event.date.toDateString() === date.toDateString()
  );
  
  const upcomingEvents = events
    .filter(event => event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);
  
  // This function returns a CSS class string based on event type
  function getDayClass(day: Date): string {
    const matchedEvent = events.find(event => event.date.toDateString() === day.toDateString());
    
    if (!matchedEvent) return "";
    
    const typeColors = {
      academic: "bg-primary/20 text-primary font-medium",
      cultural: "bg-purple-500/20 text-purple-600 font-medium",
      sports: "bg-orange-500/20 text-orange-600 font-medium",
      maintenance: "bg-red-500/20 text-red-600 font-medium"
    };
    
    return typeColors[matchedEvent.type];
  }
  
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Campus Calendar</CardTitle>
          <CardDescription>View and manage upcoming events</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Calendar 
            mode="single" 
            selected={date} 
            onSelect={setDate} 
            modifiersClassNames={{
              selected: "bg-primary text-primary-foreground"
            }}
            modifiers={{
              booked: (day) => events.some(event => event.date.toDateString() === day.toDateString())
            }}
            modifiersStyles={{
              booked: { fontWeight: "bold" }
            }}
            className="rounded-md border"
            classNames={{
              day_today: "bg-muted text-accent-foreground hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground",
              day: "day" // Use a base class name for all days
            }}
            // Use the DayContent renderer to apply custom classes dynamically
            components={{
              // Reuse the default DayContent but add our custom classes
              DayContent: ({ date, ...props }) => {
                const customClass = getDayClass(date);
                return (
                  <div className={customClass} {...props}>
                    {date.getDate()}
                  </div>
                );
              }
            }}
          />
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Selected Date Events</CardTitle>
            <CardDescription>
              {date ? date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : "Select a date"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <ul className="space-y-3">
                {selectedDateEvents.map(event => (
                  <li key={event.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span>{event.title}</span>
                    <Badge variant={
                      event.type === "academic" ? "default" :
                      event.type === "cultural" ? "secondary" :
                      event.type === "sports" ? "outline" : "destructive"
                    }>
                      {event.type}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No events scheduled for this date.</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next few events on campus</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {upcomingEvents.map(event => (
                <li key={event.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <Badge variant={
                    event.type === "academic" ? "default" :
                    event.type === "cultural" ? "secondary" :
                    event.type === "sports" ? "outline" : "destructive"
                  }>
                    {event.type}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
