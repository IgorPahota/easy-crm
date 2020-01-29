import React, {Component} from 'react';
import {Button, Modal, Form, Input, Select, Typography } from 'antd';
import AddContacts from '../../../redux/addContact';
import {connect} from 'react-redux';

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
      name: '',
      company: '',
      companyDetails: '',
      email: '',
      phone: '',
      address: '',
    };
  }

  fetchAddUser = async (formData) => {
    const { name, company, companyDetails, email, phone, address, creatorId } = formData;
    const response = await fetch('/contacts', {
      method: 'POST',
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
        creatorId,
        created: Date.now(),
        updated: Date.now()
      })
    });

    const data = await response.json();
    if (data) {
      console.log('data', data);
    } else {
      alert('Wrong username or password!')
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: false, visible: false});
    this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const formValues = {
            ...values,
            phone: `${values.prefix}${values.phone}`,
            creatorId: this.props.id
          };
          await this.fetchAddUser(formValues);
          await this.props.submitContacts(formValues);
        }
      });
  };

  render() {
    const { visible, loading } = this.state;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 34},
        sm: {span: 16},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+7',
    })(
      <Select style={{width: 70}}>
        <Option value="+7">+7</Option>
        <Option value="+375">+375</Option>
      </Select>,
    );

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Новый контакт
        </Button>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Modal
          visible={visible}
          title={<Title level={3}>Добавить новый контакт</Title>}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Отмена
            </Button>,
            <Button key="submit" type="primary" htmlType="submit" loading={loading} onClick={this.handleSubmit}>
              Сохранить
            </Button>,
          ]}
        >

        <Form.Item label="Контакт">
          {getFieldDecorator('name', {
            rules: [{required: true, message: 'Фамилия, имя, отчество'}],
          })(
            <Input/>
          )}
        </Form.Item>

        <Form.Item label="Компания">
          {getFieldDecorator('company', {
            rules: [{required: true, message: 'Введите название компании'}],
          })(
            <Input/>
          )}
        </Form.Item>

        <Form.Item label="Описание">
          {getFieldDecorator('companyDetails', {
            rules: [{required: false, message: 'Детали компании, веб-сайт, адрес или любая другая информация'}],
          })(
            <Input/>
          )}
        </Form.Item>

        <Form.Item label="Эл. почта">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Неверный формат электронной почты!',
              },
              {
                required: true,
                message: 'Введите адрес электронной почты!',
              },
            ],
          })(<Input/>)}
        </Form.Item>

        <Form.Item label="Телефон">
          {getFieldDecorator('phone', {
            rules: [{required: true, message: 'Введите номер телефона!'}],
          })(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
        </Form.Item>

        <Form.Item label="Адрес">
          {getFieldDecorator('address', {
            rules: [{required: false, message: 'Введите адрес местонахождения'}],
          })(
            <Input/>
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
        </Form.Item>
        </Modal>
      </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitContacts: (contact) => {
      dispatch( AddContacts(contact) )
    }
  }
};

const NewContactForm = Form.create()(NewContact);
export default connect(mapStateToProps, mapDispatchToProps)(NewContactForm)
