import React from 'react';
import './styles.css';

function TopThree({ users }) {
  return (
    <div className="top-three">
      {users.map((user, index) => (
        <div className={`user-card ${index === 0 ? 'first' : ''}`} key={user.name}>
          {index === 0 && <div className="crown">👑</div>}
          <img src={user.image} alt={user.name} className="profile-image" />
          <div className="user-details">
            <h2>{user.name}</h2>
            <p>{user.points}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopThree;
