
export interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  projectedPoints: number;
  actualPoints: number;
  status: 'healthy' | 'questionable' | 'doubtful' | 'out';
}

export interface Team {
  id: string;
  name: string;
  owner: string;
  rank: number;
  record: {
    wins: number;
    losses: number;
    ties: number;
  };
  players: Player[];
  totalPoints: number;
  projectedPoints: number;
}

export interface League {
  id: string;
  name: string;
  teams: Team[];
}

// Mock data for development
export const mockLeague: League = {
  id: "12345",
  name: "Fantasy Football Champions",
  teams: [
    {
      id: "team1",
      name: "The Underdogs",
      owner: "User",
      rank: 3,
      record: { wins: 6, losses: 3, ties: 0 },
      totalPoints: 812.5,
      projectedPoints: 110.2,
      players: [
        { id: "p1", name: "Patrick Mahomes", team: "KC", position: "QB", projectedPoints: 26.7, actualPoints: 24.2, status: 'healthy' },
        { id: "p2", name: "Derrick Henry", team: "BAL", position: "RB", projectedPoints: 18.3, actualPoints: 15.8, status: 'healthy' },
        { id: "p3", name: "Tyreek Hill", team: "MIA", position: "WR", projectedPoints: 21.4, actualPoints: 23.6, status: 'healthy' },
        { id: "p4", name: "Travis Kelce", team: "KC", position: "TE", projectedPoints: 14.2, actualPoints: 12.5, status: 'questionable' },
        { id: "p5", name: "Justin Jefferson", team: "MIN", position: "WR", projectedPoints: 19.8, actualPoints: 21.2, status: 'healthy' },
      ]
    },
    {
      id: "team2",
      name: "Championship Chasers",
      owner: "Mike",
      rank: 2,
      record: { wins: 7, losses: 2, ties: 0 },
      totalPoints: 845.7,
      projectedPoints: 112.8,
      players: [
        { id: "p6", name: "Lamar Jackson", team: "BAL", position: "QB", projectedPoints: 28.5, actualPoints: 30.1, status: 'healthy' },
        { id: "p7", name: "Saquon Barkley", team: "PHI", position: "RB", projectedPoints: 17.2, actualPoints: 14.8, status: 'healthy' },
        { id: "p8", name: "Ja'Marr Chase", team: "CIN", position: "WR", projectedPoints: 18.9, actualPoints: 16.5, status: 'questionable' },
        { id: "p9", name: "George Kittle", team: "SF", position: "TE", projectedPoints: 12.1, actualPoints: 10.7, status: 'healthy' },
        { id: "p10", name: "Davante Adams", team: "LV", position: "WR", projectedPoints: 17.5, actualPoints: 16.2, status: 'doubtful' },
      ]
    },
    {
      id: "team3",
      name: "Touchdown Terrors",
      owner: "Sarah",
      rank: 1,
      record: { wins: 8, losses: 1, ties: 0 },
      totalPoints: 878.3,
      projectedPoints: 118.5,
      players: [
        { id: "p11", name: "Josh Allen", team: "BUF", position: "QB", projectedPoints: 27.3, actualPoints: 29.8, status: 'healthy' },
        { id: "p12", name: "Christian McCaffrey", team: "SF", position: "RB", projectedPoints: 25.1, actualPoints: 27.2, status: 'out' },
        { id: "p13", name: "CeeDee Lamb", team: "DAL", position: "WR", projectedPoints: 19.6, actualPoints: 21.3, status: 'healthy' },
        { id: "p14", name: "Mark Andrews", team: "BAL", position: "TE", projectedPoints: 13.7, actualPoints: 11.9, status: 'healthy' },
        { id: "p15", name: "Stefon Diggs", team: "HOU", position: "WR", projectedPoints: 18.1, actualPoints: 17.4, status: 'healthy' },
      ]
    },
  ]
};

export const getStrategies = (userTeam: Team, targetTeam: Team): string[] => {
  const strategies = [
    `${targetTeam.name} is currently weak at the RB position. Consider trading for a strong RB to gain an edge.`,
    `${targetTeam.owner} has two injured players in their lineup. This gives you a temporary advantage you should capitalize on.`,
    `${targetTeam.name} has a tough schedule in the coming weeks. You may gain ground by focusing on high-floor players rather than boom-or-bust options.`,
    `Their QB ${targetTeam.players.find(p => p.position === 'QB')?.name} has been underperforming lately. Your QB has a better matchup this week.`,
    `${targetTeam.owner} is projected to score fewer points than usual this week. This might be a good opportunity to gain ground.`,
    `You're currently ${Math.abs(userTeam.rank - targetTeam.rank)} positions ${userTeam.rank > targetTeam.rank ? 'behind' : 'ahead of'} ${targetTeam.name}. Focus on consistent weekly scoring to maintain your position.`,
    `${targetTeam.name} has a bye week problem coming up in Week 9, with 3 starters on bye. Plan your lineup to maximize points that week.`,
    `${targetTeam.players.find(p => p.status === 'questionable')?.name} is questionable this week for ${targetTeam.name}. This might give you an edge.`,
  ];
  
  return strategies;
};
