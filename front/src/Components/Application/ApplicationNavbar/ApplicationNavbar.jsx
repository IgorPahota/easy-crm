import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Logout from "../../Landing/Logout/Logout";
import {connect} from 'react-redux'


class ApplicationNavbar extends Component {
    render() {
        return (
            <div>
                <NavLink to={'/dashboard'}>Dashboard</NavLink>
                <NavLink to={'/contacts'}>Contacts</NavLink>
                <Logout/>
                {this.props.username}
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        username: store.username
    }
}

export default connect(mapStateToProps)(ApplicationNavbar);