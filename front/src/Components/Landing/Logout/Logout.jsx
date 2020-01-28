import React, { Component } from "react";
import { connect } from "react-redux";
import { loggedOut } from "../../../redux/loggedOut";
import { message, Button } from "antd";

class Logout extends Component {
  logoutFetch = async () => {
    let response = await fetch("/logout");
    let result = await response.json();
    if (!result.isLoggedIn) {
      this.props.set();
      // message.warning('Вы вышли из системы');
      message.warning("You logged out");
    } else alert(result.error);
  };

  render() {
    return (
      <div>
        <Button onClick={this.logoutFetch}>Logout</Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: () => {
      dispatch(loggedOut());
    }
  };
}

export default connect(null, mapDispatchToProps)(Logout);
