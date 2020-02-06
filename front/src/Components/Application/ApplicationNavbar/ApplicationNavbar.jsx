import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../../Landing/Logout/Logout";
import { connect } from "react-redux";
import { Menu, Icon } from "antd";
import whitelogo from "./Easycrm-logo-inv.png";


class ApplicationNavbar extends Component {
  state = {
    current: "app"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          theme="dark"
        >
          <Menu.Item key="logo">
            <NavLink to={"/dashboard"}><img
                className="whitelogo"
                alt="logo"
                src={whitelogo}
                height="20px"
            ></img></NavLink>
          </Menu.Item>
          <Menu.Item key="app">
            <NavLink to={"/dashboard"}>
              <Icon type="appstore" />
              Рабочий стол
            </NavLink>
          </Menu.Item>
          <Menu.Item key="contacts">
            <NavLink to={"/contacts"}>
              <Icon type="contacts" />
              Контакты
            </NavLink>
          </Menu.Item>
          <Menu.Item key="transaction">
            <NavLink to={"/leads"}>
              <Icon type="transaction" />
              Сделки
            </NavLink>
          </Menu.Item>
          <Menu.Item key="logout" style={{ float: "right" }}>
            <Logout />
          </Menu.Item>
          <Menu.Item key="user" disabled style={{ float: "right" }}>
            <NavLink to={"/leads"}>
              <Icon type="user" />
              {this.props.username}
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    username: store.username
  };
}

export default connect(mapStateToProps)(ApplicationNavbar);
