import React from "react";
import "./ProfileNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const ProfileNavbar = ({ username, onBack }) => {
  return (
    <div className="profile-navbar">
      <div className="nav-left">
        <FontAwesomeIcon icon={faAngleLeft} className="icon" onClick={onBack} />
        <h2>{username}</h2>
      </div>
      <div className="nav-right">
        <FontAwesomeIcon icon={faBell} className="icon" />
        <button className="more-button">⋮</button>
      </div>
    </div>
  );
};

export default ProfileNavbar;
