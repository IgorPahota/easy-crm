import React, { Component } from 'react';

class Dashboard extends Component {

  state = {
    leads: []
  };

  componentDidMount = async () => {
    let response = await fetch('/leads');
    let leads = await response.json();
    this.setState({ leads })
  };

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Dashboard;
