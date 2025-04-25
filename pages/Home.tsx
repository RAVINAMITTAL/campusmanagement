
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navigation */}
      <nav className="container mx-auto py-4 px-6 flex justify-end gap-4">
        <Link to="/signin">
          <Button variant="ghost" className="text-[#1EAEDB] hover:text-[#33C3F0] hover:bg-black/20">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="ghost" className="text-[#1EAEDB] hover:text-[#33C3F0] hover:bg-black/20">
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </Link>
      </nav>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-bold mb-6 text-[#1EAEDB] animate-slide-in-from-top">
            CampusConnect
          </h1>
          <p className="text-xl text-[#33C3F0] mb-8 animate-slide-in-from-top animation-delay-200">
            Manage your campus resources efficiently
          </p>
          <Link to="/dashboard">
            <Button 
              className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white animate-slide-in-from-top animation-delay-300"
            >
              Enter Dashboard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
