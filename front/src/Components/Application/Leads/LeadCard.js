import React, {Component} from 'react';
import {AutoComplete, Button} from 'antd';
import {connect} from 'react-redux';
import AddLeadContact from '../../../redux/addToLead';
import DeleteContactFromLead from '../../../redux/deleteFromLead';
import LeadContact from './LeadContact';

class LeadCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      dataSource: '',
      leadDetails: '',
      isLoading: true,
      contact: ''
    }
  }

  componentDidMount() {
      fetch(this.props.idLeadForRedirect)

        .then(res => res.json())
        .then(leadDetails =>
          this.setState({leadDetails: leadDetails.lead, isLoading: false}));
    console.log(this.state.leadDetails)
    }

  fetchAddContactToLead = async (contactId) => {
    const response = await fetch(`/leads/contacts/${this.props.idLeadForRedirect}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contactId
      })
    });

    const data = await response.json();
    if (data) {
      console.log('data after add to db', data);
      const leadContactsForProps = data.upd;
      this.props.addContactToLead(leadContactsForProps)
    } else {
      console.log('Wrong username or password!');
    }
  };

  fetchDeleteContactFromLead = async (contactId) => {
    const response = await fetch(`/leads/contacts/${this.props.idLeadForRedirect}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contactId
      })
    });

    const data = await response.json();
    if (data) {
      console.log('data after delete from db', data)
      const idForDelete = data.updatedLead.leadcontacts._id;
      this.props.deleteContactFromLead(idForDelete);
    } else {
      console.log('Wrong username or password!');
    }
  };

    onSelect = (value) => {
      this.setState({value});
      // this.props.addContactToLead(value);
    };

    submit = () => {
      this.fetchAddContactToLead( this.state.value);
    };

  delete = () => {
    this.fetchDeleteContactFromLead( this.state.value);
  };

    render() {
      const {isLoading} = this.state;
      const arr = [];
      const conts = this.props.contacts ? this.props.contacts.map((el) => {
        const {name: text, _id: value} = el;
        arr.push({text, value});
        return el
      }) : null;
      console.log('this.props.leadcontacts', this.props.leadcontacts)
      return (
        <div className="leads-font">
          {this.state.leadDetails ?
            <div>
              <AutoComplete
                style={{width: 200}}
                dataSource={arr}
                onSelect={this.onSelect}
                placeholder="Print"
                filterOption={(inputValue, option) =>
                  option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              />
              <Button type="primary"
                      onClick={this.submit}
                      style={{marginTop: '10px'}}>
               Добавить
              </Button>
              <Button type="primary"
                      onClick={this.delete}
                      style={{marginTop: '10px'}}>
               Удалить
              </Button>
              <p>Цена { this.state.leadDetails.price}</p>
              <p>Айди сделки{this.state.leadDetails.leadId}</p>
              <p>Имя {this.state.leadDetails.name}</p>
              <p>
                стейдж название (из попьюлейт) {this.state.leadDetails && this.state.leadDetails.stageId.title}
              </p>
              <p>Детали {this.state.leadDetails.details}</p>
              <p>Создатель {this.state.leadDetails.creatorId}</p>
              <p>Создана {this.state.leadDetails.created}</p>
              <p>Обновлена{this.state.leadDetails.updated}</p>
              {/*<p>Контакты{leadcontacts}</p>*/}

              <ul className="notes-list">
                {this.props.leadcontacts.map( (contact, i) =>
                  <LeadContact userId={contact._id}
                        contact={contact}
                        key={i}
                        id={contact._id}
                  />
                )}
              </ul>


            </div>
            :
            <h3>Loading</h3>
          }
        </div>
      );
    }
  };

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    leadcontacts: state.leadcontacts,
    idLeadForRedirect: state.idLeadForRedirect
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContactToLead: (contact) => {
      dispatch(AddLeadContact(contact))
    },
    deleteContactFromLead: (contact) => {
      dispatch(DeleteContactFromLead(contact))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadCard)
