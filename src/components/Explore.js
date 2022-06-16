import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Explore.css";
import Pic from "./Pic";
import GetAllNFT from "../Functions/GetAllNFT";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSearch } from "@fortawesome/free-solid-svg-icons";

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
      })
      .then(() => setIsLoading(false));
  }, []);
  const [pics, setPics] = useState([]);
  const [searchingValue, setSearchingValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [warning, setWarning] = useState(false);

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
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="searchWrap">
          <div className="search">
            <input
              placeholder="whar are you looking for?"
              className="searchTerm"
              type="text"
              value={searchingValue}
              onChange={async (e) => {
                setSearchingValue(e.target.value);
              }}
            />
            <button type="submit" className="searchButton">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div>
          {warning ? (
            <div style={{ width: "100vw", height: "40vh" }}>
              <h1>소용 없습니다.</h1>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "30vh",
              }}
            >
              <h1>Now Loading...</h1>
              <div
                style={{
                  width: "100px",
                  height: "60px",
                  backgroundColor: "pink",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  cursor: "pointer",
                  borderRadius: "25px",
                  marginLeft: "20px",
                }}
                onClick={() => {
                  setWarning(true);
                }}
              >
                <h2>가속화</h2>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="pics">{list}</div>
      )}
    </div>
  );
};

export default Explore;
