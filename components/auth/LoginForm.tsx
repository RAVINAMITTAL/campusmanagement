
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera } from "lucide-react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [faceRecognitionActive, setFaceRecognitionActive] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic
    }, 1500);
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle signup logic
    }, 1500);
  };
  
  const handleFaceRecognition = () => {
    setFaceRecognitionActive(true);
    // In a real implementation, this would activate the camera and use face recognition
    setTimeout(() => {
      setFaceRecognitionActive(false);
      // Simulate successful face recognition
    }, 3000);
  };
  
  return (
    <Card className="mx-auto max-w-md">
      <Tabs defaultValue="login">
        <CardHeader>
          <CardTitle className="text-center mb-2">Welcome to CampusConnect</CardTitle>
          <CardDescription className="text-center">Manage your campus resources efficiently</CardDescription>
          <TabsList className="grid w-full grid-cols-2 mt-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>
        
        <TabsContent value="login">
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="student@ccet.edu" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleFaceRecognition} 
              disabled={faceRecognitionActive}
            >
              {faceRecognitionActive ? (
                <>
                  <span className="animate-pulse">Processing...</span>
                  <Camera className="w-4 h-4 ml-2 animate-pulse" />
                </>
              ) : (
                <>
                  Face Recognition
                  <Camera className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="signup">
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input id="signup-name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="student@ccet.edu" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-student-id">Student ID</Label>
                  <Input id="signup-student-id" placeholder="CS12345" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" required />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Sign Up"}
                </Button>
              </div>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Register Face</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleFaceRecognition}
              disabled={faceRecognitionActive}
            >
              {faceRecognitionActive ? (
                <>
                  <span className="animate-pulse">Capturing...</span>
                  <Camera className="w-4 h-4 ml-2 animate-pulse" />
                </>
              ) : (
                <>
                  Scan Face
                  <Camera className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardContent>
        </TabsContent>
        
        <CardFooter className="text-sm text-center text-muted-foreground">
          <p className="mx-auto">Protected by campus security protocols.</p>
        </CardFooter>
      </Tabs>
    </Card>
  );
}
