
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Send, Volume2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Campus Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("english");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate bot response
    setTimeout(() => {
      let responseText = "";
      
      // Simple keyword matching
      const lowerInput = inputValue.toLowerCase();
      
      if (lowerInput.includes("book") || lowerInput.includes("reserve")) {
        responseText = "To book a resource, go to the Booking tab and select the type of resource you need. You can then check availability and make a reservation.";
      } else if (lowerInput.includes("lab") || lowerInput.includes("laboratory")) {
        responseText = "Our campus has multiple laboratories. You can check their availability in the Availability tab under 'Labs'. Currently, Physics Lab 2 and Computer Lab 3 are available.";
      } else if (lowerInput.includes("library") || lowerInput.includes("book")) {
        responseText = "The main library is open from 8 AM to 10 PM. You can check book availability in the Library tab. Each student can borrow up to 3 books at once.";
      } else if (lowerInput.includes("class") || lowerInput.includes("classroom")) {
        responseText = "Classroom information can be found under the Availability tab. For booking a classroom for an event, please use the Booking tab.";
      } else if (lowerInput.includes("hostel") || lowerInput.includes("dorm")) {
        responseText = "Hostel information is available in the Availability tab under 'Hostel'. You can check room availability and mess schedules there.";
      } else {
        responseText = "I'm not sure I understand. Could you please be more specific about what campus resource you need help with?";
      }
      
      // Translate response based on selected language (simulation)
      if (language === "hindi") {
        responseText += " [Translated to Hindi]";
      } else if (language === "spanish") {
        responseText += " [Translated to Spanish]";
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  const handleVoiceInput = () => {
    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setInputValue("How do I book a laboratory?");
      
      // Automatically send after voice input is completed
      setTimeout(() => {
        handleSendMessage();
      }, 500);
    }, 2000);
  };
  
  const handleTextToSpeech = (text: string) => {
    // In a real implementation, this would use the Web Speech API
    console.log("Speaking:", text);
    // Simulate speaking animation
    const messageEl = document.getElementById(`message-${messages.length}`);
    if (messageEl) {
      messageEl.classList.add("animate-pulse");
      setTimeout(() => {
        messageEl?.classList.remove("animate-pulse");
      }, 2000);
    }
  };
  
  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Campus Assistant</CardTitle>
            <CardDescription>Ask any questions about campus resources</CardDescription>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                id={`message-${index}`}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[80%] px-4 py-2 rounded-lg
                    ${message.sender === "user" 
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                    }
                  `}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {message.sender === "bot" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-2"
                        onClick={() => handleTextToSpeech(message.text)}
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={isListening ? "bg-red-100 text-red-500 animate-pulse" : ""}
            onClick={handleVoiceInput}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
