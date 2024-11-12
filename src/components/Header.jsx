import React, { useState } from "react";
import { useAppContext } from "../myContext";
import { LOGO_URL } from "../utils/constants";
import Search from "./Search";
import { Link } from "react-router-dom";

const Header = () => {
  const { listOfRes, setListOfRes, originalList } = useAppContext();
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
          <li><Link to="/" className="nav-link">Home</Link> </li>
          <li><Link to="/about" className="nav-link">About Us</Link> </li>
          <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
          <li><Link to="/cart" className="nav-link">Cart</Link></li>
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
