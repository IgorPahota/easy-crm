import React, {Component} from 'react';

class LeadContact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  const {contact} = this.props;
    return (
      <div>
        {/* br - это прекрасно */}
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
