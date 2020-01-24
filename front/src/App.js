import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLanding from "./Components/Landing/MainLanding/MainLanding";
import Pipeline from "./Components/Pipeline/Pipeline";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={MainLanding} />
            <Route path="/leads" component={Pipeline} />
          </Switch>
        </div>
      </Router>
    );
  }
}
