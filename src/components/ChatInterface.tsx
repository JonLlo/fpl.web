
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot } from "lucide-react";
import { getStrategies, Team, mockLeague } from '../utils/mockData';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatInterfaceProps {
  playerID: string;
  leagueID: string;
  targetName: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ playerID, leagueID, targetName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial setup - welcome message and loading league data
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        text: "Hello! I'm your Fantasy Football Strategist. I'm analyzing your league data to help you outrank " + targetName + "...",
        sender: 'bot',
        timestamp: new Date()
      }
    ];
    
    setMessages(initialMessages);
    
    // Simulate loading league data
    setTimeout(() => {
      const userTeam = mockLeague.teams.find(team => team.owner === "User") as Team;
      const targetTeam = mockLeague.teams.find(team => team.name === targetName) || 
                        mockLeague.teams.find(team => team.owner === "Mike") as Team;
      
      const strategies = getStrategies(userTeam, targetTeam);
      
      const initialAnalysis = `
Based on my analysis of your league, here's what you need to know:

• You're currently ranked #${userTeam.rank} with a ${userTeam.record.wins}-${userTeam.record.losses} record
• ${targetName} is ranked #${targetTeam.rank} with a ${targetTeam.record.wins}-${targetTeam.record.losses} record
• The points difference between you is ${Math.abs(userTeam.totalPoints - targetTeam.totalPoints).toFixed(1)} points

Here's my initial strategy recommendation:
${strategies[Math.floor(Math.random() * strategies.length)]}

What specific aspect of your matchup would you like advice on? (Trades, waiver pickups, start/sit decisions, etc.)
      `;
      
      setMessages(prev => [...prev, {
        id: '2',
        text: initialAnalysis,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }, 2000);
  }, [targetName]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const userTeam = mockLeague.teams.find(team => team.owner === "User") as Team;
      const targetTeam = mockLeague.teams.find(team => team.name === targetName) ||
                        mockLeague.teams.find(team => team.owner === "Mike") as Team;
      
      const strategies = getStrategies(userTeam, targetTeam);
      
      // Generate contextual responses based on user input
      let botResponse = '';
      const userQuery = userMessage.text.toLowerCase();
      
      if (userQuery.includes('trade') || userQuery.includes('trading')) {
        botResponse = `For trade opportunities to beat ${targetName}, I'd suggest targeting their weakness at ${targetTeam.players.find(p => p.status !== 'healthy')?.position}. 
        
Consider offering your ${userTeam.players[4].name} for their ${targetTeam.players[1].name}, which would give you a net gain of approximately ${(targetTeam.players[1].projectedPoints - userTeam.players[4].projectedPoints).toFixed(1)} projected points per week.`;
      } 
      else if (userQuery.includes('waiver') || userQuery.includes('pickup') || userQuery.includes('free agent')) {
        botResponse = `Looking at available players, I recommend targeting a replacement for ${targetTeam.players.find(p => p.status === 'questionable')?.position}. 
        
Several high-upside options are likely available: Jayden Reed (GB), Rashid Shaheed (NO), or Jauan Jennings (SF). Adding one of these players could give you an advantage over ${targetName} in the coming weeks.`;
      }
      else if (userQuery.includes('start') || userQuery.includes('sit') || userQuery.includes('lineup')) {
        botResponse = `For your lineup this week against ${targetName}, I recommend:
        
1. Start ${userTeam.players[0].name} over any alternative QB options
2. Consider benching ${userTeam.players[3].name} due to the questionable status
3. ${targetName} has a weakness against TEs, so prioritize your TE matchup

This optimal lineup should outscore ${targetName} by approximately 3-7 points this week.`;
      }
      else {
        // Default response
        botResponse = strategies[Math.floor(Math.random() * strategies.length)] + "\n\nIs there anything specific about trades, waivers, or lineup decisions you'd like to know?";
      }
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="h-6 w-6 text-primary mr-2" />
          Fantasy Football Strategist
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`chat-message ${message.sender === 'user' ? 'chat-message-user' : 'chat-message-bot'}`}
            >
              {message.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message chat-message-bot">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about strategy, trades, lineups..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
