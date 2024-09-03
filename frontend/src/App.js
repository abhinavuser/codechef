import React, { useState } from 'react';
import Leaderboard from './Leaderboard';
import Header from './Header';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('organisation');

  const topThreeUsers = [
    { name: 'Eiden', points: 2430, image: 'eiden.png', crown: true },
    { name: 'Jackson', points: 1847, image: 'jackson.png' },
    { name: 'Emma Aria', points: 1674, image: 'emma.png' },
  ];

  const otherUsers = [
    { rank: 4, name: 'Sebastian', points: 1124 },
    { rank: 5, name: 'Jason', points: 875 },
    { rank: 6, name: 'Natalie', points: 774 },
    { rank: 7, name: 'Serenity', points: 723 },
    { rank: 8, name: 'Hannah', points: 559 },
  ];

  return (
    <div className="App">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <Leaderboard topThreeUsers={topThreeUsers} otherUsers={otherUsers} />
    </div>
  );
}

export default App;
