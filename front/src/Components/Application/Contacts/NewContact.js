import React, { Component } from "react";
import { Button, Modal, Form, Input, Select, Typography } from "antd";
import AddContacts from "../../../redux/addContact";
import { connect } from "react-redux";

const { Option } = Select;
const { Title } = Typography;

class NewContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
      confirmDirty: false,
      autoCompleteResult: [],
      name: "",
      company: "",
      companyDetails: "",
      email: "",
      phone: "",
      address: ""
    };
  }

  fetchAddUser = async formData => {
    const { name, company, companyDetails, email, phone, address } = formData;
    const response = await fetch("/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        company,
        companyDetails,
        email,
        phone,
        address,
        created: Date.now(),
        updated: Date.now()
      })
    });

    const data = await response.json();
    if (data) {
      console.log("data", data);
    } else {
      alert("Wrong username or password!");
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  // handleOk = () => {
  //   this.setState({ loading: true });
  //   setTimeout(() => {
  //     this.setState({ loading: false, visible: false });
  //   }, 2000);
  // };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 34 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "+7"
    })(
      <Select style={{ width: 70 }}>
        <Option value="+7">+7</Option>
        <Option value="+375">+375</Option>
      </Select>
    );

    this.handleSubmit = e => {
      e.preventDefault();
      this.setState({ loading: false, visible: false });
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const formValues = {
            ...values,
            phone: `${values.prefix}${values.phone}`
          };
          await this.fetchAddUser(formValues);
          await this.props.submitContacts(formValues);
        }
      });
    };

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          {/* Новый контакт */}
          New Contact
        </Button>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Modal
            visible={visible}
            /* title={<Title level={3}>Добавить новый контакт</Title>} */
            title={<Title level={3}>Add New Contact</Title>}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                {/* Отмена */}
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={this.handleSubmit}
              >
                {/* Сохранить */}
                Save
              </Button>
            ]}
          >
            {/* <Form.Item label="Контакт"> */}
            <Form.Item label="Contact">
              {getFieldDecorator("name", {
                /* rules: [{required: true, message: 'Фамилия, имя, отчество'}], */
                rules: [{ required: true, message: "Surname, First Name" }]
              })(<Input />)}
            </Form.Item>

            {/* <Form.Item label="Компания"> */}
            <Form.Item label="Company">
              {getFieldDecorator("company", {
                /*rules: [{required: true, message: 'Введите название компании'}],*/
                rules: [{ required: true, message: "Enter company name" }]
              })(<Input />)}
            </Form.Item>

            {/* <Form.Item label="Описание"> */}
            <Form.Item label="Description">
              {getFieldDecorator("companyDetails", {
                /*rules: [{required: false, message: 'Детали компании, веб-сайт, адрес или любая другая информация'}],*/
                rules: [
                  {
                    required: false,
                    message:
                      "Company details, website, address or any information"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            {/* <Form.Item label="Эл. почта"> */}
            <Form.Item label="Email">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    /*message: 'Неверный формат электронной почты!',*/
                    message: "Wrong type of format"
                  },
                  {
                    required: true,
                    /*message: 'Введите адрес электронной почты!',*/
                    message: "Enter email"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            {/* <Form.Item label="Телефон"> */}
            <Form.Item label="Phone">
              {getFieldDecorator("phone", {
                /*rules: [{required: true, message: 'Введите номер телефона!'}],*/
                rules: [{ required: true, message: "Enter phone number!" }]
              })(
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              )}
            </Form.Item>

            {/* <Form.Item label="Адрес"> */}
            <Form.Item label="Address">
              {getFieldDecorator("address", {
                /*rules: [{required: false, message: 'Введите адрес местонахождения'}],*/
                rules: [{ required: false, message: "Enter location" }]
              })(<Input />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              {/*<Button type="primary" htmlType="submit">*/}
              {/*  Добавить*/}
              {/*</Button>*/}
            </Form.Item>
            {/*<Button key="submit" htmlType="submit" type="primary" loading={loading} onClick={this.handleOk}>*/}
            {/*  Submit*/}
            {/*</Button>,*/}
          </Modal>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitContacts: contact => {
      dispatch(AddContacts(contact));
    }
  };
};

const NewContactForm = Form.create()(NewContact);
export default connect(null, mapDispatchToProps)(NewContactForm);
