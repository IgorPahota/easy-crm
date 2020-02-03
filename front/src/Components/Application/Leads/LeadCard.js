import React, {Component} from 'react';
import {AutoComplete, Button, Card} from 'antd';
import {connect} from 'react-redux';
import AddLeadContact from '../../../redux/addToLead';
import DeleteContactFromLead from '../../../redux/deleteFromLead';
import LeadContact from './LeadContact';
import AddLeadDetails from '../../../redux/addLeadDetails';
import FetchContactsToLead from '../../../redux/fetchContactsToLead';

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
      fetch(`/leads/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(leadDetails => {
          // console.log('leadDetails', leadDetails)
          this.props.addLeadDetails(leadDetails.lead);
          this.props.fetchToLead(leadDetails.lead.leadcontacts);
          this.setState({isLoading: false});
        })
  }

  fetchAddContactToLead = async (contactId) => {
    const response = await fetch(`/leads/contacts/${this.props.match.params.id}`, {
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
      const leadContactsForProps = data.upd;
      console.log('добавляем в leadcontacts', leadContactsForProps.name);
      this.props.addContactToLead(leadContactsForProps)
    } else {
      console.log('Wrong username or password!');
    }
  };

  fetchDeleteContactFromLead = async (contactId) => {
    const response = await fetch(`/leads/contacts/${this.props.match.params.id}`, {
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
      console.log(`удаляем id ${contactId} из leadcontacts, осталось`, data.updatedLead.leadcontacts.length);

      this.props.fetchToLead(data.updatedLead.leadcontacts);
    } else {
      console.log('Wrong username or password!');
    }
  };

    onSelect = (value) => {
      this.setState({value});
    };

    submit = () => {
      if (this.state.value) {
        this.fetchAddContactToLead(this.state.value);
      }
    };

    delete = (id) => {
      // this.deleteContactFromLead(id);
      this.fetchDeleteContactFromLead(id);
    };

    render() {
      const dataForAutocomplete = [];
      this.props.contacts && this.props.contacts.map(
        (el) => {
          const {name: text, _id: value} = el;
          dataForAutocomplete.push({text, value});
          return el;
      });

      return (
        <div className="leads-font">
          {this.props.leadDetails ?
            <div>
              <AutoComplete
                style={{width: 200}}
                dataSource={dataForAutocomplete}
                onSelect={this.onSelect}
                placeholder="Print"
                allowClear={true}
                filterOption={(inputValue, option) =>
                  option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              />
              <Button type="primary" onClick={this.submit} style={{marginTop: '10px'}}>
                Добавить
              </Button>
              <Button type="primary" onClick={this.delete} style={{marginTop: '10px'}}>
                Удалить
              </Button>
              <Card title="Card title" bordered={false} style={{ width: 300 }}>
                <p>Цена { this.props.leadDetails.price}</p>
                <p>Айди сделки{this.props.leadDetails.leadId}</p>
                <p>Имя {this.props.leadDetails.name}</p>
                <p>Этап {this.props.leadDetails && this.props.leadDetails.stageId.title}</p>
                <p>Детали {this.props.leadDetails.details}</p>
                <p>Создатель {this.props.leadDetails.creatorId}</p>
                <p>Создана {this.props.leadDetails.created}</p>
                <p>Обновлена{this.props.leadDetails.updated}</p>
              </Card>
              <ul className="notes-list">
                {this.props.leadcontacts && this.props.leadcontacts.map( (contact, i) =>
                  <LeadContact userId={contact._id}
                        contact={contact}
                        key={contact._id}
                        id={contact._id}
                               onDeleted={this.delete}
                  />
                )}
              </ul>
            </div> : <h3>No response from /leads/contacts/{this.props.match.params.id}</h3>
          }
        </div>
      );
    }
  }

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    leadcontacts: state.leadcontacts,
    idLeadForRedirect: state.idLeadForRedirect,
    leadDetails: state.leadDetails
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContactToLead: (contact) => {
      dispatch(AddLeadContact(contact))
    },
    deleteContactFromLead: (id) => {
      dispatch(DeleteContactFromLead(id))
    },
    addLeadDetails: (data) => {
      dispatch(AddLeadDetails(data))
    },
    fetchToLead: (data) => {
      dispatch(FetchContactsToLead(data))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadCard)
