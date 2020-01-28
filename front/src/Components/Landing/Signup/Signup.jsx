import React, { Component } from "react";
import { Button, Checkbox, Form, Icon, Input, message, Typography } from "antd";
import { connect } from "react-redux";
import { loggedIn } from "../../../redux/loggedIn";
import { Redirect } from "react-router-dom";

const { Title } = Typography;

// import { Redirect } from 'react-router-dom'

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/login");
    let result = await response.json();
    if (result.isLoggedIn) {
      // message.warning('Вы уже вошли в систему');
      message.warning("You are already logged in");
      let arrayWithProps = [result.username, result.email, result.id];
      this.props.set(arrayWithProps);
    } else {
      // alert('login please')
    }
  };

  signupFetch = async (formDataUsername, formDataEmail, formDataPassword) => {
    let response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formDataUsername,
        email: formDataEmail,
        password: formDataPassword
      })
    });
    let result = await response.json();
    if (result.isLoggedIn) {
      // message.success(`Вы успешно зарегистрированы, ${result.username}`)
      message.success(`You signed up successfully, ${result.username}`);
      let arrayWithProps = [result.username, result.email, result.id];
      this.props.set(arrayWithProps);
    } else {
      // message.error('Не получилось.. Попробуйте снова!')
      message.error("Something went wrong... Try again!");
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.signupFetch(values.username, values.email, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Title level={2} className={"form-title"}>
            {/* Регистрация */}
            Registration
          </Title>
          <Form.Item>
            {getFieldDecorator("username", {
              /*rules: [{ required: true, message: "Введите имя пользователя" }]*/
              rules: [{ required: true, message: "Enter username" }]
            })(
              <Input
                prefix={
                  <Icon
                    type="user"
                    theme="outlined"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                /*placeholder="Имя пользователя"*/
                placeholder="Username"
                autoComplete={"username"}
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                /*{ required: true, message: "Введите адрес электронной почты" }*/
                { required: true, message: "Enter email" }
              ]
            })(
              <Input
                prefix={
                  <Icon
                    type="smile"
                    theme="outlined"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                /*placeholder="Электронная почта"*/
                placeholder="Email"
                autoComplete={"email"}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              /*rules: [{ required: true, message: "Введите пароль для входа" }]*/
              rules: [{ required: true, message: "Enter password" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                /*placeholder="Пароль"*/
                placeholder="Password"
                autoComplete={"password"}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {/* Зарегистрироваться */}
              Sign up!
            </Button>
          </Form.Item>
        </Form>
        {this.props.isLoggedIn && <Redirect to="/dashboard" />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: data => {
      dispatch(loggedIn(data));
    }
  };
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn
  };
}

const Signup = Form.create()(SignupForm);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
