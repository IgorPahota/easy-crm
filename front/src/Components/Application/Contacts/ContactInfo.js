import React, {Component} from 'react';
import {connect} from "react-redux";
import {Breadcrumb, Icon, Input, Layout, List, Typography, Button} from 'antd';
import ShowContact from '../../../redux/showContact';
import EditContact from '../../../redux/editContact'
import AddNoteToList from '../../../redux/addNote';
import FetchNotesOnload from '../../../redux/fetchNotes';
import NotesList from './NotesList';
import moment from 'moment';
import {Link} from 'react-router-dom';

const {Header, Content, Sider} = Layout;
const {Title} = Typography;

class ContactInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      isEditing: false,
      name: null,
      company: null,
      companyDetails: null,
      email: null,
      address: null,
      phone: null,
    }
  }

  fetchNotesForCurrentUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/created/${userId}`);
      const result = await response.json();
      if (result) {
        await this.props.fetchNotes(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const response = await fetch(`${id}`);
    const result = await response.json();
    if (result) {
      this.setState({currentUser: result.contact});
      await this.props.addOneContact(this.state.currentUser);
      // await this.props.addOneContact(result.contact);
    }
    // if (this.props.notes && this.props.notes.length === 0) {
      this.fetchNotesForCurrentUser(id);
    // }
  };
  fetchEditContact = async (id) => {
    const response = await fetch(`/contacts/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        company: this.state.company,
        companyDetails: this.state.companyDetails,
        email: this.state.email,
        address: this.state.address,
        phone: this.state.phone,
        updated: Date.now()
      })
    });

    const data = await response.json();
    if (data) {
      const {_id, name, company, companyDetails, email, address, phone, created,  creatorId, updated } = data.updated;
      const dataToProps = [_id, name, company, companyDetails, email, address, phone, created,  creatorId, updated];
      console.log('dataToProps', dataToProps);
      this.props.editContact(dataToProps);
    } else {
      alert('Wrong username or password!')
    }
  };

  edit= (contact) => {
    if (!this.state.isEditing) {
      this.setState({isEditing: true});
      this.setState({...contact});
    } else {
      this.fetchEditContact(this.props.currentContact._id)
      this.setState({isEditing: false});
    }
  };

  fieldChanger = (name) => (e) => {
    const newState = {};
    newState[name] = e.target.value;
    this.setState(newState)
  };



  render() {
    const { name, company, companyDetails, email, address, phone, created,  updated} = this.props.currentContact;
    return (
      <Layout style={{height: "calc(100vh - 80px)", background: '#ECECEC'}}>
        <Header style={{height: 'auto', background: '#fff', paddingLeft: 0}}>
          <Title level={2}>{name}</Title>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item><Link to="/dashboard"><Icon type="home"/></Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/contacts">Контакты</Link></Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Layout>
          <Sider width={250} style={{background: '#fff'}}>


              {this.state.isEditing ?
                <div>
                  <p className="note">
                    <Input type="text" onChange={this.fieldChanger('name')}
                           value={this.state.name}
                           className="contact-input"
                           onPressEnter={() => this.edit(this.props.currentContact)}
                           placeholder="Фамилия, имя"
                    />

                    <Input type="text" onChange={this.fieldChanger('company')}
                           value={this.state.company}
                           className="contact-input"
                           onPressEnter={() => this.edit(this.props.currentContact)}
                           placeholder="Компания"
                    />

                    <Input type="text" onChange={this.fieldChanger('companyDetails')}
                           value={this.state.companyDetails}
                           className="contact-input"
                           onPressEnter={() => this.edit(this.props.currentContact)}
                           placeholder="Описание компании"
                    />

                    <Input type="text" onChange={this.fieldChanger('email')}
                           value={this.state.email}
                           className="contact-input"
                           onPressEnter={() => this.edit(this.props.currentContact)}
                           placeholder="Email"
                    />

                    <Input type="text" onChange={this.fieldChanger('phone')}
                           value={this.state.phone}
                           className="contact-input"
                           onPressEnter={() => this.edit(this.props.currentContact)}
                           placeholder="Телефон"
                    />

                    <Input type="text" onChange={this.fieldChanger('address')}
                           value={this.state.address}
                           className="contact-input"
                           onPressEnter={() => this.edit(this.props.currentContact)}
                           placeholder="Адрес"
                    /></p>
                  <Button type="primary" className="contacts-buttons" onClick={() => this.edit(this.props.currentContact)}>Сохранить</Button>
                  <Button type="danger" className="contacts-buttons" onClick={() => this.setState({isEditing: false})}>Отмена</Button>
                </div>
                :
                <div>
                  <List size="small" bordered>
                  <List.Item className="bold-text"
                             onClick={() => this.edit(this.props.currentContact)}>{name}</List.Item>


                  <List.Item className="bold-text"
                             onClick={() => this.edit(this.props.currentContact)}>{company}</List.Item>


                  <List.Item className="bold-text"
                             onClick={() => this.edit(this.props.currentContact)}>{companyDetails}</List.Item>

                  <List.Item className="bold-text"
                             onClick={() => this.edit(this.props.currentContact)}>{email}</List.Item>

                  <List.Item className="bold-text"
                             onClick={() => this.edit(this.props.currentContact)}>{phone}</List.Item>

                  <List.Item className="bold-text"
                             onClick={() => this.edit(this.props.currentContact)}>{address}</List.Item>

                  <List.Item>Создано:<br/>
                    {moment(created).locale('ru').format('dddd, DD MMMM YYYY, начало в HH:mm')}</List.Item>
                  <List.Item>Обновлено:<br/>{moment(updated).format('DD.MM.YYYY, HH:mm:ss')}</List.Item>
                  </List>
                </div>
              }

          </Sider>
          <Content style={{padding: '0 24px', minHeight: 280, background: '#fff'}}>
            <NotesList userId={this.props.match.params.id} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentContact: state.currentContact,
    id: state.id,
    notes: state.notes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addOneContact: (contact) => {
      dispatch(ShowContact(contact))
    },
    addNote: (text) => {
      dispatch(AddNoteToList(text))
    },
    fetchNotes: (notes) => {
      dispatch(FetchNotesOnload(notes))
    },
    editContact: (data) => {
      console.log('this is!')
      dispatch(EditContact(data))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo)
