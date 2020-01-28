import React from "react";
import { connect } from "react-redux";
import { Input, Popconfirm, Table, Button } from "antd";

import AddContacts from "../../../redux/addContact";
import FilterContacts from "../../../redux/filterContacts";

// import {loggedIn} from '../../../redux/loggedIn';
import NewContactForm from "./NewContact";

class ContactsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: "",
      resultedData: []
    };
  }

  componentDidMount = async () => {
    const response = await fetch("/contacts");
    const contacts = await response.json();
    // console.log('контакты до фетча', contacts)
    console.log("contacts BEFORE fetch", contacts);
    this.setState({
      data: contacts,
      resultedData: contacts
    });
    if (contacts.isLoggedIn) {
      await this.props.submitContacts(contacts);
    } else {
      // console.log('Это контакты после фетча', this.props.contacts)
      console.log("contact AFTER fetch", this.props.contacts);
    }
  };

  handleDelete = key => {
    const filteredData = this.props.contacts.filter(item => item._id !== key);
    this.props.submitFilteredContacts(filteredData);
    this.fetchDeleteUser(key);
  };

  fetchDeleteUser = async id => {
    const response = await fetch(`/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (data) {
      console.log(data);
    }
  };

  render() {
    const FilterByNameInput = (
      <Input
        /*placeholder="Найти..."*/
        placeholder="Search..."
        value={this.state.value}
        onChange={e => {
          const currValue = e.target.value;
          this.setState({ value: currValue });
          let filteredData = this.state.data.filter(entry => {
            const entryName = entry.name.toLowerCase();
            return entryName.includes(currValue.toLowerCase());
          });
          this.setState({
            resultedData: filteredData
          });
          this.props.submitFilteredContacts(filteredData);
        }}
      />
    );

    const columns = [
      {
        title: "#",
        key: "index",
        render: (text, record, index) => index + 1
      },
      {
        title: FilterByNameInput,
        dataIndex: "name",
        key: "1",
        render: (text, record) => <a href={`/contacts/${record._id}`}>{text}</a>
      },
      {
        // title: 'Компания',
        title: "Company",
        dataIndex: "company",
        key: "2"
      },
      {
        // title: 'Описание',
        title: "Description",
        dataIndex: "companyDetails",
        key: "3"
      },
      {
        // title: 'Эл. почта',
        title: "Email",
        dataIndex: "email",
        key: "4"
      },
      {
        // title: "Адрес",
        title: "Address",
        dataIndex: "address",
        key: "5"
      },
      {
        // title: "Телефон",
        title: "Phone",
        dataIndex: "phone",
        key: "6"
      },
      {
        // title: "Действия",
        title: "Actions",
        key: "action",
        render: (text, record) =>
          this.props.contacts.length >= 1 ? (
            <Popconfirm
              /*title="Уверены?"*/
              title="Are you sure to delete?"
              onConfirm={() => this.handleDelete(record._id)}
            >
              {/* {<Button type="link">Удалить</Button>} */}
              {<Button type="link">Delete</Button>}
            </Popconfirm>
          ) : null
      }
    ];

    return (
      <div>
        <Table
          rowKey={record => record._id}
          columns={columns}
          dataSource={this.props.contacts}
        />
        {/*{this.props.contacts ? <p>{this.props.contacts}</p> : <p>а</p>}*/}
        <NewContactForm />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // isLoggedIn: state.isLoggedIn,
    contacts: state.contacts,
    filteredContacts: state.resultedData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitContacts: contacts => {
      dispatch(AddContacts(contacts));
    },
    submitFilteredContacts: contacts => {
      dispatch(FilterContacts(contacts));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
