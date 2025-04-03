
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface IdFormProps {
  onSubmit: (playerID: string, leagueID: string, targetName: string) => void;
}

const IdForm: React.FC<IdFormProps> = ({ onSubmit }) => {
  const [playerID, setPlayerID] = useState("");
  const [leagueID, setLeagueID] = useState("");
  const [targetName, setTargetName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerID.trim() || !leagueID.trim() || !targetName.trim()) {
      toast.error("Please fill out all fields");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, we would validate the IDs here
    // For now, we'll just simulate a delay
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(playerID, leagueID, targetName);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Enter Your League Details</CardTitle>
        <CardDescription>
          Provide your player ID, league ID, and the competitor you want to outrank
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="playerID" className="field-label">Your Player ID</label>
            <Input
              id="playerID"
              placeholder="e.g., 12345678"
              value={playerID}
              onChange={(e) => setPlayerID(e.target.value)}
              className="field-input"
            />
          </div>
          
          <div>
            <label htmlFor="leagueID" className="field-label">League ID</label>
            <Input
              id="leagueID"
              placeholder="e.g., 87654321"
              value={leagueID}
              onChange={(e) => setLeagueID(e.target.value)}
              className="field-input"
            />
          </div>
          
          <div>
            <label htmlFor="targetName" className="field-label">Competitor to Outrank</label>
            <Input
              id="targetName"
              placeholder="e.g., John's Team"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              className="field-input"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Get Strategy"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IdForm;
