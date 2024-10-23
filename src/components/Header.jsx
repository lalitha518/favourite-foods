import React, { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import Search from "./Search";

const Header = ({ listOfRes, setListOfRes, originalList }) => {
  const [buttonName, setButtonName] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Search
              listOfRes={listOfRes}
              setListOfRes={setListOfRes}
              originalList={originalList}
            />
          </li>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <li
            className="login-btn"
            onClick={() => {
              buttonName === "Login"
                ? setButtonName("Logout")
                : setButtonName("Login");
            }}
          >
            {buttonName}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
