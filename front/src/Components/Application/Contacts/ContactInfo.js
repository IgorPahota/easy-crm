import React, {Component} from 'react';

class ContactInfo extends Component {


  render() {
    const id = parseInt(this.props.match.params.id);
    return (
      <div>
        <h1>Карточка юзера id: {id}</h1>
      </div>
    );
  }
}

export default ContactInfo;
