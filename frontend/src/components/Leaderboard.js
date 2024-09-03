import React from 'react';
import TopThree from './TopThree';
import UserList from './UserList';
import './styles.css';

function Leaderboard({ topThreeUsers, otherUsers }) {
  return (
    <div className="leaderboard">
      <TopThree users={topThreeUsers} />
      <UserList users={otherUsers} />
    </div>
  );
}

export default Leaderboard;
