import React, {Component} from 'react';

class LeadContact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  const {contact, id} = this.props;
    return (
      <div>
        {contact.name} <br />
       {contact.phone}<br />
        {contact.company}<br />
    {contact.companyDetails}<br />
        <p>{contact.phone}</p>
      </div>
    );
  }
}

export default LeadContact;
