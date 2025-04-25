import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { EventCalendar } from "./components/calendar/EventCalendar";
import { ResourceAvailability } from "./components/availability/ResourceAvailability";
import { CampusMap } from "./components/map/CampusMap";
import { Chatbot } from "./components/chatbot/Chatbot";
import { GrievancePortal } from "./components/grievance/GrievancePortal";
import { FeedbackForm } from "./components/feedback/FeedbackForm";
import { LoginForm } from "./components/auth/LoginForm";

const CalendarPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Campus Calendar</h1>
          <EventCalendar />
        </main>
      </div>
    </div>
  </div>
);

const BookingPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Resource Booking</h1>
          <ResourceAvailability />
        </main>
      </div>
    </div>
  </div>
);

const AvailabilityPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Resource Availability</h1>
          <ResourceAvailability />
        </main>
      </div>
    </div>
  </div>
);

const LibraryPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Library Resources</h1>
          <ResourceAvailability />
        </main>
      </div>
    </div>
  </div>
);

const MapsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Campus Map</h1>
          <CampusMap />
        </main>
      </div>
    </div>
  </div>
);

const ChatbotPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Campus Assistant</h1>
          <Chatbot />
        </main>
      </div>
    </div>
  </div>
);

const GrievancePage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Grievance Portal</h1>
          <GrievancePortal />
        </main>
      </div>
    </div>
  </div>
);

const FeedbackPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Resource Feedback</h1>
          <FeedbackForm />
        </main>
      </div>
    </div>
  </div>
);

const SignInPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <main className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Sign In / Login</h1>
          <LoginForm />
        </main>
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary animate-pulse mb-4">CampusConnect</h1>
          <p className="text-muted-foreground">Loading campus resources...</p>
        </div>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/availability" element={<AvailabilityPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/maps" element={<MapsPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/grievance" element={<GrievancePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
