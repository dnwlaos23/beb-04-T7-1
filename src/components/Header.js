import React, { Component } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolarPanel } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div>
        <div>
          <h2>
            <FontAwesomeIcon icon={faSolarPanel} className="logo" /> T-7 NFT
            Market
          </h2>
        </div>
      </div>
      <nav>
        <div className="ulDiv">
          <ul className="ul">
            <NavLink to="/explore" className="NavLink">
              <li>Explore</li>
            </NavLink>
            <NavLink to="/create" className="NavLink">
              <li>Create</li>
            </NavLink>
            <NavLink to="/mypage" className="NavLink">
              <li>My Page</li>
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
