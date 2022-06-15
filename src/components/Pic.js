import React from "react";
import "./Pic.css";

const Pic = ({ title, desc, src }) => {
  return (
    <div className="pic" style={{ borderRadius: "14px", overflow: "hidden" }}>
      <img src={src} alt="test" style={{ width: "300px", height: "300px" }} />
    </div>
  );
};

export default Pic;
