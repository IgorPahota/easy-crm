import React from "react";
import { connect } from "react-redux";
import { Input, Popconfirm, Table, Button, message } from "antd";

import AddContacts from "../../../redux/addContact";
import FilterContacts from "../../../redux/filterContacts";

import NewContactForm from "./NewContact";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

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
    if (this.props.id) {
      const response = await fetch(`/contacts/created/${this.props.id}`);
      const contacts = await response.json();
      this.setState({
        data: contacts,
        resultedData: contacts
      });
      if (contacts && contacts.isLoggedIn) {
        await this.props.submitContacts(contacts);
      }
    } else {
      console.log('Нет this.props.id в CMD ContactList')
    }
  };

  handleDelete = key => {
    const filteredData = this.props.contacts.filter(item => item._id !== key);

    this.fetchDeleteUser(key, filteredData);
  };

  fetchDeleteUser = async (id, filtered)  => {
    const response = await fetch(`/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (data.success) {
      console.log(data);
      this.props.submitFilteredContacts(filtered)
    }
  };

  render() {
    const FilterByNameInput = (
      <Input
        placeholder="Найти..."
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
        render: (text, record) => (
          <Link to={`/contacts/${record._id}`}>{text}</Link>
        )
      },
      {
        title: "Компания",
        dataIndex: "company",
        key: "2"
      },
      // {
      //   title: 'Описание',
      //   dataIndex: 'companyDetails',
      //   key: '3',
      // },
      {
        title: "Телефон",
        dataIndex: "phone",
        key: "6"
      },
      {
        title: "Эл. почта",
        dataIndex: "email",
        key: "4"
      },
      {
        title: "Адрес",
        dataIndex: "address",
        key: "5"
      },
      {
        title: "Действия",
        key: "action",
        render: (text, record) =>
          this.props.contacts.length >= 1 ? (
            <Popconfirm
              title="Уверены?"
              onConfirm={() => this.handleDelete(record._id)}
            >
              {<Button type="link ant-btn cancel">Удалить</Button>}
            </Popconfirm>
          ) : null
      }
    ];
    console.log(this.props.contacts);
    return (
      <div>
        {!this.props.contacts
          ? <Loading/>
          : <><Table
              rowKey={record => record._id}
              columns={columns}
              dataSource={this.props.contacts}
            />
            <NewContactForm />
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    contacts: state.contacts,
    filteredContacts: state.filteredContacts,
    id: state.id
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
