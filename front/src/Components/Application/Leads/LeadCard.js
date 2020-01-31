import React, { Component } from "react";
import { AutoComplete, Button, Card } from "antd";
import { connect } from "react-redux";
import AddLeadContact from "../../../redux/addToLead";
import DeleteContactFromLead from "../../../redux/deleteFromLead";
import LeadContact from "./LeadContact";
import AddLeadDetails from "../../../redux/addLeadDetails";

class LeadCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      dataSource: "",
      leadDetails: "",
      isLoading: true,
      contact: ""
    };
  }

  componentDidMount() {
    fetch(this.props.match.params.id)
      .then(res => res.json())
      .then(leadDetails => {
        this.props.addLeadDetails(leadDetails.lead);
        this.setState({ isLoading: false });
      });
  }

  fetchAddContactToLead = async contactId => {
    const response = await fetch(
      `/leads/contacts/${this.props.match.params.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contactId
        })
      }
    );

    const data = await response.json();
    if (data) {
      const leadContactsForProps = data.upd;
      console.log("добавляем в leadcontacts", leadContactsForProps);
      this.props.addContactToLead(leadContactsForProps);
    } else {
      console.log("Wrong username or password!");
    }
  };

  fetchDeleteContactFromLead = async contactId => {
    const response = await fetch(
      `/leads/contacts/${this.props.match.params.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contactId
        })
      }
    );

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

  render() {
    const arr = [];
    const conts = this.props.contacts
      ? this.props.contacts.map(el => {
          const { name: text, _id: value } = el;
          arr.push({ text, value });
          return el;
        })
      : null;
    return (
      <div className="leads-font">
        {this.props.leadDetails ? (
          <div className="lead-card-position">
            <div className="lead-card-search">
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
            </div>
            <div className="lead-card-row">
              <Card
                title="Card title"
                bordered={false}
                style={{ width: 300 }}
                className="lead-card"
              >
                <p>Цена {this.props.leadDetails.price}</p>
                <p>Айди сделки{this.props.leadDetails.leadId}</p>
                <p>Имя {this.props.leadDetails.name}</p>
                <p>
                  стейдж название (из попьюлейт){" "}
                  {this.props.leadDetails &&
                    this.props.leadDetails.stageId.title}
                </p>
                <p>Детали {this.props.leadDetails.details}</p>
                <p>Создатель {this.props.leadDetails.creatorId}</p>
                <p>Создана {this.props.leadDetails.created}</p>
                <p>Обновлена{this.props.leadDetails.updated}</p>
              </Card>
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
          </div>
        ) : (
          <h3>LeadCard 143 Loading</h3>
        )}
      </div>
    );
  }
}

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
