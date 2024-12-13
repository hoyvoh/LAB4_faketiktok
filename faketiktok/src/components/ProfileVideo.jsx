import React from "react";
import "./ProfileVideo.css";

const ProfileVideo = ({ video }) => {
  return (
    <div className="profile-video-card">
      <div className="video-thumbnail">
        <video src={video.url} />
      </div>
    </div>
  );
};

export default ProfileVideo;
