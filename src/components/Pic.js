import React from "react";
import "./Pic.css";

const Pic = ({ picture }) => {
  return (
    <div className="pic">
      <h1>{picture}</h1>
    </div>
  );
};

export default Pic;
