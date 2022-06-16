import React, { Component } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolarPanel } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import Web3 from "web3";

async function checkAccount() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      const account = await web3.eth.getAccounts();
      if (account[0] !== undefined) {
        alert(`Your Wallet is connected! address is ${account[0]}`);
      } else if (account[0] === undefined) {
        alert(`Your Wallet is not connected, please check Metamask`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const Header = () => {
  return (
    <div className="header">
      <div>
        <div>
          <NavLink to="/" className="logoWrapper">
          <h2>
            <FontAwesomeIcon icon={faSolarPanel} className="logo" /> T-7 NFT Market
          </h2>
          </NavLink>
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
            <div
              style={{ cursor: "pointer", marginRight: "30px" }}
              onClick={() => checkAccount()}
            >
              <li>
                <FontAwesomeIcon icon={faWallet} size="3x" color="orange" />
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
