import React, { useState, useEffect } from "react";
import Header from "./Header";
import Web3 from "web3";
import "./MyPage.css";
import Pic from "./Pic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import GetMyNFT from "../Functions/GetMyNFT";
import axios from "axios";

let myTokenList = [];

const MyPage = () => {
  useEffect(() => {
    GetMyNFT()
      .then(async (result) => {
        const { myTokens, myTokenId } = result;
        for (let i = 0; i < myTokens.length; i++) {
          let myTokenJson = await axios.get(myTokens[i]);
          myTokenJson.data.id = myTokenId[i];
          myTokenList.push(myTokenJson.data);
        }
        console.log({ myTokenList });
      })
      .then(() => {
        setPics(myTokenList);
        myTokenList = [];
      })
      .then(setIsLoading(false));
  }, []);

  const [pics, setPics] = useState([]);
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const list = pics.map((el, idx) => (
    <Pic
      key={idx}
      name={el.title}
      desc={el.description}
      src={el.image}
      idx={el.id}
    />
  ));

  const initWeb3 = async () => {
    if (window.ethereum) {
      //메타마스크 최신버전이 있다면
      const web3 = new Web3(window.ethereum);
      try {
        const account = await web3.eth.getAccounts();
        setAccount(account);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // const accounts = ethereum.

  return (
    <div className="container">
      <Header />
      <div className="user">
        <h1>
          <FontAwesomeIcon icon={faCircleUser} className="logo" size="4x" />
        </h1>
      </div>
      <div className="name">
        <h2>Unnamed</h2>
      </div>
      <div className="account">
        <h4>
          <FontAwesomeIcon icon={faEthereum} className="logo" size="2x" />
          {account}
          {account === "" ? (
            <button onClick={() => initWeb3()}>계정보기</button>
          ) : (
            <button onClick={() => navigator.clipboard.writeText(account)}>
              계정 복사
            </button>
          )}
        </h4>
      </div>
      <h3>Collected</h3>
      <div className="pics">{list}</div>
    </div>
  );
};

export default MyPage;
