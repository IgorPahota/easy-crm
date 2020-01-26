import React from 'react';
// import MainLanding from "./Components/Landing/MainLanding/MainLanding";
import ContactsList from './Components/Application/Contacts/ContactsList';
// import NewContactForm from './Components/Application/Contacts/NewContact';
import NewContact from './Components/Application/Contacts/NewContact';
import './App.css';
import {ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';


function App() {
  return (
    <ConfigProvider locale={ruRU}>
    <div className="App">
     {/*App*/}
     {/*   <MainLanding/>*/}
     <ContactsList />
     {/*<ContactListSearch/>*/}
     {/*<ContactListTwo />*/}
     {/*<ContactListExp />*/}
    <NewContact />

    </div>
    </ConfigProvider>
  );
}

export default App;
