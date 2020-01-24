import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Divider, Tag } from 'antd';


const { Column, ColumnGroup } = Table;

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];
  }


  render() {
    return (
      <Table dataSource={this.data}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <span>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
          <a>Invite {record.lastName}</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
          )}
        />
      </Table>
    );
  }
}

export default Contacts;
