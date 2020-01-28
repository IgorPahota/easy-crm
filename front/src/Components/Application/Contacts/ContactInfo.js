import React, {Component} from 'react';
import {connect} from "react-redux";
import {Breadcrumb, Icon, Layout, List, Typography} from 'antd';
import moment from 'moment';
import ShowContact from '../../../redux/showContact';
import CommentsList from './CommentsList';

const {Header, Content, Footer, Sider} = Layout;
const {Title} = Typography;

class ContactInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {}
    }

  }

  componentDidMount = async ()  =>{
      const id = this.props.match.params.id;
      const response = await fetch(`${id}`);
      const result = await response.json();
      if (result) {
        this.setState({currentUser: result.contact});
        console.log(this.state.currentUser)
        await this.props.addOneContact(this.state.currentUser);
      }
    };


  render() {
    const {name, company, companyDetails, email, phone, address, created, updated} = this.state.currentUser;
    return (
      <div>
        {/* <Title level={2}>Контакт</Title> */}
        <Title level={2}>Contact</Title>
        <Content style={{padding: '0 10px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item><a href="/"><Icon type="home"/></a></Breadcrumb.Item>
            {/* <Breadcrumb.Item><a href="/contacts">Контакты</a></Breadcrumb.Item> */}
            <Breadcrumb.Item><a href="/contacts">Contacts</a></Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.currentUser.name}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ height: "70vh" }}>
            <Sider width={200} style={{background: '#fff'}}>
           <List size="small" bordered>
              <List.Item className="bold-text">{name}</List.Item>
              {/* <List.Item>Компания:<br />{company}</List.Item>
              <List.Item>Описание:<br />{companyDetails}</List.Item>
              <List.Item>Email:<br />{email}</List.Item>
              <List.Item>Телефон:<br />{phone}</List.Item>
              <List.Item>Адрес:<br />{address}</List.Item>
              <List.Item>Создано:<br /> */}
              <List.Item>Description:<br />{companyDetails}</List.Item>
              <List.Item>Email:<br />{email}</List.Item>
              <List.Item>Phone:<br />{phone}</List.Item>
              <List.Item>Address:<br />{address}</List.Item>
              <List.Item>Created:<br />
              {moment(created).locale('ru').format('DD.MM.YYYY, hh:mm:ss')}</List.Item>
              <List.Item>Updated:<br />{moment(updated).format('DD.MM.YYYY, hh:mm:ss')}</List.Item>
          </List>
            </Sider>
            <Content style={{padding: '0 24px', minHeight: 280}}>
              <CommentsList />.
            </Content>
          </Layout>
          <Footer style={{textAlign: 'center', position: "sticky", bottom: "0"}}>EasyCRM ©2020 Elbrus Bootcamp</Footer>
        </Content>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.isLoggedIn,
    currentContact: state.currentContact,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addOneContact: (contact) => {
      dispatch( ShowContact(contact) )
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo)
