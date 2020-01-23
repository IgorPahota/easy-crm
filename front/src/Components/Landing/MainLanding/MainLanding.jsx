import React, {Component} from 'react';
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "../Navbar/Navbar";


class MainLanding extends Component {
    render() {
        return (
            <Router>
            <Navbar/>
            <div>
                <Route path={"/login"} component={Login}/>
                <Route path={"/signup"} component={Signup}/>
            </div>
            </Router>
        );
    }
}

export default MainLanding;