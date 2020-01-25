import React from 'react';
// import MainLanding from "./Components/Landing/MainLanding/MainLanding";
import ContactsList from './Components/Application/Contacts/ContactsList';
// import NewContactForm from './Components/Application/Contacts/NewContact';
import NewContactModal from './Components/Application/Contacts/NewContactModal';



function App() {
  return (
    <div className="App">
     {/*App*/}
     {/*   <MainLanding/>*/}
     <ContactsList />
     {/*<ContactListSearch/>*/}
     {/*<ContactListTwo />*/}
     {/*<ContactListExp />*/}
    <NewContactModal />

    </div>
  );
}

export default App;
