import React, { Component } from 'react';

class Contacts extends Component {
  state = {
    data: []
  };

  componentDidMount = async () => {
    const response = await fetch ('/contacts');
    const contacts = await response.json ();
    this.setState({
      data: contacts,
    });
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>company</th>
              <th>companyDetails</th>
              <th>email</th>
              <th>phone</th>
              <th>address</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data && this.state.data.map((contact, idx) => {
              return (
                <tr key={idx}>
                  <td>{contact.name}</td>
                  <td>{contact.company}</td>
                  <td>{contact.companyDetails}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.address}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Contacts;
