import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Exploler.css";
import Pic from "./Pic";
import GetAllNFT from "../Functions/GetAllNFT";
import axios from "axios";

let allJson = [];

const Explore = () => {
  useEffect(() => {
    GetAllNFT()
      .then(async (allTokenJsonURL) => {
        console.log("getting json...");
        for (let i = 0; i < allTokenJsonURL.length; i++) {
          const json = await axios.get(allTokenJsonURL[i]);
          allJson.push(json.data);
        }
        console.log(allJson);
      })
      .then(() => {
        setPics(allJson);
        allJson = [];
      });
  }, []);
  const [pics, setPics] = useState([]);

  const list = pics.map((el, idx) => (
    <Pic key={idx} title={el.name} desc={el.desc} src={el.image} />
  ));

  return (
    <div className="container">
      <Header />
      <div className="desc">
        <h1>It's our Collection!</h1>
      </div>
      <div className="pics">{list}</div>
    </div>
  );
};

export default Explore;
