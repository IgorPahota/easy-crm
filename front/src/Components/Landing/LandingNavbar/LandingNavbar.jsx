import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Icon, Menu } from "antd";

class LandingNavbar extends Component {
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
        {/*     <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/signup'}>Signup</NavLink>*/}

        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">

          <Menu.Item key="login">
            <NavLink to={'/login'}>
              <Icon type="login"/>
              Login
            </NavLink>
          </Menu.Item>

          <Menu.Item key="user-add">
            <NavLink to={'/signup'}>
              <Icon type="user-add"/>
              Signup
            </NavLink>
          </Menu.Item>

        </Menu>

      </div>
    );
  }
}

export default LandingNavbar;
