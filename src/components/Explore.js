import React, { useState } from "react";
import Header from "./Header";
import "./Exploler.css";
import Pic from "./Pic";

const Explore = () => {
  const [pics, setPics] = useState([1, 2, 3, 4, 5, 6, 7]);

  const list = pics.map((el) => <Pic picture={el} />);

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
