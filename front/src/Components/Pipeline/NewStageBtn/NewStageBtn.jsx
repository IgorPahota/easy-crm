import React, { Component } from "react";

export default class NewStageBtn extends Component {
  // addnewStage = e => {
  //   e.preventDefault();
  //   const semiRandomId =
  //     Math.floor(Math.random() * 100 + 1) * Math.floor(Math.random() * 100 + 1);
  //   const newTask = {
  //     id: `${this.state.label}${semiRandomId}`,
  //     task: this.state.label,
  //     status: false
  //   };
  //   const taskArray = this.state.tasks;

  //   taskArray.push(newTask);
  //   this.setState({ tasks: taskArray, label: "" });
  // };

  // addnewStage = e => {
  //   e.preventDefault();
  //   const columns = this.props.columnsFromBackend;
  //   const column = {
  //     name: undefined,
  //     items: []
  //   };
  //   const taskArray = this.state.tasks;

  //   taskArray.push(newTask);
  //   this.setState({ tasks: taskArray, label: "" });
  // };

  render() {
    return (
      <button
        onClick={this.addnewStage}
        style={{
          width: "258px",
          height: "50px",
          borderRadius: "8px",
          margin: "78px 0 0 8px",
          outline: "none",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "bold",
          fontSize: "16px"
        }}
      >
        + Add new STAGE
      </button>
    );
  }
}
