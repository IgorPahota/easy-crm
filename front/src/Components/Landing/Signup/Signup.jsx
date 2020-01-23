import React, {Component} from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            email: undefined,
            password: undefined
        }
    }

    getUsernameForRegistration = (e) => {
        this.setState({
            username: e.target.value
        })
    };

    getEmailForRegistration = (e) => {
        this.setState({
            email: e.target.value
        })
    };

    getPasswordForRegistration = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    signupFetch = async () => {
        let response = await fetch("/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        });
        let result = await response.json();
    };


    render() {
        return (
            <div>
                Signup
                <input placeholder='Enter your name' onChange={this.getUsernameForRegistration} value={this.state.username}/>
                <input placeholder='Enter your email' onChange={this.getEmailForRegistration} value={this.state.email}/>
                <input placeholder='Enter your password' onChange={this.getPasswordForRegistration} value={this.state.password}/>
                <button onClick={this.signupFetch}>Register</button>
            </div>
        );
    }
}

export default Signup;