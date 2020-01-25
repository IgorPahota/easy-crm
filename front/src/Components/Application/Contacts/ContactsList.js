import React from 'react';
import { Input, Table } from 'antd';
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
    const response = await fetch ('/contacts');
    const contacts = await response.json ();
    this.setState({
      data: contacts,
      resultedData: contacts
    });
  };

  render() {
    const FilterByNameInput = (
      <Input
        placeholder="Search Name"
        value={this.state.value}
        onChange={e => {
          const currValue = e.target.value;
          this.setState({ value: currValue } );
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

    ];

    return (
      <div>
        <Table rowKey={record => record._id} columns={columns} dataSource= {this.state.resultedData} />
      </div>
    );
  }
}

export default ContactsList;
