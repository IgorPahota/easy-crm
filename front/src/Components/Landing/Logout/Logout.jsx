import React, {Component} from 'react';
import {connect} from 'react-redux'
import {loggedOut} from "../../../redux/loggedOut";
import { message, Button, Icon } from 'antd';
import {Redirect} from 'react-router-dom';

class Logout extends Component {

    logoutFetch = async () => {
        let response = await fetch('/logout');
        let result = await response.json();
        if (!result.isLoggedIn) {
            this.props.set();
            message.warning('Вы вышли из системы');
        } else alert(result.error)
    };

    render() {
        return (
            <div onClick={this.logoutFetch}>
                <Icon type="logout" />Выйти
                {/*<Button onClick={this.logoutFetch}>Logout</Button>*/}
                <Redirect to='login'/>
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
