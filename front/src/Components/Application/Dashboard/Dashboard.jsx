import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from "react-router-dom";

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
    let sum = 0;
    const {leads} = this.state
    leads.map(lead => sum += lead.price);
    const numberOfLeads = leads.length;
    return (
      <div>
        <h3>Your leads</h3>
        <p>Общая сумма: { sum }</p>
        <p> Всего сделок: { numberOfLeads } </p>
        {leads.map((lead) =>
          <div key={lead.id}>
            <Link to={`/lead/${lead.id}`}>{lead.name}</Link>
          </div>
        )}
      </div>
    );
  }
}

// export default connect(mapStateToProps)(Dashboard);
export default Dashboard;
