import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Logout from "../../Landing/Logout/Logout";

class ApplicationNavbar extends Component {
    render() {
        return (
            <div>
                <NavLink to={'/dashboard'}>Dashboard</NavLink>
                <NavLink to={'/contacts'}>Contacts</NavLink>
                <Logout/>
            </div>
        );
    }
}

export default ApplicationNavbar;