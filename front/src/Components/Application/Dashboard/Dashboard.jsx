import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'


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
        Dashboard
        {!this.props.isLoggedIn && <Redirect to={'login'}/>}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn
  }
}

export default connect(mapStateToProps)(Dashboard);
