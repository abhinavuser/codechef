import React from 'react';
import './styles.css';

function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <div className="user-list-item" key={user.rank}>
          <div className="rank-circle">{user.rank}</div>
          <span className="user-name">{user.name}</span>
          <span className="user-points">{user.points}</span>
        </div>
      ))}
    </div>
  );
}

export default UserList;
