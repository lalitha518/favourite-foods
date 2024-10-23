import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ listOfRes, setListOfRes, originalList }) => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleInputVisibility = () => {
    setInputVisible((prev) => !prev);
  };

  const handleSearch = () => {
    toggleInputVisibility();
    const filterRes = originalList.filter((res) =>
      res.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setListOfRes(filterRes);
  };

  return (
    <div className="search-container">
      {isInputVisible && (
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
      )}
      <FontAwesomeIcon
        icon={faSearch}
        className="search-icon"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Search;
