import React from "react";
import "./Main.css";
import Web3 from "web3";
import Header from "./Header";

const Main = () => {
  const connect = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await web3.eth.requestAccounts();
        console.log(accounts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="Main">
      <Header />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="connect" onClick={() => connect()}>
          <h1>Connect your wallet!</h1>
        </div>
      </div>
    </div>
  );
};

export default Main;
