import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu } from "antd";

class LandingNavbar extends Component {
  state = {
    current: "login"
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
          <Menu.Item key="login">
            <NavLink to={"/login"}>
              <Icon type="login" />
              Вход
            </NavLink>
          </Menu.Item>

          <Menu.Item key="user-add">
            <NavLink to={"/signup"}>
              <Icon type="user-add" />
              Регистрация
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default LandingNavbar;
