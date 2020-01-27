import React, {Component} from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import Login from "./Components/Landing/Login/Login";
import Signup from "./Components/Landing/Signup/Signup";
import Dashboard from "./Components/Application/Dashboard/Dashboard";
import ContactsList from './Components/Application/Contacts/ContactsList';
import LandingNavbar from "./Components/Landing/LandingNavbar/LandingNavbar";
import {loggedIn} from "./redux/loggedIn";
import ApplicationNavbar from "./Components/Application/ApplicationNavbar/ApplicationNavbar";
import './App.css';
import ContactInfo from './Components/Application/Contacts/ContactInfo';


class App extends Component {
    componentDidMount = async () =>  {
        let response = await fetch('/login');
        let result = await response.json();
        if (result.isLoggedIn) {
            // alert('you already logged in');
            let arrayWithProps = [result.username, result.email, result.id];
            this.props.set(arrayWithProps)
        } else {
            // alert('login please')
        }
    };
    render() {

        return (
          <ConfigProvider locale={ruRU}>
            <Router>
            <div className="App">
                APP.JS
                {!this.props.isLoggedIn && <LandingNavbar/>}
                {this.props.isLoggedIn && <ApplicationNavbar/>}
                <Switch>
                    <Route  path='/login' component={Login}/>
                    <Route  path='/signup' component={Signup}/>
                    <Route  path='/dashboard' component={Dashboard}/>
                    <Route exact path='/contacts' component={ContactsList}/>
                    <Route path="/contacts/:id" component={ContactInfo} />
                    {/*<Route render={()=>{*/}
                    {/*    return (*/}
                    {/*        <Redirect to={'/login'}/>*/}
                    {/*    )*/}
                    {/*}}/>*/}
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
    }
}

function mapDispatchToProps (dispatch) {
    return {
        set: (data) => {
            dispatch(loggedIn(data))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
