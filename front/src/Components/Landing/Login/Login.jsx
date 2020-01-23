import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined
        }
    }

    getEmailForLogin = (e) => {
        this.setState({
            email: e.target.value
        })
    };

    getPasswordForLogin = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    loginFetch = async () => {
        let response = await fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        });
        let result = await response.json();
    }


    render() {
        return (
            <div>
                Login
                <input placeholder="email" onChange={this.getEmailForLogin} value={this.state.email}/>
                <input placeholder="password" onChange={this.getPasswordForLogin} value={this.state.password}/>
                <button onClick={this.loginFetch}>Login</button>
            </div>
        );
    }
}

export default Login;