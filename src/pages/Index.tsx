
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IdForm from '@/components/IdForm';
import ChatInterface from '@/components/ChatInterface';
import { Trophy, TrendingUp, MessageSquare } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState<{
    playerID: string;
    leagueID: string;
    targetName: string;
    submitted: boolean;
  }>({
    playerID: "",
    leagueID: "",
    targetName: "",
    submitted: false
  });

  const handleFormSubmit = (playerID: string, leagueID: string, targetName: string) => {
    setFormData({
      playerID,
      leagueID,
      targetName,
      submitted: true
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {!formData.submitted ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold tracking-tight gradient-heading sm:text-5xl md:text-6xl">
                Fantasy Football Strategist
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Get AI-powered insights to outrank your fantasy football competitors and dominate your league.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">League Analysis</h3>
                <p className="text-gray-500">Connect your fantasy league to get personalized team analysis and insights.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Competitive Edge</h3>
                <p className="text-gray-500">Target specific competitors and get strategies to outrank them in your league.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 rounded-full mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Strategist</h3>
                <p className="text-gray-500">Chat with our AI coach to get custom advice on trades, lineups, and waiver pickups.</p>
              </div>
            </div>
            
            <div className="mt-12">
              <IdForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-heading">
                Strategy Session
              </h2>
              <p className="mt-2 text-gray-600">
                Chat with your AI coach to develop strategies for outranking {formData.targetName}
              </p>
            </div>
            
            <ChatInterface 
              playerID={formData.playerID} 
              leagueID={formData.leagueID} 
              targetName={formData.targetName} 
            />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
