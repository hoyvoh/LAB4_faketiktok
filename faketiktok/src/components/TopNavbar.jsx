import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const TopNavbar = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      // Trigger the search and check if results exist
      const hasResults = onSearch(searchTerm);
      if (!hasResults) {
        setIsError(true);
        // Remove error state after animation completes
        setTimeout(() => setIsError(false), 500);
      }
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchTerm("");
      setIsError(false);
      onSearch("");
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (isError) {
      setIsError(false);
    }
  };

  return (
    <div className="top-navbar">
      {!isSearchOpen ? (
        <>
          <FontAwesomeIcon icon={faTv} className="icon" />
          <h2>
            Following | <span>For You</span>
          </h2>
          <FontAwesomeIcon
            icon={faSearch}
            className="icon"
            onClick={toggleSearch}
          />
        </>
      ) : (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search hashtags..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleSearch}
            className={isError ? "error shake" : ""}
            autoFocus
          />
          <FontAwesomeIcon
            icon={faTimes}
            className="icon"
            onClick={toggleSearch}
          />
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
