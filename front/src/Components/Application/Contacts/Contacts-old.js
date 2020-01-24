import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  // {
  //   title: 'Age',
  //   dataIndex: 'age',
  //   key: 'age',
  // },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
  //   key: 'address',
  // },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];

class Contacts extends Component {
  state = {
    data: []
  };

  componentDidMount = async () => {
    const response = await fetch ('/contacts');
    const contacts = await response.json ();
    this.setState({
      data: contacts,
    });
  };

  getColumns = () => {
    const columns =
    {
      title: 'Name',
        dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    {
      title: 'Tags',
        key: 'tags',
      dataIndex: 'tags',
      render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
    },
    {
      title: 'Action',
        key: 'action',
      render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
    },
  ];
return columns
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
          <tr>
            <th>name</th>
            <th>company</th>
            <th>companyDetails</th>
            <th>email</th>
            <th>phone</th>
            <th>address</th>
          </tr>
          </thead>
          <tbody>
          {console.log(this.state.data)}
          {this.state.data && this.state.data.map((contact, idx) => {
            return (
              <tr key={idx}>
                <td>{contact.name}</td>
                <td>{contact.company}</td>
                <td>{contact.companyDetails}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.address}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Contacts;
