import React from "react";
import "../../assets/css/preloader.css";

const Preloader = () => {
  return (
    <div className="preloader-container">
      <div className="cubicle-container">
        <div className="cubicle cubicle-1"></div>
        <div className="cubicle cubicle-2"></div>
        <div className="cubicle cubicle-3"></div>
        <div className="cubicle cubicle-4"></div>
      </div>
    </div>
  );
};

export default Preloader;
