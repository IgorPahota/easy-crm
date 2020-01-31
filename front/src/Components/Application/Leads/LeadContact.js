import React, { Component } from "react";
import { Card } from "antd";

class LeadContact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { contact, id } = this.props;
    return (
      <Card
        title="Card title"
        bordered={false}
        style={{ width: 300 }}
        className="lead-card"
      >
        <div>
        <p>
          {contact.name}
          </p>  
        <p>
          {contact.comapny}
          </p>  
        <p>
          {contact.companyDetails}
          </p>  
        <p>
          {contact.name}
          </p> 
          <p>{contact.phone}</p>
        </div>
      </Card>
    );
  }
}

export default LeadContact;
