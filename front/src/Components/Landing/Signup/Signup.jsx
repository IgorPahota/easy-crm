import React, { Component } from "react";
import { connect } from "react-redux";
import { loggedIn } from "../../../redux/loggedIn";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      email: undefined,
      password: undefined
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/login");
    let result = await response.json();
    if (result.isLoggedIn) {
      alert("you already logged in");
      let arrayWithProps = [result.username, result.email, result.id];
      this.props.set(arrayWithProps);
    } else {
      alert("login please");
    }
  };

  getUsernameForRegistration = e => {
    this.setState({
      username: e.target.value
    });
  };

  getEmailForRegistration = e => {
    this.setState({
      email: e.target.value
    });
  };

  getPasswordForRegistration = e => {
    this.setState({
      password: e.target.value
    });
  };

  signupFetch = async () => {
    let response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    });
    let result = await response.json();
    if (result.isLoggedIn) {
      alert("signup true");
      let arrayWithProps = [result.username, result.email, result.id];
      this.props.set(arrayWithProps);
    } else {
      alert("signup false");
    }
  };

  render() {
    return (
      <div>
        Signup
        <input
          placeholder="Enter your name"
          onChange={this.getUsernameForRegistration}
          value={this.state.username}
        />
        <input
          placeholder="Enter your email"
          onChange={this.getEmailForRegistration}
          value={this.state.email}
        />
        <input
          placeholder="Enter your password"
          onChange={this.getPasswordForRegistration}
          value={this.state.password}
        />
        <button onClick={this.signupFetch}>Register</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: data => {
      dispatch(loggedIn(data));
    }
  };
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
