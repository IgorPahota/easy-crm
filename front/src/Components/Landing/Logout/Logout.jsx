import React, {Component} from 'react';

class Logout extends Component {

    logoutFetch = async () => {
        let response = await fetch('/logout');
        let result = await response.json();
    };

    render() {
        return (
            <div>
                <button>Logout</button>
            </div>
        );
    }
}

export default Logout;