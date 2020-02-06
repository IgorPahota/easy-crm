import React, {Component} from 'react';
import {AutoComplete, Button, Input} from 'antd';
import {connect} from 'react-redux';
import AddLeadContact from '../../../redux/addToLead';
import DeleteContactFromLead from '../../../redux/deleteFromLead';
import LeadContact from './LeadContact';
import AddLeadDetails from "../../../redux/addLeadDetails";

class LeadCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      dataSource: "",
      leadDetails: "",
      isLoading: true,
      contact: '',
      isEditing: false,
      priceData: ''
    }
  }

  componentDidMount() {
    fetch(this.props.match.params.id)
      .then(res => res.json())
      .then(leadDetails => {
        this.props.addLeadDetails(leadDetails.lead);
        this.setState({ isLoading: false });
      });
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
      console.log("добавляем в leadcontacts", leadContactsForProps);
      this.props.addContactToLead(leadContactsForProps);
    } else {
      console.log("Wrong username or password!");
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
      console.log("удаляем id из leadcontacts", data);
      const idForDelete = data.updatedLead.leadcontacts._id;
      this.props.deleteContactFromLead(idForDelete);
    } else {
      console.log("Wrong username or password!");
    }
  };

  onSelect = value => {
    this.setState({ value });
    console.log(this.state.value);
  };

  submit = () => {
    this.fetchAddContactToLead(this.state.value);
    this.setState({ value: "" });
  };

  delete = () => {
    this.fetchDeleteContactFromLead(this.state.value);
  };


  priceEdit = async () => {
    this.setState({
      isEditing: true
    })
  };

  priceEditData = async (e) => {
    console.log('EVENT',e)
    this.setState({
      priceData: e.target.value
    });

  };

  fetchPrice = async () => {
    let response = await fetch(this.props.match.params.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        price: this.state.priceData
      })
    });
    let result = await response.json();
    console.log(result)
    this.setState({
      isEditing: false
    })
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
                style={{ width: 200 }}
                dataSource={arr}
                onChange={this.onSelect}
                placeholder="Print"
                filterOption={(inputValue, option) =>
                  option.props.children
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
              <Button
                type="primary"
                onClick={this.submit}
                style={{ marginTop: "10px" }}
                className="lead-add-btn"
              >
                Добавить
              </Button>{" "}
              <Button
                type="primary"
                onClick={this.delete}
                style={{ marginTop: "10px" }}
                className="cancel"
              >
                Удалить
              </Button>
              <Button type="primary"
                      onClick={this.delete}
                      style={{marginTop: '10px'}}>
               Удалить
              </Button>
              <p onClick={this.priceEdit}>Цена { this.state.leadDetails.price}</p>
              {this.state.isEditing &&
                  <div>
                <input onChange={this.priceEditData}/>
                    <Button onClick={this.fetchPrice}>Изменить цену</Button>
                  </div>
                }

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
                {this.props.leadcontacts &&
                  this.props.leadcontacts.map((contact, i) => (
                    <LeadContact
                      userId={contact._id}
                      contact={contact}
                      key={i}
                      id={contact._id}
                    />
                  ))}
              </ul>
            </div>
            :
            <h3>Loading</h3>
          }


        </div>
      );
    }
  };

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    leadcontacts: state.leadcontacts,
    idLeadForRedirect: state.idLeadForRedirect,
    leadDetails: state.leadDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addContactToLead: contact => {
      dispatch(AddLeadContact(contact));
    },
    deleteContactFromLead: contact => {
      dispatch(DeleteContactFromLead(contact));
    },
    addLeadDetails: data => {
      dispatch(AddLeadDetails(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadCard);
