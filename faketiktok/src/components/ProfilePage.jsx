import React, { useState } from "react";
import ProfileNavbar from "./ProfileNavbar";
import ProfileVideo from "./ProfileVideo";
import "./ProfilePage.css";

const ProfilePage = ({ profileData, videos, username, onBack }) => {
  const [activeTab, setActiveTab] = useState("videos");

  const userVideos = videos.filter((video) => video.username === username);
  return (
    <div className="profile-page">
      <ProfileNavbar username={`@${username}`} onBack={onBack} />

      <div className="profile-info">
        <div className="profile-avatar">
          <img src={profileData.profilePic} alt="profile" />
        </div>

        <b className="profile-username">@{username}</b>

        <div className="profile-actions">
          <button className="follow-button">Follow</button>
          <button className="message-button">Message</button>
        </div>
      </div>

      <div className="profile-tabs">
        <div
          className={`tab ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </div>
        <div
          className={`tab ${activeTab === "liked" ? "active" : ""}`}
          onClick={() => setActiveTab("liked")}
        >
          Liked
        </div>
      </div>

      <div className="profile-content">
        {activeTab === "videos" && (
          <div className="videos-grid">
            {userVideos.map((video, index) => (
              <ProfileVideo key={index} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
