import React from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const top3 = [
    { name: 'Eiden', points: 2430, rank: 1, imgSrc: 'E:/VS Code/codeChef-challenge/codechef/frontend/src/components/images/rank1.png' },
    { name: 'Jackson', points: 1847, rank: 2, imgSrc: './images/rank2.png' },
    { name: 'Emma Aria', points: 1674, rank: 3, imgSrc: './images/rank3.png' }
  ];

  const users = [
    { rank: 3, name: 'Sebastian', points: 1124, up: true },
    { rank: 4, name: 'Jason', points: 875, up: false },
    { rank: 5, name: 'Natalie', points: 774, up: true },
    { rank: 6, name: 'Serenity', points: 723, up: true },
    { rank: 7, name: 'Hannah', points: 559, up: false }
  ];

  return (
    <div className="leaderboard-container">
      <div className="header">
        <div className="back-icon">&lt;</div>
        <h1>Leaderboard</h1>
        <div className="menu-icon"><b>::</b></div>
      </div>
      <div className="tabs">
        <div className="tab active">Organisation</div>
        <div className="tab">Department</div>
      </div>
      
      <div className="main-content">
        <div className="top3-container">
          {top3.map(user => (
            <div key={user.rank} className={`top3-card rank-${user.rank}`}>
              <div className="profile-pic">
                {/* Replace with profile image */}
                <img src={user.imgSrc} alt={user.name} />
              </div>
              <div className="user-info">
                <h2>{user.name}</h2>
                <p>{user.points}</p>
              </div>
              {user.rank === 1 && (
                <div className="crown-icon">👑</div> // You can replace this with an image if preferred
              )}
            </div>
          ))}
        </div>

        <div className="users-list">
          {users.map(user => (
            <div key={user.rank} className="user-card">
              <div className="rank-circle">#{user.rank}</div>
              <div className="user-name">{user.name}</div>
              <div className="user-points">{user.points}</div>
              <div className={`user-icon ${user.up ? 'up' : 'down'}`}>
                {user.up ? '▲' : '▼'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
