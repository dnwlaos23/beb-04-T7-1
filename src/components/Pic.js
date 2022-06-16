import React from "react";
import "./Pic.css";
import { NavLink } from "react-router-dom";

const Pic = ({ title, desc, src, idx }) => {
  return (
    <NavLink to={`/viewNFT/${idx}`}>
      <div className="pic" style={{ borderRadius: "14px", overflow: "hidden" }}>
        <img src={src} alt="test" style={{ width: "300px", height: "300px" }} />
      </div>
    </NavLink>
  );
};

export default Pic;
