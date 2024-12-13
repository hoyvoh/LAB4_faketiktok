import React from "react";
import "./ProfileNavbar.css";

const ProfileNavbar = ({ username, onBack }) => {
  return (
    <div className="profile-navbar">
      <div className="nav-left">
        <button className="back-button" onClick={onBack}>←</button>
        <h2>{username}</h2>
      </div>
      <div className="nav-right">
        <button className="notification-button">🔔</button>
        <button className="more-button">⋮</button>
      </div>
    </div>
  );
};

export default ProfileNavbar;
