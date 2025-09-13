import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Calendar, 
  MapPin, 
  Utensils, 
  BookOpen, 
  Settings, 
  GraduationCap,
  Clock,
  Phone,
  MessageCircle
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  category?: string;
}

interface QuickAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  query: string;
}

const quickActions: QuickAction[] = [
  { label: "Class Schedule", icon: Calendar, category: "schedules", query: "Show me today's class schedule" },
  { label: "Campus Map", icon: MapPin, category: "facilities", query: "Where is the library located?" },
  { label: "Dining Hours", icon: Utensils, category: "dining", query: "What are the dining hall hours today?" },
  { label: "Library Services", icon: BookOpen, category: "library", query: "What library services are available?" },
  { label: "Registration", icon: Settings, category: "admin", query: "How do I register for classes?" },
  { label: "Contact Info", icon: Phone, category: "admin", query: "What are the important campus contact numbers?" },
];

const CampusChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your campus information assistant. I can help you with schedules, facilities, dining, library services, and administrative procedures. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageContent);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse.content,
        isBot: true,
        timestamp: new Date(),
        category: botResponse.category,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (query: string): { content: string; category: string } => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("schedule") || lowerQuery.includes("class")) {
      return {
        content: "📅 **Today's Schedule:**\n\n• 9:00 AM - Computer Science 101 (Room A204)\n• 11:00 AM - Mathematics 205 (Room B305)\n• 2:00 PM - Physics Lab (Lab C102)\n• 4:00 PM - Study Group - Library Room 301\n\nWould you like to see tomorrow's schedule or a specific course?",
        category: "schedules"
      };
    }
    
    if (lowerQuery.includes("dining") || lowerQuery.includes("food") || lowerQuery.includes("cafeteria")) {
      return {
        content: "🍽️ **Dining Information:**\n\n• **Main Cafeteria**: 7:00 AM - 9:00 PM\n• **Student Union Food Court**: 11:00 AM - 7:00 PM\n• **Library Café**: 8:00 AM - 6:00 PM\n• **24/7 Vending Machines**: Available in all residence halls\n\nToday's special: Mediterranean Bowl at the Main Cafeteria!",
        category: "dining"
      };
    }
    
    if (lowerQuery.includes("library")) {
      return {
        content: "📚 **Library Services:**\n\n• **Hours**: Mon-Thu 8AM-12AM, Fri-Sat 8AM-8PM, Sun 12PM-12AM\n• **Study Rooms**: Available for booking online\n• **Computer Lab**: 24/7 access with student ID\n• **Research Help**: Librarians available 9AM-5PM\n• **Printing**: $0.10 per page, color printing available\n\nNeed help with research or booking a study room?",
        category: "library"
      };
    }
    
    if (lowerQuery.includes("map") || lowerQuery.includes("location") || lowerQuery.includes("where")) {
      return {
        content: "🗺️ **Campus Locations:**\n\n• **Library**: Central Campus, Building C\n• **Student Services**: Administration Building, 1st Floor\n• **Dining Hall**: North Campus, Building D\n• **Recreation Center**: South Campus\n• **Parking**: Lots A, B, C (free with permit)\n\nNeed directions to a specific building or room?",
        category: "facilities"
      };
    }
    
    if (lowerQuery.includes("register") || lowerQuery.includes("enrollment") || lowerQuery.includes("admin")) {
      return {
        content: "📋 **Administrative Services:**\n\n• **Registration**: Online portal opens each semester\n• **Student Services**: Mon-Fri 8:30AM-4:30PM\n• **Financial Aid**: appointments available online\n• **Academic Advising**: Schedule through student portal\n• **IT Help Desk**: 24/7 support available\n\nWhat specific administrative help do you need?",
        category: "admin"
      };
    }
    
    return {
      content: "I'd be happy to help! I can provide information about:\n\n• 📅 **Schedules** - Class times, events, deadlines\n• 🏢 **Facilities** - Building locations, room finder\n• 🍽️ **Dining** - Hours, menus, locations\n• 📚 **Library** - Hours, services, study spaces\n• 📋 **Administrative** - Registration, contacts, procedures\n\nWhat would you like to know more about?",
      category: "general"
    };
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.query);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-chat">
      {/* Header */}
      <div className="bg-gradient-campus text-primary-foreground p-6 shadow-campus">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Campus Assistant</h1>
            <p className="text-primary-foreground/80">Your 24/7 campus information guide</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border-b p-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action)}
                className="flex items-center gap-2 transition-smooth hover:shadow-chat"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <Card className={`max-w-[80%] p-4 ${
                message.isBot 
                  ? "bg-card shadow-chat" 
                  : "bg-gradient-campus text-primary-foreground shadow-campus"
              }`}>
                {message.isBot && message.category && (
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {message.category}
                  </Badge>
                )}
                <div className="whitespace-pre-line">{message.content}</div>
                <div className={`text-xs mt-2 ${
                  message.isBot ? "text-muted-foreground" : "text-primary-foreground/70"
                }`}>
                  <Clock className="inline h-3 w-3 mr-1" />
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </Card>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Card className="bg-card shadow-chat p-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Assistant is typing...</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="bg-card border-t p-4">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about schedules, facilities, dining, library, or admin procedures..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-campus hover:opacity-90 transition-smooth"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampusChatbot;