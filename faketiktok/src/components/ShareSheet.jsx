import React from "react";
import "./ShareSheet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookMessenger,
  faThreads,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const ShareSheet = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const socialOptions = [
    {
      id: "messenger",
      name: "Messenger",
      icon: faFacebookMessenger,
      color: "#0099FF",
    },
    {
      id: "thread",
      name: "Thread",
      icon: faThreads,
      color: "#000000",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: faFacebook,
      color: "#1877F2",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: faInstagram,
      color: "#E4405F",
    },
  ];

  return (
    <div className="share-sheet-container">
      <div className="share-sheet-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="share-title">Share with</h2>
        <div className="share-section">
          <div className="share-options-grid">
            {socialOptions.map((option) => (
              <div key={option.id} className="share-option">
                <FontAwesomeIcon
                  icon={option.icon}
                  style={{ color: option.color }}
                />
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default ShareSheet;
