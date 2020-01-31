import React, {Component} from 'react';
import {message, Button, Checkbox, Form, Icon, Input, Typography} from 'antd';
import {connect} from 'react-redux';
import {loggedIn} from "../../../redux/loggedIn";
import {Redirect, Link} from 'react-router-dom';

const {Title} = Typography;

class NormalLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined
    }
  }


  loginFetch = async (formDataEmail, formDataPassword) => {
    let response = await fetch('/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formDataEmail,
        password: formDataPassword
      })
    });
    let result = await response.json();
    if (result.isLoggedIn) {
      message.success(`Вы успешно вошли, ${result.username}`);

      // Get all contacts for logged user
      const responseContacts = await fetch(`/contacts/created/${result.id}`);
      const contacts = await responseContacts.json();

      let arrayWithProps = [result.username, result.email, result.id, contacts, result.type];
      this.props.set(arrayWithProps);
    } else {
      message.error('Неверное имя пользователя или пароль');
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.loginFetch(values.email, values.password);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Title level={2} className={"form-title"}>Вход</Title>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{required: true, message: 'Введите адрес электронной почты'}],
            })(
              <Input
                prefix={<Icon type="smile" theme="outlined" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder="Электронная почта"
                autoComplete={"email"}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Введите пароль для входа'}],
            })(
              <Input
                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                type="password"
                placeholder="Пароль"
                autoComplete={"password"}

              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Войти
            </Button>
            Или <Link to='/signup'>зарегистрироваться!</Link>
          </Form.Item>
        </Form>
        {this.props.isLoggedIn && <Redirect to='/dashboard'/>}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: (data) => {
      dispatch(loggedIn(data))
    }
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn
  }
}

const Login = Form.create({name: 'normal_login'})(NormalLoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
