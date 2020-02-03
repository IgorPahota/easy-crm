import React, {Component} from 'react';
import {Button, Icon} from 'antd';

class LeadContact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {contact, id} = this.props;
    return (
      <div>
        <p>
        {contact.name} <br/>
        {contact.phone}<br/>
        {contact.company}<br/>
        {contact.companyDetails}<br/>
        {contact.phone}<br />
          <Button size="small" onClick={() => this.props.onDeleted(id)}>
            <Icon type="delete" theme="outlined" />
          </Button>
        </p>
      </div>
    );
  }
}

export default LeadContact;
