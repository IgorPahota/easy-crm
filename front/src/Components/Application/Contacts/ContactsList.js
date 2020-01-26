import React from 'react';
import {connect} from "react-redux";
import {Input, Popconfirm, Table, Button} from 'antd';
import 'antd/dist/antd.css';


import AddContacts from '../../../redux/addContacts';
import FilterContacts from '../../../redux/filterContacts';

// import {loggedIn} from '../../../redux/loggedIn';
import NewContactForm from './NewContact';

class ContactsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: '',
      resultedData: []
    };
  }

  componentDidMount = async () => {
    const response = await fetch('/contacts');
    const contacts = await response.json();
    this.setState({
      data: contacts,
      resultedData: contacts
    });
    this.props.submitContacts(contacts);

  };


  handleDelete = key => {
    const filteredData = this.props.contacts.filter(item => item._id !== key);
    this.props.submitFilteredContacts(filteredData);
    this.fetchDeleteUser(key);
  };

  fetchDeleteUser = async (id) => {
    const response = await fetch(`/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data) {
      console.log(data);
    }
  };


  render() {
    const FilterByNameInput = (
      <Input
        placeholder="Найти..."
        value={this.state.value}
        onChange={e => {
          const currValue = e.target.value;
          this.setState({value: currValue});

          let filteredData = this.state.data.filter(
            entry => {
              const entryName = entry.name.toLowerCase();
              return entryName.includes(currValue.toLowerCase())
            }
          );
          this.setState({
            resultedData: filteredData
          });

          this.props.submitFilteredContacts(filteredData);

        }}
      />
    );


    const columns = [
      {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1
      },
      {
        title: FilterByNameInput,
        dataIndex: 'name',
        key: '1',
        render: (text, record) => <a href={`/contacts/${record._id}`}>{text}</a>,
      },
      {
        title: 'Компания',
        dataIndex: 'company',
        key: '2',
      },
      {
        title: 'Описание',
        dataIndex: 'companyDetails',
        key: '3',
      },
      {
        title: 'Эл. почта',
        dataIndex: 'email',
        key: '4',
      },
      {
        title: 'Адрес',
        dataIndex: 'address',
        key: '5',
      },
      {
        title: 'Телефон',
        dataIndex: 'phone',
        key: '6',
      },
      {
        title: 'Действия',
        key: 'action',
        render: (text, record) =>
          this.state.resultedData.length >= 1 ? (
            <Popconfirm title="Уверены?" onConfirm={() => this.handleDelete(record._id)}>
              {/*<a>Удалить</a>*/}
              {<Button type="link">Удалить</Button>}
            </Popconfirm>
          ) : null,
      },
    ];

    return (
      <div>
        <Table rowKey={record => record._id}
               columns={columns}
               // dataSource={this.state.resultedData}
               dataSource={this.props.contacts}
        />
      <NewContactForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // loading: state.loading,
    // error: state.error,
    // url: state.url,
    contacts: state.contacts,
    filteredContacts: state.resultedData

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitContacts: (contacts) => {
      dispatch( AddContacts(contacts) )
    },
    submitFilteredContacts: (contacts) => {
      dispatch( FilterContacts(contacts) )
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList)
