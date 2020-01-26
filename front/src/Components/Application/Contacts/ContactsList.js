import React from 'react';
import {Input, Popconfirm, Table } from 'antd';
import 'antd/dist/antd.css';

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
  };


  handleDelete = key => {
    const dataSource = [...this.state.resultedData];
    this.setState({resultedData: dataSource.filter(item => item._id !== key)});
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
          this.setState({resultedData: filteredData});
          console.log(this.state.resultedData)
        }}
      />
    );


    const columns = [
      {
        title: '#',
        key: 'index',
        render: (text, record, index) => index
      },
      {
        title: FilterByNameInput,
        dataIndex: 'name',
        key: '1'
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
              <a>Удалить</a>
            </Popconfirm>
          ) : null,
      },

    ];

    return (
      <div>
        <Table rowKey={record => record._id}
               columns={columns}
               dataSource={this.state.resultedData}
        />
      </div>
    );
  }
}

export default ContactsList;
