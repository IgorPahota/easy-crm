import React from "react";
import spinner from "./spinner.gif";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-picture">
      <img
        src={spinner}
        alt="loading_picture"
      ></img>
    </div>
  );
}
