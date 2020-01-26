import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class LandingNavbar extends Component {
    render() {
        return (
            <div>
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/signup'}>Signup</NavLink>
            </div>
        );
    }
}

export default LandingNavbar;