
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  CalendarDays, Calendar, 
  BookOpen, MapPin, 
  MessageSquare, BookCheck, 
  Home, AlertCircle, LogIn
} from "lucide-react";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

const items: SidebarItem[] = [
  { title: "Dashboard", icon: Home, href: "/" },
  { title: "Calendar", icon: CalendarDays, href: "/calendar" },
  { title: "Booking", icon: Calendar, href: "/booking" },
  { title: "Availability", icon: BookCheck, href: "/availability" },
  { title: "Library", icon: BookOpen, href: "/library" },
  { title: "Maps", icon: MapPin, href: "/maps" },
  { title: "Chatbot", icon: MessageSquare, href: "/chatbot" },
  { title: "Grievance", icon: AlertCircle, href: "/grievance" },
  { title: "Feedback", icon: BookOpen, href: "/feedback" },
  { title: "Sign In", icon: LogIn, href: "/signin" }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 border-r border-border z-30 bg-background">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold text-muted-foreground mb-2">Navigation</h2>
        </div>
        <nav className="space-y-1 px-2">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                location.pathname === item.href 
                  ? "bg-accent text-accent-foreground" 
                  : "text-foreground"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
