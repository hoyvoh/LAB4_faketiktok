/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import ProfilePage from "./components/ProfilePage";

// This array holds information about different videos
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("./videos/video2.mp4"),
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("./videos/video3.mp4"),
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("./videos/video4.mp4"),
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [profilePic, setProfilePic] = useState(
    "https://th.bing.com/th/id/OIP.Xw2rxMmQ9g2ZAFMjomWnHAAAAA?w=220&h=248&rs=1&pid=ImgDetMain"
  );
  const [filteredVideos, setFilteredVideos] = useState([]);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentProfileUser, setCurrentProfileUser] = useState("");

  useEffect(() => {
    setVideos(videoUrls);
    setFilteredVideos(videoUrls);
  }, []);

  const handleKeyPress = (e) => {
    const videoHeight = window.innerHeight;
    const currentScroll = containerRef.current?.scrollTop || 0;
    const currentIndex = Math.round(currentScroll / videoHeight);

    if (e.key === "ArrowRight" && !showProfile) {
      const currentVideo = filteredVideos[currentIndex];
      if (currentVideo) {
        // Pause current video
        if (videoRefs.current[currentIndex]) {
          videoRefs.current[currentIndex].pause();
          videoRefs.current[currentIndex].currentTime = 0;
        }
        setCurrentVideoIndex(currentIndex);
        setCurrentProfileUser(currentVideo.username);
        setShowProfile(true);
      }
    } else if (e.key === "ArrowLeft" && showProfile) {
      handleBack();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [showProfile, currentVideoIndex, filteredVideos]);

  const handleBack = () => {
    setShowProfile(false);
    setTimeout(() => {
      try {
        let playAttempted = false;

        // all video stop first
        videoRefs.current.forEach((video) => {
          if (video) {
            video.pause();
            video.currentTime = 0;
            video.muted = true;
          }
        });

        // Scroll to current video position
        if (containerRef.current) {
          const videoHeight = window.innerHeight;
          containerRef.current.scrollTop = currentVideoIndex * videoHeight;

          // Play the current video
          const currentVideo = videoRefs.current[currentVideoIndex];
          if (currentVideo && !playAttempted) {
            playAttempted = true;

            const playVideo = async () => {
              try {
                currentVideo.muted = true;
                await currentVideo.play();
                currentVideo.muted = false;
              } catch (error) {
                if (error.name === "NotAllowedError") {
                  // Keep video muted
                  currentVideo.muted = true;
                  try {
                    await currentVideo.play();
                  } catch (err) {
                    console.log("Muted playback error:", err);
                  }
                } else if (error.name !== "AbortError") {
                  console.log("Playback error:", error);
                }
              }
            };

            setTimeout(playVideo, 100);
          }
        }
      } catch (error) {
        console.log("Error in handleBack:", error);
      }
    }, 100);
  };

  const handleAvatarUpdate = (newAvatar) => {
    setProfilePic(newAvatar); // Update the global avatar state
  };

  const setupIntersectionObserver = () => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target;
        const index = parseInt(videoElement.dataset.index);

        if (entry.isIntersecting && !showProfile) {
          // Pause all other videos
          videoRefs.current.forEach((video, i) => {
            if (video && i !== index) {
              video.pause();
              video.currentTime = 0;
            }
          });

          // Mute first, play, then unmute
          videoElement.muted = true;
          videoElement
            .play()
            .then(() => {
              videoElement.muted = false;
              setCurrentVideoIndex(index);
            })
            .catch((error) => {
              if (error.name === "NotAllowedError") {
                // Keep video muted but playing if autoplay is blocked
                videoElement.muted = true;
                videoElement
                  .play()
                  .catch((err) => console.log("Muted playback error:", err));
              }
            });
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    return observer;
  };

  useEffect(() => {
    const observer = setupIntersectionObserver();

    // Observe all video elements
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        observer.observe(videoRef);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredVideos, showProfile]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredVideos(videos);
      return true;
    }

    const filtered = videos.filter((video) =>
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      return false;
    }

    setFilteredVideos(filtered);

    // Reset scroll position when search results change
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    return true;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const y = e.pageY - containerRef.current.offsetTop;
    const walk = (y - startY) * 2; // Scroll speed multiplier
    containerRef.current.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // Snap to nearest video
    if (containerRef.current) {
      const videoHeight = window.innerHeight;
      const currentScroll = containerRef.current.scrollTop;
      const nearestVideo =
        Math.round(currentScroll / videoHeight) * videoHeight;

      containerRef.current.scrollTo({
        top: nearestVideo,
        behavior: "smooth",
      });
    }
  };

  const handleWheel = (e) => {
    const videoHeight = window.innerHeight;
    const currentScroll = containerRef.current.scrollTop;
    const direction = e.deltaY > 0 ? 1 : -1;

    const nextPosition =
      direction > 0
        ? Math.ceil(currentScroll / videoHeight) * videoHeight
        : Math.floor(currentScroll / videoHeight) * videoHeight;

    containerRef.current.scrollTo({
      top: nextPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Add wheel event listener with passive option
      container.addEventListener("wheel", handleWheel, { passive: true });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div className="app">
      <div
        ref={containerRef}
        className="container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {showProfile ? (
          <div className="profile-container">
            <ProfilePage
              profileData={{ profilePic }}
              videos={filteredVideos}
              username={currentProfileUser}
              onBack={handleBack}
            />
          </div>
        ) : (
          <>
            <TopNavbar className="top-navbar" onSearch={handleSearch} />
            {filteredVideos.map((video, index) => (
              <VideoCard
                key={index}
                username={video.username}
                description={video.description}
                song={video.song}
                likes={video.likes}
                saves={video.saves}
                comments={video.comments}
                shares={video.shares}
                url={video.url}
                profilePic={profilePic}
                setVideoRef={(ref) => {
                  if (ref) {
                    // Add index as data attribute
                    ref.dataset.index = index;
                    videoRefs.current[index] = ref;
                  }
                }}
                autoplay={index === currentVideoIndex}
                onAvatarUpdate={handleAvatarUpdate}
              />
            ))}
            <BottomNavbar className="bottom-navbar" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
