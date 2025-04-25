
import { Bell, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/useDarkMode";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function Navbar() {
  const { theme, toggleTheme } = useDarkMode();
  const [hasNotifications, setHasNotifications] = useState(true);
  
  const mockNotifications = [
    { id: 1, title: "Book Return Reminder", message: "Chemistry Handbook due in 2 days" },
    { id: 2, title: "Lab Booking Confirmed", message: "Physics Lab 3 booked for tomorrow at 2 PM" },
    { id: 3, title: "System Maintenance", message: "Computer Science Lab will be unavailable on Friday" }
  ];
  
  return (
    <header className="border-b border-border sticky top-0 z-40 bg-background">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-primary">CampusConnect</h2>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {hasNotifications && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-medium">Notifications</div>
              <div className="border-t border-border">
                {mockNotifications.map(notification => (
                  <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-muted-foreground text-sm">{notification.message}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="p-2 justify-center border-t border-border">
                  <Button variant="ghost" className="w-full">View all</Button>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
