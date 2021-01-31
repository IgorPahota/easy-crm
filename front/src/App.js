import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ConfigProvider } from "antd";
import ruRU from "antd/es/locale/ru_RU";
import Login from "./Components/Landing/Login/Login";
import Signup from "./Components/Landing/Signup/Signup";
import Dashboard from "./Components/Application/Dashboard/Dashboard";
import ContactsList from "./Components/Application/Contacts/ContactsList";
import LandingNavbar from "./Components/Landing/LandingNavbar/LandingNavbar";
import { loggedIn } from "./redux/loggedIn";
// Адски длинные пути к компонентам. Можете подсократить как-нибудь?
import ApplicationNavbar from "./Components/Application/ApplicationNavbar/ApplicationNavbar";
import ContactInfo from "./Components/Application/Contacts/ContactInfo";
import Leads from "./Components/Application/Leads/Leads";
import LeadCard from "./Components/Application/Leads/LeadCard";
import "./App.scss";

class App extends Component {

  componentDidMount = async () => {
    let response = await fetch("/login");
    let result = await response.json();
    if (result.isLoggedIn) {
      const response = await fetch(`/contacts/created/${result.id}`);
      const contacts = await response.json();
      console.log('>>>', contacts)
      let arrayWithProps = [result.username, result.email, result.id, contacts, result.type];
      this.props.set(arrayWithProps);

    }
  };
  render() {
    return (
      <ConfigProvider locale={ruRU}>
        <Router>
          <div className="App">
            {!this.props.isLoggedIn && <LandingNavbar />}
            {!this.props.isLoggedIn && <Redirect to={'/login'}/>}
            {this.props.isLoggedIn && <ApplicationNavbar />}
            <Switch>
              {/* Лучше делать exact по возможности */}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/contacts/:id" component={ContactInfo} />
              <Route path="/contacts" component={ContactsList} />
              <Route path="/leadcard" component={LeadCard} />
              <Route exact path="/leads/:id" component={LeadCard}/>
              <Route exact path="/leads" component={Leads} />
            </Switch>
          </div>
        </Router>
      </ConfigProvider>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    set: data => {
      dispatch(loggedIn(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
