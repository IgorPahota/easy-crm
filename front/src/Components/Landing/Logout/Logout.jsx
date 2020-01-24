import React, {Component} from 'react';
import {connect} from 'react-redux'
import {loggedOut} from "../../../redux/loggedOut";

class Logout extends Component {

    logoutFetch = async () => {
        let response = await fetch('/logout');
        let result = await response.json();
        if (!result.isLoggedIn) {
            this.props.set();
            alert('you are logged out')
        } else alert(result.error)
    };

    render() {
        return (
            <div>
                <button onClick={this.logoutFetch}>Logout</button>
            </div>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        set: () => {
            dispatch(loggedOut())
        }
    }
}

export default connect(null, mapDispatchToProps)(Logout);