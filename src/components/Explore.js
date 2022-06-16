import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Explore.css";
import Pic from "./Pic";
import GetAllNFT from "../Functions/GetAllNFT";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

let allJson = [];

const Explore = () => {
  useEffect(() => {
    allJson = [];
    GetAllNFT()
      .then(async (result) => {
        console.log("getting json...");
        const { allTokenId, allTokenJsonURL } = result;
        for (let i = 0; i < allTokenJsonURL.length; i++) {
          const json = await axios.get(allTokenJsonURL[i]);
          json.data.id = allTokenId[i];
          allJson.push(json.data);
        }
        console.log(allJson);
      })
      .then(() => {
        setPics(allJson);
      });
  }, []);
  const [pics, setPics] = useState([]);
  const [searching, isSearching] = useState(false);
  const [searchingValue, setSearchingValue] = useState("");

  const filtered =
    searchingValue === ""
      ? allJson
      : pics.filter((pic) =>
          [pic.name.toLowerCase(), pic.description.toLowerCase()].some((text) =>
            text.includes(searchingValue)
          )
        );

  // filtered();

  const list = filtered.map((el, idx) => (
    <Pic key={idx} title={el.name} desc={el.desc} src={el.image} idx={el.id} />
  ));

  return (
    <div className="container">
      <Header />
      <div className="desc">
        <h1>It's our Collection!</h1>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="logo"
          size="2x"
          onClick={() => isSearching(!searching)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {searching ? (
          <div
            style={{
              height: "40px",
              width: "300px",
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            <input
              style={{
                height: "40px",
                width: "300px",
                backgroundColor: "white",
                border: "hidden",
              }}
              type="text"
              value={searchingValue}
              onChange={async (e) => {
                setSearchingValue(e.target.value);
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="pics">{list}</div>
    </div>
  );
};

export default Explore;