import React, { Component } from "react";

export default class NewLeadBtn extends Component {

  render() {
    return (
      <button
        style={{
          width: "258px",
          height: "50px",
          borderRadius: "8px",
          outline: "none",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "bold",
          fontSize: "16px"
        }}
      >
        + Add new LEAD
      </button>
    );
  }
}
