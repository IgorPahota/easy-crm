import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div>
                <NavLink to={"/login"} activeClassName={"active"}>Login</NavLink>
                <NavLink to={"/signup"} activeClassName={"active"}>Signup</NavLink>
            </div>
        );
    }
}

export default Navbar;