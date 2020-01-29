import React, {Component} from 'react';
import {connect} from "react-redux";
import moment from 'moment';
import {Breadcrumb, Icon, Layout, List, Typography} from 'antd';
import ShowContact from '../../../redux/showContact';
import AddNoteToList from '../../../redux/addNote';
import NotesList from './NotesList';

const {Header, Content, Footer, Sider} = Layout;
const {Title} = Typography;

class ContactInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {}
    }
  }

  fetchNotesForCurrentUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/created/${userId}`);
      const result = await response.json();
      if (result) {
        await this.props.addNote(result);
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
    }
    this.fetchNotesForCurrentUser(id);
  };

  render() {
    const {name, company, companyDetails, email, phone, address, created, updated} = this.props.currentContact;
    return (
      <Layout style={{height: "calc(100vh - 80px)"}}>
        <Header style={{height: 'auto', background: '#fff', paddingLeft: 0}}>
          <Title level={2}>{name}</Title>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item><a href="/"><Icon type="home"/></a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="/contacts">Контакты</a></Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Layout>
          <Sider width={200} style={{background: '#fff'}}>
            <List size="small" bordered>
              <List.Item className="bold-text">{name}</List.Item>
              <List.Item>Компания:<br/>{company}</List.Item>
              <List.Item>Описание:<br/>{companyDetails}</List.Item>
              <List.Item>Email:<br/>{email}</List.Item>
              <List.Item>Телефон:<br/>{phone}</List.Item>
              <List.Item>Адрес:<br/>{address}</List.Item>
              <List.Item>Создано:<br/>
                {moment(created).locale('ru').format('DD.MM.YYYY, hh:mm:ss')}</List.Item>
              <List.Item>Обновлено:<br/>{moment(updated).format('DD.MM.YYYY, hh:mm:ss')}</List.Item>
            </List>
          </Sider>
          <Content style={{padding: '0 24px', minHeight: 280, background: '#fff'}}>
            <NotesList userId={this.props.match.params.id} />
          </Content>
        </Layout>
        <Footer style={{textAlign: 'center', position: "sticky", bottom: "0"}}>
          EasyCRM ©2020 Elbrus Bootcamp
        </Footer>
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo)
