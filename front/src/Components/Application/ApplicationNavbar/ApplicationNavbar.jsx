import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Logout from "../../Landing/Logout/Logout";
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd';


class ApplicationNavbar extends Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div>

        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">

          <Menu.Item key="app">
            <NavLink to={'/dashboard'}>
              <Icon type="appstore"/>
              Рабочий стол
            </NavLink>
          </Menu.Item>
          <Menu.Item key="contacts">
            <NavLink to={'/contacts'}>
              <Icon type="contacts"/>
              Контакты
            </NavLink>
          </Menu.Item>
          <Menu.Item key="transaction">
            <NavLink to={'/leads'}>
              <Icon type="transaction"/>
              Сделки
            </NavLink>
          </Menu.Item>
          <Menu.Item key="logout" style={{ float: 'right' }}>
            <Logout/>
          </Menu.Item>
          <Menu.Item key="user" disabled style={{ float: 'right' }}>
            <NavLink to={'/leads'}>
              <Icon type="user"/>
              {this.props.username}
            </NavLink>
          </Menu.Item>

        </Menu>


        {/* <NavLink to={'/dashboard'}>Dashboard</NavLink>
              <NavLink to={'/contacts'}>Contacts</NavLink>
              <NavLink to={'/leads'}>Leads</NavLink>
              <Logout/>*/}

      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    username: store.username
  }
}

export default connect(mapStateToProps)(ApplicationNavbar);
