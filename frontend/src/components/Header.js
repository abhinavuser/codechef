import React from 'react';
import './styles.css';

function Header({ activeTab, setActiveTab }) {
  return (
    <div className="header">
      <h1>Leaderboard</h1>
      <div className="tabs">
        <button
          onClick={() => setActiveTab('organisation')}
          className={activeTab === 'organisation' ? 'active' : ''}
        >
          Organisation
        </button>
        <button
          onClick={() => setActiveTab('department')}
          className={activeTab === 'department' ? 'active' : ''}
        >
          Department
        </button>
      </div>
    </div>
  );
}

export default Header;
